define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../../config/config",
    "../../../../config/errors",
    "../../../../config/events",
    "../../../../config/domains/config",
    "../../../../config/domains/indicatorsConfig",
    "./indicatorProcesses1",
    'fenix-ui-chart-creator'
], function ($, log, _, C, ERR, EVT, DM, DIM, IP) {

    'use strict';

    var defaultOptions = {};

    var s = {
        indicatorPosition : '1',

        data_button_1 : "vd_filter_button_1",

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
        },

        event: {
            READY : "indicator-ready",
            BUTTON_1_CLICK : "click",
            DASHBOARD_CONFIG : "new_dashoboard_config_ready"
        }
    }

    function Indicator1(o) {

        var self = this;

        $.extend(true, this, defaultOptions, o);

        this._initVariables();

        this._renderIndicator();

        this._bindEventListeners();

        //force async execution
        window.setTimeout(function () {
            self.status.ready = true;
            self._trigger(s.event.READY);
        }, 0);

        return this;
    }

    /**
     * Disposition method
     * Mandatory method
     */
    Indicator1.prototype.dispose = function () {

        this._dispose();

        log.info("Indicator disposed successfully");

    };

    /**
     * refresh method
     * Mandatory method
     */
    Indicator1.prototype.refresh = function () {

        log.info("Indicator refresh successfully");

    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    Indicator1.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    Indicator1.prototype._trigger = function (channel) {

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

    Indicator1.prototype._getStatus = function () {

        return this.status;
    };


    Indicator1.prototype._initVariables = function () {

        this.$el = $(this.el);
        //Init status
        this.status = {};

        // pub/sub
        this.channels = {};

        this.indicatorProcesses = new IP();

        this.indicatorType = this.indicatorType;

        //TODO
    };

    Indicator1.prototype._renderIndicator = function () {

        var config = $.extend(true, {}, this.config, {
            model : this.model
        });

    };

    Indicator1.prototype._destroyIndicator = function () {

        //TODO

        log.info("Destroyed Indicator1: " + this.id);
    };

    Indicator1.prototype._bindEventListeners = function () {
        //TODO

        var self = this;

        var button = this.el.find('[data-button = "'+s.data_button_1+'"]');
        //console.log("_bindEventListeners ", this)

        if(button){
            button.on(s.event.BUTTON_1_CLICK, _.bind(self.onClick_button1, this));
        }
    };
    
    Indicator1.prototype.onClick_button1 = function () {
        var values = this.filter.getValues();
        this.recreateItem(s.dashboard_items.item_1, values);
        this.recreateItem(s.dashboard_items.item_2, values);
        this.recreateItem(s.dashboard_items.item_3, values);
        this.recreateItem(s.dashboard_items.item_4, values);

        this._trigger(s.event.DASHBOARD_CONFIG, {indicator_position : s.indicatorPosition, dashboardConfig : this.dashboard_config, values: values, dashboard: this.dashboard})
    }

    // Indicator1.prototype.elementAction = function (element, values, dashboardConfig) {
    //
    //     switch(element){
    //         case s.dashboard_items.item_1:
    //             dashboardConfig = this.recreateItem1(values, dashboardConfig);
    //             break;
    //         case s.dashboard_items.item_2:
    //             dashboardConfig = this.recreateItem2(values, dashboardConfig);
    //             break;
    //         case s.dashboard_items.item_3:
    //             dashboardConfig = this.recreateItem3(values, dashboardConfig);
    //             break;
    //         case s.dashboard_items.item_4:
    //             dashboardConfig = this.recreateItem4(values, dashboardConfig);
    //             break;
    //     }
    //
    //     return dashboardConfig;
    // };

    Indicator1.prototype.recreateItem = function (element, values) {
        this.dashboard_config = this.indicatorProcesses.element_configuration_update(this.dashboard_config, element, values);

    };

    Indicator1.prototype.recreateItem2 = function (values, dashboardConfig) {
        return dashboardConfig;
    };

    Indicator1.prototype.recreateItem3 = function (values, dashboardConfig) {
        return dashboardConfig;
    };

    Indicator1.prototype.recreateItem4 = function (values, dashboardConfig) {
        return dashboardConfig;
    };

    Indicator1.prototype._unbindEventListeners = function () {
        //TODO
    };

    Indicator1.prototype._dispose = function () {

        this._unbindEventListeners();

        this._destroyIndicator();

    };

    Indicator1.prototype._getEventName = function (evt) {

        return this.controller.id + evt;
    };

    return Indicator1;

});