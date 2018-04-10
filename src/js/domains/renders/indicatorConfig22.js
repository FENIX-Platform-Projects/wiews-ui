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
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_2"],
                            title: labels[Clang]['22_filter-dd_filter_item_1_title'],
                            choicesTitle: [labels[Clang]["22_filter-dd_filter_item_2_choicesTitle1"], labels[Clang]["22_filter-dd_filter_item_5_choicesTitle1"], labels[Clang]["22_filter-dd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_2_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_1"],
                            title: labels[Clang]['22_filter-dd_filter_item_1_title'],
                            //clUid: "ISO3"
                            source : FAO_CL
                        },
                        {
                            id: 'dd_filter_item_2_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_1"],
                            title: labels[Clang]['22_filter-dd_filter_item_1_title'],
                            //clUid: "ISO3"
                            source : CGRFA_CL
                        },
                        {
                            id: 'dd_filter_item_2_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_1"],
                            title: labels[Clang]['22_filter-dd_filter_item_1_title'],
                            //clUid: "ISO3"
                            source : ITPGRFA_CL
                        },
                        {
                            id: 'dd_filter_item_3',
                            type: 'radio',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_2"],
                            choicesTitle: [labels[Clang]["22_filter-dd_filter_item_2_choicesTitle1"], labels[Clang]["22_filter-dd_filter_item_2_choicesTitle2"], labels[Clang]["22_filter-dd_filter_item_2_choicesTitle3"], labels[Clang]["22_filter-dd_filter_item_2_choicesTitle4"], labels[Clang]["22_filter-dd_filter_item_5_choicesTitle1"], labels[Clang]["22_filter-dd_filter_item_5_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_4_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_4_1"],
                            title: labels[Clang]['22_filter-dd_filter_item_4_1_title'],
                            source: FAO_R
                            //clUid: "wiews_fao_region_only",
                            //clBlackList: ['WITC','WITC_t']
                        },
                        {
                            id: 'dd_filter_item_4_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_4_2"],
                            title: labels[Clang]['22_filter-dd_filter_item_4_1_title'],
                            source: M49
                            //clUid: "wiews_m49_region_only",
                            //clBlackList: ['WITC','WITC_t']
                        },
                        {
                            id: 'dd_filter_item_4_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_4_3"],
                            title: labels[Clang]['22_filter-dd_filter_item_4_1_title'],
                            //clUid: "wiews_sdg_region_only"
                            source: SDG
                        },
                        {
                            id: 'dd_filter_item_4_4',
                            type: 'tree',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_4_4"],
                            title: labels[Clang]['22_filter-dd_filter_item_4_1_title'],
                            source: MDG
                            //clUid: "wiews_mdg_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_5',
                            type: 'tree',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_7_1"],
                            title: labels[Clang]['22_filter-dd_filter_item_7_title'],
                            source: CGRFA_R
                            //clUid: "wiews_cgrfa_region_only"
                        },
                        {
                            id: 'dd_filter_item_4_6',
                            type: 'tree',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_7_2"],
                            title: labels[Clang]['22_filter-dd_filter_item_7_title'],
                            source: ITPGRFA_R
                            //clUid: "wiews_itpgrfa_region_only",
                            //clBlackList: ['WITC','WITC_t']
                        },
                        {
                            id: 'dd_filter_item_6',
                            type: 'radio',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_6"],
                            choicesTitle: [labels[Clang]["22_filter-dd_filter_item_6_choicesTitle1"], labels[Clang]["22_filter-dd_filter_item_6_choicesTitle2"]]
                        },
                        {
                            id: 'dd_filter_item_8',
                            type: 'tree',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_8"],
                            title: labels[Clang]['22_filter-dd_filter_item_8_title'],
                            source: [{value: "22", label: labels[Clang]['cl_indicator_22']}],
                            //clUid: "wiews_output_indicators",
                            clCodes : ["22"]
                        },
                        {
                            id: 'dd_filter_item_9',
                            type: 'tree',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_9"],
                            title: labels[Clang]['22_filter-dd_filter_item_9_title'],
                            source: [{value: "1", label: labels[Clang]['cl_period_1']}],
                            //clUid: "wiews_iteration",
                            max: 1
                        },
                        {
                            id: 'dd_filter_item_10',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_10"],
                            title: labels[Clang]['22_filter-dd_filter_item_10_title'],
                            source: [{value: "stk", label: labels[Clang]['22_filter-dd_filter_item_10_source1']}]
                        },
                        {
                            id: 'dd_filter_item_11',
                            type: 'radio',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_11"],
                            title: labels[Clang]['22_filter-dd_filter_item_11_title'],
                            choicesTitle: [labels[Clang]["22_filter-dd_filter_item_11_choicesTitle1"], labels[Clang]["22_filter-dd_filter_item_11_choicesTitle2"], labels[Clang]["22_filter-dd_filter_item_11_choicesTitle3"]]
                        },
                        {
                            id: 'dd_filter_item_12',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["22_filter-dd_filter_item_12"],
                            title: labels[Clang]['22_filter-dd_filter_item_12_title'],
                            choicesTitle: [labels[Clang]["22_filter-dd_filter_item_12_choicesTitle1"], labels[Clang]["22_filter-dd_filter_item_12_choicesTitle2"],labels[Clang]["22_filter-dd_filter_item_12_choicesTitle3"], labels[Clang]["22_filter-dd_filter_item_12_choicesTitle4"]]
                        }
                        ]
                },
                dashboard: {
                    uid: "DownloadDataDashboard",
                    columntableName : [labels[Clang]['22_dd_table_title_col_1'], labels[Clang]['22_dd_table_title_col_2'], labels[Clang]['22_dd_table_title_col_3'], labels[Clang]['22_dd_table_title_col_4'], labels[Clang]['22_dd_table_title_col_5'], labels[Clang]['22_dd_table_title_col_6']],
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
                                                "codes": DOWNLOAD_DV["22_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "sid": [ { "uid": "indicator22" }, { "uid": "area_selection" } ],
                            "name": "filter",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "wiews_region",
                                    "indicator",
                                    "iteration",
                                    "value",
                                    "um",
                                    "element",
                                    "stakeholder",
                                    "rank"
                                ],
                                "rows": {
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["22_filter-dd_filter_item_9"]
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
                                        "element = 'stk'", "element <> 'stk'"
                                    ],
                                    "values": [
                                        "@@direct'Indicator (' || stakeholder || ' / ' || stakeholder_en || ')'","@@directelement_en"
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
                                "indicator":"DESC",
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
                        },
                        {
                            "name": "filter",
                            "parameters": {
                                "columns": [
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
                                                "codes": DOWNLOAD_DV["22_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "sid": [ { "uid": "indicator22" }, { "uid": "area_selection" } ],
                            "name": "filter",
                            "parameters": {
                                "columns": [
                                    "domain",
                                    "wiews_region",
                                    "indicator",
                                    "iteration",
                                    "value",
                                    "um",
                                    "element",
                                    "stakeholder",
                                    "rank"
                                ],
                                "rows": {
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["22_filter-dd_filter_item_9"]
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
                                        "element = 'stk'", "element <> 'stk'"
                                    ],
                                    "values": [
                                        "@@direct'Indicator (' || stakeholder || ' / ' || stakeholder_en || ')'","@@directelement_en"
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
                                "indicator":"DESC",
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
                                                "codes": DOWNLOAD_DV["22_filter-dd_filter_item_1"]
                                            }
                                        ]
                                    }
                                }
                            }
                        },

                        {
                            "name": "filter",
                            "sid": [ { "uid": "raw_indicator22" }, { "uid": "area_selection" } ],
                            "parameters": {
                                "rows": {
                                    "iteration": {
                                        "codes": [
                                            {
                                                "uid": "wiews_iteration",
                                                "codes": DOWNLOAD_DV["22_filter-dd_filter_item_9"]
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
                                    "accessions_num",
                                    "accessions_regenerated",
                                    "accessions_need_regeneration",
                                    "accessions_out_of_budget"
                                ]
                            }
                        }
                    ]
                }
            }
        }

    });
