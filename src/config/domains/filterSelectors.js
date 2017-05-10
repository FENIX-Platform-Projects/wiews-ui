define(
    function () {

        "use strict";

        return {
            tree :{
                selector: {
                    id: "tree",
                    hideSummary : false,
                    sort : true
                },
                cl: {
                    uid: "",
                    codes: ""
                },
                template: {
                    title: ''
                }
            },
            dropdown :{
                selector: {
                    id: "dropdown",
                    default: '',
                    config: {
                        plugins: ['remove_button']
                    },
                    noElement: false,
                    hideSummary : false
                },
                cl: {
                    uid: "wiews_genus"
                },
                template: {
                    title: ''
                }
            },
            radio: {
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
            checkbox: {
                selector: {
                    id: "input",
                    type: "checkbox",
                    source: [
                        {value: "1", label: "Item 1"},
                        {value: "2", label: "Item 2"}
                    ]
                }
            }
        };

    });
