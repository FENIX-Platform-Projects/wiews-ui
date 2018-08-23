/*global define*/
define(
    ["../../nls/labels"],
    function (labels) {

    'use strict';

    return {

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
                "0" : {
                    "mdx": "WITH SET [~FILTER] AS {[Indicator].[2]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[nfp]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [national_focal_point] WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "1" : {
                    "mdx": "WITH MEMBER [Measures].[Annual Avg] AS ([Measures].[surveys carries out] / [Measures].[period]) SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[surveys carries out], [Measures].[Annual Avg]} ON COLUMNS,NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories_ind_01]",
                    "type": "MDX"
                }
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
                "2" : {
                    "mdx":  "WITH " +
                    "SET [~FILTER] AS{[available_ind2].[1]}" +
                    "MEMBER [Measures].[varieties_avg] AS ([Measures].[varieties] / [Measures].[period])" +
                    "MEMBER [Measures].[species_avg] AS ([Measures].[distinct_species] / [Measures].[period])" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}}" +
                    " SELECT " +
                    "NON EMPTY {[Measures].[varieties_avg], [Measures].[varieties], [Measures].[species_avg], [Measures].[distinct_species]} ON COLUMNS," +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories]" +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "2_1" : {
                    "mdx":  "WITH " +
                    "SET [~FILTER] AS{[available_ind2].[1]}" +
                    "MEMBER [Measures].[species_avg] AS ([Measures].[distinct_species] / [Measures].[period])" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}}" +
                    " SELECT " +
                    "NON EMPTY {[Measures].[species_avg], [Measures].[distinct_species]} ON COLUMNS," +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories]" +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "2_2" : {
                    "mdx":  "WITH " +
                    "SET [~FILTER] AS{[available_ind2].[1]}" +
                    "MEMBER [Measures].[varieties_avg] AS ([Measures].[varieties] / [Measures].[period])" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}}" +
                    " SELECT " +
                    "NON EMPTY {[Measures].[varieties_avg], [Measures].[varieties]} ON COLUMNS," +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories]" +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "3" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[available_ind3.available_ind2].[1]} " +
                    "MEMBER [Measures].[% of varieties thr out] AS ([Measures].[threathened_varieties] / [Measures].[varieties]), FORMAT_STRING = \"#0.0#%\" " +
                    "MEMBER [Measures].[% of species thr out] AS ([Measures].[threathened_species] / [Measures].[distinct_species]), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[% of varieties thr out], [Measures].[% of species thr out]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "3_1" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[available_ind3.available_ind2].[1]} " +
                    "MEMBER [Measures].[% of species thr out] AS ([Measures].[threathened_species] / [Measures].[distinct_species]), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[% of species thr out]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "3_2" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[available_ind3.available_ind2].[1]} " +
                    "MEMBER [Measures].[% of varieties thr out] AS ([Measures].[threathened_varieties] / [Measures].[varieties]), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[% of varieties thr out]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "4" : {
                    "mdx": "WITH SET [~FILTER] AS {[DataAvailable_ind4].[1]} MEMBER [Measures].[Annual Avg] AS ([Measures].[Number of Farming Communities] / [Measures].[Period]) SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Number of Farming Communities], [Measures].[Annual Avg]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [on_farm_management_improvement_04] WHERE [~FILTER]",
                    "type": "MDX"
                },
                "4_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind4].[1]} MEMBER [Measures].[Annual Avg] AS ([Measures].[Number of Farming Communities] / [Measures].[Period]) " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[Number of Farming Communities], [Measures].[Annual Avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [on_farm_management_improvement_04] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "5" : {
                    "mdx": "WITH SET [~FILTER] AS     {[DataAvailable_ind5].[1]} MEMBER [Measures].[Percentage] AS     (([Measures].[Cultivated Area]) / [Measures].[Total Area]), FORMAT_STRING = \"##.##%\" SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Percentage]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM  [on_farm_management_improvement_05] WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "6" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind6].[1]} MEMBER [Measures].[Annual Average] AS ([Measures].[Unique Farmers] / [Measures].[Period]) " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[Unique Farmers], [Measures].[Annual Average]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [on_farm_management_improvement_06] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "7" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind7].[1]} MEMBER [Measures].[households_benefited_ann_avg] AS ([Measures].[households_benefited] / [Measures].[period]) " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[households_benefited], [Measures].[households_benefited_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [disaster_recovery] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "7_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind7].[1]} MEMBER [Measures].[households_benefited_ann_avg] AS ([Measures].[households_benefited] / [Measures].[period]) " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[households_benefited], [Measures].[households_benefited_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [disaster_recovery] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "8" : {
                    "mdx": "WITH " +
                    "MEMBER [Measures].[%_seeds_prod_local_level] AS ([Measures].[seeds_prod_local_level] / [Measures].[amount_of_seeds_converted]), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[seeds_prod_local_level], [Measures].[amount_of_seeds_converted], [Measures].[%_seeds_prod_local_level]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [disaster_recovery]",
                    "type": "MDX"
                },
                "8_stk" : {
                    "mdx": "WITH " +
                    "MEMBER [Measures].[%_seeds_prod_local_level] AS ([Measures].[seeds_prod_local_level] / [Measures].[amount_of_seeds_converted]), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[seeds_prod_local_level], [Measures].[amount_of_seeds_converted], [Measures].[%_seeds_prod_local_level]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [disaster_recovery]",
                    "type": "MDX"
                }
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
                "9" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind9].[1]} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_ExistenceOfPolicy_ExistenceOfPolicy.ExistenceOfPolicy] AS {[ExistenceOfPolicy].[ExistenceOfPolicy].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfCountries]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS], [~ROWS_ExistenceOfPolicy_ExistenceOfPolicy.ExistenceOfPolicy]) ON ROWS FROM [disaster_recovery_09] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "10" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvalable_ind10].[1]} " +
                    "MEMBER [Measures].[%_of_sites_with_mngmt] AS IIf(([Measures].[sites_total] = 0), NULL, ([Measures].[sites_with_management] / [Measures].[sites_total])), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[sites_with_management], [Measures].[sites_total], [Measures].[%_of_sites_with_mngmt]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [crop_wild_relatives_wild_food_plants] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "11" : {
                    "mdx": "WITH " +
                    "MEMBER [Measures].[NumberOfActions_AnnAvg] AS ([Measures].[NumberOfActions] / [Measures].[period]) " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfActions], [Measures].[NumberOfActions_AnnAvg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [crop_wild_relatives_wild_food_plants_11]",
                    "type": "MDX"
                },
                "11_stk" : {
                    "mdx": "WITH " +
                    "MEMBER [Measures].[NumberOfActions_AnnAvg] AS ([Measures].[NumberOfActions] / [Measures].[period]) " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfActions], [Measures].[NumberOfActions_AnnAvg]} ON COLUMNS," +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [crop_wild_relatives_wild_food_plants_11]",
                    "type": "MDX"
                }
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
                "12" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind12].[1]} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[estimated_number_of_species]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [crop_wild_relatives_wild_food_plants_12] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "13" : {
                    "mdx": "WITH " +
                    "MEMBER [Measures].[total_crop_strategy_count] AS ([Measures].[total_count]) " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[strategy_count], [Measures].[total_crop_strategy_count]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [targeting_collecting_ind_13_14] ",
                    "type": "MDX"
                },
                "13_stk" : {
                    "mdx": "WITH " +
                    "MEMBER [Measures].[total_crop_strategy_count] AS ([Measures].[total_count]) " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[strategy_count], [Measures].[total_crop_strategy_count]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [targeting_collecting_ind_13_14] ",
                    "type": "MDX"
                }
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
                "14" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_Ind14].[1]} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[crops_req_targeted_collecting]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [targeting_collecting_ind_13_14] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "14_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_Ind14].[1]} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[crops_req_targeted_collecting]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [targeting_collecting_ind_13_14] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "15" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvalable_ind15].[1]} MEMBER [Measures].[targeted_collecting_mission_ann_avg] AS ([Measures].[targeted_collecting_missions] / [Measures].[period]) " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[targeted_collecting_missions], [Measures].[targeted_collecting_mission_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [targeted_collecting] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "15_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvalable_ind15].[1]} MEMBER [Measures].[targeted_collecting_mission_ann_avg] AS ([Measures].[targeted_collecting_missions] / [Measures].[period]) " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[targeted_collecting_missions], [Measures].[targeted_collecting_mission_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [targeted_collecting] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "16" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvalable_ind16].[1]} MEMBER [Measures].[accessions_number_ann_avg] AS ([Measures].[accessions_number] / [Measures].[period]) " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[accessions_number], [Measures].[accessions_number_ann_avg], [Measures].[Distinct Crop], [Measures].[Distinct Taxon], [Measures].[Distinct Crop + Taxon], [Measures].[Distinct Genera]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [targeted_collecting] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "16_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvalable_ind16].[1]} MEMBER [Measures].[accessions_number_ann_avg] AS ([Measures].[accessions_number] / [Measures].[period]) " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[accessions_number], [Measures].[accessions_number_ann_avg], [Measures].[Distinct Crop], [Measures].[Distinct Taxon], [Measures].[Distinct Crop + Taxon], [Measures].[Distinct Genera]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [targeted_collecting] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "17" : {
                    "mdx": "WITH " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SELECT " +
                    "NON EMPTY {[Measures].[Human Resources Capacity], [Measures].[Financial Resources], [Measures].[Infraestructure]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [germplasm_collections_ind_17] " +
                    "WHERE CrossJoin({[DataAvailable_ind17].[1]}, {[Last_Year_Boolean.last_year_boolean].[1]})",
                    "type": "MDX"
                }
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
                "18" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {{{**TIME_PLACEHOLDER**}}} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[crops]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [germplasm_collections] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "18_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {{{**TIME_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[crops]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS " +
                    "FROM [germplasm_collections] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "19" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {{{**TIME_PLACEHOLDER**}}} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[species]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [germplasm_collections] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "19_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {{{**TIME_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[species]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS " +
                    "FROM [germplasm_collections] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "20" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {{{**TIME_PLACEHOLDER**}}} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[accessions]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS " +
                    "FROM [germplasm_collections] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "20_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {{{**TIME_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[accessions]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS " +
                    "FROM [germplasm_collections] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                "21" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {{{**TIME_PLACEHOLDER**}}} " +
                    "MEMBER [Measures].[%_of_accessions_duplicated] AS IIf(([Measures].[accessions] <> 0), (([Measures].[accessions_duplicated] / [Measures].[accessions])), 0), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[%_of_accessions_duplicated]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS " +
                    "FROM [germplasm_collections] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "21_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {{{**TIME_PLACEHOLDER**}}} " +
                    "MEMBER [Measures].[%_of_accessions_duplicated] AS IIf(([Measures].[accessions] <> 0), (([Measures].[accessions_duplicated] / [Measures].[accessions])), 0), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[%_of_accessions_duplicated]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS " +
                    "FROM [germplasm_collections] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
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
                    "SET [~FILTER] AS {[DataAvalable_ind22].[1]} " +
                    "MEMBER [Measures].[%_of_accessions_without_budget] AS ([Measures].[accessions_out_of_budget] / [Measures].[accessions_num]), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[%_of_accessions_without_budget]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [regenerations_of_accessions] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "22_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvalable_ind22].[1]} " +
                    "MEMBER [Measures].[%_of_accessions_without_budget] AS IIf(([Measures].[accessions_need_regeneration] = 0), 0.0, ([Measures].[accessions_out_of_budget] / [Measures].[accessions_need_regeneration])), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[%_of_accessions_without_budget]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [regenerations_of_accessions] " +
                    " WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvalable_ind23].[1]} MEMBER [Measures].[accessions_regenerated_ann_avg] AS ([Measures].[accessions_regenerated] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\"  " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures] .[accessions_regenerated], [Measures].[accessions_regenerated_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [regenerations_of_accessions] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "23_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvalable_ind23].[1]} MEMBER [Measures].[accessions_regenerated_ann_avg] AS ([Measures].[accessions_regenerated] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\"  " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures] .[accessions_regenerated], [Measures].[accessions_regenerated_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [regenerations_of_accessions] " +
                    " WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvalable_ind24].[1]} " +
                    "MEMBER [Measures].[%_of_accessions_need_regeneration] AS ([Measures].[accessions_need_regeneration] / [Measures].[accessions_num]), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[%_of_accessions_need_regeneration]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [regenerations_of_accessions] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "24_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvalable_ind24].[1]} " +
                    "MEMBER [Measures].[%_of_accessions_need_regeneration] AS ([Measures].[accessions_need_regeneration] / [Measures].[accessions_num]), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[%_of_accessions_need_regeneration]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [regenerations_of_accessions] " +
                    " WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_Ind25].[DataAvailable_Ind25].Members} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[AvgOfMorphologicalTraits]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation_25] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "25_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_Ind25].[DataAvailable_Ind25].Members} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[AvgOfMorphologicalTraits]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [characterization_and_evaluation_25] " +
                    " WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_ind26].[1]} MEMBER [Measures].[number_of_pubs_ann_avg] AS ([Measures].[number_of_pubs_total] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[number_of_pubs_total], [Measures].[number_of_pubs_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation_26] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "26_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind26].[1]} MEMBER [Measures].[number_of_pubs_ann_avg] AS ([Measures].[number_of_pubs_total] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[number_of_pubs_total], [Measures].[number_of_pubs_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [characterization_and_evaluation_26] " +
                    " WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_ind27].[1]} MEMBER [Measures].[number_of_trait_ann_avg] AS ([Measures].[number_of_trait_specific_collection_subset_published] / [Measures].[period]) " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[number_of_trait_specific_collection_subset_published], [Measures].[number_of_trait_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation_27] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "27_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind27].[1]} MEMBER [Measures].[number_of_trait_ann_avg] AS ([Measures].[number_of_trait_specific_collection_subset_published] / [Measures].[period]) " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[number_of_trait_specific_collection_subset_published], [Measures].[number_of_trait_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [characterization_and_evaluation_27] " +
                    " WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_ind28].[1]} " +
                    "MEMBER [Measures].[accessions_distributed_ann_avg] AS ([Measures].[accessions_distributed] / [Measures].[period]) " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[accessions_distributed], [Measures].[accessions_distributed_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "28_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind28].[1]} " +
                    "MEMBER [Measures].[accessions_distributed_ann_avg] AS ([Measures].[accessions_distributed] / [Measures].[period]) " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[accessions_distributed], [Measures].[accessions_distributed_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [characterization_and_evaluation] " +
                    " WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_ind29.DataAvailable_ind28].[1]} MEMBER [Measures].[samples_distributed_ann_avg] AS ([Measures].[samples_distributed] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[samples_distributed], [Measures].[samples_distributed_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "29_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind29.DataAvailable_ind28].[1]} MEMBER [Measures].[samples_distributed_ann_avg] AS ([Measures].[samples_distributed] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[samples_distributed], [Measures].[samples_distributed_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [characterization_and_evaluation] " +
                    " WHERE [~FILTER]",
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
                    "MEMBER [Measures].[num_of_crops_public_ann_avg] AS ([Measures].[distinct_crop_taxon] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[distinct_crops], [Measures].[num_of_crops_public_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [plant_breeding] " +
                    "WHERE CrossJoin(Except({[Sector].[sector].Members}, {[Sector].[Private]}), {[DataAvailable_ind30].[1]})",
                    "type": "MDX"
                },
                "30_stk" : {
                    "mdx": "WITH " +
                    "MEMBER [Measures].[num_of_crops_public_ann_avg] AS ([Measures].[distinct_crop_taxon] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[distinct_crops], [Measures].[num_of_crops_public_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [plant_breeding] " +
                    "WHERE CrossJoin(Except({[Sector].[sector].Members}, {[Sector].[Private]}), {[DataAvailable_ind30].[1]})",
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
            vd_code : "wiews_indicator_37/DashInd37",
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
                    "MEMBER [Measures].[num_of_crops_public_ann_avg] AS ([Measures].[distinct_crop_taxon] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[distinct_crops], [Measures].[num_of_crops_public_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [plant_breeding] " +
                    "WHERE CrossJoin(Except({[Sector].[sector].Members}, {[Sector].[Public]}), {[DataAvailable_ind31].[1]})",
                    "type": "MDX"
                },
                "31_stk" : {
                    "mdx": "WITH " +
                    "MEMBER [Measures].[num_of_crops_public_ann_avg] AS ([Measures].[distinct_crop_taxon] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[distinct_crops], [Measures].[num_of_crops_public_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [plant_breeding] " +
                    "WHERE CrossJoin(Except({[Sector].[sector].Members}, {[Sector].[Public]}), {[DataAvailable_ind31].[1]})",
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
                    "MEMBER [Measures].[num_activities_farmers_villages_ann_avg] AS ([Measures].[distinct_programs] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[distinct_programs], [Measures].[num_activities_farmers_villages_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [plant_breeding] " +
                    "WHERE CrossJoin({[OrientedTo].[Small scale farmers], [OrientedTo].[Small scale farmers; Villages or communities that use traditional farmers’ varieties/landraces], [OrientedTo].[Villages or communities that use traditional farmers’ varieties/landraces], [OrientedTo].[Villages or communities that use traditional farmers’ varieties/landraces; Small scale farmers]}, {[DataAvailable_ind32].[1]})",
                    "type": "MDX"
                },
                "32_stk" : {
                    "mdx": "WITH " +
                    "MEMBER [Measures].[num_activities_farmers_villages_ann_avg] AS ([Measures].[distinct_programs] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[distinct_programs], [Measures].[num_activities_farmers_villages_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [plant_breeding] " +
                    "WHERE CrossJoin({[OrientedTo].[Small scale farmers], [OrientedTo].[Small scale farmers; Villages or communities that use traditional farmers’ varieties/landraces], [OrientedTo].[Villages or communities that use traditional farmers’ varieties/landraces], [OrientedTo].[Villages or communities that use traditional farmers’ varieties/landraces; Small scale farmers]}, {[DataAvailable_ind32].[1]})",
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
                    "WHERE CrossJoin({[DataAvailable_ind34].[1]}, {[Last_Year_Crop].[1]})",
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
            vd_code : "wiews_indicator_33/DashInd33",
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
                    "WHERE CrossJoin({[DataAvailable_ind34].[1]}, {[Last_Year_Crop].[1]})",
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
                    "SET [~FILTER] AS {[DataAvailable_ind35].[1]} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfPrograms]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [crop_diversification_35] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "35_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind35].[1]} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfPrograms]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [crop_diversification_35] " +
                    " WHERE [~FILTER]",
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
                    "mdx" : "WITH SET [~FILTER] AS {[DataAvailable_ind36].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfNewCrops]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [crop_diversification_36] WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_ind37].[1]} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_ExistenceOfPolicy_ExistenceOfPolicy.ExistenceOfPolicy] AS {[ExistenceOfPolicy].[ExistenceOfPolicy].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfPolicies]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_ExistenceOfPolicy_ExistenceOfPolicy.ExistenceOfPolicy]) ON ROWS FROM [dev_and_comm_of_varieties_37] " +
                    " WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_ind38].[1]} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfPrograms]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [dev_and_comm_of_varieties_38] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "38_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind38].[1]} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfPrograms]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [dev_and_comm_of_varieties_38] " +
                    " WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS     {[DataAvailable_Ind39].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfLandraces], [Measures].[CountOfTaxonCrop]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [dev_and_comm_of_varieties_39] WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS     {[DataAvailable_Ind40].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfNewVarieties]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [seed_production_and_distribution_40] WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS     {[DataAvailable_ind41].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfRegisteredSeedEnterprises]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [seed_production_and_distribution_41] WHERE [~FILTER]",
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
                    "mdx": "WITH MEMBER [Measures].[NumberOfVarieties] AS ([Measures].[NumberOfVaretiesXTotalCropArea] / [Measures].[TotalCropArea]), FORMAT_STRING = \"#0.0#%\" SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfVarieties]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [seed_production_and_distribution_42] WHERE CrossJoin({[Last_Year_Boolean.last_year_boolean].[1]}, {[DataAvailable_ind42].[1]})",
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
                    "mdx": "WITH MEMBER [Measures].[area_supplied_with_seed] AS ([Measures].[CalcPerCrop_x_TotalCropHarv] / [Measures].[TotalCropHarvestedArea]), FORMAT_STRING = \"#,##0.00\" SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[area_supplied_with_seed]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [seed_production_and_distribution_43] WHERE CrossJoin({[DataAvailable_ind43].[1]}, {[Last Year Bool].[1]})",
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
                    "mdx": "WITH SET [~FILTER] AS {[DataAvailable_ind44].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[ExistenceOfPolicy]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [seed_production_and_distribution_44] WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS     {[DataAvailable_ind45].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Existence National Entity]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [national_programme_45] WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS     {[DataAvailable_ind46].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Existence NFP]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [national_programme_46] WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS    {[DataAvailable_ind47].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Existence Gov Policy]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [national_programme_47] WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS {[DataAvailable_ind48].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Existence National Info Sharing]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [national_programme_48] WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS {[DataAvailable_Ind49].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[MemberOfPgrfaNetwork]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [networks_49] WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_Ind50].[1]} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfNetworks]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [networks_50] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "50_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_Ind50].[1]} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfNetworks]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [networks_50] " +
                    " WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_Ind51].[1]} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfPublications]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [networks_51] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "51_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_Ind51].[1]} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfPublications]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [networks_51] " +
                    " WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS {[DataAvailable_ind52].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Number of Crops]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [information_systems_52] WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS {[DataAvailable_ind53].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Farmers Varieties]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [information_systems_53] WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_ind54].[1]} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[Accessions ex situ documented]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [information_systems_54] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "54_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind54].[1]} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[Accessions ex situ documented]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [information_systems_54] " +
                    " WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS {[DataAvailable_ind55].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Number Released Varieties]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [information_systems_55] WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_ind56].[1]} " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[Int/ Reg Information Systems]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [information_systems_56] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "56_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind56].[1]} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[Int/ Reg Information Systems]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [information_systems_56] " +
                    " WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS {[DataAvailable_Ind57].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[ExistenceOfNationalSystemReference]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [monitoring_and_safeguarding_genetic_diversity_57] WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS {[DataAvailable_ind58].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[Remedial Action]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [monitoring_and_safeguarding_genetic_diversity_58] WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS {[DataAvailable_Ind59].[1]}SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[ExistanceOfEducationAndTrainingPrograms]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [human_resource_capacity_59] WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_Ind60].[1]} " +
                    "MEMBER [Measures].[%_of_staff_with_skills_upgraded] AS iif((((([Measures].[NumberOfProfessionalsWithPHD] + [Measures].[NumberOfProfessionalsWithMSC]) + [Measures].[NumberOfProfessionalsAttendedCourses]) / [Measures].[NumberOfProfessionals]) > 1), 1, ((([Measures].[NumberOfProfessionalsWithPHD] + [Measures].[NumberOfProfessionalsWithMSC]) + [Measures].[NumberOfProfessionalsAttendedCourses]) / [Measures].[NumberOfProfessionals])), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[%_of_staff_with_skills_upgraded]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [human_resource_capacity_60] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                },
                "60_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_Ind60].[1]} " +
                    "MEMBER [Measures].[%_of_staff_with_skills_upgraded] AS iif((((([Measures].[NumberOfProfessionalsWithPHD] + [Measures].[NumberOfProfessionalsWithMSC]) + [Measures].[NumberOfProfessionalsAttendedCourses]) / [Measures].[NumberOfProfessionals]) > 1), 1, ((([Measures].[NumberOfProfessionalsWithPHD] + [Measures].[NumberOfProfessionalsWithMSC]) + [Measures].[NumberOfProfessionalsAttendedCourses]) / [Measures].[NumberOfProfessionals])), FORMAT_STRING = \"#0.0#%\" " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[%_of_staff_with_skills_upgraded]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [human_resource_capacity_60] " +
                    " WHERE [~FILTER]",
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
                    "mdx": "WITH SET [~FILTER] AS {[DataAvailable_Ind61].[1]} MEMBER [Measures].[Existence_Programme] AS [Existence_Programme].CurrentMember.NAME SET [~ROWS_Region_Region.Region_FAO_codes] AS {{{**REGION_PLACEHOLDER**}}} SET [~ROWS_Existence_Programme_Existence_Programme.Existence_Programme] AS {[Existence_Programme].[Existence_Programme].Members} SELECT NON EMPTY {[Measures].[Existence_Programme]} ON COLUMNS, NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.Region_FAO_codes], [~ROWS_Existence_Programme_Existence_Programme.Existence_Programme]) ON ROWS FROM [public_awareness_61] WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_Ind61].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfStakeholdingGroups]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [public_awareness_61] WHERE [~FILTER]",
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
                    "SET [~FILTER] AS {[DataAvailable_Ind63].[1]} SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[NumberOfProductsDeveloped]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [public_awareness_63] WHERE [~FILTER]",
                    "type": "MDX"
                },
                "63_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_Ind63].[1]} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    " SELECT " +
                    "NON EMPTY {[Measures].[NumberOfProductsDeveloped]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [public_awareness_63] " +
                    " WHERE [~FILTER]",
                    "type": "MDX"
                }
            },
            metadata : "91316"

        }
    };
});