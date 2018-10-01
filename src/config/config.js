/*global define*/
define(function () {

    'use strict';

    return {
        lang: $("html").attr("lang").toLowerCase(),
        ping_cloud : true,
        google_apikey : "AIzaSyA5MmbqZJOxNwBlAIMmpxIDktlQN7_izeY",
        // Services URL
        URL_elasticsearchapi :"https://us-central1-fao-gift-app.cloudfunctions.net/elasticSearchApi",
        URL_elasticrawdownload : "https://us-central1-fao-gift-app.cloudfunctions.net/wiewsExsituRawDownload",
        URL_indicator_rawdownload : "https://us-central1-fao-gift-app.cloudfunctions.net/wiewsIndicatorsRawDownload",
        URL_bigquery: "https://us-central1-fao-gift-app.cloudfunctions.net/wiewsExsituSearch",
        URL_bucket : "https://storage.googleapis.com/wiews-lang-bucket/",
        URL_saiku : "http://35.198.138.71:8080/pentaho/plugin/saiku/api/anonymousUser/query/execute",
        URL_saikumap : "http://35.198.138.71:8080/pentaho/plugin/saiku/api/anonymousUser/export/saiku/json?file=/home/anonymousUser/WIEWS/wiews_map_agg_{{YEAR}}.saiku",
        // Frontend URL
        URL_faowiews : "http://www.fao.org/wiews/",
        URL_metadata : "http://www.fao.org/wiews/metadata/indicator-",
        URL_exsitusearch : "http://www.fao.org/wiews/data/ex-situ-sdg-251/search/",
        URL_organizations : "http://www.fao.org/wiews/data/organizations/"
    };
});