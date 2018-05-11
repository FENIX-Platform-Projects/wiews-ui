/*global define*/
define(function () {

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
        2: {
            domain_label : "Surveyed species/varieties",
            indicator_label: "Indicator",
            element_label : {
                "2" : "Number of PGRFA surveyed/inventoried",
                "2_1" : "Number of species surveyed/inventoried",
                "2_2" : "Number of varieties surveyed/inventoried"
            },
            dd_filter_category : "2",
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
                    "mdx":  "WITH \n" +
                    "SET [~FILTER] AS{[available_ind2].[1]}\n" +
                    "MEMBER [Measures].[varieties_avg] AS ([Measures].[varieties] / [Measures].[period])\n" +
                    "MEMBER [Measures].[species_avg] AS ([Measures].[distinct_species] / [Measures].[period])\n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}}\n" +
                    "SELECT\n" +
                    "NON EMPTY {[Measures].[varieties_avg], [Measures].[varieties], [Measures].[species_avg], [Measures].[distinct_species]} ON COLUMNS,\n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories]\n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                },
                "2_1" : {
                    "mdx":  "WITH \n" +
                    "SET [~FILTER] AS{[available_ind2].[1]}\n" +
                    "MEMBER [Measures].[species_avg] AS ([Measures].[distinct_species] / [Measures].[period])\n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}}\n" +
                    "SELECT\n" +
                    "NON EMPTY {[Measures].[species_avg], [Measures].[distinct_species]} ON COLUMNS,\n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories]\n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                },
                "2_2" : {
                    "mdx":  "WITH \n" +
                    "SET [~FILTER] AS{[available_ind2].[1]}\n" +
                    "MEMBER [Measures].[varieties_avg] AS ([Measures].[varieties] / [Measures].[period])\n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}}\n" +
                    "SELECT\n" +
                    "NON EMPTY {[Measures].[varieties_avg], [Measures].[varieties]} ON COLUMNS,\n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories]\n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        3: {
            domain_label : "Threatened species/varieties",
            indicator_label: "Percentage",
            element_label : {
                "3" : "Percentage of PGRFA threatened out of those surveyed/inventoried",
                "3_1" : "Percentage of species threatened out of those surveyed/inventoried",
                "3_2" : "Percentage of varieties threatened out of those surveyed/inventoried"
            },
            dd_filter_category : "1",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[available_ind3.available_ind2].[1]} \n" +
                    "MEMBER [Measures].[% of varieties thr out] AS ([Measures].[threathened_varieties] / [Measures].[varieties]) \n" +
                    "MEMBER [Measures].[% of species thr out] AS ([Measures].[threathened_species] / [Measures].[distinct_species]) \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT " +
                    "NON EMPTY {[Measures].[% of varieties thr out], [Measures].[% of species thr out]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                },
                "3_1" : {
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[available_ind3.available_ind2].[1]} \n" +
                    "MEMBER [Measures].[% of species thr out] AS ([Measures].[threathened_species] / [Measures].[distinct_species]) \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT " +
                    "NON EMPTY {[Measures].[% of species thr out]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                },
                "3_2" : {
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[available_ind3.available_ind2].[1]} \n" +
                    "MEMBER [Measures].[% of varieties thr out] AS ([Measures].[threathened_varieties] / [Measures].[varieties]) \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT " +
                    "NON EMPTY {[Measures].[% of varieties thr out]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        5: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "5" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvailable_ind5].[1]} MEMBER [Measures].[Percentage] AS (([Measures].[Cultivated Area] * 100) / [Measures].[Total Area]) \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[Percentage]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM  [on_farm_management_improvement_05] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        6: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "6" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvailable_ind6].[1]} MEMBER [Measures].[Annual Average] AS ([Measures].[Unique Farmers] / [Measures].[Period]) \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[Unique Farmers], [Measures].[Annual Average]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [on_farm_management_improvement_06] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        7: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "7" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvailable_ind7].[1]} MEMBER [Measures].[amount_of_seeds_ann_avg] AS ([Measures].[households_benefited] / [Measures].[period]) \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[households_benefited], [Measures].[amount_of_seeds_ann_avg]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [disaster_recovery] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        8: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "8" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvailable_ind8].[1]} MEMBER [Measures].[%_seeds_prod_local_level] AS ([Measures].[seeds_prod_local_level] / [Measures].[amount_of_seeds_converted]) \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[amount_of_seeds], [Measures].[seeds_prod_local_level], [Measures].[amount_of_seeds_converted], [Measures].[%_seeds_prod_local_level]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [disaster_recovery] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        9: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "9" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvailable_ind9].[1]} \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SET [~ROWS_ExistenceOfPolicy_ExistenceOfPolicy.ExistenceOfPolicy] AS {[ExistenceOfPolicy].[ExistenceOfPolicy].Members} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[NumberOfCountries]} ON COLUMNS, \n" +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_ExistenceOfPolicy_ExistenceOfPolicy.ExistenceOfPolicy]) ON ROWS FROM [disaster_recovery_09] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        10: {
            domain_label : "In situ conservation sites managing crop wild relatives and wild food plantss",
            indicator_label: "Percentage",
            element_label : {
                "10" : "Percentage of national in situ conservation sites with management plans addressing crop wild relatives and wild food plants"
            },
            dd_filter_category : "1",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvalable_ind10].[1]} \n" +
                    "MEMBER [Measures].[%_of_sites_with_mngmt] AS IIf(([Measures].[sites_total] = 0), NULL, ([Measures].[sites_with_management] / [Measures].[sites_total])) \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[sites_with_management], [Measures].[sites_total], [Measures].[%_of_sites_with_mngmt]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [crop_wild_relatives_wild_food_plants] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        12: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "12" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvailable_ind12].[1]} \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[estimated_number_of_species]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [crop_wild_relatives_wild_food_plants_12] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        13: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "13" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvailable_Ind13].[1]} \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[exist_of_strategy], [Measures].[strategy_count], [Measures].[total_count], [Measures].[country_count]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [targeting_collecting_ind_13_14] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        14: {
            domain_label : "Crops requiring targeted collecting",
            indicator_label: "Indicator Label",
            element_label : {
                "14" : "Number of crops conserved in the national genebank(s) that require targeted collecting"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvailable_Ind14].[1]} \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[crops_req_targeted_collecting]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [targeting_collecting_ind_13_14] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                },
                "14_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_Ind14].[1]} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    "SELECT " +
                    "NON EMPTY {[Measures].[crops_req_targeted_collecting]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [targeting_collecting_ind_13_14] " +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        15: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "15" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvalable_ind15].[1]} MEMBER [Measures].[targeted_collecting_mission_ann_avg] AS ([Measures].[targeted_collecting_missions] / [Measures].[period]) \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[targeted_collecting_missions], [Measures].[targeted_collecting_mission_ann_avg]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [targeted_collecting] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        16: {
            domain_label : "Samples collected",
            indicator_label: "Indicator Label",
            element_label : {
                "16" : "Number of accessions resulting from targeted collecting missions in the country"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvalable_ind16].[1]} MEMBER [Measures].[accessions_number_ann_avg] AS ([Measures].[accessions_number] / [Measures].[period]) \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[accessions_number], [Measures].[accessions_number_ann_avg], [Measures].[Distinct Crop], [Measures].[Distinct Taxon], [Measures].[Distinct Crop + Taxon], [Measures].[Distinct Genera]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [targeted_collecting] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                },
                "16_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvalable_ind16].[1]} MEMBER [Measures].[accessions_number_ann_avg] AS ([Measures].[accessions_number] / [Measures].[period]) " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    "SELECT " +
                    "NON EMPTY {[Measures].[accessions_number], [Measures].[accessions_number_ann_avg], [Measures].[Distinct Crop], [Measures].[Distinct Taxon], [Measures].[Distinct Crop + Taxon], [Measures].[Distinct Genera]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [targeted_collecting] " +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        17: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "17" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[Year], [Measures].[Human Resources Capacity], [Measures].[Financial Resources], [Measures].[Infraestructure]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [germplasm_collections_ind_17] \n" +
                    "WHERE CrossJoin({[Last_Year_Boolean.last_year_boolean].[1]}, {[DataAvailable_ind17].[1]})",
                    "type": "MDX"
                }
            }

        },
        20: {
            period_label : "Year",
            domain_label : "Accessions conserved",
            indicator_label: "Indicator Label",
            element_label : {
                "20" : "Number of accessions conserved ex situ under medium or long-term conditions"
            },
            time: "years",
            dd_filter_category : "3",
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
                    "SELECT " +
                    "NON EMPTY {[Measures].[accessions]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS " +
                    "FROM [germplasm_collections] " +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                },
                "20_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {{{**TIME_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    "SELECT " +
                    "NON EMPTY {[Measures].[accessions]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS " +
                    "FROM [germplasm_collections] " +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        22: {
            domain_label : "Accessions at risk",
            indicator_label: "Percentage",
            element_label : {
                "22" : "Percentage of ex situ accessions in need of regeneration for which a budget for regeneration does not exist"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvalable_ind22].[1]} \n" +
                    "MEMBER [Measures].[%_of_accessions_without_budget] AS IIf(([Measures].[accessions_need_regeneration] = 0), 0.0, ([Measures].[accessions_out_of_budget] / [Measures].[accessions_need_regeneration])) \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[%_of_accessions_without_budget]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [regenerations_of_accessions] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                },
                "22_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvalable_ind22].[1]} " +
                    "MEMBER [Measures].[%_of_accessions_without_budget] AS IIf(([Measures].[accessions_need_regeneration] = 0), 0.0, ([Measures].[accessions_out_of_budget] / [Measures].[accessions_need_regeneration])) " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    "SELECT " +
                    "NON EMPTY {[Measures].[%_of_accessions_without_budget]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [regenerations_of_accessions] " +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        23: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "23" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvalable_ind23].[1]} MEMBER [Measures].[accessions_regenerated_ann_avg] AS ([Measures].[accessions_regenerated] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\"  \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures] .[accessions_regenerated], [Measures].[accessions_regenerated_ann_avg]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [regenerations_of_accessions] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        24: {
            domain_label : "Accessions at risk",
            indicator_label: "Indicator Label",
            element_label : {
                "24" : "Percentage of ex situ accessions in need of regeneration"
            },
            dd_filter_category : "3",
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
                    "MEMBER [Measures].[%_of_accessions_need_regeneration] AS ([Measures].[accessions_need_regeneration] / [Measures].[accessions_num]), FORMAT_STRING = \"##.##%\" " +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SELECT " +
                    "NON EMPTY {[Measures].[%_of_accessions_need_regeneration]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [regenerations_of_accessions] " +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                },
                "24_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvalable_ind24].[1]} " +
                    "MEMBER [Measures].[%_of_accessions_need_regeneration] AS ([Measures].[accessions_need_regeneration] / [Measures].[accessions_num]), FORMAT_STRING = \"##.##%\" " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    "SELECT " +
                    "NON EMPTY {[Measures].[%_of_accessions_need_regeneration]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [regenerations_of_accessions] " +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        25: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "25" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvailable_Ind25].[DataAvailable_Ind25].Members} \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[AvgOfMorphologicalTraits]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation_25] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        26: {
            domain_label : "Domain Label",
            indicator_label: "Indicator Label",
            element_label : {
                "26" : "Element Label"
            },
            dd_filter_category : "3",
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
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvailable_ind26].[1]} MEMBER [Measures].[number_of_pubs_ann_avg] AS ([Measures].[number_of_pubs_total] / [Measures].[period]), FORMAT_STRING = \"#,##0.00\" \n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}} \n" +
                    "SELECT " +
                    "NON EMPTY {[Measures].[number_of_pubs_total], [Measures].[number_of_pubs_ann_avg]} ON COLUMNS, \n" +
                    "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation_26] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },
        28: {
            domain_label : "Accessions distributed",
            indicator_label: "Indicator Label",
            element_label : {
                "28" : " Number of accessions distributed by genebanks to users of germplasm"
            },
            dd_filter_category : "3",
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
                    "SELECT " +
                    "NON EMPTY {[Measures].[accessions_distributed], [Measures].[accessions_distributed_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY [~ROWS] ON ROWS FROM [characterization_and_evaluation] " +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                },
                "28_stk" : {
                    "mdx": "WITH " +
                    "SET [~FILTER] AS {[DataAvailable_ind28].[1]} " +
                    "MEMBER [Measures].[accessions_distributed_ann_avg] AS ([Measures].[accessions_distributed] / [Measures].[period]) " +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}} " +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} " +
                    "SELECT " +
                    "NON EMPTY {[Measures].[accessions_distributed], [Measures].[accessions_distributed_ann_avg]} ON COLUMNS, " +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [characterization_and_evaluation] " +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        },

    };
});