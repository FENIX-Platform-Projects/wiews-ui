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
            locationTree :{
                selector: {
                    id: "tree",
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
