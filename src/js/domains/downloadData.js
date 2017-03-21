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
    '../common/progress-bar',
    "jstree"
], function ($, log, _, C, PAGC, INDICATORSC, template, Dashboard, Filter, FxUtils, Utils, labels, Bridge, Highcharts, ProgressBar) {

    "use strict";
    var Clang = C.lang.toLowerCase();

    var dashboardName = "downloadData";

    var s = {
        PROGRESS_BAR_CONTAINER: '#progress-bar-holder',

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

    function DownloadData(opt){

        console.log("DownloadData start")
        require('highcharts-no-data-to-display')(Highcharts);

        $.extend(true, this, opt);

        this._validateConfig();

        this._attach();

        this._initVariables();

        //this._printDashboard();
    };

    DownloadData.prototype._validateConfig = function () {

        if (!C.lang) {
            alert("Please specify a valid LANGUAGE in config/config.js");
        }
    };

    DownloadData.prototype._attach = function () {

        $(this.el).html(template(labels[Clang]));
    };

    DownloadData.prototype._initVariables = function () {

        this.$el = $(s.EL);

        this.lang = Clang;
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;
        this.indicatorConfig = INDICATORSC[this.indicator.code];
        this.config = this.indicatorConfig[dashboardName];

        this.progressBar = new ProgressBar({
            container: s.PROGRESS_BAR_CONTAINER,
            lang: this.lang
        });
    };

    DownloadData.prototype.render = function () {

        if(this.dashboard){
            this._disposeDashboard();
        }

        this._renderDashboard();

        this._loadProgressBar();
    }

    // Events
    DownloadData.prototype._bindEventListeners = function () {

    };

    DownloadData.prototype._disposeDashboard = function () {
        if (this.dashboard && $.isFunction(this.dashboard.dispose)) {
            this.dashboard.dispose();
        }
    };

    DownloadData.prototype._loadProgressBar = function () {
        this.progressBar.reset();
        this.progressBar.show();

        var self = this, increment = 0, percent = Math.round(100 / this.config.items.length);
        console.log(this.dashboard)
        this.dashboard.on(s.events.dashboardComponent.READY, function () {
            //self.trigger(s.events.dashboard.READY, [{tabName : dashboardName}]);
            //self.progressBar.finish();
        });

        this.dashboard.on(s.events.dashboardComponent.ITEM_READY, function (item) {
            //increment = increment + percent;
            //self.progressBar.update(increment);
        });
    };

    DownloadData.prototype._renderDashboard = function () {
        console.log("_renderDashboard start")
        console.log(this.config)
        // Build new dashboard
        this.dashboard = new Dashboard(
            this.config
        );
        console.log(this.dashboard)
    };

    DownloadData.prototype._importThirdPartyCss = function () {

    //Bootstrap
    require('bootstrap/dist/css/bootstrap.css');

    //dropdown selector
    require("../../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
    //tree selector
    require("../../../node_modules/jstree/dist/themes/default/style.min.css");
    //range selector
    require("../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
    require("../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
    //time selector
    require("../../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
    // fenix-ui-filter
    require("../../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

    // fenix-ui-dropdown
    require("../../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");

    // bootstrap-table
    require("../../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");

    //meta viewer requirements
    require("jquery-treegrid-webpack/css/jquery.treegrid.css");

    //Wiews CSS
    //require("../css/wiews.css");

};

    return DownloadData;

});