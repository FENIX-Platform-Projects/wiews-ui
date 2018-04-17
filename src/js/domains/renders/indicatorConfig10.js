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
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_2"],
                            title: labels[Clang]['10_filter-dd_filter_item_1_title'],
                            choicesTitle: [labels[Clang]["10_filter-dd_filter_item_2_choicesTitle1"], labels[Clang]["10_filter-dd_filter_item_5_choicesTitle1"], labels[Clang]["10_filter-dd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_2_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_1"],
                            title: labels[Clang]['10_filter-dd_filter_item_1_title'],
                            //clUid: "ISO3"
                            source : FAO_CL
                        },
                        {
                            id: 'dd_filter_item_2_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_1"],
                            title: labels[Clang]['10_filter-dd_filter_item_1_title'],
                            //clUid: "ISO3"
                            source : CGRFA_CL
                        },
                        {
                            id: 'dd_filter_item_2_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_1"],
                            title: labels[Clang]['10_filter-dd_filter_item_1_title'],
                            //clUid: "ISO3"
                            source : ITPGRFA_CL
                        },
                        {
                            id: 'dd_filter_item_3',
                            type: 'radio',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_2"],
                            choicesTitle: [labels[Clang]["10_filter-dd_filter_item_2_choicesTitle1"], labels[Clang]["10_filter-dd_filter_item_2_choicesTitle2"], labels[Clang]["10_filter-dd_filter_item_2_choicesTitle3"], labels[Clang]["10_filter-dd_filter_item_2_choicesTitle4"], labels[Clang]["10_filter-dd_filter_item_5_choicesTitle1"], labels[Clang]["10_filter-dd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_4_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_4_1"],
                            title: labels[Clang]['10_filter-dd_filter_item_4_1_title'],
                            source: FAO_R
                            //clUid: "wiews_fao_region_only",
                            //clBlackList: ['WITC','WITC_t']
                        },
                        {
                            id: 'dd_filter_item_4_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_4_2"],
                            title: labels[Clang]['10_filter-dd_filter_item_4_1_title'],
                            source: M49
                            //clUid: "wiews_m49_region_only",
                            //clBlackList: ['WITC','WITC_t']
                        },
                        {
                            id: 'dd_filter_item_4_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_4_3"],
                            title: labels[Clang]['10_filter-dd_filter_item_4_1_title'],
                            //clUid: "wiews_sdg_region_only"
                            source: SDG
                        },
                        {
                            id: 'dd_filter_item_4_4',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_4_4"],
                            title: labels[Clang]['10_filter-dd_filter_item_4_1_title'],
                            source: MDG
                            //clUid: "wiews_mdg_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_5',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_7_1"],
                            title: labels[Clang]['10_filter-dd_filter_item_7_title'],
                            source: CGRFA_R
                            //clUid: "wiews_cgrfa_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_6',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_7_2"],
                            title: labels[Clang]['10_filter-dd_filter_item_7_title'],
                            source: ITPGRFA_R
                            //clUid: "wiews_itpgrfa_region_only",
                            //clBlackList: ['WITC','WITC_t']
                        },
                        {
                            id: 'dd_filter_item_6',
                            type: 'radio',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_6"],
                            choicesTitle: [labels[Clang]["10_filter-dd_filter_item_6_choicesTitle1"], labels[Clang]["10_filter-dd_filter_item_6_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_8',
                            type: 'tree',
                            default: DOWNLOAD_DV["10_filter-dd_filter_item_8"],
                            title: labels[Clang]['10_filter-dd_filter_item_8_title'],
                            source: [{value: "10", label: labels[Clang]['cl_indicator_10']}],
                            //clUid: "wiews_output_indicators"
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
                            id: 'dd_filter_item_11',
                            type: 'radio',
                            default: DOWNLOAD_DV["2_filter-dd_filter_item_10"],
                            title: labels[Clang]['2_filter-dd_filter_item_10_title'],
                            choicesTitle: [labels[Clang]["2_filter-dd_filter_item_10_choicesTitle1"], labels[Clang]["2_filter-dd_filter_item_10_choicesTitle2"], labels[Clang]["2_filter-dd_filter_item_10_choicesTitle3"]]
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
                                                "codes": DOWNLOAD_DV["4_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "sid": [ { "uid": "indicator10" }, { "uid": "area_selection" } ],
                            "name": "filter",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "wiews_region",
                                    "indicator",
                                    "element",
                                    "iteration",
                                    "value",
                                    "um",
                                    "rank"
                                ],
                                "rows": {
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "wiews_output_indicators",
                                                "codes": DOWNLOAD_DV["4_filter-dd_filter_item_8"]
                                            }
                                        ]
                                    },
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["4_filter-dd_filter_item_9"]
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
                                    "iteration",
                                    "wiews_region",
                                    "indicator",
                                    "element",
                                    "value",
                                    "um"
                                ]
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
                                                "codes": DOWNLOAD_DV["4_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "sid": [ { "uid": "indicator10" }, { "uid": "area_selection" } ],
                            "name": "filter",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "wiews_region",
                                    "indicator",
                                    "element",
                                    "iteration",
                                    "value",
                                    "um",
                                    "rank"
                                ],
                                "rows": {
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "wiews_output_indicators",
                                                "codes": DOWNLOAD_DV["4_filter-dd_filter_item_8"]
                                            }
                                        ]
                                    },
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["4_filter-dd_filter_item_9"]
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
                                    "iteration",
                                    "wiews_region",
                                    "indicator",
                                    "element",
                                    "value",
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
                                "total" : false,
                                "filter" : {
                                    "iso3": {
                                        "codes": [
                                            {
                                                "uid": "ISO3",
                                                "codes": DOWNLOAD_DV["4_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "name": "filter",
                            "sid": [ { "uid": "raw_indicator10" }, { "uid": "area_selection" } ],
                            "parameters": {
                                "rows": {
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["4_filter-dd_filter_item_9"]
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
                                "organization_name" : "ASC"
                            }
                        },
                        {
                            "name": "columns",
                            "parameters" : {
                                "columns" : [
                                    "iteration",
                                    "country_iso3",
                                    "country",
                                    "org_id",
                                    "organization_name",
                                    "sites_total",
                                    "sites_with_management"
                                ]
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
                            default: VISUALIZE_DV["4_filter-vd_filter_item_1"],
                            title: labels[Clang]['4_filter-vd_filter_item_1_title'],
                            clUid: "ISO3"
                        },
                        {
                            id: 'vd_filter_item_2',
                            type: 'radio',
                            default: VISUALIZE_DV["4_filter-vd_filter_item_2"],
                            choicesTitle: [labels[Clang]["4_filter-vd_filter_item_2_choicesTitle1"], labels[Clang]["4_filter-vd_filter_item_2_choicesTitle2"], labels[Clang]["4_filter-vd_filter_item_2_choicesTitle3"], labels[Clang]["4_filter-vd_filter_item_2_choicesTitle4"]]
                        },
                        {
                            id: 'vd_filter_item_3',
                            type: 'checkbox',
                            default: VISUALIZE_DV["4_filter-vd_filter_item_3"],
                            choicesTitle: [labels[Clang]["4_filter-vd_filter_item_3_choicesTitle1"], labels[Clang]["4_filter-vd_filter_item_3_choicesTitle2"]]
                        },
                        {
                            id: 'vd_filter_item_4_1',
                            type: 'tree',
                            default: VISUALIZE_DV["4_filter-vd_filter_item_4_1"],
                            title: labels[Clang]['4_filter-vd_filter_item_4_1_title'],
                            clUid: "wiews_fao_region_only"
                        },
                        {
                            id: 'vd_filter_item_4_2',
                            type: 'tree',
                            default: VISUALIZE_DV["4_filter-vd_filter_item_4_2"],
                            title: labels[Clang]['4_filter-vd_filter_item_4_1_title'],
                            clUid: "wiews_m49_region_only"
                        },
                        {
                            id: 'vd_filter_item_4_3',
                            type: 'tree',
                            default: VISUALIZE_DV["4_filter-vd_filter_item_4_3"],
                            title: labels[Clang]['4_filter-vd_filter_item_4_1_title'],
                            clUid: "wiews_sdg_region_only"
                        },
                        {
                            id: 'vd_filter_item_4_4',
                            type: 'tree',
                            default: VISUALIZE_DV["4_filter-vd_filter_item_4_4"],
                            title: labels[Clang]['4_filter-vd_filter_item_4_1_title'],
                            clUid: "wiews_mdg_region_only"
                        },
                        {
                            id: 'vd_filter_item_5',
                            type: 'radio',
                            default: VISUALIZE_DV["4_filter-vd_filter_item_5"],
                            choicesTitle: [labels[Clang]["4_filter-vd_filter_item_5_choicesTitle1"], labels[Clang]["4_filter-vd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'vd_filter_item_6',
                            type: 'checkbox',
                            default: VISUALIZE_DV["4_filter-vd_filter_item_6"],
                            choicesTitle: [labels[Clang]["4_filter-vd_filter_item_6_choicesTitle1"], labels[Clang]["4_filter-vd_filter_item_6_choicesTitle2"]]
                        },
                        {
                            id: 'vd_filter_item_7_1',
                            type: 'tree',
                            default: VISUALIZE_DV["4_filter-vd_filter_item_7_1"],
                            title: labels[Clang]['4_filter-vd_filter_item_7_title'],
                            clUid: "wiews_cgrfa_region_only"
                        },
                        {
                            id: 'vd_filter_item_7_2',
                            type: 'tree',
                            default: VISUALIZE_DV["4_filter-vd_filter_item_7_2"],
                            title: labels[Clang]['4_filter-vd_filter_item_7_title'],
                            clUid: "wiews_itpgrfa_region_only"
                        },
                        {
                            id: 'vd_filter_item_8',
                            type: 'tree',
                            default: VISUALIZE_DV["4_filter-vd_filter_item_8"],
                            title: labels[Clang]['4_filter-vd_filter_item_8_title'],
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
                                        text: labels[Clang]['4_vd_dashboard_item_1_title']
                                    },
                                    buttons: {
                                        export: {
                                            show: true //Default= true
                                        }
                                    },
                                    footer: {
                                        text: labels[Clang]['4_vd_dashboard_item_1_footer']
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['4_vd_dashboard_item_1_uid'],
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
                            postProcess:[
                                    {

                                        "name": "wiews_area_filter",

                                        "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],

                                        "rid" : { "uid" : "area_selection" },

                                        "result" : false,

                                        "parameters": {

                                            "total":  false,

                                            "filter": {
                                                "fao": {
                                                    "codes": [
                                                        {
                                                            "uid": "wiews_fao_region_only",
                                                            "codes": VISUALIZE_DV["4_filter-vd_filter_item_4_1"]
                                                        }
                                                    ]
                                                },
                                            }

                                        }

                                    },

                                    {

                                        "name": "filter",

                                        "sid": [ { "uid": "indicator10" }, { "uid": "area_selection" } ],

                                        "parameters": {

                                            "columns": [

                                                "country",

                                                "value",

                                                "um",

                                                "managed_sites",

                                                "total_sites"

                                            ],

                                            "rows": {

                                                "indicator": {

                                                    "codes": [

                                                        {

                                                            "uid": "wiews_output_indicators",

                                                            "codes": [ "10" ]

                                                        }

                                                    ]

                                                },

                                                "iteration": {
                                                    "codes": [
                                                        {
                                                            "uid": "wiews_iteration",
                                                            "codes": VISUALIZE_DV["4_filter-vd_filter_item_8"]
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

                                    }

                                ]
                        },
                        {
                            id: 'vd_dashboard_item_2', // TOP RECIPIENTS Vs OTHER RECIPIENTS
                            type: 'chart',
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-chart panel panel-default hoverable',
                                    title: {
                                        text: labels[Clang]['4_vd_dashboard_item_2_title']
                                    },
                                    footer: {
                                        show: false
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['4_vd_dashboard_item_2_uid'],
                            config: {
                                type: "pieold",
                                // x: ["um_" + ClangUp], //x axis and series
                                //series: ["item"], // series
                                x: ["item"], //x axis and series
                                series: ["unitname"],
                                //series: ["um_" + ClangUp], // series
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
                                            return '<b>' + val + '</b>';
                                        }
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
                                        "list":  false,
                                        "filter": {
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": VISUALIZE_DV["4_filter-vd_filter_item_4_1"]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "name": "filter",
                                    "sid": [ { "uid": "indicator10" }, { "uid": "area_selection" } ],
                                    "parameters": {
                                        "columns": [
                                            "managed_sites",
                                            "total_sites"
                                        ],
                                        "rows": {
                                            "indicator": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_output_indicators",
                                                        "codes": [ "10" ]
                                                    }
                                                ]
                                            },
                                            "iteration": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_iteration",
                                                        "codes": VISUALIZE_DV["4_filter-vd_filter_item_8"]
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

                                    "rid" : {"uid" : "indicator_data"},

                                    "parameters": {

                                        "column": {

                                            "dataType": "number",

                                            "id": "value",

                                            "title": { "EN": "Item" },

                                            "subject": "value"

                                        },

                                        "value": {

                                            "keys": [ "1=1" ],

                                            "values": [ "0" ]

                                        }

                                    }

                                },



                                {

                                    "name" : "select",

                                    "parameters" : {

                                        "values" : {

                                            "value" : "managed_sites"

                                        }

                                    }

                                },

                                {

                                    "name": "addcolumn",

                                    "rid" : {"uid" : "managed_sites"},

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

                                            "values": [ "Managed sites" ]

                                        }

                                    }

                                },



                                {

                                    "name" : "select",

                                    "sid": [ { "uid": "indicator_data" } ],

                                    "parameters" : {

                                        "values" : {

                                            "value" : "(total_sites-managed_sites)"

                                        }

                                    }

                                },

                                {

                                    "name": "addcolumn",

                                    "rid" : {"uid" : "total_sites"},

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

                                            "values": [ "Other sites" ]

                                        }

                                    }

                                },



                                {

                                    "name" : "union",

                                    "sid": [ { "uid": "managed_sites" }, { "uid": "total_sites" } ],

                                    "parameters" : {

                                        "logic" : "extend"

                                    }

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

                                }
                            ]
                        }
                    ]
                }
            }
        }

    });
