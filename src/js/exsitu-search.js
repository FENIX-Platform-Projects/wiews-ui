define([
    "jquery",
    "loglevel",
    "underscore",
    "handlebars",
    "fenix-ui-reports",
    "fenix-ui-filter",
    "../config/config",
    "../html/exsitu-search/template.hbs",
    "../nls/labels",
    "json-2-csv",
    "file-saver",
    'typeahead.js',
    "bootstrap",
    "bootstrap-table",
    '../../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export'
], function ($, log, _, Handlebars, Report, Filter, C, template, labels, converter, FileSaver, Bloodhound, bootstrap) {

    "use strict";
    var Clang = C.lang.toLowerCase(),
        services_url = "http://fenix.fao.org/d3s_wiews/processes",
        services_el = "http://hqlqawiews1.hq.un.fao.org:9200/",
        service_path = {
            "wiews_results" : "exsitu/exsitu/_search",
            "countries" : "countries/countries/_search",
            "biostatus" : "biostatofacc/biostatofacc/_search",
            "wiews_exsitu_crops_filter" : "crops/crops/_search",
            "wiews_exsitu_institute_filter" : "exsitu/exsitu/_search",
            "wiews_exsitu_genus_filter" : "exsitu/exsitu/_search",
            "wiews_exsitu_species_filter" : "exsitu/exsitu/_search",
            "elastic_export_fetch" : "exsitu/exsitu/_search?scroll=1m",
            "elastic_export_consume" : "_search/scroll"
        },
        defaultYear = 2014,
        defaultPageSize = 25;

    var s = {
        EL: "#exsitu_search",
        TABLE: "#table",
        FENIX_FILTER : "#fenixfilter"
    };

    function Exsitu_search() {
        console.clear();
        // silent trace
        log.setLevel("silent");
        this._importThirdPartyCss();
        this._validateConfig();
        this._initVariables();
        this._attach();
        this._bindEventListeners();
    };

    Exsitu_search.prototype._validateConfig = function () {

        if (!C.lang) alert("Please specify a valid LANGUAGE in config/config.js");

    };

    Exsitu_search.prototype._callServices = function (payload) {
        var table_data = [];
        $('[data-role=messages]').hide();
        $.ajax({
            async: false,
            dataType: 'json',
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            url: services_url,
            data: JSON.stringify(payload),
            success: function(res) {
                var dsd = [];
                //console.log(res.metadata.dsd);
                _.each ( res.metadata.dsd.columns , function ( column ) {
                    if (column.id != "mlsstat") dsd.push(column.id)
                } );
                //console.log(dsd);
                _.each( res.data, function( element ) {
                    var item = {};
                    _.each(dsd, function (col_name, col_index) {
                        item[col_name] = element[col_index];
                        if (typeof element[col_index] == "string") if (element[col_index].indexOf(',') > -1) item[col_name] = "\"" +element[col_index] + "\"";
                    });
                    table_data.push(item);
                });
                //console.log(table_data);
            },
            error : function(res) {
                $('#orgalert_message').html(labels[Clang]['exsitu-search_search_error_416']);
                $('[data-role=messages]').show();
                return;
            }
        });

        return table_data;

    };

    Exsitu_search.prototype._callElastic = function (payload, path, full) {
        var response_data = {
            total : -1,
            hits : []
        };
        $('[data-role=messages]').hide();
        $.ajax({
            async: false,
            dataType: 'json',
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            url: services_el + service_path[path],
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

    Exsitu_search.prototype._getCodelists = function (payload_selection, format) {
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
            }
        };
        $.ajax({
            async: false,
            dataType: 'json',
            method: 'POST',
            data: JSON.stringify(payload[payload_selection]),
            contentType: "application/json;",
            url: services_el + service_path[payload_selection],
            success: function(res) {
                _.each( res.hits.hits, function( element ) {
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

    Exsitu_search.prototype._exportList = function () {
        var flow_model =  this.flowmodel;
        flow_model.flow[2].rid = { "uid" : "exsitu_data" };
        if (flow_model.flow[0].parameters.accenumb == null) delete flow_model.flow[0].parameters.accenumb;
        flow_model.outConfig.config.fileName = "exsitu_"+this.selected_year;
        //console.log(JSON.stringify(flow_model));
        this.report.export({
            format: "flow",
            config: flow_model
        });
    };

    Exsitu_search.prototype._exportElastic = function () {

        this.elastic_export.size = 2500;

        var result = this._callElastic(this.elastic_export,'elastic_export_fetch', true),
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
            }, "elastic_export_consume");
            export_object = export_object.concat(export_var.hits);
            cycle--;
        }
        _.each(export_object, function(key){
            /*
            console.log(key._source);
            var obj = [];
            _.each(key._source, function(parser){
                if (typeof parser == "string")  if (parser.indexOf(',') > -1) console.log('we have a comma') //item[col_name] = "\"" +element[col_index] + "\"";
            });
            */
            export_csv.push(key._source);
        });

        return export_csv;
    };

    Exsitu_search.prototype._isEmptyQuery = function () {
        var isempty = true,
            fenixvalues = this.filter.getValues();
        if (
            $('#search_instcode').val().length > 0 ||
            $('#search_accessions').val().length > 0 ||
            fenixvalues.values.search_country_institute.length > 0 ||
            fenixvalues.values.search_country_origin.length > 0 ||
            fenixvalues.values.search_statusofaccession.length > 0 ||
            /*
            $('#search_crop').val() == '' ||
            $('#search_genus').val() == '' ||
            $('#search_spieces').val() == '' ||
            */
            this.genus_species.length > 0
        ) isempty = false;


        return isempty;
    };

    Exsitu_search.prototype._getParameterByName = function (name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    Exsitu_search.prototype._initTable = function(data) {
        var self = this;
        self.offsetPage = 0;
        if (this.instcode.length) this._fillResults(data[0]);
        $(s.TABLE).bootstrapTable('destroy');
        $(s.TABLE).bootstrapTable({
            data : data,
            pagination: true,
            pageSize: self.pageSize,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            formatSearch: function() {
                return labels[Clang]['organizations_search_filter']
            },
            paginationVAlign: "top",
            sortable: true
        });
        $(s.TABLE).on('page-change.bs.table', function (event, number, size) {
            self.pageSize = size;
            self.offsetPage = self.pageSize * (number - 1);
        });
        this.tabledata = data;
    };

    Exsitu_search.prototype._initTablePaginated = function(data) {
        var self = this;
        self.offsetPage = 0;
        $(s.TABLE).bootstrapTable('destroy');
        $(s.TABLE).bootstrapTable({
            ajax:  paginatedAjax,
            sidePagination: 'server',
            pagination: true,
            pageSize: self.pageSize,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            formatSearch: function() {
                return labels[Clang]['organizations_search_filter']
            },
            paginationVAlign: "top",
            totalField: 'total',
            sortable: true
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
                    "stakeholder_fullname" : process._source.stakeholder_fullname,
                    "taxon" : process._source.taxon_name,
                    "acqdate" : process._source.acquisition_date,
                    "storage" : process._source.type_of_germplasm_storage,
                    "country_en" : process._source.country_name,
                    "cropname" : process._source.crop_name,
                    "origcty" : process._source.orig_country_name,
                    "sampstat" : process._source.biological_status_of_accession,
                    "genebanks" : process._source.genebank_holding_safety_duplication,
                    "declatitude" : process._source.latitud_of_collecting_site,
                    "declongitude" : process._source.longitud_of_collecting_site,
                    "mlsstat" : process._source.status_under_multilateral_system
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

    Exsitu_search.prototype._bloodHoundPrefetch = function (which) {
        var self = this;
        var rest_service = services_url;
        return new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            identify: function(obj) { return obj.name; },
            remote: {
                url: rest_service,
                prepare: function (query, settings) {
                    settings.async = false;
                    settings.type = "POST";
                    settings.contentType = "application/json; charset=utf-8";
                    settings.dataType = 'json';
                    settings.data = JSON.stringify(self._prepareElasticPayload(which,query));
                    return settings;
                },
                transform: function(response) {
                    var response_data = [];
                    var dsd = [];
                    //console.log('response is ', response);
                    _.each ( response.metadata.dsd.columns , function ( column ) {
                        dsd.push(column.id)
                    } );
                    //console.log(dsd);
                    _.each( response.data, function( element ) {
                        var item = {};
                        _.each(dsd, function (col_name, col_index) {
                            item[col_name] = element[col_index];
                        });
                        response_data.push(item);
                    });
                    return response_data;
                }

            }
        });
    };

    Exsitu_search.prototype._bloodHoundPrefetchElastic = function (which) {
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
                    settings.contentType = "application/json; charset=utf-8";
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
                }

            }
        });
    };

    Exsitu_search.prototype._speciesTransform = function (arrayofspecies) {
        var output = [];

        _.each(arrayofspecies, function(element) {
            output.push(element.species);
        });

        return output;
    };

    Exsitu_search.prototype._speciesTransformElastic = function (arrayofspecies) {
        var output = [];
        _.each(arrayofspecies, function(element) {
            output.push(element.key);
        });
        return output;
    };

    Exsitu_search.prototype._attach = function () {
        var self = this;

        $(s.EL).html(template(labels[Clang]));

        $('#table').on('click-row.bs.table', function(row, $element, field){
            self._statesManagement('details');
            $('#backtosearch_fromomni').hide();
            $('#backtoresults').show();
           // history.replaceState({ page : "details" }, null, "/wiews/data/organizations/"+self.lang.toLowerCase()+"/?instcode="+$element['instcode']+"#details");
            self._fillResults($element);
        });
        $('[data-role=results]').hide();
        $('[data-role=details]').hide();
        $('div#exsitu-search-ux-loader').hide();

        var prefetchCrops = this._bloodHoundPrefetchElastic('wiews_exsitu_crops_filter');
        var prefetchInstitute = this._bloodHoundPrefetchElastic('wiews_exsitu_institute_filter');
        var prefetchTaxon = this._bloodHoundPrefetch('wiews_exsitu_taxon_filter');
        var prefetchGenus = this._bloodHoundPrefetchElastic('wiews_exsitu_genus_filter');
        var codelist_ISO3 = this._getCodelists('countries');
        var codelist_BIOS = this._getCodelists('biostatus');

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

        $('#search_taxon').typeahead(this.tya_options,
            {
                name: 'search_taxon',
                display: 'taxon',
                limit: 100,
                source: prefetchTaxon,
                templates: {
                    suggestion: Handlebars.compile('<div>{{taxon}}</div>'),
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


    };

    Exsitu_search.prototype._getISO = function () {
        var iso = [];
        var url = "http://fenix.fao.org/d3s_wiews/msd/resources/uid/ISO3";
        $.ajax({
            async: false,
            dataType: 'json',
            method: 'GET',
            contentType: "application/json; charset=utf-8",
            url: url,
            success: function(res) {
                _.each( res.data, function( element ) {
                    iso[element.code] = element.title.EN;
                });
                //console.log(iso);
            }
        });

        return iso;
    };

    Exsitu_search.prototype._fillResults = function(content) {
        var self = this;
        _.each(content, function(row_value, row_name) {
            var content = row_value;
            if (typeof content == "string") if (content.indexOf('"') > -1) content = content.slice(1, -1);
            if (row_value == "undefined" || row_value == null || row_value == "") content = " - ";
            //Special Case
            if (row_name == "w_instcode") {
                $('[data-GPAIndex=' + row_name + ']').attr('href', '/wiews/data/organizations/' + self.lang.toLowerCase() + '/?instcode=' + row_value + '#details');
                return;
            }
            /*
            if (row_name == "origcty") {
                var iso = self._getISO(),
                    output = iso[row_value];
                $('[data-GPAIndex=' + row_name + ']').html((output != 'undefined')? output : row_value);
                return;
            }
            */
            $('[data-GPAIndex='+row_name+']').html(content);
            if (row_name == "mlsstat") $('[data-GPAIndex='+row_name+']').html((row_value)? 'Included' : 'Not included' );
        });
    };

    Exsitu_search.prototype._initVariables = function () {

        this.instcode = ((this._getParameterByName('instcode')) ? this._getParameterByName('instcode') : "");
        this.country_search = ((this._getParameterByName('country')) ? this._getParameterByName('country') : "");

        this.$el = $(s.EL);
        this.lang = Clang;
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;

        if (this.report && $.isFunction(this.report.dispose)) this.report.dispose();

        this.report = new Report({
            environment: this.environment,
            cache: this.cache,
            silent: true
        });

        this.pageSize = defaultPageSize;
        this.offsetPage = 0;

        this.genus = "";
        this.warning = false;
        this.selected_year = defaultYear;
        this.cwr = null;
        this.loaded_crop = [];
        this.genus_species = [];

        this.tya_options = {
            hint: true,
            highlight: true,
            minLength: 3
        };

        this.elastic_export = {};

        this.flowmodel = {
            "outConfig": {
                "plugin": "wiewsOutputCSV",
                "config" :{ "fileName" : "wiews_2020.csv" }
            },
            "flow": [],
            "options": {
                "params" : {
                    "maxSize" : 200000,
                    "language": this.lang.toUpperCase()
                }
            }
        };

    };

    Exsitu_search.prototype._statesManagement = function (whichstate, payload, frombutton) {
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
                var details_url = "/wiews/data/search/"+this.lang.toLowerCase()+"/#details" ;
                if (!frombutton) history.pushState({ page : "details" }, "Details", details_url);
                $('[data-role=filters]').hide();
                $('[data-role=results]').hide();
                $('[data-role=details]').show();
            break;

        }

    };

    Exsitu_search.prototype._preparePayload = function (freetext) {
        if (freetext) alert('Check configuration');

        var filter_values = this.filter.getValues(),
            filter_taxon = $('#search_taxon').val(),
            array_taxon = [],
            filter_inst  = $('#search_instcode').val().substring(0,6),
            array_inst = [],
            filter_acces = $('#search_accessions').val().toUpperCase(),
            elastic_genus = [];

        // Remember that arrays means multiple selection
        if (filter_taxon.length > 0) array_taxon.push(filter_taxon);
        if (filter_inst.length > 0)  array_inst.push(filter_inst);
        if (filter_acces == "") filter_acces = null;

        _.each(this.genus_species, function(object){
            elastic_genus.push(String(object).split(" "));
        });


        var payload = [
            {
                "name": "wiews_exsitu_filter",
                "sid": [ { "uid": "wiews_2014" },{ "uid": "wiews_2016" },{ "uid": "ref_sdg_institutes" },{ "uid": "ref_iso3_countries" } ],
                "parameters": {
                    "year" : filter_values.values.search_year[0],
                    "countries" : filter_values.values.search_country_institute,
                    "institutes" : array_inst,
                    "genus_species" : elastic_genus,
                    "taxons" : array_taxon,
                    "sampstat" : filter_values.values.search_statusofaccession,
                    "accenumb" : filter_acces,
                    "originCountries" : filter_values.values.search_country_origin,
                    "mlsstat" : filter_values.values.search_statusmultilateral[0]
                }
            },
            {
                "name": "order",
                "parameters": {
                    "country_en": "ASC",
                    "w_institute_en": "ASC",
                    "cropname": "ASC",
                    "taxon": "ASC"
                }
            },
            {
                "name" : "columns",
                "parameters" : {
                    "columns": [
                        "nicode",
                        "country_en",
                        "w_instcode",
                        "w_institute_en",
                        "accenumb",
                        "cropname",
                        "genus",
                        "species",
                        "taxon",
                        "acqdate",
                        "origcty",
                        "sampstat",
                        "declatitude",
                        "declongitude",
                        "collsrc",
                        "storage",
                        "mlsstat"
                    ]
                }
            }
        ];

        this.flowmodel.flow = payload;

        return payload;
    };

    Exsitu_search.prototype._preparePayloadElastic = function (from) {

        var filter_values = this.filter.getValues(),
            filter_taxon = $('#search_taxon').val(),
            array_taxon = [],
            filter_inst  = $('#search_instcode').val().substring(0,6),
            array_inst = [],
            filter_acces = $('#search_accessions').val().toUpperCase(),
            elastic_genus = [],
            mlstatus = null,
            origin_country = "",
            biostat = "";
            //elastic_genus = "";


        // Remember that arrays means multiple selection...
        if (filter_taxon.length > 0) array_taxon.push(filter_taxon);
        if (filter_inst.length > 0)  array_inst.push(filter_inst);
        if (filter_acces == "") filter_acces = null;
        // ... and boolean must be boolean.
        if (filter_values.values) {
            if (filter_values.values.search_statusmultilateral.length > 0)  mlstatus = (filter_values.values.search_statusmultilateral[0] == 'true');
            if (filter_values.values.search_country_origin.length > 0) origin_country = filter_values.values.search_country_origin.join(" ");
            if (filter_values.values.search_statusofaccession.length > 0) biostat = filter_values.values.search_statusofaccession.join(" ");
        }

        _.each(this.genus_species, function(object){
            //console.log(object);
            elastic_genus.push(String(object).replace(/,/g, '').split(" "));
            //elastic_genus += object + " ";
        });

//        console.log('len', this.genus_species.length);
//        console.log('elastic_genus', elastic_genus);

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
                "stakeholder_fullname",
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
                "year"
            ]
        };
        // Selected Elements - MUST BE [1]!!!
        if (this.genus_species.length) {
            payload.query.bool.must.push({"bool": {
                    "should": []
                }}
            );
            _.each(elastic_genus, function(selection) {
                console.log(selection);
                if(selection.length == 1) {
                    // We're in the "Genus only" section
                    payload.query.bool.must[1].bool.should.push({"match_phrase": {"genus_name": selection[0]}});
                } else {
                    // Standard "Genus/Species" couple.
                    console.log('payload is', payload);
                    payload.query.bool.must[1].bool.should.push({"bool": {
                        "must": [
                            {"match_phrase": {"genus_name": selection[0]}},
                            {"match_phrase": {"species_name": selection[1]}}
                        ]
                    }});
                }
            });
        }
        // Country
        if (filter_values.values.search_country_institute.length) payload.query.bool.must.push({"match_phrase": {"country_iso3": filter_values.values.search_country_institute[0]}});
        // Stakeholder
        if (array_inst.length) payload.query.bool.must.push({"match_phrase": {"stakeholder_id": array_inst[0]}});
        // Acc Number
        if (filter_acces != null) payload.query.bool.must.push({"match_phrase": {"accession_number": filter_acces}});
        // Multilateral
            if (mlstatus != null) payload.query.bool.must.push({"match_phrase": {"status_under_multilateral_system": mlstatus}});
        // Array > Spaced
        // Country of Origin
        if (filter_values.values.search_country_origin.length) payload.query.bool.must.push({"match": {"orig_country_iso3": origin_country}});
        // Biostat
        if (filter_values.values.search_statusofaccession.length) payload.query.bool.must.push({"match": {"biological_status_of_accession_id": biostat}});

        this.flowmodel.flow = [
            {
                "name": "wiews_exsitu_filter",
                "sid": [ { "uid": "wiews_2014" },{ "uid": "wiews_2016" },{ "uid": "ref_sdg_institutes" },{ "uid": "ref_iso3_countries" } ],
                "parameters": {
                    "year" : filter_values.values.search_year[0],
                    "countries" : filter_values.values.search_country_institute,
                    "institutes" : array_inst,
                    "genus_species" : elastic_genus,
                    "taxons" : array_taxon,
                    "sampstat" : filter_values.values.search_statusofaccession,
                    "accenumb" : filter_acces,
                    "originCountries" : filter_values.values.search_country_origin,
                    "mlsstat" : filter_values.values.search_statusmultilateral[0]
                }
            },
            {
                "name": "order",
                "parameters": {
                    "country_en": "ASC",
                    "w_institute_en": "ASC",
                    "cropname": "ASC",
                    "taxon": "ASC"
                }
            },
            {
                "name" : "columns",
                "parameters" : {
                    "columns": [
                        "nicode",
                        "country_en",
                        "w_instcode",
                        "w_institute_en",
                        "accenumb",
                        "cropname",
                        "genus",
                        "species",
                        "taxon",
                        "acqdate",
                        "origcty",
                        "sampstat",
                        "declatitude",
                        "declongitude",
                        "collsrc",
                        "storage",
                        "mlsstat"
                    ]
                }
            }
        ];

        this.elastic_export = payload;

        return payload;
    };

    Exsitu_search.prototype._prepareFilterPayload = function (which, text) {
        var selected_year, selected_wcr,
            filter_values = this.filter.getValues();

        if (filter_values.valid = true) {
            selected_year = filter_values.values.search_year[0];
            selected_wcr  = filter_values.values.search_search_crop_wild_relatives[0];
        }

        this.selected_year = filter_values.values.search_year[0];
        this.cwr = (filter_values.values.search_search_crop_wild_relatives[0] == 'true');

        var inst_payload = [
            {
                "name": "wiews_exsitu_institute_filter",
                "sid": [ { "uid": "ref_sdg_institutes" } ],
                "parameters": {
                    "year" : selected_year,
                    "institute" : text
                }
            },
            {
                "name":"order",
                "parameters":{
                    "w_institute_en":"ASC"
                }
            }
        ];
        var crop_payload = [
            {
                "name": "wiews_exsitu_crops_filter",
                "sid": [ { "uid": "crop_genus" } ],
                "parameters": {
                    "year" : selected_year,
                    "crop" : text,
                    "cwr" : selected_wcr
                }
            },
            {
                "name":"order",
                "parameters":{
                    "crop_en":"ASC"
                }
            }
        ];

        var taxon_payload = [
            {
                "name": "wiews_exsitu_taxon_filter",
                "sid": [ { "uid": "ref_sdg_taxon" } ],
                "parameters": {
                    "year" : selected_year,
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
        var genus_payload = [
            {
                "name": "wiews_exsitu_genus_filter",
                "sid": [ { "uid": "ref_sdg_species" } ],
                "parameters": {
                    "year" : selected_year,
                    "genus" : text
                }
            },
            {
                "name":"order",
                "parameters":{
                    "genus":"ASC"
                }
            }
        ];
        var species_payload = [
            {
                "name": "wiews_exsitu_species_filter",
                "sid": [ { "uid": "ref_sdg_species" } ],
                "parameters": {
                    "year" : selected_year,
                    "genus" : this.genus
                }
            },
            {
                "name":"order",
                "parameters":{
                    "species":"ASC"
                }
            }
        ];

        if (which == "wiews_exsitu_crops_filter") return crop_payload;
        if (which == "wiews_exsitu_institute_filter") return inst_payload;
        if (which == "wiews_exsitu_taxon_filter") return taxon_payload;
        if (which == "wiews_exsitu_genus_filter") return genus_payload;
        if (which == "wiews_exsitu_species_filter") return species_payload;

    };

    Exsitu_search.prototype._prepareElasticPayload = function (which, text) {
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

    Exsitu_search.prototype._searchfromkeyboard = function (freetext) {
        freetext ? this._initTablePaginated(this._callServices(this._preparePayload($('#search_omnibox').val()))) : this._initTable(this._callServices(this._preparePayload()));
        self._statesManagement('results');
    };

    Exsitu_search.prototype._executeSearch = function () {
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

    Exsitu_search.prototype._resetForm = function (saveyear) {
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
        $('#combined_elements_container').empty();
        $('#combined_elements_container_empty').css('visibility','visible');
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

    Exsitu_search.prototype._bindYearListener = function () {
        var self = this;
        $('[data-selector=search_year]').on('change', function(){
            self._resetForm(true);
        });
    };

    // Events
    Exsitu_search.prototype._bindEventListeners = function () {
        var self = this;

        this.filter.on('ready', function(){
            self.initial = self.filter.getValues();
            self._bindYearListener();
            if (self.instcode.length) self._executeSearch();
            if (self.country_search.length) self._executeSearch();
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
                var tabledata = self._exportElastic();
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
            }, 150);
        });

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
                                "order": {"_key": "asc"},
                                "size": 1000
                            }
                        }
                    }
                }, "wiews_exsitu_species_filter"
            );

            var engine = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: self._speciesTransformElastic(result)
            });

            $('#search_spieces').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                {
                  name: 'search_species',
                  //display: 'species',
                  source: engine,
                    templates: {
                      //suggestion: Handlebars.compile('<div>{{species}}</div>'),
                      empty: Handlebars.compile('<div class="tya_notfound">'+labels[Clang]['organizations_search_not_found']+'</div>'),
                  }
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

    Exsitu_search.prototype._RemoveParameterFromUrl = function(url, parameter) {
        return url
            .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
            .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
    };

    Exsitu_search.prototype._importThirdPartyCss = function () {

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

    return new Exsitu_search();

});