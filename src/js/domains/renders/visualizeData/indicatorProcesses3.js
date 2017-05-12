define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../../config/config",
    "../../../../config/errors",
    "../../../../config/events",
    "../../../../config/domains/config",
    "../IndicatorCommonUtils",
    "../../../../nls/labels"
], function ($, log, _, C, ERR, EVT, DM, ICUtils, labels) {

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
                        "uid": "wiews_fao_region",
                        "codes": ''
                    }
                ]
            },
            "m49": {
                "codes": [
                    {
                        "uid": "wiews_m49_regions",
                        "codes": ''
                    }
                ]
            },
            "sdg": {
                "codes": [
                    {
                        "uid": "sdg_region",
                        "codes": ''
                    }
                ]
            },
            "mdg": {
                "codes": [
                    {
                        "uid": "mdg_region",
                        "codes": ''
                    }
                ]
            },
            "cgrfa": {
                "codes": [
                    {
                        "uid": "wiews_cgrfa",
                        "codes": ''
                    }
                ]
            },
            "itpgrfa": {
                "codes": [
                    {
                        "uid": "wiews_itpgrfa",
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
                regions : {
                    1 : 'wiews_fao_region',
                    2 : 'wiews_m49_regions',
                    3 : 'sdg_region',
                    4 : 'mdg_region'
                },
                specialGroups : {
                    1 : 'wiews_cgrfa',
                    2 : 'wiews_itpgrfa'
                }
            }
        },

        buttonMsg : {
            button_1 : "1_vd_filter_button_1_msg",
            button_1_list : "1_vd_filter_button_1_list_msg"
        },

        error_type : {
            list : 'list'
        },

        vd_tab_active : {
            geo_item : ''
        },

        filter_items : {
            item_1 : "vd_filter_item_1",
            item_2 : "vd_filter_item_2",
            item_3 : "vd_filter_item_3",
            item_4 : "vd_filter_item_4",
            item_4_1 : "vd_filter_item_4_1",
            item_4_2 : "vd_filter_item_4_2",
            item_4_3 : "vd_filter_item_4_3",
            item_4_4 : "vd_filter_item_4_4",
            item_5 : "vd_filter_item_5",
            item_6 : "vd_filter_item_6",
            item_7 : "vd_filter_item_7",
            item_7_1 : "vd_filter_item_7_1",
            item_7_2 : "vd_filter_item_7_2",
            item_8 : "vd_filter_item_8",
            item_9 : "vd_filter_item_9",
            tabItem_1 : "vd_filter_item_tab_1",
            tabItem_4 : "vd_filter_item_tab_4_1",
            tabItem_7 : "vd_filter_item_tab_7_1"
        },

        dashboard_items : {
            item_1 : "vd_dashboard_item_1",
            item_2 : "vd_dashboard_item_2",
            item_3 : "vd_dashboard_item_3",
            item_4 : "vd_dashboard_item_4"
        },

        filterDivMsg1 : '',
        filterDivMsg1_text : ''
    }

    function IndicatorProcesses3(o) {

        $.extend(true, this, defaultOptions, o);

        this.icUtils = new ICUtils();

        this._renderTemplate(s.filter_items.item_4, 1, 4);
        this._renderTemplate(s.filter_items.item_7, 1, 2);

        this._initVariables();

        return this;
    }

    IndicatorProcesses3.prototype._initVariables = function () {

        //Setting Default Tab and Item
        s.filterDivMsg1 = this.filterDivMsg1;
    };

    IndicatorProcesses3.prototype._renderTemplate = function (item_to_show_prefix, item_to_show, codelistMaxIndex) {

        //this._renderGeoSelection(item_to_show_prefix, item_to_show, codelistMaxIndex);
    }

    IndicatorProcesses3.prototype._renderGeoSelection = function (item_to_show_prefix, item_to_show, codelistMaxIndex) {

        var index = 1;
        for(index = 1; index<= codelistMaxIndex; index++) {
            var indicatorFilterSection = this.el.find('[data-selector = "'+item_to_show_prefix+'_'+index+'"]');
            if((indicatorFilterSection!=null)&&(typeof indicatorFilterSection!='undefined')&&(index == item_to_show)){
                this.geoCodelistSelector = item_to_show_prefix+'_'+index;
                indicatorFilterSection.show();
            }
            else{
                indicatorFilterSection.hide();
            }
        }
    }

    IndicatorProcesses3.prototype._filterSelectionValidation = function (values, params) {

        var valid = false, newValues = '', textMsg = '';

        if ((values != null) && (typeof values != 'undefined') && (s.filterDivMsg1 != null) && (typeof s.filterDivMsg1 != 'undefined') && (values.values != null) && (typeof values.values != 'undefined')) {

            //The geo element has been checked and updated
            newValues = this._geoItemSelectionValidation(values);

            if((newValues!= null) && (typeof newValues!= 'undefined'))
            {
                for(var key in newValues) {
                    if(key== s.geo_property)
                    {
                        valid = true;
                    }
                    else if((newValues[key] != null) && (typeof newValues[key] != 'undefined') && (newValues[key].length>0))
                    {
                        valid = true;
                    }
                    else{
                        valid = false;
                        break;
                    }
                }
            }
        }

        if(!valid){
            if(s.filterDivMsg1_text == s.error_type.list){
                textMsg = labels[params.lang][s.buttonMsg.button_1_list];
            }
            else{
                textMsg = labels[params.lang][s.buttonMsg.button_1];
            }

            s.filterDivMsg1.html(textMsg)
            s.filterDivMsg1.show();
        }

        if(!valid){
            newValues = '';
        }
        else{
            console.log("true")
        }

        return newValues;
    }

    IndicatorProcesses3.prototype._geoItemSelectionValidation = function (values) {

        s.filterDivMsg1_text = '';
        var paramsForGeoValidation = {};
        paramsForGeoValidation.regionFilterItem = s.filter_items.item_2;
        paramsForGeoValidation.specialGroupFilterItem = s.filter_items.item_5;
        paramsForGeoValidation.checkboxRegionItem = s.filter_items.item_3;
        paramsForGeoValidation.checkboxSpecialGroupItem = s.filter_items.item_6;
        paramsForGeoValidation.toDelete = [s.filter_items.item_1, s.filter_items.item_2, s.filter_items.item_3, s.filter_items.item_4_1, s.filter_items.item_4_2, s.filter_items.item_4_3, s.filter_items.item_4_4, s.filter_items.item_5, s.filter_items.item_6, s.filter_items.item_7_1, s.filter_items.item_7_2];
        paramsForGeoValidation.tab_active_geo_item = s.vd_tab_active.geo_item;
        paramsForGeoValidation.filter_items_tabItem_first = s.filter_items.tabItem_1;
        paramsForGeoValidation.filter_items_tabItem_second = s.filter_items.tabItem_4;
        paramsForGeoValidation.filter_items_tabItem_third = s.filter_items.tabItem_7;
        paramsForGeoValidation.filter_items_codelistItem_tabItem_second = s.filter_items.item_2;
        paramsForGeoValidation.filter_items_listTypetItem_tabItem_second = s.filter_items.item_3;
        paramsForGeoValidation.filter_items_codelistItem_tabItem_third = s.filter_items.item_5;
        paramsForGeoValidation.filter_items_listTypetItem_tabItem_third = s.filter_items.item_6;
        paramsForGeoValidation.geoCodelistSelector = this.geoCodelistSelector;
        paramsForGeoValidation.values = values;

        var newValues = this.icUtils.geoItemSelectionValidation(paramsForGeoValidation);

        if((newValues!=null)&&(typeof newValues!="undefined")&&(newValues.listTypeError)){
            s.filterDivMsg1_text = s.error_type.list;
        }

        return newValues.values;
    }


    //In this way this action is indipendent by the number of items in the configuration
    //Test it removing some items in the configuration
    IndicatorProcesses3.prototype.onClickButton = function (dashboardConfig, values, params) {

        var newDashboardConfig =null;
        var newValues = this._filterSelectionValidation(values, params);
        if((newValues!= null)&&(typeof newValues != 'undefined')&&(!$.isEmptyObject(newValues)))
        {
            var self = this;
            newDashboardConfig ={};
            $.extend(true, newDashboardConfig, dashboardConfig);

            if((dashboardConfig!=null)&&(typeof dashboardConfig != 'undefined')){
                var itemsArray = dashboardConfig.items;
                var itemCount = 1;
                itemsArray.forEach(function (item) {

                    if ((item != null) && (typeof item != 'undefined')) {
                        newDashboardConfig = self._element_configuration_update(newDashboardConfig, item.id, newValues, itemCount-1);
                    }
                    itemCount++;
                });
            }
        }

        return newDashboardConfig;
    };

    IndicatorProcesses3.prototype.bindEventListener = function () {
        var self = this;
        var anchor;
        $( 'a[data-toggle="tab"]' ).on( 'shown.bs.tab', function( evt ) {

            // Read the a href of the anchor that was clicked
			anchor = $( evt.target ).attr( 'href' );
            // Trim the leading '#' from the href attribute
            anchor = anchor.substr( 1, anchor.length );
            if((anchor!=null)&&(typeof anchor!='undefined')){
                switch (anchor){
                    case s.filter_items.tabItem_1:
                        s.vd_tab_active.geo_item = anchor;
                        break;
                    case s.filter_items.tabItem_4:
                        s.vd_tab_active.geo_item = anchor;
                        var obj = {};
                        obj[s.filter_items.item_2] = ["1"];
                        self.filter.setValues(obj);
                        break;
                    case s.filter_items.tabItem_7:
                        s.vd_tab_active.geo_item = anchor;
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

    IndicatorProcesses3.prototype.onSelectFilter = function (hostParam, filterResponse, commonParam) {
        var filterDivMsg1 = hostParam.filterDivMsg_1;
        if((filterDivMsg1 != null) && (typeof filterDivMsg1 != 'undefined'))
        {
            filterDivMsg1.html('')
            filterDivMsg1.hide()

            //Refresh the geographical selector
            if((filterResponse!=null)&&(typeof filterResponse!='undefined')){
                var selectorId = filterResponse.id;
                if((selectorId!=null)&&(typeof selectorId!='undefined')){
                    switch (selectorId){
                        case s.filter_items.item_2 :
                            var value = filterResponse.values[0];
                            if((value!=null)&&(typeof value!='undefined')){
                                var codelist = s.choices_code.position.regions[value];
                                commonParam.codelist = codelist;
                                this._renderGeoSelection(s.filter_items.item_4, value, 4);
                            }
                            break;
                        case s.filter_items.item_5 :
                            var value = filterResponse.values[0];
                            if((value!=null)&&(typeof value!='undefined')){
                                var codelist = s.choices_code.position.specialGroups[value];
                                commonParam.codelist = codelist;
                                this._renderGeoSelection(s.filter_items.item_7, value, 2);
                            }
                            break;
                    }
                }
            }
        }
        else{
           return false;
        }

        return true;
    }

    IndicatorProcesses3.prototype.updateVariables = function (obj) {

        this.filter = obj.filter;
        this.filter_host_config = obj.filter_host_config;
        if((this.filter_host_config!=null)&&(typeof this.filter_host_config!= 'undefined')&&
            (this.filter_host_config.geoSelector!=null)&&(typeof this.filter_host_config.geoSelector!= 'undefined')&&
            (this.filter_host_config.geoSelector.default!=null)&&(typeof this.filter_host_config.geoSelector.default!= 'undefined')){
            this.geoCodelistSelector = this.filter_host_config.geoSelector.default;
            switch(this.geoCodelistSelector){
                case s.filter_items.item_1:
                    s.vd_tab_active.geo_item = s.filter_items.tabItem_1;
                    break;
                case s.filter_items.item_4_1:
                case s.filter_items.item_4_2:
                case s.filter_items.item_4_3:
                case s.filter_items.item_4_4:
                    s.vd_tab_active.geo_item = s.filter_items.tabItem_4;
                    break;
                case s.filter_items.item_7_1:
                case s.filter_items.item_7_2:
                    s.vd_tab_active.geo_item = s.filter_items.tabItem_7;
                    break;
            }
        }
        else{
            s.vd_tab_active.geo_item = s.filter_items.tabItem_4;
            this.geoCodelistSelector = s.filter_items.item_4_1;
        }
    }

    IndicatorProcesses3.prototype._element_configuration_update = function (dashboardConfig, element, values, itemCount) {

        switch(element){
            case s.dashboard_items.item_1:
                return this._element1_configuration_update(dashboardConfig, values, itemCount);
                break;
            case s.dashboard_items.item_2:
                return this._element2_configuration_update(dashboardConfig, values, itemCount);
                break;
            case s.dashboard_items.item_3:
                return this._element3_configuration_update(dashboardConfig, values, itemCount);
                break;
            case s.dashboard_items.item_4:
                return this._element4_configuration_update(dashboardConfig, values, itemCount);
                break;
        }
    };

    IndicatorProcesses3.prototype._element1_configuration_update = function (dashboardConfig, values, itemCount) {

        //Map
        var newDashboardConfig = '';
        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            var codelist = values[s.geo_property].codelist;
            var listType = values[s.geo_property].listType;

            dashboardConfig.items[itemCount].postProcess[0].parameters.filter = {};
            if($.inArray(s.choices_code.total, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = false;
            }
            if($.inArray(s.choices_code.list, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = false;
            }
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter = {};
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist] = s.geo_filter[codelist];
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist].codes[0].codes = values[s.geo_property].values;
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values[s.filter_items.item_9];
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["genus"].codes[0].codes = values[s.filter_items.item_8];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    IndicatorProcesses3.prototype._element2_configuration_update = function (dashboardConfig, values, itemCount) {

        //First Chart
        var newDashboardConfig = '';

        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            var codelist = values[s.geo_property].codelist;
            var listType = values[s.geo_property].listType;

            dashboardConfig.items[itemCount].postProcess[0].parameters.filter = {};
            if($.inArray(s.choices_code.total, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = false;
            }
            if($.inArray(s.choices_code.list, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = false;
            }
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter = {};
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist] = s.geo_filter[codelist];
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist].codes[0].codes = values[s.geo_property].values;
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values[s.filter_items.item_9];
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["genus"].codes[0].codes = values[s.filter_items.item_8];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    IndicatorProcesses3.prototype._element3_configuration_update = function (dashboardConfig, values, itemCount) {

        //Second Chart
        var newDashboardConfig = '';

        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            var codelist = values[s.geo_property].codelist;
            var listType = values[s.geo_property].listType;

            dashboardConfig.items[itemCount].postProcess[0].parameters.filter = {};
            if($.inArray(s.choices_code.total, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = false;
            }
            if($.inArray(s.choices_code.list, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = false;
            }
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter = {};
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist] = s.geo_filter[codelist];
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist].codes[0].codes = values[s.geo_property].values;
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values[s.filter_items.item_9];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    IndicatorProcesses3.prototype._element4_configuration_update = function (dashboardConfig, values, itemCount) {

        //Third Chart
        var newDashboardConfig = '';

        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            var codelist = values[s.geo_property].codelist;
            var listType = values[s.geo_property].listType;

            dashboardConfig.items[itemCount].postProcess[0].parameters.filter = {};
            if($.inArray(s.choices_code.total, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = false;
            }
            if($.inArray(s.choices_code.list, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = false;
            }
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist] = s.geo_filter[codelist];
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist].codes[0].codes = values[s.geo_property].values;
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values[s.filter_items.item_9];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    IndicatorProcesses3.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    IndicatorProcesses3.prototype._trigger = function (channel) {

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

    return IndicatorProcesses3;

});