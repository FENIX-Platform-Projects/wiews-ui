define(["highcharts", "../../../config/config", "../../../config/domains/visualizeDataDefaultValues", "../../../nls/labels"],
function (Highcharts, C, VISUALIZE_DV, labels) {

    "use strict";

    var Clang = C.lang.toLowerCase();
    var ClangUp = C.lang.toUpperCase();

    return {
        downloadData: {
            filter: {
                dd_filter_item_1_1: {
                    selector: {
                        id: "tree"
                    },
                    cl: {
                        uid: "ISO3"
                    }
                },
                dd_filter_item_1_2: {
                    selector: {
                        id: "tree"
                    },
                    cl: {
                        uid: "wiews_m49_regions"
                    }
                },
                dd_filter_item_1_3: {
                    selector: {
                        id: "tree"
                    },
                    cl: {
                        uid: "wiews_fao_region"
                    }
                },
                dd_filter_item_2: {
                    selector: {
                        id: "tree",
                        source: [
                            {value: "20", label: "Number of accessions conserved ex situ under medium or long-term conditions"}
                        ],
                        default: ["20"],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    }
                },
                dd_filter_item_3: {
                    selector: {
                        id: "tree",
                        default: ['1']
                    },
                    cl: {
                        uid: "wiews_iteration"
                    }
                },
                dd_filter_item_4: {
                    selector: {
                        id: "tree",
                        source: [
                            {value: "stk", label: "Stakeholders"}
                        ]
                    }
                }
            },
            dashboard: {
                "uid": "DownloadDataDashboard",
                "items": [
                    {
                        "id": "dd_dashboard_item",
                        "type": "table",

                        // WIEWS

                        "config": {
                            "groupedRow": false,
                            "formatter": "localstring",
                            "showRowHeaders": true,
                            "values": [
                                'value',
                                'indicator_label'
                            ],
                            "rows": [
                                "domain",
                                "m49_country",
                                "iteration",
                                //"indicator",
                                //"um",
                                //"country",
                                //"element"

                            ],
                            "aggregations": [],
                            "inputFormat": "fenixtool",
                            "config": {
                                "pageSize": 150,
                                "autoSelectFirstRow": false,
                                "columns": [

                                    {
                                        "id": "domain",
                                        "fieldIndex": 0,
                                        "width": 150
                                    },
                                    {
                                        "id": "m49_country",
                                        "fieldIndex": 1,
                                        "width": 200
                                    },
                                    {
                                        "id": "iteration",
                                        "fieldIndex": 2,
                                        "width": 100
                                    },
                                    {
                                        "id": "value",
                                        "fieldIndex": 3,
                                        "width": 100
                                    },
                                    {
                                        "id": "indicator_label",
                                        "fieldIndex": 4,
                                        "width": 6000
                                    }
                                    /*
                                     ,{
                                     "id": "indicator",
                                     "fieldIndex": 5,
                                     "width": 350
                                     }
                                     */

                                ]
                            }
                        },
                        "filterFor": {
                            "wiews_filter_selection" : ["element", "iteration", "m49_country", "domain"]
                        },
                        "postProcess": [

                            {
                                "name": "wiews_area_filter",
                                "sid": [ { "uid": "wiews_regions_mapping" } ],
                                "result" : false,
                                "parameters": {
                                    "m49": {
                                        "codes": [
                                            {
                                                "uid": "wiews_m49",
                                                "codes": [ "WITC","150" ]
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                "sid": [ { "uid": "indicator20" } ],
                                "name":"addcolumn",
                                "parameters":{
                                    "column":{
                                        "dataType":"text",
                                        "id":"indicator_label",
                                        "title":{
                                            "EN":"Indicator"
                                        }
                                    },
                                    "value": ""
                                }
                            },
                            {
                                "name" : "select",
                                "parameters" : {
                                    "query" : "where m49_country in <<required_countries>>",
                                    "values" : {
                                        "iteration" : null,
                                        "domain" : null,
                                        "element" : null,
                                        "biologicalAccessionId" : null,
                                        "country" : null,
                                        "m49_country" : null,
                                        "stakeholder" : null,
                                        "value" : null,
                                        "um" : null,
                                        "indicator_label" : "case when element = 'stk' then 'Indicator (' || stakeholder || ' / ' || stakeholder_en || ')' else element_en end"
                                    }
                                }
                            },
                            {
                                "name": "filter",
                                "parameters": {
                                    "columns": [
                                        "domain",
                                        "m49_country",
                                        "indicator",
                                        "indicator_label",
                                        "iteration",
                                        "value",
                                        "um",
                                        "country",
                                        "element"
                                    ],
                                    "rows": {
                                        "element": {
                                            "codes": [
                                                {
                                                    "uid": "wiews_elements",
                                                    "codes": [ "ind", "nfp", "nfpa", "stk" ]
                                                }
                                            ]
                                        },
                                        "iteration": {
                                            "codes": [
                                                {
                                                    "uid": "wiews_iteration",
                                                    "codes": [ "1" ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                "rid": {"uid": "wiews_filter_selection"}
                            }

                        ],



                        // ADAM
                        /*
                         "config": {
                         "groupedRow": false,
                         "formatter": "localstring",
                         "showRowHeaders": true,
                         "rows": [
                         "purposecode",
                         "undaf_stated_priority",
                         "cpf_stated_priority",
                         "undaf_period",
                         "cpf_period",
                         "recipientcode"
                         ],
                         "aggregations": [],
                         "inputFormat": "fenixtool",
                         "config": {
                         "pageSize": 150,
                         "autoSelectFirstRow": false,
                         "columns": []
                         }
                         },
                         "filterFor": {
                         "filter_priorities": ["recipientcode"]
                         },
                         "postProcess": [
                         {
                         "name": "filter",
                         "sid": [
                         {
                         "uid": "adam_cpf_undaf_priorities_table"
                         }
                         ],
                         "parameters": {
                         "columns": [
                         "purposecode",
                         "undaf_stated_priority",
                         "cpf_stated_priority",
                         "undaf_period",
                         "cpf_period",
                         "recipientcode"
                         ],
                         "rows": {
                         "recipientcode": {
                         "codes": [
                         {
                         "uid": "crs_recipients",
                         "version": "2016",
                         "codes": [
                         "625"
                         ]
                         }
                         ]
                         }
                         }
                         },
                         "rid": {
                         "uid": "filter_priorities"
                         }
                         },
                         {
                         "name": "group",
                         "parameters": {
                         "by": [
                         "purposecode",
                         "undaf_stated_priority",
                         "cpf_stated_priority",
                         "undaf_period",
                         "cpf_period",
                         "recipientcode"
                         ],
                         "aggregations": []
                         }
                         }
                         ]
                         */

                    }
                ],
                /*
                 "filter": {
                 "valid": true,
                 "labels": {
                 "recipientcode": {
                 "555": "Afghanistan"
                 },
                 "donorcode": {
                 "all": "All"
                 },
                 "year-from": [],
                 "year-to": [],
                 "year": {
                 "range": "2015-2015"
                 }
                 },
                 "values": {
                 "recipientcode": [
                 "555"
                 ],
                 "donorcode": [],
                 "year-from": [],
                 "year-to": [],
                 "year": [
                 {
                 "value": "2015",
                 "parent": "from"
                 },
                 {
                 "value": "2015",
                 "parent": "to"
                 }
                 ],
                 "uid": []
                 }
                 },
                 */

                //"environment": "demo" // < ADAM
                "environment": "production" // < WIEWS
            }

        },
        visualizeData: {
            // filter: {
            //     items: [
            //      {
            //         id: 'vd_filter_item_1',
            //         type: 'genreTree',
            //         default: VISUALIZE_DV["1_filter-vd_filter_item_1"],
            //         title: labels[Clang]['1_filter-vd_filter_item_1_title']
            //     },
            //     {
            //         id: 'vd_filter_item_2_1',
            //         type: 'locationTree_ISO3',
            //         default: VISUALIZE_DV["1_filter-vd_filter_item_2"]
            //       //  title: labels[Clang]['1_filter-vd_filter_item_2_title']
            //     },
            //     {
            //         id: 'vd_filter_item_2_2',
            //         type: 'locationTree_m49',
            //         default: VISUALIZE_DV["1_filter-vd_filter_item_2"]
            //        // title: labels[Clang]['1_filter-vd_filter_item_2_title']
            //     },
            //     {
            //         id: 'vd_filter_item_2_3',
            //         type: 'locationTree_FAO',
            //         default: VISUALIZE_DV["1_filter-vd_filter_item_2"]
            //       //  title: labels[Clang]['1_filter-vd_filter_item_2_title']
            //     },
            //     {
            //         id: 'vd_filter_item_3',
            //         type: 'periodTree',
            //         default: VISUALIZE_DV["1_filter-vd_filter_item_3"],
            //         title: labels[Clang]['1_filter-vd_filter_item_3_title']
            //     }]
            // },
            filter: {
        items: [
            {
                id: 'vd_filter_item_1',
                type: 'tree',
                default: VISUALIZE_DV["1_filter-vd_filter_item_1"],
                title: labels[Clang]['1_filter-vd_filter_item_1_title'],
                clUid: "ISO3"
            },
            {
                id: 'vd_filter_item_2',
                type: 'radio',
                default: ["1"],
                title: [labels[Clang]["1_filter-vd_filter_item_2_title1"], labels[Clang]["1_filter-vd_filter_item_2_title2"], labels[Clang]["1_filter-vd_filter_item_2_title3"], labels[Clang]["1_filter-vd_filter_item_2_title4"]]
            },
            {
                id: 'vd_filter_item_3',
                type: 'checkbox',
                default: ["1", "2"],
                title: [labels[Clang]["1_filter-vd_filter_item_3_title1"], labels[Clang]["1_filter-vd_filter_item_3_title2"]]
            },
            {
                id: 'vd_filter_item_4_1',
                type: 'tree',
                default: VISUALIZE_DV["1_filter-vd_filter_item_4_1"],
                title: labels[Clang]['1_filter-vd_filter_item_4_1_title'],
                clUid: "wiews_fao_region"
            },
            {
                id: 'vd_filter_item_4_2',
                type: 'tree',
                default: VISUALIZE_DV["1_filter-vd_filter_item_4_2"],
                title: labels[Clang]['1_filter-vd_filter_item_4_1_title'],
                clUid: "wiews_m49_regions"
            },
            {
                id: 'vd_filter_item_4_3',
                type: 'tree',
                default: VISUALIZE_DV["1_filter-vd_filter_item_4_3"],
                title: labels[Clang]['1_filter-vd_filter_item_4_1_title'],
                clUid: "sdg_region"
            },
            {
                id: 'vd_filter_item_4_4',
                type: 'tree',
                default: VISUALIZE_DV["1_filter-vd_filter_item_4_4"],
                title: labels[Clang]['1_filter-vd_filter_item_4_1_title'],
                clUid: "mdg_region"
            },
            {
                id: 'vd_filter_item_5',
                type: 'radio',
                default: ["1"],
                title: [labels[Clang]["1_filter-vd_filter_item_5_title1"], labels[Clang]["1_filter-vd_filter_item_5_title2"]]
            },
            {
                id: 'vd_filter_item_6',
                type: 'checkbox',
                default: ["1", "2"],
                title: [labels[Clang]["1_filter-vd_filter_item_6_title1"], labels[Clang]["1_filter-vd_filter_item_6_title2"]]
            },
            {
                id: 'vd_filter_item_7_1',
                type: 'tree',
                default: VISUALIZE_DV["1_filter-vd_filter_item_7_1"],
                title: labels[Clang]['1_filter-vd_filter_item_7_title'],
                clUid: "wiews_cgrfa"
            },
            {
                id: 'vd_filter_item_7_2',
                type: 'tree',
                default: VISUALIZE_DV["1_filter-vd_filter_item_7_2"],
                title: labels[Clang]['1_filter-vd_filter_item_7_title'],
                clUid: "wiews_itpgrfa"
            },
            {
                id: 'vd_filter_item_8',
                type: 'tree',
                default: VISUALIZE_DV["1_filter-vd_filter_item_8"],
                title: labels[Clang]['1_filter-vd_filter_item_8_title'],
                clUid: "wiews_genus"
            },
            {
                id: 'vd_filter_item_9',
                type: 'tree',
                default: VISUALIZE_DV["1_filter-vd_filter_item_9"],
                title: labels[Clang]['1_filter-vd_filter_item_9_title'],
                clUid: "wiews_iteration",
                maxItems: 1
            }]
    },
            dashboard: {

                uid: "VisualizaDataDashboard",
                items: [
                    {
                        //Average annual growth rate 010103
                        id: "vd_dashboard_item_1", //ref [data-item=':id'] // 010103  Average annual growth rate
                        type: "map", //chart || map || olap,
                        hostConfig : {
                            itemContainer : {
                                class : 'fs-map panel panel-default fs-map hoverable',
                                // height : '400px',
                                title : {
                                    text : labels[Clang]['1_vd_dashboard_item_1_title']
                                },
                                buttons : {
                                    export :{
                                        show : true //Default= true
                                    }
                                },
                                footer : {
                                    text : labels[Clang]['1_vd_dashboard_item_1_footer']
                                }
                            }
                        },
                        //This is used for the export button action
                        uid : labels[Clang]['1_vd_dashboard_item_1_uid'],
                        config: {
                            geoSubject: 'Gaul0',
                            colorRamp: 'Blues',  //GnBu, Greens,
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
                        postProcess : [
                            {
                                "name": "wiews_area_filter",
                                "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                "rid" : { "uid" : "area_selection" },
                                "result" : false,
                                "parameters": {
                                    "total" : false,
                                    "filter" : {
                                        "iso3": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": VISUALIZE_DV["1_filter-vd_filter_item_1"]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },

                            {
                                "sid": [ { "uid": "indicator20" }, { "uid": "area_selection" } ],
                                "name" : "select",
                                "parameters" : {
                                    "query" : "where wiews_region in <<required_countries>>",
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
                                                    "codes": VISUALIZE_DV["1_filter-vd_filter_item_9"]
                                                }
                                            ]
                                        },
                                        "genus": {
                                            "codes": [
                                                {
                                                    "uid": "wiews_genus",
                                                    "codes": VISUALIZE_DV["1_filter-vd_filter_item_8"]
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
                            }
                        ]
                    },
                    {
                        id: 'vd_dashboard_item_2', // TOP RECIPIENTS Vs OTHER RECIPIENTS
                        type: 'chart',
                        hostConfig : {
                            itemContainer : {
                                class : 'fs-chart panel panel-default hoverable',
                                title : {
                                    text : labels[Clang]['1_vd_dashboard_item_2_title']
                                },
                                footer : {
                                    show : false
                                }
                            }
                        },
                        //This is used for the export button action
                        uid : labels[Clang]['1_vd_dashboard_item_2_uid'],
                        config: {
                            type: "pieold",
                            x: ["biologicalAccessionId_"+ClangUp], //x axis and series
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
                        postProcess : [
                            {
                                "name": "wiews_area_filter",
                                "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                "rid" : { "uid" : "area_selection" },
                                "result" : false,
                                "parameters": {
                                    "filter" : {
                                        "iso3": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": VISUALIZE_DV["1_filter-vd_filter_item_1"]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },

                            {
                                "sid": [ { "uid": "indicator20" }, { "uid": "area_selection" } ],
                                "name" : "select",
                                "parameters" : {
                                    "query" : "where wiews_region in <<required_countries>>",
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
                                                    "codes": VISUALIZE_DV["1_filter-vd_filter_item_9"]
                                                }
                                            ]
                                        },
                                        "genus": {
                                            "codes": [
                                                {
                                                    "uid": "wiews_genus",
                                                    "codes": VISUALIZE_DV["1_filter-vd_filter_item_8"]
                                                }
                                            ]
                                        }

                                    }
                                }
                            },

                            {
                                "name": "select",
                                "parameters": {
                                    "query": "WHERE biologicalAccessionId is not NULL and biologicalAccessionId<>'na'",
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
                    {
                        id: 'vd_dashboard_item_3', // TOP DONORS
                        type: 'chart',
                        hostConfig : {
                            itemContainer : {
                                class : 'fs-chart panel panel-default hoverable',
                                title : {
                                    text : labels[Clang]['1_vd_dashboard_item_3_title']
                                },
                                footer : {
                                    show : false
                                }
                            }
                        },
                        //This is used for the export button action
                        uid : labels[Clang]['1_vd_dashboard_item_3_uid'],
                        config: {
                            type: "column",
                            x: ["country"], //x axis
                            //series: ["data"], // series
                            y: ["value"],//Y dimension
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true,// || default raw else fenixtool

                            config: {
                                colors: ['#336699'],
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
                        postProcess : [
                            {
                                "name": "wiews_area_filter",
                                "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                "rid" : { "uid" : "area_selection" },
                                "result" : false,
                                "parameters": {
                                    "total" : false,
                                    "filter" : {
                                        "iso3": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": VISUALIZE_DV["1_filter-vd_filter_item_1"]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "sid": [ { "uid": "indicator20" }, { "uid": "area_selection" } ],
                                "name" : "select",
                                "parameters" : {
                                    "query" : "where wiews_region in <<required_countries>>",
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
                                                    "codes": VISUALIZE_DV["1_filter-vd_filter_item_9"]
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
                        hostConfig : {
                            itemContainer : {
                                class : 'fs-chart panel panel-default hoverable',
                                title : {
                                    text : labels[Clang]['1_vd_dashboard_item_4_title']
                                },
                                footer : {
                                    show : false
                                }
                            }
                        },
                        //This is used for the export button action
                        uid : labels[Clang]['1_vd_dashboard_item_4_uid'],
                        config: {
                            type: "column",
                            x: ["stakeholder"], //x axis
                            //series: ["data"], // series
                            y: ["value"],//Y dimension
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true,// || default raw else fenixtool

                            config: {
                                colors: ['#336699'],
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
                        postProcess : [
                            {
                                "name": "wiews_area_filter",
                                "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                "rid" : { "uid" : "area_selection" },
                                "result" : false,
                                "parameters": {
                                    "filter" : {
                                        "iso3": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": VISUALIZE_DV["1_filter-vd_filter_item_1"]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },

                            {
                                "sid": [ { "uid": "indicator20" }, { "uid": "area_selection" } ],
                                "name" : "select",
                                "parameters" : {
                                    "query" : "where wiews_region in <<required_countries>>",
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
                                                    "codes": VISUALIZE_DV["1_filter-vd_filter_item_9"]
                                                }
                                            ]
                                        },
                                        "element" :{
                                            "codes": [
                                                {
                                                    "uid": "wiews_elements",
                                                    "codes": [ "stk" ]
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

});
