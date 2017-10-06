define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../html/organizations/template.hbs",
    "../nls/labels",
    "bootstrap",
    "bootstrap-table",
    '../../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export'
], function ($, log, _, C, template, labels, bootstrap) {

    "use strict";
    var Clang = C.lang.toLowerCase();

    var s = {
        EL: "#organizations"
    };

    function Organizations() {

        console.clear();

        // silent trace

        log.setLevel("silent");

        this._importThirdPartyCss();

        this._validateConfig();

        this._attach();

        this._initVariables();

        this._bindEventListeners();
    };

    Organizations.prototype._validateConfig = function () {

        if (!C.lang) alert("Please specify a valid LANGUAGE in config/config.js");

    };

    Organizations.prototype._attach = function () {
        $(s.EL).html(template(labels[Clang]));
        $('#table').bootstrapTable({
            data : [
                {
                    "id": "1",
                    "name": "Centro Nacional de Recursos Fitogenéticos",
                    "acronym": "INIA-CRF",
                    "instcode": "ESP004",
                    "parentorg": "Instituto Nacional de Investigación y Tecnología Agraria y Alimentaria. Subdirección General de Investigación y Tecnología",
                    "address": "Autovía de Aragón km 36. Apdo. 1045",
                    "city": "Alcalá de Henares. Madrid",
                    "country": "Spain"
                },
                {
                    "id": "2",
                    "name": "C.R.A. Istituto Sperimentale per la Frutticoltura, Ministero delle Politiche Agricole e Forestali\n",
                    "acronym": "ISF-Roma",
                    "instcode": "ITA001",
                    "address": "Via Fioranello 52",
                    "city": "Roma",
                    "country": "Italy"
                },
                {
                    "id": "3",
                    "name": "Plant Genetic Resource Collection",
                    "acronym": "PGR",
                    "instcode": "DEU001",
                    "address": "Bundesallee 50",
                    "city": "Braunschweig",
                    "country": "Germany"
                },
                {
                    "id": "4",
                    "name": "División de Mejoramiento Genético, IDIAP",
                    "acronym": "IDIAP-DMG",
                    "instcode": "PAN001",
                    "address": "Apdo. 6-4391",
                    "city": "Panamá 6a, CA",
                    "country": "Panama"
                }

            ],
            pagination: true,
            pageSize: 20,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            sortable: true,
            showExport: true
        });
        $('#table').on('click-row.bs.table', function(row, $element, field){
            alert('click');
            console.log(row, $element, field);
        });
    };

    Organizations.prototype._initVariables = function () {

        this.$el = $(s.EL);
        this.lang = Clang;
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;

    };


    // Events
    Organizations.prototype._bindEventListeners = function () {

        $('#advanced').on('click', function(){
           $('#advanced-search').toggleClass('advanced');
        });

    };

    Organizations.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");
        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");


        require("../../node_modules/fenix-ui-table-creator/dist/fenix-ui-table-creator.min.css");

        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");

        //Wiews CSS
        require("../css/wiews.css");

    };

    return new Organizations();

});