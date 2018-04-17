define([
        "highcharts",
        "../renders/IndicatorCommonUtils",
        "../../../config/config",
        "../../../config/domains/visualizeDataDefaultValues",
        "../../../config/domains/downloadDataDefaultValues",
        "../../../config/domains/codelistPayloads",
        "../../../nls/labels"],
    function (Highcharts, ICUtils, C, VISUALIZE_DV, DOWNLOAD_DV, CL, labels) {

        "use strict";

        var Clang = C.lang.toLowerCase();
        var ClangUp = C.lang.toUpperCase();

        this.icUtils = new ICUtils();
        var FAO_CL = this.icUtils.callElastic(CL['FAO'],false).hits,
            CGRFA_CL = this.icUtils.callElastic(CL['CGRFA'],false).hits,
            ITPGRFA_CL = this.icUtils.callElastic(CL['ITPGRFA'],false).hits,
            M49 = this.icUtils.callElastic(CL['M49'],true).hits,
            SDG = this.icUtils.callElastic(CL['SDG'],true).hits,
            MDG = this.icUtils.callElastic(CL['MDG'],true).hits,
            FAO_R = this.icUtils.callElastic(CL['FAO_R'],true).hits,
            CGRFA_R = this.icUtils.callElastic(CL['CGRFA_R'],true).hits,
            ITPGRFA_R = this.icUtils.callElastic(CL['ITPGRFA_R'],true).hits;

        return {
            downloadData: {
                filter: {
                    hostConfig: {
                        geoSelector: {
                            default: 'dd_filter_item_2_1'
                        }
                    },
                    items: [
                        {
                            id: 'dd_filter_item_1',
                            type: 'radio',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_2"],
                            title: labels[Clang]['3_filter-dd_filter_item_1_title'],
                            choicesTitle: [labels[Clang]["3_filter-dd_filter_item_2_choicesTitle1"], labels[Clang]["3_filter-dd_filter_item_5_choicesTitle1"], labels[Clang]["3_filter-dd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_2_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_1"],
                            title: labels[Clang]['3_filter-dd_filter_item_1_title'],
                            //clUid: "ISO3"
                            source : FAO_CL
                        },
                        {
                            id: 'dd_filter_item_2_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_1"],
                            title: labels[Clang]['3_filter-dd_filter_item_1_title'],
                            //clUid: "ISO3"
                            source : CGRFA_CL
                        },
                        {
                            id: 'dd_filter_item_2_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_1"],
                            title: labels[Clang]['3_filter-dd_filter_item_1_title'],
                            //clUid: "ISO3"
                            source : ITPGRFA_CL
                        },
                        {
                            id: 'dd_filter_item_3',
                            type: 'radio',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_2"],
                            choicesTitle: [labels[Clang]["3_filter-dd_filter_item_2_choicesTitle1"], labels[Clang]["3_filter-dd_filter_item_2_choicesTitle2"], labels[Clang]["3_filter-dd_filter_item_2_choicesTitle3"], labels[Clang]["3_filter-dd_filter_item_2_choicesTitle4"], labels[Clang]["3_filter-dd_filter_item_5_choicesTitle1"], labels[Clang]["3_filter-dd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_4_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_4_1"],
                            title: labels[Clang]['3_filter-dd_filter_item_4_1_title'],
                            source: FAO_R
                            //clUid: "wiews_fao_region_only",
                            //clBlackList: ['WITC','WITC_t']
                        },
                        {
                            id: 'dd_filter_item_4_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_4_2"],
                            title: labels[Clang]['3_filter-dd_filter_item_4_1_title'],
                            source: M49
                            //clUid: "wiews_m49_region_only",
                            //clBlackList: ['WITC','WITC_t']
                        },
                        {
                            id: 'dd_filter_item_4_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_4_3"],
                            title: labels[Clang]['3_filter-dd_filter_item_4_1_title'],
                            //clUid: "wiews_sdg_region_only"
                            source: SDG
                        },
                        {
                            id: 'dd_filter_item_4_4',
                            type: 'tree',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_4_4"],
                            title: labels[Clang]['3_filter-dd_filter_item_4_1_title'],
                            source: MDG
                            //clUid: "wiews_mdg_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_5',
                            type: 'tree',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_7_1"],
                            title: labels[Clang]['3_filter-dd_filter_item_7_title'],
                            source: CGRFA_R
                            //clUid: "wiews_cgrfa_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_6',
                            type: 'tree',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_7_2"],
                            title: labels[Clang]['3_filter-dd_filter_item_7_title'],
                            source: ITPGRFA_R
                            //clUid: "wiews_itpgrfa_region_only",
                            //clBlackList: ['WITC','WITC_t']
                        },
                        {
                            id: 'dd_filter_item_6',
                            type: 'radio',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_6"],
                            choicesTitle: [labels[Clang]["3_filter-dd_filter_item_6_choicesTitle1"], labels[Clang]["3_filter-dd_filter_item_6_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_8',
                            type: 'tree',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_8"],
                            title: labels[Clang]['3_filter-dd_filter_item_8_title'],
                            source: [{value: "3_1", label: labels[Clang]['cl_indicator_3_1']},{value: "3_2", label: labels[Clang]['cl_indicator_3_2']}],
                            //clUid: "wiews_output_indicators"
                        },
                        {
                            id: 'dd_filter_item_9',
                            type: 'tree',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_9"],
                            title: labels[Clang]['3_filter-dd_filter_item_9_title'],
                            clUid: "wiews_iteration",
                            max: 1
                        }/*,
                        {
                            id: 'dd_filter_item_11',
                            type: 'radio',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_11"],
                            title: labels[Clang]['3_filter-dd_filter_item_11_title'],
                            choicesTitle: [labels[Clang]["3_filter-dd_filter_item_11_choicesTitle1"], labels[Clang]["3_filter-dd_filter_item_11_choicesTitle2"], labels[Clang]["3_filter-dd_filter_item_11_choicesTitle3"]]
                        },
                        {
                            id: 'dd_filter_item_12',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["3_filter-dd_filter_item_12"],
                            title: labels[Clang]['3_filter-dd_filter_item_12_title'],
                            choicesTitle: [labels[Clang]["3_filter-dd_filter_item_12_choicesTitle1"], labels[Clang]["3_filter-dd_filter_item_12_choicesTitle2"],labels[Clang]["3_filter-dd_filter_item_12_choicesTitle3"], labels[Clang]["3_filter-dd_filter_item_12_choicesTitle4"]]
                        }*/
                        ]
                },
                dashboard: {

                    uid: "DownloadDataDashboard",
                    columntableName : [
                        labels[Clang]['3_dd_table_title_col_1'],
                        labels[Clang]['3_dd_table_title_col_2'],
                        labels[Clang]['3_dd_table_title_col_3'],
                        labels[Clang]['3_dd_table_title_col_4'],
                        labels[Clang]['3_dd_table_title_col_5'],
                        labels[Clang]['3_dd_table_title_col_6']
                    ],
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
                                                "codes": DOWNLOAD_DV["3_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "sid": [ { "uid": "indicator3" }, { "uid": "area_selection" } ],
                            "name": "filter",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "rank",
                                    "wiews_region",
                                    "indicator",
                                    "element",
                                    "iteration",
                                    "threatened_percentage",
                                    "um"
                                ],
                                "rows": {
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "wiews_output_indicators",
                                                "codes": DOWNLOAD_DV["3_filter-vd_filter_item_8"]
                                            }
                                        ]
                                    },
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
                                                "codes": DOWNLOAD_DV["3_filter-vd_filter_item_9"]
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
                                "iteration" : "ASC",
                                "rank" : "ASC",
                                "wiews_region_EN" : "ASC",
                                "indicator" : "DESC",
                                "element" : "ASC"
                            }
                        }
                    ],
                    downloadProcessTableData : [
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
                                                "uid": "wiews_m49_region_only",
                                                "codes": [ "WITC","1" ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "sid": [ { "uid": "indicator3" }, { "uid": "area_selection" } ],
                            "name": "filter",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "rank",
                                    "wiews_region",
                                    "indicator",
                                    "element",
                                    "iteration",
                                    "threatened_percentage",
                                    "um"
                                ],
                                "rows": {
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "wiews_output_indicators",
                                                "codes": DOWNLOAD_DV["3_filter-vd_filter_item_8"]
                                            }
                                        ]
                                    },
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["3_filter-vd_filter_item_9"]
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
                                "iteration" : "ASC",
                                "rank" : "ASC",
                                "wiews_region_EN" : "ASC",
                                "indicator" : "DESC",
                                "element" : "ASC"
                            }
                        },
                        {
                            "name": "columns",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "wiews_region",
                                    "indicator",
                                    "element",
                                    "iteration",
                                    "threatened_percentage",
                                    "um"
                                ]
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
                                                "codes": DOWNLOAD_DV["3_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "name": "filter",
                            "sid": [ { "uid": "raw_indicator3" }, { "uid": "area_selection" } ],
                            "parameters": {
                                "rows": {
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["3_filter-dd_filter_item_9"]
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
                                "iteration" : "ASC",
                                "country" : "ASC",
                                "species" : "ASC"
                            }
                        },
                        {
                            "name": "columns",
                            "parameters": {
                                "columns": [
                                    "iteration",
                                    "country_iso3",
                                    "country",
                                    "org_id",
                                    "organization_name",
                                    "species",
                                    "threatened_species",
                                    "varieties",
                                    "threathened_varieties"
                                ]
                            }
                        }
                    ]
                }
            },
            visualizeData: {
                filter: {
                    items: [{
                            id: 'vd_filter_item_8',
                            type: 'tree',
                            default: VISUALIZE_DV["3_filter-vd_filter_item_8"],
                            title: labels[Clang]['3_filter-vd_filter_item_8_title'],
                            clUid: "wiews_iteration",
                            max: 1
                        }]
                },
                dashboard: {

                    uid: "VisualizaDataDashboard",
                    items: [
                        // Maps

                        {
                            //Average annual growth rate 010103
                            id: "vd_dashboard_item_1", //ref [data-item=':id'] // 010103  Average annual growth rate
                            type: "map", //chart || map || olap,
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-map panel panel-default fs-map hoverable',
                                    height : '400px',
                                    title: {
                                        text: labels[Clang]['3_vd_dashboard_item_1_title']
                                    },
                                    buttons: {
                                        export: {
                                            show: true //Default= true
                                        }
                                    },
                                    footer: {
                                        text: labels[Clang]['3_vd_dashboard_item_1_footer']
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['3_vd_dashboard_item_1_uid'],
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
                                    "name": "filter",
                                    "sid": [ { "uid": "indicator3" }],
                                    "parameters": {
                                        "columns": [
                                            "country",
                                            "indicator",
                                            "species",
                                            "threatened_species",
                                            "threatened_percentage",
                                            "um"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [ "3_1" ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["3_filter-vd_filter_item_8"]
                                                    }
                                                ]
                                            },
                                            "!country": {
                                                "codes": [
                                                    {
                                                        "uid": "ISO3",
                                                        "codes": [ "na" ]
                                                    }
                                                ]
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": [ "ind" ]
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
                                        text: labels[Clang]['3_vd_dashboard_item_2_title']
                                    },
                                    buttons: {
                                        export: {
                                            show: true //Default= true
                                        }
                                    },
                                    footer: {
                                        text: labels[Clang]['3_vd_dashboard_item_1_footer']
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['3_vd_dashboard_item_2_uid'],
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
                                    "name": "filter",
                                    "sid": [ { "uid": "indicator3" }],
                                    "parameters": {
                                        "columns": [
                                            "country",
                                            "indicator",
                                            "species",
                                            "threatened_species",
                                            "threatened_percentage",
                                            "um"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [ "3_2" ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["3_filter-vd_filter_item_8"]
                                                    }
                                                ]
                                            },
                                            "!country": {
                                                "codes": [
                                                    {
                                                        "uid": "ISO3",
                                                        "codes": [ "na" ]
                                                    }
                                                ]
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": [ "ind" ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            ]
                        },

                        // Charts
                        {
                            id: 'vd_dashboard_item_3',
                            type: 'chart',
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-chart panel panel-default hoverable',
                                    title: {
                                        text: labels[Clang]['3_vd_dashboard_item_3_title']
                                    },
                                    footer: {
                                        show: false
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['3_vd_dashboard_item_3_uid'],
                            config: {
                                type: "column",
                                x: ["wiews_region_"+ClangUp], //x axis
                                series: ["indicator_type"],// series
                                y: ["value"],//Y dimension
                                aggregationFn: {"value": "sum"},
                                //useDimensionLabelsIfExist: true,// || default raw else fenixtool
                                config: {
                                    tooltip: {
                                        shared: true
                                    },
                                    legend: {
                                        align: 'center',
                                        verticalAlign: 'bottom',
                                        x: 0,
                                        y: 0
                                    },
                                    yAxis: [{
                                        title: {
                                            text: 'Number of Species'
                                        }
                                    }],
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
                            postProcess: [
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                    "rid" : { "uid" : "area_selection" },
                                    "result" : false,
                                    "parameters": {
                                        "total" : true,
                                        "list":  "false",
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
                                    "name": "filter",
                                    "sid": [ { "uid": "indicator3" }, { "uid": "area_selection" } ],
                                    "rid" : {"uid": "indicator_data"},
                                    "parameters": {
                                        "columns": [
                                            "wiews_region",
                                            "threatened_species",
                                            "species"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [ "3_1" ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["3_filter-vd_filter_item_8"]
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
                                                        "codes": [ "ind" ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "sid": [ { "uid": "indicator_data" } ],
                                    "parameters": {
                                        "column": {
                                            "dataType": "text",
                                            "id": "item",
                                            "title": { "EN": "Item" },
                                            "subject": "item",
                                            "key" : true
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "Threatened" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "rid" : { "uid" : "threatened_data" },
                                    "parameters": {
                                        "column": {
                                            "dataType": "number",
                                            "id": "value",
                                            "title": { "EN": "Value" },
                                            "subject": "value"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "@@direct threatened_species" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "sid": [ { "uid": "indicator_data" } ],
                                    "parameters": {
                                        "column": {
                                            "dataType": "text",
                                            "id": "item",
                                            "title": { "EN": "Item" },
                                            "subject": "item",
                                            "key" : true
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "Not threatened" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "rid" : { "uid" : "non_threatened_data" },
                                    "parameters": {
                                        "column": {
                                            "dataType": "number",
                                            "id": "value",
                                            "title": { "EN": "Value" },
                                            "subject": "value"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "@@direct species - threatened_species" ]
                                        }
                                    }
                                },

                                {
                                    "name": "union",
                                    "sid": [ { "uid": "threatened_data" }, { "uid": "non_threatened_data" } ],
                                    "parameters": {}
                                },

                                {
                                    "name": "addcolumn",
                                    "parameters": {
                                        "column": {
                                            "id" : "um",
                                            "title" : { "EN" : "Measurement unit"},
                                            "dataType" : "code",
                                            "domain" : { "codes" : [ { "idCodeList" : "wiews_um" } ] },
                                            "subject":"um"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "num" ]
                                        }
                                    }
                                },

                                {
                                    "name": "filter",
                                    "parameters": {
                                        "columns": [
                                            "wiews_region",
                                            "item",
                                            "value",
                                            "um"
                                        ]
                                    }
                                }

                            ]
                        },
                        {
                            id: 'vd_dashboard_item_4',
                            type: 'chart',
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-chart panel panel-default hoverable',
                                    title: {
                                        text: labels[Clang]['3_vd_dashboard_item_4_title']
                                    },
                                    footer: {
                                        show: false
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['3_vd_dashboard_item_4_uid'],
                            config: {
                                type: "column",
                                x: ["wiews_region_"+ClangUp], //x axis
                                series: ["indicator_type"],// series
                                y: ["value"],//Y dimension
                                aggregationFn: {"value": "sum"},
                                //useDimensionLabelsIfExist: true,// || default raw else fenixtool
                                config: {
                                    tooltip: {
                                        shared: true
                                    },
                                    legend: {
                                        align: 'center',
                                        verticalAlign: 'bottom',
                                        x: 0,
                                        y: 0
                                    },
                                    yAxis: [{
                                        title: {
                                            text: 'Number of Varieties'
                                        }
                                    }],
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
                            postProcess:[
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                    "rid" : { "uid" : "area_selection" },
                                    "result" : false,
                                    "parameters": {
                                        "total" : true,
                                        "list":  "false",
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
                                    "name": "filter",
                                    "sid": [ { "uid": "indicator3" }, { "uid": "area_selection" } ],
                                    "rid" : {"uid": "indicator_data"},
                                    "parameters": {
                                        "columns": [
                                            "wiews_region",
                                            "threatened_species",
                                            "species"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [ "3_2" ]
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
                                            },
                                            "wiews_region" : {
                                                "variable" : "required_countries"
                                            },
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": [ "ind" ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "sid": [ { "uid": "indicator_data" } ],
                                    "parameters": {
                                        "column": {
                                            "dataType": "text",
                                            "id": "item",
                                            "title": { "EN": "Item" },
                                            "subject": "item",
                                            "key" : true
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "Threatened" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "rid" : { "uid" : "threatened_data" },
                                    "parameters": {
                                        "column": {
                                            "dataType": "number",
                                            "id": "value",
                                            "title": { "EN": "Value" },
                                            "subject": "value"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "@@direct threatened_species" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "sid": [ { "uid": "indicator_data" } ],
                                    "parameters": {
                                        "column": {
                                            "dataType": "text",
                                            "id": "item",
                                            "title": { "EN": "Item" },
                                            "subject": "item",
                                            "key" : true
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "Not threatened" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "rid" : { "uid" : "non_threatened_data" },
                                    "parameters": {
                                        "column": {
                                            "dataType": "number",
                                            "id": "value",
                                            "title": { "EN": "Value" },
                                            "subject": "value"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "@@direct species - threatened_species" ]
                                        }
                                    }
                                },

                                {
                                    "name": "union",
                                    "sid": [ { "uid": "threatened_data" }, { "uid": "non_threatened_data" } ],
                                    "parameters": {}
                                },

                                {
                                    "name": "addcolumn",
                                    "parameters": {
                                        "column": {
                                            "id" : "um",
                                            "title" : { "EN" : "Measurement unit"},
                                            "dataType" : "code",
                                            "domain" : { "codes" : [ { "idCodeList" : "wiews_um" } ] },
                                            "subject":"um"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "num" ]
                                        }
                                    }
                                },

                                {
                                    "name": "filter",
                                    "parameters": {
                                        "columns": [
                                            "wiews_region",
                                            "item",
                                            "value",
                                            "um"
                                        ]
                                    }
                                }

                            ]

                        },
                        {
                            id: 'vd_dashboard_item_5',
                            type: 'chart',
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-chart panel panel-default hoverable',
                                    title: {
                                        text: labels[Clang]['3_vd_dashboard_item_5_title']
                                    },
                                    footer: {
                                        show: false
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['3_vd_dashboard_item_5_uid'],
                            config: {
                                type: "pieold",
                                x: ["item"], //x axis and series
                                series: ["um"], // series
                                y: ["value"],//Y dimension
                                aggregationFn: {"value": "sum"},
                                useDimensionLabelsIfExist: false,// || default raw else fenixtool

                                config: {
                                    tooltip: {
                                        shared: true
                                    },
                                    legend: {
                                        align: 'center',
                                        verticalAlign: 'bottom',
                                        x: 0,
                                        y: 0
                                    },
                                    yAxis: [{
                                        title: {
                                            text: 'Number of Species'
                                        }
                                    }],
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
                            postProcess: [
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                    "rid" : { "uid" : "area_selection" },
                                    "result" : false,
                                    "parameters": {
                                        "total" : true,
                                        "list":  "false",
                                        "filter" : {

                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": [ "5000" ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },

                                {
                                    "name": "filter",
                                    "sid": [ { "uid": "indicator3" }, { "uid": "area_selection" } ],
                                    "rid" : {"uid": "indicator_data"},
                                    "parameters": {
                                        "columns": [
                                            "species",
                                            "threatened_species"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [ "3_1" ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["3_filter-vd_filter_item_8"]
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
                                                        "codes": [ "ind" ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "sid": [ { "uid": "indicator_data" } ],
                                    "parameters": {
                                        "column": {
                                            "dataType": "text",
                                            "id": "item",
                                            "title": { "EN": "Item" },
                                            "subject": "item",
                                            "key" : true
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "Threatened" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "rid" : { "uid" : "threatened_data" },
                                    "parameters": {
                                        "column": {
                                            "dataType": "number",
                                            "id": "value",
                                            "title": { "EN": "Value" },
                                            "subject": "value"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "@@direct threatened_species" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "sid": [ { "uid": "indicator_data" } ],
                                    "parameters": {
                                        "column": {
                                            "dataType": "text",
                                            "id": "item",
                                            "title": { "EN": "Item" },
                                            "subject": "item",
                                            "key" : true
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "Not threatened" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "rid" : { "uid" : "non_threatened_data" },
                                    "parameters": {
                                        "column": {
                                            "dataType": "number",
                                            "id": "value",
                                            "title": { "EN": "Value" },
                                            "subject": "value"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "@@direct species - threatened_species" ]
                                        }
                                    }
                                },

                                {
                                    "name": "union",
                                    "sid": [ { "uid": "threatened_data" }, { "uid": "non_threatened_data" } ],
                                    "parameters": {}
                                },

                                {
                                    "name": "addcolumn",
                                    "parameters": {
                                        "column": {
                                            "id" : "um",
                                            "title" : { "EN" : "Measurement unit"},
                                            "dataType" : "code",
                                            "domain" : { "codes" : [ { "idCodeList" : "wiews_um" } ] },
                                            "subject":"um"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "num" ]
                                        }
                                    }
                                },

                                {
                                    "name": "filter",
                                    "parameters": {
                                        "columns": [
                                            "item",
                                            "value",
                                            "um"
                                        ]
                                    }
                                }

                            ]





                        },

                        {
                            id: 'vd_dashboard_item_6',
                            type: 'chart',
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-chart panel panel-default hoverable',
                                    title: {
                                        text: labels[Clang]['3_vd_dashboard_item_6_title']
                                    },
                                    footer: {
                                        show: false
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['3_vd_dashboard_item_6_uid'],
                            config: {
                                type: "pieold",
                                x: ["item"], //x axis and series
                                series: ["um"], // series
                                y: ["value"],//Y dimension
                                aggregationFn: {"value": "sum"},
                                useDimensionLabelsIfExist: false,// || default raw else fenixtool
                                config: {
                                    tooltip: {
                                        shared: true
                                    },
                                    legend: {
                                        align: 'center',
                                        verticalAlign: 'bottom',
                                        x: 0,
                                        y: 0
                                    },
                                    yAxis: [{
                                        title: {
                                            text: 'Number of Varieties'
                                        }
                                    }],
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
                            postProcess: [
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                                    "rid" : { "uid" : "area_selection" },
                                    "result" : false,
                                    "parameters": {
                                        "total" : true,
                                        "list":  "false",
                                        "filter" : {

                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": [ "5000" ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },

                                {
                                    "name": "filter",
                                    "sid": [ { "uid": "indicator3" }, { "uid": "area_selection" } ],
                                    "rid" : {"uid": "indicator_data"},
                                    "parameters": {
                                        "columns": [
                                            "species",
                                            "threatened_species"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [ "3_2" ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["3_filter-vd_filter_item_8"]
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
                                                        "codes": [ "ind" ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "sid": [ { "uid": "indicator_data" } ],
                                    "parameters": {
                                        "column": {
                                            "dataType": "text",
                                            "id": "item",
                                            "title": { "EN": "Item" },
                                            "subject": "item",
                                            "key" : true
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "Threatened" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "rid" : { "uid" : "threatened_data" },
                                    "parameters": {
                                        "column": {
                                            "dataType": "number",
                                            "id": "value",
                                            "title": { "EN": "Value" },
                                            "subject": "value"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "@@direct threatened_species" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "sid": [ { "uid": "indicator_data" } ],
                                    "parameters": {
                                        "column": {
                                            "dataType": "text",
                                            "id": "item",
                                            "title": { "EN": "Item" },
                                            "subject": "item",
                                            "key" : true
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "Not threatened" ]
                                        }
                                    }
                                },

                                {
                                    "name": "addcolumn",
                                    "rid" : { "uid" : "non_threatened_data" },
                                    "parameters": {
                                        "column": {
                                            "dataType": "number",
                                            "id": "value",
                                            "title": { "EN": "Value" },
                                            "subject": "value"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "@@direct species - threatened_species" ]
                                        }
                                    }
                                },

                                {
                                    "name": "union",
                                    "sid": [ { "uid": "threatened_data" }, { "uid": "non_threatened_data" } ],
                                    "parameters": {}
                                },

                                {
                                    "name": "addcolumn",
                                    "parameters": {
                                        "column": {
                                            "id" : "um",
                                            "title" : { "EN" : "Measurement unit"},
                                            "dataType" : "code",
                                            "domain" : { "codes" : [ { "idCodeList" : "wiews_um" } ] },
                                            "subject":"um"
                                        },
                                        "value": {
                                            "keys": [ "1=1" ],
                                            "values": [ "num" ]
                                        }
                                    }
                                },

                                {
                                    "name": "filter",
                                    "parameters": {
                                        "columns": [
                                            "item",
                                            "value",
                                            "um"
                                        ]
                                    }
                                }

                            ]





                        }

                    ]
                }
            }
        }

    });
