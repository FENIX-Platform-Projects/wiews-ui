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
    "json-2-csv",
    "file-saver",
    'typeahead.js',
    "bootstrap",
    "bootstrap-table",
    '../../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export',
    '../../node_modules/bootstrap-table/dist/bootstrap-table-locale-all',
    "string.prototype.startswith"
], function ($, log, _, Handlebars, Report, Filter, C, template, labels, converter, FileSaver, Bloodhound, bootstrap) {

    "use strict";
    var Clang = C.lang.toLowerCase(),
        services_url = "https://us-central1-fao-gift-app.cloudfunctions.net/elasticSearchGetData?index=organizations&multiSearch=no",
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

    Organizations.prototype._parseOutput = function (input) {
        var output = {
            total : 0,
            rows : []
        };
        //console.log('input is ',input);
        _.each(input.hits, function(process){
            output.rows.push({
                "name" : process._source.name,
                "acronym" : process._source.acronym,
                "instcode" : process._source.instcode,
                "parent_instcode" : process._source.parent_instcode,
                "parent_name" : process._source.parent_name,
                "address" : process._source.address,
                "zip_code" : process._source.zip_code,
                "city" : process._source.city,
                "country" : process._source.country,
                "telephone" : process._source.telephone,
                "fax" : process._source.fax,
                "email" : process._source.email,
                "website" : process._source.website,
                "status" : process._source.status,
                "valid_flag" : process._source.valid,
                "valid_instcode" : process._source.valid_instcode,
                "role_f646" : process._source.role_f646,
                "role_f647" : process._source.role_f647,
                "role_f648" : process._source.role_f648,
                "role_f649" : process._source.role_f649,
                "role_f650" : process._source.role_f650,
                "role_f651" : process._source.role_f651,
                "role_f652" : process._source.role_f652,
                "role_f653" : process._source.role_f653,
                "role_f654" : process._source.role_f654,
                "role_f655" : process._source.role_f655,
                "role_f656" : process._source.role_f656,
                "role_f657" : process._source.role_f657,
                "role_f658" : process._source.role_f658,
                "role_f869" : process._source.role_f869,
                "role_f874" : process._source.role_f874,
                "role_f875" : process._source.role_f875,
                "longitude" : process._source.longitude,
                "latitude" : process._source.latitude,
                "holdings" : 0
            });
        });
        output.total = input.total;
        //console.log('output is' ,output);
        return output;
    };

    Organizations.prototype._callGoogle = function (filename) {
        var self = this,
            response_data = {
                total : -1,
                hits : []
            },
            staticurl = C.URL_bucket;

        $.ajax({
            async: false,
            dataType: 'json',
            method: 'GET',
            contentType: "text/plain; charset=utf-8",
            url:  staticurl+filename,
            success: function(res) {
                // console.log('success is ',res);
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
                            label : element._source.title[self.lang.toUpperCase()],
                            value : element._source.code
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

    Organizations.prototype._callServices = function (payload) {
        var self = this,
            table_data = [];
        $.ajax({
            async: false,
            dataType: 'json',
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            url: services_url,
            data: JSON.stringify(payload),
            success: function(res) {
                table_data = self._parseOutput(self._consumeResponse(res));
            }

        });

        return table_data;

    };

    Organizations.prototype._exportList = function (freetext) {


        var json2csvCallback = function (err, csv) {
            if (err) throw err;
            var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
            FileSaver.saveAs(blob, "organizations.txt");
            //$('div#exsitu-search-ux-loader').hide();
            //$('[data-page=exsitu-search]').css('opacity','1');
        };
        converter.json2csv(this.table_data, json2csvCallback, {
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

        return;

    };

    Organizations.prototype._getParameterByName = function (name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    Organizations.prototype._initTable = function(data) {
        this.table_data = data.rows;
        var btLocale = {
            en : "en-US",
            es : "es-ES",
            fr : "fr-FR",
            ru : "ru-RU",
            ar : "ar-EG",
            zh : "zh-CN"
        };

        if (this.instcode.length) if (data.rows) this._fillResults(data.rows[0]);
        $(s.TABLE).bootstrapTable('destroy');
        $(s.TABLE).bootstrapTable({
            data : data.rows,
            locale: btLocale[C.lang.toLowerCase()],
            pagination: true,
            pageSize: 25,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            formatSearch: function() {
                return labels[Clang]['organizations_search_filter']
            },
            sortable: true,
            paginationVAlign: "top"
        });
    };

    Organizations.prototype._consumeResponse = function (response) {
        //console.log('response',response);
        return response.hits;
    };

    Organizations.prototype._attach = function () {
        var self = this;

        $(s.EL).html(template(labels[Clang]));
        this._initTable([]);

        var codelist_ISO3 = this._callGoogle('iso3_country_codes.json').hits;
        var codelist_OrgR = this._callGoogle('organization_roles.json').hits;


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
                    settings.contentType = "text/plain; charset=utf-8";
                    settings.dataType = 'json';
                    settings.data = JSON.stringify(self._preparePayload(query));

                    return settings;
                },
                transform: function (response) {
                    return self._parseOutput(self._consumeResponse(response)).rows;
                },
                rateLimitWait: 1000

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
                "country": {
                    //"cl": { uid: "ISO3" },
                    "selector": {
                        "id": "dropdown",
                        "source" : codelist_ISO3,
                        "config": {
                        //    "maxItems": 1,
                            "placeholder" : labels[Clang]['organizations_searchform_search_country'],
                            plugins: ['remove_button']
                        }
                    },
                    "format": {
                        "output": "codes"
                    }
                },
                "organizations_role": {
                    //"cl": { uid: "organizations_role" },
                    "selector": {
                        "id": "dropdown",
                        "source" : codelist_OrgR,
                        "config" : {
                            "placeholder": labels[Clang]['organizations_searchform_search_organizationrole'],
                            plugins: ['remove_button']
                        }
                    },
                    "format": {
                        "output": "codes"
                    }
                },
                "valid" : {
                    selector: {
                        id: "dropdown",
                        default : ['true'],
                        source: [
                            {value: "true", label: labels[Clang]['organizations_searchform_search_validation_true']},
                            {value: "null", label: labels[Clang]['organizations_searchform_search_validation_null']},
                            {value: "false", label: labels[Clang]['organizations_searchform_search_validation_false']}
                        ],
                        "config" : {
                            "maxItems": 1,
                            "placeholder": labels[Clang]['organizations_searchform_search_validation']
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
            var result = this._callServices({
                    "query": {
                        "wildcard": {"instcode.keyword": "*"+this.instcode.toUpperCase()+"*"}
                    },
                    "size": 2000
                });
            if (result.rows.length) {
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

    Organizations.prototype._clearSearch = function () {
        $('#search_name').val('');
        $('#search_organization').val('');
        $('#search_instcode').val('');
        $('#search_city').val('');
        $('#search_city').val('');
        this.filter.setValues({
            values: this.initial.values
        });
    };

    Organizations.prototype._fillResults = function(content) {
        var self = this,
            instcode = "";
        _.each(content, function(row_value, row_name) {
            var content = row_value;
            if (row_value == "undefined" || row_value == null) content = " - ";
            if (row_name == "parent_instcode") {
                $('[data-GPAIndex='+row_name+']').attr('href', '/wiews/data/organizations/'+self.lang.toLowerCase()+'/?instcode='+row_value+'#details');
                return;
            }
            if (row_name == "valid_instcode") {
                $('[data-GPAIndex='+row_name+']').attr('href', '/wiews/data/organizations/'+self.lang.toLowerCase()+'/?instcode='+row_value+'#details');
                return;
            }
            if (row_name == "instcode") {
                $('[data-GPAIndex=exsitu_search]').attr('href', '/wiews/data/ex-situ-sdg-251/search/'+self.lang.toLowerCase()+'/?instcode='+row_value+'#results');
                instcode = row_value;
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
        this._checkforHoldings(instcode);
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

    Organizations.prototype._statesManagement = function (whichstate, payload, frombutton) {
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

    Organizations.prototype._preparePayload = function (freetext) {
        //console.log ('payload prepared');

        fromFreetext = false;
        if (freetext){
            fromFreetext = true;
            return {
                "query": {
                    "wildcard": {"search_key": "*"+freetext.toLowerCase()+"*"}
                },
                "size": 2000
            };
        }

        var filter_values = this.filter.getValues();
        var isValid = filter_values.values.valid[0];

        var payload = {
            "query":{
                "bool":{
                    "must":[
                    ]
                }
            },
            "size": 2000
        };

        if (isValid != 'null') payload.query.bool.must.push({ "match":{ "valid": isValid } });

        if (filter_values.values.country.length > 0 ) payload.query.bool.must.push({ "match":{ "country_iso3": filter_values.values.country.join(" ")} });
        if ($('#search_city').val()) payload.query.bool.must.push({ "wildcard":{ "city":"*"+$('#search_city').val().toLowerCase()+"*" } });
        if ($('#search_name').val()) payload.query.bool.must.push({ "wildcard":{ "name":"*"+$('#search_name').val().toLowerCase()+"*" } });
        if ($('#search_organization').val()) payload.query.bool.must.push({ "wildcard":{ "acronym":"*"+$('#search_organization').val().toLowerCase()+"*" } });
        if ($('#search_instcode').val()) payload.query.bool.must.push({ "wildcard":{ "instcode.keyword":"*"+$('#search_instcode').val().toUpperCase()+"*" } });

        $.each(filter_values.values.organizations_role, function (index,obj) {
            var item = { "match":{ } };
            item.match["role_"+obj] = true;
            payload.query.bool.must.push(item);
        });

        return payload;
    }

    Organizations.prototype._searchfromkeyboard = function (freetext) {
        freetext ? this._initTable(this._callServices(this._preparePayload($('#search_omnibox').val()))) : this._initTable(this._callServices(this._preparePayload()));
        self._statesManagement('results');
    };

    Organizations.prototype._bindEventListeners = function () {
        var self = this;

        this.filter.on('ready', function(){
            self.initial = self.filter.getValues();
        });

        $('#clear_button').on('click', function () {
            self._clearSearch();
        });

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
            //self._initTable(self._callServices(self._preparePayload()));
            self._initTable(self._callServices(self._preparePayload()));
            self._statesManagement('results');
        });

        $('#advanced').on('click', function(){
           $('[data-role=messages]').hide();
           var str = $('#advanced-search').hasClass('advanced') ? labels[self.lang]['search_advanced'] : labels[self.lang]['search_basic'];
           $('#advanced-search').toggleClass('advanced');
           $('#simple-search').toggle();
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

    Organizations.prototype._RemoveParameterFromUrl = function(url, parameter) {
        return url
            .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
            .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
    };

    Organizations.prototype._checkforHoldings = function(payload) {
        //console.log('TODO');
        return;
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