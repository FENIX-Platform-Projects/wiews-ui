define(["highcharts", "../../../config/config", "../../../config/domains/visualizeDataDefaultValues", "../../../config/domains/downloadDataDefaultValues", "../../../nls/labels"],
    function (Highcharts, C, VISUALIZE_DV, DOWNLOAD_DV, labels) {

        "use strict";

        var Clang = C.lang.toLowerCase();
        var ClangUp = C.lang.toUpperCase();

        return {
            downloadData: {
                filter: {
                    hostConfig: {
                        geoSelector: {
                            default: 'dd_filter_item_4_1'
                        }
                    },
                    items: [
                        {
                            id: 'dd_filter_item_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_1"],
                            title: labels[Clang]['10_filter-dd_filter_item_1_title'],
                            clUid: "ISO3"
                        },
                        {
                            id: 'dd_filter_item_2',
                            type: 'radio',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_2"],
                            choicesTitle: [labels[Clang]["10_filter-dd_filter_item_2_choicesTitle1"], labels[Clang]["10_filter-dd_filter_item_2_choicesTitle2"], labels[Clang]["10_filter-dd_filter_item_2_choicesTitle3"], labels[Clang]["10_filter-dd_filter_item_2_choicesTitle4"]]
                        },
                        {
                            id: 'dd_filter_item_3',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_3"],
                            choicesTitle: [labels[Clang]["10_filter-dd_filter_item_3_choicesTitle1"], labels[Clang]["10_filter-dd_filter_item_3_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_4_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_4_1"],
                            title: labels[Clang]['10_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_fao_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_4_2"],
                            title: labels[Clang]['10_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_m49_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_4_3"],
                            title: labels[Clang]['10_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_sdg_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_4',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_4_4"],
                            title: labels[Clang]['10_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_mdg_region_only"
                        },
                        {
                            id: 'dd_filter_item_5',
                            type: 'radio',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_5"],
                            choicesTitle: [labels[Clang]["10_filter-dd_filter_item_5_choicesTitle1"], labels[Clang]["10_filter-dd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_6',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_6"],
                            choicesTitle: [labels[Clang]["10_filter-dd_filter_item_6_choicesTitle1"], labels[Clang]["10_filter-dd_filter_item_6_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_7_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_7_1"],
                            title: labels[Clang]['10_filter-dd_filter_item_7_title'],
                            clUid: "wiews_cgrfa_region_only"
                        },
                        {
                            id: 'dd_filter_item_7_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_7_2"],
                            title: labels[Clang]['10_filter-dd_filter_item_7_title'],
                            clUid: "wiews_itpgrfa_region_only"
                        },
                        {
                            id: 'dd_filter_item_8',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_8"],
                            title: labels[Clang]['10_filter-dd_filter_item_8_title'],
                            clUid: "wiews_output_indicators",
                            clCodes : ["16"]
                        },
                        {
                            id: 'dd_filter_item_9',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_9"],
                            title: labels[Clang]['10_filter-dd_filter_item_9_title'],
                            clUid: "wiews_iteration",
                            max: 1
                        },
                        {
                            id: 'dd_filter_item_10',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_10"],
                            title: labels[Clang]['10_filter-dd_filter_item_10_title'],
                            source: [{value: "stk", label: labels[Clang]['10_filter-dd_filter_item_10_source1']}]
                        },
                        {
                            id: 'dd_filter_item_11',
                            type: 'radio',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_11"],
                            title: labels[Clang]['10_filter-dd_filter_item_11_title'],
                            choicesTitle: [labels[Clang]["10_filter-dd_filter_item_11_choicesTitle1"], labels[Clang]["10_filter-dd_filter_item_11_choicesTitle2"], labels[Clang]["10_filter-dd_filter_item_11_choicesTitle3"]]
                        },
                        {
                            id: 'dd_filter_item_12',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_12"],
                            title: labels[Clang]['10_filter-dd_filter_item_12_title'],
                            choicesTitle: [labels[Clang]["10_filter-dd_filter_item_12_choicesTitle1"], labels[Clang]["10_filter-dd_filter_item_12_choicesTitle2"],labels[Clang]["10_filter-dd_filter_item_12_choicesTitle3"], labels[Clang]["10_filter-dd_filter_item_12_choicesTitle4"]]
                        }
                        ]
                },
                dashboard: {

                    uid: "DownloadDataDashboard",
                    columntableName : [labels[Clang]['10_dd_table_title_col_1'], labels[Clang]['10_dd_table_title_col_2'], labels[Clang]['10_dd_table_title_col_3'], labels[Clang]['10_dd_table_title_col_4'], labels[Clang]['10_dd_table_title_col_5'], labels[Clang]['10_dd_table_title_col_6']],
                    tableProcess : [
                        {
                            "name": "wiews_area_filter",
                            "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                            "rid" : { "uid" : "area_selection" },
                            "result" : false,
                            "parameters": {
                                "filter" : {
                                    "m49": {
                                        "codes": [
                                            {
                                                "uid": "wiews_m49_regions",
                                                "codes": DOWNLOAD_DV["10_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "sid": [ { "uid": "indicator16" }, { "uid": "area_selection" } ],
                            "name": "filter",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "wiews_region",
                                    "stakeholder",
                                    "indicator",
                                    "element",
                                    "iteration",
                                    "value",
                                    "um",
                                    "rank"
                                ],
                                "rows": {
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["10_filter-dd_filter_item_9"]
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
                                                "codes": [ "ind_t", "ind_a", "nfp", "nfpa", "stk_t", "stk_a" ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "name":"addcolumn",
                            "parameters":{
                                "column":{
                                    "dataType":"text",
                                    "id":"indicator_label",
                                    "title":{
                                        "EN":"Indicator"
                                    }
                                },
                                "value": {
                                    "keys": [
                                        "element = 'stk_t' or element = 'stk_a'", "element <> 'stk_t' and element <> 'stk_a'"
                                    ],
                                    "values": [
                                        "@@direct element_en || ' (' || stakeholder || ' / ' || stakeholder_en || ')'","@@direct element_en"
                                    ]
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
                    downloadProcessTableData: {
                        "outConfig" : {
                            "plugin" : "outputCSV"
                        },
                        "flow" : [
                            {
                                "name": "wiews_area_filter",
                                "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                "rid" : { "uid" : "area_selection" },
                                "result" : false,
                                "parameters": {
                                    "filter" : {
                                        "m49": {
                                            "codes": [
                                                {
                                                    "uid": "wiews_m49_regions",
                                                    "codes": DOWNLOAD_DV["10_filter-dd_filter_item_1"]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },

                            {
                                "sid": [ { "uid": "indicator16" }, { "uid": "area_selection" } ],
                                "name": "filter",
                                "parameters": {
                                    "columns": [
                                        "domain",
                                        "wiews_region",
                                        "stakeholder",
                                        "indicator",
                                        "element",
                                        "iteration",
                                        "value",
                                        "um",
                                        "rank"
                                    ],
                                    "rows": {
                                        "iteration": {
                                            "codes": [
                                                {
                                                    "uid": "wiews_iteration",
                                                    "codes": DOWNLOAD_DV["10_filter-dd_filter_item_9"]
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
                                                    "codes": [ "ind_t", "ind_a", "nfp", "nfpa", "stk_t", "stk_a" ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },

                            {
                                "name":"addcolumn",
                                "parameters":{
                                    "column":{
                                        "dataType":"text",
                                        "id":"indicator_label",
                                        "title":{
                                            "EN":"Indicator"
                                        }
                                    },
                                    "value": {
                                        "keys": [
                                            "element = 'stk_t' or element = 'stk_a'", "element <> 'stk_t' and element <> 'stk_a'"
                                        ],
                                        "values": [
                                            "@@direct element_en || ' (' || stakeholder || ' / ' || stakeholder_en || ')'","@@direct element_en"
                                        ]
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

                        ]
                    },
                    downloadProcessRawData :  {
                        "outConfig": {
                            "plugin": "outputCSV"
                        },
                        "flow": [
                            {
                                "name": "wiews_area_filter",
                                "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                "rid" : { "uid" : "area_selection" },
                                "result" : false,
                                "parameters": {
                                    "total" : false,
                                    "filter" : {
                                        "m49": {
                                            "codes": [
                                                {
                                                    "uid": "wiews_m49_regions",
                                                    "codes": DOWNLOAD_DV["10_filter-dd_filter_item_1"]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },

                            {
                                "name": "filter",
                                "sid": [ { "uid": "raw_indicator16" }, { "uid": "area_selection" } ],
                                "parameters": {
                                    "rows": {
                                        "iteration": {
                                            "codes": [
                                                {
                                                    "uid": "wiews_iteration",
                                                    "codes": DOWNLOAD_DV["10_filter-dd_filter_item_9"]
                                                }
                                            ]
                                        },
                                        "country_iso3" : {
                                            "variable" : "required_countries"
                                        }
                                    }
                                }
                            },
                            {
                                "name": "order",
                                "parameters": {
                                    "country_iso3" : "ASC",
                                    "datasource" : "ASC"
                                }
                            }
                        ]
                    }

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
                            id: 'vd_filter_item_8',
                            type: 'tree',
                            default: VISUALIZE_DV["10_filter-vd_filter_item_8"],
                            title: labels[Clang]['10_filter-vd_filter_item_8_title'],
                            clUid: "wiews_iteration",
                            max: 1
                        }]
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
                                        text: labels[Clang]['10_vd_dashboard_item_1_title']
                                    },
                                    buttons: {
                                        export: {
                                            show: true //Default= true
                                        }
                                    },
                                    footer: {
                                        text: labels[Clang]['10_vd_dashboard_item_1_footer']
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['10_vd_dashboard_item_1_uid'],
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
                                        "filter" : {
                                            "m49": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_m49_region_only",
                                                        "codes": [ "WITC","150" ]
                                                    }
                                                ]
                                            },
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": [ "5400" ]
                                                    }
                                                ]
                                            },
                                            "iso3": {
                                                "codes": [
                                                    {
                                                        "uid": "ISO3",
                                                        "codes": [ "SSD","EGY" ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },

                                {
                                    "sid": [ { "uid": "indicator16" }, { "uid": "area_selection" } ],
                                    "name" : "select",
                                    "parameters" : {
                                        "query" : "where wiews_region in <<required_countries>>",
                                        "values" : {
                                            "iteration" : null,
                                            "domain" : null,
                                            "element" : null,
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
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": [ "ind_t" ]
                                                    }
                                                ]
                                            }

                                        }
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
                                        text: labels[Clang]['10_vd_dashboard_item_2_title']
                                    },
                                    buttons: {
                                        export: {
                                            show: true //Default= true
                                        }
                                    },
                                    footer: {
                                        text: labels[Clang]['10_vd_dashboard_item_2_footer']
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['10_vd_dashboard_item_2_uid'],
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
                                        "filter" : {
                                            "m49": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_m49_region_only",
                                                        "codes": [ "WITC","150" ]
                                                    }
                                                ]
                                            },
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": [ "5400" ]
                                                    }
                                                ]
                                            },
                                            "iso3": {
                                                "codes": [
                                                    {
                                                        "uid": "ISO3",
                                                        "codes": [ "SSD","EGY" ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },

                                {
                                    "sid": [ { "uid": "indicator16" }, { "uid": "area_selection" } ],
                                    "name" : "select",
                                    "parameters" : {
                                        "query" : "where wiews_region in <<required_countries>>",
                                        "values" : {
                                            "iteration" : null,
                                            "domain" : null,
                                            "element" : null,
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
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": [ "ind_a" ]
                                                    }
                                                ]
                                            }

                                        }
                                    }
                                }




                            ]
                        },
                        {
                            id: 'vd_dashboard_item_3',
                            type: 'chart',
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-chart panel panel-default hoverable',
                                    title: {
                                        text: labels[Clang]['10_vd_dashboard_item_3_title']
                                    },
                                    footer: {
                                        show: false
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['10_vd_dashboard_item_3_uid'],
                            config: {
                                type: "pieold",
                                x: ["wiews_region"], //x axis
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
                            postProcess: [
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                    "rid" : { "uid" : "area_selection" },
                                    "result" : false,
                                    "parameters": {
                                        "total" : true,
                                        "list":false,
                                        "filter" : {
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": [ "5100","5200","5300","5400" ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },

                                {
                                    "sid": [ { "uid": "indicator16" }, { "uid": "area_selection" } ],
                                    "name" : "select",
                                    "parameters" : {
                                        "query" : "where wiews_region in <<required_countries>>",
                                        "values" : {
                                            "iteration" : null,
                                            "domain" : null,
                                            "element" : null,
                                            "wiews_region" : null,
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
                                            "wiews_region",
                                            "value",
                                            "um"
                                        ],
                                        "rows": {
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["10_filter-vd_filter_item_8"]
                                                    }
                                                ]
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": [ "ind_a", "ind_t" ]
                                                    }
                                                ]
                                            }

                                        }
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
                                        text: labels[Clang]['1_vd_dashboard_item_4_title']
                                    },
                                    footer: {
                                        show: false
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['1_vd_dashboard_item_4_uid'],
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
                            postProcess: [
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                    "rid" : { "uid" : "area_selection" },
                                    "result" : false,
                                    "parameters": {
                                        "total" : false,
                                        "list":true,
                                        "filter" : {
                                            "m49": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_m49_region_only",
                                                        "codes": [ "1" ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },

                                {
                                    "sid": [ { "uid": "indicator16" }, { "uid": "area_selection" } ],
                                    "name" : "select",
                                    "parameters" : {
                                        "query" : "where wiews_region in <<required_countries>>",
                                        "values" : {
                                            "iteration" : null,
                                            "domain" : null,
                                            "element" : null,
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
                                                        "codes": VISUALIZE_DV["10_filter-vd_filter_item_8"]
                                                    }
                                                ]
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": [ "ind_a" ]
                                                    }
                                                ]
                                            }

                                        }
                                    }
                                }




                            ]
                        },
                    ]
                }
            }
        }
    });
