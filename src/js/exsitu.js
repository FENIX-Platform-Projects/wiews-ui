define([
    "jquery",
    "loglevel",
    "underscore",
    "load-google-maps-api-2",
    "../config/config",
    "../config/exsitu/config",
    "../html/exsitu/template.hbs",
    "../nls/labels",
    "bootstrap",
    "bootstrap-table",
    '../../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export',
    'typeahead.js'
], function ($, log, _, GoogleMaps, C, exsituC, template, labels, bootstrap) {

    "use strict";
    var Clang = C.lang.toLowerCase();

    var s = { EL: "#exsitu" },
        services_url = "http://hqlprfenixapp2.hq.un.fao.org:10380/pentaho/plugin/saiku/api/anonymousUser/export/saiku/json?file=/home/anonymousUser/wiews_2016_map.saiku",
        google_apikey = "AIzaSyBuHFI5p2EP0jdpliVr1BQgx-zprRNRjcc";

    function Exsitu() {

        console.clear();

        // silent trace

        log.setLevel("silent");

        this._importThirdPartyCss();

        this._validateConfig();

        this._initVariables();

        this._attach();

        this._bindEventListeners();
    };

    Exsitu.prototype._validateConfig = function () {
        if (!C.lang) alert("Please specify a valid LANGUAGE in config/config.js");
        GoogleMaps.key = google_apikey;
        GoogleMaps.language = 'en';
    };

    Exsitu.prototype._getData = function () {

        return exsituC.dev_wiews_2016_map_saiku;

        /*
                $.get(services_url, function(data, status){
                    console.log(data,status);
                });


                $.ajax({
                    async: false,
                    dataType: 'jsonp',
                    method: 'GET',
                    contentType: "application/json; charset=utf-8",
                    url: services_url,
                    //data: JSON.stringify(payload),
                    success: function(res) {
                        console.log(res);
                    }
                });

        */


    };

    Exsitu.prototype._attach = function () {
        $(s.EL).html(template(labels[Clang]));

        $('[data-role=details]').hide();
        $('#tabled').hide();

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
                    "country": "Spain",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                },
                {
                    "id": "2",
                    "name": "C.R.A. Istituto Sperimentale per la Frutticoltura, Ministero delle Politiche Agricole e Forestali\n",
                    "acronym": "ISF-Roma",
                    "instcode": "ITA001",
                    "address": "Via Fioranello 52",
                    "city": "Roma",
                    "country": "Italy",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                },
                {
                    "id": "3",
                    "name": "Plant Genetic Resource Collection",
                    "acronym": "PGR",
                    "instcode": "DEU001",
                    "address": "Bundesallee 50",
                    "city": "Braunschweig",
                    "country": "Germany",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                },
                {
                    "id": "4",
                    "name": "División de Mejoramiento Genético, IDIAP",
                    "acronym": "IDIAP-DMG",
                    "instcode": "PAN001",
                    "address": "Apdo. 6-4391",
                    "city": "Panamá 6a, CA",
                    "country": "Panama",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                },
                {
                    "id": "5",
                    "name": "Centro Nacional de Recursos Fitogenéticos",
                    "acronym": "INIA-CRF",
                    "instcode": "ESP004",
                    "parentorg": "Instituto Nacional de Investigación y Tecnología Agraria y Alimentaria. Subdirección General de Investigación y Tecnología",
                    "address": "Autovía de Aragón km 36. Apdo. 1045",
                    "city": "Alcalá de Henares. Madrid",
                    "country": "Spain",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                },
                {
                    "id": "6",
                    "name": "C.R.A. Istituto Sperimentale per la Frutticoltura, Ministero delle Politiche Agricole e Forestali\n",
                    "acronym": "ISF-Roma",
                    "instcode": "ITA001",
                    "address": "Via Fioranello 52",
                    "city": "Roma",
                    "country": "Italy",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                },
                {
                    "id": "7",
                    "name": "Plant Genetic Resource Collection",
                    "acronym": "PGR",
                    "instcode": "DEU001",
                    "address": "Bundesallee 50",
                    "city": "Braunschweig",
                    "country": "Germany",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                },
                {
                    "id": "8",
                    "name": "División de Mejoramiento Genético, IDIAP",
                    "acronym": "IDIAP-DMG",
                    "instcode": "PAN001",
                    "address": "Apdo. 6-4391",
                    "city": "Panamá 6a, CA",
                    "country": "Panama",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                },
                {
                    "id": "9",
                    "name": "Centro Nacional de Recursos Fitogenéticos",
                    "acronym": "INIA-CRF",
                    "instcode": "ESP004",
                    "parentorg": "Instituto Nacional de Investigación y Tecnología Agraria y Alimentaria. Subdirección General de Investigación y Tecnología",
                    "address": "Autovía de Aragón km 36. Apdo. 1045",
                    "city": "Alcalá de Henares. Madrid",
                    "country": "Spain",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                },
                {
                    "id": "10",
                    "name": "C.R.A. Istituto Sperimentale per la Frutticoltura, Ministero delle Politiche Agricole e Forestali\n",
                    "acronym": "ISF-Roma",
                    "instcode": "ITA001",
                    "address": "Via Fioranello 52",
                    "city": "Roma",
                    "country": "Italy",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                },
                {
                    "id": "11",
                    "name": "Plant Genetic Resource Collection",
                    "acronym": "PGR",
                    "instcode": "DEU001",
                    "address": "Bundesallee 50",
                    "city": "Braunschweig",
                    "country": "Germany",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                },
                {
                    "id": "12",
                    "name": "División de Mejoramiento Genético, IDIAP",
                    "acronym": "IDIAP-DMG",
                    "instcode": "PAN001",
                    "address": "Apdo. 6-4391",
                    "city": "Panamá 6a, CA",
                    "country": "Panama",
                    "accessions": Math.floor(Math.random() * 100),
                    "genera": Math.floor(Math.random() * 100),
                    "taxa": Math.floor(Math.random() * 100)
                }

            ],
            pagination: true,
            pageSize: 10,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            sortable: true,
            showExport: true
        });

        var data = this._getData();


        GoogleMaps().then(function (googleMaps) {
            //console.log(googleMaps);
            var map = new googleMaps.Map(document.getElementById('map'), {
                zoom: 1,
                center: new google.maps.LatLng(2.8,-187.3),
                //disableDefaultUI: true,
                gestureHandling: 'cooperative',
                streetViewControl: false,
                fullscreenControl: false
            });


            $.each(data.cellset, function(index, item){
                if (index > 0 && item[2].value.length > 0) {
                    var myLatLng = {lat: Number(item[2].value), lng: Number(item[3].value)};
                    console.log( myLatLng, item[1].value )
                    var marker = new googleMaps.Marker({
                        position: myLatLng,
                        map: map,
                        title: item[1].value
                    });
                }
            });




            /*

            map.data.setStyle(function(feature) {
                var magnitude = feature.getProperty('mag');
                return {
                    icon: getCircle(magnitude),
                    title: feature.getProperty('place')
                };
            });

            var infowindow = new googleMaps.InfoWindow({});

            map.data.addGeoJson(exsituC.geodemodata);

            map.data.addListener('click', function(event) {
                //console.log(event.feature);
                infowindow.close();
                var opening = new googleMaps.LatLng(event.feature.b.b.lat(), event.feature.b.b.lng());
                infowindow.setPosition(opening);
                infowindow.setContent(event.feature.getProperty('place'));
                infowindow.open(map);

            });

            function getCircle(magnitude) {
                return {
                    path: googleMaps.SymbolPath.CIRCLE,
                    fillColor: 'red',
                    fillOpacity: .2,
                    scale: Math.pow(2, magnitude) / 2,
                    strokeColor: 'white',
                    strokeWeight: .5
                };
            }

            */


        }).catch(function (err) {
            console.error(err);
        });




        //console.log(data.cellset);

    };

    Exsitu.prototype._initVariables = function () {

        this.$el = $(s.EL);
        this.lang = Clang;
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;

    };

    Exsitu.prototype._bindEventListeners = function () {

        $('#showasmap').on('click', function () {
            $('#maped').toggle();
            $('#tabled').toggle();

            if ($('#map').is(":visible")) {
                $('#btn_text').html('Table')
            } else {
                $('#btn_text').html('Map')
            }

        });

    };

    Exsitu.prototype._importThirdPartyCss = function () {

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

    return new Exsitu();

});