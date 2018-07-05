define([
    "jquery",
    "loglevel",
    "underscore",
    "handlebars",
    "fenix-ui-filter",
    "../config/config",
    "../html/search/template.hbs",
    "../html/search/binomial.hbs",
    "../nls/labels",
    "json-2-csv",
    "file-saver",
    'typeahead.js',
    "bootstrap",
    "bootstrap-table",
    '../../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export'
], function ($, log, _, Handlebars, Filter, C, template, binomial, labels, converter, FileSaver, Bloodhound, bootstrap) {

    "use strict";
    var Clang = C.lang.toLowerCase(),
        page_url = "/wiews/data/ex-situ-sdg-251/search/",
        organization_url = "/wiews/data/organizations/",
        services_el = "https://us-central1-fao-gift-app.cloudfunctions.net/elasticSearchApi",
        services_ex = "https://us-central1-fao-gift-app.cloudfunctions.net/elasticSearchReport",
        services_ef = "https://us-central1-fao-gift-app.cloudfunctions.net/wiewsExsituRawDownload",
        service_path = {
            "wiews_results" : "?index=exsitu&multiSearch=false",
            "countries" : "?index=countries&multiSearch=false",
            "biostatus" : "?index=biostatofacc&multiSearch=false",
            "germplasm_storage" : "?index=germplasm_storage&multiSearch=false",
            "wiews_exsitu_crops_filter" : "?index=crops&multiSearch=false",
            "wiews_exsitu_institute_filter" : "?index=exsitu&multiSearch=false",
            "wiews_exsitu_genus_filter" : "?index=exsitu&multiSearch=false",
            "wiews_exsitu_species_filter" : "?index=exsitu&multiSearch=false",
            "elastic_export_fetch" : "?index=exsitu&scroll=false",
            "elastic_export_consume" : "?index=exsitu&scroll=true"
        },
        defaultYear = 2017,
        defaultPageSize = 25;

    var s = {
        EL: "#exsitu_search",
        TABLE: "#table",
        FENIX_FILTER : "#fenixfilter"
    };

    function Search() {
        console.clear();
        // silent trace
        log.setLevel("silent");
        this._importThirdPartyCss();
        this._validateConfig();
        this._initVariables();
        this._attach();
        this._bindEventListeners();
    };

    Search.prototype._validateConfig = function () {
        if (!C.lang) alert("Please specify a valid LANGUAGE in config/config.js");
    };

    Search.prototype._callElastic = function (payload, path, full, service) {
        var response_data = {
            total : -1,
            hits : []
        };
        $('[data-role=messages]').hide();
        $.ajax({
            async: false,
            dataType: 'json',
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            url:  (service !== undefined) ? service + service_path[path] : services_el + service_path[path],
            data: JSON.stringify(payload),
            success: function(res) {
                //console.log('res is ',res);
                response_data.total = res.hits.total;
                // first we check for aggregations
                if (res.aggregations) {
                    //res.aggregations.result_set.buckets.length && res.aggregations.result_set.length
                    //console.log('aggregations');
                    _.each( res.aggregations.result_set.buckets, function ( element ) {
                        response_data.hits.push(element);
                    });
                }
                // we check for hits
                if (res.hits.hits.length) {
                    //console.log('hits');
                    _.each( res.hits.hits, function ( element ) {
                        response_data.hits.push(element);
                    });
                }
                if (full) response_data = res;
            },
            error : function(res) {
                console.log(res);
                $('#orgalert_message').html(labels[Clang]['exsitu-search_search_error_416']);
                $('[data-role=messages]').show();
                return;
            }

        });

        //console.log ('response_data is ', response_data);
        return response_data;

    };

    Search.prototype._callGoogle = function (filename, keyname) {
        var response_data = {
                total : -1,
                hits : []
            },
            staticurl = "https://storage.googleapis.com/wiews-lang-bucket/";


        $.ajax({
            async: false,
            dataType: 'json',
            method: 'GET',
            contentType: "text/plain; charset=utf-8",
            url:  staticurl+filename,
            success: function(res) {
                //console.log('success is ',res);
                response_data.total = res.hits.total;
                // first we check for aggregations
                if (res.aggregations) {
                    //res.aggregations.result_set.buckets.length && res.aggregations.result_set.length
                    //console.log('aggregations');
                    _.each( res.aggregations.result_set.buckets, function ( element ) {
                        var item =  {
                            label : element.childs_set.buckets[0].key,
                            value : element.key
                        };
                        response_data.hits.push(item);
                    });
                }
                if (res.hits.hits.length) {
                    //console.log('hits');
                    _.each( res.hits.hits, function ( element ) {
                        var item =  {
                            label : element._source[keyname+"_name"],
                            value : element._source[keyname+"_id"]
                        };
                        response_data.hits.push(item);
                    });
                }
            },
            error : function(res) {
                console.log(res);
            }
        });

        return response_data;
    };

    Search.prototype._getCodelists = function (payload_selection, format) {
        var codelist = [];
        var payload = {
            "countries": {
                "query": {"match_all": {}},
                "size": 1000,
                "_source": ["country_code_iso3","country_name_en"]
            },
            "biostatus": {
                "query": {"match_all": {}},
                "size": 1000,
                "_source": ["bio_stat_of_accesion_id","bio_stat_of_accesion_name"]
            },
            "germplasm_storage": {
                "query": {"match_all": {}},
                "_source": ["germplasm_storage_id","germplasm_storage_name"],
                "sort": [ {"_id": {"order": "asc"}} ]
            }
        };

        $.ajax({
            async: false,
            dataType: 'json',
            method: 'POST',
            data: JSON.stringify(payload[payload_selection]),
            contentType: "text/plain; charset=utf-8",
            url: services_el + service_path[payload_selection],
            success: function(res) {
                _.each( res.hits.hits, function( element ) {
                   // console.log(element);
                    if (format) {
                        // plain
                        codelist[element._source[payload[payload_selection]._source[0]]] = element._source[payload[payload_selection]._source[1]];
                    } else {
                        // fenix
                        codelist.push({ value: element._source[payload[payload_selection]._source[0]], label:element._source[payload[payload_selection]._source[1]]});
                    }
                });
            }
        });

        return codelist;
    };

    Search.prototype._exportElasticFile = function () {

        var export_payload = this.elastic_export_file;

        $.ajax({
            async: false,
            dataType: 'json',
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            url:  services_ef,
            data: JSON.stringify(export_payload),
            success: function(res) {
                window.open(res[0], '_blank');
                $('div#exsitu-search-ux-loader').hide();
                $('[data-page=exsitu-search]').css('opacity','1');
            },
            error : function(res) {
                if (res.responseText == "Record limit of 500000 exceeded.") {
                    alert(res.responseText);
                    $('div#exsitu-search-ux-loader').hide();
                    $('[data-page=exsitu-search]').css('opacity','1');
                }
                console.log(res);
                return;
            }

        });

    };

    Search.prototype._exportElastic = function () {

        this.elastic_export.size = 2500;

        var result = this._callElastic(this.elastic_export,'elastic_export_fetch', true, services_ex),
            export_object = result.hits.hits,
            forTotal = result.hits.total,
            perPage = this.elastic_export.size,
            scroll_id = result._scroll_id,
            cycle = Math.round((forTotal/perPage)-1),
            export_csv = [];

        //console.log('You should hit me '+cycle+' more times.');

        while(cycle){
            var export_var = this._callElastic({
                "scroll" : "1m",
                "scroll_id" : scroll_id
            }, "elastic_export_consume", false, services_ex);
            export_object = export_object.concat(export_var.hits);
            cycle--;
        }
        _.each(export_object, function(key){
            export_csv.push(key._source);
        });

        return export_csv;
    };

    Search.prototype._isEmptyQuery = function () {
        var isempty = true,
            fenixvalues = this.filter.getValues();
        if (
            // $('#search_instcode').val().length > 0 ||
            $('#search_accessions').val().length > 0 ||
            fenixvalues.values.search_country_institute.length > 0 ||
            fenixvalues.values.search_country_origin.length > 0 ||
            fenixvalues.values.search_statusofaccession.length > 0 ||
            fenixvalues.values.search_storage.length > 0 ||
            this.genus_species.length > 0 ||
            this.institutes.length > 0
        ) isempty = false;


        return isempty;
    };

    Search.prototype._getParameterByName = function (name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    Search.prototype._initTable = function(data) {
        // !!!! DEPRECATED
        var self = this;
        self.offsetPage = 0;
        if (this.instcode.length) this._fillResults(data[0]);
        $(s.TABLE).bootstrapTable('destroy');
        $(s.TABLE).bootstrapTable({
            data : data,
            pagination: true,
            pageSize: self.pageSize,
            pageList: [10, 25, 50, 100, 200],
            formatSearch: function() {
                return labels[Clang]['organizations_search_filter']
            },
            onAll : function(name, args) {
                console.log(name, 'is firing', args);
            },
            paginationVAlign: "top",
            sortable: true
        });
        $(s.TABLE).on('page-change.bs.table', function (event, number, size) {
            //console.log('changing page', self.pageSize, self.offsetPage);
            self.pageSize = size;
            self.offsetPage = self.pageSize * (number - 1);
        });

        $(s.TABLE).on('all.bs.table', function(name, args) {
            console.log(name, 'is firing', args);
        });

        this.tabledata = data;
    };

    Search.prototype._initTablePaginated = function(data) {
        var self = this,
            filter = "";
        self.offsetPage = 0;
        $(s.TABLE).bootstrapTable('destroy');
        $(s.TABLE).bootstrapTable({
            ajax:  paginatedAjax,
            sidePagination: 'server',
            pagination: true,
            pageSize: self.pageSize,
            pageList: [10, 25, 50, 100, 200],
            search: false,
            formatSearch: function() {
                return labels[Clang]['organizations_search_filter']
            },
            onSearch : function (text) {
                console.log(_.contains(this.data, text));
                filter = text;
            },
            paginationVAlign: "top",
            totalField: 'total',
            sortable: true
        });
        $(s.TABLE).on('page-change.bs.table', function (event, number, size) {
            //console.log('changing page', self.pageSize, self.offsetPage);
            self.pageSize = size;
            self.offsetPage = self.pageSize * (number - 1);
        });

        function parseOutput(input) {
            var output = {
                total : 0,
                rows : []
            };
            //console.log(input);
            _.each(input.hits, function(process){
                output.rows.push({
                    "w_instcode" : process._source.stakeholder_id,
                    "accenumb" : process._source.accession_number,
                    "stakeholder_fullname" : process._source.stakeholder_id_fullname,
                    "taxon" : process._source.taxon_name,
                    "genus" : process._source.genus_name,
                    "species" : process._source.species_name,
                    "acqdate" : process._source.acquisition_date,
                    "storage" : process._source.type_of_germplasm_storage,
                    "country_en" : process._source.country_name,
                    "cropname" : process._source.crop_name,
                    "origcty" : process._source.orig_country_name,
                    "sampstat" : process._source.biological_status_of_accession,
                    "genebanks" : process._source.genebank_holding_safety_duplication_name,
                    "collsrc" : process._source.collecting_source,
                    "declatitude" : process._source.latitud_of_collecting_site,
                    "declongitude" : process._source.longitud_of_collecting_site,
                    "mlsstat" : process._source.status_under_multilateral_system,
                    "dataowner" : process._source.stakeholder_id_fullname,
                });
            });
            output.total = input.total;
            //console.log(output);
            return output;
        };

        function paginatedAjax(params) {
            // just use setTimeout
            setTimeout(function () {
                var output = parseOutput(self._callElastic(self._preparePayloadElastic(self.offsetPage),'wiews_results'));
                params.success(output);
            }, 100);

        };

    };

    Search.prototype._bloodHoundPrefetchElastic = function (which) {
        var self = this;
        var rest_service = services_el;
        return new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            identify: function(obj) { return obj.name; },
            remote: {
                url: rest_service + service_path[which],
                prepare: function (query, settings) {
                    settings.async = false;
                    settings.type = "POST";
                    settings.contentType = "text/plain; charset=utf-8";
                    settings.dataType = 'json';
                    settings.data = JSON.stringify(self._prepareElasticPayload(which,query));
                    return settings;
                },
                transform: function(response) {
                    var response_data = [];
                    //console.log('response is ', response);
                    if (response.aggregations.result_set.buckets.length) {
                        _.each( response.aggregations.result_set.buckets, function ( element ) {
                            response_data.push(element);
                        });
                    }
                    return response_data;
                },
                rateLimitWait: 750

            }
        });
    };

    Search.prototype._speciesTransformElastic = function (arrayofspecies) {
        var output = [];
        _.each(arrayofspecies, function(element) {
            output.push(element.key);
        });
        return output;
    };

    Search.prototype._attach = function () {
        var self = this;

        $(s.EL).html(template(labels[Clang]));

        $('#table').on('click-row.bs.table', function(row, $element, field){
            self._statesManagement('details');
            $('#backtosearch_fromomni').hide();
            $('#backtoresults').show();
            //history.replaceState({ page : "details" }, null, page_url+self.lang.toLowerCase()+"/?accenumb="+$element['accenumb']+"#details");
            self._fillResults($element);
        });
        $('[data-role=results]').hide();
        $('[data-role=details]').hide();
        $('div#exsitu-search-ux-loader').hide();

        var prefetchCrops = this._bloodHoundPrefetchElastic('wiews_exsitu_crops_filter');
        var prefetchInstitute = this._bloodHoundPrefetchElastic('wiews_exsitu_institute_filter');
        var prefetchGenus = this._bloodHoundPrefetchElastic('wiews_exsitu_genus_filter');
        /*
        var codelist_ISO3 = this._getCodelists('countries');
        var codelist_BIOS = this._getCodelists('biostatus');
        var codelist_Stor = this._getCodelists('germplasm_storage');
        */
        var codelist_ISO3 = this._callGoogle('iso3_country_codes.json').hits;
        var codelist_BIOS = this._callGoogle('biostatofacc_codelist.json', "bio_stat_of_accesion").hits;
        var codelist_Stor = this._callGoogle('germplasm_storage.json',"germplasm_storage").hits;

        //console.log(codelist_BIOS);
        //console.log(codelist_Stor);

        $('#search_crop').typeahead(this.tya_options,
            {
                name: 'search_crop',
                display: 'key',
                limit: 100,
                source: prefetchCrops,
                templates: {
                    suggestion: Handlebars.compile('<div>{{key}}</div>'),
                    empty: Handlebars.compile('<div class="tya_notfound">'+labels[Clang]['organizations_search_not_found']+'</div>'),
                }
            }
        );

        $('#search_instcode').typeahead(this.tya_options,
            {
                name: 'search_instcode',
                display: 'key',
                limit: 100,
                source: prefetchInstitute,
                templates: {
                    suggestion: Handlebars.compile('<div>{{key}}</div>'),
                    empty: Handlebars.compile('<div class="tya_notfound">'+labels[Clang]['organizations_search_not_found']+'</div>'),
                }
            }
        );

        $('#search_genus').typeahead(this.tya_options,
            {
                name: 'search_genus',
                display: 'key',
                limit: 100,
                source: prefetchGenus,
                templates: {
                    suggestion: Handlebars.compile('<div>{{key}}</div>'),
                    empty: Handlebars.compile('<div class="tya_notfound">'+labels[Clang]['organizations_search_not_found']+'</div>'),
                }
            }
        );

        // FENIX Filter

        var fenixFilter = {
            el: s.FENIX_FILTER,
            selectors: {
                "search_country_institute": {
                    "selector": {
                        "id": "dropdown",
                        "source" : codelist_ISO3,
                        "config": {
                            "placeholder" : labels[Clang]['exsitu-search_search_country_institute'],
                            "maxItems": 1
                        }
                    },
                    "format": {
                        "output": "codes"
                    }
                },
                "search_year" : {
                    "selector": {
                        "id": "dropdown",
                        default : [defaultYear],
                        source: [
                            {value: "2014", label: "2014"},
                            {value: "2016", label: "2016"},
                            {value: "2017", label: "2017"}
                        ],
                        "config" : {
                            "placeholder": labels[Clang]['exsitu-search_search_year'],
                            "maxItems": 1
                        }
                    }
                },
                "search_country_origin" : {
                    "selector": {
                        "id": "dropdown",
                        "source" : codelist_ISO3,
                        "config": {
                            "placeholder" : labels[Clang]['exsitu-search_search_country_origin'],
                            plugins: ['remove_button']
                        }
                    },
                    "format": {
                        "output": "codes"
                    }
                },
                "search_statusofaccession" : {
                    selector: {
                        id: "dropdown",
                        "source": codelist_BIOS,
                        "config" : {
                            "placeholder": labels[Clang]['exsitu-search_search_statusofaccession'],
                            plugins: ['remove_button']
                        },
                        sort: false
                    }
                },
                "search_storage" : {
                    selector: {
                        id: "dropdown",
                        "source": codelist_Stor,
                        "config" : {
                            "placeholder": labels[Clang]['exsitu-search_search_storage'],
                            plugins: ['remove_button']
                        },
                        sort: false
                    }
                },
                "search_statusmultilateral" : {
                    selector: {
                        id: "dropdown",
                        source: [
                            {value: "true", label: labels[Clang]['exsitu-search_search_statusmultilateral_true']},
                            {value: "false", label: labels[Clang]['exsitu-search_search_statusmultilateral_false']}
                        ],
                        "config" : {
                            "placeholder": labels[Clang]['exsitu-search_search_statusmultilateral'],
                            plugins: ['remove_button'],
                            "maxItems": 1
                        },
                        sort: false
                    }
                },
                "search_search_crop_wild_relatives" : {
                    selector: {
                        id: "dropdown",
                        default : ['false'],
                        source: [
                            // it's null / true / false originally
                            //{value: "null", label: labels[Clang]['exsitu-search_search_crop_wild_relatives_null']},
                            {value: "null", label: labels[Clang]['exsitu-search_search_crop_wild_relatives_true']},
                            {value: "false", label: labels[Clang]['exsitu-search_search_crop_wild_relatives_false']}
                        ],
                        "config" : {
                            "maxItems" : 1,
                            "placeholder": labels[Clang]['exsitu-search_search_crop_wild_relatives']
                        },
                        sort: false
                    }
                }
            },
            environment: this.environment,
            cache : this.cache,
            common: {
                template: {
                    hideSwitch: true,
                    hideRemoveButton: true,
                    hideHeader: true
                }
            }
        };

        if (this.country_search.length) fenixFilter.selectors.search_country_institute.selector.default = [this.country_search] ;
        this.filter = new Filter(fenixFilter);
        self.initial = {};
        if (this.instcode.length) $('#search_instcode').val(this.instcode);
        if (this.accenumb.length) $('#search_accessions').val(this.accenumb);

    };

    Search.prototype._fillResults = function(content) {
        var self = this;
        // Binomial
        var binomial_name = content['genus']+' '+content['species'];

        if (binomial_name != content['taxon']) {
            $('[data-GPAStatus=taxon]').after(binomial)
        } else {
            if ($('[data-GPAStatus=binomial_name]').length > 0) $('[data-GPAStatus=binomial_name]').remove();
        }

        _.each(content, function(row_value, row_name) {
            var content = row_value;
            if (typeof content == "string") if (content.indexOf('"') > -1) content = content.slice(1, -1);
            if (row_value == "undefined" || row_value == null || row_value == "") content = " - ";
            //Special Case
            if (row_name == "w_instcode") {
                $('[data-GPAIndex=' + row_name + ']').attr('href', organization_url + self.lang.toLowerCase() + '/?instcode=' + row_value + '#details');
                return;
            }
            //if (row_name == "mlsstat") $('[data-GPAIndex='+row_name+']').html((row_value)? 'Included' : 'Not included' );
            $('[data-GPAIndex='+row_name+']').html(content);
        });
    };

    Search.prototype._initVariables = function () {

        this.instcode = ((this._getParameterByName('instcode')) ? this._getParameterByName('instcode') : "");
        this.accenumb = ((this._getParameterByName('accenumb')) ? this._getParameterByName('accenumb') : "");
        this.country_search = ((this._getParameterByName('country')) ? this._getParameterByName('country') : "");

        this.$el = $(s.EL);
        this.lang = Clang;
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;


        this.pageSize = defaultPageSize;
        this.offsetPage = 0;

        this.genus = "";
        this.warning = false;
        this.selected_year = defaultYear;
        this.cwr = null;
        this.loaded_crop = [];
        this.genus_species = [];
        this.institutes = [];

        this.tya_options = {
            hint: true,
            highlight: true,
            minLength: 3
        };

        this.elastic_export = {};

    };

    Search.prototype._statesManagement = function (whichstate, payload, frombutton) {
        $('[data-role=messages]').hide();
        $('div#exsitu-search-ux-loader').hide();
        this.warning = false;
        switch(whichstate) {

            case 'initial' :
                if (!frombutton) history.pushState({ page : "initial" }, "Search", this._RemoveParameterFromUrl(window.location.href.split('#')[0],'instcode'));
                $('[data-role=filters]').show();
                $('[data-role=results]').hide();
                $('[data-role=details]').hide();
            break;

            case 'querystring' :
                $('[data-role=filters]').hide();
                $('[data-role=results]').hide();
                $('[data-role=details]').show();
            break;

            case 'results' :
                if (!frombutton) history.pushState({ page : "results", payload : payload }, "Results", this._RemoveParameterFromUrl(window.location.href.split('#')[0],'instcode') + "#results");
                $('[data-role=filters]').hide();
                $('[data-role=results]').show();
                $('[data-role=details]').hide();
            break;

            case 'details' :
                var details_url = page_url+this.lang.toLowerCase()+"/#details" ;
                if (!frombutton) history.pushState({ page : "details" }, "Details", details_url);
                $('[data-role=filters]').hide();
                $('[data-role=results]').hide();
                $('[data-role=details]').show();
            break;

        }

    };

    Search.prototype._preparePayloadElastic = function (from) {

        var self = this,
            filter_values = this.filter.getValues(),
            filter_taxon = $('#search_taxon').val(),
            array_taxon = [],
            //filter_inst  = $('#search_instcode').val().substring(0,6),
            array_inst = [],
            filter_acces = $('#search_accessions').val().toUpperCase(),
            elastic_genus = [],
            elastic_institutes = "",
            mlstatus = null,
            origin_country = "",
            biostat = "",
            typeofstorage ="";
            //elastic_genus = "";

        this.elastic_export_file = {
            "separator":";",
            "filters":{
                "year": parseInt(filter_values.values.search_year[0])
            }
        };

        // Remember that arrays means multiple selection...
        if (filter_taxon.length > 0) array_taxon.push(filter_taxon);
        //if (filter_inst.length > 0)  array_inst.push(filter_inst);
        if (filter_acces == "") filter_acces = null;
        // ... and boolean must be boolean.
        if (filter_values.values) {
            if (filter_values.values.search_statusmultilateral.length > 0)  mlstatus = (filter_values.values.search_statusmultilateral[0] == 'true');
            if (filter_values.values.search_country_origin.length > 0) origin_country = filter_values.values.search_country_origin.join(" ");
            if (filter_values.values.search_statusofaccession.length > 0) biostat = filter_values.values.search_statusofaccession.join(" ");
            if (filter_values.values.search_storage.length > 0) typeofstorage = filter_values.values.search_storage.join(" ");
        }

        _.each(this.genus_species, function(object){
            //console.log(object);
            elastic_genus.push(String(object).replace(/,/g, ' ').split(" "));
            //elastic_genus += object + " ";
        });

        _.each(this.institutes, function(object){
            //console.log(object);
            //elastic_export_institutes.push(String(object).replace(/,/g, '').split(" "));
            elastic_institutes += object + " ";
        });

        var payload = {
            "query": {
                "bool": {
                    "must": [
                        {"match_phrase": {"year": parseInt(filter_values.values.search_year[0])}}
                    ]
                }
            },
            "size": this.pageSize,
            "from": from,
            "_source": [
                "stakeholder_id",
                "stakeholder_id_fullname",
                "stakeholder_id_acronym_fullname",
                "country_name",
                "accession_number",
                "taxon_name",
                "crop_name",
                "acquisition_date",
                "orig_country_name",
                "biological_status_of_accession",
                "genebank_holding_safety_duplication",
                "latitud_of_collecting_site",
                "longitud_of_collecting_site",
                "collecting_source",
                "type_of_germplasm_storage",
                "status_under_multilateral_system",
                "year",
                "biological_status_of_accession",
                "genebank_holding_safety_duplication_id",
                "genebank_holding_safety_duplication_name",
                "species_name",
                "genus_name"
            ]
        };

        // Selected Elements - MUST BE [1]!!!
        if (this.genus_species.length) {
            payload.query.bool.must.push({"bool": {
                    "should": []
                }}
            );
            self.elastic_export_file.filters.genus_species = [];
            _.each(elastic_genus, function(selection) {
                if(selection.length == 2 && selection[1] == "") {
                    // We're in the "Genus only" section
                    payload.query.bool.must[1].bool.should.push({"match_phrase": {"genus_name": selection[0]}});
                    self.elastic_export_file.filters.genus_species.push({"genus_name": selection[0], "species_name": null});
                } else {
                    // Standard "Genus/Species" couple.
                    var genus_concat = selection[0];
                    selection.shift();
                    var species_concat = selection.join();
                    payload.query.bool.must[1].bool.should.push({"bool": {
                        "must": [
                            {"match_phrase": {"genus_name": genus_concat}},
                            {"match_phrase": {"species_name": species_concat}}
                        ]
                    }});
                    self.elastic_export_file.filters.genus_species.push({"genus_name": genus_concat, "species_name": species_concat});
                }
            });
        }
        // Country
        if (filter_values.values.search_country_institute.length) {
            payload.query.bool.must.push({"match_phrase": {"country_iso3": filter_values.values.search_country_institute[0]}});
            self.elastic_export_file.filters.country_iso3 = filter_values.values.search_country_institute[0];
        }
        // Stakeholder
        // if (array_inst.length) payload.query.bool.must.push({"match_phrase": {"stakeholder_id": array_inst[0]}});
        // Stakeholder Multiple
        if (elastic_institutes != "") {
            payload.query.bool.must.push({"match": {"stakeholder_id": elastic_institutes}});
            self.elastic_export_file.filters.stakeholder_id = elastic_institutes;
        }
        // Acc Number
        if (filter_acces != null) {
            payload.query.bool.must.push({"wildcard": {"accession_number.lowercase": "*"+filter_acces+"*"}});
            self.elastic_export_file.filters.accession_number = filter_acces;
        }
        // Multilateral
        if (mlstatus != null) {
            payload.query.bool.must.push({"match_phrase": {"status_under_multilateral_system": filter_values.labels.search_statusmultilateral[mlstatus]}});
            self.elastic_export_file.filters.status_under_multilateral_system = filter_values.labels.search_statusmultilateral[mlstatus];
        }
        // Array > Spaced
        // Country of Origin
        if (filter_values.values.search_country_origin.length) {
            payload.query.bool.must.push({"match": {"orig_country_iso3": origin_country}});
            self.elastic_export_file.filters.orig_country_iso3 = origin_country.split(" ");
        }
        // Biostat
        if (filter_values.values.search_statusofaccession.length) {
            payload.query.bool.must.push({"match": {"biological_status_of_accession_id": biostat}});
            self.elastic_export_file.filters.biological_status_of_accession_id = biostat.split(" ");
        }
        // Storage
        if (filter_values.values.search_storage.length) {
            payload.query.bool.must.push({"match": {"type_of_germplasm_storage": typeofstorage}});
            self.elastic_export_file.filters.type_of_germplasm_storage = typeofstorage.split(" ");
        }

        this.elastic_export = payload;

        // Doing the elastic export file

        return payload;
    };

    Search.prototype._prepareElasticPayload = function (which, text) {
        var selected_year, selected_wcr,
            filter_values = this.filter.getValues();

        if (filter_values.valid = true) {
            selected_year = filter_values.values.search_year[0];
            selected_wcr  = filter_values.values.search_search_crop_wild_relatives[0];
        }

        this.selected_year = filter_values.values.search_year[0];
        this.cwr = (filter_values.values.search_search_crop_wild_relatives[0] == 'true');

        var inst_payload = {
                "query": {
                    "bool": {
                        "must": [{
                            "wildcard": {
                                "stakeholder_id_acronym_fullname.lowercase": {
                                    "value": "*"+text+"*",
                                    "rewrite": "scoring_boolean"
                                }
                            }
                        },
                            {
                                "match_phrase": {
                                    "year": parseInt(selected_year)
                                }
                            }
                        ]
                    }
                },
                "size":"0",
                "aggs": {
                    "result_set": {
                        "terms": {
                            "field": "stakeholder_id_acronym_fullname.aggregator",
                            "order": {"_key": "asc"},"size": 1000
                        }
                    }
                }
            }
        ;
        var crop_payload = {
            "query": {
                "wildcard": {
                    "crop_name_en.lowercase": {
                        "value": "*"+text+"*",
                        "rewrite": "scoring_boolean"
                    }
                }
            },
            "size":"0",
            "aggs": {
                "result_set": {
                    "terms": {
                        "field": "crop_name_en.aggregator",
                        "order": {"max_score": "asc"}
                    },
                    "aggs": {
                        "max_score": {
                            "max": {"script": "_score"}
                        }
                    }
                }
            }
        };
        var taxon_payload = [
            {
                "name": "wiews_exsitu_taxon_filter",
                "sid": [ { "uid": "ref_sdg_taxon" } ],
                "parameters": {
                    "year" : parseInt(selected_year),
                    "taxon" : text
                }
            },
            {
                "name":"order",
                "parameters":{
                    "taxon":"ASC"
                }
            }
        ];
        var genus_payload = {
                "query": {
                    "bool": {
                        "must": [{
                            "wildcard": {
                                "genus_name.lowercase": {
                                    "value": "*"+text+"*",
                                    "rewrite": "scoring_boolean"
                                }
                            }
                        },
                            {
                                "match_phrase": {
                                    "year": parseInt(selected_year)
                                }
                            }
                        ]
                    }
                },
                "size":"0",
                "aggs": {
                    "result_set": {
                        "terms": {
                            "field": "genus_name.aggregator",
                            "order": {"max_score": "asc"},"size": 25
                        },
                        "aggs": {
                            "max_score": {
                                "max": {"script": "_score"}
                            }
                        }
                    }
                }
            }
        ;
        var species_payload = {
                "query": {
                    "bool": {
                        "must": [
                            {"match_phrase": {"genus_name": this.genus_species}},
                            {"wildcard": {
                                "species_name.lowercase": {
                                    "value": "*"+text+"*",
                                    "rewrite": "scoring_boolean"
                                }
                            }
                            },
                            {
                                "match_phrase": {
                                    "year": parseInt(selected_year)
                                }
                            }
                        ]
                    }
                },
                "size": 0,
                "aggregations": {
                    "result_set": {
                        "terms": {
                            "field":
                                "species_name.aggregator",
                            "order": {"_key": "asc"}
                        }
                    }
                }
            }
        ;

        if (which == "wiews_exsitu_crops_filter") return crop_payload;
        if (which == "wiews_exsitu_institute_filter") return inst_payload;
        if (which == "wiews_exsitu_taxon_filter") return taxon_payload;
        if (which == "wiews_exsitu_genus_filter") return genus_payload;
        if (which == "wiews_exsitu_species_filter") return species_payload;

    };

    Search.prototype._executeSearch = function () {
        var self = this;
        $('[data-role=messages]').hide();
        if (this._isEmptyQuery()) {
            $('#orgalert_message').html(labels[Clang]['exsitu-search_search_orgalert_message']);
            $('[data-role=messages]').show();
            $('html, body').animate({scrollTop: $('div[data-role=messages]').offset().top}, 400,'linear');
            return;
        }
        $('[data-page=exsitu-search]').css('opacity','0.5');
        $('div#exsitu-search-ux-loader').show();
        setTimeout(function(){
            $('div#exsitu-search-ux-loader').hide();
            $('[data-page=exsitu-search]').css('opacity','1');
            var result = self._callElastic(self._preparePayloadElastic(0),'wiews_results');
            if (result.hits.length) {
                //self._initTable(result);
                self._initTablePaginated(self._preparePayloadElastic(0));
                self._statesManagement('results');
            } else {
                if (!$('[data-role=messages]').is(":visible")) {
                    $('#orgalert_message').html(labels[Clang]['exsitu-search_search_came_empty']);
                    $('[data-role=messages]').show();
                    $('html, body').animate({scrollTop: $('[data-role=messages]').offset().top}, 400,'linear');
                }
            }
        },100);
    };

    Search.prototype._resetForm = function (saveyear) {
        // Reset variables and boxes
        $('[data-role=messages]').hide();
        this.warning = false;
        $('[data-selector=search_year]').off('change');
        // Clear them all
        $('#search_instcode').val('');
        $('#search_crop').val('');
        $('#search_genus').val('');
        $('#search_spieces').val('');
        this.genus_species = [];
        this.institutes = [];
        $('#combined_elements_container').empty();
        $('#combined_elements_container_empty').css('visibility','visible');
        $('#selected_institute_container').empty();
        $('#selected_institute_container_empty').css('visibility','visible');
        $('#search_taxon').val('');
        $('#search_instcode').val('');
        $('#search_accessions').val('');
        if (saveyear) this.initial.values['search_year'][0] = this.selected_year;
        this.filter.setValues({
            values: this.initial.values
        });
        this.initial.values['search_year'][0] = defaultYear;
        this._bindYearListener();
        history.pushState({ page : "initial" }, "Search", this._RemoveParameterFromUrl(window.location.href.split('#')[0],'instcode'));
    };

    Search.prototype._bindYearListener = function () {
        var self = this;
        $('[data-selector=search_year]').on('change', function(){
            self._resetForm(true);
        });
    };

    // Events
    Search.prototype._bindEventListeners = function () {
        var self = this;

        this.filter.on('ready', function(){
            self.initial = self.filter.getValues();
            self._bindYearListener();
            if (self.instcode.length) {
                appendInstitute(self.instcode);
                self._executeSearch();
            }
            if (self.country_search.length) self._executeSearch();
            if (self.accenumb.length) self._executeSearch();
        });

        this.filter.on('select', function(evt) {
            if (evt.id == "search_year") self.selected_year = Number(evt.values[0]);
        });

        $('#adv_search_button').on('click', function(){
            self._executeSearch();
        });

        $('#adv_clear_button').on('click', function(){
            self._resetForm(false);
        });

        $('#backtosearch').on('click', function(){
            self._statesManagement('initial');
        });

        $('#backtosearch_fromomni').on('click', function(){
            self._statesManagement('initial');
        });

        $('#backtoresults').on('click', function(){
            self._statesManagement('results');
        });

        $('[data-role=organizations_exportbutton]').on('click', function() {
            //self._exportList();

            $('div#exsitu-search-ux-loader').show();
            $('[data-page=exsitu-search]').css('opacity','0.5');
            setTimeout(function () {
                var tabledata = self._exportElasticFile();
                /*
                var json2csvCallback = function (err, csv) {
                    if (err) throw err;
                    var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
                    FileSaver.saveAs(blob, "exsitu-search.txt");
                    $('div#exsitu-search-ux-loader').hide();
                    $('[data-page=exsitu-search]').css('opacity','1');
                };
                converter.json2csv(tabledata, json2csvCallback, {
                    delimiter : {
                        wrap  : '"',
                        field : ',',
                        array : ';',
                        eol   : '\n'
                    },
                    prependHeader    : true,
                    sortHeader       : false
                    //keys             : []
                });
                */
            }, 150);
        });

        function appendInstitute(inst) {
            if ($('#selected_institute_container').find('[data-value="'+inst.substring(0,6)+'"]').length > 0) return;
            $('#selected_institute_container').prepend('<div data-value="'+inst.substring(0,6)+'" data-position="'+self.institutes.length+'" class="addedelement">'+inst+'<span title="'+labels[Clang]['exsitu-search_search_added_element_remove']+'" class="addedelement_remove"> × </span></div>');
            $('[data-value="'+inst.substring(0,6)+'"]').click( function(){
                self.institutes.splice($(this).data('position'),1);
                this.remove();
                if (self.institutes == 0) $('#selected_institute_container_empty').css("visibility","visible");
            } );
            if (self.institutes == 0) $('#selected_institute_container_empty').css('visibility','hidden');
            self.institutes.push(inst.substring(0,6));
        }

        function appendElement(genus, species) {
            var element = ((species.length > 0))? genus+' '+species : genus+' '+'[all]';
            if ($('#combined_elements_container').find('[data-value="'+element+'"]').length > 0) return;
            $('#combined_elements_container').prepend('<div data-value="'+element+'" data-position="'+self.genus_species.length+'" class="addedelement">'+element+'<span title="'+labels[Clang]['exsitu-search_search_added_element_remove']+'" class="addedelement_remove"> × </span></div>');
            $('[data-value="'+element+'"]').click( function(){
                self.genus_species.splice($(this).data('position'),1);
                this.remove();
                if (self.genus_species == 0) $('#combined_elements_container_empty').css("visibility","visible");
            } );
            if (self.genus_species == 0) $('#combined_elements_container_empty').css('visibility','hidden');
            (species.length > 0)? self.genus_species.push([genus,species]) : self.genus_species.push([genus,null]);
        }

        function appendElementElastic(element) {
            if ($('#combined_elements_container').find('[data-value="'+element+'"]').length > 0) return;
            $('#combined_elements_container').prepend('<div data-value="'+element+'" data-position="'+self.genus_species.length+'" class="addedelement">'+element+'<span title="'+labels[Clang]['exsitu-search_search_added_element_remove']+'" class="addedelement_remove"> × </span></div>');
            $('[data-value="'+element+'"]').click( function(){
                self.genus_species.splice($(this).data('position'),1);
                this.remove();
                if (self.genus_species == 0) $('#combined_elements_container_empty').css("visibility","visible");
            } );
            if (self.genus_species == 0) $('#combined_elements_container_empty').css('visibility','hidden');
            self.genus_species.push(element);
        }

        $('#btn_clearfrominstselection').on('click', function(){
            $('[data-role=messages]').hide();
            self.institutes = [];
            $('#selected_institute_container').empty();
            $('#selected_institute_container_empty').css('visibility','visible');
        });

        $('#btn_clearserach').on('click', function(){
            $('[data-role=messages]').hide();
            self.genus_species = [];
            $('#combined_elements_container').empty();
            $('#combined_elements_container_empty').css('visibility','visible');
        });

        $('#btn_addserach').on('click', function() {
            var genus = $('#search_genus').val();
            var species = $('#search_spieces').val();
            if (genus.length> 0) appendElement(genus, species);
        });

        $('#btn_addfrominst').on('click', function() {
            appendInstitute($('#search_instcode').val());
            $('#search_instcode').val('');
        });

        $('#btn_addfromcrop').on('click', function() {
            var output = [],
                filter_values = self.filter.getValues(),
                //selected = selection['crop_en'],
                text = $('#search_crop').val(),
                crops = text.charAt(0).toUpperCase() + text.slice(1),
                wcr = (filter_values.values.search_search_crop_wild_relatives[0] == 'null'),
                //year is avaiable in self.selected_year
                result = self._callElastic({
                        "query": {
                            "bool": {
                                "must": [
                                    {"match": {"crop_name_en": crops}},
                                    {"match": {"crop_wild_relatives_flag": wcr}}
                                ]
                            }
                        },
                        "size":"0",
                        "aggs": {
                            "result_set": {
                                "terms": {
                                    "field": "genus_species_name.aggregator",
                                    "order": {"_key": "asc"},"size": 1000
                                }
                            }
                        }
                    }, "wiews_exsitu_crops_filter"
                );

            _.each(result.hits, function(crop) { output.push(crop.key) });
            self.loaded_crop = output;
            _.each(self.loaded_crop, function(element) {
                appendElementElastic(element)
            });
        });

        /*
        $('#btn_addfromcrop').on('click', function() {
            var output = [],
                filter_values = self.filter.getValues(),
                //selected = selection['crop_en'],
                text = $('#search_crop').val(),
                result = self._callServices([
                    {
                        "name": "wiews_exsitu_crops_genus_filter",
                        "sid": [ { "uid": "crop_genus" }, { "uid": "ref_sdg_species" } ],
                        "parameters": {
                            "year" : self.selected_year,
                            "crops" : [text.charAt(0).toUpperCase() + text.slice(1)],
                            "cwr" : filter_values.values.search_search_crop_wild_relatives[0]
                        }
                    },
                    {
                        "name":"order",
                        "parameters":{
                            "genus" : "ASC",
                            "species" : "ASC"
                        }
                    }
                ]);
            _.each(result, function(crop) { (crop.species.length > 0)? output.push([crop.genus,crop.species]) : output.push([crop.genus,null]); });
            self.loaded_crop = output;
            _.each(self.loaded_crop, function(element) { appendElement(element[0],element[1]) });
        });
        */

        $('#search_genus').on('typeahead:select', function(event, selection) {
            $('#search_spieces').typeahead('destroy');
            self.genus = selection.key;

            var result = self._callElastic({
                    "query": {
                        "bool": {
                            "must": [
                                {"match_phrase": {"genus_name": self.genus}},
                                {
                                    "match_phrase": {
                                        "year": parseInt(self.selected_year)
                                    }
                                }
                            ]
                        }
                    },
                    "size": 0,
                    "aggregations": {
                        "result_set": {
                            "terms": {
                                "field": "species_name.aggregator",
                                "size": 1000,
                                "order": {"_key": "asc"}
                            }
                        }
                    }
                }, "wiews_exsitu_species_filter"
            );

            var engine = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: self._speciesTransformElastic(result.hits)
            });

            $('#search_spieces').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                {
                  name: 'search_species',
                  source: engine
                }
            );
        });

        $('#search_genus').on("keypress", function(e) {
            if (e.keyCode == 13) { // Enter
                $('#search_spieces').focus();
                return false; // prevent the button click from happening
            }
        });

        $('#btn_clearfromcrop').on('click', function(){
            $('#search_crop').val("");
        });

        $('#btn_clearfrominst').on('click', function(){
            $('#search_instcode').val("");
        });

        $('#btn_clearfrominstselection').on('click', function(){

        });

        $('#btn_clearfromgenuspecies').on('click', function(){
            $('#search_genus').val("");
            $('#search_spieces').val("");
        });

        window.onpopstate = function(event) {
            //console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
            //console.log((event.state) ? event.state.page : "initial");
            self._statesManagement((event.state) ? event.state.page : "initial",{},true);
        }

    };

    Search.prototype._RemoveParameterFromUrl = function(url, parameter) {
        return url
            .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
            .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
    };

    Search.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");
        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");

        require("../../node_modules/fenix-ui-table-creator/dist/fenix-ui-table-creator.min.css");

        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");

        //Wiews CSS
        require("../css/wiews.css");

    };

    return new Search();

});