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
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_1"],
                            title: labels[Clang]['1_filter-dd_filter_item_1_title'],
                            clUid: "ISO3"
                        },
                        {
                            id: 'dd_filter_item_2',
                            type: 'radio',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_2"],
                            choicesTitle: [labels[Clang]["1_filter-dd_filter_item_2_choicesTitle1"], labels[Clang]["1_filter-dd_filter_item_2_choicesTitle2"], labels[Clang]["1_filter-dd_filter_item_2_choicesTitle3"], labels[Clang]["1_filter-dd_filter_item_2_choicesTitle4"]]
                        },
                        {
                            id: 'dd_filter_item_3',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_3"],
                            choicesTitle: [labels[Clang]["1_filter-dd_filter_item_3_choicesTitle1"], labels[Clang]["1_filter-dd_filter_item_3_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_4_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_4_1"],
                            title: labels[Clang]['1_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_fao_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_4_2"],
                            title: labels[Clang]['1_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_m49_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_4_3"],
                            title: labels[Clang]['1_filter-dd_filter_item_4_1_title'],
                            clUid: "sdg_region"
                        },
                        {
                            id: 'dd_filter_item_4_4',
                            type: 'tree',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_4_4"],
                            title: labels[Clang]['1_filter-dd_filter_item_4_1_title'],
                            clUid: "mdg_region"
                        },
                        {
                            id: 'dd_filter_item_5',
                            type: 'radio',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_5"],
                            choicesTitle: [labels[Clang]["1_filter-dd_filter_item_5_choicesTitle1"], labels[Clang]["1_filter-dd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_6',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_6"],
                            choicesTitle: [labels[Clang]["1_filter-dd_filter_item_6_choicesTitle1"], labels[Clang]["1_filter-dd_filter_item_6_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_7_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_7_1"],
                            title: labels[Clang]['1_filter-dd_filter_item_7_title'],
                            clUid: "wiews_cgrfa"
                        },
                        {
                            id: 'dd_filter_item_7_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_7_2"],
                            title: labels[Clang]['1_filter-dd_filter_item_7_title'],
                            clUid: "wiews_itpgrfa"
                        },
                        {
                            id: 'dd_filter_item_8',
                            type: 'tree',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_8"],
                            title: labels[Clang]['1_filter-dd_filter_item_8_title'],
                            clUid: "wiews_output_indicators",
                            clCodes : ["20"]
                        },
                        {
                            id: 'dd_filter_item_9',
                            type: 'tree',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_9"],
                            title: labels[Clang]['1_filter-dd_filter_item_9_title'],
                            clUid: "wiews_iteration",
                            max: 1
                        },
                        {
                            id: 'dd_filter_item_10',
                            type: 'tree',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_10"],
                            title: labels[Clang]['1_filter-dd_filter_item_10_title'],
                            source: [{value: "stk", label: labels[Clang]['1_filter-dd_filter_item_10_source1']}]
                        },
                        {
                            id: 'dd_filter_item_11',
                            type: 'radio',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_11"],
                            title: labels[Clang]['1_filter-dd_filter_item_11_title'],
                            choicesTitle: [labels[Clang]["1_filter-dd_filter_item_11_choicesTitle1"], labels[Clang]["1_filter-dd_filter_item_11_choicesTitle2"], labels[Clang]["1_filter-dd_filter_item_11_choicesTitle3"]]
                        },
                        {
                            id: 'dd_filter_item_12',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["1_filter-dd_filter_item_12"],
                            title: labels[Clang]['1_filter-dd_filter_item_12_title'],
                            choicesTitle: [labels[Clang]["1_filter-dd_filter_item_12_choicesTitle1"], labels[Clang]["1_filter-dd_filter_item_12_choicesTitle2"],labels[Clang]["1_filter-dd_filter_item_12_choicesTitle3"], labels[Clang]["1_filter-dd_filter_item_12_choicesTitle4"]]
                        }
                        ]
                },
                dashboard: {

                    uid: "DownloadDataDashboard",
                    columntableName : [labels[Clang]['1_dd_table_title_col_1'], labels[Clang]['1_dd_table_title_col_2'], labels[Clang]['1_dd_table_title_col_3'], labels[Clang]['1_dd_table_title_col_4'], labels[Clang]['1_dd_table_title_col_5'], labels[Clang]['1_dd_table_title_col_6']],
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
                                                "codes": DOWNLOAD_DV["1_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "sid": [ { "uid": "indicator20" }, { "uid": "area_selection" } ],
                            "name": "filter",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "rank",
                                    "wiews_region",
                                    "indicator",
                                    "iteration",
                                    "value",
                                    "um",
                                    "element",
                                    "biologicalAccessionId",
                                    "stakeholder"
                                ],
                                "rows": {
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["1_filter-dd_filter_item_9"]
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
                                    "wiews_region" : {
                                        "variable" : "required_countries"
                                    }
                                }
                            }
                        },

                        {
                            "name":"addcolumn",
                            "index" : -2,
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
                                "values" : {
                                    "iteration" : null,
                                    "domain" : null,
                                    "element" : null,
                                    "biologicalAccessionId" : null,
                                    "rank" : null,
                                    "wiews_region" : null,
                                    "stakeholder" : null,
                                    "value" : null,
                                    "um" : null,
                                    "indicator" : null,
                                    "indicator_label" : "case when element = 'stk' then 'Indicator (' || stakeholder || ' / ' || stakeholder_en || ')' else element_en end"
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
                                                "codes": DOWNLOAD_DV["1_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "sid": [ { "uid": "indicator20" }, { "uid": "area_selection" } ],
                            "name": "filter",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "rank",
                                    "wiews_region",
                                    "indicator",
                                    "element",
                                    "biologicalAccessionId",
                                    "iteration",
                                    "stakeholder",
                                    "value",
                                    "um"
                                ],
                                "rows": {
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["1_filter-dd_filter_item_9"]
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
                                    "wiews_region" : {
                                        "variable" : "required_countries"
                                    }
                                }
                            }
                        },

                        {
                            "name":"addcolumn",
                            "index" : -2,
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
                                "values" : {
                                    "iteration" : null,
                                    "domain" : null,
                                    "biologicalAccessionId" : null,
                                    "rank" : null,
                                    "wiews_region" : null,
                                    "value" : null,
                                    "um" : null,
                                    "indicator_label" : "case when element = 'stk' then 'Indicator (' || stakeholder || ' / ' || stakeholder_en || ')' else element_en end"
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
                                            "codes": DOWNLOAD_DV["1_filter-dd_filter_item_1"]
                                        }
                                    ]
                                }
                            }
                        }
                    },
                        {
                            "name": "filter",
                            "sid": [ { "uid": "raw_indicator20" }, { "uid": "area_selection" } ],
                            "parameters": {
                                "rows": {
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["1_filter-dd_filter_item_9"]
                                            }
                                        ]
                                    },
                                    "country" : {
                                        "variable" : "required_countries"
                                    }
                                }
                            }
                        }]

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
                            default: VISUALIZE_DV["1_filter-vd_filter_item_1"],
                            title: labels[Clang]['1_filter-vd_filter_item_1_title'],
                            clUid: "ISO3"
                        },
                        {
                            id: 'vd_filter_item_2',
                            type: 'radio',
                            default: VISUALIZE_DV["1_filter-vd_filter_item_2"],
                            choicesTitle: [labels[Clang]["1_filter-vd_filter_item_2_choicesTitle1"], labels[Clang]["1_filter-vd_filter_item_2_choicesTitle2"], labels[Clang]["1_filter-vd_filter_item_2_choicesTitle3"], labels[Clang]["1_filter-vd_filter_item_2_choicesTitle4"]]
                        },
                        {
                            id: 'vd_filter_item_3',
                            type: 'checkbox',
                            default: VISUALIZE_DV["1_filter-vd_filter_item_3"],
                            choicesTitle: [labels[Clang]["1_filter-vd_filter_item_3_choicesTitle1"], labels[Clang]["1_filter-vd_filter_item_3_choicesTitle2"]]
                        },
                        {
                            id: 'vd_filter_item_4_1',
                            type: 'tree',
                            default: VISUALIZE_DV["1_filter-vd_filter_item_4_1"],
                            title: labels[Clang]['1_filter-vd_filter_item_4_1_title'],
                            clUid: "wiews_fao_region_only"
                        },
                        {
                            id: 'vd_filter_item_4_2',
                            type: 'tree',
                            default: VISUALIZE_DV["1_filter-vd_filter_item_4_2"],
                            title: labels[Clang]['1_filter-vd_filter_item_4_1_title'],
                            clUid: "wiews_m49_region_only"
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
                            default: VISUALIZE_DV["1_filter-vd_filter_item_5"],
                            choicesTitle: [labels[Clang]["1_filter-vd_filter_item_5_choicesTitle1"], labels[Clang]["1_filter-vd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'vd_filter_item_6',
                            type: 'checkbox',
                            default: VISUALIZE_DV["1_filter-vd_filter_item_6"],
                            choicesTitle: [labels[Clang]["1_filter-vd_filter_item_6_choicesTitle1"], labels[Clang]["1_filter-vd_filter_item_6_choicesTitle2"]]
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
                                        text: labels[Clang]['1_vd_dashboard_item_1_title']
                                    },
                                    buttons: {
                                        export: {
                                            show: true //Default= true
                                        }
                                    },
                                    footer: {
                                        text: labels[Clang]['1_vd_dashboard_item_1_footer']
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['1_vd_dashboard_item_1_uid'],
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
                                    "sid": [{"uid": "wiews_region_mapping"}, {"uid": "wiews_region_countries"}],
                                    "rid": {"uid": "area_selection"},
                                    "result": false,
                                    "parameters": {
                                        "total": false,
                                        "filter": {
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": VISUALIZE_DV["1_filter-vd_filter_item_4_1"]
                                                    }
                                                ]
                                            },
                                        }
                                    }
                                },

                                {
                                    "sid": [{"uid": "indicator20"}, {"uid": "area_selection"}],
                                    "name": "select",
                                    "parameters": {
                                        "query": "where wiews_region in <<required_countries>>",
                                        "values": {
                                            "genus": null,
                                            "iteration": null,
                                            "domain": null,
                                            "element": null,
                                            "biologicalAccessionId": null,
                                            "country": null,
                                            "stakeholder": null,
                                            "value": null,
                                            "um": null
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
                                                "columns": ["value"],
                                                "rule": "SUM"
                                            },
                                            {
                                                "columns": ["um"],
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
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-chart panel panel-default hoverable',
                                    title: {
                                        text: labels[Clang]['1_vd_dashboard_item_2_title']
                                    },
                                    footer: {
                                        show: false
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['1_vd_dashboard_item_2_uid'],
                            config: {
                                type: "pieold",
                                x: ["biologicalAccessionId_" + ClangUp], //x axis and series
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
                            postProcess: [
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [{"uid": "wiews_region_mapping"}, {"uid": "wiews_region_countries"}],
                                    "rid": {"uid": "area_selection"},
                                    "result": false,
                                    "parameters": {
                                        "filter": {
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": VISUALIZE_DV["1_filter-vd_filter_item_4_1"]
                                                    }
                                                ]
                                            },
                                        }
                                    }
                                },

                                {
                                    "sid": [{"uid": "indicator20"}, {"uid": "area_selection"}],
                                    "name": "select",
                                    "parameters": {
                                        "query": "where wiews_region in <<required_countries>>",
                                        "values": {
                                            "genus": null,
                                            "iteration": null,
                                            "domain": null,
                                            "element": null,
                                            "biologicalAccessionId": null,
                                            "country": null,
                                            "stakeholder": null,
                                            "value": null,
                                            "um": null
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
                                                "columns": ["value"],
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
                            hostConfig: {
                                itemContainer: {
                                    class: 'fs-chart panel panel-default hoverable',
                                    title: {
                                        text: labels[Clang]['1_vd_dashboard_item_3_title']
                                    },
                                    footer: {
                                        show: false
                                    }
                                }
                            },
                            //This is used for the export button action
                            uid: labels[Clang]['1_vd_dashboard_item_3_uid'],
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
                                    "sid": [{"uid": "wiews_region_mapping"}, {"uid": "wiews_region_countries"}],
                                    "rid": {"uid": "area_selection"},
                                    "result": false,
                                    "parameters": {
                                        "total": false,
                                        "filter": {
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": VISUALIZE_DV["1_filter-vd_filter_item_4_1"]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "sid": [{"uid": "indicator20"}, {"uid": "area_selection"}],
                                    "name": "select",
                                    "parameters": {
                                        "query": "where wiews_region in <<required_countries>>",
                                        "values": {
                                            "genus": null,
                                            "iteration": null,
                                            "domain": null,
                                            "element": null,
                                            "biologicalAccessionId": null,
                                            "country": null,
                                            "stakeholder": null,
                                            "value": null,
                                            "um": null
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
                                                "columns": ["value"],
                                                "rule": "SUM"
                                            },
                                            {
                                                "columns": ["um"],
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
                            postProcess: [
                                {
                                    "name": "wiews_area_filter",
                                    "sid": [{"uid": "wiews_region_mapping"}, {"uid": "wiews_region_countries"}],
                                    "rid": {"uid": "area_selection"},
                                    "result": false,
                                    "parameters": {
                                        "filter": {
                                            "fao": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_fao_region_only",
                                                        "codes": VISUALIZE_DV["1_filter-vd_filter_item_4_1"]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },

                                {
                                    "sid": [{"uid": "indicator20"}, {"uid": "area_selection"}],
                                    "name": "select",
                                    "parameters": {
                                        "query": "where wiews_region in <<required_countries>>",
                                        "values": {
                                            "genus": null,
                                            "iteration": null,
                                            "domain": null,
                                            "element": null,
                                            "biologicalAccessionId": null,
                                            "country": null,
                                            "stakeholder": null,
                                            "value": null,
                                            "um": null
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
                                            "element": {
                                                "codes": [
                                                    {
                                                        "uid": "wiews_elements",
                                                        "codes": ["stk"]
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
                                                "columns": ["value"],
                                                "rule": "SUM"
                                            },
                                            {
                                                "columns": ["um"],
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
