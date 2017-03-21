define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/domains/config",
    "../html/domains/template.hbs",
    "./domains/downloadData",
    "./domains/visualizeData",
    "fenix-ui-filter-utils",
    "../lib/utils",
    "../nls/labels",
    "bootstrap"
], function ($, log, _, C, PAGC, template, DownloadData, VisualizeData, Filter, Utils, labels) {

    "use strict";
    var Clang = C.lang.toLowerCase();

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

        console.log("Domains start")
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
            indicator: this.selected_indicator
        });

        // this.visualizeDataTab = new VisualizeData({
        //     el: this.$el.find(s.VISUALIZE_DATA_TAB_EL),
        //     lang: this.lang,
        //     environment: this.environment,
        //     indicator: this.selected_indicator
        // });

        console.log("Before downloadDataTab")
        this.downloadDataTab.render();
    };

    // Events
    Domains.prototype._bindEventListeners = function () {

        this.$tabs.on("click", _.bind(this._onTabClick, this))

        this.$tabs.on(s.events.dashboard.READY, _.bind(this._onDashboardReady, this))

    };

    Domains.prototype._onDashboardReady = function (tab) {

        console.log("_onDashboardReady", tab)
        if((tab)&&(tab.tabName)&&(tab.tabName==s.VISUALIZE_DATA_TAB)){
            s.visualizeDataTab_created = true;
        }
    };

    Domains.prototype._onTabClick = function (evt) {

        var tab = $(evt.target).data("tab");
        this.currentTab = tab;
        if((tab)&&(tab.tabName)&&(tab.tabName==s.VISUALIZE_DATA_TAB)&&(!s.visualizeDataTab_created)){
            this.visualizeDataTab.render();
        }

        //this._showTab(tab);
    };

    Domains.prototype._showTab = function (tab) {
        console.log("In showTab ", tab)
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

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //Wiews CSS
        //require("../css/wiews.css");
    };

    return new Domains();

});