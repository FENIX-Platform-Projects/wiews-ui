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
        this.indicatorConfig = INDICATORSC[this.indicator]; // BARBARA .position;

        this.config = this.indicatorConfig[dashboardName];
        this.channels = {};
        this.dashboardConfig = this.config['dashboard'];
        //this.dashboardConfig.environment = this.environment;

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

    DownloadData.prototype._renderDashboard = function (filters) {
        // Build new dashboard

        console.log(this.dashboardConfig);

        this.dashboardConfig.filter = this.filter.getValues();

        var adamconf = {
            "uid": "adam_cpf_undaf_priorities_table",
            "items": [
                {
                    "id": "dd_dashboard_item",
                    "type": "table",
                    "config": {
                        "groupedRow": false,
                        "formatter": "localstring",
                        "showRowHeaders": true,
                        "rows": [
                            "recipientcode",
                            "purposecode",
                            "undaf_stated_priority",
                            "cpf_stated_priority"
                        ],
                        "aggregations": [],
                        "inputFormat": "fenixtool",
                        "config": {
                            "pageSize": 150,
                            "autoSelectFirstRow": false,
                            "columns": [
                                {
                                    "id": "recipientcode",
                                    "fieldIndex": "0",
                                    "width": 150
                                },
                                {
                                    "id": "purposecode",
                                    "fieldIndex": "1",
                                    "width": 200
                                },
                                {
                                    "id": "undaf_stated_priority",
                                    "fieldIndex": "2",
                                    "width": 220
                                },
                                {
                                    "id": "cpf_stated_priority",
                                    "fieldIndex": "3",
                                    "width": 220
                                }
                            ]
                        }
                    },
                    "filterFor": {
                        "filter_priorities": [
                            "recipientcode"
                        ]
                    },
                    "postProcess": [
                        {
                            "name": "filter",
                            "sid": [
                                {
                                    "uid": "adam_cpf_undaf_priorities_table"
                                }
                            ],
                            "parameters": {
                                "columns": [
                                    "purposecode",
                                    "undaf_stated_priority",
                                    "cpf_stated_priority",
                                    "undaf_period",
                                    "cpf_period",
                                    "recipientcode"
                                ],
                                "rows": {
                                    "recipientcode": {
                                        "codes": [
                                            {
                                                "uid": "crs_recipients",
                                                "version": "2016",
                                                "codes": [
                                                    "625"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            },
                            "rid": {
                                "uid": "filter_priorities"
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "purposecode",
                                    "undaf_stated_priority",
                                    "cpf_stated_priority",
                                    "undaf_period",
                                    "cpf_period",
                                    "recipientcode"
                                ],
                                "aggregations": []
                            }
                        }
                    ]
                }
            ],
/*
            "filter": {
                "valid": true,
                "labels": {
                    "recipientcode": {
                        "555": "Afghanistan"
                    },
                    "donorcode": {
                        "all": "All"
                    },
                    "year-from": [],
                    "year-to": [],
                    "year": {
                        "range": "2015-2015"
                    }
                },
                "values": {
                    "recipientcode": [
                        "555"
                    ],
                    "donorcode": [],
                    "year-from": [],
                    "year-to": [],
                    "year": [
                        {
                            "value": "2015",
                            "parent": "from"
                        },
                        {
                            "value": "2015",
                            "parent": "to"
                        }
                    ],
                    "uid": []
                }
            },
*/
            "environment": "demo"
        };

        adamconf.filter = this.filter.getValues();

        this.dashboard = new Dashboard(
          //  this.dashboardConfig
            adamconf
        );

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