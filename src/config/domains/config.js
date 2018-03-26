/*global define*/
define(function () {

    'use strict';

    return {

        0: {
            domain_label: "National Focal Point",
            cube : {
                "queryModel": {},
                "cube": {
                    "uniqueName": "[wiews_indicators].[wiews_indicators].[germplasm_collections_ind_20]",
                    "name": "germplasm_collections_ind_20",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
                }
            },
            query : {
                "0" : {
                    "mdx": "WITH\n" +
                    "SET [~FILTER] AS {[Indicator].[20]}\n" +
                    "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}}\n" +
                    "SELECT\n" +
                    "NON EMPTY {[Measures].[nfp]} ON COLUMNS,\n" +
                    "NON EMPTY [~ROWS] ON ROWS\n" +
                    "FROM [national_focal_point]\n" +
                    "WHERE [~FILTER]\n",
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

        }

    };
});