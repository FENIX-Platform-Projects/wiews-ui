define([
    "jquery",
    "underscore"
], function ($, _) {

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

    IndicatorCommonUtils.prototype.callElastic = function (payload, isRegion) {
        var response_data = {
            total : -1,
            hits : []
            },
            endpoint = (isRegion === true) ? "yes" : "no";

        $.ajax({
            async: false,
            dataType: 'json',
            method: 'POST',
            contentType: "text/plain; charset=utf-8",
            url: "https://us-central1-fao-gift-app.cloudfunctions.net/elasticSearchGetData?index=regions&multiSearch="+endpoint,
            data: (isRegion === true) ? payload : JSON.stringify(payload),
            success: function(res) {
                if (isRegion === true) {
                    _.each( res.responses, function(response) {
                        response_data.total = response.hits.total;
                        // first we check for aggregations
                        if (response.aggregations) {
                            //res.aggregations.result_set.buckets.length && res.aggregations.result_set.length
                            //console.log('aggregations');
                            _.each( response.aggregations.result_set.buckets, function ( element ) {
                                var item =  {
                                    label : element.childs_set.buckets[0].key,
                                    value : element.key
                                };
                                response_data.hits.push(item);
                            });
                        }
                    });
                } else {
                    response_data.total = res.hits.total;
                    // first we check for aggregations
                    if (res.aggregations) {
                        //res.aggregations.result_set.buckets.length && res.aggregations.result_set.length
                        //console.log('aggregations');
                        _.each( res.aggregations.result_set.buckets, function ( element ) {
                            var item =  {
                                label : element.childs_set.buckets[0].key,
                                value : element.key
                            };
                            response_data.hits.push(item);
                        });
                    }
                }

            },
            error : function(res) {
                alert('Elastic Search Error');
                console.log('I was sending',payload)
                console.log(res);
                return;
            }

        });

        //console.log ('response_data is ', response_data);
        return response_data;

    };

    //Values Formatter for the Values Column in the table shown in the Download Data Tab
    IndicatorCommonUtils.prototype.valuesFormatter = function (option,value) {

        if (value == null) return null;

        // value.toLocaleString('en-US')/('de-DE')
        var separator = ",";
        var decimal = ".";
        // var formatted = String(value);
        var formatted = String(value.toFixed(2));
        switch(option) {
            case '1':
                return formatted;
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
    };

    IndicatorCommonUtils.prototype.prepareWarning = function (message) {
        return '<div class="alert alert-warning" role="alert"><center>'+message+'</center></div>';
    };

    /*Geographic Selector Functions*/

    //Validation of the selector
    IndicatorCommonUtils.prototype.geoItemSelectionValidation = function (paramsForGeoValidation) {

        //console.log('we are geovalidators', paramsForGeoValidation);
        console.log('the selected item is ',paramsForGeoValidation.geo_SelectedItem);
        var newValues = paramsForGeoValidation.values.values[paramsForGeoValidation.geo_SelectedItem],
            codelist = paramsForGeoValidation.geo_SelectedCode,
            listType = paramsForGeoValidation.geo_SelectedList,
            values = paramsForGeoValidation.values;
        var listTypeError = false;
        var regionFilterItem = paramsForGeoValidation.regionFilterItem, specialGroupFilterItem = paramsForGeoValidation.specialGroupFilterItem;
        var checkboxRegionItem = paramsForGeoValidation.checkboxRegionItem, checkboxSpecialGroupItem = paramsForGeoValidation.checkboxSpecialGroupItem;
        var toDelete = paramsForGeoValidation.toDelete;

        //if((paramsForGeoValidation.tab_active_geo_item!=null)&&(typeof paramsForGeoValidation.tab_active_geo_item != 'undefined')) console.log('tab_active_geo_item', paramsForGeoValidation.tab_active_geo_item)

        //console.log('the value(s) I want is', newValues, 'from', codelist, 'using', paramsForGeoValidation.geo_SelectedTree, 'with values', paramsForGeoValidation.values.values[paramsForGeoValidation.geo_SelectedTree]);

        if((paramsForGeoValidation.tab_active_geo_item!=null)&&(typeof paramsForGeoValidation.tab_active_geo_item != 'undefined')) {
            
            if (typeof paramsForGeoValidation.values.values[paramsForGeoValidation.geo_SelectedTree] != 'undefined')
                if (paramsForGeoValidation.values.values[paramsForGeoValidation.geo_SelectedTree].length < 1) listTypeError = true;
            /*
            //if (newValues.length < 1) listTypeError = true; // DA QUA
            //console.log('the value(s) I want is', newValues, 'from', codelist);
            switch (paramsForGeoValidation.tab_active_geo_item){
                case paramsForGeoValidation.filter_items_tabItem_first:
                    newValues = values.values[paramsForGeoValidation.filter_items_item_first];
                    if((newValues!=null)&&(typeof newValues!="undefined")&&(newValues.length>0)){
                        codelist = s.choices_code.iso3;
                        listType = [];
                        listType.push(s.choices_code.total);
                        listType.push(s.choices_code.list);
                        newValues = this._geoSelector_valuesUpdate(values.values, newValues, toDelete, codelist, listType);
                    }
                    break;
                case paramsForGeoValidation.filter_items_tabItem_second:
                    newValues = values.values[paramsForGeoValidation.geoCodelistSelector];
                    if((newValues!=null)&&(typeof newValues!="undefined")&&(newValues.length>0)){
                        codelist = this._geoSelector_getCodelist(values.values[paramsForGeoValidation.filter_items_codelistItem_tabItem_second], paramsForGeoValidation.filter_items_codelistItem_tabItem_second, regionFilterItem, specialGroupFilterItem)
                        listType = this._geoSelector_getListType(values.values[paramsForGeoValidation.filter_items_listTypetItem_tabItem_second], paramsForGeoValidation.filter_items_listTypetItem_tabItem_second, checkboxRegionItem, checkboxSpecialGroupItem);
                        // Removal of "total/list"  checkboxes

                        // if(listType.length<=0){
                        //     newValues = '';
                        //     listTypeError = true;
                        // }
                        // else{
                        //     newValues = this._geoSelector_valuesUpdate(values.values, newValues, toDelete, codelist, listType);
                        // }
                        //
                        newValues = this._geoSelector_valuesUpdate(values.values, newValues, toDelete, codelist, listType);
                    }
                    break;
                case paramsForGeoValidation.filter_items_tabItem_third:
                    newValues = values.values[paramsForGeoValidation.geoCodelistSelector];
                    if((newValues!=null)&&(typeof newValues!="undefined")&&(newValues.length>0)){
                        codelist = this._geoSelector_getCodelist(values.values[paramsForGeoValidation.filter_items_codelistItem_tabItem_third], paramsForGeoValidation.filter_items_codelistItem_tabItem_third, regionFilterItem, specialGroupFilterItem)
                        listType = this._geoSelector_getListType(values.values[paramsForGeoValidation.filter_items_listTypetItem_tabItem_third], paramsForGeoValidation.filter_items_listTypetItem_tabItem_third, checkboxRegionItem, checkboxSpecialGroupItem);
                        if(listType.length<=0){
                            newValues = '';
                            listTypeError = true;
                        }
                        else{
                            newValues = this._geoSelector_valuesUpdate(values.values, newValues, toDelete, codelist, listType);
                        }
                    }
                    break;
            }
            */

        }

        //console.log('we will say that listTypeError is ', listTypeError)

        var updatedValues = {};
        updatedValues.values = this._geoSelector_valuesUpdate(values.values, newValues, toDelete, codelist, listType, checkboxRegionItem);
        updatedValues.listType = listType;
        updatedValues.listTypeError = listTypeError;
        updatedValues.codelist = codelist;

        console.log('updval', updatedValues);

        return updatedValues;
    }

    //Geographic Codelist
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
                    case "5":
                        codelist = s.choices_code.cgrfa;
                        break;
                    case "6":
                        codelist = s.choices_code.itpgrfa;
                        break;
                }
                break;
            case specialGroupItem:
                switch (code){
                    case "1":
                        codelist = s.choices_code.fao;
                        break;
                    case "2":
                        codelist = s.choices_code.cgrfa;
                        break;
                    case "3":
                        codelist = s.choices_code.itpgrfa;
                        break;
                }
                break;
        }

        return codelist;
    }

    //List Type Item
    IndicatorCommonUtils.prototype._geoSelector_getListType = function (radioValue, type, checkboxRegionItem, checkboxSpecialGroupItem) {

        var listType= [];
        switch (type){
            case checkboxRegionItem:
            case checkboxSpecialGroupItem:
                if (_.contains(radioValue,"1")) listType.push(s.choices_code.total);
                if (_.contains(radioValue,"2")) listType.push(s.choices_code.list);

                break;
        }

        return listType;

    }

    //To Update the selection done in the geo selector
    IndicatorCommonUtils.prototype._geoSelector_valuesUpdate = function (values, newValues, toDelete, codelist, listType, checkboxRegionItem) {

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