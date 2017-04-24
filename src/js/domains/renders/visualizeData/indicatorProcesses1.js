define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../../config/config",
    "../../../../config/errors",
    "../../../../config/events",
    "../../../../config/domains/config",
    "../../../../nls/labels"
], function ($, log, _, C, ERR, EVT, DM, labels) {

    'use strict';

    var defaultOptions = {};

    var s = {
        na : 'Na',

        geo_property : 'GEO',

        geo_filter : {
            "iso3": {
                "codes": [
                    {
                        "uid": "ISO3",
                        "codes": ''
                    }
                ]
            },
            "fao": {
                "codes": [
                    {
                        "uid": "wiews_fao_region",
                        "codes": ''
                    }
                ]
            },
            "m49": {
                "codes": [
                    {
                        "uid": "wiews_m49_regions",
                        "codes": ''
                    }
                ]
            },
            "sdg": {
                "codes": [
                    {
                        "uid": "sdg_region",
                        "codes": ''
                    }
                ]
            },
            "mdg": {
                "codes": [
                    {
                        "uid": "mdg_region",
                        "codes": ''
                    }
                ]
            },
            "cgrfa": {
                "codes": [
                    {
                        "uid": "wiews_cgrfa",
                        "codes": ''
                    }
                ]
            },
            "itpgrfa": {
                "codes": [
                    {
                        "uid": "wiews_itpgrfa",
                        "codes": ''
                    }
                ]
            }
        },

        choices_code : {
            total : 'total',
            list : 'list',
            iso3 : 'iso3',
            fao : 'fao',
            m49 : 'm49',
            sdg : 'sdg',
            mdg : 'mdg',
            cgrfa : 'cgrfa',
            itpgrfa : 'itpgrfa',
            position : {
                regions : {
                    1 : 'wiews_fao_region',
                    2 : 'wiews_m49_regions',
                    3 : 'sdg_region',
                    4 : 'mdg_region'
                },
                specialGroups : {
                    1 : 'wiews_cgrfa',
                    2 : 'wiews_itpgrfa'
                }
            }
        },

        buttonMsg : {
            button_1 : "vd_filter_button_1_msg",
            button_1_list : "vd_filter_button_1_list_msg"
        },

        error_type : {
            list : 'list'
        },

        vd_tab_active : {
            geo_item : ''
        },

        filter_items : {
            item_1 : "vd_filter_item_1",
            item_2 : "vd_filter_item_2",
            item_3 : "vd_filter_item_3",
            item_4 : "vd_filter_item_4",
            item_5 : "vd_filter_item_5",
            item_6 : "vd_filter_item_6",
            item_7 : "vd_filter_item_7",
            item_8 : "vd_filter_item_8",
            item_9 : "vd_filter_item_9",
            tabItem_1 : "vd_filter_item_tab_1",
            tabItem_4 : "vd_filter_item_tab_4",
            tabItem_7 : "vd_filter_item_tab_7"
        },

        dashboard_items : {
            item_1 : "vd_dashboard_item_1",
            item_2 : "vd_dashboard_item_2",
            item_3 : "vd_dashboard_item_3",
            item_4 : "vd_dashboard_item_4"
        },

        filterDivMsg1 : '',
        filterDivMsg1_text : ''
    }

    function IndicatorProcesses1(o) {

        var self = this;

        $.extend(true, this, defaultOptions, o);
        this._initVariables();

        return this;
    }

    IndicatorProcesses1.prototype._initVariables = function () {

        s.vd_tab_active.geo_item = s.filter_items.tabItem_1;
        s.filterDivMsg1 = this.filterDivMsg1;

    };

    IndicatorProcesses1.prototype._filterSelectionValidation = function (values, params) {

        var valid = false, newValues = '', textMsg = '';

        if ((values != null) && (typeof values != 'undefined') && (s.filterDivMsg1 != null) && (typeof s.filterDivMsg1 != 'undefined') && (values.values != null) && (typeof values.values != 'undefined')) {

            //The geo element has been checked and updated
            newValues = this._geoItemSelectionValidation(values);

            if((newValues!= null) && (typeof newValues!= 'undefined'))
            {
                for(var key in newValues) {
                    if(key== s.geo_property)
                    {
                        valid = true;
                    }
                    else if((newValues[key] != null) && (typeof newValues[key] != 'undefined') && (newValues[key].length>0))
                    {
                        valid = true;
                    }
                    else{
                        valid = false;
                        break;
                    }
                }
            }
        }

        if(!valid){
            if(s.filterDivMsg1_text == s.error_type.list){
                textMsg = labels[params.lang][s.buttonMsg.button_1_list];
            }
            else{
                textMsg = labels[params.lang][s.buttonMsg.button_1];
            }

            s.filterDivMsg1.html(textMsg)
            s.filterDivMsg1.show();
        }

        if(!valid){
            newValues = '';
        }
        else{
            console.log("true")
        }

        return newValues;
    }

    IndicatorProcesses1.prototype._geoItemSelectionValidation = function (values) {
        s.filterDivMsg1_text = '';
        var newValues = '', codelist = '', listType = '';
        var toDelete = [s.filter_items.item_1, s.filter_items.item_2, s.filter_items.item_3, s.filter_items.item_4, s.filter_items.item_5, s.filter_items.item_6, s.filter_items.item_7];
        if((s.vd_tab_active.geo_item!=null)&&(typeof s.vd_tab_active.geo_item != 'undefined')){
            switch (s.vd_tab_active.geo_item){
                case s.filter_items.tabItem_1:
                    newValues = values.values[s.filter_items.item_1];
                    if((newValues!=null)&&(typeof newValues!="undefined")&&(newValues.length>0)){
                        codelist = s.choices_code.iso3;
                        listType = [];
                        listType.push(s.choices_code.total);
                        listType.push(s.choices_code.list)
                        newValues = this._valuesUpdate(values.values, newValues, toDelete, codelist, listType);
                    }
                    break;
                case s.filter_items.tabItem_4:
                    newValues = values.values[s.filter_items.item_4];
                    if((newValues!=null)&&(typeof newValues!="undefined")&&(newValues.length>0)){
                        codelist = this._getCodelist(values.values[s.filter_items.item_2], s.filter_items.item_2);
                        listType = this._getListType(values.values[s.filter_items.item_3], s.filter_items.item_3);
                        if(listType.length<=0){
                            newValues = '';
                            s.filterDivMsg1_text = s.error_type.list;
                        }
                        else{
                            newValues = this._valuesUpdate(values.values, newValues, toDelete, codelist, listType);
                        }
                    }
                    break;
                case s.filter_items.tabItem_7:
                    newValues = values.values[s.filter_items.item_7];
                    if((newValues!=null)&&(typeof newValues!="undefined")&&(newValues.length>0)){
                        codelist = this._getCodelist(values.values[s.filter_items.item_5], s.filter_items.item_5);
                        listType = this._getListType(values.values[s.filter_items.item_6], s.filter_items.item_6);
                        if(listType.length<=0){
                            newValues = '';
                            s.filterDivMsg1_text = s.error_type.list;
                        }
                        else{
                            newValues = this._valuesUpdate(values.values, newValues, toDelete, codelist, listType);
                        }
                    }
                    break;
            }
        }

        return newValues;
    }

    IndicatorProcesses1.prototype._getCodelist = function (listValues, type) {

        var codelist= '';
        var code = listValues[Object.keys(listValues)[0]];
        switch (type){
            case s.filter_items.item_2:
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
            case s.filter_items.item_5:
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

    IndicatorProcesses1.prototype._getListType = function (radioValue, type) {

        var listType= [];
        var code = radioValue[Object.keys(radioValue)[0]];
        switch (type){
            case s.filter_items.item_3:
            case s.filter_items.item_6:
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

    IndicatorProcesses1.prototype._selectionValidation = function (listValues, radioValues) {
        var values = {};

        if((listValues!=null)&&(typeof listValues!="undefined")&&(listValues.length>0)){

            values = listValues;
            // if((radioValues!=null)&&(typeof radioValues!="undefined")){
            //     values[radioValues[0]] = listValues;
            // }
            // else{
            //     values[s.na] = listValues;
            // }
        }
        return values;
    }

    IndicatorProcesses1.prototype._valuesUpdate = function (values, newValues, toDelete, codelist, listType) {

        toDelete.forEach(function (item) {
            delete values[item];
        });

        values[s.geo_property] = {codelist : codelist, listType: listType, values : newValues};

        return values;
    }

    //In this way this action is indipendent by the number of items in the configuration
    //Test it removing some items in the configuration
    IndicatorProcesses1.prototype.onClickButton = function (dashboardConfig, values, params) {

        var newDashboardConfig =null;
        var newValues = this._filterSelectionValidation(values, params);
        if((newValues!= null)&&(typeof newValues != 'undefined')&&(!$.isEmptyObject(newValues)))
        {
            var self = this;
            newDashboardConfig ={};
            $.extend(true, newDashboardConfig, dashboardConfig);

            if((dashboardConfig!=null)&&(typeof dashboardConfig != 'undefined')){
                var itemsArray = dashboardConfig.items;
                var itemCount = 1;
                itemsArray.forEach(function (item) {

                    if ((item != null) && (typeof item != 'undefined')) {
                        newDashboardConfig = self._element_configuration_update(newDashboardConfig, item.id, newValues, itemCount-1);
                    }
                    itemCount++;
                });
            }
        }

        return newDashboardConfig;
    };

    IndicatorProcesses1.prototype.bindEventListener = function () {
        var self = this;
        var anchor;
        $( 'a[data-toggle="tab"]' ).on( 'shown.bs.tab', function( evt ) {

            // Read the a href of the anchor that was clicked
			anchor = $( evt.target ).attr( 'href' );
            // Trim the leading '#' from the href attribute
            anchor = anchor.substr( 1, anchor.length );
            if((anchor!=null)&&(typeof anchor!='undefined')){
                switch (anchor){
                    case s.filter_items.tabItem_1:
                    case s.filter_items.tabItem_4:
                    case s.filter_items.tabItem_7:
                        s.vd_tab_active.geo_item = anchor;
                        break;
                }
                if((s.filterDivMsg1!=null)&&(typeof s.filterDivMsg1!='undefined')){
                    s.filterDivMsg1.html('');
                    s.filterDivMsg1.hide();
                }
            }
        });
    }

    IndicatorProcesses1.prototype.onSelectFilter = function (hostParam, filterResponse, commonParam) {
        var filterDivMsg1 = hostParam.filterDivMsg_1;
        if((filterDivMsg1 != null) && (typeof filterDivMsg1 != 'undefined'))
        {
            filterDivMsg1.html('')
            filterDivMsg1.hide()

            //Refresh the geographical selector
            console.log(filterResponse)
            if((filterResponse!=null)&&(typeof filterResponse!='undefined')){
                var selectorId = filterResponse.id;
                if((selectorId!=null)&&(typeof selectorId!='undefined')){
                    switch (selectorId){
                        case s.filter_items.item_2 :
                            var value = filterResponse.values[0];
                            if((value!=null)&&(typeof value!='undefined')){
                                var codelist = s.choices_code.position.regions[value];
                                console.log(value, codelist)
                                commonParam.codelist = codelist;
                                this.geoCodelistSelector = s.filter_items.item_4;
                                this._loadCodelist(commonParam).then(
                                    _.bind(this._loadCodelistSuccess, this)
                                );
                            }
                            break;
                        case s.filter_items.item_5 :
                            var value = filterResponse.values[0];
                            if((value!=null)&&(typeof value!='undefined')){
                                var codelist = s.choices_code.position.specialGroups[value];
                                console.log(value, codelist)
                                commonParam.codelist = codelist;
                                this.geoCodelistSelector = s.filter_items.item_7;
                                this._loadCodelist(commonParam).then(
                                    _.bind(this._loadCodelistSuccess, this)
                                );
                            }
                            break;
                    }
                }
            }

        }
        else{
           return false;
        }

        return true;
    }

    IndicatorProcesses1.prototype._loadCodelist = function (commonParam) {
        return commonParam.bridge.getCodeList({serviceProvider:"http://fenix.fao.org/", codeListService:"d3s/msd/codes/filter/", type:"POST", body: {"uid": commonParam.codelist}});
        // return commonParam.bridge.getCodeList({serviceProvider:"http://fenix.fao.org/", codeListService:"d3s/msd/codes/filter/", type:"POST", body: {"uid":"wiews_m49_regions", "level" : 1, "levels": 1}});
    }

    IndicatorProcesses1.prototype._buildTreeModelFromCodelist = function (fxResource, parent, cl) {

        // console.log(JSON.stringfy(fxResource))
        //console.log(fxResource)
        var data = [],
            selector = this;
            // selectorConfig = selector.selector || {},
            // blacklist = selectorConfig.blacklist || [],
            // bl = blacklist.map(function (item) {
            //     return item.toString()
            // });

        _.each(fxResource, _.bind(function (item) {


            data.push({
                id: item.code,
                text: item.title[selector.lang] || item.title["EN"],
                parent: parent || '#'
            });


            if (Array.isArray(item.children) && item.children.length > 0) {
                data = _.union(data, this._buildTreeModelFromCodelist(item.children, item.code, cl));
            }

        }, this));

        //console.log(data);
        return data;
    };


    IndicatorProcesses1.prototype._loadCodelistSuccess = function (resource) {
        console.log("SUCCESS")
        console.log(resource)

        var keyTest = s.filter_items.item_4;
        var sources = {};

        var dataX = this._buildTreeModelFromCodelist(resource);
        console.log(dataX);
        dataX = dataX.sort(
           function (a, b) {
                if (a.text < b.text) return -1;
                if (a.text > b.text) return 1;
                return 0;
            });
        sources[this.geoCodelistSelector] = dataX;
        //sources[keyTest] = dataX;
       // sources[keyTest] = resource;
       //  sources[keyTest] = [
       //      {value: "selector_1", label: "Item 1"},
       //      {value: "selector_11", label: "Item 11", parent: "selector_1"},
       //      {value: "selector_2", label: "Item 2"},
       //      {value: "selector_22", label: "Item 22", parent: "selector_2"},
       //  ];

        //sources[keyTest] = [{"id":"1","text":"World343434","parent":"#"},{"id":"21","text":"Northern America","parent":"1"},{"id":"202","text":"Sub-Saharan Africa","parent":"1"},{"id":"17","text":"Middle Africa","parent":"202"},{"id":"18","text":"Southern Africa","parent":"202"},{"id":"14","text":"Eastern Africa","parent":"202"},{"id":"11","text":"Western Africa","parent":"202"},{"id":"150","text":"Europe","parent":"1"},{"id":"151","text":"Eastern Europe","parent":"150"},{"id":"39","text":"Southern Europe","parent":"150"},{"id":"155","text":"Western Europe","parent":"150"},{"id":"154","text":"Northern Europe","parent":"150"},{"id":"419","text":"Latin America and the Caribbean","parent":"1"},{"id":"5","text":"South America","parent":"419"},{"id":"13","text":"Central America","parent":"419"},{"id":"29","text":"Caribbean","parent":"419"},{"id":"15","text":"Northern Africa","parent":"1"},{"id":"9","text":"Oceania","parent":"1"},{"id":"57","text":"Micronesia","parent":"9"},{"id":"53","text":"Australia and New Zealand","parent":"9"},{"id":"54","text":"Melanesia","parent":"9"},{"id":"61","text":"Polynesia","parent":"9"},{"id":"142","text":"Asia","parent":"1"},{"id":"143","text":"Central Asia","parent":"142"},{"id":"145","text":"Western Asia","parent":"142"},{"id":"30","text":"Eastern Asia","parent":"142"},{"id":"35","text":"South-eastern Asia","parent":"142"},{"id":"34","text":"Southern Asia","parent":"142"}];
        this.filter.setSources(sources);
        // sources[keyTest] = resource;
        // this.filter.setDomain(sources);

        // for(var i=0; i<resource.length; i++){
        //     //
        //     //         var policy_type_code = resource[i].code;
        //     //         var policy_type_name = resource[i].title["EN"];
        //     //
        //     //         switch(policy_type_code) {
        //     //             case s.custom_code.biofuel_targets.code:
        //     //                 s.custom_code.biofuel_targets.name = policy_type_name;
        //     //                 break;
        //     //         }
        //     //     }
    }

    IndicatorProcesses1.prototype._loadCodelistError = function () {
        console.log("ERROR")

    }

    IndicatorProcesses1.prototype.updateVariables = function (obj) {

        this.filter = obj.filter;
    }


    IndicatorProcesses1.prototype._element_configuration_update = function (dashboardConfig, element, values, itemCount) {

        switch(element){
            case s.dashboard_items.item_1:
                return this._element1_configuration_update(dashboardConfig, values, itemCount);
                break;
            case s.dashboard_items.item_2:
                return this._element2_configuration_update(dashboardConfig, values, itemCount);
                break;
            case s.dashboard_items.item_3:
                return this._element3_configuration_update(dashboardConfig, values, itemCount);
                break;
            case s.dashboard_items.item_4:
                return this._element4_configuration_update(dashboardConfig, values, itemCount);
                break;
        }
    };

    IndicatorProcesses1.prototype._element1_configuration_update = function (dashboardConfig, values, itemCount) {

        //Map
        var newDashboardConfig = '';
        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            var codelist = values[s.geo_property].codelist;
            var listType = values[s.geo_property].listType;

            dashboardConfig.items[itemCount].postProcess[0].parameters.filter = {};
            if($.inArray(s.choices_code.total, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = false;
            }
            if($.inArray(s.choices_code.list, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = false;
            }
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist] = s.geo_filter[codelist];
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist].codes[0].codes = values[s.geo_property].values;
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values[s.filter_items.item_9];
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["genus"].codes[0].codes = values[s.filter_items.item_8];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    IndicatorProcesses1.prototype._element2_configuration_update = function (dashboardConfig, values, itemCount) {

        //First Chart
        var newDashboardConfig = '';

        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            var codelist = values[s.geo_property].codelist;
            var listType = values[s.geo_property].listType;

            dashboardConfig.items[itemCount].postProcess[0].parameters.filter = {};
            if($.inArray(s.choices_code.total, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = false;
            }
            if($.inArray(s.choices_code.list, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = false;
            }
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist] = s.geo_filter[codelist];
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist].codes[0].codes = values[s.geo_property].values;
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values[s.filter_items.item_9];
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["genus"].codes[0].codes = values[s.filter_items.item_8];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    IndicatorProcesses1.prototype._element3_configuration_update = function (dashboardConfig, values, itemCount) {

        //Second Chart
        var newDashboardConfig = '';

        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            var codelist = values[s.geo_property].codelist;
            var listType = values[s.geo_property].listType;

            dashboardConfig.items[itemCount].postProcess[0].parameters.filter = {};
            if($.inArray(s.choices_code.total, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = false;
            }
            if($.inArray(s.choices_code.list, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = false;
            }
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist] = s.geo_filter[codelist];
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist].codes[0].codes = values[s.geo_property].values;
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values[s.filter_items.item_9];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    IndicatorProcesses1.prototype._element4_configuration_update = function (dashboardConfig, values, itemCount) {

        //Third Chart
        var newDashboardConfig = '';

        if((dashboardConfig)&&(dashboardConfig.items[itemCount].postProcess)){
            //newDashboardConfig = dashboardConfig.items[0].postProcess
            var codelist = values[s.geo_property].codelist;
            var listType = values[s.geo_property].listType;

            dashboardConfig.items[itemCount].postProcess[0].parameters.filter = {};
            if($.inArray(s.choices_code.total, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.total = false;
            }
            if($.inArray(s.choices_code.list, listType )!=-1)
            {
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = true;
            }
            else{
                dashboardConfig.items[itemCount].postProcess[0].parameters.list = false;
            }
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist] = s.geo_filter[codelist];
            dashboardConfig.items[itemCount].postProcess[0].parameters.filter[codelist].codes[0].codes = values[s.geo_property].values;
            dashboardConfig.items[itemCount].postProcess[2].parameters.rows["iteration"].codes[0].codes = values[s.filter_items.item_9];
            newDashboardConfig = dashboardConfig;
        }

        return newDashboardConfig;
    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    IndicatorProcesses1.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    IndicatorProcesses1.prototype._trigger = function (channel) {

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

    return IndicatorProcesses1;

});