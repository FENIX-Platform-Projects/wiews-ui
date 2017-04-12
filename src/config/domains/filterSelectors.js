define(
    function () {

        "use strict";

        return {
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
