define([
    "jquery",
    "loglevel",
    "underscore",
    "load-google-maps-api-2",
    "../config/config",
    "../html/maps/template.hbs",
    "../nls/labels",
    "json-2-csv",
    "file-saver",
    "bootstrap",
    "bootstrap-table",
    '../../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export',
    '../../node_modules/bootstrap-table/dist/bootstrap-table-locale-all',
    'typeahead.js',
    'select2'

], function ($, log, _, GoogleMaps, C, template, labels, converter, FileSaver, bootstrap) {

    "use strict";
    var Clang = C.lang.toLowerCase();

    var s = {
            EL: "#maps",
            TABLE : "#table"
        },
        exsitu_search_url = C.URL_exsitusearch,
        organization_url = C.URL_organizations,
        services_url = C.URL_saikumap,
        //google_apikey = "AIzaSyBuHFI5p2EP0jdpliVr1BQgx-zprRNRjcc"; // < DEV
        google_apikey = C.google_apikey; // < PROD

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
        GoogleMaps.language = Clang.toLowerCase();
    };

    Maps.prototype._convert2TableData = function (input) {
        var output = [];
        var selection = $('#data_international').val();
        var year = $('#year').val().split(/[^0-9]/).join("");

        _.each(input, function(object, index) {
            var obj = {
                "year" : year,
                "instcode": object[4].value,
                "name": object[5].value,
                "country": object[3].value,
                "type": object[2].value,
                "accessions" : Number(object[8].value.split(',').join("")),
                "genus" : Number(object[9].value.split(',').join("")),
                "species" : Number(object[10].value.split(',').join(""))
            };
            //console.log(selection.includes(object[2].value))
            if (index>0 && selection.includes(object[2].value)) output.push(obj);
        });
        //console.log(output);
        return output;
    };

    Maps.prototype._convert2GEOJson = function (input, selection) {
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
                    "coordinates": [ Number(object[7].value), Number(object[6].value) ]
                },
                "properties": {
                    "year" : object[0].value,
                    "country" : object[3].value,
                    "instcode" : object[4].value,
                    "name": object[5].value,
                    "type": object[2].value,
                    "accessions" : Number(object[8].value.split(',').join("")),
                    "genus" : Number(object[9].value.split(',').join("")),
                    "species" : Number(object[10].value.split(',').join(""))
                },
                "id" : object[4].value
            };

            if (index > 0 && object[6].value.length > 0 && selection.includes(object[2].value)) {
               // console.log(obj);
                output.push(obj);
            }
        });

        geoJSON.features = output;
        return geoJSON;

    };

    Maps.prototype._getData = function (year) {

        //return exsituC.dev_wiews_2016_map_saiku;

        //return exsituC[year];

        if (this.currentYear == year) return this.data;

        var data,
            url = services_url.replace("{{YEAR}}", year);

        $.ajax({
            async: false,
            dataType: 'json',
            method: 'GET',
            contentType: "text/plain; charset=utf-8",
            url:  url,
            success: function(res) {
                //console.log('res is ',res);
                data = res;
            },
            error : function(res) {
                console.log(res);
            }
        });

        this.currentYear = year;
        this.data = data;

        return data;

    };

    Maps.prototype._processMap = function (data_toshow) {

        var self = this;

        var data = this._getData($('#year').val());
        var selection = $('#data_international').val();

        if (data == undefined) {
            console.log(data);
            alert(labels[Clang]['maps_error']);
            return;
        }

        var geodata = this._convert2GEOJson(data.cellset, selection);

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
                var color = feature.getProperty('type');
                return {
                    icon: getCircle(size, color),
                    title: feature.getProperty('name')
                };
            });

            var infowindow = new googleMaps.InfoWindow({});

            map.addListener('zoom_changed', function(event) {
                self.zoomlevel = map.getZoom();

                map.data.setStyle(function(feature) {
                    var size = feature.getProperty(data_toshow);
                    var color = feature.getProperty('type');
                    return {
                        icon: getCircle(size, color),
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
                    "<br><span> <b>"+labels[Clang]['maps_accessions']+":</b> "+event.feature.getProperty('accessions').toLocaleString()+"</span><br>" +
                    "<span> <b>"+labels[Clang]['maps_genera']+":</b> "+event.feature.getProperty('genus').toLocaleString()+"</span><br>" +
                    "<span> <b>"+labels[Clang]['maps_species']+":</b> "+event.feature.getProperty('species').toLocaleString()+"</span><br>" +
                    "<br><b><a href='"+exsitu_search_url+self.lang.toLowerCase()+"/?instcode="+event.feature.getProperty('instcode')+"'>"+labels[Clang]['maps_toexitu']+"</a></b>"
                );
                infowindow.open(map);

            });

            self._toggleLoading();

            function getCircle(size, color) {
                var value = $('#data_filter').val(),
                    true_color = 'red',
                    kind = $('#data_showed').val(),
                    mag = Math.pow(Number(size), 1/4),
                    divisor = (kind === "accessions") ? 3 : 8,
                    multi = 1; //self.zoomlevel /2;

                //if (color == "OTHER") {}
                if (color == "INT") true_color = 'blue';
                if (color == "REG") true_color = 'green';

                return {
                    path: googleMaps.SymbolPath.CIRCLE,
                    fillColor: true_color,
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
        var btLocale = {
            en : "en-US",
            es : "es-ES",
            fr : "fr-FR",
            ru : "ru-RU",
            ar : "ar-EG",
            zh : "zh-CN"
        };

        $(s.TABLE).bootstrapTable('destroy');
        $(s.TABLE).bootstrapTable({
            data : data,
            locale: btLocale[C.lang.toLowerCase()],
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

    Maps.prototype._toggleLoading = function () {
        setTimeout(function(){
            if( $("[data-page=maps]").css('opacity') == '1') {
                $('div[data-page="loaded"]').show();
                $('div[data-page="maps"]').css('opacity','0.5');
            } else {
                $('div[data-page="loaded"]').hide();
                $('div[data-page="maps"]').css('opacity','1');
            }
        }, 150);

    }

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
        $('#data_international').select2({ width: '100%' , theme: "bootstrap" });
        this._toggleLoading();
        this._updateFilter();

    };

    Maps.prototype._updateFilter = function (selection) {

        $('#data_filter').empty();
        $('#data_filter').append('<option value="0">'+labels[Clang]['maps_selection_all']+'</option>');

        if (selection == "genus" || selection == "species") {
            $('#data_filter').append('<option value="10">'+labels[Clang]['maps_above_10']+'</option>');
            $('#data_filter').append('<option value="100">'+labels[Clang]['maps_above_100']+'</option>');
        } else {
            $('#data_filter').append('<option value="5000">'+labels[Clang]['maps_above_5000']+'</option>');
            $('#data_filter').append('<option value="10000">'+labels[Clang]['maps_above_10000']+'</option>');
            $('#data_filter').append('<option value="50000">'+labels[Clang]['maps_above_50000']+'</option>');
        }
        $('#data_filter').select2({ width: '100%',  theme: "bootstrap" });


    }

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
        this.currentYear = $('#year').val();

    };

    Maps.prototype._bindEventListeners = function () {

        var self = this;

        $('#showasmap').on('click', function () {
            $('#maped').toggle();
            $('#tabled').toggle();
            $('[data-role = filters]').toggle();

            if ($('#map').is(":visible")) {
                self._toggleLoading();
                self._processMap($('#data_showed').val());
                $('#btn_text').html(labels[Clang]['maps_table_label'])
            } else {
                $('#btn_text').html(labels[Clang]['maps_map_label'])
            }

        });

        $('#year').on('change', function () {
            self._toggleLoading();
            setTimeout(function(){ self._processMap($('#data_showed').val()); }, 200);
        });

        $('#data_international').on('change', function () {
            self._toggleLoading();
            setTimeout(function(){ self._processMap($('#data_showed').val()); }, 200);
        });

        $('#data_showed').on('change', function () {
            self._updateFilter($('#data_showed').val());
            self._toggleLoading();
            setTimeout(function(){ self._processMap($('#data_showed').val()); }, 200);
        });

        $('#data_filter').on('change', function () {
            self._toggleLoading();
            setTimeout(function(){ self._processMap($('#data_showed').val()); }, 200);
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