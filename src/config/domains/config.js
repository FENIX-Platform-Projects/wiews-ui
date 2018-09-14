/*global define*/
define([
        "jquery",
        "./indicator_query.json",
        "../../nls/labels"
    ],function ($, staticfile, labels) {

    'use strict';

    var query = staticfile;

    var config = {

        0: {
            domain_label: "National Focal Point",
                cube : {
                "queryModel": {},
                "cube": {
                    "uniqueName": "[wiews_indicators].[wiews_indicators].[national_focal_point]",
                        "name": "national_focal_point",
                        "connection": "wiews_indicators",
                        "catalog": "wiews_indicators",
                        "schema": "wiews_indicators",
                        "caption": null,
                        "visible": false
                }
            },
            query : {
                "0" : query["0"]
            }
        },
        1: {
            domain_label : labels['en']['domain_label'],
                element_label : {
                "1" : labels['en']['element_label1']
            },
            dd_filter_category : "1",
                vd_code : "wiews_indicator_01/DashInd01",
                cube : {
                "queryModel": {},
                "cube": {
                    "uniqueName": "[wiews_indicators].[wiews_indicators].[survies_inventories_ind_01]",
                        "name": "survies_inventories_ind_01",
                        "connection": "wiews_indicators",
                        "catalog": "wiews_indicators",
                        "schema": "wiews_indicators",
                        "caption": null,
                        "visible": false
                }
            },
            query : {
                "1" : query["1"]
            },
            metadata : "91243"

        },
        2: {
            domain_label : labels['en']['domain_label'],
            element_label : {
                "2" : labels['en']['element_label1'],
                "2_1" : labels['en']['element_label2'],
                "2_2" : labels['en']['element_label3']
            },
            dd_filter_category : "2",
                vd_code : "wiews_indicator_02/DashInd02",
                cube : {
                "queryModel": {},
                "cube": {
                    "uniqueName": "[wiews_indicators].[survies_inventories]",
                        "name": "survies_inventories",
                        "connection": "wiews_indicators",
                        "catalog": "wiews_indicators",
                        "schema": "wiews_indicators",
                        "caption": null,
                        "visible": false
                }
            },
            query : {
                "2" : query["2"],
                "2_1" : query["2_1"],
                "2_2" : query["2_2"]
            },
            metadata : "91251"

        },
        3: {
        domain_label : labels['en']['domain_label'],
        element_label : {
            "3" : labels['en']['element_label1'],
                "3_1" : labels['en']['element_label2'],
                "3_2" : labels['en']['element_label3']
        },
            dd_filter_category : "1",
            vd_code : "wiews_indicator_03_0/DashInd03",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[survies_inventories]",
                    "name": "survies_inventories",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "3" : query["3"],
            "3_1" : query["3_1"],
            "3_2" : query["3_2"]
        },
        metadata : "91252"

        },
        4: {
            domain_label : labels['en']['domain_label'],
            element_label : {
            "4" : labels['en']['element_label1']
        },
            dd_filter_category : "3",
            vd_code : "wiews_indicator_04/DashInd04",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[on_farm_management_improvement_04]",
                    "name": "on_farm_management_improvement_04",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "4" : query["4"],
                "4_stk" : query["4_stk"]
            },
            metadata : "91253"

        },
        5: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "5" : labels['en']['element_label1']
        },
            dd_filter_category : "3",
            vd_code : "wiews_indicator_05/DashInd05",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[on_farm_management_improvement_04]",
                    "name": "on_farm_management_improvement_04",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "5" : query["5"]
            },
            metadata : "91254"
        },
        6: {
            domain_label : labels['en']['domain_label'],
            element_label : {
            "6" : labels['en']['element_label1']
        },
            dd_filter_category : "3",
            vd_code : "wiews_indicator_06/DashInd06",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[on_farm_management_improvement_06]",
                    "name": "on_farm_management_improvement_04",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "6" : query["6"]
            },
            metadata : "91255"
        },
        7: {
            domain_label : labels['en']['domain_label'],
            element_label : {
            "7" : labels['en']['element_label1']
        },
            dd_filter_category : "3",
            vd_code : "wiews_indicator_07/DashInd07",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[disaster_recovery_07]",
                    "name": "disaster_recovery",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "7" : query["7"],
                "7_stk" : query["7_stk"]
            },
            metadata : "91256"
        },
        8: {
        domain_label : labels['en']['domain_label'],
        element_label : {
            "8" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
        vd_code : "wiews_indicator_08/DashInd08",
        cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[disaster_recovery_08]",
                    "name": "disaster_recovery",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "8" : query["8"],
            "8_stk" : query["8_stk"]
        },
        metadata : "91259"
        },
        9: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "9" : labels['en']['element_label1']
        },
            dd_filter_category : "3",
            vd_code : "wiews_indicator_09/DashInd09",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[disaster_recovery_09]",
                    "name": "disaster_recovery_09",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "9" : query["9"]
            },
            metadata : "91260"
        },
        10: {
        domain_label : labels['en']['domain_label'],
        element_label : {
            "10" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
        vd_code : "wiews_indicator_10/Dashboard10",
        cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[crop_wild_relatives_wild_food_plants_10]",
                    "name": "crop_wild_relatives_wild_food_plants",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "10" : query["10"]
        },
        metadata : "91261"

    },
        11: {
            domain_label : labels['en']['domain_label'],
            element_label : {
                "11" : labels['en']['element_label1']
            },
            dd_filter_category : "3",
            vd_code : "wiews_indicator_11/DashInd11",
            cube : {
                "queryModel": {},
                "cube": {
                    "uniqueName": "[wiews_indicators].[wiews_indicators].[crop_wild_relatives_wild_food_plants_11]",
                        "name": "crop_wild_relatives_wild_food_plants_11",
                        "connection": "wiews_indicators",
                        "catalog": "wiews_indicators",
                        "schema": "wiews_indicators",
                        "caption": null,
                        "visible": false
                }
            },
            query : {
                "11" : query["11"],
                "11_stk" : query["11_stk"]
            },
            metadata : "91262"
        },
        12: {
            domain_label : labels['en']['domain_label'],
            element_label : {
            "12" : labels['en']['element_label1']
        },
            dd_filter_category : "3",
            vd_code : "wiews_indicator_12/DashInd12",
            cube : {
             "queryModel": {},
                "cube": {
                "uniqueName": "[wiews_indicators].[crop_wild_relatives_wild_food_plants_12]",
                    "name": "crop_wild_relatives_wild_food_plants_12",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
                }
            },
            query : {
                "12" : query["12"]
            },
            metadata : "91263"
        },
        13: {
            domain_label : labels['en']['domain_label'],
            element_label : {
                "13" : labels['en']['element_label1']
            },
            dd_filter_category : "3",
            vd_code : "wiews_indicator_13/DashInd13",
            cube : {
                "queryModel": {},
                "cube": {
                    "uniqueName": "[wiews_indicators].[targeting_collecting_ind_13]",
                        "name": "targeting_collecting_ind_13_14",
                        "connection": "wiews_indicators",
                        "catalog": "wiews_indicators",
                        "schema": "wiews_indicators",
                        "caption": null,
                        "visible": false
                }
            },
            query : {
                "13" : query['13'],
                "13_stk" : query['13_stk']
            },
            metadata : "91264"
        },
        14: {
            domain_label : labels['en']['domain_label'],
            element_label : {
            "14" : labels['en']['element_label1']
        },
            dd_filter_category : "3",
            vd_code : "wiews_indicator_14/DashInd14",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[targeting_collecting_ind_14]",
                    "name": "targeting_collecting_ind_13_14",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "14" : query["14"],
                "14_stk" : query["14_stk"]
            },
            metadata : "91265"
        },
        15: {
            domain_label : labels['en']['domain_label'],
            element_label : {
            "15" : labels['en']['element_label1']
        },
            dd_filter_category : "3",
            vd_code : "wiews_indicator_15/DashInd15",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[targeted_collecting_15]",
                    "name": "targeted_collecting",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "15" : query["15"],
                "15_stk" : query["15_stk"]
            },
            metadata : "91267"
        },
        16: {
            domain_label : labels['en']['domain_label'],
            element_label : {
            "16" : labels['en']['element_label1']
        },
            dd_filter_category : "3",
            vd_code : "wiews_indicator_16/DashInd16",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[targeted_collecting_16]",
                    "name": "targeted_collecting",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "16" : query["16"],
                "16_stk" : query["16_stk"]
            },
            metadata : "91268"
        },
        17: {
            domain_label : labels['en']['domain_label'],
            element_label : {
            "17" : labels['en']['element_label1']
        },
            dd_filter_category : "2",
            vd_code : "wiews_indicator_17/DashInd17",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[germplasm_collections_ind_17]",
                    "name": "germplasm_collections_ind_17",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "17" : query["17"]
            },
            metadata : "91269"
        },
        18: {
            period_label : "Year",
            domain_label : labels['en']['domain_label'],
            element_label : {
            "18" : labels['en']['element_label1']
        },
            time: "years",
            dd_filter_category : "3",
            vd_code : "wiews_indicator_18/DashInd18",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[wiews_indicators].[germplasm_collections_ind18]",
                    "name": "germplasm_collections",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "18" : query["18"],
                "18_stk" : query["18_stk"]
            },
            metadata : "91270"
        },
        19: {
            period_label : "Year",
            domain_label : labels['en']['domain_label'],
            element_label : {
            "19" : labels['en']['element_label1']
        },
            time: "years",
            dd_filter_category : "3",
            vd_code : "wiews_indicator_19/DashInd19",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[wiews_indicators].[germplasm_collections_ind18]",
                    "name": "germplasm_collections",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "19" : query["19"],
                "19_stk" : query["19_stk"]
            },
            metadata : "91271"
        },
        20: {
            period_label : "Year",
            domain_label : labels['en']['domain_label'],
            element_label : {
            "20" : labels['en']['element_label1']
        },
            time: "years",
            dd_filter_category : "3",
            vd_code : "wiews_indicator_20/DashInd20",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[wiews_indicators].[germplasm_collections_ind20]",
                    "name": "germplasm_collections",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
                "20" : query["20"],
                "20_stk" : query["20_stk"]
            },
            metadata : "91272"
        },
        21: {
            period_label : "Year",
            domain_label : labels['en']['domain_label'],
            indicator_label: "Indicator Label",
            element_label : {
            "21" : labels['en']['element_label1']
        },
            time: "years",
            dd_filter_category : "3",
            vd_code : "wiews_indicator_21/DashInd21",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[wiews_indicators].[germplasm_collections_ind21]",
                    "name": "germplasm_collections",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
            query : {
            "21" : query["21"],
            "21_stk" : query["21_stk"]
        },
            metadata : "91274"
        },

        22: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "22" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_22/WorldPieDashBoard",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[regenerations_of_accessions_ind22]",
                    "name": "regenerations_of_accessions",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "22" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[%_of_accessions_without_budget] AS ([Measures].[accessions_out_of_budget] / [Measures].[accessions_num]), FORMAT_STRING = \"#0.0#%\" " +
                "MEMBER [Measures].[accessions_national_genbank] as [Measures].[accessions_num]" +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[%_of_accessions_without_budget],[Measures].[accessions_national_genbank]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [regenerations_of_accessions] ",
                    "type": "MDX"
            },
            "22_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[%_of_accessions_without_budget] AS IIf(([Measures].[accessions_need_regeneration] = 0), 0.0, ([Measures].[accessions_out_of_budget] / [Measures].[accessions_need_regeneration])), FORMAT_STRING = \"#0.0#%\" " +
                "MEMBER [Measures].[accessions_national_genbank] as [Measures].[accessions_num]" +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[%_of_accessions_without_budget],[Measures].[accessions_national_genbank]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [regenerations_of_accessions] ",
                    "type": "MDX"
            }
        },
        metadata : "91275"

    },
        23: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "23" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_22/WorldPieDashBoard",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[regenerations_of_accessions_23]",
                    "name": "regenerations_of_accessions",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "23" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[accessions_regenerated_ann_avg] AS ([Measures].[accessions_regenerated] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\"  " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures] .[accessions_regenerated], [Measures].[accessions_regenerated_ann_avg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [regenerations_of_accessions] ",
                    "type": "MDX"
            },
            "23_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[accessions_regenerated_ann_avg] AS ([Measures].[accessions_regenerated] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\"  " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures] .[accessions_regenerated], [Measures].[accessions_regenerated_ann_avg]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [regenerations_of_accessions] ",
                    "type": "MDX"
            }
        },
        metadata : "91276"

    },
        24: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "24" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_22/WorldPieDashBoard",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[regenerations_of_accessions_24]",
                    "name": "regenerations_of_accessions",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "24" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[%_of_accessions_need_regeneration] AS ([Measures].[accessions_need_regeneration] / [Measures].[accessions_num]), FORMAT_STRING = \"#0.0#%\" " +
                "MEMBER [Measures].[accessions_national_genbank] as [Measures].[accessions_num]" +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[%_of_accessions_need_regeneration],[Measures].[accessions_national_genbank]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [regenerations_of_accessions] ",
                    "type": "MDX"
            },
            "24_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[%_of_accessions_need_regeneration] AS ([Measures].[accessions_need_regeneration] / [Measures].[accessions_num]), FORMAT_STRING = \"#0.0#%\" " +
                "MEMBER [Measures].[accessions_national_genbank] as [Measures].[accessions_num]" +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[%_of_accessions_need_regeneration],[Measures].[accessions_national_genbank]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [regenerations_of_accessions] ",
                    "type": "MDX"
            }
        },
        metadata : "91277"

    },
        25: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "25" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_25/DashInd25",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[characterization_and_evaluation_25]",
                    "name": "characterization_and_evaluation_25",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "25" : {
                "mdx": "WITH " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[AvgOfMorphologicalTraits]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation_25]",
                    "type": "MDX"
            },
            "25_stk" : {
                "mdx": "WITH " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[AvgOfMorphologicalTraits]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [characterization_and_evaluation_25] ",
                    "type": "MDX"
            }
        },
        metadata : "91278"

    },
        26: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "26" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_26/DashInd26",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[characterization_and_evaluation_26]",
                    "name": "characterization_and_evaluation_26",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "26" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[number_of_pubs_ann_avg] AS ([Measures].[number_of_pubs_total] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[number_of_pubs_total], [Measures].[number_of_pubs_ann_avg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation_26] " ,
                    "type": "MDX"
            },
            "26_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[number_of_pubs_ann_avg] AS ([Measures].[number_of_pubs_total] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[number_of_pubs_total], [Measures].[number_of_pubs_ann_avg]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [characterization_and_evaluation_26] ",
                    "type": "MDX"
            }
        },
        metadata : "91279"

    },
        27: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "27" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_27/DashInd27",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[wiews_indicators].[characterization_and_evaluation_27]",
                    "name": "characterization_and_evaluation_27",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "27" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[number_of_trait_ann_avg] AS ([Measures].[number_of_trait_specific_collection_subset_published] / [Measures].[period]) " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[number_of_trait_specific_collection_subset_published], [Measures].[number_of_trait_ann_avg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation_27] ",
                    "type": "MDX"
            },
            "27_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[number_of_trait_ann_avg] AS ([Measures].[number_of_trait_specific_collection_subset_published] / [Measures].[period]) " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[number_of_trait_specific_collection_subset_published], [Measures].[number_of_trait_ann_avg]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [characterization_and_evaluation_27] ",
                    "type": "MDX"
            }
        },
        metadata : "91280"

    },
        28: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "28" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_28/DashInd28",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[characterization_and_evaluation_ind28]",
                    "name": "characterization_and_evaluation",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "28" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[accessions_distributed_ann_avg] AS ([Measures].[accessions_distributed] / [Measures].[period]) " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[accessions_distributed], [Measures].[accessions_distributed_ann_avg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation] ",
                    "type": "MDX"
            },
            "28_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[accessions_distributed_ann_avg] AS ([Measures].[accessions_distributed] / [Measures].[period]) " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[accessions_distributed], [Measures].[accessions_distributed_ann_avg]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [characterization_and_evaluation] ",
                    "type": "MDX"
            }
        },
        metadata : "91281"

    },
        29: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "29" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_29/DashInd29",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[characterization_and_evaluation_26]",
                    "name": "characterization_and_evaluation_26",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "29" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[samples_distributed_ann_avg] AS ([Measures].[samples_distributed] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[samples_distributed], [Measures].[samples_distributed_ann_avg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation] ",
                    "type": "MDX"
            },
            "29_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[samples_distributed_ann_avg] AS ([Measures].[samples_distributed] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[samples_distributed], [Measures].[samples_distributed_ann_avg]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [characterization_and_evaluation]",
                    "type": "MDX"
            }
        },
        metadata : "91282"

    },
        30: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "30" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_30/DashInd30",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[plant_breeding_30]",
                    "name": "plant_breeding",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "30" : {
                "mdx": "WITH " +
                " MEMBER [Measures].[distinct_crop_spcecies_ann_avg] AS ([Measures].[distinct_crop_spcecies] / [Measures].[period]) " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~FILTER] AS Except({[Sector].[sector].Members}, {[Sector].[Private]}) " +
                " SELECT " +
                "NON EMPTY {[Measures].[distinct_crop_spcecies], [Measures].[distinct_crop_spcecies_ann_avg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [plant_breeding] " +
                "WHERE [~FILTER]",
                    "type": "MDX"
            },
            "30_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[distinct_crop_spcecies_ann_avg] AS ([Measures].[distinct_crop_spcecies] / [Measures].[period]) " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                "SET [~FILTER] AS Except({[Sector].[sector].Members}, {[Sector].[Private]}) " +
                " SELECT " +
                "NON EMPTY {[Measures].[distinct_crop_spcecies], [Measures].[distinct_crop_spcecies_ann_avg]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [plant_breeding] " +
                "WHERE [~FILTER]",
                    "type": "MDX"
            }
        },
        metadata : "91283"

    },
        31: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "31" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_31/DashInd31",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[plant_breeding_31]",
                    "name": "plant_breeding",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            },
        },
        query : {
            "31" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[distinct_crop_spcecies_ann_avg] AS ([Measures].[distinct_crop_spcecies] / [Measures].[period]) " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~FILTER] AS Except({[Sector].[sector].Members}, {[Sector].[Public]}) " +
                " SELECT " +
                "NON EMPTY {[Measures].[distinct_crop_spcecies], [Measures].[distinct_crop_spcecies_ann_avg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [plant_breeding] " +
                "WHERE [~FILTER]",
                    "type": "MDX"
            },
            "31_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[distinct_crop_spcecies_ann_avg] AS ([Measures].[distinct_crop_spcecies] / [Measures].[period]) " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                "SET [~FILTER] AS Except({[Sector].[sector].Members}, {[Sector].[Public]}) " +
                " SELECT " +
                "NON EMPTY {[Measures].[distinct_crop_spcecies], [Measures].[distinct_crop_spcecies_ann_avg]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [plant_breeding] " +
                "WHERE [~FILTER]",
                    "type": "MDX"
            }
        },
        metadata : "91284"

    },
        32: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "32" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_32/DashInd32",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[plant_breeding_32]",
                    "name": "plant_breeding",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            },
        },
        query : {
            "32" : {
                "mdx": "WITH " +
                "SET [~FILTER] AS Except({[OrientedTo].[oriented_to].Members}, {[OrientedTo].[#null]}) " +
                "MEMBER [Measures].[num_activities_farmers_villages_ann_avg] AS ([Measures].[distinct_programs] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[distinct_programs], [Measures].[num_activities_farmers_villages_ann_avg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [plant_breeding] " +
                "WHERE [~FILTER] ",
                    "type": "MDX"
            },
            "32_stk" : {
                "mdx": "WITH " +
                "SET [~FILTER] AS Except({[OrientedTo].[oriented_to].Members}, {[OrientedTo].[#null]}) " +
                "MEMBER [Measures].[num_activities_farmers_villages_ann_avg] AS ([Measures].[distinct_programs] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[distinct_programs], [Measures].[num_activities_farmers_villages_ann_avg]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [plant_breeding] " +
                "WHERE [~FILTER] ",
                    "type": "MDX"
            }
        },
        metadata : "91285"

    },
        33: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "33" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_33/DashInd33",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[plant_breeding_33]",
                    "name": "plant_breeding_33_34",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "33" : {
                "mdx": "WITH " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[priv_crop_breeders]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [plant_breeding_33_34] " +
                "WHERE [Last_Year_Crop].[1]",
                    "type": "MDX"
            }
        },
        metadata : "91286"

    },
        34: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "34" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_34/DashInd34",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[plant_breeding_34]",
                    "name": "plant_breeding_33_34",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "34" : {
                "mdx": "WITH " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[priv_crop_breeders]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [plant_breeding_33_34] " +
                "WHERE [Last_Year_Crop].[1]",
                    "type": "MDX"
            }
        },
        metadata : "91287"

    },
        35: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "35" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_35/DashInd35",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[crop_diversification_35]",
                    "name": "crop_diversification_35",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "35" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[NumberOfPrograms_AnnAvg] AS ([Measures].[NumberOfPrograms] / [Measures].[Period]) " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfPrograms],[Measures].[NumberOfPrograms_AnnAvg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [crop_diversification_35] ",
                    "type": "MDX"
            },
            "35_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[NumberOfPrograms_AnnAvg] AS ([Measures].[NumberOfPrograms] / [Measures].[Period]) " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfPrograms],[Measures].[NumberOfPrograms_AnnAvg]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [crop_diversification_35]",
                    "type": "MDX"
            }
        },
        metadata : "91288"

    },
        36: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "36" : labels['en']['element_label1']
        },
        dd_filter_category : "2",
            vd_code : "wiews_indicator_36/DashInd36",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[crop_diversification_35]",
                    "name": "crop_diversification_35",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "36" : {
                "mdx" : "WITH " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                "MEMBER [Measures].[NumberOfNewCrops_AnnAvg] AS ([Measures].[NumberOfNewCrops] / [Measures].[Period])" +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfNewCrops],[Measures].[NumberOfNewCrops_AnnAvg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS " +
                "FROM [crop_diversification_36]",
                    "type": "MDX"
            }
        },
        metadata : "91289"

    },
        37: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "37" : labels['en']['element_label1']
        },
        dd_filter_category : "2",
            vd_code : "wiews_indicator_37/DashInd37",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[dev_and_comm_of_varieties_37]",
                    "name": "dev_and_comm_of_varieties_37",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            },
        },
        query : {
            "37" : {
                "mdx": "WITH " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT NON EMPTY {[Measures].[NumberOfCountriesWithPolicy],[Measures].[NumberOfCountries]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [dev_and_comm_of_varieties_37]",
                    "type": "MDX"
            }
        },
        metadata : "91290"

    },
        38: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "38" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_38/DashInd38",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[dev_and_comm_of_varieties_38]",
                    "name": "dev_and_comm_of_varieties_38",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "38" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[NumberOfPrograms_AnnAvg] AS ([Measures].[NumberOfPrograms] / [Measures].[Period]) " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfPrograms],[Measures].[NumberOfPrograms_AnnAvg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [dev_and_comm_of_varieties_38]",
                    "type": "MDX"
            },
            "38_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[NumberOfPrograms_AnnAvg] AS ([Measures].[NumberOfPrograms] / [Measures].[Period]) " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfPrograms],[Measures].[NumberOfPrograms_AnnAvg]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [dev_and_comm_of_varieties_38]",
                    "type": "MDX"
            }
        },
        metadata : "91291"

    },
        39: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "39" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_39/DashInd39",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[dev_and_comm_of_varieties_39]",
                    "name": "dev_and_comm_of_varieties_39",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "39" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[NumberOfLandraces_AnnAvg] AS ([Measures].[NumberOfLandraces] / [Measures].[Period]) " +
                "MEMBER [Measures].[CountOfTaxonCrop_AnnAvg] AS ([Measures].[CountOfTaxonCrop] / [Measures].[Period]) " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfLandraces],[Measures].[NumberOfLandraces_AnnAvg], [Measures].[CountOfTaxonCrop],[Measures].[CountOfTaxonCrop_AnnAvg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS " +
                "FROM [dev_and_comm_of_varieties_39]",
                    "type": "MDX"
            }
        },
        metadata : "91292"

    },
        40: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "40" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_40/DashInd40",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[seed_production_and_distribution_40]",
                    "name": "seed_production_and_distribution_40",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "40" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[NumberOfNewVarieties_AnnAvg] AS ([Measures].[NumberOfNewVarieties] / [Measures].[Period]) " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfNewVarieties],[Measures].[NumberOfNewVarieties_AnnAvg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS " +
                "FROM [seed_production_and_distribution_40]",
                    "type": "MDX"
            }
        },
        metadata : "91293"

    },
        41: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "41" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_41/DashInd41",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[seed_production_and_distribution_41]",
                    "name": "seed_production_and_distribution_41",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "41" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfRegisteredSeedEnterprises]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [seed_production_and_distribution_41]",
                    "type": "MDX"
            }
        },
        metadata : "91294"

    },
        42: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "42" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_42/DasnInd42",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[seed_production_and_distribution_42]",
                    "name": "seed_production_and_distribution_42",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "42" : {
                "mdx": "WITH MEMBER [Measures].[NumberOfVarieties] AS ([Measures].[NumberOfVaretiesXTotalCropArea] / [Measures].[TotalCropArea]), FORMAT_STRING = \"#0.0#%\" SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfVarieties]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [seed_production_and_distribution_42] WHERE [Last_Year_Boolean.last_year_boolean].[1]",
                    "type": "MDX"
            }
        },
        metadata : "91295"

    },
        43: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "43" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_43/DashInd43",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[seed_production_and_distribution_43]",
                    "name": "seed_production_and_distribution_43",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "43" : {
                "mdx": "WITH MEMBER [Measures].[area_supplied_with_seed] AS ([Measures].[CalcPerCrop_x_TotalCropHarv] / [Measures].[TotalCropHarvestedArea]), FORMAT_STRING = \"#,##0.00\" SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[area_supplied_with_seed]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [seed_production_and_distribution_43] WHERE [Last Year Bool].[1]",
                    "type": "MDX"
            }
        },
        metadata : "91296"

    },
        44: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "44" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_44/DashInd44",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[seed_production_and_distribution_44]",
                    "name": "seed_production_and_distribution_44",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "44" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfCountries],[Measures].[NumberOfCountriesWithPolicy]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [seed_production_and_distribution_44]",
                    "type": "MDX"
            }
        },
        metadata : "91297"

    },
        45: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "45" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_45/DashInd45",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[national_programme_45]",
                    "name": "national_programme_45",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "45" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfCountriesWithExistence],[Measures].[NumberOfCountries]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [national_programme_45]",
                    "type": "MDX"
            }
        },
        metadata : "91298"

    },
        46: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "46" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_46/DashInd46",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[national_programme_46]",
                    "name": "national_programme_46",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "46" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfCountriesWithNPF],[Measures].[NumberOfCountries]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [national_programme_46]",
                    "type": "MDX"
            }
        },
        metadata : "91299"

    },
        47: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "47" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_47/WorldChart",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[national_programme_47]",
                    "name": "national_programme_47",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "47" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfCountriesWithPolicy],[Measures].[NumberOfCountries]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [national_programme_47]",
                    "type": "MDX"
            }
        },
        metadata : "91300"

    },
        48: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "48" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_48/DashInd48",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[national_programme_48]",
                    "name": "national_programme_48",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "48" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfCountriesWithExistence],[Measures].[NumberOfCountries]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [national_programme_48]",
                    "type": "MDX"
            }
        },
        metadata : "91301"

    },
        49: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "49" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_49/DashInd49",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[networks_49]",
                    "name": "networks_49",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "49" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfCountriesWithNetwork],[Measures].[NumberOfCountries]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [networks_49]",
                    "type": "MDX"
            }
        },
        metadata : "91302"

    },
        50: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "50" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_50/DashInd50",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[networks_49]",
                    "name": "networks_49",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "50" : {
                "mdx": "WITH " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfNetworks]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [networks_50] ",
                    "type": "MDX"
            },
            "50_stk" : {
                "mdx": "WITH " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfNetworks]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [networks_50] ",
                    "type": "MDX"
            }
        },
        metadata : "91303"

    },
        51: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "51" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_51/DashInd51",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[networks_51]",
                    "name": "networks_51",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "51" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[NumberOfPublications_AnnAvg] AS ([Measures].[NumberOfPublications] / [Measures].[Period]) " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfPublications], [Measures].[NumberOfPublications_AnnAvg]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [networks_51] ",
                    "type": "MDX"
            },
            "51_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[NumberOfPublications_AnnAvg] AS ([Measures].[NumberOfPublications] / [Measures].[Period]) " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfPublications], [Measures].[NumberOfPublications_AnnAvg]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [networks_51] ",
                    "type": "MDX"
            }
        },
        metadata : "91304"

    },
        52: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "52" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_52/DashInd52",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_52]",
                    "name": "information_systems_52",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "52" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Number of Crops]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [information_systems_52]",
                    "type": "MDX"
            }
        },
        metadata : "91305"

    },
        53: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "53" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_53/DashInd53",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_53]",
                    "name": "information_systems_53",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "53" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Farmers Varieties]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [information_systems_53]",
                    "type": "MDX"
            }
        },
        metadata : "91306"

    },
        54: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "54" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_54/DashInd54",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_54]",
                    "name": "information_systems_54",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "54" : {
                "mdx": "WITH " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[Accessions ex situ documented]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [information_systems_54] ",
                    "type": "MDX"
            },
            "54_stk" : {
                "mdx": "WITH " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[Accessions ex situ documented]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [information_systems_54] ",
                    "type": "MDX"
            }
        },
        metadata : "91307"

    },
        55: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "55" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_55/DashInd55",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_55]",
                    "name": "information_systems_55",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "55" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Number Released Varieties]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [information_systems_55]",
                    "type": "MDX"
            }
        },
        metadata : "91308"

    },
        56: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "56" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_56/DashInd56",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_54]",
                    "name": "information_systems_54",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "56" : {
                "mdx": "WITH " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfStakeholdersWithParticipation],[Measures].[NumberOfStakeholders]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [information_systems_56]",
                    "type": "MDX"
            },
            "56_stk" : {
                "mdx": "WITH " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[Int/ Reg Information Systems]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [information_systems_56] " ,
                    "type": "MDX"
            }
        },
        metadata : "91309"

    },
        57: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "57" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_57/DashInd1",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_55]",
                    "name": "information_systems_55",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "57" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfCountriesWithExistence],[Measures].[NumberOfCountries]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [monitoring_and_safeguarding_genetic_diversity_57]",
                    "type": "MDX"
            }
        },
        metadata : "91310"

    },
        58: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "58" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_58/DashInd58",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_55]",
                    "name": "information_systems_55",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "58" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Remedial Action]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [monitoring_and_safeguarding_genetic_diversity_58]",
                    "type": "MDX"
            }
        },
        metadata : "91310"

    },
        59: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "59" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_59/DashInd59",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_55]",
                    "name": "information_systems_55",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "59" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfCountriesWithExistence],[Measures].[NumberOfCountries]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [human_resource_capacity_59]",
                    "type": "MDX"
            }
        },
        metadata : "91312"

    },
        60: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "60" : labels['en']['element_label1']
        },
        dd_filter_category : "3",
            vd_code : "wiews_indicator_60/Dashboard1",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_54]",
                    "name": "information_systems_54",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "60" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[%_of_staff_with_skills_upgraded] AS iif((((([Measures].[NumberOfProfessionalsWithPHD] + [Measures].[NumberOfProfessionalsWithMSC]) + [Measures].[NumberOfProfessionalsAttendedCourses]) / [Measures].[NumberOfProfessionals]) > 1), 1, ((([Measures].[NumberOfProfessionalsWithPHD] + [Measures].[NumberOfProfessionalsWithMSC]) + [Measures].[NumberOfProfessionalsAttendedCourses]) / [Measures].[NumberOfProfessionals])), FORMAT_STRING = \"#0.0#%\" " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                " SELECT " +
                "NON EMPTY {[Measures].[%_of_staff_with_skills_upgraded]} ON COLUMNS, " +
                "NON EMPTY [~ROWS] ON ROWS FROM [human_resource_capacity_60] ",
                    "type": "MDX"
            },
            "60_stk" : {
                "mdx": "WITH " +
                "MEMBER [Measures].[%_of_staff_with_skills_upgraded] AS iif((((([Measures].[NumberOfProfessionalsWithPHD] + [Measures].[NumberOfProfessionalsWithMSC]) + [Measures].[NumberOfProfessionalsAttendedCourses]) / [Measures].[NumberOfProfessionals]) > 1), 1, ((([Measures].[NumberOfProfessionalsWithPHD] + [Measures].[NumberOfProfessionalsWithMSC]) + [Measures].[NumberOfProfessionalsAttendedCourses]) / [Measures].[NumberOfProfessionals])), FORMAT_STRING = \"#0.0#%\" " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[%_of_staff_with_skills_upgraded]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [human_resource_capacity_60] ",
                    "type": "MDX"
            }
        },
        metadata : "91313"

    },
        61: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "61" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_61/DashInd61",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_55]",
                    "name": "information_systems_55",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "61" : {
                "mdx": "WITH SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfCountriesWithExistence],[Measures].[NumberOfCountries]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [public_awareness_61]",
                    "type": "MDX"
            }
        },
        metadata : "91314"

    },
        62: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "62" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_62/DashInd62",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_55]",
                    "name": "information_systems_55",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "62" : {
                "mdx": "WITH " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfStakeholdingGroups]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [public_awareness_61]",
                    "type": "MDX"
            }
        },
        metadata : "91315"

    },
        63: {
        domain_label : labels['en']['domain_label'],
            element_label : {
            "63" : labels['en']['element_label1']
        },
        dd_filter_category : "1",
            vd_code : "wiews_indicator_63/DashInd63",
            cube : {
            "queryModel": {},
            "cube": {
                "uniqueName": "[wiews_indicators].[information_systems_55]",
                    "name": "information_systems_55",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
            }
        },
        query : {
            "63" : {
                "mdx": "WITH " +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfProductsDeveloped]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [public_awareness_63]",
                    "type": "MDX"
            },
            "63_stk" : {
                "mdx": "WITH " +
                "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                " SELECT " +
                "NON EMPTY {[Measures].[NumberOfProductsDeveloped]} ON COLUMNS, " +
                "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [public_awareness_63] ",
                    "type": "MDX"
            }
        },
        metadata : "91316"

    }
    };

    /*
    // Dynamic part.
    var data = {},
        staticurl = "https://storage.googleapis.com/wiews-lang-bucket/",
        staticfile = "indicator_query.json";

    // Get Indicator Config
    $.ajax({
        async: false,
        dataType: 'json',
        method: 'GET',
        contentType: "text/plain; charset=utf-8",
        url:  staticurl+staticfile,
        success: function(res) {
            data = res;
        },
        error : function(res) {
            console.log(res);
            console.log('Reverting to static configuration instead.');
            data = config;
        }
    });

    return data;
    */

    return config;
});