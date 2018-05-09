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
                            default: DOWNLOAD_DV["filter-dd_filter_item_2"],
                            title: labels[Clang]['geofilter_countries'],
                            choicesTitle: [labels[Clang]["filter_hierarchy_fao"], labels[Clang]["filter_hierarchy_cgrfa"], labels[Clang]["filter_hierarchy_itpgrfa"]]
                        },
                        {
                            id: 'dd_filter_item_2_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_1"],
                            title: labels[Clang]['geofilter_countries'],
                            source : FAO_CL
                        },
                        {
                            id: 'dd_filter_item_2_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_1"],
                            title: labels[Clang]['geofilter_countries'],
                            source : CGRFA_CL
                        },
                        {
                            id: 'dd_filter_item_2_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_1"],
                            title: labels[Clang]['geofilter_countries'],
                            source : ITPGRFA_CL
                        },
                        {
                            id: 'dd_filter_item_3',
                            type: 'radio',
                            default: DOWNLOAD_DV["filter-dd_filter_item_2"],
                            choicesTitle: [labels[Clang]["filter_hierarchy_fao"], labels[Clang]["filter_hierarchy_m49"], labels[Clang]["filter_hierarchy_sdg"], labels[Clang]["filter_hierarchy_mdg"], labels[Clang]["filter_hierarchy_cgrfa"], labels[Clang]["filter_hierarchy_itpgrfa"]]
                        },
                        {
                            id: 'dd_filter_item_4_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_4_1"],
                            title: labels[Clang]['geofilter_regions'],
                            source: FAO_R
                        },
                        {
                            id: 'dd_filter_item_4_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_4_2"],
                            title: labels[Clang]['geofilter_regions'],
                            source: M49
                        },
                        {
                            id: 'dd_filter_item_4_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_4_3"],
                            title: labels[Clang]['geofilter_regions'],
                            source: SDG
                        },
                        {
                            id: 'dd_filter_item_4_4',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_4_4"],
                            title: labels[Clang]['geofilter_regions'],
                            source: MDG
                        },
                        {
                            id: 'dd_filter_item_4_5',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_7_1"],
                            title: labels[Clang]['geofilter_specialgroups'],
                            source: CGRFA_R
                        },
                        {
                            id: 'dd_filter_item_4_6',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_7_2"],
                            title: labels[Clang]['geofilter_specialgroups'],
                            source: ITPGRFA_R
                        },
                        {
                            id: 'dd_filter_item_6',
                            type: 'radio',
                            default: DOWNLOAD_DV["filter-dd_filter_item_6"],
                            choicesTitle: [labels[Clang]["filter_radio_total"], labels[Clang]["filter_radio_list"]]
                        },
                        {
                            id: 'dd_filter_item_8',
                            type: 'tree',
                            title: labels[Clang]['filter_element']
                        },
                        {
                            id: 'dd_filter_item_9',
                            type: 'radio',
                            default: DOWNLOAD_DV["filter-dd_filter_item_9"],
                            title: labels[Clang]['filter_periods'],
                            max: 1
                        },
                        {
                            id: 'dd_filter_item_10',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["filter-dd_filter_item_10"],
                            title: labels[Clang]["filter_stakeholders"],
                            source: [{value: "stk", label: labels[Clang]['filter_stakeholders_include']}]
                        },
                        {
                            id: 'dd_filter_item_11',
                            type: 'radio',
                            default: DOWNLOAD_DV["filter-dd_filter_item_11"],
                            title: labels[Clang]['filter_thousand'],
                            choicesTitle: [labels[Clang]["filter_thousand_option_none"], labels[Clang]["filter_thousand_option_comma"], labels[Clang]["filter_thousand_option_period"]]
                        }
                        ]
                },
                dashboard: {
                    uid: "DownloadDataDashboard",
                    columntableName : [labels[Clang]['table_title_domain'], labels[Clang]['table_title_country'], labels[Clang]['table_title_element'], labels[Clang]['table_title_indicator'], labels[Clang]['table_title_period'], labels[Clang]['table_title_value']]
                }
            }
        }

    });
