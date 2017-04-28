define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "bootstrap"
], function ($, log, _, C ) {

    "use strict";
    var Clang = C.lang.toLowerCase();

    //This code has to be passed by Typo3
    var selected = {code: "20"};

    var s = {
    };

    function Sdg() {

        console.clear();

        // silent trace

        log.setLevel("silent");
    };

    Sdg.prototype._importThirdPartyCss = function () {

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
        require("../css/wiews.css");

    };

    return new Sdg();

});