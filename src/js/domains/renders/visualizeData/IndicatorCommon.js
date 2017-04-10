define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../../config/config",
    "../../../../config/errors",
    "../../../../config/events",
    "../../../../config/domains/config",
    "./indicatorProcesses1",
    "./filterSelectors",
    'fenix-ui-reports',
    "../../../../nls/labels"
], function ($, log, _, C, ERR, EVT, DM, IP, FilterSelectors, Report, labels) {

    'use strict';

    var defaultOptions = {};

    var s = {
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
    }


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

    return IndicatorCommon;

});