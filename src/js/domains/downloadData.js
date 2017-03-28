define([
    "jquery",
    "loglevel",
    "underscore",
    "../../config/config",
    "../../config/domains/config",
    "../../config/domains/indicatorsConfig",
    "../../html/domains/downloadDataTemplate.hbs",
    "fenix-ui-dashboard",
    "fenix-ui-filter",
    "fenix-ui-filter-utils",
    "../../lib/utils",
    "../../nls/labels",
    "fenix-ui-bridge",
    "highcharts",
    '../common/progressBar',
    "jstree"
], function ($, log, _, C, PAGC, INDICATORSC, template, Dashboard, Filter, FxUtils, Utils, labels, Bridge, Highcharts, ProgressBar) {

    "use strict";
    var Clang = C.lang.toLowerCase();

    var dashboardName = "downloadData";

    var s = {
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

        events: {
            dashboardComponent :{
                READY : 'ready',
                ITEM_READY : 'ready.item'
            },
            dashboard :{
                READY : 'dashboard.ready'
            }
        }
    };

    function DownloadData(opts){

        require('highcharts-no-data-to-display')(Highcharts);

        $.extend(true, this, opts);

        this._validateConfig();

        this._attach();

        this._initVariables();

    };

    DownloadData.prototype._validateConfig = function () {

        if (!C.lang) {
            alert("Please specify a valid LANGUAGE in config/config.js");
        }
    };

    DownloadData.prototype._attach = function () {

        $(this.el).html(template(labels[Clang]));
        var indicatorSection = this.el.find('[data-section = "'+this.indicator+'"]');
        var progressBar = this.el.find('[data-bar = "'+s.bar.PROGRESS_BAR_DATA_VARIABLE+'"]');//data-bar="progress-bar"
        $(this.el).html(progressBar);
        $(this.el).append(indicatorSection);
    };

    DownloadData.prototype._initVariables = function () {

        this.$el = $(s.EL);

        this.lang = Clang;
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;
        this.indicatorConfig = INDICATORSC[this.indicator];
        this.config = this.indicatorConfig[dashboardName];

        this.channels = {};

        this.progressBar = new ProgressBar({
            container: s.bar.PROGRESS_BAR_CONTAINER,
            lang: this.lang
        });
    };

    DownloadData.prototype.render = function () {

        if(this.dashboard){
            this._disposeDashboard();
        }

        var dashboardConf = this._getElemConfig(s.dashboard.dashboard_config_item),
            filterConfig = this._getElemConfig(s.filter.filter_config_item);

        this._renderFilter(filterConfig);

        this._renderDashboard(dashboardConf);

        this._loadProgressBar(dashboardConf);
    }

    // Events
    DownloadData.prototype._bindEventListeners = function () {

    };

    DownloadData.prototype._disposeDashboard = function () {
        if (this.dashboard && $.isFunction(this.dashboard.dispose)) {
            this.dashboard.dispose();
        }
    };

    // DownloadData.prototype._loadProgressBar = function () {
    //     this.progressBar.reset();
    //     this.progressBar.show();
    //
    //     var self = this, increment = 0, percent = Math.round(100 / this.config.items.length);
    //
    //     // $("#chart_1").on('dashboard.ready', function () {
    //     //     console.log("RRRRRR")
    //     // });
    //     // $("#chart_1").on('dashboard.ready', _.bind(this._onMenuItemClick, this));
    //     this.dashboard.on(s.events.dashboardComponent.READY, function () {
    //         console.log("dashboardComponent.READY")
    //         // self._trigger(s.events.dashboard.READY);
    //         //$("#chart_1").trigger('dashboard.ready')
    //
    //         // self.dashboard._trigger()
    //         // self._trigger('dashboard.ready');
    //         self.progressBar.finish();
    //     });
    //
    //     this.dashboard.on(s.events.dashboardComponent.ITEM_READY, function (item) {
    //         increment = increment + percent;
    //         self.progressBar.update(increment);
    //     });
    // };

    DownloadData.prototype._loadProgressBar = function (dashboardConf) {
        this.progressBar.reset();
        this.progressBar.show();

        var self = this, increment = 0, percent = Math.round(100 / dashboardConf.items.length);

        this.dashboard.on(s.events.dashboardComponent.READY, function () {
            // self._trigger('dashboard.ready');
            self.progressBar.finish();
        });

        this.dashboard.on(s.events.dashboardComponent.ITEM_READY, function (item) {
            increment = increment + percent;
            self.progressBar.update(increment);
        });
    };

    DownloadData.prototype._getElemConfig = function (elem) {

        var config;

        if((this.config)&&(elem)&&(this.config[elem]))
        {
            config = this.config[elem];
        }

        return config;
    }

    DownloadData.prototype._renderFilter = function (filterConfig) {

        this.filter = new Filter({
            el: s.filter.filter_container,
            selectors: filterConfig,
            common: {
                template: {
                    hideSwitch: true,
                    hideRemoveButton: true
                }
            }
        });
    }

    DownloadData.prototype._renderDashboard = function (dashboardConfig) {
        // Build new dashboard
        this.dashboard = new Dashboard(
            dashboardConfig
        );
    };

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