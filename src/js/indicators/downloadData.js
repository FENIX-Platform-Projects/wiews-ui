define([
    "jquery",
    "loglevel",
    "underscore",
    "../../config/config",
    "../../config/indicators/config",
    "../../html/indicators/downloadDataFilterTemplate.hbs",
    "../../html/indicators/downloadDataDashboardTemplate.hbs",
    "fenix-ui-dashboard",
    "fenix-ui-filter",
    "fenix-ui-filter-utils",
    "./indicatorCommon",
    "./indicatorCommonUtils",
    "./indicatorConfig",
    "../../nls/labels"
], function ($, log, _, C, PAGC, filterTemplate, dashboardTemplate, Dashboard, Filter, FxUtils, ICommon, ICUtils, ICConfig, labels) {

    "use strict";

    var mainTabName = "downloadData";
    var CloudLang = $("html").attr("lang").toLowerCase();

    var indicatorCommon;

    var s = {
        dashboard: {
            dashboard_config_item : 'dashboard',
            dashboard_container : '#dd-dashboard-container'
        },

        filter: {
            filter_config_item : 'filter',
            filter_container : '#dd-filter-container'
        },

        showDashboardSection : 'showDashboard',

        events: {
            dashboardComponent :{
                READY : 'ready',
                ITEM_READY : 'ready.item'
            },
            filterComponent :{
                READY : 'ready'
            },
            dashboard :{
                DASHBOARD_CONFIG : "new_dashoboard_config_ready"
            }
        }
    };

    function DownloadData(opts){

        $.extend(true, this, opts);

        this._validateConfig();

        this._attach();

        this._initVariables();

    };

    DownloadData.prototype._validateConfig = function () {

    };

    //Based on the indicator configuration properties the templates are rendered
    DownloadData.prototype._attach = function () {

        $(this.el).html(filterTemplate(labels[this.lang]));
        var indicatorFilterSection = this.el.find('[data-section = "'+this.indicatorProperties.dd_filter_category+'"]');
        //dashboardSection
        $(this.el).append(dashboardTemplate(labels[this.lang]));
        var indicatorDashboardSection = this.el.find('[data-dashboardSection = 1]');
        var showDashboardSection = this.el.find('[data-section = "'+s.showDashboardSection+'"]');
        $(this.el).html(indicatorFilterSection);
        $(indicatorFilterSection).append(showDashboardSection);
        $(indicatorFilterSection).append(indicatorDashboardSection);

        indicatorDashboardSection.hide();
    };

    DownloadData.prototype._initVariables = function () {

        this.$el = $(s.EL);
        this.indicatorConfig = ICConfig;
        this.config = this.indicatorConfig[mainTabName];
        this.icUtils = new ICUtils();
        this.iterations = this.icUtils.callGoogle('iterations_'+CloudLang+'.json',false,true).hits;

        this.indicatorConfig.downloadData.filter.items[12] = this._buildConfig(this.indicatorConfig.downloadData.filter.items[12], "element");
        this.indicatorConfig.downloadData.filter.items[13] = this._buildConfig(this.indicatorConfig.downloadData.filter.items[13], "time");

        this.channels = {};
        //this.models = {};
    };

    DownloadData.prototype._buildConfig = function (object, selection) {

        var self = this,
            obj = object,
            title = "",
            type = "tree",
            def = 1,
            ind = this.indicatorProperties.indicator_id,
            source = [];

        switch(selection) {
            case "element":
                // Element
                $.each(PAGC[ind].element_label, function (item) {
                    var the_label = labels[CloudLang.toLowerCase()]['cl_indicator_'+item];
                    if (the_label != undefined) source.push({value: item, label: the_label});
                });
                $.extend(obj,
                    { source: source },
                    { clCodes : [ind] },
                    { default: [ind] }
                );
            break;
            case "time":
                // Time
                if (PAGC[ind].time == "years") {
                    title = labels[self.lang.toLowerCase()]['filter_years'];
                    source.push({value: 2014, label: "2014"},/*{value: 2015, label: "2015"},*/{value: 2016, label: "2016"},{value: 2017, label: "2017"});
                    type = "radio";
                    def = [2017];
                } else {
                    title = labels[CloudLang.toLowerCase()]['filter_period'];
                    source = self.iterations;
                }
                $.extend(obj,
                    { source: source },
                    { title : title },
                    { type : type },
                    { default : [def] }
                );
                break;
        }


        return obj;
    };

    DownloadData.prototype.render = function () {

        var dashboardConf = this._getElemConfig(s.dashboard.dashboard_config_item),
            filterConfig = this._getElemConfig(s.filter.filter_config_item);

        dashboardConf.environment = this.environment;

        this.dashboardConfig = dashboardConf;

        indicatorCommon = new ICommon({
            el : this.el,
            indicatorProperties : this.indicatorProperties,
            lang : this.lang,
            environment : this.environment,
            cache : this.cache,
            mainTabName : mainTabName,
            codelists : this.indicatorConfig.downloadData.codelists
        });

        indicatorCommon.indicatorSectionInit(dashboardConf);

        //Setting the titles of the tab
        indicatorCommon.indicatorFilterTemplateUpdate(filterConfig);

        //filterHostConfig is the configuration of the filter used in the Wiews application
        //and ignored by the Fenix Filter
        var filterHostConfig = indicatorCommon.indicatorFilterHostConfigInit(filterConfig);
        this.filterHostConfig = filterHostConfig;

        filterConfig = indicatorCommon.indicatorFilterConfigInit(filterConfig);

        this._renderFilter(filterConfig);
    }

    // Events
    DownloadData.prototype._bindEventListeners = function () {
    };

    DownloadData.prototype._disposeDashboard = function () {
        if (this.dashboard && $.isFunction(this.dashboard.dispose)) {
            this.dashboard.dispose();
        }
    };

    DownloadData.prototype._getElemConfig = function (elem) {

        var config;

        if((this.config)&&(elem)&&(this.config[elem]))
        {
            config = this.config[elem];
        }

        return config;
    }

    //The filter is created just once by the configuration
    DownloadData.prototype._renderFilter = function (filterConfig) {

        var self = this;
        this.filter = new Filter({
            el: s.filter.filter_container,
            selectors: filterConfig,
            environment: this.environment,
            cache : this.cache,
            lang: C.lang,
            common: {
                template: {
                    hideSwitch: true,
                    hideRemoveButton: true
                }
            }
        });
        this.filter.on(s.events.filterComponent.READY, _.bind(self._renderIndicator, self));
        indicatorCommon.disable_element();
        // //OUTPUT FORMATTING OPTIONS DISABLED

    }

    //The istance for the specific indicator is created when the FILTER has been rendered
    DownloadData.prototype._renderIndicator = function (dashboardConfig) {
        // Calling the indicator actions file

        indicatorCommon.render({
            filter : this.filter,
            filter_host_config : this.filterHostConfig,
            dashboard_config : this.dashboardConfig
        });
    };

    DownloadData.prototype._dashboardRecreate = function (param) {

        if(this.dashboard){
            this._disposeDashboard();
        }

        this._renderDashboard(param.dashboardConfig);
    }

    DownloadData.prototype._trigger = function (channel) {

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

    DownloadData.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    return DownloadData;

});