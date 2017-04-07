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
    'fenix-ui-reports',
    "../../../../nls/labels"
], function ($, log, _, C, ERR, EVT, DM, DIM, IP, Report, labels) {

    'use strict';

    var defaultOptions = {};

    var s = {
        indicatorPosition : '1',

        filter_button : {
            button_1 : "vd_filter_button_1"
        },

        dashboard_button : {
            button_1 : "vd_dashboard_button_1",
            button_2 : "vd_dashboard_button_2",
            button_3 : "vd_dashboard_button_3",
            button_4 : "vd_dashboard_button_4"
        },

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
            BUTTON_CLICK : "click",
            DASHBOARD_CONFIG : "new_dashoboard_config_ready"
        }
    }

    function Indicator1(o) {

        var self = this;

        $.extend(true, this, o);

        this.models = o.models;

        this._initVariables();

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

        if (this.report && $.isFunction(this.report.dispose)) {
            this.report.dispose();
        }

        this.report = new Report({
            environment: this.environment,
            cache: this.cache
        });

        this.uid_items = {
                item_1 : labels[this.lang][''+s.indicatorPosition+ '_'+s.dashboard_items.item_1+'_uid'],
                item_2 : labels[this.lang][''+s.indicatorPosition+ '_'+s.dashboard_items.item_2+'_uid'],
                item_3 : labels[this.lang][''+s.indicatorPosition+ '_'+s.dashboard_items.item_3+'_uid'],
                item_4 : labels[this.lang][''+s.indicatorPosition+ '_'+s.dashboard_items.item_4+'_uid']
        }
    };

    Indicator1.prototype._destroyIndicator = function () {

        //TODO

        log.info("Destroyed Indicator1: " + this.id);
    };

    Indicator1.prototype._bindEventListeners = function () {
        //TODO

        var self = this;

        var filter_button_1 = this.el.find('[data-button = "'+s.filter_button.button_1+'"]');

        if(filter_button_1){
            filter_button_1.on(s.event.BUTTON_CLICK, _.bind(self.onClick_button1, this));
        }

        var dashboard_button_1 = this.el.find('[data-button = "'+s.dashboard_button.button_1+'"]');

        if(dashboard_button_1){
            console.log(s.dashboard_items.item_1, JSON.stringify(self.uid_items[s.dashboard_items.item_1]))
            dashboard_button_1.on(s.event.BUTTON_CLICK, _.bind(self.downloadData, this, self.models[s.dashboard_items.item_1], self.uid_items.item_1));
        }

        var dashboard_button_3 = this.el.find('[data-button = "'+s.dashboard_button.button_3+'"]');

        if(dashboard_button_3){
            console.log(s.dashboard_items.item_3, JSON.stringify(self.uid_items[s.dashboard_items.item_3]))
            dashboard_button_3.on(s.event.BUTTON_CLICK, _.bind(self.downloadData, this, self.models[s.dashboard_items.item_3], self.uid_items.item_3));
        }

        var dashboard_button_4 = this.el.find('[data-button = "'+s.dashboard_button.button_4+'"]');

        if(dashboard_button_4){
            console.log(s.dashboard_items.item_4, JSON.stringify(self.uid_items[s.dashboard_items.item_4]))
            dashboard_button_4.on(s.event.BUTTON_CLICK, _.bind(self.downloadData, this, self.models[s.dashboard_items.item_4], self.uid_items.item_4));
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


    Indicator1.prototype.downloadData = function (model, uid) {
        //var model2 = {"metadata":{"rid":"9_11457","uid":"adam_browse_sector_oda","dsd":{"cache":{"storage":"postgres"},"rid":"63_324","columns":[{"dataType":"code","key":true,"id":"gaul0","title":{"EN":"GAUL Country"},"domain":{"codes":[{"version":"2014","idCodeList":"GAUL0","extendedName":{"EN":"Global administrative unit layer country level"}}]},"subject":"geo"},{"dataType":"number","key":false,"id":"value","title":{"EN":"Value"},"subject":"value"},{"dataType":"code","key":false,"id":"unitcode","title":{"EN":"Measurement unit"},"domain":{"codes":[{"version":"2016","idCodeList":"crs_units","extendedName":{"EN":"OECD Units"}}]},"subject":"um"},{"dataType":"text","key":false,"id":"unitcode_EN","title":{"EN":"Measurement unit"},"virtual":false,"transposed":false},{"dataType":"text","key":false,"id":"gaul0_EN","title":{"EN":"GAUL Country"},"virtual":false,"transposed":false}],"contextSystem":"D3P"}},"data":[["181",3365.9938246499987,"million_usd","Million USD","Niger"],["254",568.9503590609995,"million_usd","Million USD","Ukraine"],["94",3751.3433445219976,"million_usd","Million USD","Ghana"],["243",481.72791288200006,"million_usd","Million USD","Togo"],["135",117.32736094599994,"million_usd","Million USD","Kiribati"],["79",14754.829214275996,"million_usd","Million USD","Ethiopia"],["196",3717.813645854998,"million_usd","Million USD","Philippines"],["4",508.3454585730001,"million_usd","Million USD","Algeria"],["107",868.852734545,"million_usd","Million USD","Guyana"],["40764",7421.549451951,"million_usd","Million USD","Sudan (ex)"],["205",2140.399058609001,"million_usd","Million USD","Rwanda"],["240",538.3631362360005,"million_usd","Million USD","Thailand"],["207",12.142791729999999,"million_usd","Million USD","Saint Helena"],["34",836.9131206080002,"million_usd","Million USD","Bosnia and Herzegovina"],["161",137.63201255,"million_usd","Million USD","Mayotte"],["68",3752.0364044950015,"million_usd","Million USD","Democratic Republic of the Congo"],["157",63.234144195000006,"million_usd","Million USD","Marshall Islands"],["43",1563.765752489,"million_usd","Million USD","Burundi"],["221",870.0060937989999,"million_usd","Million USD","Sierra Leone"],["156",0.0210849,"million_usd","Million USD","Malta"],["47",383.25892923900017,"million_usd","Million USD","Cape Verde"],["75",606.0823101330001,"million_usd","Million USD","El Salvador"],["217",3416.1782833740012,"million_usd","Million USD","Senegal"],["175",3097.1827506100017,"million_usd","Million USD","Nepal"],["76",15.952551659000003,"million_usd","Million USD","Equatorial Guinea"],["239",1102.534424734,"million_usd","Million USD","Tajikistan"],["250",44.312355069999995,"million_usd","Million USD","Turkmenistan"],["71",141.036150463,"million_usd","Million USD","Dominica"],["26",106.84980788700003,"million_usd","Million USD","Belarus"],["154",160.19288558300013,"million_usd","Million USD","Maldives"],["3",653.3022639359998,"million_usd","Million USD","Albania"],["248",1229.938683014,"million_usd","Million USD","Tunisia"],["31",276.942531754,"million_usd","Million USD","Bhutan"],["35",106.67483927800001,"million_usd","Million USD","Botswana"],["147295",7811.033758178414,"million_usd","Million USD","China"],["192",673.5400445839997,"million_usd","Million USD","Papua New Guinea"],["155",4175.799400400995,"million_usd","Million USD","Mali"],["241",417.59318784399954,"million_usd","Million USD","The former Yugoslav Republic of Macedonia"],["133",6418.99199705617,"million_usd","Million USD","Kenya"],["130",1467.4101994460002,"million_usd","Million USD","Jordan"],["141",757.0849790279995,"million_usd","Million USD","Lebanon"],["215",2.3587486559999995,"million_usd","Million USD","Saudi Arabia"],["40765",3395.4028414939994,"million_usd","Million USD","Egypt"],["115",15437.21778359978,"million_usd","Million USD","India"],["72",501.01526116999975,"million_usd","Million USD","Dominican Republic"],["144",1039.0959067419997,"million_usd","Million USD","Liberia"],["33",3355.1078021429994,"million_usd","Million USD","Bolivia"],["269",2642.742587750999,"million_usd","Million USD","Yemen"]]};
//format: "table",
        model.metadata.uid = uid;
        // console.log("downloadData")
        //  console.log(uid)
        // console.log(JSON.stringify(model))
        var payload = {
            resource: model,
            input: {
                config: {}
            },
            output: {
                config: {
                    lang: this.lang.toUpperCase()
                    //fileName: 'prova.xlsx'
                }
            }
        };

        // this.report.exportData({
        //     config: payload,
        //     format: "table"
        // });
        //
        // fenixExport.init("metadataExport");


        this.report.export({
            config: payload,
            format: "table"
        });
    };

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