define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/domains/config",
    "../config/domains/indicatorsProperties",
    "../html/domains/template.hbs",
    "./domains/downloadData",
    "./domains/visualizeData",
    "../nls/labels",
    "bootstrap"
], function ($, log, _, C, PAGC, CATEG, template, DownloadData, VisualizeData, labels, bootstrap) {

    "use strict";
    var Clang = C.lang.toLowerCase();

    //This code has to be passed by Typo3
     var selected = {code: "20"};
   //  var selected = {code: "2"};
   //  var selected = {code: "10"};
    //var selected = {code: "15"};
    // var selected = {code: "22"};
   // var selected = {code: "24"};
    //var selected = {code: "3"};

    var s = {
        noVisualize : false,
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
        },

        indicator_no_visualize : []
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

        var fromQS = (this._getParameterByName('code') != null);

        this.$el = $(s.EL);

        this.lang = Clang;
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;

        this.selected_indicator = ((fromQS) ? {code: this._getParameterByName('code')} : selected);

        if ((CATEG[this.selected_indicator.code]) == undefined) alert("Code " + this.selected_indicator.code + " doesn't have a proper configuration. Please check.");

        this.selected_indicator_category = CATEG[this.selected_indicator.code].category;
        this.indicatorProperties = CATEG[this.selected_indicator.code];

        if(this.indicatorProperties.noVisualize){
            $('[data-tab="'+s.VISUALIZE_DATA_TAB+'"]').removeAttr('data-toggle');
            s.noVisualize = true;
        }

        this.$tabs = this.$el.find(s.TABS_A);

        s.visualizeDataTab_created = false;
    };

    Domains.prototype._elementSetting = function () {

        // Set Domain
        this.$el.find('[data-role="domain"]').html(labels[Clang]['domain_'+this.selected_indicator.code])
        // Set Activity1
        this.$el.find('[data-role="activity1"]').html(labels[Clang]['activity1_'+this.selected_indicator.code])
        // Set Activity2
        this.$el.find('[data-role="activity2"]').html(labels[Clang]['activity2_'+this.selected_indicator.code])
        // Set Title
        this.$el.find('[data-role="title"]').html(labels[Clang]['title_'+this.selected_indicator.code])
        // Set Indicator
        this.$el.find('[data-role="indicator"]').html(labels[Clang]['indicator_'+this.selected_indicator.code])
    };

    //Initialization of the Download Data and Visualize Data Tab
    Domains.prototype._initTabs = function () {

        this.downloadDataTab = new DownloadData({
              el: this.$el.find(s.DOWNLOAD_DATA_TAB_EL),
              lang: this.lang,
              environment: this.environment,
              indicator: this.selected_indicator_category,
              indicatorProperties: this.indicatorProperties,
              conversion: CATEG[this.selected_indicator.code].downloadConversion
        });

        if(!s.noVisualize){
            this.visualizeDataTab = new VisualizeData({
                el: this.$el.find(s.VISUALIZE_DATA_TAB_EL),
                lang: this.lang,
                environment: this.environment,
                cache : this.cache,
                indicatorProperties: this.indicatorProperties
            });
        }

        this.downloadDataTab.render();
    };

    // Events
    Domains.prototype._bindEventListeners = function () {

        if(!s.noVisualize) {
            this.$tabs.on("click", _.bind(this._onTabClick, this))
        }
    };

    Domains.prototype._onDashboardReady = function (tab) {

        if((tab)&&(tab.tabName)&&(tab.tabName==s.VISUALIZE_DATA_TAB)){
            s.visualizeDataTab_created = true;
        }
    };

    //The tabs are created only once
    Domains.prototype._onTabClick = function (evt) {

        var tab = $(evt.target).data("tab");
        this.currentTab = tab;
        if((tab)&&(tab==s.VISUALIZE_DATA_TAB)&&(!s.visualizeDataTab_created)){
            this.visualizeDataTab.render();
            s.visualizeDataTab_created = true;
        }
    };

    //Getting the code of the indicator from the url(Typo3)
    //By default the code is 20
    Domains.prototype._getParameterByName = function (name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    Domains.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");
        //Bootstrap
        //require('../../node_modules/bootstrap/dist/css/bootstrap.css');
        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");


        //material icons
        // require("../../node_modules/material-design-icons/iconfont/material-icons.css");

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
        require("../css/wiews.css");

    };

    return new Domains();

});