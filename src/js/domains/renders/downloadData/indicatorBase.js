define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../../config/config",
    "../../../../config/errors",
    "../../../../config/events",
    "../../../../config/domains/codelistPayloads",
    "../../../../config/domains/config",
    "../IndicatorCommonUtils",
    "../../../../nls/labels"
], function ($, log, _, C, ERR, EVT, CL, DM, ICUtils, labels) {


    'use strict';

    var defaultOptions = {};

    var s = {
        na : 'Na',

        geo_property : 'GEO',

        geo_filter : {
            "iso3": {
                "codes": [
                    {
                        "uid": "ISO3",
                        "codes": ''
                    }
                ]
            },
            "fao": {
                "codes": [
                    {
                        "uid": "wiews_fao_region_only",
                        "codes": ''
                    }
                ]
            },
            "m49": {
                "codes": [
                    {
                        "uid": "wiews_m49_region_only",
                        "codes": ''
                    }
                ]
            },
            "sdg": {
                "codes": [
                    {
                        "uid": "wiews_sdg_region_only",
                        "codes": ''
                    }
                ]
            },
            "mdg": {
                "codes": [
                    {
                        "uid": "wiews_mdg_region_only",
                        "codes": ''
                    }
                ]
            },
            "cgrfa": {
                "codes": [
                    {
                        "uid": "wiews_cgrfa_region_only",
                        "codes": ''
                    }
                ]
            },
            "itpgrfa": {
                "codes": [
                    {
                        "uid": "wiews_itpgrfa_region_only",
                        "codes": ''
                    }
                ]
            }
        },

        choices_code : {
            total : 'total',
            list : 'list',
            iso3 : 'iso3',
            fao : 'fao',
            m49 : 'm49',
            sdg : 'sdg',
            mdg : 'mdg',
            cgrfa : 'cgrfa',
            itpgrfa : 'itpgrfa',
            position : {
                countries: {
                    1 : 'iso3',
                    2 : 'iso3',
                    3 : 'iso3'
                },
                regions : {
                    1 : 'fao',
                    2 : 'm49',
                    3 : 'sdg',
                    4 : 'mdg',
                    5 : 'cgrfa',
                    6 : 'itpgrfa'
                }
            },
            groups: {
                countries: {
                    1 : "dd_filter_item_2_1",
                    2 : "dd_filter_item_2_2",
                    3 : "dd_filter_item_2_3"
                },
                regions : {
                    1 : "dd_filter_item_4_1",
                    2 : "dd_filter_item_4_2",
                    3 : "dd_filter_item_4_3",
                    4 : "dd_filter_item_4_4",
                    5 : "dd_filter_item_4_5",
                    6 : "dd_filter_item_4_6"
                }
            }
        },

        buttonMsg : {
            button_1 : "err_selection_not_valid",
            button_1_list : "err_selection_not_valid_list",
            button_2 : "err_selection_not_valid",
            button_2_list : "err_selection_not_valid_list",
            button_3 : "err_selection_not_valid",
            button_3_list : "err_selection_not_valid_list"
        },

        error_type : {
            list : 'list'
        },

        dd_tab_active : {
            geo_item : 'dd_filter_item_tab_4_1'
            /*geo_item : 'dd_filter_item_tab_1'*/
        },

        filter_available: [
            'dd_filter_item_2_1',
            'dd_filter_item_2_2',
            'dd_filter_item_2_3',
            'dd_filter_item_4_1',
            'dd_filter_item_4_2',
            'dd_filter_item_4_3',
            'dd_filter_item_4_4',
            'dd_filter_item_4_5',
            'dd_filter_item_4_6'
        ],

        filter_items : {
            item_1 : "dd_filter_item_1",
            item_2 : "dd_filter_item_2",
            item_2_1 : "dd_filter_item_2_1",
            item_2_2 : "dd_filter_item_2_2",
            item_2_3 : "dd_filter_item_2_3",
            item_3 : "dd_filter_item_3",
            item_4 : "dd_filter_item_4",
            item_4_1 : "dd_filter_item_4_1",
            item_4_2 : "dd_filter_item_4_2",
            item_4_3 : "dd_filter_item_4_3",
            item_4_4 : "dd_filter_item_4_4",
            item_5 : "dd_filter_item_5",
            item_6 : "dd_filter_item_6",
            item_7 : "dd_filter_item_7",
            item_7_1 : "dd_filter_item_4_5",
            item_7_2 : "dd_filter_item_4_6",
            item_8 : "dd_filter_item_8",
            item_9 : "dd_filter_item_9",
            item_10 : "dd_filter_item_10",
            item_11 : "dd_filter_item_11",
            tabItem_1 : "dd_filter_item_tab_1",
            tabItem_4 : "dd_filter_item_tab_4_1",
            tabItem_7 : "dd_filter_item_tab_7_1"
        },

        table_columns : {
            domain : 'domain',
            wiews_region : 'wiews_region',
            indicator : 'indicator',
            indicator_label : 'indicator_label',
            iteration : 'iteration',
            value : 'value'
        },

        dashboard_items : {
            item_1 : "dd_dashboard_item_1",
            item_2 : "dd_dashboard_item_2",
            item_3 : "dd_dashboard_item_3",
            item_4 : "dd_dashboard_item_4"
        },

        filterDivMsg1 : '',
        filterDivMsg1_text : ''
    }

    function IndicatorBase(o) {

        $.extend(true, this, defaultOptions, o);

        this.icUtils = new ICUtils();

        this._renderTemplate(s.filter_items.item_2, 1, 4);
        this._renderTemplate(s.filter_items.item_4, 1, 6);

        this._initVariables();

        return this;
    }

    IndicatorBase.prototype._initVariables = function () {
        /* default */
        /*
        s.filterDivMsg1 = this.filterDivMsg1;
        this.geoSelectedItem = "dd_filter_item_1";
        this.geoSelectedCode = "iso3";
        this.geoTreeItem = "dd_filter_item_2_1";
        this.geoListType = 1;
        */
        /* stefano */
        s.filterDivMsg1 = this.filterDivMsg1;
        this.geoSelectedItem = "dd_filter_item_4_1";
        this.geoSelectedCode = "fao";
        this.geoTreeItem = "dd_filter_item_4_1";
        this.geoListType = 1;
    };

    IndicatorBase.prototype._renderTemplate = function (item_to_show_prefix, item_to_show, codelistMaxIndex) {

        this._renderGeoSelection(item_to_show_prefix, item_to_show, codelistMaxIndex);

    }

    IndicatorBase.prototype.disable_element = function () {

        $('[data-selector = "'+s.filter_items.item_11+'"]').attr('disabled','disabled');
    };

    IndicatorBase.prototype._renderGeoSelection = function (item_to_show_prefix, item_to_show, codelistMaxIndex) {

        for(var index = 1; index<= codelistMaxIndex; index++) {
            var indicatorFilterSection = this.el.find('[data-selector = "'+item_to_show_prefix+'_'+index+'"]');
            indicatorFilterSection.hide();
            if((indicatorFilterSection!=null)&&(typeof indicatorFilterSection!='undefined')&&(index == item_to_show)){
                this.geoCodelistSelector = item_to_show_prefix+'_'+index;
                indicatorFilterSection.show();
            }
        }
    }

    IndicatorBase.prototype._filterSelectionValidation = function (values, params, button_type) {

        var valid = false, newValues = '', textMsg = '';



        if ((values != null) && (typeof values != 'undefined') && (s.filterDivMsg1 != null) && (typeof s.filterDivMsg1 != 'undefined') && (values.values != null) && (typeof values.values != 'undefined')) {

            //The geo element has been checked and updated
            newValues = this._geoItemSelectionValidation(values);

            if((newValues!= null) && (typeof newValues!= 'undefined'))
            {

                if (newValues.GEO.values.length > 0 && newValues.dd_filter_item_8.length > 0) valid = true;

                // No Controls
                //return newValues;
                /*
                console.log(newValues.GEO.values.length);
                for(var key in newValues) {
                    if(key== s.geo_property)
                    {
                        valid = true;
                    }
                    else if(button_type==3)
                    {
                        if((newValues[key] != null) && (typeof newValues[key] != 'undefined') && ((newValues[key].length>0)||(key==s.filter_items.item_8)||(key==s.filter_items.item_10)))
                        {
                            valid = true;
                        }
                        else{
                            valid = false;
                            break;
                        }
                    }
                    else if((newValues[key] != null) && (typeof newValues[key] != 'undefined') && ((newValues[key].length>0)||(key==s.filter_items.item_10)))
                    {
                        valid = true;
                    }
                    else{
                        valid = false;
                        break;
                    }
                }
                */
            }
        }

        if(!valid){
            if(button_type == "1"){
                if(s.filterDivMsg1_text == s.error_type.list){
                    textMsg = labels[params.lang][s.buttonMsg.button_1_list];
                }
                else{
                    textMsg = labels[params.lang][s.buttonMsg.button_1];
                }
            }
            else if(button_type == "2"){
                if(s.filterDivMsg1_text == s.error_type.list){
                    textMsg = labels[params.lang][s.buttonMsg.button_2_list];
                }
                else{
                    textMsg = labels[params.lang][s.buttonMsg.button_2];
                }
            }
            else if(button_type == "3"){
                if(s.filterDivMsg1_text == s.error_type.list){
                    textMsg = labels[params.lang][s.buttonMsg.button_3_list];
                }
                else{
                    textMsg = labels[params.lang][s.buttonMsg.button_3];
                }
            }
            s.filterDivMsg1.html(this.icUtils.prepareWarning(textMsg));
            s.filterDivMsg1.show();
        }

        if(!valid) newValues = '';

        return newValues;
    }

    IndicatorBase.prototype._geoItemSelectionValidation = function (values) {

        s.filterDivMsg1_text = '';
        var paramsForGeoValidation = {};
        paramsForGeoValidation.regionFilterItem = s.filter_items.item_2;
        paramsForGeoValidation.specialGroupFilterItem = s.filter_items.item_5;
        paramsForGeoValidation.checkboxRegionItem = s.filter_items.item_3;
        paramsForGeoValidation.checkboxSpecialGroupItem = s.filter_items.item_6;
        paramsForGeoValidation.toDelete = [s.filter_items.item_1, s.filter_items.item_2, s.filter_items.item_2_1, s.filter_items.item_2_2, s.filter_items.item_2_3, s.filter_items.item_3, s.filter_items.item_4_1, s.filter_items.item_4_2, s.filter_items.item_4_3, s.filter_items.item_4_4, s.filter_items.item_5, s.filter_items.item_6, s.filter_items.item_7_1, s.filter_items.item_7_2];
        paramsForGeoValidation.tab_active_geo_item = s.dd_tab_active.geo_item;
        paramsForGeoValidation.filter_items_tabItem_first = s.filter_items.tabItem_1;
        paramsForGeoValidation.filter_items_tabItem_second = s.filter_items.tabItem_4;
        paramsForGeoValidation.filter_items_tabItem_third = s.filter_items.tabItem_7;
        paramsForGeoValidation.filter_items_item_first = s.filter_items.item_2_1;
        paramsForGeoValidation.filter_items_codelistItem_tabItem_second = s.filter_items.item_1;
        paramsForGeoValidation.filter_items_listTypetItem_tabItem_second = s.filter_items.item_3;
        paramsForGeoValidation.filter_items_codelistItem_tabItem_third = s.filter_items.item_5;
        paramsForGeoValidation.filter_items_listTypetItem_tabItem_third = s.filter_items.item_6;
        paramsForGeoValidation.geoCodelistSelector = this.geoCodelistSelector;
        paramsForGeoValidation.values = values;

        paramsForGeoValidation.geo_SelectedItem = this.geoSelectedItem;
        paramsForGeoValidation.geo_SelectedCode = this.geoSelectedCode;
        paramsForGeoValidation.geo_SelectedTree = this.geoTreeItem;
        paramsForGeoValidation.geo_SelectedList = this.geoListType;

        var newValues = this.icUtils.geoItemSelectionValidation(paramsForGeoValidation);

        if(newValues.listTypeError){
            //s.filterDivMsg1_text = s.error_type.list;
            return;
        }

        return newValues.values;
    }

    IndicatorBase.prototype.onClickButton1 = function (values, dashboardConfig, params) {

        $('[data-field = "1"]').attr('data-field', s.table_columns.domain);
        $('[data-field = "'+s.table_columns.domain+'"]').text(dashboardConfig.columntableName[0]);
        $('[data-field = "2"]').attr('data-field', s.table_columns.wiews_region);
        $('[data-field = "'+s.table_columns.wiews_region+'"]').text(dashboardConfig.columntableName[1]);
        $('[data-field = "3"]').attr('data-field', s.table_columns.indicator);
        $('[data-field = "'+s.table_columns.indicator+'"]').text(dashboardConfig.columntableName[2]);
        $('[data-field = "4"]').attr('data-field', s.table_columns.indicator_label);
        $('[data-field = "'+s.table_columns.indicator_label+'"]').text(dashboardConfig.columntableName[3]);
        $('[data-field = "5"]').attr('data-field', s.table_columns.iteration);
        $('[data-field = "'+s.table_columns.iteration+'"]').text(dashboardConfig.columntableName[4]);
        $('[data-field = "6"]').attr('data-field', s.table_columns.value);
        $('[data-field = "'+s.table_columns.value+'"]').text(dashboardConfig.columntableName[5]);

        if (params.time_label != undefined) {
            $('[data-field = "5"]').attr('data-field', s.table_columns.iteration);
            $('[data-field = "'+s.table_columns.iteration+'"]').text(params.time_label);
        }

        var tableColumns = [s.table_columns.domain, s.table_columns.wiews_region, s.table_columns.indicator, s.table_columns.element, s.table_columns.iteration, s.table_columns.value];

        var newDashboardConfig =null;
        var newValues = this._filterSelectionValidation(values, params, "1");
        if((newValues!= null)&&(typeof newValues != 'undefined')&&(!$.isEmptyObject(newValues)))
        {
            var self = this;
            newDashboardConfig ={};
            newDashboardConfig.tableColumns = tableColumns;
            $.extend(true, newDashboardConfig, dashboardConfig);
            /*
            if((dashboardConfig!=null)&&(typeof dashboardConfig != 'undefined')){
                newDashboardConfig = self._table_element_configuration_update(newDashboardConfig, newValues, params);
            }
            */
        }

        return newDashboardConfig;

    };

    IndicatorBase.prototype.onClickButton2 = function (values, dashboardConfig, params) {

        var newDashboardConfig =null;
        var newValues = this._filterSelectionValidation(values, params, "2");
        if((newValues!= null)&&(typeof newValues != 'undefined')&&(!$.isEmptyObject(newValues)))
        {
            var self = this;
            newDashboardConfig ={};
            $.extend(true, newDashboardConfig, dashboardConfig);

            /*
            if((dashboardConfig!=null)&&(typeof dashboardConfig != 'undefined')){
                newDashboardConfig = self._download_element_table_element_configuration_update(newDashboardConfig, newValues, params);
            }
            */
        }

        return newValues.GEO;

    };

    IndicatorBase.prototype.onClickButton3 = function (values, dashboardConfig, params) {

        var self = this,
            data = {
                "indicator": parseInt(params.indicator_id),
                "separator": ",",
                "filters": {
                    "region": {
                        "type": self.geoSelectedCode.toUpperCase(),
                        "values": values.values[self.geoSelectedItem]
                    }
                }
            },
            $feedback = $('[data-buttonmsg="dd_filter_button_1_msg"]');

        $feedback.html('<div class="alert alert-info" role="alert"><center>'+labels[params.lang]['download_in_progress']+'</center></div>');
        $feedback.show();

        if (params.time == "years") {
            data.filters.year =  values.values['dd_filter_item_9'];
        } else {
            data.filters.iteration =  values.values['dd_filter_item_9'];
        }

        setTimeout(function() {
            $.ajax({
                async: false,
                dataType: 'json',
                method: 'POST',
                contentType: "text/plain; charset=utf-8",
                url: "https://us-central1-fao-gift-app.cloudfunctions.net/wiewsIndicatorsRawDownload",
                data: JSON.stringify(data),
                success: function (res) {
                    setTimeout(function () {
                        $feedback.hide();
                    }, 100);
                    window.open(res[0], '_blank');
                },
                error: function (res) {
                    if (res.responseText == "Record limit of 500000 exceeded.") {
                        //alert(res.responseText);
                        $feedback.html('<div class="alert alert-danger" role="alert"><center>' + res.responseText + '</center></div>');
                        $feedback.show();
                    }
                    console.log(res);
                    return;
                }

            });
        }, 500);

        /*

        var newDashboardConfig =null;
        var newValues = this._filterSelectionValidation(values, params, "3");
        if((newValues!= null)&&(typeof newValues != 'undefined')&&(!$.isEmptyObject(newValues)))
        {
            var self = this;
            newDashboardConfig ={};
            $.extend(true, newDashboardConfig, dashboardConfig);

            if((dashboardConfig!=null)&&(typeof dashboardConfig != 'undefined')){
                newDashboardConfig = self._download_element_raw_data_configuration_update(newDashboardConfig, newValues, params);
            }
        }

        return newDashboardConfig;

        */

    };


        IndicatorBase.prototype.bindEventListener = function () {
        var self = this;
        var anchor;
        $( 'a[data-toggle="tab"]' ).on( 'shown.bs.tab', function( evt ) {
            //console.log('the geo active is ', s.dd_tab_active.geo_item);
            // Read the a href of the anchor that was clicked
            anchor = $( evt.target ).attr( 'href' );
            // Trim the leading '#' from the href attribute
            anchor = anchor.substr( 1, anchor.length );
            if((anchor!=null)&&(typeof anchor!='undefined')){
                switch (anchor){
                    case s.filter_items.tabItem_1:
                        s.dd_tab_active.geo_item = anchor;
                        var obj = {};
                        obj[s.filter_items.item_1] = ["1"];
                        self.filter.setValues(obj);
                        break;
                    case s.filter_items.tabItem_4:
                        console.log('PEM!', anchor)
                        s.dd_tab_active.geo_item = anchor;
                        var obj = {};
                        obj[s.filter_items.item_3] = ["1"];
                        console.log(obj)
                        self.filter.setValues(obj);
                        break;
                    case s.filter_items.tabItem_7:
                        s.dd_tab_active.geo_item = anchor;
                        var obj = {};
                        obj[s.filter_items.item_5] = ["1"];
                        self.filter.setValues(obj);
                        break;
                }
                if((s.filterDivMsg1!=null)&&(typeof s.filterDivMsg1!='undefined')){
                    s.filterDivMsg1.html('');
                    s.filterDivMsg1.hide();
                }
            }
        });
    }

    IndicatorBase.prototype.tableDataCreation = function (param, columnsMap, data, filterValues) {

        var separatorValue = '';
        if((filterValues.values!= null)&&(typeof filterValues.values!= 'undefined')&&(filterValues.values[s.filter_items.item_10]!= null)&&(typeof filterValues.values[s.filter_items.item_10]!= 'undefined'))
            separatorValue = filterValues.values[s.filter_items.item_10][0];
        else
            separatorValue = '1';
        var tableData = [];
        var tableColumns = param.tableColumns;
        for(var iData = 0; iData<data.length; iData++)
        {
            var row = [];
            for(var iTableColumns = 0; iTableColumns<tableColumns.length; iTableColumns++)
            {
                var tableCol = tableColumns[iTableColumns];
                switch (tableCol) {
                    case s.table_columns.domain :
                        row[s.table_columns.domain] = data[iData][columnsMap[tableCol+'_text']]
                        break;
                    case s.table_columns.wiews_region :
                        row[s.table_columns.wiews_region] = data[iData][columnsMap[tableCol+'_text']]
                        break;
                    case s.table_columns.indicator :
                        row[s.table_columns.indicator] = data[iData][columnsMap[tableCol+'_text']]
                        break;
                    case s.table_columns.indicator_label :
                        row[s.table_columns.indicator_label] = data[iData][columnsMap[tableCol+'_text']]
                        break;
                    case s.table_columns.iteration :
                        row[s.table_columns.iteration] = data[iData][columnsMap[tableCol+'_text']]
                        break;
                    case s.table_columns.value :
                        row[s.table_columns.value] = this.icUtils.valuesFormatter(separatorValue, data[iData][columnsMap[tableCol+'_value']])
                        break;
                }
            }

            tableData.push(row);
        }
        //console.log(tableData);
        return tableData;
    }

    IndicatorBase.prototype.onSelectFilter = function (hostParam, filterResponse, commonParam) {
        //console.log('chaanges', filterResponse)

        var filterDivMsg1 = hostParam.filterDivMsg_1;
        if((filterDivMsg1 != null) && (typeof filterDivMsg1 != 'undefined')) {
            filterDivMsg1.html('');
            filterDivMsg1.hide();

            //Refresh the geographical selector
            if((filterResponse!=null)&&(typeof filterResponse!='undefined')){
                var selectorId = filterResponse.id;
                if((selectorId!=null)&&(typeof selectorId!='undefined')){
                    switch (selectorId){
                        case s.filter_items.item_1 :
                            var value = filterResponse.values[0];
                            if((value!=null)&&(typeof value!='undefined')){
                                var codelist = s.choices_code.position.countries[value];
                                this.geoTreeItem = s.choices_code.groups.countries[value]
                                commonParam.codelist = codelist;
                                this.geoSelectedCode = codelist;
                                this._renderGeoSelection(s.filter_items.item_2, value, 3);
                            }
                            break;
                        case s.filter_items.item_3:
                            var value = filterResponse.values[0];
                            if((value!=null)&&(typeof value!='undefined')){
                                var codelist = s.choices_code.position.regions[value];
                                this.geoTreeItem = s.choices_code.groups.regions[value]
                                commonParam.codelist = codelist;
                                this.geoSelectedCode = codelist;
                                this._renderGeoSelection(s.filter_items.item_4, value, 6);
                            }
                            break;

                    }
                    if (s.filter_available.includes(selectorId)) this.geoSelectedItem = selectorId;
                    if (selectorId == "dd_filter_item_6") this.geoListType = filterResponse.values[0];

                    //console.log(s.filter_available.includes(selectorId));
                    //console.log(this.geoSelectedItem, selectorId);
                    //console.log(this.geoSelectedCode);
                    //console.log(selectorId, filterResponse.values[0]);
                }
            }
        }
        else{
            return false;
        }

        return true;
    }

    IndicatorBase.prototype.updateVariables = function (obj) {

        this.filter = obj.filter;
        this.filter_host_config = obj.filter_host_config;
        if((this.filter_host_config!=null)&&(typeof this.filter_host_config!= 'undefined')&&
            (this.filter_host_config.geoSelector!=null)&&(typeof this.filter_host_config.geoSelector!= 'undefined')&&
            (this.filter_host_config.geoSelector.default!=null)&&(typeof this.filter_host_config.geoSelector.default!= 'undefined')){
            this.geoCodelistSelector = this.filter_host_config.geoSelector.default;
            switch(this.geoCodelistSelector){
                case s.filter_items.item_1:
                    s.dd_tab_active.geo_item = s.filter_items.tabItem_1;
                    break;
                case s.filter_items.item_4_1:
                case s.filter_items.item_4_2:
                case s.filter_items.item_4_3:
                case s.filter_items.item_4_4:
                    s.dd_tab_active.geo_item = s.filter_items.tabItem_4;
                    break;
                case s.filter_items.item_7_1:
                case s.filter_items.item_7_2:
                    s.dd_tab_active.geo_item = s.filter_items.tabItem_7;
                    break;
            }
        }
        else{
            s.dd_tab_active.geo_item = s.filter_items.tabItem_4;
            this.geoCodelistSelector = s.filter_items.item_4_1;
        }
    }

    IndicatorBase.prototype._table_element_configuration_update = function (dashboardConfig, values, params) {

        var codelist = values[s.geo_property].codelist;
        dashboardConfig.tableProcess[0].parameters.filter = {};
        dashboardConfig.tableProcess[0].parameters.filter[codelist] = s.geo_filter[codelist];
        dashboardConfig.tableProcess[0].parameters.filter[codelist].codes[0].codes = values[s.geo_property].values;
        console.log(dashboardConfig.tableProcess);
        dashboardConfig.tableProcess[1].parameters.rows["indicator"].codes[0].codes = values[s.filter_items.item_8];
        dashboardConfig.tableProcess[1].parameters.rows["indicator"].codes[0].codes.push("2"); // As Ivano requested.
        dashboardConfig.tableProcess[1].parameters.rows["iteration"].codes[0].codes = values[s.filter_items.item_9];
        var codes = '';
        if((values[s.filter_items.item_10]!=null)&&(typeof values[s.filter_items.item_10]!='undefined')&&(values[s.filter_items.item_10].length>0)){
            codes= [ "ind", "nfp", "nfpa", "stk" ];
        } else{
            codes= [ "ind", "nfp", "nfpa" ];
        }
        dashboardConfig.tableProcess[1].parameters.rows["element"].codes[0].codes = codes;
        // Flags
        var flags = values[s.geo_property].listType;
        if (flags.length > 0) {
            dashboardConfig.tableProcess[0].parameters.total = _.contains(flags,"total");
            dashboardConfig.tableProcess[0].parameters.list = _.contains(flags,"list");
        }

        return dashboardConfig;
    };

    IndicatorBase.prototype._download_element_table_element_configuration_update = function (dashboardConfig, values, params) {

        var codelist = values[s.geo_property].codelist;
        dashboardConfig.downloadProcessTableData[0].parameters.filter = {};
        dashboardConfig.downloadProcessTableData[0].parameters.filter[codelist] = s.geo_filter[codelist];
        dashboardConfig.downloadProcessTableData[0].parameters.filter[codelist].codes[0].codes = values[s.geo_property].values;
        dashboardConfig.downloadProcessTableData[1].parameters.rows["indicator"].codes[0].codes = values[s.filter_items.item_8];
        dashboardConfig.downloadProcessTableData[1].parameters.rows["indicator"].codes[0].codes.push("2"); // As Ivano requested.
        dashboardConfig.downloadProcessTableData[1].parameters.rows["iteration"].codes[0].codes = values[s.filter_items.item_9];
        var codes = '';
        if((values[s.filter_items.item_10]!=null)&&(typeof values[s.filter_items.item_10]!='undefined')&&(values[s.filter_items.item_10].length>0)){
            codes= [ "ind", "nfp", "nfpa", "stk" ];
        } else{
            codes= [ "ind", "nfp", "nfpa" ];
        }
        dashboardConfig.downloadProcessTableData[1].parameters.rows["element"].codes[0].codes = codes;
        // Flags
        var flags = values[s.geo_property].listType;
        if (flags.length > 0) {
            dashboardConfig.downloadProcessTableData[0].parameters.total = _.contains(flags,"total");
            dashboardConfig.downloadProcessTableData[0].parameters.list = _.contains(flags,"list");
        }

        return dashboardConfig;
    };

    IndicatorBase.prototype._download_element_raw_data_configuration_update = function (dashboardConfig, values, params) {

        var codelist = values[s.geo_property].codelist;
        dashboardConfig.downloadProcessRawData[0].parameters.filter = {};
        dashboardConfig.downloadProcessRawData[0].parameters.filter[codelist] = s.geo_filter[codelist];
        dashboardConfig.downloadProcessRawData[0].parameters.filter[codelist].codes[0].codes = values[s.geo_property].values;
        dashboardConfig.downloadProcessRawData[1].parameters.rows["iteration"].codes[0].codes = values[s.filter_items.item_9];

        return dashboardConfig;
    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    IndicatorBase.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    IndicatorBase.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    return IndicatorBase;

});