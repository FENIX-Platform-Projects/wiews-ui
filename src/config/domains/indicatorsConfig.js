/*global define*/
define(["highcharts", "../../config/config", "../../nls/labels", "../../config/domains/downloadDataDefaultValues", "../../config/domains/visualizeDataDefaultValues"], function (Highcharts, C, labels, DOWNLOAD_DV, VISUALIZE_DV) {

    "use strict";

    var Clang = C.lang.toLowerCase();

    return {
       "1": {
           downloadData: {
               filter: {
                   dd_filter_item_1_1: {
                       selector: {
                           id: "tree"
                       },
                       cl: {
                           uid: "ISO3"
                       },
                       template: {
                           hideSwitch: true,
                           hideRemoveButton: true
                       }
                   },
                   dd_filter_item_1_2: {
                       selector: {
                           id: "tree"
                       },
                       cl: {
                           uid: "wiews_m49_region"
                       },
                       template: {
                           hideSwitch: true,
                           hideRemoveButton: true
                       }
                   },
                   dd_filter_item_1_3: {
                       selector: {
                           id: "tree"
                       },
                       cl: {
                           uid: "wiews_fao_region"
                       },
                       template: {
                           hideSwitch: true,
                           hideRemoveButton: true
                       }
                   },
                   dd_filter_item_1_4: {
                       selector: {
                           id: "tree"
                       },
                       cl: {
                           uid: "mdg_region"
                       },
                       template: {
                           hideSwitch: true,
                           hideRemoveButton: true
                       }
                   },
                   dd_filter_item_1_5: {
                       selector: {
                           id: "tree"
                       },
                       cl: {
                           uid: "sdg_region"
                       },
                       template: {
                           hideSwitch: true,
                           hideRemoveButton: true
                       }
                   },
                   dd_filter_item_1_6: {
                       selector: {
                           id: "tree"
                       },
                       cl: {
                           uid: "wiews_cgrfa"
                       },
                       template: {
                           hideSwitch: true,
                           hideRemoveButton: true
                       }
                   },
                   dd_filter_item_1_7: {
                       selector: {
                           id: "tree"
                       },
                       cl: {
                           uid: "wiews_itpgrfa"
                       },
                       template: {
                           hideSwitch: true,
                           hideRemoveButton: true
                       }
                   },
                   dd_filter_item_2: {
                       selector: {
                           id: "tree",
                           source: [
                               {value: "20", label: "Number of accessions conserved ex situ under medium or long-term conditions"}
                           ],
                           default: ["20"]
                       },
                       template: {
                           hideSwitch: true,
                           hideRemoveButton: true
                       }
                   },
                   dd_filter_item_3: {
                       selector: {
                           id: "tree"
                       },
                       cl: {
                           uid: "wiews_iteration"
                       },
                       template: {
                           hideSwitch: true,
                           hideRemoveButton: true
                       }
                   },
                   dd_filter_item_4: {
                       selector: {
                           id: "tree"
                       },
                       cl: {
                           uid: "wiews_m49"
                       },
                       template: {
                           hideSwitch: true,
                           hideRemoveButton: true
                       }
                   }


               },
               dashboard: {}
           },
           visualizeData: {
               filter: {
                   vd_filter_item_1: {
                       selector: {
                           id: "dropdown",
                           default: VISUALIZE_DV["1_filter-vd_filter_item_1"],
                           config: {
                               plugins: ['remove_button']
                           },
                           noElement: false
                       },
                       cl: {
                           uid: "wiews_genus"
                       },
                       template: {
                           title: labels[Clang]['1_filter-vd_filter_item_1_title']
                       }
                   },
                   vd_filter_item_2: {

                       selector: {
                           id: "dropdown",
                           default: VISUALIZE_DV["1_filter-vd_filter_item_2"],
                           config: {
                               plugins: ['remove_button']
                           },
                           noElement: false
                       },
                       cl: {
                           uid: "wiews_m49",
                           level : "2",
                           levels : "1"
                       },
                       template: {
                           title: labels[Clang]['1_filter-vd_filter_item_2_title']
                       }
                   },
                   vd_filter_item_3: {

                       selector: {
                           id: "dropdown",
                           default: VISUALIZE_DV["1_filter-vd_filter_item_3"],
                           config : {
                               maxItems: 1
                           }
                       },
                       cl: {
                           uid: "wiews_iteration"
                       },
                       template: {
                           title: labels[Clang]['1_filter-vd_filter_item_3_title']
                       }
                   }
               },
               dashboard: {

                   uid: "VisualizaDataDashboard",
                   items: [
                   //     {
                   //         id: 'vd_dashboard_item_1',
                   //         type: 'map',
                   //         config: {
                   //             geoSubject: 'gaul0',
                   //             colorRamp: 'GnBu',  //Blues, Greens,
                   //             //colorRamp values: http://fenixrepo.fao.org/cdn/fenix/fenix-ui-map-datasets/colorramp.png
                   //
                   //             legendtitle: 'ODA',
                   //
                   //             fenix_ui_map: {
                   //
                   //                 plugins: {
                   //                     fullscreen: false,
                   //                     disclaimerfao: false
                   //                 },
                   //                 guiController: {
                   //                     overlay: false,
                   //                     baselayer: false,
                   //                     wmsLoader: false
                   //                 },
                   //
                   //                 baselayers: {
                   //                     "cartodb": {
                   //                         title_en: "Baselayer",
                   //                         url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                   //                         subdomains: 'abcd',
                   //                         maxZoom: 19
                   //                     }
                   //                 },
                   //                 labels: true,
                   //                 boundaries: true
                   //             }
                   //         },
                   //
                   //
                   //         // filterFor: { "filter_map": ['year', 'oda']},
                   //         filterFor: ["vd_filter_item_1", "vd_filter_item_2", "vd_filter_item_3"],
                   //         //
                   //         //
                   //         // postProcess: [
                   //         //     {
                   //         //         "name": "filter",
                   //         //         "sid": [
                   //         //             {
                   //         //                 "uid": "adam_browse_sector_recipient"
                   //         //             }
                   //         //         ],
                   //         //         "parameters": {
                   //         //             "columns": [ "gaul0", "value", "unitcode"],
                   //         //             "rows": {
                   //         //                 "!gaul0": {
                   //         //                     "codes": [
                   //         //                         {
                   //         //                             "uid": "GAUL0",
                   //         //                             "version": "2014",
                   //         //                             "codes": [
                   //         //                                 "NA",
                   //         //                                 "ZZZZZ"
                   //         //                             ]
                   //         //                         }
                   //         //                     ]
                   //         //                 },
                   //         //                 "oda": {
                   //         //                     "codes": [
                   //         //                         {
                   //         //                             "uid": "oda_crs",
                   //         //                             "version": "2016",
                   //         //                             "codes": [
                   //         //                                 "usd_commitment"
                   //         //                             ]
                   //         //                         }
                   //         //                     ]
                   //         //                 },
                   //         //                 "year": {
                   //         //                     "time": [
                   //         //                         {
                   //         //                             "from": 2000,
                   //         //                             "to": 2015
                   //         //                         }
                   //         //                     ]
                   //         //                 }
                   //         //             }
                   //         //         },
                   //         //         "rid":{"uid":"filter_map"}
                   //         //     },
                   //         //     {
                   //         //         "name": "group",
                   //         //         "parameters": {
                   //         //             "by": [
                   //         //                 "gaul0"
                   //         //             ],
                   //         //             "aggregations": [
                   //         //                 {
                   //         //                     "columns": ["value"],
                   //         //                     "rule": "SUM"
                   //         //                 },
                   //         //                 {
                   //         //                     "columns": ["unitcode"],
                   //         //                     "rule": "max"
                   //         //                 }
                   //         //             ]
                   //         //         }
                   //         //     }
                   //         // ]
                   //         postProcess: [
                   //         {
                   //             "name": "wiews_area_filter",
                   //             "sid": [ { "uid": "wiews_regions_mapping" } ],
                   //             "result" : false,
                   //             "parameters": {
                   //                 "m49": {
                   //                     "codes": [
                   //                         {
                   //                             "uid": "wiews_m49",
                   //                             "codes": [ "142" ]//QUI
                   //                         }
                   //                     ]
                   //                 }
                   //             }
                   //         },
                   //
                   //     {
                   //         "sid": [ { "uid": "indicator20" } ],
                   //         "name" : "select",
                   //         "parameters" : {
                   //             "query" : "where m49_country in <<required_countries>>",
                   //             "values" : {
                   //                 "genus":null,
                   //                 "iteration" : null,
                   //                 "domain" : null,
                   //                 "element" : null,
                   //                 "biologicalAccessionId" : null,
                   //                 "country" : null,
                   //                 "stakeholder" : null,
                   //                 "value" : null,
                   //                 "um" : null
                   //             }
                   //         }
                   //     },
                   //
                   //     {
                   //         "name": "filter",
                   //         "parameters": {
                   //             "columns": [
                   //                 "country",
                   //                 "value",
                   //                 "um"
                   //             ],
                   //             "rows": {
                   //                 "iteration": {
                   //                     "codes": [
                   //                         {
                   //                             "uid": "wiews_iteration",
                   //                             "codes": [ "1" ]//QUI
                   //                         }
                   //                     ]
                   //                 },
                   //                 "genus": {
                   //                     "codes": [
                   //                         {
                   //                             "uid": "wiews_genus",
                   //                             "codes": [ "abarema" ]//QUI
                   //                         }
                   //                     ]
                   //                 }
                   //
                   //             }
                   //         }
                   //     },
                   //
                   //     {
                   //         "name": "group",
                   //         "parameters": {
                   //             "by": [
                   //                 "country"
                   //             ],
                   //             "aggregations": [
                   //                 {
                   //                     "columns": [ "value" ],
                   //                     "rule": "SUM"
                   //                 },
                   //                 {
                   //                     "columns": [ "um" ],
                   //                     "rule": "max"
                   //                 }
                   //             ]
                   //         }
                   //     }
                   //
                   //
                   //
                   //
                   // ]
                   //
                   //     },
                       {
                           //Average annual growth rate 010103
                           id: "vd_dashboard_item_1", //ref [data-item=':id'] // 010103  Average annual growth rate
                           type: "map", //chart || map || olap,
                           config: {
                               geoSubject: 'gaul0',
                               colorRamp: 'GnBu',  //Blues, Greens,
                               //colorRamp values: http://fenixrepo.fao.org/cdn/fenix/fenix-ui-map-datasets/colorramp.png

                               legendtitle: 'WIEWS',
                               fenix_ui_map: {
                                   guiController: {
                                       overlay: false,
                                       baselayer: false,
                                       wmsLoader: false
                                   },
                                   plugins: {
                                           fullscreen: false,
                                           disclaimerfao: false
                                   },
                                   baselayers: {
                                       "cartodb": {
                                           title_en: "Baselayer",
                                           url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                                           subdomains: 'abcd',
                                           maxZoom: 19
                                       }
                                   },

                                   labels: true,
                                   boundaries: true
                              }
                           },
                           // filterFor: {
                           //         "wiews_m49": ['vd_filter_item_2']
                           //     },
                           //filterFor: ["vd_filter_item_1", "vd_filter_item_2", "vd_filter_item_3"],
                           postProcess: [
                           {
                               "name": "wiews_area_filter",
                               "sid": [ { "uid": "wiews_regions_mapping" } ],
                               "result" : false,
                               "parameters": {
                                   "m49": {
                                       "codes": [
                                           {
                                               "uid": "wiews_m49",
                                               "codes": [ "142" ]
                                           }
                                       ]
                                   }
                               }
                           },

                       {
                           "sid": [ { "uid": "indicator20" } ],
                           "name" : "select",
                           "parameters" : {
                               "query" : "where m49_country in <<required_countries>>",
                               "values" : {
                                   "genus":null,
                                   "iteration" : null,
                                   "domain" : null,
                                   "element" : null,
                                   "biologicalAccessionId" : null,
                                   "country" : null,
                                   "stakeholder" : null,
                                   "value" : null,
                                   "um" : null
                               }
                           }
                       },

                       {
                           "name": "filter",
                           "parameters": {
                               "columns": [
                                   "country",
                                   "value",
                                   "um"
                               ],
                               "rows": {
                                   "iteration": {
                                       "codes": [
                                           {
                                               "uid": "wiews_iteration",
                                               "codes": [ "1" ]
                                           }
                                       ]
                                   }

                               }
                           }
                       },

                       {
                           "name": "group",
                           "parameters": {
                               "by": [
                                   "country"
                               ],
                               "aggregations": [
                                   {
                                       "columns": [ "value" ],
                                       "rule": "SUM"
                                   },
                                   {
                                       "columns": [ "um" ],
                                       "rule": "max"
                                   }
                               ]
                           }
                       },






                   ]
                           // filterFor: {
                           //     "filtered_ds": ['CountryCode']
                           // },
                           // postProcess: [
                           //     {
                           //         "name": "join",
                           //         "sid": [
                           //             {
                           //                 "uid": "filtered_ds"
                           //             },
                           //             {
                           //                 "uid": "last_year_country"
                           //             }
                           //         ],
                           //         "parameters": {
                           //             "joins": [
                           //                 [
                           //                     {
                           //                         "type": "id",
                           //                         "value": "CountryCode"
                           //                     },
                           //                     {
                           //                         "type": "id",
                           //                         "value": "Year"
                           //                     }
                           //
                           //                 ],
                           //                 [
                           //                     {
                           //                         "type": "id",
                           //                         "value": "CountryCode"
                           //                     },
                           //                     {
                           //                         "type": "id",
                           //                         "value": "Year"
                           //                     }
                           //
                           //                 ]
                           //             ],
                           //             "values": []
                           //         },
                           //         "rid": {
                           //             "uid": "filtered_join"
                           //         }
                           //     },
                           //
                           //     {
                           //         "name": "filter",
                           //         "sid": [
                           //             {
                           //                 "uid": "Uneca_PopulationNew"
                           //             }
                           //         ],
                           //         "parameters": {
                           //             "columns": [
                           //                 "CountryCode",
                           //                 "Year",
                           //                 "Value"
                           //             ],
                           //             "rows": {
                           //
                           //                 "IndicatorCode": {
                           //                     "codes": [
                           //                         {
                           //                             "uid": "UNECA_ClassificationOfActivities",
                           //                             "codes": [
                           //                                 "010103"
                           //                             ]
                           //                         }
                           //                     ]
                           //                 },
                           //                 "CountryCode": {
                           //                     "codes": [
                           //                         {
                           //                             "uid": "ISO3",
                           //                             "codes": [
                           //                                 "DZA"
                           //                             ]
                           //                         }
                           //                     ]
                           //                 }
                           //             }
                           //         },
                           //         "rid": {
                           //             "uid": "filtered_ds"
                           //         }
                           //     },
                           //
                           //     {
                           //         "name": "group",
                           //         "sid": [
                           //             {
                           //                 "uid": "filtered_ds"
                           //             }
                           //         ],
                           //         "parameters": {
                           //             "by": [                   //
                           //                 "CountryCode"
                           //             ],
                           //             "aggregations": [
                           //                 {
                           //                     "columns": [
                           //                         "Year"
                           //                     ],
                           //                     "rule": "max"
                           //                 }
                           //             ]
                           //         },
                           //         "rid": {
                           //             "uid": "last_year_country"
                           //         }
                           //     },
                           //     {
                           //         "name": "group",
                           //         "sid": [
                           //             {
                           //                 "uid": "filtered_join"
                           //             }
                           //         ],
                           //         "parameters": {
                           //             "by": [
                           //                 "CountryCode"
                           //             ],
                           //             "aggregations": [
                           //                 {
                           //                     "columns": [
                           //                         "filtered_ds_Value"
                           //                     ],
                           //                     "rule": "max"
                           //                 }
                           //             ]
                           //         }
                           //     }
                           //
                           // ]
                       },
                       {
                           id: 'vd_dashboard_item_2', // TOP RECIPIENTS Vs OTHER RECIPIENTS
                           type: 'chart',
                           config: {
                               type: "pieold",
                               x: ["biologicalAccessionId"], //x axis and series
                               series: ["unitname"], // series
                               y: ["value"],//Y dimension
                               aggregationFn: {"value": "sum"},
                               useDimensionLabelsIfExist: false,// || default raw else fenixtool

                               config: {
                                   //colors: ['#5DA58D'],
                                   legend: {
                                       title: {
                                           text: null
                                       }
                                   },
                                   plotOptions: {
                                       pie: {
                                           showInLegend: true
                                       },
                                       series: {
                                           point: {
                                               events: {
                                                   legendItemClick: function () {
                                                       return false; // <== returning false will cancel the default action
                                                   }
                                               }
                                           }
                                       }
                                   },
                                   chart: {
                                       events: {
                                           load: function (event) {
                                               if (this.options.chart.forExport) {
                                                   $.each(this.series, function (i, serie) {
                                                       serie.update({
                                                           dataLabels: {
                                                               enabled: false
                                                           }
                                                       }, false);
                                                   });
                                                   this.redraw();
                                               }
                                           }
                                       }
                                   },
                                   tooltip: {
                                       style: {width: '200px', whiteSpace: 'normal'},
                                       formatter: function () {
                                           var val = this.y;
                                           // if (val.toFixed(0) < 1) {
                                           //     val = (val * 1000).toFixed(2) + ' K'
                                           // } else {
                                           //     val = val.toFixed(2) + ' USD Mil'
                                           // }

                                           // return '<b>' + this.percentage.toFixed(2) + '% (' + val + ')</b>';
                                           return '<b>' + val + '</b>';
                                       }
                                   },
                                   exporting: {
                                       enabled: true
                                       // buttons: {
                                       //     toggleDataLabelsButton: {
                                       //         enabled: false
                                       //     }
                                       // },
                                       // chartOptions: {
                                       //     legend: {
                                       //         title: '',
                                       //         enabled: true,
                                       //         align: 'center',
                                       //         layout: 'vertical',
                                       //         useHTML: true,
                                       //         labelFormatter: function () {
                                       //             var val = this.y;
                                       //             if (val.toFixed(0) < 1) {
                                       //                 val = (val * 1000).toFixed(2) + ' K'
                                       //             } else {
                                       //                 val = val.toFixed(2) + ' USD Mil'
                                       //             }
                                       //
                                       //             return '<div style="width:200px"><span style="float:left;  font-size:9px">' + this.name.trim() + ': ' + this.percentage.toFixed(2) + '% (' + val + ')</span></div>';
                                       //         }
                                       //     }
                                       // }
                                   }
                               }
                           },

                           // filterFor: {
                           //     "filter_top_10_recipients_sum": ['purposecode', 'year', 'oda']
                           // },

                           postProcess: [
                               {
                                   "name": "wiews_area_filter",
                                   "sid": [ { "uid": "wiews_regions_mapping" } ],
                                   "result" : false,
                                   "parameters": {
                                       "m49": {
                                           "codes": [
                                               {
                                                   "uid": "wiews_m49",
                                                   "codes": [ "150" ]
                                               }
                                           ]
                                       }
                                   }
                               },

                               {
                                   "sid": [ { "uid": "indicator20" } ],
                                   "name" : "select",
                                   "parameters" : {
                                       "query" : "where m49_country in <<required_countries>>",
                                       "values" : {
                                           "genus":null,
                                           "iteration" : null,
                                           "domain" : null,
                                           "element" : null,
                                           "biologicalAccessionId" : null,
                                           "country" : null,
                                           "stakeholder" : null,
                                           "value" : null,
                                           "um" : null
                                       }
                                   }
                               },

                               {
                                   "name": "filter",
                                   "parameters": {
                                       "columns": [
                                           "biologicalAccessionId",
                                           "value"
                                       ],
                                       "rows": {
                                           "iteration": {
                                               "codes": [
                                                   {
                                                       "uid": "wiews_iteration",
                                                       "codes": [ "1" ]
                                                   }
                                               ]
                                           },
                                           "genus": {
                                               "codes": [
                                                   {
                                                       "uid": "wiews_genus",
                                                       "codes": [ "abarema" ]
                                                   }
                                               ]
                                           }

                                       }
                                   }
                               },

                               {
                                   "name": "select",
                                   "parameters": {
                                       "query": "WHERE biologicalAccessionId is not NULL",
                                       "queryParameters": []
                                   }
                               },

                               {
                                   "name": "group",
                                   "parameters": {
                                       "by": [
                                           "biologicalAccessionId"
                                       ],
                                       "aggregations": [
                                           {
                                               "columns": [ "value" ],
                                               "rule": "SUM"
                                           }
                                       ]
                                   }
                               }




                           ]
                       },
                       // {
                       //     id: 'vd_dashboard_item_3', // TOP RECIPIENTS Vs OTHER RECIPIENTS
                       //     type: 'chart',
                       //     config: {
                       //         type: "pieold",
                       //         x: ["indicator"], //x axis and series
                       //         series: ["unitname"], // series
                       //         y: ["value"],//Y dimension
                       //         aggregationFn: {"value": "sum"},
                       //         useDimensionLabelsIfExist: false,// || default raw else fenixtool
                       //
                       //         config: {
                       //             //colors: ['#5DA58D'],
                       //             legend: {
                       //                 title: {
                       //                     text: null
                       //                 }
                       //             },
                       //             plotOptions: {
                       //                 pie: {
                       //                     showInLegend: true
                       //                 },
                       //                 series: {
                       //                     point: {
                       //                         events: {
                       //                             legendItemClick: function () {
                       //                                 return false; // <== returning false will cancel the default action
                       //                             }
                       //                         }
                       //                     }
                       //                 }
                       //             },
                       //             chart: {
                       //                 events: {
                       //                     load: function (event) {
                       //                         if (this.options.chart.forExport) {
                       //                             $.each(this.series, function (i, serie) {
                       //                                 serie.update({
                       //                                     dataLabels: {
                       //                                         enabled: false
                       //                                     }
                       //                                 }, false);
                       //                             });
                       //                             this.redraw();
                       //                         }
                       //                     }
                       //                 }
                       //             },
                       //             tooltip: {
                       //                 style: {width: '200px', whiteSpace: 'normal'},
                       //                 formatter: function () {
                       //                     var val = this.y;
                       //                     if (val.toFixed(0) < 1) {
                       //                         val = (val * 1000).toFixed(2) + ' K'
                       //                     } else {
                       //                         val = val.toFixed(2) + ' USD Mil'
                       //                     }
                       //
                       //                     return '<b>' + this.percentage.toFixed(2) + '% (' + val + ')</b>';
                       //                 }
                       //             },
                       //             exporting: {
                       //                 enabled: true
                       //                 // buttons: {
                       //                 //     toggleDataLabelsButton: {
                       //                 //         enabled: false
                       //                 //     }
                       //                 // },
                       //                 // chartOptions: {
                       //                 //     legend: {
                       //                 //         title: '',
                       //                 //         enabled: true,
                       //                 //         align: 'center',
                       //                 //         layout: 'vertical',
                       //                 //         useHTML: true,
                       //                 //         labelFormatter: function () {
                       //                 //             var val = this.y;
                       //                 //             if (val.toFixed(0) < 1) {
                       //                 //                 val = (val * 1000).toFixed(2) + ' K'
                       //                 //             } else {
                       //                 //                 val = val.toFixed(2) + ' USD Mil'
                       //                 //             }
                       //                 //
                       //                 //             return '<div style="width:200px"><span style="float:left;  font-size:9px">' + this.name.trim() + ': ' + this.percentage.toFixed(2) + '% (' + val + ')</span></div>';
                       //                 //         }
                       //                 //     }
                       //                 // }
                       //             }
                       //         }
                       //     },
                       //
                       //     filterFor: {
                       //         "filter_top_10_recipients_sum": ['purposecode', 'year', 'oda']
                       //     },
                       //
                       //     postProcess: [
                       //         {
                       //             "name": "union",
                       //             "sid": [
                       //                 {
                       //                     "uid": "top_10_recipients_sum"
                       //                 },
                       //                 {
                       //                     "uid":"others"
                       //                 }
                       //             ],
                       //             "parameters": {
                       //             },
                       //             "rid":{"uid":"union_process"}
                       //         },
                       //
                       //         {
                       //             "name": "filter",
                       //             "sid": [
                       //                 {
                       //                     "uid": "adam_browse_sector_recipient"
                       //                 }
                       //             ],
                       //             "parameters": {
                       //                 "columns": [
                       //                     "recipientcode",
                       //                     "value",
                       //                     "unitcode"
                       //                 ],
                       //                 "rows": {
                       //                     "!recipientcode": {
                       //                         "codes": [
                       //                             {
                       //                                 "uid": "crs_recipients", // skipping regional recipient countries (e.g. "Africa, regional"; "North of Sahara, regional")
                       //                                 "version": "2016",
                       //                                 "codes": [
                       //                                     "298", "498", "798", "89", "589", "889", "189", "289","389", "380", "489", "789","689", "619", "679"
                       //                                 ]
                       //                             }
                       //                         ]
                       //                     },
                       //                     "oda": {
                       //                         "codes": [
                       //                             {
                       //                                 "uid": "oda_crs",
                       //                                 "version": "2016",
                       //                                 "codes": [
                       //                                     "usd_commitment"
                       //                                 ]
                       //                             }
                       //                         ]
                       //                     },
                       //                     "fao_sector": {
                       //                         "enumeration": [
                       //                             "1"
                       //                         ]
                       //                     },
                       //                     "year": {
                       //                         "time": [
                       //                             {
                       //                                 "from": 2000,
                       //                                 "to": 2015
                       //                             }
                       //                         ]
                       //                     }
                       //                 }
                       //             },
                       //             "rid":{"uid":"filter_top_10_recipients_sum"}
                       //         },
                       //         {
                       //             "name": "group",
                       //             "parameters": {
                       //                 "by": [
                       //                     "recipientcode"
                       //                 ],
                       //                 "aggregations": [
                       //                     {
                       //                         "columns": [
                       //                             "value"
                       //                         ],
                       //                         "rule": "SUM"
                       //                     },
                       //                     {
                       //                         "columns": [
                       //                             "unitcode"
                       //                         ],
                       //                         "rule": "max"
                       //                     }
                       //                 ]
                       //             }
                       //         },
                       //         {
                       //             "name": "order",
                       //             "parameters": {
                       //                 "value": "DESC"
                       //             },
                       //             "rid":{"uid":"filtered_dataset"}
                       //         },
                       //         {
                       //             "name": "page",
                       //             "parameters": {
                       //                 "perPage": 10,
                       //                 "page": 1
                       //             }
                       //         },
                       //         {
                       //             "name": "group",
                       //             "parameters": {
                       //                 "by": [
                       //                     "unitcode"
                       //                 ],
                       //                 "aggregations": [
                       //                     {
                       //                         "columns": [
                       //                             "value"
                       //                         ],
                       //                         "rule": "SUM"
                       //                     }
                       //                 ]
                       //             }
                       //         },
                       //         {
                       //             "name": "addcolumn",
                       //             "parameters": {
                       //                 "column": {
                       //                     "dataType": "text",
                       //                     "id": "indicator",
                       //                     "title": {
                       //                         "EN": "Indicator"
                       //                     },
                       //                     "domain": {
                       //                         "codes": [
                       //                             {
                       //                                 "extendedName": {
                       //                                     "EN": "Adam Processes"
                       //                                 },
                       //                                 "idCodeList": "adam_processes"
                       //                             }
                       //                         ]
                       //                     },
                       //                     "subject": null
                       //                 },
                       //                 "value": "Top Recipient Countries"
                       //             },
                       //             "rid": {
                       //                 "uid": "top_10_recipients_sum"
                       //             }
                       //         },
                       //         {
                       //             "name": "group",
                       //             "sid":[{"uid":"filtered_dataset"}],
                       //             "parameters": {
                       //                 "by": [
                       //                     "unitcode"
                       //                 ],
                       //                 "aggregations": [
                       //                     {
                       //                         "columns": [
                       //                             "value"
                       //                         ],
                       //                         "rule": "SUM"
                       //                     }
                       //
                       //                 ]
                       //             }
                       //         },
                       //         {
                       //             "name": "addcolumn",
                       //             "parameters": {
                       //                 "column": {
                       //                     "dataType": "text",
                       //                     "id": "indicator",
                       //                     "title": {
                       //                         "EN": "Indicator"
                       //                     },
                       //                     "domain": {
                       //                         "codes": [
                       //                             {
                       //                                 "extendedName": {
                       //                                     "EN": "Adam Processes"
                       //                                 },
                       //                                 "idCodeList": "adam_processes"
                       //                             }
                       //                         ]
                       //                     },
                       //                     "subject": null
                       //                 },
                       //                 "value": "sum of all recipients"
                       //             },
                       //             "rid": {
                       //                 "uid": "top_all_recipients_sum"
                       //             }
                       //         },
                       //         {
                       //             "name": "join",
                       //             "sid": [
                       //                 {
                       //                     "uid": "top_all_recipients_sum"
                       //                 },
                       //                 {
                       //                     "uid": "top_10_recipients_sum"
                       //                 }
                       //             ],
                       //             "parameters": {
                       //                 "joins": [
                       //                     [
                       //
                       //                         {
                       //                             "type": "id",
                       //                             "value": "unitcode"
                       //                         }
                       //                     ],
                       //                     [
                       //                         {
                       //                             "type": "id",
                       //                             "value": "unitcode"
                       //                         }
                       //
                       //                     ]
                       //                 ],
                       //                 "values": [
                       //                 ]
                       //             },
                       //             "rid":{"uid":"join_process_total_recipients"}
                       //         },
                       //         {
                       //             "name": "addcolumn",
                       //             "sid":[{"uid":"join_process_total_recipients"}],
                       //             "parameters": {
                       //                 "column": {
                       //                     "dataType": "number",
                       //                     "id": "value",
                       //                     "title": {
                       //                         "EN": "Value"
                       //                     },
                       //                     "subject": null
                       //                 },
                       //                 "value": {
                       //                     "keys":  ["1 = 1"],
                       //                     "values":["top_all_recipients_sum_value - top_10_recipients_sum_value"]
                       //                 }
                       //             }
                       //         },
                       //         {
                       //             "name": "filter",
                       //             "parameters": {
                       //                 "columns": [
                       //                     "value",
                       //                     "unitcode"
                       //                 ]
                       //             }
                       //         },
                       //         {
                       //             "name": "addcolumn",
                       //             "parameters": {
                       //                 "column": {
                       //                     "dataType": "text",
                       //                     "id": "indicator",
                       //                     "title": {
                       //                         "EN": "Indicator"
                       //                     },
                       //                     "domain": {
                       //                         "codes": [
                       //                             {
                       //                                 "extendedName": {
                       //                                     "EN": "Adam Processes"
                       //                                 },
                       //                                 "idCodeList": "adam_processes"
                       //                             }
                       //                         ]
                       //                     },
                       //                     "subject": null
                       //                 },
                       //                 "value": "Other Recipients"
                       //             },
                       //             "rid": {
                       //                 "uid": "others"
                       //             }
                       //         }
                       //     ]
                       //  }
                       {
                           id: 'vd_dashboard_item_3', // TOP DONORS
                           type: 'chart',
                           config: {
                               type: "column",
                               x: ["country"], //x axis
                               //series: ["data"], // series
                               y: ["value"],//Y dimension
                               aggregationFn: {"value": "sum"},
                               useDimensionLabelsIfExist: true,// || default raw else fenixtool

                               config: {
                                   title: {
                                       text: 'Accessions by country'
                                   },
                                   colors: ['#008080'],
                                   legend: {
                                       enabled: false
                                       // title: {
                                       //     text: null
                                       // }
                                   },
                                   plotOptions: {
                                       column: {
                                           events: {
                                               legendItemClick: function () {
                                                   return false;
                                               }
                                           }
                                       },
                                       allowPointSelect: false
                                   },
                                   exporting: {
                                           enabled: true
                                   }

                               }

                           },

                           // filterFor: {
                           //     "filter_donors": ['year', 'oda', 'purposecode']
                           // },
                           postProcess: [
                               {
                                   "name": "wiews_area_filter",
                                   "sid": [ { "uid": "wiews_regions_mapping" } ],
                                   "result" : false,
                                   "parameters": {
                                       "m49": {
                                           "codes": [
                                               {
                                                   "uid": "wiews_m49",
                                                   "codes": [ "150" ]
                                               }
                                           ]
                                       }
                                   }
                               },

                               {
                                   "sid": [ { "uid": "indicator20" } ],
                                   "name" : "select",
                                   "parameters" : {
                                       "query" : "where m49_country in <<required_countries>>",
                                       "values" : {
                                           "genus":null,
                                           "iteration" : null,
                                           "domain" : null,
                                           "element" : null,
                                           "biologicalAccessionId" : null,
                                           "country" : null,
                                           "stakeholder" : null,
                                           "value" : null,
                                           "um" : null
                                       }
                                   }
                               },

                               {
                                   "name": "filter",
                                   "parameters": {
                                       "columns": [
                                           "country",
                                           "value",
                                           "um"
                                       ],
                                       "rows": {
                                           "iteration": {
                                               "codes": [
                                                   {
                                                       "uid": "wiews_iteration",
                                                       "codes": [ "1" ]
                                                   }
                                               ]
                                           }
                                       }
                                   }
                               },

                               {
                                   "name": "group",
                                   "parameters": {
                                       "by": [
                                           "country"
                                       ],
                                       "aggregations": [
                                           {
                                               "columns": [ "value" ],
                                               "rule": "SUM"
                                           },
                                           {
                                               "columns": [ "um" ],
                                               "rule": "max"
                                           }
                                       ]
                                   }
                               },
                               {
                                   "name": "order",
                                   "parameters": {
                                       "value": "DESC"
                                   }
                               },
                               {
                                   "name": "page",
                                   "parameters": {
                                       "perPage": 10,
                                       "page": 1
                                   }
                               }




                           ]

                       },
                       {
                           id: 'vd_dashboard_item_4', // TOP DONORS
                           type: 'chart',
                           config: {
                               type: "column",
                               x: ["stakeholder"], //x axis
                               //series: ["data"], // series
                               y: ["value"],//Y dimension
                               aggregationFn: {"value": "sum"},
                               useDimensionLabelsIfExist: true,// || default raw else fenixtool

                               config: {
                                   title: {
                                       text: 'Accessions by stakeholder'
                                   },
                                   colors: ['#008080'],
                                   legend: {
                                       enabled: false
                                       // title: {
                                       //     text: null
                                       // }
                                   },
                                   plotOptions: {
                                       column: {
                                           events: {
                                               legendItemClick: function () {
                                                   return false;
                                               }
                                           }
                                       },
                                       allowPointSelect: false
                                   },
                                   exporting: {
                                       enabled: true
                                   }

                               }

                           },

                           // filterFor: {
                           //     "filter_donors": ['year', 'oda', 'purposecode']
                           // },
                           postProcess: [
                               {
                                   "name": "wiews_area_filter",
                                   "sid": [ { "uid": "wiews_regions_mapping" } ],
                                   "result" : false,
                                   "parameters": {
                                       "m49": {
                                           "codes": [
                                               {
                                                   "uid": "wiews_m49",
                                                   "codes": [ "150" ]
                                               }
                                           ]
                                       }
                                   }
                               },

                               {
                                   "sid": [ { "uid": "indicator20" } ],
                                   "name" : "select",
                                   "parameters" : {
                                       "query" : "where m49_country in <<required_countries>>",
                                       "values" : {
                                           "genus":null,
                                           "iteration" : null,
                                           "domain" : null,
                                           "element" : null,
                                           "biologicalAccessionId" : null,
                                           "country" : null,
                                           "stakeholder" : null,
                                           "value" : null,
                                           "um" : null
                                       }
                                   }
                               },

                               {
                                   "name": "filter",
                                   "parameters": {
                                       "columns": [
                                           "stakeholder",
                                           "value",
                                           "um"
                                       ],
                                       "rows": {
                                           "iteration": {
                                               "codes": [
                                                   {
                                                       "uid": "wiews_iteration",
                                                       "codes": [ "1" ]
                                                   }
                                               ]
                                           },
                                           "!stakeholder" :{
                                               "codes": [
                                                   {
                                                       "uid": "wiews_stakeholder",
                                                       "codes": [ "ZZZ" ]
                                                   }
                                               ]
                                           }
                                       }
                                   }
                               },

                               {
                                   "name": "group",
                                   "parameters": {
                                       "by": [
                                           "stakeholder"
                                       ],
                                       "aggregations": [
                                           {
                                               "columns": [ "value" ],
                                               "rule": "SUM"
                                           },
                                           {
                                               "columns": [ "um" ],
                                               "rule": "max"
                                           }
                                       ]
                                   }
                               },
                               {
                                   "name": "order",
                                   "parameters": {
                                       "value": "DESC"
                                   }
                               },
                               {
                                   "name": "page",
                                   "parameters": {
                                       "perPage": 10,
                                       "page": 1
                                   }
                               }





                           ]


                       }

                   ]
               }
           }
        }
    }

});
