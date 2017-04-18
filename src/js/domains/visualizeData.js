define([
    "jquery",
    "loglevel",
    "underscore",
    "../../config/config",
    "../../config/domains/config",
    "../../html/domains/visualizeDataFilterTemplate.hbs",
    "../../html/domains/visualizeDataDashboardTemplate.hbs",
    "fenix-ui-dashboard",
    "fenix-ui-filter",
    "fenix-ui-filter-utils",
    "./renders/IndicatorCommon",
    "../../nls/labels",
    '../common/progressBar',
    "jstree",
    "bootstrap",
    "bootstrap-table"
], function ($, log, _, C, PAGC, filterTemplate, dashboardTemplate, Dashboard, Filter, FxUtils, ICommon, labels, ProgressBar) {

    "use strict";

    var mainTabName = "visualizeData";

    var indicatorCommon;

    var s = {
        indicator_config_path : './renders/indicatorConfig',

        bar: {
            PROGRESS_BAR_CONTAINER: '#vd-progress-bar-holder',
            PROGRESS_BAR_DATA_VARIABLE: 'progress-bar'
        },

        dashboard: {
            dashboard_config_item : 'dashboard',
            dashboard_container : '#vd-dashboard-container'
        },

        filter: {
            filter_config_item : 'filter',
            filter_container : '#vd-filter-container'
        },

        showDashboardSection : 'showDashboard',

        events: {
            dashboardComponent :{
                READY : 'ready',
                ITEM_READY : 'ready.item'
            },
            dashboard :{
                DASHBOARD_CONFIG : "new_dashoboard_config_ready"
            }
        }
    };

    function VisualizeData(opts){

        $.extend(true, this, opts);

        this._validateConfig();

        this._attach();

        this._initVariables();

    };

    VisualizeData.prototype._validateConfig = function () {

    };

    VisualizeData.prototype._attach = function () {

        $(this.el).html(filterTemplate(labels[this.lang]));
        var indicatorFilterSection = this.el.find('[data-section = "'+this.indicatorProperties.filter_category+'"]');
        //dashboardSection
        $(this.el).append(dashboardTemplate(labels[this.lang]));
        var indicatorDashboardSection = this.el.find('[data-dashboardSection = "'+this.indicatorProperties.dashboard_category+'"]');
        var progressBar = this.el.find('[data-bar = "'+s.bar.PROGRESS_BAR_DATA_VARIABLE+'"]');//data-bar="progress-bar"
        var showDashboardSection = this.el.find('[data-section = "'+s.showDashboardSection+'"]');
        $(this.el).html(progressBar);
        $(this.el).append(indicatorFilterSection);
        $(indicatorFilterSection).append(showDashboardSection);
        $(indicatorFilterSection).append(indicatorDashboardSection);

    };

    VisualizeData.prototype._initVariables = function () {

        this.$el = $(s.EL);
        this.indicatorConfig = this._getIndicatorConfig();
        this.config = this.indicatorConfig[mainTabName];

        this.channels = {};
        this.models = {};

        this.progressBar = new ProgressBar({
            container: s.bar.PROGRESS_BAR_CONTAINER,
            lang: this.lang
        });
    };

    VisualizeData.prototype.render = function () {

        if(this.dashboard){
            this._disposeDashboard();
        }

        var dashboardConf = this._getElemConfig(s.dashboard.dashboard_config_item),
            filterConfig = this._getElemConfig(s.filter.filter_config_item);

        dashboardConf.environment = this.environment;

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

        this._renderDashboard(dashboardConf);

        this._loadProgressBar(dashboardConf);
    }

    // Events
    VisualizeData.prototype._bindEventListeners = function () {
    };

    VisualizeData.prototype._disposeDashboard = function () {
        if (this.dashboard && $.isFunction(this.dashboard.dispose)) {
            this.dashboard.dispose();
        }
    };

    VisualizeData.prototype._loadProgressBar = function (dashboardConf) {
        this.progressBar.reset();
        this.progressBar.show();

        var self = this, increment = 0, percent = Math.round(100 / dashboardConf.items.length);

        this.dashboard.on(s.events.dashboardComponent.READY, function () {
            self.progressBar.finish();
            self._renderIndicator(dashboardConf);
        });

        this.dashboard.on(s.events.dashboardComponent.ITEM_READY, function (item) {
            if((typeof item != 'undefined')&&(item != null)&&(typeof item.model != 'undefined')&&(item.model != null)&&(typeof item.model.metadata != 'undefined')&&(item.model.metadata != null)&&(typeof item.model.data != 'undefined')&&(item.model.data != null)){
                var itemId = item.id;
                self.models[itemId] = {metadata : item.model.metadata, data : item.model.data};
            }

            increment = increment + percent;
            self.progressBar.update(increment);
        });
    };

    VisualizeData.prototype._getElemConfig = function (elem) {

        var config;

        if((this.config)&&(elem)&&(this.config[elem]))
        {
            config = this.config[elem];
        }

        return config;
    }

    VisualizeData.prototype._renderFilter = function (filterConfig) {

        this.filter = new Filter({
            el: s.filter.filter_container,
            selectors: filterConfig,
            //groups: filterConfig,
            common: {
                template: {
                    hideSwitch: true,
                    hideRemoveButton: true
                }
            }
        });
    }

    VisualizeData.prototype._renderDashboard = function (dashboardConfig) {
        // Build new dashboard
        this.dashboard = new Dashboard(
            dashboardConfig
        );
    };

    VisualizeData.prototype._getIndicatorConfig = function () {
        return require(this._getIndicatorConfigPath());
    };

    VisualizeData.prototype._getIndicatorConfigPath = function () {

        return s.indicator_config_path + this.indicatorProperties.indicator_id+'.js';
    };

    VisualizeData.prototype._renderIndicator = function (dashboardConfig) {
        // Calling the indicator actions file

        indicatorCommon.render({
            filter : this.filter,
            dashboard_config : dashboardConfig,
            dashboard : this.dashboard,
            models : this.models
        });

        indicatorCommon.on(s.events.dashboard.DASHBOARD_CONFIG, _.bind(this._dashboardRecreate, this))

    };

    VisualizeData.prototype._dashboardRecreate = function (param) {

        if(this.dashboard){
            this._disposeDashboard();
        }

        this._renderDashboard(param.dashboardConfig);
    }

    VisualizeData.prototype._trigger = function (channel) {

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

    VisualizeData.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    return VisualizeData;

});