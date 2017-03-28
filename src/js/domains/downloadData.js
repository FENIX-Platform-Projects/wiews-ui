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
    "jstree",
    "bootstrap",
    "bootstrap-table"
], function ($, log, _, C, PAGC, INDICATORSC, template, Dashboard, Filter, FxUtils, Utils, labels, Bridge, Highcharts) {

    "use strict";
    var Clang = C.lang.toLowerCase();

    var dashboardName = "downloadData";

    var s = {
        PROGRESS_BAR_CONTAINER: '#dd-progress-bar-holder',

        dashboard: {
            dashboard_config_item : 'dashboard',
            dashboard_container : '#dd-dashboard-container'
        },

        filter: {
            filter_config_item : 'filter',
            filter_container : '#dd-filter-container'
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
        if (!C.lang) alert("Please specify a valid LANGUAGE in config/config.js");
    };

    DownloadData.prototype._attach = function () {
        $(this.el).html(template(labels[Clang]));
    };

    DownloadData.prototype._initVariables = function () {

        this.$el = $(s.EL);

        this.lang = Clang;
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;
        this.indicatorConfig = INDICATORSC[this.indicator];
        this.config = this.indicatorConfig[dashboardName];

        this.channels = {};

    };

    DownloadData.prototype.render = function () {

        if(this.dashboard) this._disposeDashboard();

        var dashboardConf = this._getElemConfig(s.dashboard.dashboard_config_item),
            filterConfig = this._getElemConfig(s.filter.filter_config_item);

        this._renderFilter(filterConfig);

        this._renderDashboard(dashboardConf);

    };

    // Events
    DownloadData.prototype._bindEventListeners = function () {

    };

    DownloadData.prototype._disposeDashboard = function () {
        if (this.dashboard && $.isFunction(this.dashboard.dispose)) this.dashboard.dispose();
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
    };

    DownloadData.prototype._renderDashboard = function (dashboardConfig) {
        // Build new dashboard
        /*
         this.dashboard = new Dashboard(
         dashboardConfig
         );
         */

        this.bootstraptable = $('#fake_data');

        this.bootstraptable.bootstrapTable({
            data: [
                {
                    "id": 0,
                    "name": "Item 0",
                    "price": "$0"
                },
                {
                    "id": 1,
                    "name": "Item 1",
                    "price": "$1"
                },
                {
                    "id": 2,
                    "name": "Item 2",
                    "price": "$2"
                },
                {
                    "id": 3,
                    "name": "Item 3",
                    "price": "$3"
                },
                {
                    "id": 4,
                    "name": "Item 4",
                    "price": "$4"
                },
                {
                    "id": 5,
                    "name": "Item 5",
                    "price": "$5"
                },
                {
                    "id": 6,
                    "name": "Item 6",
                    "price": "$6"
                },
                {
                    "id": 7,
                    "name": "Item 7",
                    "price": "$7"
                },
                {
                    "id": 8,
                    "name": "Item 8",
                    "price": "$8"
                },
                {
                    "id": 9,
                    "name": "Item 9",
                    "price": "$9"
                },
                {
                    "id": 10,
                    "name": "Item 10",
                    "price": "$10"
                },
                {
                    "id": 11,
                    "name": "Item 11",
                    "price": "$11"
                },
                {
                    "id": 12,
                    "name": "Item 12",
                    "price": "$12"
                },
                {
                    "id": 13,
                    "name": "Item 13",
                    "price": "$13"
                },
                {
                    "id": 14,
                    "name": "Item 14",
                    "price": "$14"
                },
                {
                    "id": 15,
                    "name": "Item 15",
                    "price": "$15"
                },
                {
                    "id": 16,
                    "name": "Item 16",
                    "price": "$16"
                },
                {
                    "id": 17,
                    "name": "Item 17",
                    "price": "$17"
                },
                {
                    "id": 18,
                    "name": "Item 18",
                    "price": "$18"
                },
                {
                    "id": 19,
                    "name": "Item 19",
                    "price": "$19"
                },
                {
                    "id": 20,
                    "name": "Item 20",
                    "price": "$20"
                }
            ],
            pagination: true,
            columns: [{
                field: 'id',
                title: 'Item ID'
            }, {
                field: 'name',
                title: 'Item Name'
            }, {
                field: 'price',
                title: 'Item Price'
            }]
        });

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