define([
    "jquery",
    "loglevel",
    "underscore",
    "handlebars",
    "fenix-ui-reports",
    "fenix-ui-filter",
    "../config/config",
    "../html/organizations/template.hbs",
    "../nls/labels",
    'typeahead.js',
    "bootstrap",
    "bootstrap-table",
    '../../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export'
], function ($, log, _, Handlebars, Report, Filter, C, template, labels, Bloodhound, bootstrap) {

    "use strict";
    var Clang = C.lang.toLowerCase(),
        services_url = "http://fenix.fao.org/d3s/processes",
        fromFreetext = false;

    var s = {
        EL: "#organizations",
        TABLE: "#table",
        FENIX_FILTER : "#fenixfilter"
    };

    function Organizations() {
        console.clear();
        // silent trace
        log.setLevel("silent");
        this._importThirdPartyCss();
        this._validateConfig();
        this._initVariables();
        this._attach();
        this._bindEventListeners();
    };

    Organizations.prototype._validateConfig = function () {

        if (!C.lang) alert("Please specify a valid LANGUAGE in config/config.js");

    };

    Organizations.prototype._callServices = function (payload) {
        var table_data = [];
        $.ajax({
            async: false,
            dataType: 'json',
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            url: services_url,
            data: JSON.stringify(payload),
            success: function(res) {
                //console.log(res.metadata.dsd);
                _.each( res.data, function( element ) {
                    table_data.push(
                        {
                            "name": element[0],
                            "acronym": element[1],
                            "instcode": element[2],
                            "parentorg": element[3],
                            "parent_instcode" : element[4],
                            "address": element[5],
                            "city": element[6],
                            "country": element[7],
                            "country_iso3": element[8],
                            "valid_flag": element[9],
                            // 10 to 15 are indexes
                            "i_name" : element[10],
                            "i_acronym" : element[11],
                            "i_instcode" : element[12],
                            "i_address" : element[13],
                            "i_city" : element[14],
                            "freetext_index" : element[15],
                            // 10 to 15 are indexes
                            "zip_code": element[16],
                            "telephone": element[17],
                            "fax": element[18],
                            "email": element[19],
                            "website": element[20],
                            "status": element[21],
                            "longitute": element[22],
                            "latitude": element[23],
                            "organization_roles" : element[24],
                            // Flags
                            "flag_646": element[25],
                            "flag_647": element[26],
                            "flag_648": element[27],
                            "flag_649": element[28],
                            "flag_650": element[29],
                            "flag_651": element[30],
                            "flag_652": element[31],
                            "flag_653": element[32],
                            "flag_654": element[33],
                            "flag_655": element[34],
                            "flag_656": element[35],
                            "flag_657": element[36],
                            "flag_658": element[37],
                            "flag_869": element[38],
                            "flag_874": element[39],
                            "flag_875": element[40],
                            "search_rank" : element[41]
                        }
                    );
                });
            }

        });

        return table_data;

    };

    Organizations.prototype._exportList = function (freetext) {
        var flow_model = {
            "outConfig": {
                "plugin": "wiewsOutputCSV"
            },
            "options": {
                "params" : {
                    "maxSize" : 2000000,
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


        console.log('from export', filter_values);


        if (freetext) {
            flow_model.flow[0].parameters = {};
            flow_model.flow[0].parameters.freetext = $('#search_omnibox').val();
        } else {
            var isValid = ($('#search_validation').val() == 'true');
            if ($('#search_validation').val() != 'null') flow_model.flow[0].parameters.valid = isValid;
            if (filter_values.values.country.length > 0 ) flow_model.flow[0].parameters.country_iso3 = filter_values.values.country;
            if (filter_values.values.organizations_role.length > 0 ) flow_model.flow[0].parameters.roles = filter_values.values.organizations_role;

        }
        this.report.export({
            format: "flow",
            config: flow_model
        });
    };

    Organizations.prototype._getParameterByName = function (name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    Organizations.prototype._initTable = function(data) {
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
            sortable: true
        });
    }

    Organizations.prototype._attach = function () {
        var self = this;

        $(s.EL).html(template(labels[Clang]));
        this._initTable([]);

        $('#table').on('click-row.bs.table', function(row, $element, field){
            $('[data-role=filters]').hide();
            $('[data-role=results]').hide();
            $('[data-role=details]').show();
            $('#backtosearch_fromomni').hide();
            $('#backtoresults').show();
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
                    //console.log('response is ', response);
                    _.each( response.data, function( element ) {
                        response_data.push(
                            {
                                "name": element[0],
                                "acronym": element[1],
                                "instcode": element[2],
                                "parentorg": element[3],
                                "parent_instcode" : element[4],
                                "address": element[5],
                                "city": element[6],
                                "country": element[7],
                                "country_iso3": element[8],
                                "valid_flag": element[9],
                                // 10 to 15 are indexes
                                "i_name" : element[10],
                                "i_acronym" : element[11],
                                "i_instcode" : element[12],
                                "i_address" : element[13],
                                "i_city" : element[14],
                                "freetext_index" : element[15],
                                // 10 to 15 are indexes
                                "zip_code": element[16],
                                "telephone": element[17],
                                "fax": element[18],
                                "email": element[19],
                                "website": element[20],
                                "status": element[21],
                                "longitute": element[22],
                                "latitude": element[23],
                                "organization_roles" : element[24],
                                // Flags
                                "flag_646": element[25],
                                "flag_647": element[26],
                                "flag_648": element[27],
                                "flag_649": element[28],
                                "flag_650": element[29],
                                "flag_651": element[30],
                                "flag_652": element[31],
                                "flag_653": element[32],
                                "flag_654": element[33],
                                "flag_655": element[34],
                                "flag_656": element[35],
                                "flag_657": element[36],
                                "flag_658": element[37],
                                "flag_869": element[38],
                                "flag_874": element[39],
                                "flag_875": element[40],
                                "search_rank" : element[41]

                            }
                        );
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
            $('[data-role=filters]').hide();
            $('[data-role=results]').hide();
            $('[data-role=details]').show();
            $('#backtosearch_fromomni').show();
            $('#backtoresults').hide();
            self._fillResults(suggestion);
        });

        // FENIX Filter

        this.filter = new Filter({
            el: s.FENIX_FILTER,
            selectors: {
                "country": {
                    "cl": { uid: "ISO3" },
                    "selector": {
                        "id": "dropdown",
                        "config": {
                            "maxItems": 1
                        }
                    },
                    "format": {
                        "output": "codes"
                    }
                },
                "organizations_role": {
                    "cl": { uid: "organizations_role" },
                    "selector": {
                        "id": "dropdown"
                    },
                    "format": {
                        "output": "codes"
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
                $('[data-role=filters]').hide();
                $('[data-role=results]').hide();
                $('[data-role=details]').show();
                $('#backtosearch_fromomni').show();
                $('#backtoresults').hide();
            } else {
                $('#orgalert_message').html(labels[Clang]['organizations_search_from_querystring']);
                $('[data-role=messages]').show();
            }
        }

    };

    Organizations.prototype._fillResults = function(content) {
        _.each(content, function(row_value, row_name) {
            var content = row_value;
            if (row_value == "undefined" || row_value == null) content = " - ";
            if (row_name == "parent_instcode") {
                $('[data-GPAIndex='+row_name+']').attr('href', window.location.href.split('?')[0] + '?instcode='+row_value);
                return;
            }
            $('[data-GPAIndex='+row_name+']').html(content);
            //Special Cases
            if (row_name == "valid_flag") if (row_value == false) {
                $('#containerGPA div.tableheader').css('display', 'table');
            } else {
                $('#containerGPA div.tableheader').css('display', 'none');
            }
            if (row_name.startsWith('flag_') && row_value == true) $('[data-GPAFlag='+row_name+']').removeClass('hiddenflag');
        });
    };

    Organizations.prototype._initVariables = function () {

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

    Organizations.prototype._preparePayload = function (freetext) {
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

        var isValid = ($('#search_validation').val() == 'true'),
            filter_values = this.filter.getValues();

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

        if ($('#search_validation').val() != 'null') payload[0].parameters.valid = isValid;
        if (filter_values.values.country.length > 0 ) payload[0].parameters.country_iso3 = filter_values.values.country;
        if (filter_values.values.organizations_role.length > 0 ) payload[0].parameters.roles = filter_values.values.organizations_role;

        return payload;
    }

    Organizations.prototype._searchfromkeyboard = function (freetext) {
        freetext ? this._initTable(this._callServices(this._preparePayload($('#search_omnibox').val()))) : this._initTable(this._callServices(this._preparePayload()));
        $('[data-role=filters]').hide();
        $('[data-role=results]').show();
        $('[data-role=details]').hide();
    };

    // Events
    Organizations.prototype._bindEventListeners = function () {
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
            $('[data-role=filters]').hide();
            $('[data-role=results]').show();
            $('[data-role=details]').hide();
        });

        $('#adv_search_button').on('click', function(){
            self._initTable(self._callServices(self._preparePayload()));
            $('[data-role=filters]').hide();
            $('[data-role=results]').show();
            $('[data-role=details]').hide();
        });

        $('#advanced').on('click', function(){
           $('[data-role=messages]').hide();
           var str = $('#advanced-search').hasClass('advanced') ? labels[self.lang]['search_advanced'] : labels[self.lang]['search_basic'];
           $('#advanced-search').toggleClass('advanced');
           $(this).html(str);
        });

        $('#backtosearch').on('click', function(){
            $('[data-role=filters]').show();
            $('[data-role=results]').hide();
            $('[data-role=details]').hide();
        });

        $('#backtosearch_fromomni').on('click', function(){
            $('[data-role=filters]').show();
            $('[data-role=results]').hide();
            $('[data-role=details]').hide();
        });

        $('#backtoresults').on('click', function(){
            $('[data-role=filters]').hide();
            $('[data-role=results]').show();
            $('[data-role=details]').hide();
        });


        $('[data-role=organizations_exportbutton]').on('click', function() {
            self._exportList(fromFreetext);
        });

    };

    Organizations.prototype._importThirdPartyCss = function () {

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

    return new Organizations();

});