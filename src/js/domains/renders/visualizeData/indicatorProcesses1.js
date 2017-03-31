define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../../config/config",
    "../../../../config/errors",
    "../../../../config/events",
    "../../../../config/domains/config",
    "../../../../config/domains/indicatorsConfig",
    'fenix-ui-chart-creator'
], function ($, log, _, C, ERR, EVT, DM, DIM) {

    'use strict';

    var defaultOptions = {};

    var s = {

        filter_items : {
            item_1 : "vd_filter_item_1",
            item_2 : "vd_filter_item_2",
            item_3 : "vd_filter_item_3",
            item_4 : "vd_filter_item_4"
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

    IndicatorProcesses1.prototype.element_configuration_update = function (dashboardConfig, element, values) {

        switch(element){
            case s.dashboard_items.item_1:
                return this._element1_configuration_update(dashboardConfig, values);
                break;
            case s.dashboard_items.item_2:
                return this._element2_configuration_update(dashboardConfig, values);
                break;
            case s.dashboard_items.item_3:
                return this._element3_configuration_update(dashboardConfig, values);
                break;
            case s.dashboard_items.item_4:
                return this._element4_configuration_update(dashboardConfig, values);
                break;
        }
    };

    IndicatorProcesses1.prototype._element1_configuration_update = function (dashboardConfig, values) {

        //Map
        var newDashboardConfig = '';
        console.log("Before _element1_configuration_update")
        console.log(dashboardConfig)
        console.log(values)
        if((dashboardConfig)&&(dashboardConfig.items[0].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            dashboardConfig.items[0].postProcess[0].parameters["m49"].codes[0].codes = values.values[s.filter_items.item_2];
            dashboardConfig.items[0].postProcess[2].parameters.rows["iteration"].codes[0].codes = values.values[s.filter_items.item_3];
            newDashboardConfig = dashboardConfig;
        }

        console.log("After _element1_configuration_update")
        console.log(newDashboardConfig)
        return newDashboardConfig;
    };

    IndicatorProcesses1.prototype._element2_configuration_update = function (dashboardConfig, values) {

        //First Chart
        var newDashboardConfig = '';
        if((dashboardConfig)&&(dashboardConfig.items[0].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            dashboardConfig.items[1].postProcess[0].parameters["m49"].codes[0].codes = values.values[s.filter_items.item_2];
            dashboardConfig.items[1].postProcess[2].parameters.rows["iteration"].codes[0].codes = values.values[s.filter_items.item_3];
            dashboardConfig.items[1].postProcess[2].parameters.rows["genus"].codes[0].codes = values.values[s.filter_items.item_1];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    IndicatorProcesses1.prototype._element3_configuration_update = function (dashboardConfig, values) {

        //Second Chart
        var newDashboardConfig = '';
        if((dashboardConfig)&&(dashboardConfig.items[0].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            dashboardConfig.items[0].postProcess[0].parameters["m49"].codes[0].codes = values.values[s.filter_items.item_2];
            dashboardConfig.items[0].postProcess[2].parameters.rows["iteration"].codes[0].codes = values.values[s.filter_items.item_3];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    IndicatorProcesses1.prototype._element4_configuration_update = function (dashboardConfig, values) {

        //Third Chart
        var newDashboardConfig = '';
        if((dashboardConfig)&&(dashboardConfig.items[0].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            dashboardConfig.items[0].postProcess[0].parameters["m49"].codes[0].codes = values.values[s.filter_items.item_2];
            dashboardConfig.items[0].postProcess[2].parameters.rows["iteration"].codes[0].codes = values.values[s.filter_items.item_3];
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