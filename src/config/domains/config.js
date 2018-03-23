/*global define*/
define(function () {

    'use strict';

    return {

        1: {
            domain_label: "Accessions conserved",
            query : {
                "queryModel": {},
                "cube": {
                    "uniqueName": "[wiews_indicators].[wiews_indicators].[germplasm_collections_ind_20]",
                    "name": "germplasm_collections_ind_20",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
                },
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
        },
        2: {
            domain_label : "Yeah",
            query : {
                "queryModel": {},
                "cube": {
                    "uniqueName": "[wiews_indicators].[survies_inventories]",
                    "name": "survies_inventories",
                    "connection": "wiews_indicators",
                    "catalog": "wiews_indicators",
                    "schema": "wiews_indicators",
                    "caption": null,
                    "visible": false
                },
                "mdx":  "WITH \n" +
                "SET [~FILTER] AS{[available_ind2].[1]}\n" +
                "MEMBER [Measures].[varieties, annual avg] AS ([Measures].[varieties] / [Measures].[period])\n" +
                "MEMBER [Measures].[species, annual avg ] AS ([Measures].[distinct_species] / [Measures].[period])\n" +
                "SET [~ROWS] AS {{{**REGION_PLACEHOLDER**}}}\n" +
                "SELECT\n" +
                "NON EMPTY {[Measures].[varieties, annual avg], [Measures].[varieties], [Measures].[species, annual avg ], [Measures].[distinct_species]} ON COLUMNS,\n" +
                "NON EMPTY [~ROWS] ON ROWS FROM [survies_inventories]\n" +
                "WHERE [~FILTER]",
                "type": "MDX"
            }
        }

    };
});