define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../../config/config",
    "../../../../config/errors",
    "../../../../config/events",
    "../../../../config/domains/config",
    "../../../../nls/labels"
], function ($, log, _, C, ERR, EVT, DM, labels) {

    'use strict';

    var defaultOptions = {};

    var s = {
        buttonMsg : {
            button_1 : "vd_filter_button_1_msg"
        },

        filter_items : {
            item_1 : "vd_filter_item_1",
            item_2 : "vd_filter_item_2",
            item_3 : "vd_filter_item_3",
            item_4 : "vd_filter_item_4",
            item_5 : "vd_filter_item_5",
            item_6 : "vd_filter_item_6",
            item_7 : "vd_filter_item_7"
        },

        dashboard_items : {
            item_1 : "vd_dashboard_item_1",
            item_2 : "vd_dashboard_item_2",
            item_3 : "vd_dashboard_item_3",
            item_4 : "vd_dashboard_item_4"
        }
    }

    function IndicatorProcesses1(o) {

        var self = this;

        $.extend(true, this, defaultOptions, o);

        return this;
    }

    IndicatorProcesses1.prototype._initVariables = function () {

    };

    IndicatorProcesses1.prototype.filterSelectionValidation = function (values, params) {

        var valid = true;
        var filterDivMsg1 = params.filterDivMsg_1;
        if ((values != null) && (typeof values != 'undefined') && (filterDivMsg1 != null) && (typeof filterDivMsg1 != 'undefined') && (values.values != null) && (typeof values.values != 'undefined')) {

            for(var key in values.values) {
                if((values.values[key] != null) && (typeof values.values[key] != 'undefined') && (values.values[key].length>0))
                {
                    valid = true;
                }
                else{
                    valid = false;
                    break;
                }
            }

        }
        else {
            valid = false;
        }

        if(!valid){
            filterDivMsg1.html(labels[params.lang][s.buttonMsg.button_1])
            filterDivMsg1.show();
        }

        return valid;
    }

    //In this way this action is indipendent by the number of items in the configuration
    //Test it removing some items in the configuration
    IndicatorProcesses1.prototype.onClickButton = function (dashboardConfig, values, params) {

        var newDashboardConfig =null;
        if(this.filterSelectionValidation(values, params))
        {
            var self = this;
            newDashboardConfig ={};
            $.extend(true, newDashboardConfig, dashboardConfig);

            if((dashboardConfig!=null)&&(typeof dashboardConfig != 'undefined')){
                var itemsArray = dashboardConfig.items;
                var itemCount = 1;
                itemsArray.forEach(function (item) {

                    if ((item != null) && (typeof item != 'undefined')) {
                        newDashboardConfig = self._element_configuration_update(newDashboardConfig, item.id, values, itemCount-1);
                    }
                    itemCount++;
                });
            }
        }

        return newDashboardConfig;
    };

    IndicatorProcesses1.prototype.onSelectFilter = function (hostParam, filterResponse) {
        var filterDivMsg1 = hostParam.filterDivMsg_1;

        if((filterDivMsg1 != null) && (typeof filterDivMsg1 != 'undefined'))
        {
            filterDivMsg1.html('')
            filterDivMsg1.show()
        }
        else{
           return false;
        }

        return true;
    }

    IndicatorProcesses1.prototype._element_configuration_update = function (dashboardConfig, element, values, itemCount) {

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

    IndicatorProcesses1.prototype._element1_configuration_update = function (dashboardConfig, values, itemCount) {

        //Map
        var newDashboardConfig = '';
        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            dashboardConfig.items[itemCount].postProcess[0].parameters["m49"].codes[0].codes = values.values[s.filter_items.item_3];
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values.values[s.filter_items.item_7];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    IndicatorProcesses1.prototype._element2_configuration_update = function (dashboardConfig, values, itemCount) {

        //First Chart
        var newDashboardConfig = '';
        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            dashboardConfig.items[itemCount].postProcess[0].parameters["m49"].codes[0].codes = values.values[s.filter_items.item_3];
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values.values[s.filter_items.item_7];
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["genus"].codes[0].codes = values.values[s.filter_items.item_6];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    IndicatorProcesses1.prototype._element3_configuration_update = function (dashboardConfig, values, itemCount) {

        //Second Chart
        var newDashboardConfig = '';
        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            dashboardConfig.items[itemCount].postProcess[0].parameters["m49"].codes[0].codes = values.values[s.filter_items.item_3];
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values.values[s.filter_items.item_7];
            newDashboardConfig = dashboardConfig;
        }
        return newDashboardConfig;
    };

    IndicatorProcesses1.prototype._element4_configuration_update = function (dashboardConfig, values, itemCount) {

        //Third Chart
        var newDashboardConfig = '';
        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            dashboardConfig.items[itemCount].postProcess[0].parameters["m49"].codes[0].codes = values.values[s.filter_items.item_3];
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values.values[s.filter_items.item_7];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    IndicatorProcesses1.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    IndicatorProcesses1.prototype._trigger = function (channel) {

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

    return IndicatorProcesses1;

});