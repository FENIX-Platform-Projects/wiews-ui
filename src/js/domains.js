define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/domains/config",
    "../html/domains/template.hbs",
    "fenix-ui-dashboard",
    "fenix-ui-filter",
    "fenix-ui-filter-utils",
    "../lib/utils",
    "../nls/labels",
    "fenix-ui-bridge",
    "highcharts",
    "jstree"
], function ($, log, _, C, PAGC, template, Dashboard, Filter, FxUtils, Utils, labels, Bridge, Highcharts) {

        "use strict";
        var Clang = C.lang.toLowerCase();

        var selected = {code : "20"};

        var s = {
            EL : "#domains"
        };

        function Domains(){

            console.clear();
            require('highcharts-no-data-to-display')(Highcharts);

            console.log("Domains start")
            log.setLevel("silent");

            this._importThirdPartyCss();

            this._validateConfig();

            this._attach();

            this._initVariables();

            this._elementSetting();


            //this._printDomainDashboard();
        };

        Domains.prototype._validateConfig = function () {

            if (!C.lang) {
                alert("Please specify a valid LANGUAGE in config/config.js");
            }
        };

        Domains.prototype._attach = function () {

            $(s.EL).html(template(labels[Clang]));
        };

        Domains.prototype._initVariables = function () {

            this.$el = $(s.EL);

            this.lang = Clang;
            this.environment = C.ENVIRONMENT;
            this.cache = C.cache;

            this.selected = selected;

            // this.$content = this.$el.find(s.CONTENT);
            //
            // this.filterValues = {};
            //
            // this.dashboards = [];
            //
            // this.environment = C.ENVIRONMENT;
            //
            // this.currentDashboard = s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph;
            //
            // this.bridge = new Bridge({
            //     environment : this.environment
            // });

        };

        Domains.prototype._elementSetting = function () {

            // Set Title
            this.$el.find('[data-role="domain-title"]').html(labels[Clang][this.selected.code])
        };

        Domains.prototype._importThirdPartyCss = function () {

            //Bootstrap
            require('bootstrap/dist/css/bootstrap.css');

            //dropdown selector
            require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
            //tree selector
            require("../../node_modules/jstree/dist/themes/default/style.min.css");
            //range selector
            require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
            require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
            //time selector
            require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
            // fenix-ui-filter
            require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

            // fenix-ui-dropdown
            require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");

            // bootstrap-table
            require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");
            // // fenix-ui-catalog
            //require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");

            //meta viewer requirements
            require("jquery-treegrid-webpack/css/jquery.treegrid.css");

            //Wiews CSS
            //require("../css/wiews.css");

        };

        return new Domains();

    });