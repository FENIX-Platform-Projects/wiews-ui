define([
    "jquery",
    "loglevel",
    "underscore",
    "handlebars",
    "../config/config",
    "../html/organizations/template.hbs",
    "../nls/labels",
    'typeahead.js',
    "bootstrap",
    "bootstrap-table",
    '../../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export'
], function ($, log, _, Handlebars, C, template, labels, Bloodhound, bootstrap) {

    "use strict";
    var Clang = C.lang.toLowerCase(),
        services_url = "http://fenix.fao.org/d3s/processes",
        iso3 = "http://fenixservices.fao.org/d3s/msd/resources/uid/ISO3";

    var s = {
        EL: "#organizations",
        TABLE: "#table"
    };

    function Organizations() {
        console.clear();
        // silent trace
        log.setLevel("silent");
        this._importThirdPartyCss();
        this._validateConfig();
        this._attach();
        this._initVariables();
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
                            "latitude": element[23]
                        }
                    );
                });
            }

        });

        $(s.TABLE).bootstrapTable('destroy');
        this._initTable(table_data);

    };

    Organizations.prototype._exportList = function () {

        var payload = {
            "outConfig": {
                "plugin": "wiewsOutputCSV"
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
                        "freetext": "ritA ora de c",
                        "name": "ritA ora de c",
                        "acronym": "ritA ora de c",
                        "instcode": "ritA ora de c",
                        "city": "ritA ora de c",
                        "country_iso3": [
                            "EGY",
                            "UGA"
                        ],
                        "valid": true
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
                            "parent_name",
                            "address",
                            "city",
                            "country"
                        ]
                    }
                }
            ]
        };


    };

    Organizations.prototype._initTable = function(data) {
        $(s.TABLE).bootstrapTable({
            data : data,
            pagination: true,
            pageSize: 10,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            formatSearch: function() {
                return labels[Clang]['organizations_search_filter']
            },
            sortable: true,
            icons: {

            },
            showExport: true,
            exportTypes: []
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
                                "name": element[0] ,
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
                                "latitude": element[23]

                            }
                        );
                    });

                    return response_data;
                }

            }
        });

        $('#search_omnibox').typeahead({
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
    };

    Organizations.prototype._fillResults = function(content) {
        _.each(content, function(row_value, row_name) {
            var content = row_value;
            if (row_value == "undefined" || row_value == null) content = " - ";
            $('[data-GPAIndex='+row_name+']').html(content);
            if (row_name == "valid_flag") if (row_value == false) {
                $('#containerGPA div.tableheader').css('display', 'table');
            } else {
                $('#containerGPA div.tableheader').css('display', 'none');
            }
        });
    };

    Organizations.prototype._initVariables = function () {

        this.$el = $(s.EL);
        this.lang = Clang;
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;

    };

    Organizations.prototype._preparePayload = function (freetext) {

        if (freetext) return [
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
        var isValid = ($('#search_validation').val() == 'true');


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
        if ($('#search_country').val() != '') {
            var country = [];
            country.push($('#search_country').val());
            payload[0].parameters.country_iso3 = country;

        }

        return payload;
    }

    Organizations.prototype._searchfromkeyboard = function (freetext) {
        freetext ? this._callServices(this._preparePayload($('#search_omnibox').val())) : this._callServices(this._preparePayload());
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
                $('[data-role=messages]').show();
                return;
            }
            self._callServices(self._preparePayload($('#search_omnibox').val()));
            $('[data-role=filters]').hide();
            $('[data-role=results]').show();
            $('[data-role=details]').hide();
        });

        $('#adv_search_button').on('click', function(){
            self._callServices(self._preparePayload());
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