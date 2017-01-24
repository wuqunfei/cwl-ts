/**
 * Created by majanedeljkovic on 9/6/16.
 */
declare function require(s: string);

//noinspection TypeScriptUnresolvedVariable
export = {
    schemas: {
        draft3: {
            cltSchema: require('./draft-3/CLT-schema.json'),
            wfSchema: require('./draft-3/WF-schema.json'),
            etSchema: require('./draft-3/ET-schema.json')
        },
        d2sb: {
            cltSchema: require('./d2sb/CLT-schema.json'),
            wfSchema: require('./d2sb/WF-schema.json'),
            etSchema: require('./d2sb/ET-schema.json')
        },
        v1: {
            cltSchema: require('./v1.0/CLT-schema.json'),
            wfSchema: require('./v1.0/WF-schema.json'),
            etSchema: require('./v1.0/ET-schema.json')
        }
    }
};