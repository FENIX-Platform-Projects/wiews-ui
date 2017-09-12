define(["jquery","highcharts", "../../../config/config", "../../../config/domains/visualizeDataDefaultValues", "../../../config/domains/downloadDataDefaultValues", "../../../nls/labels"],
    function ($, Highcharts, C, VISUALIZE_DV, DOWNLOAD_DV, labels) {

        "use strict";

        var Clang = C.lang.toLowerCase();
        var ClangUp = C.lang.toUpperCase();

        return {
            downloadData: {
                filter: {
                    hostConfig: {
                        geoSelector: {
                            default: 'dd_filter_item_1'
                        }
                    },
                    items: [
                        {
                            id: 'dd_filter_item_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_1"],
                            title: labels[Clang]['2_filter-dd_filter_item_1_title'],
                            clUid: "ISO3"
                        },
                        {
                            id: 'dd_filter_item_2',
                            type: 'radio',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_2"],
                            choicesTitle: [labels[Clang]["2_filter-dd_filter_item_2_choicesTitle1"], labels[Clang]["2_filter-dd_filter_item_2_choicesTitle2"], labels[Clang]["2_filter-dd_filter_item_2_choicesTitle3"], labels[Clang]["2_filter-dd_filter_item_2_choicesTitle4"]]
                        },
                        {
                            id: 'dd_filter_item_3',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_3"],
                            choicesTitle: [labels[Clang]["2_filter-dd_filter_item_3_choicesTitle1"], labels[Clang]["2_filter-dd_filter_item_3_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_4_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_4_1"],
                            title: labels[Clang]['2_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_fao_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_4_2"],
                            title: labels[Clang]['2_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_m49_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_4_3"],
                            title: labels[Clang]['2_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_sdg_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_4',
                            type: 'tree',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_4_4"],
                            title: labels[Clang]['2_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_mdg_region_only"
                        },
                        {
                            id: 'dd_filter_item_5',
                            type: 'radio',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_5"],
                            choicesTitle: [labels[Clang]["2_filter-dd_filter_item_5_choicesTitle1"], labels[Clang]["2_filter-dd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_6',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_6"],
                            choicesTitle: [labels[Clang]["2_filter-dd_filter_item_6_choicesTitle1"], labels[Clang]["2_filter-dd_filter_item_6_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_7_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_7_1"],
                            title: labels[Clang]['2_filter-dd_filter_item_7_title'],
                            clUid: "wiews_cgrfa_region_only"
                        },
                        {
                            id: 'dd_filter_item_7_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_7_2"],
                            title: labels[Clang]['2_filter-dd_filter_item_7_title'],
                            clUid: "wiews_itpgrfa_region_only"
                        },
                        {
                            id: 'dd_filter_item_8',
                            type: 'tree',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_8"],
                            title: labels[Clang]['2_filter-dd_filter_item_8_title'],
                            clUid: "wiews_output_indicators",
                            clCodes : ["2_1","2_2"]
                        },
                        {
                            id: 'dd_filter_item_9',
                            type: 'tree',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_9"],
                            title: labels[Clang]['2_filter-dd_filter_item_9_title'],
                            clUid: "wiews_iteration",
                            max: 1
                        },
                        {
                            id: 'dd_filter_item_10',
                            type: 'radio',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_10"],
                            title: labels[Clang]['2_filter-dd_filter_item_10_title'],
                            choicesTitle: [labels[Clang]["2_filter-dd_filter_item_10_choicesTitle1"], labels[Clang]["2_filter-dd_filter_item_10_choicesTitle2"], labels[Clang]["2_filter-dd_filter_item_10_choicesTitle3"]]
                        },
                        {
                            id: 'dd_filter_item_11',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_11"],
                            title: labels[Clang]['2_filter-dd_filter_item_11_title'],
                            choicesTitle: [labels[Clang]["2_filter-dd_filter_item_11_choicesTitle1"], labels[Clang]["2_filter-dd_filter_item_11_choicesTitle2"],labels[Clang]["2_filter-dd_filter_item_11_choicesTitle3"], labels[Clang]["2_filter-dd_filter_item_11_choicesTitle4"]]
                        }
                        ]
                },
                dashboard: {

                    uid: "DownloadDataDashboard",
                    columntableName : [labels[Clang]['2_dd_table_title_col_1'], labels[Clang]['2_dd_table_title_col_2'], labels[Clang]['2_dd_table_title_col_3'], labels[Clang]['2_dd_table_title_col_4'], labels[Clang]['2_dd_table_title_col_5'], labels[Clang]['2_dd_table_title_col_6']],
                    tableProcess : [
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
                                                "codes": DOWNLOAD_DV["2_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "sid": [ { "uid": "indicator2" }, { "uid": "area_selection" } ],
                            "name": "filter",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "rank",
                                    "wiews_region",
                                    "indicator",
                                    "element",
                                    "iteration",
                                    "value",
                                    "um"
                                ],
                                "rows": {
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "wiews_output_indicators",
                                                "codes": DOWNLOAD_DV["2_filter-dd_filter_item_8"]
                                            }
                                        ]
                                    },
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["2_filter-dd_filter_item_9"]
                                            }
                                        ]
                                    },
                                    "wiews_region" : {
                                        "variable" : "required_countries"
                                    }
                                }
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "rank" : "ASC",
                                "wiews_region" : "ASC"
                            }
                        }

                    ],
                    downloadProcessTableData: [
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
                                                "codes": DOWNLOAD_DV["2_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "sid": [ { "uid": "indicator2" }, { "uid": "area_selection" } ],
                            "name": "filter",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "rank",
                                    "wiews_region",
                                    "indicator",
                                    "element",
                                    "iteration",
                                    "value",
                                    "um"
                                ],
                                "rows": {
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "wiews_output_indicators",
                                                "codes": DOWNLOAD_DV["2_filter-dd_filter_item_8"]
                                            }
                                        ]
                                    },
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["2_filter-dd_filter_item_9"]
                                            }
                                        ]
                                    },
                                    "wiews_region" : {
                                        "variable" : "required_countries"
                                    }
                                }
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "rank" : "ASC",
                                "wiews_region" : "ASC"
                            }
                        }

                    ],
                    downloadProcessRawData : [
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
                                                "codes": DOWNLOAD_DV["2_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "name": "filter",
                            "sid": [ { "uid": "raw_indicator2" }, { "uid": "area_selection" } ],
                            "parameters": {
                                "rows": {
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["2_filter-dd_filter_item_9"]
                                            }
                                        ]
                                    },
                                    "country" : {
                                        "variable" : "required_countries"
                                    }
                                }
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "country" : "ASC",
                                "species" : "ASC"
                            }
                        }
                    ]

                }
            },
            visualizeData: {
                filter: {
                    hostConfig: {
                        geoSelector: {
                            default: 'vd_filter_item_4_1'
                        }
                    },
                    items: [
                        {
                            id: 'vd_filter_item_1',
                            type: 'tree',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_1"],
                            title: labels[Clang]['2_filter-vd_filter_item_1_title'],
                            clUid: "ISO3"
                        },
                        {
                            id: 'vd_filter_item_2',
                            type: 'radio',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_2"],
                            choicesTitle: [labels[Clang]["2_filter-vd_filter_item_2_choicesTitle1"], labels[Clang]["2_filter-vd_filter_item_2_choicesTitle2"], labels[Clang]["2_filter-vd_filter_item_2_choicesTitle3"], labels[Clang]["2_filter-vd_filter_item_2_choicesTitle4"]]
                        },
                        {
                            id: 'vd_filter_item_3',
                            type: 'checkbox',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_3"],
                            choicesTitle: [labels[Clang]["2_filter-vd_filter_item_3_choicesTitle1"], labels[Clang]["2_filter-vd_filter_item_3_choicesTitle2"]]
                        },
                        {
                            id: 'vd_filter_item_4_1',
                            type: 'tree',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_4_1"],
                            title: labels[Clang]['2_filter-vd_filter_item_4_1_title'],
                            clUid: "wiews_fao_region_only"
                        },
                        {
                            id: 'vd_filter_item_4_2',
                            type: 'tree',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_4_2"],
                            title: labels[Clang]['2_filter-vd_filter_item_4_1_title'],
                            clUid: "wiews_m49_region_only"
                        },
                        {
                            id: 'vd_filter_item_4_3',
                            type: 'tree',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_4_3"],
                            title: labels[Clang]['2_filter-vd_filter_item_4_1_title'],
                            clUid: "wiews_sdg_region_only"
                        },
                        {
                            id: 'vd_filter_item_4_4',
                            type: 'tree',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_4_4"],
                            title: labels[Clang]['2_filter-vd_filter_item_4_1_title'],
                            clUid: "wiews_mdg_region_only"
                        },
                        {
                            id: 'vd_filter_item_5',
                            type: 'radio',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_5"],
                            choicesTitle: [labels[Clang]["2_filter-vd_filter_item_5_choicesTitle1"], labels[Clang]["2_filter-vd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'vd_filter_item_6',
                            type: 'checkbox',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_6"],
                            choicesTitle: [labels[Clang]["2_filter-vd_filter_item_6_choicesTitle1"], labels[Clang]["2_filter-vd_filter_item_6_choicesTitle2"]]
                        },
                        {
                            id: 'vd_filter_item_7_1',
                            type: 'tree',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_7_1"],
                            title: labels[Clang]['2_filter-vd_filter_item_7_title'],
                            clUid: "wiews_cgrfa_region_only"
                        },
                        {
                            id: 'vd_filter_item_7_2',
                            type: 'tree',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_7_2"],
                            title: labels[Clang]['2_filter-vd_filter_item_7_title'],
                            clUid: "wiews_itpgrfa_region_only"
                        },
                        {
                            id: 'vd_filter_item_8',
                            type: 'tree',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_8"],
                            title: labels[Clang]['2_filter-vd_filter_item_8_title'],
                            clUid: "wiews_iteration",
                            max: 1
                        },
                        {
                            id: 'vd_filter_item_9',
                            type: 'radio',
                            default: VISUALIZE_DV["2_filter-vd_filter_item_9"],
                            title: labels[Clang]['2_filter-vd_filter_item_9_title'],
                            choicesTitle: [labels[Clang]["2_filter-vd_filter_item_9_choicesTitle1"], labels[Clang]["2_filter-vd_filter_item_9_choicesTitle2"]]
                        },]
                },
                dashboard: {

                    uid: "VisualizaDataDashboard",
                    items: [
                        {
                            //Average annual growth rate 010103
                            id: "vd_dashboard_item_1", //ref [data-item=':id'] // 010103  Average annual growth rate
                            type: "map", //chart || map || olap,
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-map panel panel-default fs-map hoverable',
                                    height : '400px',
                                    title: {
                                        text: labels[Clang]['2_vd_dashboard_item_1_title']
                                    },
                                    buttons: {
                                        export: {
                                            show: true //Default= true
                                        }
                                    },
                                    footer: {
                                        text: labels[Clang]['2_vd_dashboard_item_1_footer']
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['2_vd_dashboard_item_1_uid'],
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
                            postProcess: [
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                    "rid" : { "uid" : "area_selection" },
                                    "result" : false,
                                    "parameters": {
                                        "total" : false,
                                        "list":  true,
                                        "filter" : {
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_4_1"]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "name": "filter",
                                    "sid": [ { "uid": "indicator2" }, { "uid": "area_selection" } ],
                                    "parameters": {
                                        "columns": [
                                            "element",
                                            "indicator",
                                            "country",
                                            "value",
                                            "um"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [ "2_1" ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_8"]
                                                    }
                                                ]
                                            },
                                            "wiews_region" : {
                                                "variable" : "required_countries"
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_9_code"]
                                                    }
                                                ]
                                            }
                                        }
                                    }

                                },
                                {
                                    "name": "order",
                                    "parameters": {
                                        "country" : "ASC"
                                    }
                                }
                            ]
                        },
                        {
                            //Average annual growth rate 010103
                            id: "vd_dashboard_item_2", //ref [data-item=':id'] // 010103  Average annual growth rate
                            type: "map", //chart || map || olap,
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-map panel panel-default fs-map hoverable',
                                    height : '400px',
                                    title: {
                                        text: labels[Clang]['2_vd_dashboard_item_2_title']
                                    },
                                    buttons: {
                                        export: {
                                            show: true //Default= true
                                        }
                                    },
                                    footer: {
                                        text: labels[Clang]['2_vd_dashboard_item_2_footer']
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['2_vd_dashboard_item_2_uid'],
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
                            postProcess: [
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                    "rid" : { "uid" : "area_selection" },
                                    "result" : false,
                                    "parameters": {
                                        "total" : false,
                                        "list":  true,
                                        "filter" : {
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_4_1"]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "name": "filter",
                                    "sid": [ { "uid": "indicator2" }, { "uid": "area_selection" } ],
                                    "parameters": {
                                        "columns": [
                                            "element",
                                            "indicator",
                                            "country",
                                            "value",
                                            "um"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [ "2_2" ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_8"]
                                                    }
                                                ]
                                            },
                                            "wiews_region" : {
                                                "variable" : "required_countries"
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_9_code"]
                                                    }
                                                ]
                                            }
                                        }
                                    }

                                },
                                {
                                    "name": "order",
                                    "parameters": {
                                        "country" : "ASC"
                                    }
                                }
                            ]
                        },
                        {
                            id: 'vd_dashboard_item_3', // TOP DONORS
                            type: 'chart',
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-chart panel panel-default hoverable',
                                    title: {
                                        text: labels[Clang]['2_vd_dashboard_item_3_title']
                                    },
                                    footer: {
                                        show: false
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['2_vd_dashboard_item_3_uid'],
                            config: {
                                type: "column",
                                x: ["wiews_region"], //x axis
                                series: ["indicator_type"],
                                y: ["value"],//Y dimension
                                aggregationFn: {"value": "sum"},
                                //useDimensionLabelsIfExist: true,// || default raw else fenixtool

                                config: {
                                    chart: {
                                        marginTop: 50,
                                        events: {
                                            load: function(event) {
                                                var _that = this;

                                               $.each(_that.series, function (i, serie) {
                                                   if(serie.name == "Varieties"){
                                                       serie.update({
                                                           yAxis:1, // reset the order of series ... Total ODA first,
                                                           type:'line'
                                                       })
                                                   }
                                                });
                                            }
                                        }
                                    },
                                    tooltip: {
                                        shared: true
                                    },
                                    legend: {
                                        align: 'center',
                                        verticalAlign: 'bottom',
                                        x: 0,
                                        y: 0
                                    },
                                    yAxis: [{ // Primary yAxis
                                        title: {
                                            text: labels[Clang]['2_vd_dashboard_item_3_series_yAxis_1_title']
                                        }
                                    }, { // Secondary yAxis
                                        title: {
                                            text: labels[Clang]['2_vd_dashboard_item_3_series_yAxis_2_title']
                                        },
                                        opposite: true
                                    }],
                                   // series:  [{name: 'Species', type: 'column', yAxis: 1}, {name: 'Varieties', type: 'column'}],
                                    colors: ['#336699', "#ff0000"],
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
                                    "sid": [
                                        {
                                            "uid": "wiews_region_mapping"
                                        },
                                        {
                                            "uid": "wiews_region_countries"
                                        }
                                    ],
                                    "rid": {
                                        "uid": "area_selection"
                                    },
                                    "result": false,
                                    "parameters": {
                                        "total": false,
                                        "list": true,
                                        "filter": {
                                            "m49": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": [
                                                            "5000"
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "name": "filter",
                                    "sid": [
                                        {
                                            "uid": "indicator2"
                                        },
                                        {
                                            "uid": "area_selection"
                                        }
                                    ],
                                    "parameters": {
                                        "columns": [
                                            "element",
                                            "indicator",
                                            "wiews_region",
                                            "value",
                                            "um"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [
                                                            "2_1"
                                                        ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_8"]
                                                    }
                                                ]
                                            },
                                            "wiews_region": {
                                                "variable": "required_countries"
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_9_code"]
                                                    }
                                                ]
                                            }
                                        }
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
                                    },
                                    "rid": {
                                        "uid": "top_10_species"
                                    }
                                },
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [
                                        {
                                            "uid": "wiews_region_mapping"
                                        },
                                        {
                                            "uid": "wiews_region_countries"
                                        }
                                    ],
                                    "rid": {
                                        "uid": "area_selection_varieties"
                                    },
                                    "result": false,
                                    "parameters": {
                                        "total": false,
                                        "list": true,
                                        "filter": {
                                            "m49": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": [
                                                            "5000"
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "name": "filter",
                                    "sid": [
                                        {
                                            "uid": "indicator2"
                                        },
                                        {
                                            "uid": "area_selection_varieties"
                                        }
                                    ],
                                    "parameters": {
                                        "columns": [
                                            "element",
                                            "indicator",
                                            "wiews_region",
                                            "value",
                                            "um"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [
                                                            "2_2"
                                                        ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_8"]
                                                    }
                                                ]
                                            },
                                            "wiews_region": {
                                                "variable": "required_countries"
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_9_code"]
                                                    }
                                                ]
                                            }
                                        }
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
                                    },
                                    "rid": {
                                        "uid": "top_10_varieties"
                                    }
                                },
                                {
                                    "name": "union",
                                    "sid": [
                                        {
                                            "uid": "top_10_species"
                                        },
                                        {
                                            "uid": "top_10_varieties"
                                        }
                                    ],
                                    "parameters": {},
                                    "rid": {
                                        "uid": "union_species_var"
                                    }
                                },
                                {
                                    "name": "addcolumn",
                                    "sid": [
                                        {
                                            "uid": "union_species_var"
                                        }
                                    ],
                                    "parameters": {
                                        "column": {
                                            "dataType": "text",
                                            "id": "indicator_type",
                                            "title": {
                                                "EN": "Indicator"
                                            },
                                            "subject": null
                                        },
                                        "value": {
                                            "keys": [
                                                "indicator = '2_2'",
                                                "indicator = '2_1'"
                                            ],
                                            "values": [
                                                "Varieties",
                                                "Species"
                                            ]
                                        }
                                    },
                                    "rid": {
                                        "uid": "final_with_values"
                                    }
                                },
                                {
                                    "name": "filter",
                                    "sid": [
                                        {
                                            "uid": "final_with_values"
                                        }
                                    ],
                                    "parameters": {
                                        "columns": [
                                            "element",
                                            "indicator_type",
                                            "wiews_region",
                                            "value",
                                            "um"
                                        ],
                                        "rows": {}
                                    }
                                }
                            ]
                        },
                        {
                            id: 'vd_dashboard_item_4', // TOP DONORS
                            type: 'chart',
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-chart panel panel-default hoverable',
                                    title: {
                                        text: labels[Clang]['2_vd_dashboard_item_4_title']
                                    },
                                    footer: {
                                        show: false
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['2_vd_dashboard_item_4_uid'],
                            config: {
                                type: "column",
                                x: ["wiews_region_"+ClangUp], //x axis
                                series: ["indicator_type"],// series
                                y: ["value"],//Y dimension
                                aggregationFn: {"value": "sum"},
                                //useDimensionLabelsIfExist: true,// || default raw else fenixtool

                                config: {
                                    chart: {
                                        marginTop: 50,
                                        events: {
                                            load: function(event) {
                                                var _that = this;

                                                $.each(_that.series, function (i, serie) {

                                                    if(serie.name == "Varieties"){
                                                        serie.update({
                                                            yAxis:1, // reset the order of series ... Total ODA first,
                                                            type:'line'
                                                        })
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    tooltip: {
                                        shared: true
                                    },
                                    legend: {
                                        align: 'center',
                                        verticalAlign: 'bottom',
                                        x: 0,
                                        y: 0
                                    },
                                    yAxis: [{ // Primary yAxis
                                        title: {
                                            text: labels[Clang]['2_vd_dashboard_item_4_series_yAxis_1_title']
                                        }
                                    }, { // Secondary yAxis
                                        title: {
                                            text: labels[Clang]['2_vd_dashboard_item_4_series_yAxis_2_title']
                                        },
                                        opposite: true
                                    }],
                                    // series:  [{name: 'Species', type: 'column', yAxis: 1}, {name: 'Varieties', type: 'column'}],
                                    colors: ['#336699', "#ff0000"],
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
                            postProcess :[
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                    "rid" : { "uid" : "area_selection" },
                                    "result" : false,
                                    "parameters": {
                                        "total" : true,
                                        "list":  false,
                                        "filter" : {
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": [
                                                            "5100",
                                                            "5200",
                                                            "5300",
                                                            "5400"]
                                                    }
                                                ]
                                            }

                                        }
                                    }
                                },
                                {
                                    "name": "filter",
                                    "sid": [ { "uid": "indicator2" }, { "uid": "area_selection" } ],
                                    "parameters": {
                                        "columns": [
                                            "element",
                                            "indicator",
                                            "wiews_region",
                                            "value",
                                            "um"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [ "2_1" ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_8"]
                                                    }
                                                ]
                                            },
                                            "wiews_region" : {
                                                "variable" : "required_countries"
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_9_code"]
                                                    }
                                                ]
                                            }
                                        }
                                    },
                                    "rid": {
                                        "uid": "top_10_varieties"
                                    }

                                },
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                    "rid" : { "uid" : "area_selection_varieties" },
                                    "result" : false,
                                    "parameters": {
                                        "total" : true,
                                        "list":  false,
                                        "filter" : {
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": [
                                                            "5100",
                                                            "5200",
                                                            "5300",
                                                            "5400"]
                                                    }
                                                ]
                                            }

                                        }
                                    }
                                },
                                {
                                    "name": "filter",
                                    "sid": [ { "uid": "indicator2" }, { "uid": "area_selection_varieties" } ],
                                    "parameters": {
                                        "columns": [
                                            "element",
                                            "indicator",
                                            "wiews_region",
                                            "value",
                                            "um"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [ "2_2" ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_8"]
                                                    }
                                                ]
                                            },
                                            "wiews_region" : {
                                                "variable" : "required_countries"
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": VISUALIZE_DV["2_filter-vd_filter_item_9_code"]
                                                    }
                                                ]
                                            }
                                        }
                                    },
                                    "rid": {
                                        "uid": "top_10_species"
                                    }

                                },
                                {
                                    "name": "union",
                                    "sid": [
                                        {
                                            "uid": "top_10_species"
                                        },
                                        {
                                            "uid": "top_10_varieties"
                                        }

                                    ],
                                    "parameters": {},
                                    "rid" :{"uid":"union_species_var"}
                                },
                                {
                                    "name": "addcolumn",
                                    "sid": [
                                        {
                                            "uid": "union_species_var"
                                        }
                                    ],
                                    "parameters": {
                                        "column": {
                                            "dataType": "text",
                                            "id": "indicator_type",
                                            "title": {
                                                "EN": "Indicator"
                                            },
                                            "subject": null
                                        },
                                        "value": {
                                            "keys": [
                                                "indicator = '2_2'", "indicator = '2_1'"
                                            ],
                                            "values": [
                                                "Varieties","Species"
                                            ]
                                        }
                                    },
                                    "rid": {
                                        "uid": "final_with_values"
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        }

    });
