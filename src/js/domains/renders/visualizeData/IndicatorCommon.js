define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../../config/config",
    "../../../../config/errors",
    "../../../../config/events",
    "../../../../config/domains/config",
    // "./indicatorProcesses1",
    "./filterSelectors",
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

        // pub/sub
        this.channels = {};

        console.log(this.indicatorProcesses)

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


    IndicatorCommon.prototype.indicatorSectionInit = function (visualizeDataPage, dashboardConfig, indicator_properties) {
        console.log(indicator_properties)
        var indicatorSection = visualizeDataPage.find('[data-section = "'+indicator_properties.dashboard_category+'"]');
        console.log(visualizeDataPage)
        console.log(dashboardConfig)
        console.log(indicator_properties)
        console.log(indicatorSection)

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

        // if((this.dashboard_config!=null)&&(typeof this.dashboard_config != 'undefined')){
        //     var itemsArray = this.dashboard_config.items;
        //     var itemCount = 1;
        //     var itemId = '';
        //     itemsArray.forEach(function (item) {
        //
        //         if ((item != null) && (typeof item != 'undefined')) {
        //             itemId = item.id;
        //             var dashboard_button = this.el.find('[data-button = "'+s.dashboard_button.button+'"]');
        //             //
        //             // if(dashboard_button_1){
        //             //     console.log(s.dashboard_items.item_1, JSON.stringify(self.uid_items[s.dashboard_items.item_1]))
        //             //     dashboard_button_1.on(s.event.BUTTON_CLICK, _.bind(self.downloadData, this, self.models[s.dashboard_items.item_1], self.uid_items.item_1));
        //             // }
        //         }
        //     });
        // }

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