/*global define*/
define([
        "jquery",
        "../../config/config",
        "./indicator_query.json",
        "../../nls/labels"
    ],function ($, C, staticfile, labels) {

    'use strict';

    var query = staticfile;
    //var Clang = C.lang.toLowerCase();
    var CloudLang = $("html").attr("lang").toLowerCase();

    // Dynamic part.
    var staticurl = C.URL_bucket + "indicator_query.json";

    // Get Query Config
    $.ajax({
        async: false,
        dataType: 'json',
        method: 'GET',
        contentType: "text/plain; charset=utf-8",
        url:  staticurl,
        success: function(res) {
            query = res;
        },
        error : function(res) {
            console.log(res);
            console.log('Reverting to static configuration instead.');
            query = staticfile;
        }
    });

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
            domain_label : labels[CloudLang]['domain_label'],
                element_label : {
                "1" : labels[CloudLang]['element_label1']
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
            }

        },
        2: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
                "2" : labels[CloudLang]['element_label1'],
                "2_1" : labels[CloudLang]['element_label2'],
                "2_2" : labels[CloudLang]['element_label3']
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
        domain_label : labels[CloudLang]['domain_label'],
        element_label : {
            "3" : labels[CloudLang]['element_label1'],
                "3_1" : labels[CloudLang]['element_label2'],
                "3_2" : labels[CloudLang]['element_label3']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "4" : labels[CloudLang]['element_label1']
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
        domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "5" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "6" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "7" : labels[CloudLang]['element_label1']
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
        domain_label : labels[CloudLang]['domain_label'],
        element_label : {
            "8" : labels[CloudLang]['element_label1']
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
        domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "9" : labels[CloudLang]['element_label1']
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
        domain_label : labels[CloudLang]['domain_label'],
        element_label : {
            "10" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
                "11" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "12" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
                "13" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "14" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "15" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "16" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "17" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "18" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "19" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "20" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            indicator_label: "Indicator Label",
            element_label : {
            "21" : labels[CloudLang]['element_label1']
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
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "22" : labels[CloudLang]['element_label1']
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
            "22" : query["22"],
            "22_stk" : query["22_stk"]
        },
            metadata : "91275"
        },
        23: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "23" : labels[CloudLang]['element_label1']
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
                "23" : query["23"],
                "23_stk" : query["23_stk"]
            },
            metadata : "91276"
        },
        24: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "24" : labels[CloudLang]['element_label1']
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
                "24" : query["24"],
                "24_stk" : query["24_stk"]
            },
            metadata : "91277"
        },
        25: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "25" : labels[CloudLang]['element_label1']
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
                "25" : query["25"],
                "25_stk" : query["25_stk"]
            },
            metadata : "91278"
        },
        26: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "26" : labels[CloudLang]['element_label1']
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
                "26" : query["26"],
                "26_stk" : query["26_stk"]
            },
            metadata : "91279"
        },
        27: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "27" : labels[CloudLang]['element_label1']
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
                "27" : query["27"],
                "27_stk" : query["27_stk"]
            },
            metadata : "91280"
        },
        28: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "28" : labels[CloudLang]['element_label1']
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
                "28" : query["28"],
                "28_stk" : query["28_stk"]
            },
            metadata : "91281"
        },
        29: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "29" : labels[CloudLang]['element_label1']
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
                "29" : query["29"],
                "29_stk" : query["29_stk"]
            },
            metadata : "91282"
        },
        30: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "30" : labels[CloudLang]['element_label1']
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
                "30" : query["30"],
                "30_stk" : query["30_stk"]
            },
            metadata : "91283"
        },
        31: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "31" : labels[CloudLang]['element_label1']
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
                "31" : query["31"],
                "31_stk" : query["31_stk"]
            },
            metadata : "91284"
        },
        32: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "32" : labels[CloudLang]['element_label1']
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
                "32" : query["32"],
                "32_stk" : query["32_stk"]
            },
            metadata : "91285"
        },
        33: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "33" : labels[CloudLang]['element_label1']
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
                "33" : query["33"]
            },
            metadata : "91286"
        },
        34: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "34" : labels[CloudLang]['element_label1']
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
                "34" : query["34"]
            },
            metadata : "91287"
        },
        35: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "35" : labels[CloudLang]['element_label1']
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
                "35" : query["35"],
                "35_stk" : query["35_stk"]
            },
            metadata : "91288"
        },
        36: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "36" : labels[CloudLang]['element_label1']
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
                "36" : query["36"]
            },
            metadata : "91289"

        },
        37: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "37" : labels[CloudLang]['element_label1']
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
             "37" : query["37"]
            },
             metadata : "91290"
        },
        38: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "38" : labels[CloudLang]['element_label1']
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
                "38" : query["38"],
                "38_stk" : query["38_stk"]
            },
            metadata : "91291"
        },
        39: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "39" : labels[CloudLang]['element_label1']
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
                "39" : query["39"]
            },
            metadata : "91292"
        },
        40: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "40" : labels[CloudLang]['element_label1']
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
                "40" : query["40"]
            },
            metadata : "91293"
        },
        41: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "41" : labels[CloudLang]['element_label1']
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
                "41" : query["41"]
            },
            metadata : "91294"
        },
        42: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "42" : labels[CloudLang]['element_label1']
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
                "42" : query["42"]
            },
            metadata : "91295"
        },
        43: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "43" : labels[CloudLang]['element_label1']
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
                "43" : query["43"]
            },
            metadata : "91296"
        },
        44: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "44" : labels[CloudLang]['element_label1']
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
                "44" : query["44"]
            },
            metadata : "91297"
        },
        45: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "45" : labels[CloudLang]['element_label1']
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
                "45" : query["45"]
            },
            metadata : "91298"
        },
        46: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "46" : labels[CloudLang]['element_label1']
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
                "46" : query["46"]
            },
            metadata : "91299"
        },
        47: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "47" : labels[CloudLang]['element_label1']
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
                "47" : query["47"]
            },
            metadata : "91300"
        },
        48: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "48" : labels[CloudLang]['element_label1']
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
                "48" : query["48"]
            },
            metadata : "91301"
        },
        49: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "49" : labels[CloudLang]['element_label1']
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
                "49" : query["49"]
            },
            metadata : "91302"
        },
        50: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "50" : labels[CloudLang]['element_label1']
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
                "50" : query["50"],
                "50_stk" : query["50_stk"]
            },
            metadata : "91303"
        },
        51: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "51" : labels[CloudLang]['element_label1']
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
                "51" : query["51"],
                "51_stk" : query["51_stk"]
            },
            metadata : "91304"
        },
        52: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "52" : labels[CloudLang]['element_label1']
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
                "52" : query["52"]
            },
            metadata : "91305"
        },
        53: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "53" : labels[CloudLang]['element_label1']
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
                "53" : query["53"]
            },
            metadata : "91306"
        },
        54: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "54" : labels[CloudLang]['element_label1']
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
                "54" : query["54"],
                "54_stk" : query["54_stk"]
            },
            metadata : "91307"
        },
        55: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "55" : labels[CloudLang]['element_label1']
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
                "55" : query["55"]
            },
            metadata : "91308"
        },
        56: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "56" : labels[CloudLang]['element_label1']
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
                "56" : query["56"],
                "56_stk" : query["56_stk"]
            },
            metadata : "91309"
        },
        57: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "57" : labels[CloudLang]['element_label1']
        },
            dd_filter_category : "1",
            vd_code : "wiews_indicator_57/DashInd57",
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
                "57" : query["57"]
            },
            metadata : "91310"
        },
        58: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "58" : labels[CloudLang]['element_label1']
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
                "58" : query["58"]
            },
            metadata : "91310"
        },
        59: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "59" : labels[CloudLang]['element_label1']
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
                "59" : query["59"]
            },
            metadata : "91312"
        },
        60: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "60" : labels[CloudLang]['element_label1']
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
                "60" : query["60"],
                "60_stk" : query["60_stk"]
            },
            metadata : "91313"

    },
        61: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "61" : labels[CloudLang]['element_label1']
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
                "61" : query["61"]
            },
            metadata : "91314"
        },
        62: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "62" : labels[CloudLang]['element_label1']
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
                "62" : query["62"]
            },
            metadata : "91315"
        },
        63: {
            domain_label : labels[CloudLang]['domain_label'],
            element_label : {
            "63" : labels[CloudLang]['element_label1']
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
                "63" : query["63"],
                "63_stk" : query["63_stk"]
            },
            metadata : "91316"
        }
    };


    return config;
});