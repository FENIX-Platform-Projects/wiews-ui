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
    'typeahead.js',
    "bootstrap",
    "bootstrap-table",
    '../../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export'
], function ($, log, _, Handlebars, Report, Filter, C, template, labels, Bloodhound, bootstrap) {

    "use strict";
    var Clang = C.lang.toLowerCase(),
        services_url = "http://fenix.fao.org/d3s_wiews/processes",
        fromFreetext = false;

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
                    dsd.push(column.id)
                } );
                //console.log(dsd);
                _.each( res.data, function( element ) {
                    var item = {};
                    _.each(dsd, function (col_name, col_index) {
                        item[col_name] = element[col_index];
                    });
                    table_data.push(item);
                });

                //console.log(table_data);
            }

        });

        return table_data;

    };

    Exsitu_search.prototype._exportList = function () {
        var flow_model =  this.flowmodel;
        flow_model.flow[2].rid = { "uid" : "exsitu_data" };
        if (flow_model.flow[0].parameters.accenumb == null) delete flow_model.flow[0].parameters.accenumb;
        console.log(JSON.stringify(flow_model));
        this.report.export({
            format: "flow",
            config: flow_model
        });
    };

    Exsitu_search.prototype._getParameterByName = function (name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    Exsitu_search.prototype._initTable = function(data) {
        if (this.instcode.length) this._fillResults(data[0]);
        $(s.TABLE).bootstrapTable('destroy');
        $(s.TABLE).bootstrapTable({
            data : data,
            pagination: true,
            pageSize: 10,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            formatSearch: function() {
                return labels[Clang]['organizations_search_filter']
            },
            paginationVAlign: "top",
            sortable: true
        });
    };

    Exsitu_search.prototype._bloodHoundPrefetch = function (which) {
        var self = this;
        return new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            identify: function(obj) { return obj.name; },
            remote: {
                url: services_url,
                prepare: function (query, settings) {
                    settings.async = false;
                    settings.type = "POST";
                    settings.contentType = "application/json; charset=utf-8";
                    settings.dataType = 'json';
                    settings.data = JSON.stringify(self._prepareFilterPayload(which,query));
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

    Exsitu_search.prototype._speciesTransform = function (arrayofspecies) {
        var output = [];

        _.each(arrayofspecies, function(element) {
            output.push(element.species);
        });

        return output;
    };

    Exsitu_search.prototype._attach = function () {
        var self = this;

        $(s.EL).html(template(labels[Clang]));
        this._initTable([]);

        $('#table').on('click-row.bs.table', function(row, $element, field){
            self._statesManagement('details');
            $('#backtosearch_fromomni').hide();
            $('#backtoresults').show();
           // history.replaceState({ page : "details" }, null, "/wiews/data/organizations/"+self.lang.toLowerCase()+"/?instcode="+$element['instcode']+"#details");
            self._fillResults($element);
        });
        $('[data-role=results]').hide();
        $('[data-role=details]').hide();


        var prefetchCrops = this._bloodHoundPrefetch('wiews_exsitu_crops_filter');
        var prefetchInstitute = this._bloodHoundPrefetch('wiews_exsitu_institute_filter');
        var prefetchTaxon = this._bloodHoundPrefetch('wiews_exsitu_taxon_filter');
        var prefetchGenus = this._bloodHoundPrefetch('wiews_exsitu_genus_filter');

        $('#search_crop').typeahead(this.tya_options,
            {
                name: 'search_crop',
                display: 'crop_en',
                limit: 100,
                source: prefetchCrops,
                templates: {
                    suggestion: Handlebars.compile('<div>{{crop_en}}</div>'),
                    empty: Handlebars.compile('<div class="tya_notfound">'+labels[Clang]['organizations_search_not_found']+'</div>'),
                }
            }
        );

        $('#search_instcode').typeahead(this.tya_options,
            {
                name: 'search_instcode',
                display: 'w_institute_en',
                limit: 100,
                source: prefetchInstitute,
                templates: {
                    suggestion: Handlebars.compile('<div>{{w_institute_en}}</div>'),
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
                display: 'genus',
                limit: 100,
                source: prefetchGenus,
                templates: {
                    suggestion: Handlebars.compile('<div>{{genus}}</div>'),
                    empty: Handlebars.compile('<div class="tya_notfound">'+labels[Clang]['organizations_search_not_found']+'</div>'),
                }
            }
        );
        /*
        $('#search_omnibox').bind('typeahead:select', function(ev, suggestion) {
            self._statesManagement('details', suggestion);
            $('#backtosearch_fromomni').show();
            $('#backtoresults').hide();
            self._fillResults(suggestion);
        });
        */
        // FENIX Filter

        this.filter = new Filter({
            el: s.FENIX_FILTER,
            selectors: {
                "search_country_institute": {
                    "cl": { uid: "ISO3" },
                    "selector": {
                        "id": "dropdown",
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
                        default : ['2016'],
                        source: [
                            {value: "2014", label: "2014"},
                            {value: "2016", label: "2016"}
                        ],
                        "config" : {
                            "placeholder": labels[Clang]['exsitu-search_search_year'],
                            "maxItems": 1
                        }
                    }
                },
                "search_country_origin" : {
                    "cl": { uid: "ISO3" },
                    "selector": {
                        "id": "dropdown",
                        "config": {
                            "placeholder" : labels[Clang]['exsitu-search_search_country_origin']
                        }
                    },
                    "format": {
                        "output": "codes"
                    }
                },
                "search_statusofaccession" : {
                    "cl" : { uid: "wiews_biological" },
                    selector: {
                        id: "dropdown",
                        /*
                        source: [
                            { value: "100", label: "100) Wild" },
                            { value: "200", label: "200) Weedy" },
                            { value: "300", label: "300) Traditional cultivar/Landrace" },
                            { value: "400", label: "400) Breeding/research material" },
                            { value: "500", label: "500) Advanced/Improved cultivar" },
                            { value: "600", label: "600) GMO" }
                        ],
                        */
                        "config" : {
                            "placeholder": labels[Clang]['exsitu-search_search_statusofaccession']
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
                            "placeholder": labels[Clang]['exsitu-search_search_statusmultilateral']
                        },
                        sort: false
                    }
                },
                "search_search_crop_wild_relatives" : {
                    selector: {
                        id: "dropdown",
                        default : ['false'],
                        source: [
                           // {value: "null", label: labels[Clang]['exsitu-search_search_crop_wild_relatives_null']},
                            {value: "true", label: labels[Clang]['exsitu-search_search_crop_wild_relatives_true']},
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
        });
        self.initial = {};

        if (this.instcode.length) {
            var result = this._callServices([
                {
                    "name": "wiews_organization_filter",
                    "sid": [ { "uid": "wiews_organizations" } ],
                    "parameters": {
                        "instcode" : this.instcode.toUpperCase()
                    }
                },
                {
                    "name":"order",
                    "parameters":{
                        "search_rank":"ASC",
                        "name":"ASC",
                        "acronym":"ASC",
                        "instcode":"ASC",
                        "parent_name":"ASC",
                        "address":"ASC",
                        "city":"ASC",
                        "country":"ASC"
                    }
                }
            ]);
            if (result.length) {
                this._initTable(result);
                self._statesManagement('querystring');
                $('#backtosearch_fromomni').show();
                $('#backtoresults').hide();
            } else {
                $('#orgalert_message').html(labels[Clang]['organizations_search_from_querystring']);
                $('[data-role=messages]').show();
            }
        }

        $('#advanced').click();

    };

    Exsitu_search.prototype._fillResults = function(content) {
        _.each(content, function(row_value, row_name) {
            var content = row_value;
            if (row_value == "undefined" || row_value == null || row_value == "") content = " - ";
            $('[data-GPAIndex='+row_name+']').html(content);
            //Special Case
            if (row_name == "mlsstat") $('[data-GPAIndex='+row_name+']').html((content)? 'Included' : 'Not included' );
        });
    };

    Exsitu_search.prototype._initVariables = function () {

        this.instcode = ((this._getParameterByName('instcode')) ? this._getParameterByName('instcode') : "");

        this.$el = $(s.EL);
        this.lang = Clang;
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;

        if (this.report && $.isFunction(this.report.dispose)) {
            this.report.dispose();
        }

        this.report = new Report({
            environment: this.environment,
            cache: this.cache,
            silent: true
        });

        this.genus = "";
        this.selected_year = 2016;
        this.cwr = null;
        this.loaded_crop = [];
        this.genus_species = [];

        this.tya_options = {
            hint: true,
            highlight: true,
            minLength: 3
        };

        this.flowmodel = {
            "outConfig": {
                "plugin": "wiewsOutputCSV"
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
                var details_url = (payload) ? "/wiews/data/organizations/"+this.lang.toLowerCase()+"/?instcode="+payload.instcode+"#details" : "#details";
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
            filter_inst  = $('#search_instcode').val(),
            array_inst = [],
            filter_acces = $('#search_accessions').val();

        // Remember that arrays means multiple selection
        if (filter_taxon.length > 0) array_taxon.push(filter_taxon);
        if (filter_inst.length > 0)  array_inst.push(filter_inst);
        if (filter_acces == "") filter_acces = null;

        var payload = [
            {
                "name": "wiews_exsitu_filter",
                "sid": [ { "uid": "wiews_2014" },{ "uid": "wiews_2016" },{ "uid": "ref_sdg_institutes" },{ "uid": "ref_iso3_countries" } ],
                "parameters": {
                    "year" : filter_values.values.search_year[0],
                    "countries" : filter_values.values.search_country_institute,
                    "institutes" : array_inst,
                    "genus_species" : this.genus_species,
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

    }

    Exsitu_search.prototype._searchfromkeyboard = function (freetext) {
        freetext ? this._initTable(this._callServices(this._preparePayload($('#search_omnibox').val()))) : this._initTable(this._callServices(this._preparePayload()));
        self._statesManagement('results');
    };

    Exsitu_search.prototype._resetForm = function (withyear) {
        // Clear them all
        // Country (FENIX)
        // Holding Instcode
        $('#search_instcode').val('');
        // Name of Crop
        $('#search_crop').val('');
        // Wild Crop relative (FENIX)
        // Genus
        $('#search_genus').val('');
        // Species
        $('#search_spieces').val('');
        // Selection
        $('#combined_elements_container').empty();
        // Taxon
        $('#search_taxon').val('');
        // Accession Number
        $('#search_instcode').val('');
        // Country of Origin (FENIX)
        // Biological status (FENIX)
        // Multilateral (FENIX)
        // Year (FENIX)
        if (withyear) this.initial.values['search_year'][0] = this.selected_year;
        this.filter.setValues({
            values: this.initial.values
        });
    };

    // Events
    Exsitu_search.prototype._bindEventListeners = function () {
        var self = this;

        this.filter.on('ready', function(){
            self.initial = self.filter.getValues();
        });

        $('#search_button').on('click', function(){
            $('[data-role=messages]').hide();
            if ($('#search_omnibox').val().length < 1) {
                $('#orgalert_message').html(labels[Clang]['organizations_search_orgalert_message']);
                $('[data-role=messages]').show();
                return;
            }
            self._initTable(self._callServices(self._preparePayload($('#search_omnibox').val())));
            self._statesManagement('results');
        });

        $('#adv_search_button').on('click', function(){
            self._initTable(self._callServices(self._preparePayload()));
            self._statesManagement('results');
        });

        $('#adv_clear_button').on('click', function(){
            self._resetForm(true);
        });

        $('#advanced').on('click', function(){
           $('[data-role=messages]').hide();
           var str = $('#advanced-search').hasClass('advanced') ? labels[self.lang]['search_advanced'] : labels[self.lang]['search_basic'];
           $('#advanced-search').toggleClass('advanced');
           $(this).html(str);
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
            self._exportList();
        });

        function appendElement(genus, species) {
            var element = (species.length > 0)? genus+' '+species : genus+' '+'[all]';
            $('#combined_elements_container').prepend('<div data-value="'+element+'" class="addedelement">'+element+'<span title="'+labels[Clang]['exsitu-search_search_added_element_remove']+'" class="addedelement_remove"> × </span></div>');
            $('[data-value="'+element+'"]').click( function(){ this.remove(); } );
            (species.length > 0)? self.genus_species.push([genus,species]) : self.genus_species.push([genus,null]);
        }

        $('#btn_clearserach').on('click', function(){
            $('#combined_elements_container').empty();
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
                result = self._callServices([
                    {
                        "name": "wiews_exsitu_crops_genus_filter",
                        "sid": [ { "uid": "crop_genus" }, { "uid": "ref_sdg_species" } ],
                        "parameters": {
                            "year" : self.selected_year,
                            "crops" : [$('#search_crop').val()],
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

        /*
        $('[data-selector=search_year]').on('change', function(){
            self._resetForm(false);
        });
        */

        $('#search_genus').on('typeahead:select', function(event, selection) {
            $('#search_spieces').typeahead('destroy');
            self.genus = selection['genus'];
            var result = self._callServices([
                {
                    "name": "wiews_exsitu_species_filter",
                    "sid": [ { "uid": "ref_sdg_species" } ],
                    "parameters": {
                        "year" : self.selected_year,
                        "genus" : self.genus
                    }
                },
                {
                    "name":"order",
                    "parameters":{
                        "species" : "ASC"
                    }
                }
            ]);

            var engine = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: self._speciesTransform(result)
            });

            $('#search_spieces').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 0
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

        //$('div.selectize-control.multi div.selectize-input div.item').click(function(){ alert('removeme!')});

        this.filter.on('select', function(evt) {
            if (evt.id == "search_year") self.selected_year = evt.values[0];
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