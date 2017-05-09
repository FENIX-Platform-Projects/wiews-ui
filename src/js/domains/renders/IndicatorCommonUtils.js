define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../config/config",
    "../../../config/errors",
    "../../../config/events",
    "../../../config/domains/config",
    "../../../config/domains/filterSelectors",
    "fenix-ui-reports",
    "../../../nls/labels",
    "fenix-ui-bridge",
    "bootstrap-table"
], function ($, log, _, C, ERR, EVT, DM, FilterSelectors, Report, labels, Bridge, bootstrapTable) {

    'use strict';

    var defaultOptions = {};
    var s =
    {
        geo_property : 'GEO',
        choices_code : {
            total : 'total',
            list : 'list',
            iso3 : 'iso3',
            fao : 'fao',
            m49 : 'm49',
            sdg : 'sdg',
            mdg : 'mdg',
            cgrfa : 'cgrfa',
            itpgrfa : 'itpgrfa'
        },
        filterDivMsg1_text : ''
    }

    function IndicatorCommonUtils(o) {

        $.extend(true, this, defaultOptions, o);
        return this;
    }

    IndicatorCommonUtils.prototype.valuesFormatter = function (option,value) {

        // value.toLocaleString('en-US')/('de-DE')
        var separator = ",";
        var decimal = ".";
        var formatted = String(value);
        switch(option) {
            case '1':
                return value;
                break;
            case '2':
                separator = ",";
                decimal = ".";
                break;
            case '3':
                formatted = formatted.replace(".", ",");
                separator = ".";
                decimal = ",";
                break;
        }

        var parts = formatted.toString().split(decimal);
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return parts.join(decimal);
    }

    /*Geographic Selector Functions*/

    IndicatorCommonUtils.prototype.geoItemSelectionValidation = function (paramsForGeoValidation) {

        var newValues = '', codelist = '', listType = '', values = paramsForGeoValidation.values;
        var regionFilterItem = paramsForGeoValidation.regionFilterItem, specialGroupFilterItem = paramsForGeoValidation.specialGroupFilterItem;
        var checkboxRegionItem = paramsForGeoValidation.checkboxRegionItem, checkboxSpecialGroupItem = paramsForGeoValidation.checkboxSpecialGroupItem;
        var toDelete = paramsForGeoValidation.toDelete;
        if((paramsForGeoValidation.tab_active_geo_item!=null)&&(typeof paramsForGeoValidation.tab_active_geo_item != 'undefined')){
            switch (paramsForGeoValidation.tab_active_geo_item){
                case paramsForGeoValidation.filter_items_tabItem_first:
                    newValues = values.values[s.filter_items.item_1];
                    if((newValues!=null)&&(typeof newValues!="undefined")&&(newValues.length>0)){
                        codelist = s.choices_code.iso3;
                        listType = [];
                        listType.push(s.choices_code.total);
                        listType.push(s.choices_code.list)
                        newValues = this._geoSelector_valuesUpdate(values.values, newValues, toDelete, codelist, listType);
                    }
                    break;
                case paramsForGeoValidation.filter_items_tabItem_second:
                    newValues = values.values[paramsForGeoValidation.geoCodelistSelector];
                    if((newValues!=null)&&(typeof newValues!="undefined")&&(newValues.length>0)){
                        codelist = this._geoSelector_getCodelist(values.values[paramsForGeoValidation.filter_items_codelistItem_tabItem_second], paramsForGeoValidation.filter_items_codelistItem_tabItem_second, regionFilterItem, specialGroupFilterItem)
                        listType = this._geoSelector_getListType(values.values[paramsForGeoValidation.filter_items_listTypetItem_tabItem_second], paramsForGeoValidation.filter_items_listTypetItem_tabItem_second, checkboxRegionItem, checkboxSpecialGroupItem);
                        if(listType.length<=0){
                            newValues = '';
                        }
                        else{
                            newValues = this._geoSelector_valuesUpdate(values.values, newValues, toDelete, codelist, listType);
                        }
                    }
                    break;
                case paramsForGeoValidation.filter_items_tabItem_third:
                    newValues = values.values[paramsForGeoValidation.geoCodelistSelector];
                    if((newValues!=null)&&(typeof newValues!="undefined")&&(newValues.length>0)){
                        codelist = this._geoSelector_getCodelist(values.values[paramsForGeoValidation.filter_items_codelistItem_tabItem_third], paramsForGeoValidation.filter_items_codelistItem_tabItem_third, regionFilterItem, specialGroupFilterItem)
                        listType = this._geoSelector_getListType(values.values[paramsForGeoValidation.filter_items_listTypetItem_tabItem_third], paramsForGeoValidation.filter_items_listTypetItem_tabItem_third, checkboxRegionItem, checkboxSpecialGroupItem);
                        if(listType.length<=0){
                            newValues = '';
                        }
                        else{
                            newValues = this._geoSelector_valuesUpdate(values.values, newValues, toDelete, codelist, listType);
                        }
                    }
                    break;
            }

        }

        var updatedValues = {};
        updatedValues.values = newValues;
        updatedValues.listType = listType;

        return updatedValues;
    }

    IndicatorCommonUtils.prototype._geoSelector_getCodelist = function (listValues, type, regionItem, specialGroupItem) {

        var codelist= '';
        var code = listValues[Object.keys(listValues)[0]];
        switch (type){
            case regionItem:
                switch (code){
                    case "1":
                        codelist = s.choices_code.fao;
                        break;
                    case "2":
                        codelist = s.choices_code.m49;
                        break;
                    case "3":
                        codelist = s.choices_code.sdg;
                        break;
                    case "4":
                        codelist = s.choices_code.mdg;
                        break;
                }
                break;
            case specialGroupItem:
                switch (code){
                    case "1":
                        codelist = s.choices_code.cgrfa;
                        break;
                    case "2":
                        codelist = s.choices_code.itpgrfa;
                        break;
                }
                break;
        }

        return codelist;
    }

    IndicatorCommonUtils.prototype._geoSelector_getListType = function (radioValue, type, checkboxRegionItem, checkboxSpecialGroupItem) {

        var listType= [];
        var code = radioValue[Object.keys(radioValue)[0]];
        switch (type){
            case checkboxRegionItem:
            case checkboxSpecialGroupItem:
                switch (code){
                    case "1":
                        listType.push(s.choices_code.total);
                    case "2":
                        listType.push(s.choices_code.list);
                }
                break;
        }

        return listType;

    }

    IndicatorCommonUtils.prototype._geoSelector_valuesUpdate = function (values, newValues, toDelete, codelist, listType) {

        toDelete.forEach(function (item) {
            delete values[item];
        });

        values[s.geo_property] = {codelist : codelist, listType: listType, values : newValues};

        return values;
    }


    /**
     * pub/sub
     * @return {Object} component instance
     */
    IndicatorCommonUtils.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    IndicatorCommonUtils.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };


    return IndicatorCommonUtils;

});