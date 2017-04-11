define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../../config/config",
    "../../../../config/errors",
    "../../../../config/events",
    "../../../../config/domains/config",
    // "./indicatorProcesses1",
    "../../../../config/domains/filterSelectors",
    'fenix-ui-reports',
    "../../../../nls/labels"
], function ($, log, _, C, ERR, EVT, DM, FilterSelectors, Report, labels) {
// ], function ($, log, _, C, ERR, EVT, DM, IP, FilterSelectors, Report, labels) {

    'use strict';

    var defaultOptions = {};

    var s = {
        indicator_processes_renders_path : './indicatorProcesses',


        indicatorCategory : '1',

        filter_button : {
            button_1 : "vd_filter_button_1"
        },

        dashboard_button : {
            export : "vd_dashboard_button_export_",
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

    function IndicatorCommon(o) {

        $.extend(true, this, defaultOptions, o);
        this._initVariables();


        return this;
    }

    IndicatorCommon.prototype._initVariables = function () {

        console.log(this.indicatorProperties)
        //indicatorProperties
        var IndicatorProcessesRender = this._getIndicatorProcessesRender();
        console.log(JSON.stringify(IndicatorProcessesRender))
        console.log(IndicatorProcessesRender)
        this.indicatorProcesses = new IndicatorProcessesRender();

        this.$el = $(this.el);
        // pub/sub
        this.channels = {};

        console.log(this.indicatorProcesses)

        if (this.report && $.isFunction(this.report.dispose)) {
            this.report.dispose();
        }

        this.report = new Report({
            environment: this.environment,
            cache: this.cache
        });
    };

    //This method is called after the dashboard render
    IndicatorCommon.prototype.render = function (obj) {

        this.filter = obj.filter;
        this.dashboard_config = obj.dashboard_config;
        this.dashboard = obj.dashboard;
        this.models = obj.models;

        this._bindEventListeners();
    }

    IndicatorCommon.prototype._getIndicatorProcessesRender = function () {
        return require(this._getIndicatorProcessesPath());
    };

    IndicatorCommon.prototype._getIndicatorProcessesPath = function () {
        console.log(JSON.stringify(s.indicator_processes_renders_path + '1'))
        return s.indicator_processes_renders_path + this.indicatorProperties.processType;
    };


    IndicatorCommon.prototype.indicatorSectionInit = function (dashboardConfig) {

        var indicatorSection = this.el.find('[data-section = "'+this.indicatorProperties.dashboard_category+'"]');

        if((dashboardConfig!=null)&&(typeof dashboardConfig != 'undefined')){
            var itemsArray = dashboardConfig.items;
            var itemCount = 1;
            itemsArray.forEach(function (item) {

                if((item.hostConfig!=null)&&(typeof item.hostConfig!='undefined')){
                    var itemContainerConfig = item.hostConfig.itemContainer;
                    if((itemContainerConfig!= null)&&(typeof itemContainerConfig!= 'undefined')){
                        //Container class setting
                        if((itemContainerConfig.class!= null)&&(typeof itemContainerConfig.class!= 'undefined')){
                            var elem = indicatorSection.find('[data-itemContainer = "vd_dashboard_item_container_'+itemCount+'"]');
                            if((elem!= null)&&(typeof elem!= 'undefined')){
                                console.log("BEFORE ADD CLASS")
                                elem.addClass(itemContainerConfig.class);
                            }
                        }
                        //Container title
                        if((itemContainerConfig.title!= null)&&(typeof itemContainerConfig.title!= 'undefined')){
                            if((itemContainerConfig.title.text!= null)&&(typeof itemContainerConfig.title.text!= 'undefined')){
                                elem = indicatorSection.find('[data-itemContainerTitle = "vd_dashboard_item_container_title_'+itemCount+'"]');
                                if((elem!= null)&&(typeof elem!= 'undefined')){
                                    elem.html(itemContainerConfig.title.text);
                                }
                            }
                        }

                        //Container subtitle
                        if((itemContainerConfig.subtitle!= null)&&(typeof itemContainerConfig.subtitle!= 'undefined')){
                            if((itemContainerConfig.subtitle.text!= null)&&(typeof itemContainerConfig.subtitle.text!= 'undefined')){
                                elem = indicatorSection.find('[data-itemContainerSubtitle = "vd_dashboard_item_container_subtitle_'+itemCount+'"]');
                                if((elem!= null)&&(typeof elem!= 'undefined')){
                                    elem.html(itemContainerConfig.subtitle.text);
                                }
                            }
                        }

                        //Container buttons data-button="vd_dashboard_button_export_2"
                        if((itemContainerConfig.buttons!= null)&&(typeof itemContainerConfig.buttons!= 'undefined')){
                            if((itemContainerConfig.buttons.export!= null)&&(typeof itemContainerConfig.buttons.export!= 'undefined')){
                                if((itemContainerConfig.buttons.export.show!= null)&&(typeof itemContainerConfig.buttons.export.show!= 'undefined')&&(!itemContainerConfig.buttons.export.show)){
                                    elem = indicatorSection.find('[data-button = "vd_dashboard_button_export_'+itemCount+'"]');
                                    if((elem!= null)&&(typeof elem!= 'undefined')){
                                        elem.hide();
                                    }
                                }
                            }
                        }

                        var elem = indicatorSection.find('[data-item = "vd_dashboard_item_'+itemCount+'"]');
                        if((elem!= null)&&(typeof elem!= 'undefined')){
                            //Item class setting
                            if((itemContainerConfig.itemClass!= null)&&(typeof itemContainerConfig.itemClass!= 'undefined')){
                                elem.addClass(itemContainerConfig.class);
                            }

                            //height
                            if((itemContainerConfig.height!= null)&&(typeof itemContainerConfig.height!= 'undefined')){
                                // console.log(itemContainerConfig.height)
                                // elem.style.height = itemContainerConfig.height;
                                //$(elem).setAttribute('style', 'height: 500px');
                                //console.log(elem.style)
                                //elem.style.height = '2500px';
                                //elem.attr('style: height' , '2500px');
                            }

                        }

                        //Footer
                        //Container buttons //data-itemContainerFooter="vd_dashboard_item_container_footer_2"
                        if((itemContainerConfig.footer!= null)&&(typeof itemContainerConfig.footer!= 'undefined')){
                            if((itemContainerConfig.footer.show!= null)&&(typeof itemContainerConfig.footer.show!= 'undefined')&&(!itemContainerConfig.footer.show)){
                                elem = indicatorSection.find('[data-itemContainerFooter = "vd_dashboard_item_container_footer_'+itemCount+'"]');
                                if((elem!= null)&&(typeof elem!= 'undefined')){
                                    elem.hide();
                                }
                            }
                            else{
                                //The footer has to be shown
                                //data-itemContainerFooterContent="vd_dashboard_item_container_footerContent_1"
                                if((itemContainerConfig.footer.text!= null)&&(typeof itemContainerConfig.footer.text!= 'undefined')){
                                    elem = indicatorSection.find('[data-itemContainerFooterContent = "vd_dashboard_item_container_footerContent_'+itemCount+'"]');
                                    if((elem!= null)&&(typeof elem!= 'undefined')){
                                        elem.html(itemContainerConfig.footer.text);
                                    }
                                }
                            }
                        }
                    }
                }
                itemCount++;
            })
        }
    }

    IndicatorCommon.prototype.indicatorFilterConfigInit = function (filterConfig) {

        var newFilterConfig = {};

        if((filterConfig!=null)&&(typeof filterConfig != 'undefined')){
            var itemsArray = filterConfig.items;
            var itemCount = 1, selectorConfig, id, type, defaultValue, title;

            itemsArray.forEach(function (item) {

                id = item.id;
                type = item.type;
                defaultValue = item.default;
                title = item.title;

                selectorConfig = FilterSelectors[type];

                if((selectorConfig!=null)&&(typeof selectorConfig!= 'undefined')){
                    //Setting default value
                    if((selectorConfig.selector!=null)&&(typeof selectorConfig.selector!= 'undefined')){
                        if((defaultValue!=null)&&(typeof defaultValue!= 'undefined')){
                            selectorConfig.selector.default = defaultValue;
                        }
                    }

                    //Setting title
                    if((selectorConfig.template!=null)&&(typeof selectorConfig.template!= 'undefined')){
                        if((title!=null)&&(typeof title!= 'undefined')){
                            selectorConfig.template.title = title;
                        }
                    }
                }
                newFilterConfig[id] = selectorConfig;
            });
        }

        return newFilterConfig;
    }

    IndicatorCommon.prototype._bindEventListeners = function () {

        var self = this;

        var filter_button_1 = this.el.find('[data-button = "'+s.filter_button.button_1+'"]');

        console.log(this.indicatorProcesses)
        if(filter_button_1){
            filter_button_1.on(s.event.BUTTON_CLICK, _.bind(self.onClick_button1, this));
        }

        if((this.dashboard_config!=null)&&(typeof this.dashboard_config != 'undefined')){
            var itemsArray = this.dashboard_config.items;
            var itemCount = 1, itemId, uid, dashboard_button;

            itemsArray.forEach(function (item) {

                if ((item != null) && (typeof item != 'undefined')) {
                    console.log("in bind", item)
                    itemId = item.id;
                    uid = item.uid;
                    var dashboard_button = self.el.find('[data-button = "'+s.dashboard_button.export+itemCount+'"]');

                    if(dashboard_button){
                        dashboard_button.on(s.event.BUTTON_CLICK, _.bind(self.downloadData, self, self.models[itemId], uid));
                    }
                }
            });
        }

        // var dashboard_button_1 = this.el.find('[data-button = "'+s.dashboard_button.button_1+'"]');
        //
        // if(dashboard_button_1){
        //     console.log(s.dashboard_items.item_1, JSON.stringify(self.uid_items[s.dashboard_items.item_1]))
        //     dashboard_button_1.on(s.event.BUTTON_CLICK, _.bind(self.downloadData, this, self.models[s.dashboard_items.item_1], self.uid_items.item_1));
        // }
        //
        // var dashboard_button_3 = this.el.find('[data-button = "'+s.dashboard_button.button_3+'"]');
        //
        // if(dashboard_button_3){
        //     console.log(s.dashboard_items.item_3, JSON.stringify(self.uid_items[s.dashboard_items.item_3]))
        //     dashboard_button_3.on(s.event.BUTTON_CLICK, _.bind(self.downloadData, this, self.models[s.dashboard_items.item_3], self.uid_items.item_3));
        // }
        //
        // var dashboard_button_4 = this.el.find('[data-button = "'+s.dashboard_button.button_4+'"]');
        //
        // if(dashboard_button_4){
        //     console.log(s.dashboard_items.item_4, JSON.stringify(self.uid_items[s.dashboard_items.item_4]))
        //     dashboard_button_4.on(s.event.BUTTON_CLICK, _.bind(self.downloadData, this, self.models[s.dashboard_items.item_4], self.uid_items.item_4));
        // }
    };

    IndicatorCommon.prototype.onClick_button1 = function () {
        var values = this.filter.getValues();
        this.dashboard_config = this.indicatorProcesses.onClickButton(this.dashboard_config, values);

        this._trigger(s.event.DASHBOARD_CONFIG, {indicator_category : s.indicatorCategory, dashboardConfig : this.dashboard_config, values: values, dashboard: this.dashboard})
    }

    IndicatorCommon.prototype.downloadData = function (model, uid) {
        console.log("in bind", item)
        //var model2 = {"metadata":{"rid":"9_11457","uid":"adam_browse_sector_oda","dsd":{"cache":{"storage":"postgres"},"rid":"63_324","columns":[{"dataType":"code","key":true,"id":"gaul0","title":{"EN":"GAUL Country"},"domain":{"codes":[{"version":"2014","idCodeList":"GAUL0","extendedName":{"EN":"Global administrative unit layer country level"}}]},"subject":"geo"},{"dataType":"number","key":false,"id":"value","title":{"EN":"Value"},"subject":"value"},{"dataType":"code","key":false,"id":"unitcode","title":{"EN":"Measurement unit"},"domain":{"codes":[{"version":"2016","idCodeList":"crs_units","extendedName":{"EN":"OECD Units"}}]},"subject":"um"},{"dataType":"text","key":false,"id":"unitcode_EN","title":{"EN":"Measurement unit"},"virtual":false,"transposed":false},{"dataType":"text","key":false,"id":"gaul0_EN","title":{"EN":"GAUL Country"},"virtual":false,"transposed":false}],"contextSystem":"D3P"}},"data":[["181",3365.9938246499987,"million_usd","Million USD","Niger"],["254",568.9503590609995,"million_usd","Million USD","Ukraine"],["94",3751.3433445219976,"million_usd","Million USD","Ghana"],["243",481.72791288200006,"million_usd","Million USD","Togo"],["135",117.32736094599994,"million_usd","Million USD","Kiribati"],["79",14754.829214275996,"million_usd","Million USD","Ethiopia"],["196",3717.813645854998,"million_usd","Million USD","Philippines"],["4",508.3454585730001,"million_usd","Million USD","Algeria"],["107",868.852734545,"million_usd","Million USD","Guyana"],["40764",7421.549451951,"million_usd","Million USD","Sudan (ex)"],["205",2140.399058609001,"million_usd","Million USD","Rwanda"],["240",538.3631362360005,"million_usd","Million USD","Thailand"],["207",12.142791729999999,"million_usd","Million USD","Saint Helena"],["34",836.9131206080002,"million_usd","Million USD","Bosnia and Herzegovina"],["161",137.63201255,"million_usd","Million USD","Mayotte"],["68",3752.0364044950015,"million_usd","Million USD","Democratic Republic of the Congo"],["157",63.234144195000006,"million_usd","Million USD","Marshall Islands"],["43",1563.765752489,"million_usd","Million USD","Burundi"],["221",870.0060937989999,"million_usd","Million USD","Sierra Leone"],["156",0.0210849,"million_usd","Million USD","Malta"],["47",383.25892923900017,"million_usd","Million USD","Cape Verde"],["75",606.0823101330001,"million_usd","Million USD","El Salvador"],["217",3416.1782833740012,"million_usd","Million USD","Senegal"],["175",3097.1827506100017,"million_usd","Million USD","Nepal"],["76",15.952551659000003,"million_usd","Million USD","Equatorial Guinea"],["239",1102.534424734,"million_usd","Million USD","Tajikistan"],["250",44.312355069999995,"million_usd","Million USD","Turkmenistan"],["71",141.036150463,"million_usd","Million USD","Dominica"],["26",106.84980788700003,"million_usd","Million USD","Belarus"],["154",160.19288558300013,"million_usd","Million USD","Maldives"],["3",653.3022639359998,"million_usd","Million USD","Albania"],["248",1229.938683014,"million_usd","Million USD","Tunisia"],["31",276.942531754,"million_usd","Million USD","Bhutan"],["35",106.67483927800001,"million_usd","Million USD","Botswana"],["147295",7811.033758178414,"million_usd","Million USD","China"],["192",673.5400445839997,"million_usd","Million USD","Papua New Guinea"],["155",4175.799400400995,"million_usd","Million USD","Mali"],["241",417.59318784399954,"million_usd","Million USD","The former Yugoslav Republic of Macedonia"],["133",6418.99199705617,"million_usd","Million USD","Kenya"],["130",1467.4101994460002,"million_usd","Million USD","Jordan"],["141",757.0849790279995,"million_usd","Million USD","Lebanon"],["215",2.3587486559999995,"million_usd","Million USD","Saudi Arabia"],["40765",3395.4028414939994,"million_usd","Million USD","Egypt"],["115",15437.21778359978,"million_usd","Million USD","India"],["72",501.01526116999975,"million_usd","Million USD","Dominican Republic"],["144",1039.0959067419997,"million_usd","Million USD","Liberia"],["33",3355.1078021429994,"million_usd","Million USD","Bolivia"],["269",2642.742587750999,"million_usd","Million USD","Yemen"]]};

        model.metadata.uid = uid;
        // console.log("downloadData")
        console.log(uid)
        console.log(JSON.stringify(model))
        var payload = {
            resource: model,
            input: {
                config: {}
            },
            output: {
                config: {
                    lang: this.lang.toUpperCase()
                }
            }
        };

        this.report.export({
            format: "table",
            config: payload
        });
    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    IndicatorCommon.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    IndicatorCommon.prototype._trigger = function (channel) {

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


    return IndicatorCommon;

});