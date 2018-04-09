define([
    "jquery",
    "loglevel",
    "underscore",
    "load-google-maps-api-2",
    "../config/config",
    "../config/maps/config",
    "../html/maps/template.hbs",
    "../nls/labels",
    "json-2-csv",
    "file-saver",
    "bootstrap",
    "bootstrap-table",
    '../../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export',
    'typeahead.js',
    'select2'

], function ($, log, _, GoogleMaps, C, exsituC, template, labels, converter, FileSaver, bootstrap) {

    "use strict";
    var Clang = C.lang.toLowerCase();

    var s = {
        EL: "#maps",
        TABLE : "#table"
        },
        exsitu_search_url = "http://www.fao.org/wiews/data/search/",
        organization_url = "http://www.fao.org/wiews/data/organizations/",
        services_url = "http://hqlprfenixapp2.hq.un.fao.org:10380/pentaho/plugin/saiku/api/anonymousUser/export/saiku/json?file=/home/anonymousUser/{{YEAR}}.saiku",
        //google_apikey = "AIzaSyBuHFI5p2EP0jdpliVr1BQgx-zprRNRjcc"; // < DEV
        google_apikey = "AIzaSyA5MmbqZJOxNwBlAIMmpxIDktlQN7_izeY"; // < PROD

    function Maps() {
        console.clear();
        // silent trace
        log.setLevel("silent");
        this._importThirdPartyCss();
        this._validateConfig();
        this._initVariables();
        this._attach();
        this._bindEventListeners();
    };

    Maps.prototype._validateConfig = function () {
        if (!C.lang) alert("Please specify a valid LANGUAGE in config/config.js");
        GoogleMaps.key = google_apikey;
        GoogleMaps.language = 'en';
    };

    Maps.prototype._convert2TableData = function (input) {
        var output = [];
        var year = $('#year').val().split(/[^0-9]/).join("");

        _.each(input, function(object, index) {
            var obj = {
                "year" : year,
                "instcode": object[0].value,
                "name": object[1].value,
                "country": object[4].value,
                "accessions" : Number(object[5].value.split('.').join("")),
                "genus" : Number(object[6].value.split('.').join("")),
                "species" : Number(object[7].value.split('.').join(""))
            };
            if (index>0) output.push(obj);
        });


        return output;
    };

    Maps.prototype._convert2GEOJson = function (input) {
        var geoJSON = {
            "type": "FeatureCollection",
            "features" : []
            },
            output = [];

        _.each(input, function (object, index) {
            var obj = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ Number(object[3].value), Number(object[2].value) ]
                },
                "properties": {
                    "instcode" : object[0].value,
                    "name": object[1].value,
                    "country" : object[4].value,
                    "accessions" : Number(object[5].value.split('.').join("")),
                    "genus" : Number(object[6].value.split('.').join("")),
                    "species" : Number(object[7].value.split('.').join(""))
                },
                "id" : object[0].value
            };

            if (index > 0 && object[2].value.length > 0) {
                //console.log(obj);
                output.push(obj);
            }
        });

        geoJSON.features = output;
        return geoJSON;

    };

    Maps.prototype._getData = function (year) {

        //return exsituC.dev_wiews_2016_map_saiku;

        return exsituC[year];

        $.get(services_url, function(data){
            return data;
        });

    };

    Maps.prototype._processMap = function (data_toshow) {

        var self = this;

        var data = this._getData($('#year').val());
        if (data == undefined) {
            alert('Data not available');
            return;
        }

        var geodata = this._convert2GEOJson(data.cellset);

        GoogleMaps().then(function (googleMaps) {
            //console.log(googleMaps);
            var map = new googleMaps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(15,-5),
                //disableDefaultUI: true,
                gestureHandling: 'cooperative',
                streetViewControl: false,
                fullscreenControl: false
            });

            map.data.setStyle(function(feature) {
                var size = feature.getProperty(data_toshow);
                return {
                    icon: getCircle(size),
                    title: feature.getProperty('name')
                };
            });

            var infowindow = new googleMaps.InfoWindow({});

            map.addListener('zoom_changed', function(event) {
                self.zoomlevel = map.getZoom();
                map.data.setStyle(function(feature) {
                    var size = feature.getProperty(data_toshow);
                    return {
                        icon: getCircle(size),
                        title: feature.getProperty('name')
                    };
                });
            });

            map.data.addGeoJson(geodata);

            map.data.addListener('click', function(event) {
                //console.log(event.feature);
                infowindow.close();
                var opening = new googleMaps.LatLng(event.feature.b.b.lat(), event.feature.b.b.lng());
                infowindow.setPosition(opening);
                infowindow.setContent(
                    "<span><b><a target='_blank' href='"+organization_url+self.lang.toLowerCase()+"/?instcode="+event.feature.getProperty('instcode')+"'>"+event.feature.getProperty('instcode')+"</a></b>" +
                    " - <i>"+event.feature.getProperty('name')+"</i> </span><br>" +
                    "<br><span> <b>Accessions:</b> "+event.feature.getProperty('accessions')+"</span><br>" +
                    "<span> <b>Genera:</b> "+event.feature.getProperty('genus')+"</span><br>" +
                    "<span> <b>Species:</b> "+event.feature.getProperty('species')+"</span><br>" +
                    "<br><b><a href='"+exsitu_search_url+self.lang.toLowerCase()+"/?instcode="+event.feature.getProperty('instcode')+"'>To the <i>ex situ</i> collection </a></b>"
                );
                infowindow.open(map);

            });

            function getCircle(size) {
                var value = $('#data_filter').val(),
                    kind = $('#data_showed').val(),
                    mag = Math.pow(Number(size), 1/4),
                    divisor = (kind === "accessions") ? 3 : 8,
                    multi = 1; //self.zoomlevel /2;


                return {
                    path: googleMaps.SymbolPath.CIRCLE,
                    fillColor: 'red',
                    fillOpacity: .2,
                    scale:  (size > value) ? ((mag/4)*divisor)*multi : 0,
                    strokeColor: 'white',
                    strokeWeight: .5
                };
            }



        }).catch(function (err) {
            console.error(err);
        });

        var tableData = this._convert2TableData(data.cellset);
        this._bootstrapTable(tableData);

    };

    Maps.prototype._bootstrapTable = function (data) {
        var self = this;
        $(s.TABLE).bootstrapTable('destroy');
        $(s.TABLE).bootstrapTable({
            data : data,
            pagination: true,
            pageSize: 25,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            formatSearch: function() {
                return labels[Clang]['organizations_search_filter']
            },
            sortable: true,
            paginationVAlign: "top"
        });
        $('#table').on('click-row.bs.table', function(row, $element, field){
            window.location.href = organization_url +self.lang.toLowerCase()+"/?instcode="+$element['instcode']+"#details";
        });
    };

    Maps.prototype._attach = function () {
        $(s.EL).html(template(labels[Clang]));

        $('[data-role=details]').hide();
        $('#tabled').hide();

        var data = this._getData($('#year').val());
        var tableData = this._convert2TableData(data.cellset);
        this._bootstrapTable(tableData);

        this._processMap($('#data_showed').val());

        this.tabledata = this._convert2CSV(tableData);

        $('#year').select2({ width: '100%',  theme: "bootstrap" });
        $('#data_showed').select2({ width: '100%' , theme: "bootstrap" });
        $('#data_filter').select2({ width: '100%',  theme: "bootstrap" });

    };

    Maps.prototype._convert2CSV = function (data) {
        _.each(data, function(object) {
            object['name'] = "\""+object['name']+"\"";
        });
        return data;

    };

    Maps.prototype._initVariables = function () {

        this.$el = $(s.EL);
        this.lang = Clang;
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;
        this.zoomlevel = 2;

    };

    Maps.prototype._bindEventListeners = function () {

        var self = this;

        $('#showasmap').on('click', function () {
            $('#maped').toggle();
            $('#tabled').toggle();
            $('[data-role = filters]').toggle();

            if ($('#map').is(":visible")) {
                self._processMap($('#data_showed').val());
                $('#btn_text').html('Table')
            } else {
                $('#btn_text').html('Map')
            }

        });

        $('#year').on('change', function () {
            self._processMap($('#data_showed').val());
        });

        $('#data_showed').on('change', function () {
            self._processMap($('#data_showed').val());
        });

       $('#data_filter').on('change', function () {
            self._processMap($('#data_showed').val());
        });

        $('[data-role=exsitu_exportbutton]').on('click', function() {
            var json2csvCallback = function (err, csv) {
                if (err) throw err;
                var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
                FileSaver.saveAs(blob, "exsitu.csv");
            };
            converter.json2csv(self.tabledata, json2csvCallback);
        });

    };

    Maps.prototype._importThirdPartyCss = function () {


        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");
        //dropdown selector
        require("../../node_modules/select2/dist/css/select2.css");
        require("../../node_modules/select2-bootstrap-theme/dist/select2-bootstrap.css")

        require("../../node_modules/fenix-ui-table-creator/dist/fenix-ui-table-creator.min.css");

        //tree selector
        //require("../../node_modules/jstree/dist/themes/default/style.min.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");

        //Wiews CSS
        require("../css/wiews.css");

    };

    return new Maps();

});