define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../config/config",
    "../../../config/errors",
    "../../../config/events",
    "../../../config/domains/config",
    "../../../config/domains/filterSelectors",
    "../../../config/domains/codelistPayloads",
    "../renders/IndicatorCommonUtils",
    "../renders/downloadData/indicatorBase",
    "../../../html/domains/visualizeDataDashboardTemplate.hbs",
    "fenix-ui-reports",
    "../../../nls/labels",
    "fenix-ui-bridge",
    "json-2-csv",
    "file-saver",
    "bootstrap-table",
    '../../../../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export'
], function ($, log, _, C, ERR, EVT, DM, FilterSelectors, CL, ICUtils, IBase, DashboardTemplate, Report, labels, Bridge, converter, FileSaver, bootstrapTable) {

    'use strict';

    var defaultOptions = {};

    var s = {
        indicator_processes_renders_path : '/indicatorProcesses',

        mainTabNames : {
            visualizeData : "visualizeData",
            downloadData : "downloadData"
        },

        filter_button : {
            vd_button_1 : "vd_filter_button_1",
            vd_buttonMsg_1 : "vd_filter_button_1_msg",
            dd_button_1 : "dd_filter_button_1",
            dd_buttonMsg_1 : "dd_filter_button_1_msg",
            dd_button_2 : "dd_filter_button_2",
            dd_button_3 : "dd_filter_button_3"
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
        var filter_btnMsg1Obj = '';


        if(this.mainTabName == s.mainTabNames.visualizeData){
            filter_btnMsg1Obj = this.el.find('[data-buttonMsg = "'+s.filter_button.vd_buttonMsg_1+'"]');
        }
        else{
            filter_btnMsg1Obj = this.el.find('[data-buttonMsg = "'+s.filter_button.dd_buttonMsg_1+'"]');
        }

        var o = {environment: this.environment, el : this.el};
        if((filter_btnMsg1Obj!=null)&&(typeof filter_btnMsg1Obj!='undefined')){
            o["filterDivMsg1"] = filter_btnMsg1Obj;
        }

        this.filter_btnMsg1Obj = filter_btnMsg1Obj;
        this.indicatorProcesses = new IndicatorProcessesRender(o);

        this.$el = $(this.el);
        // pub/sub
        this.channels = {};

        if (this.report && $.isFunction(this.report.dispose)) {
            this.report.dispose();
        }

        this.report = new Report({
            environment: this.environment,
            cache: this.cache,
            silent: true
        });

        this.bridge = new Bridge({
            environment : this.environment
        });

        this.icutils = new ICUtils();
        this.isos = this._getISO();
    };

    //This method is called after the dashboard render
    IndicatorCommon.prototype.render = function (obj) {

        this.filter = obj.filter;
        this.filter_host_config = obj.filter_host_config;
        this.dashboard_config = obj.dashboard_config;
        this.dashboard = obj.dashboard;
        this.models = obj.models;

        this.indicatorProcesses.updateVariables({filter : this.filter, filter_host_config : this.filter_host_config});

        this._bindEventListeners();
    }

    IndicatorCommon.prototype._getIndicatorProcessesRender = function () {
        return IBase;
        //return require(this._getIndicatorProcessesPath());
    };

    IndicatorCommon.prototype._getIndicatorProcessesPath = function () {
        return './'+ this.mainTabName + s.indicator_processes_renders_path + this.indicatorProperties.indicator_id;
    };

    //To Update the template based on the configuration file
    IndicatorCommon.prototype.indicatorSectionInit = function (dashboardConfig) {
        var indicatorSection = '';
        if(this.mainTabName == s.mainTabNames.visualizeData){
            indicatorSection = this.el.find('[data-dashboardsection = "'+this.indicatorProperties.vd_dashboard_category+'"]');
        }
        else {
            indicatorSection = this.el.find('[data-dashboardsection = 1]');
        }

        if((dashboardConfig!=null)&&(typeof dashboardConfig != 'undefined')&&(dashboardConfig.items!=null)&&(typeof dashboardConfig.items != 'undefined')){
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

                                $('[data-item = "vd_dashboard_item_'+itemCount+'"]').height(itemContainerConfig.height);
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
                if ((itemElem != null) && (typeof itemElem != 'undefined')) itemElem.html(title)

            });
        }
    }

    //HostConfig is the configuration of the filter used in the Wiews application
    //and ignored by the Fenix Filter
    IndicatorCommon.prototype.indicatorFilterHostConfigInit = function (filterConfig) {

        var newFilterHostConfig = {};

        if ((filterConfig != null) && (typeof filterConfig != 'undefined')) {
            if ((filterConfig.hostConfig != null) && (typeof filterConfig.hostConfig != 'undefined')) {
                $.extend(true, newFilterHostConfig, filterConfig.hostConfig);
            }
        }
        return newFilterHostConfig;
    }

    //Creation of the configuration for the Filter Fenix Component
    IndicatorCommon.prototype.indicatorFilterConfigInit = function (filterConfig) {

        var newFilterConfig = {};

        if((filterConfig!=null)&&(typeof filterConfig != 'undefined')){
            var itemsArray = filterConfig.items;
            var itemCount = 1, selectorConfig, id, type, defaultValue, title, choicesTitle, codelist, codes, maxItems, source, max, blacklist

            itemsArray.forEach(function (item) {

                id = item.id;
                type = item.type;
                defaultValue = item.default;
                title = item.title;
                choicesTitle = item.choicesTitle;
                codelist = item.clUid;
                blacklist = item.clBlackList;
                codes = item.clCodes;
                maxItems = item.maxItems;
                max = item.max;
                source = item.source;

                selectorConfig = {};
                $.extend(true, selectorConfig, FilterSelectors[type]);

                if((selectorConfig!=null)&&(typeof selectorConfig!= 'undefined')){
                        //Setting default value
                        if((selectorConfig.selector!=null)&&(typeof selectorConfig.selector!= 'undefined')){
                            if((defaultValue!=null)&&(typeof defaultValue!= 'undefined')){
                                selectorConfig.selector.default = defaultValue;
                            }

                            if((max!=null)&&(typeof max!= 'undefined')){
                                selectorConfig.selector.max = max;
                            }

                            if((source!=null)&&(typeof source!= 'undefined')){
                                selectorConfig.selector.source = source;
                            }

                            if((blacklist!=null)&&(typeof blacklist!= 'undefined')){
                                selectorConfig.selector.blacklist = blacklist;
                            }

                            //Setting title for radio button selector(title is an array)
                            if((selectorConfig.selector.type==s.filterSelectorTypes.radio)||(selectorConfig.selector.type==s.filterSelectorTypes.checkbox)){
                                var itemTitleCount = 1;

                                if((choicesTitle!=null)&&(typeof choicesTitle!= 'undefined')&&(choicesTitle.length>0)){
                                    selectorConfig.selector.source =[];
                                    choicesTitle.forEach(function (choicesTitleItem) {
                                        var obj = {value: itemTitleCount, label: choicesTitleItem};
                                        selectorConfig.selector.source.push(obj);
                                        itemTitleCount++;
                                    })
                                }
                            }
                        }


                        // //Setting title for all the selectors
                        // if((selectorConfig.template!=null)&&(typeof selectorConfig.template!= 'undefined')){
                        //     if((title!=null)&&(typeof title!= 'undefined')){
                        //         selectorConfig.template.title = title;
                        //     }
                        // }

                        //Setting codelist for the selector
                        if((codelist!=null)&&(typeof codelist!= 'undefined')){
                            selectorConfig.cl = {
                                uid: codelist,
                                codes: codes
                            };
                            /*
                            if((selectorConfig.cl!=null)&&(typeof selectorConfig.cl!= 'undefined')){
                                selectorConfig.cl.uid = codelist;
                            } else{

                            }
                            */
                        }

                        //Max number of element to select(only for dropdown)
                        if((maxItems!=null)&&(typeof maxItems!= 'undefined')){
                            if((selectorConfig.config!=null)&&(typeof selectorConfig.config!= 'undefined')){
                                selectorConfig.config.maxItems = maxItems;
                            } else{
                                selectorConfig.config = {maxItems: maxItems};
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

        if(this.mainTabName == s.mainTabNames.visualizeData){
            //Visualize Data Event Listener
            this._VD_bindEventListeners();
        }
        else {
            //Download Data Event Listener
            this._DD_bindEventListeners();
        }

        this.indicatorProcesses.bindEventListener();
    };

    //Visualization Tab listener
    IndicatorCommon.prototype._VD_bindEventListeners = function () {

        var self = this;

        var filter_button_1 = this.el.find('[data-button = "'+s.filter_button.vd_button_1+'"]');
        var filter_div_msg_1 = this.el.find('[data-buttonMsg = "'+s.filter_button.vd_buttonMsg_1+'"]');

        if((filter_button_1!=null)&&(typeof filter_button_1!='undefined')&&(filter_div_msg_1!=null)&&(typeof filter_div_msg_1!='undefined')){
            filter_button_1.on(s.event.BUTTON_CLICK, _.bind(self._VD_onClick_button1, this, {lang: this.lang}));
        }

        if((this.dashboard_config!=null)&&(typeof this.dashboard_config != 'undefined')){
            var itemsArray = this.dashboard_config.items;
            if((itemsArray!=null)&&(typeof itemsArray != 'undefined')) {
                var itemCount = 1, itemId, uid, dashboard_button;

                itemsArray.forEach(function (item) {

                    if ((item != null) && (typeof item != 'undefined')) {
                        itemId = item.id;
                        uid = item.uid;

                        //Dashboard Export
                        var dashboard_button = self.el.find('[data-button = "' + s.dashboard_button.export + itemCount + '"]');

                        if (dashboard_button) {
                            dashboard_button.on(s.event.BUTTON_CLICK, _.bind(self.downloadData, self, self.models[itemId], uid));
                        }
                    }
                    itemCount++;
                });
            }
        }

        if((this.filter!=null)&&(typeof this.filter!= 'undefined')){
            this.filter.on('select', _.bind(self.onSelectFilter, self, {filterDivMsg_1: filter_div_msg_1}));
        }
    };

    //Download Tab listener
    IndicatorCommon.prototype._DD_bindEventListeners = function () {

        var self = this;

        var filter_button_1 = this.el.find('[data-button = "'+s.filter_button.dd_button_1+'"]');
        var filter_div_msg_1 = this.el.find('[data-buttonMsg = "'+s.filter_button.dd_buttonMsg_1+'"]');

        var indicatorDashboardSection = '';

        if(this.mainTabName == s.mainTabNames.visualizeData){
            indicatorDashboardSection = this.el.find('[data-dashboardSection = "'+this.indicatorProperties.vd_dashboard_category+'"]');
        } else {
            indicatorDashboardSection = this.el.find('[data-dashboardSection = 1]');
        }

        if((filter_button_1!=null)&&(typeof filter_button_1!='undefined')&&(filter_div_msg_1!=null)&&(typeof filter_div_msg_1!='undefined')){
            filter_button_1.on(s.event.BUTTON_CLICK, _.bind(self._DD_onClick_button1, this, {lang: this.lang, indicatorDashboardSection: indicatorDashboardSection}));
        }

        var filter_button_2 = this.el.find('[data-button = "'+s.filter_button.dd_button_2+'"]');
        var filter_div_msg_2 = this.el.find('[data-buttonMsg = "'+s.filter_button.dd_buttonMsg_1+'"]');
        if((filter_button_2!=null)&&(typeof filter_button_2!='undefined')&&(filter_div_msg_2!=null)&&(typeof filter_div_msg_2!='undefined')){
            if (this.indicatorProperties.vd_code !== undefined) {
                filter_button_2.on(s.event.BUTTON_CLICK, _.bind(self._DD_onClick_button2, this, {
                    lang: this.lang,
                    indicatorDashboardSection: indicatorDashboardSection
                }));
            } else {
                filter_button_2.off(s.event.BUTTON_CLICK);
                $('[data-button = "'+s.filter_button.dd_button_2+'"]').attr('disabled','disabled');
            }
        }

        var filter_button_3 = this.el.find('[data-button = "'+s.filter_button.dd_button_3+'"]');
        var filter_div_msg_3 = this.el.find('[data-buttonMsg = "'+s.filter_button.dd_buttonMsg_1+'"]');
        if((filter_button_3!=null)&&(typeof filter_button_3!='undefined')&&(filter_div_msg_3!=null)&&(typeof filter_div_msg_3!='undefined')){
            filter_button_3.on(s.event.BUTTON_CLICK, _.bind(self._DD_onClick_button3, this, {lang: this.lang, indicatorDashboardSection: indicatorDashboardSection}));
        }

        if((this.filter!=null)&&(typeof this.filter!= 'undefined')){
            this.filter.on('select', _.bind(self.onSelectFilter, self, {filterDivMsg_1: filter_div_msg_1}));
        }
    };

    //Visualization  Tab Button 1
    IndicatorCommon.prototype._VD_onClick_button1 = function (param) {
        var values = this.filter.getValues();
        var newDashboardConfig = this.indicatorProcesses.onClickButton(this.dashboard_config, values, param);
        if((newDashboardConfig!= null)&&(typeof newDashboardConfig!= 'undefined')){
            this.dashboard_config = newDashboardConfig;
            if(this.mainTabName == s.mainTabNames.visualizeData){
                this._trigger(s.event.DASHBOARD_CONFIG, {indicator_properties : this.indicatorProperties, dashboardConfig : this.dashboard_config, values: values, dashboard: this.dashboard})
            }
        }
    }

    IndicatorCommon.prototype._toggleLoading = function () {
        console.log('toggle');
        //setTimeout(function(){
            if( $("[data-page=content_container]").css('opacity') == '1') {
                //console.log('bobble')
                $('div[data-page="loading"]').show();
                $('div[data-page="content_container"]').css('opacity','0.5');
            } else {
                //console.log('goggle')
                $('div[data-page="loading"]').hide();
                $('div[data-page="content_container"]').css('opacity','1');
            }
        //}, 1);

    };

    //Download  Tab Button 1
    IndicatorCommon.prototype._DD_onClick_button1 = function (param) {
        var self = this;
        this._toggleLoading();
        setTimeout(function() {
            $('[data-dashboardContainer = "dd-dashboard-container"]').hide();
            var values = self.filter.getValues();
            $.extend(param, {indicator_id: self.indicatorProperties.indicator_id}, {time_label: self.indicatorProperties.period_label});
            var newDashboardConfig = self.indicatorProcesses.onClickButton1(values, self.dashboard_config, param);
            if ((newDashboardConfig != null) && (typeof newDashboardConfig != 'undefined') && (!$.isEmptyObject(newDashboardConfig))) {
                self._DD_getTableData(param, newDashboardConfig, values)
            }
        }, 150);
    }

    //Download  Tab Button 2
    IndicatorCommon.prototype._DD_onClick_button2 = function (param) {
        var self = this;
        this._toggleLoading();
        setTimeout(function() {
            $('div.tableauPlaceholder').remove();
            var values = self.filter.getValues();
            var newDashboardConfig = self.indicatorProcesses.onClickButton2(values, self.dashboard_config, param);
            if((newDashboardConfig!= null)&&(typeof newDashboardConfig != 'undefined')&&(!$.isEmptyObject(newDashboardConfig))) {
                self._initiateDashboard(newDashboardConfig);
            }
        }, 150);
    }

    IndicatorCommon.prototype._initiateDashboard = function (config) {
        //console.log(config.codelist);
        //console.log(config.values);


        var filtertext = "",
            isovalues = [],
            vd_code = this.indicatorProperties.vd_code,
            time = this.filter.getValues(),
            year = (this.indicatorProperties.time == "years") ? time.values['dd_filter_item_9'] : null,
            codes = {
                "mdg" : "mdg_region",
                "sdg" : "sdg_region",
                "itpgrfa" : "itpgrfa_region",
                "cgrfa" : "cgrfa_region"
            };

        var isWorld = {
                "fao" : ["5000"],
                "m49" : ["1"],
                "mdg" : ["5000"],
                "sdg" : ["5000"],
                "itpgrfa" : ["5000"],
                "cgrfa" : ["5000"]
            },
            isRegion = {
                "fao": ["5100", "5200", "5300", "5400", "5500"],
                "m49" : ["9","21","142","15","419","150", "202"]
            },
            fromSubRegion = {
                "fao": {
                    // Africa
                    "5101": ["BDI", "COM", "DJI", "ERI", "ETH", "KEN", "MDG", "MWI", "MUS", "MYT", "MOZ", "REU", "RWA", "SYC", "SOM", "SSD", "UGA", "TZA", "ZMB", "ZWE"],
                    "5102": ["AGO", "CMR", "CAF", "TCD", "COG", "COD", "GNQ", "GAB", "STP"],
                    "5103": ["DZA", "EGY", "LBY", "MAR", "SDN", "TUN", "ESH"],
                    "5104": ["BWA", "LSO", "NAM", "ZAF", "SWZ"],
                    "5105": ["BEN", "BFA", "CIV", "CPV", "GMB", "GHA", "GIN", "GNB", "LBR", "MLI", "MRT", "NER", "NGA", "SHN", "SEN", "SLE", "TGO"],
                    // America
                    "5203": ["BMU", "CAN", "GRL", "SPM", "USA"],
                    "5204": ["BLZ", "CRI", "SLV", "GTM", "HND", "MEX", "NIC", "PAN"],
                    "5206": ["AIA", "ATG", "ABW", "BHS", "BRB", "VGB", "CYM", "CUB", "DMA", "DOM", "GRD", "GLP", "HTI", "JAM", "MTQ", "MSR", "PRI", "KNA", "LCA", "VCT", "TTO", "TCA", "VIR"],
                    "5207": ["ARG", "BOL", "BRA", "CHL", "COL", "ECU", "FLK", "GUF", "GUY", "PRY", "PER", "SUR", "URY", "VEN"],
                    // Asia
                    "5301": ["KAZ", "KGZ", "TJK", "TKM", "UZB"],
                    "5302": ["HKG", "MAC", "PRK", "JPN", "MNG", "KOR"],
                    "5303": ["AFG", "BGD", "BTN", "IND", "IRN", "MDV", "NPL", "PAK", "LKA"],
                    "5304": ["BRN", "KHM", "IDN", "LAO", "MYS", "MMR", "PHL", "SGP", "THA", "TLS", "VNM"],
                    "5305": ["ARM", "AZE", "BHR", "CYP", "GEO", "IRQ", "ISR", "JOR", "KWT", "LBN", "OMN", "QAT", "SAU", "PSE", "YEM", "SYR", "TUR", "ARE"],
                    // Europe
                    "5401": ["BLR", "BGR", "CZE", "HUN", "POL", "MDA", "ROU", "RUS", "SVK", "UKR"],
                    "5402": ["CHI", "DNK", "EST", "FRO", "FIN", "ISL", "IRL", "IMN", "LVA", "LTU", "NOR", "SJM", "SWE", "GBR"],
                    "5403": ["ALB", "AND", "BIH", "HRV", "GIB", "GRC", "VAT", "ITA", "MLT", "MNE", "PRT", "SMR", "SRB", "SVN", "ESP", "MKD"],
                    "5404": ["AUT", "BEL", "FRA", "DEU", "LIE", "LUX", "MCO", "NLD", "CHE"],
                    // Oceania
                    "5501": ["AUS", "NZL", "NFK"],
                    "5502": ["FJI", "NCL", "PNG", "SLB", "VUT"],
                    "5503": ["GUM", "KIR", "MHL", "FSM", "NUR", "PLW"],
                    "5504": ["ASM", "COK", "PYF", "NIU", "PCN", "WSM", "TKL", "TON", "TUV", "WLF"]
                },
                "m49" : {
                    "14" : ["BDI", "COM", "DJI", "ERI", "ETH", "KEN", "MDG", "MWI", "MUS", "MYT", "MOZ", "REU", "RWA", "SYC", "SOM", "SSD", "UGA", "TZA", "ZMB", "ZWE"],
                    "17" : ["AGO", "CMR", "CAF", "TCD", "COG", "COD", "GNQ", "GAB", "STP"],
                    "18" : ["BWA", "LSO", "NAM", "ZAF", "SWZ"],
                    "11" : ["BEN", "BFA", "CIV", "CPV", "GMB", "GHA", "GIN", "GNB", "LBR", "MLI", "MRT", "NER", "NGA", "SHN", "SEN", "SLE", "TGO"],
                    "15" : ["DZA", "EGY", "LBY", "MAR", "SDN", "TUN", "ESH"],

                    "21" : ["BMU", "CAN", "GRL", "SPM", "USA"],
                    "13" : ["BLZ", "CRI", "SLV", "GTM", "HND", "MEX", "NIC", "PAN"],
                    "29" : ["AIA", "ATG", "ABW", "BHS", "BRB", "VGB", "CYM", "CUB", "DMA", "DOM", "GRD", "GLP", "HTI", "JAM", "MTQ", "MSR", "PRI", "KNA", "LCA", "VCT", "TTO", "TCA", "VIR"],
                    "5" : ["ARG", "BOL", "BRA", "CHL", "COL", "ECU", "FLK", "GUF", "GUY", "PRY", "PER", "SUR", "URY", "VEN"],

                    "143" : ["KAZ", "KGZ", "TJK", "TKM", "UZB"],
                    "30" : ["HKG", "MAC", "PRK", "JPN", "MNG", "KOR"],
                    "34" : ["AFG", "BGD", "BTN", "IND", "IRN", "MDV", "NPL", "PAK", "LKA"],
                    "35" : ["BRN", "KHM", "IDN", "LAO", "MYS", "MMR", "PHL", "SGP", "THA", "TLS", "VNM"],
                    "145" : ["ARM", "AZE", "BHR", "CYP", "GEO", "IRQ", "ISR", "JOR", "KWT", "LBN", "OMN", "QAT", "SAU", "PSE", "YEM", "SYR", "TUR", "ARE"],

                    "151" : ["BLR", "BGR", "CZE", "HUN", "POL", "MDA", "ROU", "RUS", "SVK", "UKR"],
                    "154" : ["CHI", "DNK", "EST", "FRO", "FIN", "ISL", "IRL", "IMN", "LVA", "LTU", "NOR", "SJM", "SWE", "GBR"],
                    "39" : ["ALB", "AND", "BIH", "HRV", "GIB", "GRC", "VAT", "ITA", "MLT", "MNE", "PRT", "SMR", "SRB", "SVN", "ESP", "MKD"],
                    "155" : ["AUT", "BEL", "FRA", "DEU", "LIE", "LUX", "MCO", "NLD", "CHE"],

                    "53" : ["AUS", "NZL", "NFK"],
                    "54" : ["FJI", "NCL", "PNG", "SLB", "VUT"],
                    "57" : ["GUM", "KIR", "MHL", "FSM", "NUR", "PLW"],
                    "61" : ["ASM", "COK", "PYF", "NIU", "PCN", "WSM", "TKL", "TON", "TUV", "WLF"]
                }
            },
            fromRegion = {
                "fao": {
                    "5100": ["5101", "5102", "5103", "5104", "5105"],
                    "5200": ["5203", "5204", "5206", "5207"],
                    "5300": ["5301", "5302", "5303", "5304", "5305"],
                    "5400": ["5401", "5402", "5403", "5404"],
                    "5500": ["5501", "5502", "5503", "5504"]
                },
                "m49": {
                    "202" : ["14","17","18","11"],
                    "15" : ["15"],
                    "21" : ["21"],
                    "419" : ["13","29","5"],
                    "142" : ["143","30","34","35","145"],
                    "150" : ["151","154","39","155"],
                    "9" : ["53","54","57","61"]
                },
                "sdg" : {
                    "738" : [],
                    "746" : [],
                    "514" : [],
                    "419" : [],
                },
                /*
                "9998" : ["INT"],
                "9999" : ["REG"]
                */
            }


        if (config.codelist != "iso3" && config.codelist != "m49" && config.codelist != "fao") {
            filtertext = codes[config.codelist]+"="+config.values;
        } else {
            if (config.codelist == "iso3" ) {
                filtertext = "iso3_country_code=" + config.values;
            } else {
                if (Boolean( _.intersection(isWorld[config.codelist], config.values).length)) filtertext = "";
                if (Boolean( _.intersection(isRegion[config.codelist], config.values).length)) {
                    var thecode = _.intersection(isRegion[config.codelist], config.values);
                    var subreg = [];
                    /*
                    console.log("region: ",_.difference( config.values, _.intersection(isRegion[config.codelist], config.values) ));
                    console.log("intersection: ",  _.intersection(isRegion[config.codelist], config.values));
                    console.log("total: ", config.values );
                    */
                    // We read the region and put every subregion
                    _.each( thecode, function( element ) {
                        subreg = subreg.concat(fromRegion[config.codelist][element]);
                    });
                    // convert the region to isocode
                    _.each( subreg, function( item ) {
                        isovalues = isovalues.concat(fromSubRegion[config.codelist][item]);
                    });
                    // profit!
                    filtertext = "iso3_country_code="+isovalues;
                    /* Good Old Ways
                    filtertext += codes[config.codelist]+"region="+_.intersection(isRegion[config.codelist], config.values);
                    if (Boolean(_.difference( config.values, _.intersection(isRegion[config.codelist], config.values) ).length))
                        filtertext += "&"+codes[config.codelist]+"subregion="+_.difference( config.values, _.intersection(isRegion[config.codelist], config.values) );
                    */
                }
                if (Boolean(_.difference( config.values, _.intersection(isRegion[config.codelist], config.values) ).length)) {
                    // We're in the sub region
                    var thecode = _.difference( config.values, _.intersection(isRegion[config.codelist], config.values) );
                    _.each( thecode, function( item ) {
                        isovalues = isovalues.concat(fromSubRegion[config.codelist][item]);
                    });
                    filtertext = "iso3_country_code="+isovalues;
                }
            }
        }

        if (year != null) {
            filtertext = filtertext + "&year="+year[0];
        }

        //console.log( "filtertext:", filtertext );
        //console.log( "vd_code: ", vd_code);

        $('[data-dashboardcontainer="dd-dashboard-container"]').hide();
        $('div.tableauPlaceholder').remove();
        $('[data-section="showDashboard"]').after(DashboardTemplate({
            filterparams : filtertext,
            vd_code : vd_code
        }));
        this._toggleLoading();
        $('html, body').animate({scrollTop: $('[data-section = "showDashboard"]').offset().top}, 400,'linear');

    };

    //Download  Tab Button 3
    IndicatorCommon.prototype._DD_onClick_button3 = function (param) {

        var values = this.filter.getValues(),
            expand_param = $.extend({},param, this.indicatorProperties);

        var newDashboardConfig = this.indicatorProcesses.onClickButton3(values, this.dashboard_config, expand_param);
        if((newDashboardConfig!= null)&&(typeof newDashboardConfig != 'undefined')&&(!$.isEmptyObject(newDashboardConfig)))
        {
            this._downloadTableData(newDashboardConfig.downloadProcessRawData);
        }
    }

    IndicatorCommon.prototype._getISO = function () {
        var iso = [],
            output = [];

        output = this.icutils.callGoogle('iso3_country_codes_'+$("html").attr("lang").toLowerCase()+'.json',false).hits;

        _.each( output, function( element ) {
            iso[element.value] = element.label;
        });

        return iso;

    };

    IndicatorCommon.prototype._getCodelist = function (coding) {
        var codes = [],
            geo = coding.toUpperCase() + "_R",
            output = [];

        output = this.icutils.callElastic(CL[geo],true).hits;

        _.each( output, function( element ) {
            codes[element.value] = element.label;
        });

        return codes;
    };

    IndicatorCommon.prototype._convert2TableData = function (input, structure, lab) {

        var self = this,
            str_lab = {},
            extendable = {},
            stakeholder = "",
            output = [],
            region_code = 0,
            geocodes = [];

        //console.log(input, structure, lab)
        
        if (lab['geocode'] != "iso3") geocodes = self._getCodelist(lab['geocode']);

        $.extend(geocodes, self.isos);

        _.each(structure, function(str_obj){
            if (lab[str_obj] !== undefined) extendable[str_obj] = lab[str_obj];
        });

        _.each(input.cellset, function(object, index) {
            if (index == 0) str_lab = object;
            if (object[0].type != "ROW_HEADER_HEADER") {
                _.each(object, function(item, idx){
                   if (item.type == "ROW_HEADER") {
                       region_code = Number(item.value);
                       if (item.properties.dimension == "Organization") stakeholder = " - " + item.value;
                   }
                   if (item.type == "DATA_CELL") {
                       var obj = $.extend({}, extendable);
                       //obj['element'] = labels[self.lang.toLowerCase()][str_lab[idx].value] + stakeholder + " *** ";
                       obj['indicator_label'] = labels[self.lang.toLowerCase()][str_lab[idx].value] + stakeholder;
                       obj['wiews_region'] = geocodes[object[0].value]; //(lab['geocode'] != "iso3") ?  geocodes[region_code] : self.isos[object[0].value];
                       obj['value'] = item.value;
                       output.push(obj);
                   }
                });
            }

        });

        return output;
    };

    IndicatorCommon.prototype._parseGEO = function (geovalues, isList) {
        
        //console.log(geovalues);

        var self = this,
            geo_array = {
                "world" : [],
                "subregion" : [],
                "region" : []
            },
            list = (isList == "2") ? ".children" : "" ;

        switch(geovalues.codelist) {
            // Country
            case "iso3":
                list = "";
                _.each(geovalues.values, function(elem){ geo_array['region'].push("[Region.iso3_code].["+elem+"]"+list) });
                break;
            // Region
            case "fao":
                _.each(geovalues.values, function(elem){
                    // Check it if is a subregion or not
                    var testing = _.filter(self.codelists['FAO_R'],function(code){ return code.value == elem });
                    var subregion = (testing[0].index > 1) ? "sub" : "";
                    var region = (testing[0].index == 0) ? "world" : "region";
                    if(isList==2) {
                        //List of counrties
                        geo_array[subregion+region].push("DESCENDANTS([Region.Region_FAO_codes].["+subregion+region+"_fao_code].["+elem+"]" +", , LEAVES)")
                    } else {
                        //Total
                        geo_array[subregion+region].push("[Region.Region_FAO_codes].["+subregion+region+"_fao_code].["+elem+"]")
                    }
                });
                break;
            case "m49":
                _.each(geovalues.values, function(elem){
                    // Check it if is a subregion or not
                    var testing = _.filter(self.codelists['M49'],function(code){ return code.value == elem });
                    var subregion = (testing[0].index > 1) ? "sub" : "";
                    var region = (testing[0].index == 0) ? "world" : "region";

                    if(isList==2){
                        //List of counrties
                        geo_array[subregion+region].push("DESCENDANTS([Region.Region_M49_codes].["+subregion+region+"_m49_code].["+elem+"]" +", , LEAVES)")
                    }
                    else {
                        //Total
                        geo_array[subregion+region].push("[Region.Region_M49_codes].["+subregion+region+"_m49_code].["+elem+"]")
                    }
                });
                break;
            case "sdg":
                _.each(geovalues.values, function(elem){
                    var testing = _.filter(self.codelists['SDG'],function(code){ return code.value == elem });
                    var subregion = (testing[0].index > 1) ? "sub" : "";
                    var region = (testing[0].index == 0) ? "world" : "region";
                    geo_array[subregion+region].push("[Region.Region_SDG_codes].["+region+"_sdg_code].["+elem+"]"+list)
                });
                break;
            case "mdg":
                _.each(geovalues.values, function(elem){
                    var testing = _.filter(self.codelists['MDG'],function(code){ return code.value == elem });
                    var subregion = (testing[0].index > 1) ? "sub" : "";
                    var region = (testing[0].index == 0) ? "world" : "region";
                    geo_array[subregion+region].push("[Region.Region_MDG_codes].["+region+"_mdg_code].["+elem+"]"+list)
                });
                break;
            // Special Groups
            case "itpgrfa":
                _.each(geovalues.values, function(elem){
                    var testing = _.filter(self.codelists['ITPGRFA_R'],function(code){ return code.value == elem });
                    var subregion = (testing[0].index > 1) ? "sub" : "";
                    var region = (testing[0].index == 0) ? "world" : "region";
                    if(isList==2){
                        //List of counrties
                        geo_array[subregion+region].push("DESCENDANTS([Region.Special_ITPGRFA_codes].["+subregion+region+"_itpgrfa_code].["+elem+"]" +", , LEAVES)")
                    }
                    else {
                        //Total
                        geo_array[subregion+region].push("[Region.Special_ITPGRFA_codes].["+subregion+region+"_itpgrfa_code].["+elem+"]")
                    }
                });
                break;
            case "cgrfa":
                _.each(geovalues.values, function(elem){
                    var testing = _.filter(self.codelists['CGRFA_R'],function(code){ return code.value == elem });
                    var subregion = (testing[0].index > 1) ? "sub" : "";
                    var region = (testing[0].index == 0) ? "world" : "region";
                    if(isList==2){
                        //List of counrties
                        geo_array[subregion+region].push("DESCENDANTS([Region.Special_CGRFA_codes].["+subregion+region+"_cgrfa_code].["+elem+"]" +", , LEAVES)")
                    }
                    else {
                        //Total
                        geo_array[subregion+region].push("[Region.Special_CGRFA_codes].["+subregion+region+"_cgrfa_code].["+elem+"]")
                    }
                });
                break;

        }
        return geo_array;
    };



    //Creation of data for the Bootstrap Table of the Download Tab
    IndicatorCommon.prototype._DD_getTableData = function (param, newDashboardConfig, filterValues) {


        var self = this,
            mdx_query = "",
            selection = "0",
            select_array = [],
            index,
            stakeholder = "",
            dsd = {},
            lab = {},
            geo_array = [],
            table_tobootstrap = [],
            table_output;

        param.tableColumns = newDashboardConfig.tableColumns;
        dsd = param.tableColumns;

        //console.log(filterValues);
        
        select_array = filterValues.values.dd_filter_item_8;
        index = select_array.indexOf(this.indicatorProperties.indicator_id);
        if (index > -1) select_array.splice(index, 1);
        if (select_array.length == 1) { selection = select_array[0] } else { selection = this.indicatorProperties.indicator_id.toString() }

        // Building the Geo values
        geo_array = this._parseGEO(filterValues.values.GEO, filterValues.values.GEO.listType);

        //Doing the multiple search
        $.each(geo_array, function(elem,index) {
            if(index.toString().length){

                // First, we fetch the NFP Rating

                // Building the labels
                lab['indicator'] = DM[self.indicatorProperties.indicator_id].element_label[self.indicatorProperties.indicator_id];
                lab['iteration'] = filterValues.labels.dd_filter_item_9[Object.keys(filterValues.labels.dd_filter_item_9)[0]];
                lab['domain'] = DM[self.indicatorProperties.indicator_id].domain_label;
                lab['indicator_label'] = DM[0].domain_label;
                lab['geocode'] = filterValues.values.GEO.codelist;

                mdx_query = JSON.stringify($.extend(DM[0].cube, DM[0].query["0"]));
                mdx_query = mdx_query.replace("{{**REGION_PLACEHOLDER**}}", index.toString());

                $.ajax({
                    async: false,
                    dataType: 'json',
                    method: 'POST',
                    contentType: "application/json; charset=utf-8",
                    accept: "application/json, text/javascript, */*; q=0.01",
                    url: "http://35.198.138.71:8080/pentaho/plugin/saiku/api/anonymousUser/query/execute",
                    data: mdx_query,
                    success: function(res) {
                        table_output = self._convert2TableData(res, dsd, lab);
                        //console.log('table output: ', table_output);
                    },
                    error : function(res) {
                        console.log("error", res);
                        return;
                    }
                });

                // Then we fetch the current indicator


                // Building the labels
                lab['indicator'] = DM[self.indicatorProperties.indicator_id].element_label[selection];
                lab['iteration'] = filterValues.labels.dd_filter_item_9[Object.keys(filterValues.labels.dd_filter_item_9)[0]];
                lab['domain'] = DM[self.indicatorProperties.indicator_id].domain_label;
                lab['indicator_label'] = DM[self.indicatorProperties.indicator_id].indicator_label;

                if (filterValues.values.dd_filter_item_10 != undefined)
                    if (filterValues.values.dd_filter_item_10[0] == "stk") stakeholder = "_stk" ; //selection = filterValues.values.dd_filter_item_10[0];

                mdx_query = JSON.stringify($.extend(DM[self.indicatorProperties.indicator_id].cube, DM[self.indicatorProperties.indicator_id].query[selection+stakeholder]));
                mdx_query = mdx_query.replace("{{**REGION_PLACEHOLDER**}}", index.toString());
                mdx_query = mdx_query.replace("{{**TIME_PLACEHOLDER**}}", "[Year.year].["+filterValues.values.dd_filter_item_9+"]");

                 $.ajax({
                    async: false,
                    dataType: 'json',
                    method: 'POST',
                    contentType: "application/json; charset=utf-8",
                    accept: "application/json, text/javascript, */*; q=0.01",
                    url: "http://35.198.138.71:8080/pentaho/plugin/saiku/api/anonymousUser/query/execute",
                    data: mdx_query,
                    success: function(res) {
                        table_tobootstrap = table_tobootstrap.concat(table_output,self._convert2TableData(res, dsd, lab));
                        //console.log(table_output);
                    },
                    error : function(res) {
                        console.log("error", res);
                        return;
                    }
                });

            }
        });




        // Finally, we generate the table

        self._tableRender(table_tobootstrap, param);

        return;


        this.bridge.getProcessedResource({contentType: "application/json", body : newDashboardConfig.tableProcess, params : {language : param.lang}}).then(
            _.bind(function (result) {

                var data = Array.isArray(result.data) ? result.data : [],
                    dsdColumns = Array.isArray(result.metadata.dsd.columns) ? result.metadata.dsd.columns : [],
                    source = [];

                var columnsMap = this._columnMapCreation(param, dsdColumns);
                var tableData = this.indicatorProcesses.tableDataCreation(param, columnsMap, data, filterValues);
                this._tableRender(tableData, param);

            }, this),
            function (r) {
                log.error(r);
            }
        )
    }

    //Mapping between the Dsd Columns and the columns of the tables defined in the configuration
    IndicatorCommon.prototype._columnMapCreation = function (param, dsdColumns) {

        var lang = param.lang.toUpperCase();
        var tableColumns = param.tableColumns;
        var columnsMap = {};
        _.each(tableColumns, function (tableCol) {

            for(var dsdColImdex = 0; dsdColImdex< dsdColumns.length; dsdColImdex++) {
                var dsdColumnId = dsdColumns[dsdColImdex].id;
                if(tableCol +'_'+ lang == dsdColumnId){
                    columnsMap[tableCol+'_text'] = dsdColImdex;
                }

                if(tableCol == dsdColumnId){
                    columnsMap[tableCol+'_value'] = dsdColImdex;
                }
            };

        });
        return columnsMap;
    }

    //Render of the bootstrap table
    IndicatorCommon.prototype._tableRender = function (table, param) {
        this._toggleLoading();
        var self = this;
        var tableElem = param.indicatorDashboardSection.find('[data-table = "dd-dashboard-table"]');
        var downElem = $('[data-role="organizations_exportbutton"]');
        $('div.tableauPlaceholder').remove();
        param.indicatorDashboardSection.show();

        $('[data-table = "dd-dashboard-table"]').bootstrapTable('destroy');

        $('[data-table = "dd-dashboard-table"]').bootstrapTable({
            //data : table,
            pagination: true,
            pageSize: 25,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            formatSearch: function() {
                return labels[self.lang.toLowerCase()]['bootstraptable_search_filter']
            },
            paginationVAlign: "top",
            exportDataType: "CSV",
            sortable: true
        });


        $('[data-table = "dd-dashboard-table"]').on('post-body.bs.table', function (event, data) {
            //console.log('post-body.bs.table', event, data);
            $('.dropdown-toggle').dropdown();
            $('[data-dashboardContainer = "dd-dashboard-container"]').show();
        });

        $('[data-table = "dd-dashboard-table"]').bootstrapTable('load', {data: table});

        if ( table.length == 0 ) { downElem.attr('disabled','disabled'); } else { downElem.removeAttr('disabled'); }

        //Scroll to the table
        $('html, body').animate({scrollTop: $('[data-table = "dd-dashboard-table"]').offset().top}, 400,'linear');

        $('input[name=thousandsep]').on('click', function () {
            var opt = $('input[name=thousandsep]:checked').val();
            _.each(table, function(item){
                console.log(item.value, ' >>> ', self.icutils.valuesFormatter(opt, item.value));
            });
            $('[data-table = "dd-dashboard-table"]').bootstrapTable('load', {data: table});
        });

        $('[data-role=organizations_exportbutton]').off('click');
        $('[data-role=organizations_exportbutton]').on('click', function() {

            var json2csvCallback = function (err, csv) {
                if (err) throw err;
                var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
                FileSaver.saveAs(blob, "tableExport.csv");
                //$('div#exsitu-search-ux-loader').hide();
                //$('[data-page=exsitu-search]').css('opacity','1');
            };
            converter.json2csv(table, json2csvCallback, {
                delimiter : {
                    wrap  : '"',
                    field : ',',
                    array : ';',
                    eol   : '\n'
                },
                prependHeader    : true,
                sortHeader       : false
                //keys             : []
            });

            //$('[data-table = "dd-dashboard-table"]').tableExport({type:'csv'});
        });


    }

    // IndicatorCommon.prototype.onClick_button2 = function (param) {
    //     var values = this.filter.getValues();
    //     var newDashboardConfig = this.indicatorProcesses.onClickButton(this.dashboard_config, values, param);
    // }

    //Filter Selection Action
    IndicatorCommon.prototype.onSelectFilter = function (hostParam, filterResponse) {


        var commonParam = {bridge : this.bridge};
        var res = this.indicatorProcesses.onSelectFilter(hostParam, filterResponse, commonParam);
    }

    //Export in the elements of the dashboard of the Visualize Tab
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

    IndicatorCommon.prototype._downloadTableData = function (newDashboardConfigProcess) {

        var self = this;

        this.report.on('export.start', function(){
            // Download starting
            self.filter_btnMsg1Obj.html('<div class="alert alert-info" role="alert"><center>'+labels[self.lang]['download_in_progress']+'</center></div>');
            self.filter_btnMsg1Obj.show();
        });

        this.report.on('export.error', function() {
            self.filter_btnMsg1Obj.html('<div class="alert alert-danger" role="alert"><center>'+labels[self.lang]['download_toomuch']+'</center></div>');
            self.filter_btnMsg1Obj.show();
        });

        var flow_model = {
            "outConfig": {
                "plugin": "wiewsOutputCSV"
            },
            options : {
                params : {
                    maxSize : 200000,
                    language: this.lang.toUpperCase()
                },
            },
            "flow": newDashboardConfigProcess
        };

        this.report.export({
            format: "flow",
            config: flow_model
        });

        this.report.on('export.success', function(){
            // Download successful
            setTimeout(function(){
                self.filter_btnMsg1Obj.hide();
            }, 1000);
        });
    };

    IndicatorCommon.prototype.disable_element = function () {

        this.indicatorProcesses.disable_element();
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