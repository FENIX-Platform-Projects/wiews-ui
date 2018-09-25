define(function () {

    'use strict';

    return {
        FAO : {
            "query":{"bool":{"must_not":[{"match": {"faol1_name": "International Regional"
            }}
            ]}},
            "size": 0,
            "aggregations": {
                "result_set": {
                    "terms": {
                        "field": "iso3_country_code.aggregator",
                        "order": {"_key": "asc"},"size":300
                    },
                    "aggs": {
                        "childs_set": {
                            "terms": { "field": "fao_country_name.aggregator",
                                "order": {"_key": "asc"},"size": 300
                            }
                        }
                    }
                }
            }
        },
        CGRFA : {
            "query": {
                "match": {
                    "cgrfa": "true"
                }
            },
            "size": 0,
            "aggregations": {
                "result_set": {
                    "terms": {
                        "field": "iso3_country_code.aggregator",
                        "order": {"_key": "asc"},"size":300
                    },
                    "aggs": {
                        "childs_set": {
                            "terms": { "field": "fao_country_name.aggregator",
                                "order": {"_key": "asc"},"size": 300
                            }
                        }
                    }
                }
            }
        },
        ITPGRFA : {
            "query": {
                "match": {
                    "itpgrfa": "true"
                }
            },
            "size": 0,
            "aggregations": {
                "result_set": {
                    "terms": {
                        "field": "iso3_country_code.aggregator",
                        "order": {"_key": "asc"},"size":300
                    },
                    "aggs": {
                        "childs_set": {
                            "terms": { "field": "fao_country_name.aggregator",
                                "order": {"_key": "asc"},"size": 300
                            }
                        }
                    }
                }
            }
        },
        M49 : '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"m49l1_name":"INT REG"}}]}},"size": 0,"aggregations": {"result_set": {"terms": {"field":"m49l0_code.aggregator","order": {"_key": "asc"},"size":300},"aggs":{"childs_set": {"terms": {"field":"m49l0_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n' +
        '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"m49l1_name":"INT REG"}}]}}, "size": 0, "aggregations": {"result_set": {"terms": {"field": "m49l1_code.aggregator","order": {"_key": "asc"},"size":300},"aggs": {"childs_set":{"terms": { "field": "m49l1_name.aggregator","order":{"_key": "asc"},"size": 300}}}}}}\n' +
        '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"m49l1_name":"INT REG"}}]}}, "size": 0, "aggregations": {"result_set": {"terms":{"field": "m49l2_code.aggregator","order": {"_key": "asc"},"size":300},"aggs": {"childs_set": {"terms": { "field":"m49l2_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n',
        MDG : '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"mdg_region_name":"INT REG"}}]}},"size": 0,"aggregations": {"result_set": {"terms": {"field":"faol0_code.aggregator","order": {"_key": "asc"},"size":300},"aggs":{"childs_set": {"terms": {"field":"faol0_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n' +        '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"mdg_region_name":"INT REG"}}]}}, "size": 0, "aggregations": {"result_set": {"terms": {"field": "mdg_region_code.aggregator","order": {"_key": "asc"},"size":300},"aggs": {"childs_set":{"terms": { "field": "mdg_region_name.aggregator","order":{"_key": "asc"},"size": 300}}}}}}\n',
        SDG : '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"sdg_region_name":"INT REG"}}]}},"size": 0,"aggregations": {"result_set": {"terms": {"field":"faol0_code.aggregator","order": {"_key": "asc"},"size":300},"aggs":{"childs_set": {"terms": {"field":"faol0_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n' +
        '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"sdg_region_name":"INT REG"}}]}}, "size": 0, "aggregations": {"result_set": {"terms": {"field": "sdg_region_code.aggregator","order": {"_key": "asc"},"size":300},"aggs": {"childs_set":{"terms": { "field": "sdg_region_name.aggregator","order":{"_key": "asc"},"size": 300}}}}}}\n',
        M49_R : '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"m49l1_name":"INT REG"}}]}},"size": 0,"aggregations": {"result_set": {"terms": {"field":"m49l0_code.aggregator","order": {"_key": "asc"},"size":300},"aggs":{"childs_set": {"terms": {"field":"m49l0_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n' +
        '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"m49l1_name":"INT REG"}}]}}, "size": 0, "aggregations": {"result_set": {"terms": {"field": "m49l1_code.aggregator","order": {"_key": "asc"},"size":300},"aggs": {"childs_set":{"terms": { "field": "m49l1_name.aggregator","order":{"_key": "asc"},"size": 300}}}}}}\n' +
        '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"m49l1_name":"INT REG"}}]}}, "size": 0, "aggregations": {"result_set": {"terms":{"field": "m49l2_code.aggregator","order": {"_key": "asc"},"size":300},"aggs": {"childs_set": {"terms": { "field":"m49l2_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n',
        MDG_R : '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"mdg_region_name":"INT REG"}}]}},"size": 0,"aggregations": {"result_set": {"terms": {"field":"faol0_code.aggregator","order": {"_key": "asc"},"size":300},"aggs":{"childs_set": {"terms": {"field":"faol0_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n' +        '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"mdg_region_name":"INT REG"}}]}}, "size": 0, "aggregations": {"result_set": {"terms": {"field": "mdg_region_code.aggregator","order": {"_key": "asc"},"size":300},"aggs": {"childs_set":{"terms": { "field": "mdg_region_name.aggregator","order":{"_key": "asc"},"size": 300}}}}}}\n',
        SDG_R : '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"sdg_region_name":"INT REG"}}]}},"size": 0,"aggregations": {"result_set": {"terms": {"field":"faol0_code.aggregator","order": {"_key": "asc"},"size":300},"aggs":{"childs_set": {"terms": {"field":"faol0_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n' +
        '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"sdg_region_name":"INT REG"}}]}}, "size": 0, "aggregations": {"result_set": {"terms": {"field": "sdg_region_code.aggregator","order": {"_key": "asc"},"size":300},"aggs": {"childs_set":{"terms": { "field": "sdg_region_name.aggregator","order":{"_key": "asc"},"size": 300}}}}}}\n',
        ITPGRFA_R: '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"sdg_region_name":"INT REG"}}]}},"size": 0,"aggregations": {"result_set": {"terms": {"field":"faol0_code.aggregator","order": {"_key": "asc"},"size":300},"aggs":{"childs_set": {"terms": {"field":"faol0_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n' +
        '{}\n' +
        '{"query": {"bool": {"must": [{"match": {"itpgrfa":"true"}}]}},"size": 0,"aggregations": {"result_set": {"terms": {"field":"itpgrfa_region_code.aggregator","order": {"_key": "asc"},"size":300},"aggs":{"childs_set": {"terms": {"field":"itpgrfa_region_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n',
        CGRFA_R: '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"sdg_region_name":"INT REG"}}]}},"size": 0,"aggregations": {"result_set": {"terms": {"field":"faol0_code.aggregator","order": {"_key": "asc"},"size":300},"aggs":{"childs_set": {"terms": {"field":"faol0_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n' +
        '{}\n' +
        '{"query": {"bool": {"must": [{"match": {"cgrfa":"true"}}]}},"size": 0,"aggregations": {"result_set": {"terms": {"field":"cgrfa_region_code.aggregator","order": {"_key": "asc"},"size":300},"aggs":{"childs_set": {"terms": {"field":"cgrfa_region_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n',
        FAO_R: '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"faol2_name":"INT REG"}}]}},"size": 0,"aggregations": {"result_set": {"terms": {"field":"faol0_code.aggregator","order": {"_key": "asc"},"size":300},"aggs":{"childs_set": {"terms": {"field":"faol0_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n' +
        '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"faol2_name":"INT REG"}}]}}, "size": 0, "aggregations": {"result_set": {"terms": {"field": "faol1_code.aggregator","order": {"_key": "asc"},"size":300},"aggs": {"childs_set":{"terms": { "field": "faol1_name.aggregator","order":{"_key": "asc"},"size": 300}}}}}}\n' +
        '{}\n' +
        '{"query": {"bool": {"must_not": [{"match": {"faol2_name":"INT REG"}}]}}, "size": 0, "aggregations": {"result_set": {"terms":{"field": "faol2_code.aggregator","order": {"_key": "asc"},"size":300},"aggs": {"childs_set": {"terms": { "field":"faol2_name.aggregator","order": {"_key": "asc"},"size": 300}}}}}}\n'
    }

});