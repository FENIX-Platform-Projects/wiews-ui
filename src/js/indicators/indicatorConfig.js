define([
        "highcharts",
        "./indicatorCommonUtils",
        "../../config/config",
        "../../config/indicators/downloadDataDefaultValues",
        "../../config/indicators/codelistPayloads",
        "../../nls/labels"],
    function (Highcharts, ICUtils, C, DOWNLOAD_DV, CL, labels) {

        "use strict";

        var Clang = C.lang.toLowerCase(),
            CloudLang = $("html").attr("lang").toLowerCase();

        this.icUtils = new ICUtils();

        var FAO_CL = this.icUtils.callGoogle('iso3_country_codes_'+CloudLang+'.json',false).hits,
            CGRFA_CL = this.icUtils.callGoogle('cgrfa_country_codes_'+CloudLang+'.json',false).hits,
            ITPGRFA_CL = this.icUtils.callGoogle('itpgrfa_country_codes_'+CloudLang+'.json',false).hits,
            M49 = this.icUtils.callGoogle('m49_region_hierarchy_'+CloudLang+'.json',true).hits,
            SDG = this.icUtils.callGoogle('sdg_region_hierarchy_'+CloudLang+'.json',true).hits,
            MDG = this.icUtils.callGoogle('mdg_region_hierarchy_'+CloudLang+'.json',true).hits,
            FAO_R = this.icUtils.callGoogle('fao_region_hierarchy_'+CloudLang+'.json',true).hits,
            CGRFA_R = this.icUtils.callGoogle('cgrfa_region_hierarchy_'+CloudLang+'.json',true).hits,
            ITPGRFA_R = this.icUtils.callGoogle('itpgrfa_region_hierarchy_'+CloudLang+'.json',true).hits,
            Iterations = this.icUtils.callGoogle('iterations_'+CloudLang+'.json',false,true).hits;


        return {
            downloadData: {
                filter: {
                    hostConfig: {
                        geoSelector: {
                            default: 'dd_filter_item_tab_4_1'
                        }
                    },
                    items: [
                        {
                            id: 'dd_filter_item_1',
                            type: 'radio',
                            default: DOWNLOAD_DV["filter-dd_filter_item_2"],
                            title: labels[CloudLang]['geofilter_countries'],
                            choicesTitle: [labels[CloudLang]["filter_hierarchy_fao"], labels[CloudLang]["filter_hierarchy_cgrfa"], labels[CloudLang]["filter_hierarchy_itpgrfa"]]
                        },
                        {
                            id: 'dd_filter_item_2_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_1"],
                            title: labels[CloudLang]['geofilter_countries'],
                            source : FAO_CL
                        },
                        {
                            id: 'dd_filter_item_2_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_1"],
                            title: labels[CloudLang]['geofilter_countries'],
                            source : CGRFA_CL
                        },
                        {
                            id: 'dd_filter_item_2_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_1"],
                            title: labels[CloudLang]['geofilter_countries'],
                            source : ITPGRFA_CL
                        },
                        {
                            id: 'dd_filter_item_3',
                            type: 'radio',
                            default: DOWNLOAD_DV["filter-dd_filter_item_2"],
                            choicesTitle: [labels[CloudLang]["filter_hierarchy_fao"], labels[CloudLang]["filter_hierarchy_m49"], labels[CloudLang]["filter_hierarchy_sdg"], labels[CloudLang]["filter_hierarchy_mdg"], labels[CloudLang]["filter_hierarchy_cgrfa"], labels[CloudLang]["filter_hierarchy_itpgrfa"]]
                        },
                        {
                            id: 'dd_filter_item_4_1',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_4_1"],
                            title: labels[CloudLang]['geofilter_regions'],
                            source: FAO_R
                        },
                        {
                            id: 'dd_filter_item_4_2',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_4_2"],
                            title: labels[CloudLang]['geofilter_regions'],
                            source: M49
                        },
                        {
                            id: 'dd_filter_item_4_3',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_4_3"],
                            title: labels[CloudLang]['geofilter_regions'],
                            source: SDG
                        },
                        {
                            id: 'dd_filter_item_4_4',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_4_4"],
                            title: labels[CloudLang]['geofilter_regions'],
                            source: MDG
                        },
                        {
                            id: 'dd_filter_item_4_5',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_7_1"],
                            title: labels[CloudLang]['geofilter_specialgroups'],
                            source: CGRFA_R
                        },
                        {
                            id: 'dd_filter_item_4_6',
                            type: 'tree',
                            default: DOWNLOAD_DV["filter-dd_filter_item_7_2"],
                            title: labels[CloudLang]['geofilter_specialgroups'],
                            source: ITPGRFA_R
                        },
                        {
                            id: 'dd_filter_item_6',
                            type: 'radio',
                            default: DOWNLOAD_DV["filter-dd_filter_item_6"],
                            choicesTitle: [labels[CloudLang]["filter_radio_total"], labels[CloudLang]["filter_radio_list"]]
                        },
                        {
                            id: 'dd_filter_item_8',
                            type: 'tree',
                            title: labels[CloudLang]['filter_element']
                        },
                        {
                            id: 'dd_filter_item_9',
                            type: 'radio',
                            default: DOWNLOAD_DV["filter-dd_filter_item_9"],
                            title: labels[CloudLang]['filter_periods'],
                            max: 1
                        },
                        {
                            id: 'dd_filter_item_10',
                            type: 'checkbox',
                            default: DOWNLOAD_DV["filter-dd_filter_item_10"],
                            title: labels[CloudLang]["filter_stakeholders"],
                            source: [{value: "stk", label: labels[CloudLang]['filter_stakeholders_include']}]
                        }/*,
                        {
                            id: 'dd_filter_item_11',
                            type: 'radio',
                            default: DOWNLOAD_DV["filter-dd_filter_item_11"],
                            title: labels[Clang]['filter_thousand'],
                            choicesTitle: [labels[Clang]["filter_thousand_option_none"], labels[Clang]["filter_thousand_option_comma"], labels[Clang]["filter_thousand_option_period"]]
                        }*/
                        ]
                },
                dashboard: {
                    uid: "DownloadDataDashboard",
                    columntableName : [labels[CloudLang]['table_title_domain'], labels[CloudLang]['table_title_country'], labels[CloudLang]['table_title_element'], labels[CloudLang]['table_title_indicator'], labels[CloudLang]['table_title_period'], labels[CloudLang]['table_title_value']]
                },
                codelists : {
                    M49 : M49,
                    SDG : SDG,
                    MDG : MDG,
                    CGRFA_R : CGRFA_R,
                    ITPGRFA_R : ITPGRFA_R,
                    FAO_R : FAO_R
                }
            }
        }

    });
