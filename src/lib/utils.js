/*global define, requirejs*/
define([
    'underscore'
], function (_) {

    'use strict';

    // Application-specific utilities
    // ------------------------------

    function Utils(){
        return this;
    };

    Utils.prototype.setI18nToJsTreeConfig = function (config, labels) {

        var core = config.core || {},
            data = core.data || [];

        this.setI18nToArray(data, labels, "menu_");

        if (!config.core) {
            config.core = {};
        }

        config.core.data = data;

        return config;
    };

    Utils.prototype.setI18nToCountriesSummary = function (config, labels) {

        _.each(config, _.bind(function (obj, key) {
            obj.title = this.getI18nLabel(key, labels);
        }, this));

        return config;
    };

    Utils.prototype.setI18nToArray = function (array, labels, prefix) {

        _.each(array, _.bind(function (item) {

            item.text = this.getI18nLabel(item.id, labels, prefix);

            if (Array.isArray(item.children)) {
                this.setI18nToArray(item.children, labels, prefix);
            }

        }, this));

        return array;

    };

    Utils.prototype.getI18nLabel = function (id, labels, prefix) {

        return labels[prefix + id];
    };

    return new Utils();
});
