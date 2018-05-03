define([
    "jquery",
    "loglevel",
    "underscore",
    "../../config/config",
    "../../config/domains/config",
    "../../html/domains/downloadDataFilterTemplate.hbs",
    "../../html/domains/downloadDataDashboardTemplate.hbs",
    "fenix-ui-dashboard",
    "fenix-ui-filter",
    "fenix-ui-filter-utils",
    "./renders/IndicatorCommon",
    "../../nls/labels"
], function ($, log, _, C, PAGC, filterTemplate, dashboardTemplate, Dashboard, Filter, FxUtils, ICommon, labels) {

    "use strict";

    var mainTabName = "downloadData";

    var indicatorCommon;

    var s = {
        indicator_config_path : './renders/indicatorConfig',

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
        this.indicatorConfig = this._getIndicatorConfig();
        this.config = this.indicatorConfig[mainTabName];
        
        this.indicatorConfig.downloadData.filter.items[12] = this._buildConfig(this.indicatorConfig.downloadData.filter.items[12]);

        this.channels = {};
        //this.models = {};
    };

    DownloadData.prototype._buildConfig = function (object) {

        var self = this,
            obj = object,
            ind = this.indicatorProperties.indicator_id,
            source = [];

        $.each(PAGC[ind].element_label, function (item) {
            var the_label = labels[self.lang.toLowerCase()]['cl_indicator_'+item];
            if (the_label != undefined) source.push({value: item, label: the_label});
        });

        //source: [{value: "2_1", label: labels[Clang]['cl_indicator_2_1']},{value: "2_2", label: labels[Clang]['cl_indicator_2_2']}],

        $.extend(obj,
            { source: source },
            { clCodes : [ind] },
            { default: [ind] }
        );

        console.log(obj)

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
            mainTabName : mainTabName
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

    DownloadData.prototype._getIndicatorConfig = function () {
        return require(this._getIndicatorConfigPath());
    };

    DownloadData.prototype._getIndicatorConfigPath = function () {

        return s.indicator_config_path +'.js';

        //return s.indicator_config_path + this.indicatorProperties.indicator_id+'.js';
    };

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