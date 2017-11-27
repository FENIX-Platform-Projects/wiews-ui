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
                            default: 'dd_filter_item_1'
                        }
                    },
                    items: [
                        {
                            id: 'dd_filter_item_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_1"],
                            title: labels[Clang]['9_filter-dd_filter_item_1_title'],
                            clUid: "ISO3"
                        },
                        {
                            id: 'dd_filter_item_2',
                            type: 'radio',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_2"],
                            choicesTitle: [labels[Clang]["9_filter-dd_filter_item_2_choicesTitle1"], labels[Clang]["9_filter-dd_filter_item_2_choicesTitle2"], labels[Clang]["9_filter-dd_filter_item_2_choicesTitle3"], labels[Clang]["9_filter-dd_filter_item_2_choicesTitle4"]]
                        },
                        {
                            id: 'dd_filter_item_3',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_3"],
                            choicesTitle: [labels[Clang]["9_filter-dd_filter_item_3_choicesTitle1"], labels[Clang]["9_filter-dd_filter_item_3_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_4_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_4_1"],
                            title: labels[Clang]['9_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_fao_region_only",
                            clBlackList: ['WITC']
                        },
                        {
                            id: 'dd_filter_item_4_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_4_2"],
                            title: labels[Clang]['9_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_m49_region_only",
                            clBlackList: ['WITC']
                        },
                        {
                            id: 'dd_filter_item_4_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_4_3"],
                            title: labels[Clang]['9_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_sdg_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_4',
                            type: 'tree',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_4_4"],
                            title: labels[Clang]['9_filter-dd_filter_item_4_1_title'],
                            clUid: "wiews_mdg_region_only"
                        },
                        {
                            id: 'dd_filter_item_5',
                            type: 'radio',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_5"],
                            choicesTitle: [labels[Clang]["9_filter-dd_filter_item_5_choicesTitle1"], labels[Clang]["9_filter-dd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_6',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_6"],
                            choicesTitle: [labels[Clang]["9_filter-dd_filter_item_6_choicesTitle1"], labels[Clang]["9_filter-dd_filter_item_6_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_7_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_7_1"],
                            title: labels[Clang]['9_filter-dd_filter_item_7_title'],
                            clUid: "wiews_cgrfa_region_only"
                        },
                        {
                            id: 'dd_filter_item_7_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_7_2"],
                            title: labels[Clang]['9_filter-dd_filter_item_7_title'],
                            clUid: "wiews_itpgrfa_region_only",
                            clBlackList: ['WITC']
                        },
                        {
                            id: 'dd_filter_item_8',
                            type: 'tree',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_8"],
                            title: labels[Clang]['9_filter-dd_filter_item_8_title'],
                            clUid: "wiews_output_indicators",
                            clCodes : ["28"]
                        },
                        {
                            id: 'dd_filter_item_9',
                            type: 'tree',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_9"],
                            title: labels[Clang]['9_filter-dd_filter_item_9_title'],
                            clUid: "wiews_iteration",
                            max: 1
                        },
                        {
                            id: 'dd_filter_item_10',
                            type: 'tree',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_10"],
                            title: labels[Clang]['9_filter-dd_filter_item_10_title'],
                            source: [{value: "stk", label: labels[Clang]['9_filter-dd_filter_item_10_source1']}]
                        },
                        {
                            id: 'dd_filter_item_11',
                            type: 'radio',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_11"],
                            title: labels[Clang]['9_filter-dd_filter_item_11_title'],
                            choicesTitle: [labels[Clang]["9_filter-dd_filter_item_11_choicesTitle1"], labels[Clang]["9_filter-dd_filter_item_11_choicesTitle2"], labels[Clang]["9_filter-dd_filter_item_11_choicesTitle3"]]
                        },
                        {
                            id: 'dd_filter_item_12',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["9_filter-dd_filter_item_12"],
                            title: labels[Clang]['9_filter-dd_filter_item_12_title'],
                            choicesTitle: [labels[Clang]["9_filter-dd_filter_item_12_choicesTitle1"], labels[Clang]["9_filter-dd_filter_item_12_choicesTitle2"],labels[Clang]["9_filter-dd_filter_item_12_choicesTitle3"], labels[Clang]["9_filter-dd_filter_item_12_choicesTitle4"]]
                        }
                        ]
                },
                dashboard: {

                    uid: "DownloadDataDashboard",
                    columntableName : [labels[Clang]['9_dd_table_title_col_1'], labels[Clang]['9_dd_table_title_col_2'], labels[Clang]['9_dd_table_title_col_3'], labels[Clang]['9_dd_table_title_col_4'], labels[Clang]['9_dd_table_title_col_5'], labels[Clang]['9_dd_table_title_col_6']],
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
                                                "uid": "wiews_m49_region_only",
                                                "codes": DOWNLOAD_DV["9_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "sid": [ { "uid": "indicator28" }, { "uid": "area_selection" } ],
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
                                                "codes": DOWNLOAD_DV["9_filter-dd_filter_item_9"]
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
                            "name":"order",
                            "parameters":{
                                "iteration":"ASC",
                                "rank":"ASC",
                                "wiews_region":"ASC",
                                "indicator":"ASC",
                                "indicator_label":"ASC"
                            }
                        },
                        {
                            "name": "columns",
                            "parameters" : {
                                "columns" : [
                                    "domain",
                                    "wiews_region_EN",
                                    "indicator",
                                    "indicator_label",
                                    "iteration",
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
                                        "m49": {
                                            "codes": [
                                                {
                                                    "uid": "wiews_m49_region_only",
                                                    "codes": DOWNLOAD_DV["9_filter-dd_filter_item_1"]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },

                            {
                                "sid": [ { "uid": "indicator28" }, { "uid": "area_selection" } ],
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
                                                    "codes": DOWNLOAD_DV["9_filter-dd_filter_item_9"]
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
                                "name":"order",
                                "parameters":{
                                    "iteration":"ASC",
                                    "rank":"ASC",
                                    "wiews_region_EN":"ASC",
                                    "indicator":"ASC",
                                    "indicator_label":"ASC"
                                }
                            },
                            {
                                "name": "columns",
                                "parameters" : {
                                    "columns" : [
                                        "domain",
                                        "wiews_region",
                                        "indicator",
                                        "indicator_label",
                                        "iteration",
                                        "value",
                                        "um"
                                    ]
                                }
                            }

                        ],
                    downloadProcessRawData :  [
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
                                                    "codes": DOWNLOAD_DV["9_filter-dd_filter_item_1"]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },

                            {
                                "name": "filter",
                                "sid": [ { "uid": "raw_indicator28" }, { "uid": "area_selection" } ],
                                "parameters": {
                                    "rows": {
                                        "iteration": {
                                            "codes": [
                                                {
                                                    "uid": "wiews_iteration",
                                                    "codes": DOWNLOAD_DV["9_filter-dd_filter_item_9"]
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
                                "name":"order",
                                "parameters":{
                                    "iteration":"ASC",
                                    "country":"ASC",
                                    "organization_name":"ASC",
                                    "crop_name":"ASC",
                                    "crop_name_local":"ASC"
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
                                        "crop_id",
                                        "crop_name",
                                        "crop_name_local",
                                        "accessions_by_genebank",
                                        "accessions_by_research_centre",
                                        "accessions_by_private_sector",
                                        "accessions_by_farmer",
                                        "accessions_by_other_national",
                                        "accessions_by_stakeholder",
                                        "accessions_by_unknown",
                                        "samples_by_genebank",
                                        "samples_by_research_centre",
                                        "samples_by_private_sector",
                                        "samples_by_farmer",
                                        "samples_by_other_national",
                                        "samples_by_stakeholder",
                                        "samples_by_unknown"
                                    ]
                                }
                            }
                        ]
                }
            }
        }
    });
