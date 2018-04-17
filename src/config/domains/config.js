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
        10: {
            domain_label : "In situ conservation sites managing crop wild relatives and wild food plantss",
            indicator_label: "Percentage",
            element_label : {
                "10" : "Percentage of national in situ conservation sites with management plans addressing crop wild relatives and wild food plants"
            },
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
        22: {
            domain_label : "Accessions at risk",
            indicator_label: "Percentage",
            element_label : {
                "22" : "Percentage of ex situ accessions in need of regeneration for which a budget for regeneration does not exist"
            },
            cube : {
                "queryModel": {},
                "cube": {
                    "uniqueName": "[regenerations_of_accessions_22]",
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
                "stk" : {
                    "mdx": "WITH \n" +
                    "SET [~FILTER] AS {[DataAvalable_ind22].[1]} \n" +
                    "MEMBER [Measures].[%_of_accessions_without_budget] AS IIf(([Measures].[accessions_need_regeneration] = 0), 0.0, ([Measures].[accessions_out_of_budget] / [Measures].[accessions_need_regeneration])) \n" +
                    "SET [~ROWS_Region_Region.iso3_code] AS {{{**REGION_PLACEHOLDER**}}}  \n" +
                    "SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} \n" +
                    "SELECT \n" +
                    "NON EMPTY {[Measures].[%_of_accessions_without_budget]} ON COLUMNS, \n" +
                    "NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) \n" +
                    "ON ROWS FROM [regenerations_of_accessions] \n" +
                    "WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        }

    };
});