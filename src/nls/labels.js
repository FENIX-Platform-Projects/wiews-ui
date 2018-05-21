define([
        "jquery",
        "./en/labels"
    ],
    function ($, i18nEn) {

       var data = {},
           label = {},
           url = "https://us-central1-fao-gift-app.cloudfunctions.net/wiewsIndicatorLabels",
           element = [
               //"indicator_field_label",
               "frontend_label", "saiku_label", "prority_activity_label"],
           bodies = [
               //{ "action": "getWebLabels", "lang":"EN", "indicator":"15" },
               { "action": "getFrontendLabels", "lang": "EN" },
               { "action": "getSaikuLabels", "lang":"EN" },
               { "action": "getWebPriorityActivitiesLabels", "lang":"EN" }
           ];

            function getParameterByName(name) {
                var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
            };

               $.ajax({
                   async: false,
                   dataType: 'json',
                   method: 'POST',
                   contentType: "text/plain; charset=utf-8",
                   data : JSON.stringify({ "action": "getWebLabels", "lang":"EN", "indicator":getParameterByName('code') }),
                   url:  url,
                   success: function(res) {

                       console.log(res);

                       data['domain_label'] = res[0]['indicator_field_label_en'];
                       data['element_label1'] = res[1]['indicator_field_label_en'];
                       data['element_label2'] = res[2]['indicator_field_label_en'];
                       data['element_label3'] = res[3]['indicator_field_label_en'];
                       data['cl_indicator_'+getParameterByName('code')] = res[1]['indicator_field_label_en'];
                       data['cl_indicator_'+getParameterByName('code')+'_1'] = res[2]['indicator_field_label_en'];
                       data['cl_indicator_'+getParameterByName('code')+'_2'] = res[3]['indicator_field_label_en'];

                       /*
                       $.each(res, function(index, object){
                           data[object["indicator_field_label_id"]] = object["indicator_field_label_en"];
                           data['cl_indicator_'+getParameterByName('code')] =
                       });
                       */
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

           console.log(data);

           $.extend(label,i18nEn,data);

           return {
              en: label
           }


            /*

            'use strict';

            return {

                en: i18nEn
            }

            */
    });