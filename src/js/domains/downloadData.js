define([
    "jquery",
    "loglevel",
    "underscore",
    "../../config/config",
    "../../config/domains/config",
    "../../html/domains/downloadDataTemplate.hbs",
    "fenix-ui-dashboard",
    "fenix-ui-filter",
    "fenix-ui-filter-utils",
    "../../lib/utils",
    "../../nls/labels",
    "../../config/domains/indicatorConfig",
    "fenix-ui-bridge",
    "highcharts",
    "jstree",
    "bootstrap",
    "bootstrap-table"
], function ($, log, _, C, PAGC, template, Dashboard, Filter, FxUtils, Utils, labels, INDICATORSC, Bridge, Highcharts) {

    "use strict";
    var Clang = C.lang.toLowerCase();

    var dashboardName = "downloadData";

    var s = {
        indicator_categories_path : '../../config/domains/categories',
        PROGRESS_BAR_CONTAINER: '#dd-progress-bar-holder',

        dashboard: {
            dashboard_config_item : '#dd_dashboard_item',
            dashboard_container : '#dd-dashboard-container'
        },

        button: {
            show_data : '#dd-showdata-button'
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
        // this.indicatorConfig = INDICATORSC[this.indicatorProperties.dashboard_category]; // BARBARA .position;
        this.indicatorConfig = INDICATORSC['1']; // BARBARA .position;
        //this.indicatorConfig = require(this._getIndicatorConfig());
        this.config = this.indicatorConfig[dashboardName];
        this.channels = {};
        this.dashboardConfig = this.config['dashboard'];
        this.dashboardConfig.environment = this.environment;

        console.log('conversion:' , this.conversion)

        console.log(this.dashboardConfig);

        this._bindEventListeners();

    };

    DownloadData.prototype.render = function () {

        if(this.dashboard) this._disposeDashboard();

        var filterConfig = this._getElemConfig(s.filter.filter_config_item);

        console.log(filterConfig);

        this._renderFilter(filterConfig);

    };

    // Events
    DownloadData.prototype._bindEventListeners = function () {

        var self = this;

        $(s.button.show_data).on('click', function () {
            self._renderDashboard(self.filter.getValues());
        });

    };

    DownloadData.prototype._disposeDashboard = function () {
        if (this.dashboard && $.isFunction(this.dashboard.dispose)) this.dashboard.dispose();
    };

    DownloadData.prototype._getElemConfig = function (elem) {

        var config;

        if((this.config)&&(elem)&&(this.config[elem])) config = this.config[elem];

        return config;
    }

    DownloadData.prototype._renderFilter = function (filterConfig) {

        console.log(filterConfig)
        this.filter = new Filter({
            el: s.filter.filter_container,
            selectors: filterConfig,
            common: {
                template: {
                    hideSwitch: true,
                    hideHeader: true,
                    hideRemoveButton: true
                }
            }
        });
    };

    DownloadData.prototype._renderDashboard = function (filters) {
        // Build new dashboard

        // // Plain
        // this.dashboardConfig.filter = this.filter.getValues();
        // Formatted
        this.dashboardConfig.filter = this._getFormattedValues();

        this.dashboard = new Dashboard( this.dashboardConfig );

        console.log(this.dashboardConfig);

        // Build fake data
        /*
        this.bootstraptable = $('#fake_data');

        this.bootstraptable.bootstrapTable({
            data: [
                {
                    "domain": "Crops",
                    "m49_country": "Ecuador",
                    "indicator": "Production",
                    "indicator_label": "Anise, badian, fennel, coriander",
                    "iteration": "2011",
                    "value": "11"
                },{
                    "domain": "Crops",
                    "m49_country": "Ecuador",
                    "indicator": "Production",
                    "indicator_label": "Anise, badian, fennel, coriander",
                    "iteration": "2011",
                    "value": "11"
                },{
                    "domain": "Crops",
                    "m49_country": "Ecuador",
                    "indicator": "Production",
                    "indicator_label": "Anise, badian, fennel, coriander",
                    "iteration": "2011",
                    "value": "11"
                },{
                    "domain": "Crops",
                    "m49_country": "Ecuador",
                    "indicator": "Production",
                    "indicator_label": "Anise, badian, fennel, coriander",
                    "iteration": "2011",
                    "value": "11"
                },{
                    "domain": "Crops",
                    "m49_country": "Ecuador",
                    "indicator": "Production",
                    "indicator_label": "Anise, badian, fennel, coriander",
                    "iteration": "2011",
                    "value": "11"
                },{
                    "domain": "Crops",
                    "m49_country": "Ecuador",
                    "indicator": "Production",
                    "indicator_label": "Anise, badian, fennel, coriander",
                    "iteration": "2011",
                    "value": "11"
                },{
                    "domain": "Crops",
                    "m49_country": "Ecuador",
                    "indicator": "Production",
                    "indicator_label": "Anise, badian, fennel, coriander",
                    "iteration": "2011",
                    "value": "11"
                },{
                    "domain": "Crops",
                    "m49_country": "Ecuador",
                    "indicator": "Production",
                    "indicator_label": "Anise, badian, fennel, coriander",
                    "iteration": "2011",
                    "value": "11"
                },{
                    "domain": "Crops",
                    "m49_country": "Ecuador",
                    "indicator": "Production",
                    "indicator_label": "Anise, badian, fennel, coriander",
                    "iteration": "2011",
                    "value": "11"
                },{
                    "domain": "Crops",
                    "m49_country": "Ecuador",
                    "indicator": "Production",
                    "indicator_label": "Anise, badian, fennel, coriander",
                    "iteration": "2011",
                    "value": "11"
                }
            ],
            pagination: true,
            columns: [
            {
                field: 'domain',
                title: 'Domain'
            }, {
                field: 'm49_country',
                title: 'Country'
            }, {
                field: 'indicator',
                title: 'Element'
            }, {
                field: 'indicator_label',
                title: 'Indicator and Rating'
            }, {
                field: 'iteration',
                title: 'Period'
            }, {
                field: 'value',
                title: 'Value'
            }]
        });
        */

    };

    DownloadData.prototype._getFormattedValues = function () {

        var object = this.filter.getValues(),
            self = this;

        //console.log('after', JSON.stringify(object));

        _.each(Object.keys(object), function (element) {
            _.each(Object.keys(object[element]), function (convertible){
                //console.log ('!! converting ' + convertible + ' > ' + self.conversion[convertible]);
                if (convertible != "" ) self._renameKey(object[element], convertible, self.conversion[convertible]);
            });
        });

        //console.log('before' , JSON.stringify(object));

        return object;

    };

    DownloadData.prototype._renameKey = function (item, oldName, newName) {
        if (item.hasOwnProperty(oldName)) {
            item[newName] = item[oldName];
            delete item[oldName];
        }
        return item;
    }

    DownloadData.prototype._trigger = function (channel) {

        if (!this.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    DownloadData.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) this.channels[channel] = [];
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    return DownloadData;

});