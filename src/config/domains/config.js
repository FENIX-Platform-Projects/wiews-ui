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
        22: {
            domain_label : "Accessions at risk",
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
                    "mdx":  "WITH SET [~FILTER] AS {[DataAvalable_ind22].[1]} MEMBER [Measures].[%_of_accessions_without_budget] AS ([Measures].[accessions_out_of_budget] / [Measures].[accessions_need_regeneration]) SET [~ROWS] AS    {{{**REGION_PLACEHOLDER**}}} SELECT NON EMPTY {[Measures].[%_of_accessions_without_budget]} ON COLUMNS, NON EMPTY [~ROWS] ON ROWS FROM [regenerations_of_accessions] WHERE [~FILTER]",
                    "type": "MDX"
                },
                "stk" : {
                    "mdx":"WITH SET [~FILTER] AS {[DataAvalable_ind22].[1]} MEMBER [Measures].[%_of_accessions_without_budget] AS ([Measures].[accessions_out_of_budget] / [Measures].[accessions_need_regeneration]) SET [~ROWS_Region_Region.iso3_code] AS {[Region.iso3_code].[ALB], [Region.iso3_code].[ARM]}  SET [~ROWS_Organization_Organization.Organization] AS {[Organization].[wiews_instcode].Members} SELECT NON EMPTY {[Measures].[%_of_accessions_without_budget]} ON COLUMNS, NON EMPTY NonEmptyCrossJoin([~ROWS_Region_Region.iso3_code], [~ROWS_Organization_Organization.Organization]) ON ROWS FROM [regenerations_of_accessions] WHERE [~FILTER]",
                    "type": "MDX"
                }
            }

        }

    };
});