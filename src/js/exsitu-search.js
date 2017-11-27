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

    Exsitu_search.prototype._exportList = function (freetext) {
        var flow_model = {
            "outConfig": {
                "plugin": "wiewsOutputCSV"
            },
            "options": {
                "params" : {
                    "maxSize" : 200000,
                    "language": this.lang.toUpperCase()
                }
            },
            "flow": [
                {
                    "name": "wiews_organization_filter",
                    "sid": [
                        {
                            "uid": "wiews_organizations"
                        }
                    ],
                    "parameters": {
                        "name" : $('#search_name').val(),
                        "acronym" : $('#search_organization').val(),
                        "instcode" : $('#search_instcode').val(),
                        "city" : $('#search_city').val()
                    }
                },
                {
                    "name": "order",
                    "parameters": {
                        "search_rank": "ASC",
                        "name": "ASC",
                        "acronym": "ASC",
                        "instcode": "ASC",
                        "parent_name": "ASC",
                        "address": "ASC",
                        "city": "ASC",
                        "country": "ASC"
                    }
                },
                {
                    "name": "columns",
                    "parameters": {
                        "columns": [
                            "name",
                            "acronym",
                            "instcode",
                            "parent_instcode",
                            "parent_name",
                            "address",
                            "zip_code",
                            "city",
                            "country_iso3",
                            "country",
                            "telephone",
                            "fax",
                            "email",
                            "website",
                            "status",
                            "organization_roles",
                            "longitude",
                            "latitude",
                            "valid_instcode"
                        ]
                    }
                }
            ]
        },
            filter_values = this.filter.getValues();


        //console.log('from export', filter_values);


        if (freetext) {
            flow_model.flow[0].parameters = {};
            flow_model.flow[0].parameters.freetext = $('#search_omnibox').val();
        } else {
            var isValid = (filter_values.values.valid == 'true');
            if (filter_values.values.valid != 'null') flow_model.flow[0].parameters.valid = isValid;
            if (filter_values.values.country.length > 0 ) flow_model.flow[0].parameters.country_iso3 = filter_values.values.country;
            if (filter_values.values.organizations_role.length > 0 ) flow_model.flow[0].parameters.roles = filter_values.values.organizations_role;

        }
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
    }

    Exsitu_search.prototype._attach = function () {
        var self = this;

        $(s.EL).html(template(labels[Clang]));
        this._initTable([]);

        $('#table').on('click-row.bs.table', function(row, $element, field){
            self._statesManagement('details');
            $('#backtosearch_fromomni').hide();
            $('#backtoresults').show();
            history.replaceState({ page : "details" }, null, "/wiews/data/organizations/"+self.lang.toLowerCase()+"/?instcode="+$element['instcode']+"#details");
            self._fillResults($element);
        });
        $('[data-role=results]').hide();
        $('[data-role=details]').hide();

        var prefetchOrganizations = new Bloodhound({
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
                    settings.data = JSON.stringify(self._preparePayload(query));

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

        $('#search_omnibox').typeahead(
            {
                hint: true,
                highlight: true,
                minLength: 3
            },
            {
                name: 'name',
                display: 'name',
                source: prefetchOrganizations,
                templates: {
                    suggestion: Handlebars.compile('<div><strong>{{name}}</strong> - {{instcode}} <span class="suggestion-country pull-right">{{country}}</span></div>'),
                    empty: Handlebars.compile('<div class="tya_notfound">'+labels[Clang]['organizations_search_not_found']+'</div>'),
                }
            }
        );

        $('#search_omnibox').bind('typeahead:select', function(ev, suggestion) {
            self._statesManagement('details', suggestion);
            $('#backtosearch_fromomni').show();
            $('#backtoresults').hide();
            self._fillResults(suggestion);
        });

        // FENIX Filter

        this.filter = new Filter({
            el: s.FENIX_FILTER,
            selectors: {
                "search_country_institute": {
                    "cl": { uid: "ISO3" },
                    "selector": {
                        "id": "dropdown",
                        "config": {
                            "maxItems": 1,
                            "placeholder" : labels[Clang]['exsitu-search_search_country_institute']
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
                            "maxItems": 1,
                            "placeholder" : labels[Clang]['exsitu-search_search_country_origin']
                        }
                    },
                    "format": {
                        "output": "codes"
                    }
                },
                "search_statusofaccession" : {
                    selector: {
                        id: "dropdown",
                        source: [
                            { value: "100", label: "100) Wild" },
                            { value: "200", label: "200) Weedy" },
                            { value: "300", label: "300) Traditional cultivar/Landrace" },
                            { value: "400", label: "400) Breeding/research material" },
                            { value: "500", label: "500) Advanced/Improved cultivar" },
                            { value: "600", label: "600) GMO" }
                        ],
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

    };

    Exsitu_search.prototype._fillResults = function(content) {
        var self = this;
        _.each(content, function(row_value, row_name) {
            var content = row_value;
            if (row_value == "undefined" || row_value == null) content = " - ";
            if (row_name == "parent_instcode") {
                $('[data-GPAIndex='+row_name+']').attr('href', '/wiews/data/organizations/'+self.lang.toLowerCase()+'/?instcode='+row_value+'#details');
                return;
            }
            $('[data-GPAIndex='+row_name+']').html(content);
            //Special Cases
            if (row_name == "valid_flag") if (row_value == false) {
                $('#containerGPA div.tableheader').css('display', 'table');
            } else {
                $('#containerGPA div.tableheader').css('display', 'none');
            }
            if (row_name.startsWith('role_f') && row_value == true) $('[data-GPAFlag='+row_name+']').removeClass('hiddenflag');
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
        fromFreetext = false;
        if (freetext){
            fromFreetext = true;
            return [
                {
                    "name": "wiews_organization_filter",
                    "sid": [ { "uid": "wiews_organizations" } ],
                    "parameters": {
                        "freetext" : freetext,
                        "valid" : true
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
            ];
        }

        var filter_values = this.filter.getValues(),
            isValid = (filter_values.values.valid == 'true');

        var payload = [
            {
                "name": "wiews_organization_filter",
                "sid": [ { "uid": "wiews_organizations" } ],
                "parameters": {
                    //"freetext" :  $('#search_omnibox').val(),
                    "name" : $('#search_name').val(),
                    "acronym" : $('#search_organization').val(),
                    "instcode" : $('#search_instcode').val(),
                    "city" : $('#search_city').val()
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
        ];

        if (filter_values.values.valid != 'null') payload[0].parameters.valid = isValid;
        if (filter_values.values.country.length > 0 ) payload[0].parameters.country_iso3 = filter_values.values.country;
        if (filter_values.values.organizations_role.length > 0 ) payload[0].parameters.roles = filter_values.values.organizations_role;

        return payload;
    }

    Exsitu_search.prototype._searchfromkeyboard = function (freetext) {
        freetext ? this._initTable(this._callServices(this._preparePayload($('#search_omnibox').val()))) : this._initTable(this._callServices(this._preparePayload()));
        self._statesManagement('results');
    };

    // Events
    Exsitu_search.prototype._bindEventListeners = function () {
        var self = this;

        // Enter keypress

        $('#search_name').on("keypress", function(e) {
            if (e.keyCode == 13) { // Enter
                self._searchfromkeyboard();
                return false; // prevent the button click from happening
            }
        });
        $('#search_organization').on("keypress", function(e) {
            if (e.keyCode == 13) { // Enter
                self._searchfromkeyboard();
                return false; // prevent the button click from happening
            }
        });
        $('#search_instcode').on("keypress", function(e) {
            if (e.keyCode == 13) { // Enter
                self._searchfromkeyboard();
                return false; // prevent the button click from happening
            }
        });
        $('#search_city').on("keypress", function(e) {
            if (e.keyCode == 13) { // Enter
                self._searchfromkeyboard();
                return false; // prevent the button click from happening
            }
        });
        $('#search_omnibox').on("keypress", function(e) {
            if (e.keyCode == 13) { // Enter
                $('[data-role=messages]').hide();
                if ($('#search_omnibox').val().length < 1) {
                    $('#orgalert_message').html(labels[Clang]['organizations_search_orgalert_message']);
                    $('[data-role=messages]').show();
                    return;
                }
                self._searchfromkeyboard($('#search_omnibox').val());
                return false; // prevent the button click from happening
            }
        });

        $('#search_omnibox').on('typeahead:asyncreceive', function() {
            if ($(this).data('tt-typeahead').menu._allDatasetsEmpty()) {
                $(this).trigger('typeahead:empty')
            }
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
            self._exportList(fromFreetext);
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