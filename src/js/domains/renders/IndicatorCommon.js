define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../config/config",
    "../../../config/errors",
    "../../../config/events",
    "../../../config/domains/config",
    "../../../config/domains/filterSelectors",
    'fenix-ui-reports',
    "../../../nls/labels"
], function ($, log, _, C, ERR, EVT, DM, FilterSelectors, Report, labels) {

    'use strict';

    var defaultOptions = {};

    var s = {
        indicator_processes_renders_path : './visualizeData/indicatorProcesses',

        mainTabNames : {
            visualizeData : "visualizeData",
            downloadData : "downloadData"
        },

        filter_button : {
            button_1 : "vd_filter_button_1",
            buttonMsg_1 : "vd_filter_button_1_msg"
        },

        dashboard_button : {
            export : "vd_dashboard_button_export_"
        },

        event: {
            READY : "indicator-ready",
            BUTTON_CLICK : "click",
            DASHBOARD_CONFIG : "new_dashoboard_config_ready"
        },

        filterSelectorTypes: {
            radio : 'radio',
            checkbox : 'checkbox'
        }
    }

    function IndicatorCommon(o) {

        $.extend(true, this, defaultOptions, o);
        this._initVariables();


        return this;
    }

    IndicatorCommon.prototype._initVariables = function () {

        //indicatorProperties
        var IndicatorProcessesRender = this._getIndicatorProcessesRender();
        this.indicatorProcesses = new IndicatorProcessesRender();

        this.$el = $(this.el);
        // pub/sub
        this.channels = {};

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

                        //Container buttons
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
                        if((itemContainerConfig.footer!= null)&&(typeof itemContainerConfig.footer!= 'undefined')){
                            if((itemContainerConfig.footer.show!= null)&&(typeof itemContainerConfig.footer.show!= 'undefined')&&(!itemContainerConfig.footer.show)){
                                elem = indicatorSection.find('[data-itemContainerFooter = "vd_dashboard_item_container_footer_'+itemCount+'"]');
                                if((elem!= null)&&(typeof elem!= 'undefined')){
                                    elem.hide();
                                }
                            }
                            else{
                                //The footer has to be shown
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


    IndicatorCommon.prototype.indicatorFilterTemplateUpdate = function (filterConfigBeforeParsing) {

        if((filterConfigBeforeParsing!=null)&&(typeof filterConfigBeforeParsing != 'undefined')) {
            var itemsArray = filterConfigBeforeParsing.items;
            var itemCount = 1, selectorConfig, id, type, defaultValue, title;
            var self = this;

            itemsArray.forEach(function (item) {

                id = item.id;
                title = item.title;
                var itemElem = self.el.find('[data-tabLabel = "' + id + '_tab"]');
                if ((itemElem != null) && (typeof itemElem != 'undefined')) {
                    itemElem.html(title)
                }

            });
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

                selectorConfig = {};
                $.extend(true, selectorConfig, FilterSelectors[type]);

                if((selectorConfig!=null)&&(typeof selectorConfig!= 'undefined')){
                    //Setting default value
                    if((selectorConfig.selector!=null)&&(typeof selectorConfig.selector!= 'undefined')){
                        if((defaultValue!=null)&&(typeof defaultValue!= 'undefined')){
                            selectorConfig.selector.default = defaultValue;
                        }
                    }

                    // //Setting title for all the selectors
                    // if((selectorConfig.template!=null)&&(typeof selectorConfig.template!= 'undefined')){
                    //     if((title!=null)&&(typeof title!= 'undefined')){
                    //         selectorConfig.template.title = title;
                    //     }
                    // }

                    //Setting title for radio button selector(title is an array)
                    if((selectorConfig.selector!=null)&&(typeof selectorConfig.selector!= 'undefined')){
                        if((selectorConfig.selector.type==s.filterSelectorTypes.radio)||(selectorConfig.selector.type==s.filterSelectorTypes.checkbox)){
                            var itemTitleCount = 1;

                            //console.log(title)
                            if((title!=null)&&(typeof title!= 'undefined')&&(title.length>0)){
                                selectorConfig.selector.source =[];
                                title.forEach(function (titleItem) {
                                    var obj = {value: itemTitleCount, label: titleItem};
                                    selectorConfig.selector.source.push(obj);
                                    itemTitleCount++;
                                })
                            }
                        }
                    }
                }
                newFilterConfig[id] = selectorConfig;
                itemCount++;
            });
        }

        return newFilterConfig;
    }

    IndicatorCommon.prototype._bindEventListeners = function () {

        var self = this;

        var filter_button_1 = this.el.find('[data-button = "'+s.filter_button.button_1+'"]');
        var filter_div_msg_1 = this.el.find('[data-buttonMsg = "'+s.filter_button.buttonMsg_1+'"]');

        if((filter_button_1!=null)&&(typeof filter_button_1!='undefined')&&(filter_div_msg_1!=null)&&(typeof filter_div_msg_1!='undefined')){
            filter_button_1.on(s.event.BUTTON_CLICK, _.bind(self.onClick_button1, this, {lang: this.lang, filterDivMsg_1: filter_div_msg_1}));
        }

        if((this.dashboard_config!=null)&&(typeof this.dashboard_config != 'undefined')){
            var itemsArray = this.dashboard_config.items;
            var itemCount = 1, itemId, uid, dashboard_button;

            itemsArray.forEach(function (item) {

                if ((item != null) && (typeof item != 'undefined')) {
                    itemId = item.id;
                    uid = item.uid;

                    //Dashboard Export
                    var dashboard_button = self.el.find('[data-button = "'+s.dashboard_button.export+itemCount+'"]');

                    if(dashboard_button){
                        dashboard_button.on(s.event.BUTTON_CLICK, _.bind(self.downloadData, self, self.models[itemId], uid));
                    }
                }
                itemCount++;
            });
        }

        if((this.filter!=null)&&(typeof this.filter!= 'undefined')){
            this.filter.on('select', _.bind(self.onSelectFilter, self, {filterDivMsg_1: filter_div_msg_1}));
        }
    };

    IndicatorCommon.prototype.onClick_button1 = function (param) {
        var values = this.filter.getValues();
        var newDashboardConfig = this.indicatorProcesses.onClickButton(this.dashboard_config, values, param);
        if((newDashboardConfig!= null)&&(typeof newDashboardConfig!= 'undefined')){
            this.dashboard_config = newDashboardConfig;
            if(this.mainTabName == s.mainTabNames.visualizeData){
                this._trigger(s.event.DASHBOARD_CONFIG, {indicator_properties : this.indicatorProperties, dashboardConfig : this.dashboard_config, values: values, dashboard: this.dashboard})
            }
        }
    }

    IndicatorCommon.prototype.onSelectFilter = function (hostParam, filterResponse) {

        var res = this.indicatorProcesses.onSelectFilter(hostParam, filterResponse);
    }

    IndicatorCommon.prototype.downloadData = function (model, uid) {

        model.metadata.uid = uid;
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