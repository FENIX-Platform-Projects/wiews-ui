define([
    "jquery",
    "loglevel",
    'underscore',
    "../../../config/config",
    "../../../config/errors",
    "../../../config/events",
    "../../../config/domains/config",
    "../../../config/domains/filterSelectors",
    'fenix-ui-reports',
    "../../../nls/labels",
    "fenix-ui-bridge",
    "bootstrap-table"
], function ($, log, _, C, ERR, EVT, DM, FilterSelectors, Report, labels, Bridge, bootstrapTable) {

    'use strict';

    var defaultOptions = {};

    var s = {
        indicator_processes_renders_path : '/indicatorProcesses',

        mainTabNames : {
            visualizeData : "visualizeData",
            downloadData : "downloadData"
        },

        filter_button : {
            vd_button_1 : "vd_filter_button_1",
            vd_buttonMsg_1 : "vd_filter_button_1_msg",
            dd_button_1 : "dd_filter_button_1",
            dd_buttonMsg_1 : "dd_filter_button_1_msg"
        },

        dashboard_button : {
            export : "vd_dashboard_button_export_"
        },

        event: {
            READY : "indicator-ready",
            BUTTON_CLICK : "click",
            DASHBOARD_CONFIG : "new_dashoboard_config_ready"
        },

        filterSelectorTypes: {
            radio : 'radio',
            checkbox : 'checkbox'
        }
    }

    function IndicatorCommon(o) {

        $.extend(true, this, defaultOptions, o);
        this._initVariables();
        return this;
    }

    IndicatorCommon.prototype._initVariables = function () {

        //indicatorProperties
        var IndicatorProcessesRender = this._getIndicatorProcessesRender();
        var filter_btnMsg1Obj = '';

        if(this.mainTabName == s.mainTabNames.visualizeData){
            filter_btnMsg1Obj = this.el.find('[data-buttonMsg = "'+s.filter_button.vd_buttonMsg_1+'"]');
        }
        else{
            filter_btnMsg1Obj = this.el.find('[data-buttonMsg = "'+s.filter_button.dd_buttonMsg_1+'"]');
        }

        var o = {environment: this.environment, el : this.el};
        if((filter_btnMsg1Obj!=null)&&(typeof filter_btnMsg1Obj!='undefined')){
            o["filterDivMsg1"] = filter_btnMsg1Obj;
        }

        this.indicatorProcesses = new IndicatorProcessesRender(o);

        this.$el = $(this.el);
        // pub/sub
        this.channels = {};

        if (this.report && $.isFunction(this.report.dispose)) {
            this.report.dispose();
        }

        this.report = new Report({
            environment: this.environment,
            cache: this.cache
        });

        this.bridge = new Bridge({
            environment : this.environment
        });
    };

    //This method is called after the dashboard render
    IndicatorCommon.prototype.render = function (obj) {

        this.filter = obj.filter;
        this.dashboard_config = obj.dashboard_config;
        this.dashboard = obj.dashboard;
        this.models = obj.models;

        this.indicatorProcesses.updateVariables({filter : this.filter});

        this._bindEventListeners();
    }

    IndicatorCommon.prototype._getIndicatorProcessesRender = function () {
        return require(this._getIndicatorProcessesPath());
    };

    IndicatorCommon.prototype._getIndicatorProcessesPath = function () {
        return './'+ this.mainTabName + s.indicator_processes_renders_path + this.indicatorProperties.processType;
    };


    IndicatorCommon.prototype.indicatorSectionInit = function (dashboardConfig) {

        var indicatorSection = this.el.find('[data-section = "'+this.indicatorProperties.dashboard_category+'"]');

        if((dashboardConfig!=null)&&(typeof dashboardConfig != 'undefined')&&(dashboardConfig.items!=null)&&(typeof dashboardConfig.items != 'undefined')){
            var itemsArray = dashboardConfig.items;
            var itemCount = 1;
            itemsArray.forEach(function (item) {

                if((item.hostConfig!=null)&&(typeof item.hostConfig!='undefined')){
                    var itemContainerConfig = item.hostConfig.itemContainer;
                    if((itemContainerConfig!= null)&&(typeof itemContainerConfig!= 'undefined')){
                        //Container class setting
                        if((itemContainerConfig.class!= null)&&(typeof itemContainerConfig.class!= 'undefined')){
                            var elem = indicatorSection.find('[data-itemContainer = "vd_dashboard_item_container_'+itemCount+'"]');
                            if((elem!= null)&&(typeof elem!= 'undefined')){
                                elem.addClass(itemContainerConfig.class);
                            }
                        }
                        //Container title
                        if((itemContainerConfig.title!= null)&&(typeof itemContainerConfig.title!= 'undefined')){
                            if((itemContainerConfig.title.text!= null)&&(typeof itemContainerConfig.title.text!= 'undefined')){
                                elem = indicatorSection.find('[data-itemContainerTitle = "vd_dashboard_item_container_title_'+itemCount+'"]');
                                if((elem!= null)&&(typeof elem!= 'undefined')){
                                    elem.html(itemContainerConfig.title.text);
                                }
                            }
                        }

                        //Container subtitle
                        if((itemContainerConfig.subtitle!= null)&&(typeof itemContainerConfig.subtitle!= 'undefined')){
                            if((itemContainerConfig.subtitle.text!= null)&&(typeof itemContainerConfig.subtitle.text!= 'undefined')){
                                elem = indicatorSection.find('[data-itemContainerSubtitle = "vd_dashboard_item_container_subtitle_'+itemCount+'"]');
                                if((elem!= null)&&(typeof elem!= 'undefined')){
                                    elem.html(itemContainerConfig.subtitle.text);
                                }
                            }
                        }

                        //Container buttons
                        if((itemContainerConfig.buttons!= null)&&(typeof itemContainerConfig.buttons!= 'undefined')){
                            if((itemContainerConfig.buttons.export!= null)&&(typeof itemContainerConfig.buttons.export!= 'undefined')){
                                if((itemContainerConfig.buttons.export.show!= null)&&(typeof itemContainerConfig.buttons.export.show!= 'undefined')&&(!itemContainerConfig.buttons.export.show)){
                                    elem = indicatorSection.find('[data-button = "vd_dashboard_button_export_'+itemCount+'"]');
                                    if((elem!= null)&&(typeof elem!= 'undefined')){
                                        elem.hide();
                                    }
                                }
                            }
                        }

                        var elem = indicatorSection.find('[data-item = "vd_dashboard_item_'+itemCount+'"]');
                        if((elem!= null)&&(typeof elem!= 'undefined')){
                            //Item class setting
                            if((itemContainerConfig.itemClass!= null)&&(typeof itemContainerConfig.itemClass!= 'undefined')){
                                elem.addClass(itemContainerConfig.class);
                            }

                            //height
                            if((itemContainerConfig.height!= null)&&(typeof itemContainerConfig.height!= 'undefined')){

                                $('[data-item = "vd_dashboard_item_'+itemCount+'"]').height(itemContainerConfig.height);
                            }
                        }

                        //Footer
                        if((itemContainerConfig.footer!= null)&&(typeof itemContainerConfig.footer!= 'undefined')){
                            if((itemContainerConfig.footer.show!= null)&&(typeof itemContainerConfig.footer.show!= 'undefined')&&(!itemContainerConfig.footer.show)){
                                elem = indicatorSection.find('[data-itemContainerFooter = "vd_dashboard_item_container_footer_'+itemCount+'"]');
                                if((elem!= null)&&(typeof elem!= 'undefined')){
                                    elem.hide();
                                }
                            }
                            else{
                                //The footer has to be shown
                                if((itemContainerConfig.footer.text!= null)&&(typeof itemContainerConfig.footer.text!= 'undefined')){
                                    elem = indicatorSection.find('[data-itemContainerFooterContent = "vd_dashboard_item_container_footerContent_'+itemCount+'"]');
                                    if((elem!= null)&&(typeof elem!= 'undefined')){
                                        elem.html(itemContainerConfig.footer.text);
                                    }
                                }
                            }
                        }
                    }
                }
                itemCount++;
            })
        }
    }


    IndicatorCommon.prototype.indicatorFilterTemplateUpdate = function (filterConfigBeforeParsing) {

        if((filterConfigBeforeParsing!=null)&&(typeof filterConfigBeforeParsing != 'undefined')) {
            var itemsArray = filterConfigBeforeParsing.items;
            var itemCount = 1, selectorConfig, id, type, defaultValue, title;
            var self = this;

            itemsArray.forEach(function (item) {

                id = item.id;
                title = item.title;
                var itemElem = self.el.find('[data-tabLabel = "' + id + '_tab"]');
                if ((itemElem != null) && (typeof itemElem != 'undefined')) {
                    itemElem.html(title)
                }

            });
        }
    }

    IndicatorCommon.prototype.indicatorFilterConfigInit = function (filterConfig) {

        var newFilterConfig = {};

        if((filterConfig!=null)&&(typeof filterConfig != 'undefined')){
            var itemsArray = filterConfig.items;
            var itemCount = 1, selectorConfig, id, type, defaultValue, title, choicesTitle, codelist, maxItems, source, max;

            itemsArray.forEach(function (item) {

                id = item.id;
                type = item.type;
                defaultValue = item.default;
                title = item.title;
                choicesTitle = item.choicesTitle;
                codelist = item.clUid;
                maxItems = item.maxItems;
                max = item.max;
                source = item.source;

                selectorConfig = {};
                $.extend(true, selectorConfig, FilterSelectors[type]);

                if((selectorConfig!=null)&&(typeof selectorConfig!= 'undefined')){
                        //Setting default value
                        if((selectorConfig.selector!=null)&&(typeof selectorConfig.selector!= 'undefined')){
                            if((defaultValue!=null)&&(typeof defaultValue!= 'undefined')){
                                selectorConfig.selector.default = defaultValue;
                            }

                            if((max!=null)&&(typeof max!= 'undefined')){
                                selectorConfig.selector.max = max;
                            }

                            if((source!=null)&&(typeof source!= 'undefined')){
                                selectorConfig.selector.source = source;
                            }

                            //Setting title for radio button selector(title is an array)
                            if((selectorConfig.selector.type==s.filterSelectorTypes.radio)||(selectorConfig.selector.type==s.filterSelectorTypes.checkbox)){
                                var itemTitleCount = 1;

                                if((choicesTitle!=null)&&(typeof choicesTitle!= 'undefined')&&(choicesTitle.length>0)){
                                    selectorConfig.selector.source =[];
                                    choicesTitle.forEach(function (choicesTitleItem) {
                                        var obj = {value: itemTitleCount, label: choicesTitleItem};
                                        selectorConfig.selector.source.push(obj);
                                        itemTitleCount++;
                                    })
                                }
                            }
                        }

                        // //Setting title for all the selectors
                        // if((selectorConfig.template!=null)&&(typeof selectorConfig.template!= 'undefined')){
                        //     if((title!=null)&&(typeof title!= 'undefined')){
                        //         selectorConfig.template.title = title;
                        //     }
                        // }

                        //Setting codelist for the selector
                        if((codelist!=null)&&(typeof codelist!= 'undefined')){
                            if((selectorConfig.cl!=null)&&(typeof selectorConfig.cl!= 'undefined')){
                                selectorConfig.cl.uid = codelist;
                            }
                            else{
                                selectorConfig.cl = {uid: codelist};
                            }
                        }

                        //Max number of element to select(only for dropdown)
                        if((maxItems!=null)&&(typeof maxItems!= 'undefined')){
                            if((selectorConfig.config!=null)&&(typeof selectorConfig.config!= 'undefined')){
                                selectorConfig.config.maxItems = maxItems;
                            }
                            else{
                                selectorConfig.config = {maxItems: maxItems};
                            }
                        }

                }
                newFilterConfig[id] = selectorConfig;
                itemCount++;
            });
        }

        return newFilterConfig;
    }

    IndicatorCommon.prototype._bindEventListeners = function () {

        if(this.mainTabName == s.mainTabNames.visualizeData){
            //Visualize Data Event Listener
            this._VD_bindEventListeners();
        }
        else {
            //Download Data Event Listener
            this._DD_bindEventListeners();
        }

        this.indicatorProcesses.bindEventListener();
    };

    IndicatorCommon.prototype._VD_bindEventListeners = function () {

        var self = this;

        var filter_button_1 = this.el.find('[data-button = "'+s.filter_button.vd_button_1+'"]');
        var filter_div_msg_1 = this.el.find('[data-buttonMsg = "'+s.filter_button.vd_buttonMsg_1+'"]');

        if((filter_button_1!=null)&&(typeof filter_button_1!='undefined')&&(filter_div_msg_1!=null)&&(typeof filter_div_msg_1!='undefined')){
            filter_button_1.on(s.event.BUTTON_CLICK, _.bind(self._VD_onClick_button1, this, {lang: this.lang}));
        }

        if((this.dashboard_config!=null)&&(typeof this.dashboard_config != 'undefined')){
            var itemsArray = this.dashboard_config.items;
            if((itemsArray!=null)&&(typeof itemsArray != 'undefined')) {
                var itemCount = 1, itemId, uid, dashboard_button;

                itemsArray.forEach(function (item) {

                    if ((item != null) && (typeof item != 'undefined')) {
                        itemId = item.id;
                        uid = item.uid;

                        //Dashboard Export
                        var dashboard_button = self.el.find('[data-button = "' + s.dashboard_button.export + itemCount + '"]');

                        if (dashboard_button) {
                            dashboard_button.on(s.event.BUTTON_CLICK, _.bind(self.downloadData, self, self.models[itemId], uid));
                        }
                    }
                    itemCount++;
                });
            }
        }

        if((this.filter!=null)&&(typeof this.filter!= 'undefined')){
            this.filter.on('select', _.bind(self.onSelectFilter, self, {filterDivMsg_1: filter_div_msg_1}));
        }
    };

    IndicatorCommon.prototype._DD_bindEventListeners = function () {

        var self = this;

        var filter_button_1 = this.el.find('[data-button = "'+s.filter_button.dd_button_1+'"]');
        var filter_div_msg_1 = this.el.find('[data-buttonMsg = "'+s.filter_button.dd_buttonMsg_1+'"]');

        var indicatorDashboardSection = this.el.find('[data-dashboardSection = "'+this.indicatorProperties.dashboard_category+'"]');

        if((filter_button_1!=null)&&(typeof filter_button_1!='undefined')&&(filter_div_msg_1!=null)&&(typeof filter_div_msg_1!='undefined')){
            filter_button_1.on(s.event.BUTTON_CLICK, _.bind(self._DD_onClick_button1, this, {lang: this.lang, indicatorDashboardSection: indicatorDashboardSection}));
        }

        if((this.filter!=null)&&(typeof this.filter!= 'undefined')){
            this.filter.on('select', _.bind(self.onSelectFilter, self, {filterDivMsg_1: filter_div_msg_1}));
        }
    };

    IndicatorCommon.prototype._VD_onClick_button1 = function (param) {
        var values = this.filter.getValues();
        var newDashboardConfig = this.indicatorProcesses.onClickButton(this.dashboard_config, values, param);
        if((newDashboardConfig!= null)&&(typeof newDashboardConfig!= 'undefined')){
            this.dashboard_config = newDashboardConfig;
            if(this.mainTabName == s.mainTabNames.visualizeData){
                this._trigger(s.event.DASHBOARD_CONFIG, {indicator_properties : this.indicatorProperties, dashboardConfig : this.dashboard_config, values: values, dashboard: this.dashboard})
            }
        }
    }

    IndicatorCommon.prototype._DD_onClick_button1 = function (param) {

        console.log("_DD_onClick_button1 start ")
        var values = this.filter.getValues();
        console.log(param)
        //var table = this.indicatorProcesses.onClickButton(this.dashboard_config, values, param);

        //this._tableRender('', param);
       // this._tableRender(table, param);
        // var newDashboardConfig = this.indicatorProcesses.onClickButton(this.dashboard_config, values, param);
        // if((newDashboardConfig!= null)&&(typeof newDashboardConfig!= 'undefined')){
        //     this.dashboard_config = newDashboardConfig;
        //     if(this.mainTabName == s.mainTabNames.visualizeData){
        //         this._trigger(s.event.DASHBOARD_CONFIG, {indicator_properties : this.indicatorProperties, dashboardConfig : this.dashboard_config, values: values, dashboard: this.dashboard})
        //     }
        // }

        this._DD_getTableData(param)
    }


    IndicatorCommon.prototype._DD_getTableData = function (param) {
        var self = this;

        var process =  [
            {
                "name": "wiews_area_filter",
                "sid": [ { "uid": "wiews_region_mapping" },{ "uid": "wiews_region_countries" } ],
                "rid" : { "uid" : "area_selection" },
                "result" : false,
                "parameters": {
                    "filter" : {
                        "m49": {
                            "codes": [
                                {
                                    "uid": "wiews_m49_regions",
                                    "codes": [ "WITC","1" ]
                                }
                            ]
                        }
                    }
                }
            },

            {
                "sid": [ { "uid": "indicator20" }, { "uid": "area_selection" } ],
                "name": "filter",
                "parameters": {
                    "columns": [
                        "domain",
                        "rank",
                        "wiews_region",
                        "indicator",
                        "iteration",
                        "value",
                        "um",
                        "country",
                        "element",
                        "biologicalAccessionId",
                        "stakeholder"
                    ],
                    "rows": {
                        "iteration": {
                            "codes": [
                                {
                                    "uid": "wiews_iteration",
                                    "codes": [ "1" ]
                                }
                            ]
                        },
                        "element": {
                            "codes": [
                                {
                                    "uid": "wiews_elements",
                                    "codes": [ "ind", "nfp", "nfpa", "stk" ]
                                }
                            ]
                        },
                        "wiews_region" : {
                            "variable" : "required_countries"
                        }
                    }
                }
            },

            {
                "name":"addcolumn",
                "index" : -2,
                "parameters":{
                    "column":{
                        "dataType":"text",
                        "id":"indicator_label",
                        "title":{
                            "EN":"Indicator"
                        }
                    },
                    "value": ""
                }
            },

            {
                "name" : "select",
                "parameters" : {
                    "values" : {
                        "iteration" : null,
                        "domain" : null,
                        "element" : null,
                        "biologicalAccessionId" : null,
                        "rank" : null,
                        "country" : null,
                        "wiews_region" : null,
                        "stakeholder" : null,
                        "value" : null,
                        "um" : null,
                        "indicator" : null,
                        "indicator_label" : "case when element = 'stk' then 'Indicator (' || stakeholder || ' / ' || stakeholder_en || ')' else element_en end"
                    }
                }
            },

            {
                "name": "order",
                "parameters": {
                    "rank" : "ASC",
                    "wiews_region" : "ASC"
                }
            }
        ];

        var tableColumns = ['domain', 'wiews_region', 'indicator', 'indicator_label', 'iteration', 'value'];

        param.tableColumns = tableColumns;

        this.bridge.getProcessedResource({contentType: "application/json", body : process, params : {language : param.lang}}).then(
            _.bind(function (result) {

                console.log(result)

                var data = Array.isArray(result.data) ? result.data : [],
                    dsdColumns = Array.isArray(result.metadata.dsd.columns) ? result.metadata.dsd.columns : [],
                    source = [];

                console.log(param)
                var columnsMap = this._columnMapCreation(param, dsdColumns);
                var tableData = this._tableDataCreation(param, columnsMap, data);
                this._tableRender(tableData, param);

            }, this),
            function (r) {
                log.error(r);
            }
        )
    }

    IndicatorCommon.prototype._columnMapCreation = function (param, dsdColumns) {

        var lang = param.lang.toUpperCase();
        var tableColumns = param.tableColumns;
        var columnsMap = {};
        console.log(tableColumns)
        _.each(tableColumns, function (tableCol) {

            for(var dsdColImdex = 0; dsdColImdex< dsdColumns.length; dsdColImdex++) {
                var dsdColumnId = dsdColumns[dsdColImdex].id;
                console.log(tableCol, dsdColumnId)
                console.log(tableCol +'_'+ lang, dsdColumnId)
                if(tableCol +'_'+ lang == dsdColumnId){
                    columnsMap[tableCol+'_text'] = dsdColImdex;
                }

                if(tableCol == dsdColumnId){
                    columnsMap[tableCol+'_value'] = dsdColImdex;
                }
            };

        });

        console.log(columnsMap);
        return columnsMap;

    }

    IndicatorCommon.prototype._tableDataCreation = function (param, columnsMap, data) {
        var tableData = [];
        var tableColumns = param.tableColumns;
        for(var iData = 0; iData<data.length; iData++)
        {
            var row = [];
            for(var iTableColumns = 0; iTableColumns<tableColumns.length; iTableColumns++)
            {
                var tableCol = tableColumns[iTableColumns];
                switch (tableCol) {
                    case 'domain' :
                        row['domain'] = data[iData][columnsMap[tableCol+'_text']]
                        break;
                    case 'wiews_region' :
                        row['wiews_region'] = data[iData][columnsMap[tableCol+'_text']]
                        break;
                    case 'indicator' :
                        row['indicator'] = data[iData][columnsMap[tableCol+'_text']]
                        break;
                    case 'indicator_label' :
                        row['indicator_label' ] = data[iData][columnsMap[tableCol+'_text']]
                        break;
                    case 'iteration' :
                        row['iteration'] = data[iData][columnsMap[tableCol+'_text']]
                        break;
                    case 'value' :
                        row['value'] = data[iData][columnsMap[tableCol+'_value']]
                        break;
                }


            }

            tableData.push(row);
        }
        console.log(tableData)
        return tableData;
    }

    IndicatorCommon.prototype._tableRender = function (table, param) {
        console.log("In table render")
        var tableElem = param.indicatorDashboardSection.find('[data-table = "dd-dashboard-table"]');
        // var data = [
        //     {
        //         "Name": "bootstrap-table",
        //         "stargazers_count": "526",
        //         "forks_count": "122",
        //         "description": "An extended Bootstrap table with radio, checkbox, sort, pagination, and other added features. (supports twitter bootstrap v2 and v3) "
        //     },
        //     {
        //         "Name": "multiple-select",
        //         "stargazers_count": "288",
        //         "forks_count": "150",
        //         "description": "A jQuery plugin to select multiple elements with checkboxes :)"
        //     },
        //     {
        //         "Name": "bootstrap-show-password",
        //         "stargazers_count": "32",
        //         "forks_count": "11",
        //         "description": "Show/hide password plugin for twitter bootstrap."
        //     },
        //     {
        //         "Name": "blog",
        //         "stargazers_count": "13",
        //         "forks_count": "4",
        //         "description": "my blog"
        //     },
        //     {
        //         "Name": "scutech-redmine",
        //         "stargazers_count": "6",
        //         "forks_count": "3",
        //         "description": "Redmine notification tools for chrome extension."
        //     }
        // ];

        //console.log(mydata)
        param.indicatorDashboardSection.show();
        $('[data-table = "dd-dashboard-table"]').bootstrapTable({
            data : table
       //    $('#testTable').bootstrapTable({
               // pagination: true,
               // data: data
           //data: mydata
       });
        //param.indicatorDashboardSection.html(table);

        console.log($('#testTable'))
    }

    IndicatorCommon.prototype.onClick_button2 = function (param) {
        var values = this.filter.getValues();
        var newDashboardConfig = this.indicatorProcesses.onClickButton(this.dashboard_config, values, param);
    }

    IndicatorCommon.prototype.onSelectFilter = function (hostParam, filterResponse) {

        var commonParam = {bridge : this.bridge};
        var res = this.indicatorProcesses.onSelectFilter(hostParam, filterResponse, commonParam);
    }

    IndicatorCommon.prototype.downloadData = function (model, uid) {

        model.metadata.uid = uid;
        var payload = {
            resource: model,
            input: {
                config: {}
            },
            output: {
                config: {
                    lang: this.lang.toUpperCase()
                }
            }
        };

        this.report.export({
            format: "table",
            config: payload
        });
    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    IndicatorCommon.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    IndicatorCommon.prototype._trigger = function (channel) {

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


    return IndicatorCommon;

});