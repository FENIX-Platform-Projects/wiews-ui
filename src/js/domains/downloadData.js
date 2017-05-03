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
    "../../nls/labels",
    "jstree",
    "bootstrap",
    "bootstrap-table"
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

    DownloadData.prototype._attach = function () {

        $(this.el).html(filterTemplate(labels[this.lang]));
        var indicatorFilterSection = this.el.find('[data-section = "'+this.indicatorProperties.filter_category+'"]');
        //dashboardSection
        $(this.el).append(dashboardTemplate(labels[this.lang]));
        var indicatorDashboardSection = this.el.find('[data-dashboardSection = "'+this.indicatorProperties.dashboard_category+'"]');
        var showDashboardSection = this.el.find('[data-section = "'+s.showDashboardSection+'"]');
        $(this.el).append(indicatorFilterSection);
        $(indicatorFilterSection).append(showDashboardSection);
        $(indicatorFilterSection).append(indicatorDashboardSection);
        indicatorDashboardSection.hide();
    };

    DownloadData.prototype._initVariables = function () {

        this.$el = $(s.EL);
        this.indicatorConfig = this._getIndicatorConfig();
        this.config = this.indicatorConfig[mainTabName];

        this.channels = {};
        //this.models = {};
    };

    DownloadData.prototype.render = function () {

        // if(this.dashboard){
        //     this._disposeDashboard();
        // }

        var dashboardConf = this._getElemConfig(s.dashboard.dashboard_config_item),
            filterConfig = this._getElemConfig(s.filter.filter_config_item);

        dashboardConf.environment = this.environment;

        console.log(this.indicatorProperties)
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

        filterConfig = indicatorCommon.indicatorFilterConfigInit(filterConfig);

        this._renderFilter(filterConfig);

        //this._renderDashboard(dashboardConf);

        //this._loadProgressBar(dashboardConf);
    }

    // Events
    DownloadData.prototype._bindEventListeners = function () {
    };

    DownloadData.prototype._disposeDashboard = function () {
        if (this.dashboard && $.isFunction(this.dashboard.dispose)) {
            this.dashboard.dispose();
        }
    };

    // DownloadData.prototype._loadProgressBar = function (dashboardConf) {
    //
    //     var self = this;
    //
    //     this.dashboard.on(s.events.dashboardComponent.READY, function () {
    //         self._renderIndicator(dashboardConf);
    //     });
    //
    //     this.dashboard.on(s.events.dashboardComponent.ITEM_READY, function (item) {
    //         if((typeof item != 'undefined')&&(item != null)&&(typeof item.model != 'undefined')&&(item.model != null)&&(typeof item.model.metadata != 'undefined')&&(item.model.metadata != null)&&(typeof item.model.data != 'undefined')&&(item.model.data != null)){
    //             var itemId = item.id;
    //             self.models[itemId] = {metadata : item.model.metadata, data : item.model.data};
    //         }
    //
    //     });
    // };

    DownloadData.prototype._getElemConfig = function (elem) {

        var config;

        if((this.config)&&(elem)&&(this.config[elem]))
        {
            config = this.config[elem];
        }

        return config;
    }

    DownloadData.prototype._renderFilter = function (filterConfig) {

        var self = this;
        console.log(filterConfig)
        this.filter = new Filter({
            el: s.filter.filter_container,
            selectors: filterConfig,
            environment: this.environment,
            cache : this.cache,

            //groups: filterConfig,
            common: {
                template: {
                    hideSwitch: true,
                    hideRemoveButton: true
                }
            }
        });

        this.filter.on(s.events.filterComponent.READY, _.bind(self._renderIndicator, self)
            //self._renderIndicator();
                );

        $("#dd_filter_item_tab_12").attr('disabled','disabled');
    }

    // DownloadData.prototype._renderDashboard = function (dashboardConfig) {
    //     // Build new dashboard
    //     this.dashboard = new Dashboard(
    //         dashboardConfig
    //     );
    // };

    DownloadData.prototype._getIndicatorConfig = function () {
        return require(this._getIndicatorConfigPath());
    };

    DownloadData.prototype._getIndicatorConfigPath = function () {

        return s.indicator_config_path + this.indicatorProperties.indicator_id+'.js';
    };

    DownloadData.prototype._renderIndicator = function (/*dashboardConfig*/) {
        // Calling the indicator actions file

        indicatorCommon.render({
            filter : this.filter
            //dashboard_config : dashboardConfig,
            //dashboard : this.dashboard,
            //models : this.models
        });

        //indicatorCommon.on(s.events.dashboard.DASHBOARD_CONFIG, _.bind(this._dashboardRecreate, this))

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