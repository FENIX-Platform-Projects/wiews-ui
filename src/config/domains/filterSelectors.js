define(
    function () {

        "use strict";

        return {
            sortable : {

                //className : 'col-xs-4',

                selector : {
                    id : 'sortable',
                    source :[
                        { value: 'true', label : 'Disable', parent : 'group1'},
                        { value: 'no', label : 'NU' , parent : 'group2'},
                        { value: 'nos', label : 'NU' , parent : 'group3'}
                    ],
                    config : {
                        groups: {
                            group1: 'Group 1',
                            group2: 'Group 2',
                            group3: 'Group 3'
                        },
                        itemRender : function ( model ) {

                            var template = $('<div> Ciao!: ' +model.label +'</div>');

                            template.on('click', function () {
                                console.log('Hello!')
                            });


                            return template;

                        }
                    }
                }
            },

            genreDropdown :{
                selector: {
                    id: "dropdown",
                    default: '',
                    config: {
                        plugins: ['remove_button']
                    },
                    noElement: false,
                    hideSummary : true
                },
                cl: {
                    uid: "wiews_genus"
                },
                template: {
                    title: ''
                }
            },
            genreTree :{
                selector: {
                    id: "tree",
                    hideSummary : true
                },
                cl: {
                    uid: "wiews_genus"
                },
                template: {
                    title: ''
                }
            },
            locationRadio: {
                selector: {
                    id: "input",
                    type: "radio",
                    source: [
                        {value: "1", label: "Item 1"},
                        {value: "2", label: "Item 2"},
                        {value: "3", label: "Item 3"}
                    ]
                }
            },
            locationDropdown :{
                selector: {
                    id: "dropdown",
                    default: '',
                    config: {
                        plugins: ['remove_button']
                    },
                    noElement: false,
                    hideSummary : true
                },
                cl: {
                    uid: "wiews_m49",
                    level: "2",
                    levels: "1"
                },
                template: {
                    title: ''
                }
            },
            locationTree_ISO3 :{
                selector: {
                    id: "tree",
                    hideSummary : true
                },
                cl: {
                    uid: "ISO3"
                }
            },
            locationTree_m49 :{
                selector: {
                    id: "tree",
                    hideSummary : true
                },
                cl: {
                    uid: "wiews_m49_regions"
                }
            },
            locationTree_FAO :{
                selector: {
                    id: "tree",
                    hideSummary : true
                },
                cl: {
                    uid: "wiews_fao_region"
                }
            },
            periodDropdown :{
                selector: {
                    id: "dropdown",
                    default: '',
                    config: {
                        maxItems: 1
                    },
                    hideSummary : true
                },
                cl: {
                    uid: "wiews_iteration"
                },
                template: {
                    title: ''
                }
            },
            periodTree :{
                selector: {
                    id: "tree",
                    hideSummary : true
                },
                cl: {
                    uid: "wiews_iteration"
                },
                template: {
                    title: ''
                }
            }
        };

    });
