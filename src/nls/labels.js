define([
        "jquery",
        "../config/config"
    ],
    function ($, C) {

        var language = {},
            data = {},
            lang = $("html").attr("lang").toLowerCase(),
            staticurl = C.URL_bucket;

        function getParameterByName(name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        };


        // Static
        $.ajax({
            async: false,
            dataType: 'json',
            method: 'GET',
            contentType: "text/plain; charset=utf-8",
            url:  staticurl+"frontendlabels_"+lang.toUpperCase()+".json",
            success: function(res) {
                $.each(res, function(index, object){
                    data[object["frontend_label_id"]] = object["frontend_label_"+lang];
                });
            },
            error : function(res) {
                console.log(res);
            }
        });

        if (getParameterByName('code') != null) {
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
                    data['indicator_'+getParameterByName('code')] = data['indicator']+" "+getParameterByName('code')+": "+res[1]['indicator_field_label_'+lang];
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
                url:  staticurl+"priority_activity_web_label_en_"+getParameterByName('code')+".json",
                success: function(res) {
                    data['domain_'+getParameterByName('code')] = res[0].pa_labels[0].f2;
                    data['activity1_'+getParameterByName('code')] = res[0].pa_labels[1].f2+" - ";
                    data['activity2_'+getParameterByName('code')] = res[0].pa_labels[2].f2;
                },
                error : function(res) {
                    console.log(res);
                }
            });
            data["title_" + getParameterByName('code')] = data['domain_label'] + " - ";
        }

        // Inject the language
        language[lang] = data;

        return language;
    });