define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/domains/config",
    "../config/domains/indicatorsCategories",
    "../html/domains/template.hbs",
    "./domains/downloadData",
    "./domains/visualizeData",
    "fenix-ui-filter-utils",
    "../lib/utils",
    "../nls/labels",
    "fenix-ui-dashboard",
    "../config/domains/indicatorsConfig",
    "bootstrap"
], function ($, log, _, C, PAGC, CATEG, template, DownloadData, VisualizeData, Filter, Utils, labels, Dashboard, INDICATORSC) {

    "use strict";
    var Clang = C.lang.toLowerCase();

    //This code has to be passed by Typo3
    var selected = {code: "20"};

    var s = {
        EL: "#domains",
        DOWNLOAD_DATA_TAB_EL: "#downloadDataTab",
        VISUALIZE_DATA_TAB_EL: "#visualizeDataTab",
        DOWNLOAD_DATA_TAB: "downloadData",
        VISUALIZE_DATA_TAB: "visualizeData",
        TABS: "#domainsTab",
        TABS_A: "#domainsTab > li > a",
        visualizeDataTab_created : false,
        events: {
            dashboard :{
                READY : 'dashboard.ready'
            }
        }
    };

    function Domains() {

        console.clear();

        // silent trace

        log.setLevel("silent");

        this._importThirdPartyCss();

        this._validateConfig();

        this._attach();

        this._initVariables();

        this._elementSetting();

        this._initTabs();

        this._bindEventListeners();
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

        this.selected_indicator = selected;
        this.selected_indicator_position = CATEG[this.selected_indicator.code].position;
        this.$tabs = this.$el.find(s.TABS_A);

        s.visualizeDataTab_created = false;
    };

    Domains.prototype._elementSetting = function () {

        // Set Title
        this.$el.find('[data-role="domain-title"]').html(labels[Clang][this.selected_indicator.code])
    };

    Domains.prototype._initTabs = function () {

        this.downloadDataTab = new DownloadData({
              el: this.$el.find(s.DOWNLOAD_DATA_TAB_EL),
              lang: this.lang,
              environment: this.environment,
             indicator: this.selected_indicator_position
        });

        this.visualizeDataTab = new VisualizeData({
            el: this.$el.find(s.VISUALIZE_DATA_TAB_EL),
            lang: this.lang,
            environment: this.environment,
            indicator: this.selected_indicator_position
        });

        this.downloadDataTab.render();
    };

    // Events
    Domains.prototype._bindEventListeners = function () {

        this.$tabs.on("click", _.bind(this._onTabClick, this))

        //console.log("_bindEventListeners", this.$el.find(s.DOWNLOAD_DATA_TAB_EL))
        //this.$el.find(s.DOWNLOAD_DATA_TAB_EL).on('dashboard.ready', _.bind(this._onDashboardReady, this))
        //this.$tabs.on(s.events.dashboard.READY, _.bind(this._onDashboardReady, this))
    };

    Domains.prototype._onDashboardReady = function (tab) {

        console.log("_onDashboardReady", tab)
        if((tab)&&(tab.tabName)&&(tab.tabName==s.VISUALIZE_DATA_TAB)){
            s.visualizeDataTab_created = true;
            s.visualizeDataTab_created = true;
        }
    };

    Domains.prototype._onTabClick = function (evt) {

        var tab = $(evt.target).data("tab");
        this.currentTab = tab;
        if((tab)&&(tab==s.VISUALIZE_DATA_TAB)&&(!s.visualizeDataTab_created)){
            this.visualizeDataTab.render();
            s.visualizeDataTab_created = true;
        }
        //this._showTab(tab);
    };

    Domains.prototype._showTab = function (tab) {
        switch (tab) {
            case s.DOWNLOAD_DATA_TAB:
                this.downloadDataTab.show();
                break;
            case s.VISUALIZE_DATA_TAB:
                this.visualizeDataTab.show();
                break;
        }

        this.currentTab = tab;
    };

    Domains.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        //require("../../css/sandboxed-bootstrap.css");
        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");

        require("../../node_modules/leaflet/dist/leaflet.css");

        require("../../node_modules/fenix-ui-map-creator/dist/fenix-ui-map-creator.min.css");
        require("../../node_modules/fenix-ui-table-creator/dist/fenix-ui-table-creator.min.css");

        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        //range selector
        //require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        //require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        //time selector
        //require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // fenix-ui-dropdown
        // require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");

        //meta viewer requirements
        //require("jquery-treegrid-webpack/css/jquery.treegrid.css");

        //Wiews CSS
        //require("../css/wiews.css");

    };

    return new Domains();

});