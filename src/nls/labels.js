define([
        "jquery",
        "./en/labels"
    ],
    function ($, i18nEn) {

        var data = {},
            label = {},
            lang = $("html").attr("lang").toLowerCase(),
            staticurl = "https://storage.googleapis.com/wiews-lang-bucket/",
            url = "https://us-central1-fao-gift-app.cloudfunctions.net/wiewsIndicatorLabels",
            element = [
                "frontendlabels_"+lang.toUpperCase()+".json"
            ],
            bodies = [
                "frontend_label"
            ];

        function getParameterByName(name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        };


        // Static
        $.each(bodies, function(idx){
            $.ajax({
                async: false,
                dataType: 'json',
                method: 'GET',
                contentType: "text/plain; charset=utf-8",
                url:  staticurl+element[idx],
                success: function(res) {
                    $.each(res, function(index, object){
                        data[object[bodies[idx]+"_id"]] = object[bodies[idx]+"_"+lang];
                    });
                },
                error : function(res) {
                    console.log(res);
                }
            });
        });
        // Dynamic
        if (getParameterByName('code') != null) {
            // But static.
            $.ajax({
                async: false,
                dataType: 'json',
                method: 'GET',
                contentType: "text/plain; charset=utf-8",
                url:  staticurl+"saikulabels_"+lang+"_0.json",
                success: function(res) {
                    $.each(res['saikulabels'], function(indice, element){
                        data[element['saiku_label_id']] = element['saiku_label_'+lang];
                    });
                },
                error : function(res) {
                    console.log(res);
                }
            });
            $.ajax({
                async: false,
                dataType: 'json',
                method: 'GET',
                contentType: "text/plain; charset=utf-8",
                url:  staticurl+"saikulabels_"+lang+"_"+getParameterByName('code')+".json",
                success: function(res) {
                    $.each(res['saikulabels'], function(indice, element){
                        data[element['saiku_label_id']] = element['saiku_label_'+lang];
                    });
                },
                error : function(res) {
                    console.log(res);
                }
            });
            $.ajax({
                async: false,
                dataType: 'json',
                method: 'GET',
                contentType: "text/plain; charset=utf-8",
                url:  staticurl+"indicator_web_label_"+lang+"_"+getParameterByName('code')+".json",
                success: function(res) {

                    data['domain_label'] = res[0]['indicator_field_label_'+lang];
                    data['element_label1'] = res[1]['indicator_field_label_'+lang];
                    data['element_label2'] = res[2]['indicator_field_label_'+lang];
                    data['element_label3'] = res[3]['indicator_field_label_'+lang];
                    data['cl_indicator_'+getParameterByName('code')] = res[1]['indicator_field_label_'+lang];
                    data['cl_indicator_'+getParameterByName('code')+'_1'] = res[2]['indicator_field_label_'+lang];
                    data['cl_indicator_'+getParameterByName('code')+'_2'] = res[3]['indicator_field_label_'+lang];

                },
                error : function(res) {
                    console.log(res);
                }
            });
            /*
            $.ajax({
                async: false,
                dataType: 'json',
                method: 'POST',
                contentType: "text/plain; charset=utf-8",
                data : JSON.stringify({ "action": "getWebLabels", "lang":"EN", "indicator":getParameterByName('code') }),
                url:  url,
                success: function(res) {

                    //console.log(res);

                    data['domain_label'] = res[0]['indicator_field_label_en'];
                    data['element_label1'] = res[1]['indicator_field_label_en'];
                    data['element_label2'] = res[2]['indicator_field_label_en'];
                    data['element_label3'] = res[3]['indicator_field_label_en'];
                    data['cl_indicator_'+getParameterByName('code')] = res[1]['indicator_field_label_en'];
                    data['cl_indicator_'+getParameterByName('code')+'_1'] = res[2]['indicator_field_label_en'];
                    data['cl_indicator_'+getParameterByName('code')+'_2'] = res[3]['indicator_field_label_en'];


                    // $.each(res, function(index, object){
                    //    data[object["indicator_field_label_id"]] = object["indicator_field_label_en"];
                    //    data['cl_indicator_'+getParameterByName('code')] =
                    // });

                },
                error : function(res) {
                    console.log(res);
                }
            });
            */
            $.ajax({
                async: false,
                dataType: 'json',
                method: 'GET',
                contentType: "text/plain; charset=utf-8",
                url:  staticurl+"priority_activity_web_label_en_"+getParameterByName('code')+".json",
                success: function(res) {

                    data['domain_'+getParameterByName('code')] = res[0].pa_labels[0].f2;
                    data['activity1_'+getParameterByName('code')] = res[0].pa_labels[1].f2+" - ";
                    data['activity2_'+getParameterByName('code')] = res[0].pa_labels[2].f2;
                    data['indicator_'+getParameterByName('code')] = "Indicator "+getParameterByName('code')+": "+res[0].description;

                },
                error : function(res) {
                    console.log(res);
                }
            });
            /*
            $.ajax({
                async: false,
                dataType: 'json',
                method: 'POST',
                contentType: "text/plain; charset=utf-8",
                data : JSON.stringify({ "action": "getWebPriorityActivitiesLabels", "lang":"EN", "indicator":getParameterByName('code') }),
                url:  url,
                success: function(res) {
                    //console.log("Here I have the priority labels", res[0]);

                    data['domain_'+getParameterByName('code')] = res[0].pa_labels[0].f2;
                    data['activity1_'+getParameterByName('code')] = res[0].pa_labels[1].f2+" - ";
                    data['activity2_'+getParameterByName('code')] = res[0].pa_labels[2].f2;
                    data['indicator_'+getParameterByName('code')] = "Indicator "+getParameterByName('code')+": "+res[0].description;
                },
                error : function(res) {
                    console.log(res);
                }
            });
            */

            data["title_" + getParameterByName('code')] = data['domain_label'] + " - ";
        }

        /*



        $.ajax({
                    async: false,
                    dataType: 'json',
                    method: 'POST',
                    contentType: "text/plain; charset=utf-8",
                    data : JSON.stringify({ "action": "getWebLabels", "lang":"EN", "indicator":getParameterByName('code') }),
                    url:  url,
                    success: function(res) {

                        //console.log(res);

                        data['domain_label'] = res[0]['indicator_field_label_en'];
                        data['element_label1'] = res[1]['indicator_field_label_en'];
                        data['element_label2'] = res[2]['indicator_field_label_en'];
                        data['element_label3'] = res[3]['indicator_field_label_en'];
                        data['cl_indicator_'+getParameterByName('code')] = res[1]['indicator_field_label_en'];
                        data['cl_indicator_'+getParameterByName('code')+'_1'] = res[2]['indicator_field_label_en'];
                        data['cl_indicator_'+getParameterByName('code')+'_2'] = res[3]['indicator_field_label_en'];


                        // $.each(res, function(index, object){
                        //    data[object["indicator_field_label_id"]] = object["indicator_field_label_en"];
                        //    data['cl_indicator_'+getParameterByName('code')] =
                        // });

                    },
                    error : function(res) {
                        console.log(res);
                    }
                });


         $.ajax({
             async: false,
             dataType: 'json',
             method: 'POST',
             contentType: "text/plain; charset=utf-8",
             data : JSON.stringify({ "action": "getWebPriorityActivitiesLabels", "lang":"EN", "indicator":getParameterByName('code') }),
             url:  url,
             success: function(res) {
                 //console.log("Here I have the priority labels", res[0]);

                 data['domain_'+getParameterByName('code')] = res[0].pa_labels[0].f2;
                 data['activity1_'+getParameterByName('code')] = res[0].pa_labels[1].f2+" - ";
                 data['activity2_'+getParameterByName('code')] = res[0].pa_labels[2].f2;
                 data['indicator_'+getParameterByName('code')] = "Indicator "+getParameterByName('code')+": "+res[0].description;
             },
             error : function(res) {
                 console.log(res);
             }
         });


            $.each(bodies, function(idx, obj){
                $.ajax({
                    async: false,
                    dataType: 'json',
                    method: 'POST',
                    contentType: "text/plain; charset=utf-8",
                    data : JSON.stringify(obj),
                    url:  url,
                    success: function(res) {
                        //console.log('res for '+bodies[idx].action+' ',res);
                        $.each(res, function(index, object){
                            data[object[element[idx]+"_id"]] = object[element[idx]+"_en"];
                        });
                        //console.log(data);
                        //data = res;
                    },
                    error : function(res) {
                        console.log(res);
                    }
                });
            });

         $.ajax({
             async: false,
             dataType: 'json',
             method: 'GET',
             contentType: "text/plain; charset=utf-8",
             url:  staticurl+"/saikulabels_EN.json",
             success: function(res) {
                 console.log('res for ',res);
             },
             error : function(res) {
                 console.log(res);
             }
         });

         */
        //
        $.extend(label, i18nEn, data);

        return {
            en: label
            // en: i18nEn
        }
    });