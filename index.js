'use strict';

const axios = require('axios');
const btoa = function (str) {
    return Buffer.from(str).toString('base64');
}

module.exports = class ZapsDB {
    constructor(config) {
        var credentials = btoa(`${config.authkey}:${config.authsecret}`);
        var basicAuth = 'Basic ' + credentials;
        this.zapsurl = config.url;
        this.header_param = {
            headers: {
                Authorization: basicAuth,
                Application: (config.app?config.app:''),
                Tenant: (config.tenant?config.tenant:'')
            }
        };
    }

    createCollection(collectionname, collectionkey, description) {
        return new Promise((resolve, reject) => {
            var jsoncollection = {
                'collection_id': collectionname,
                'collection_name': description,
                'collection_key': collectionkey
            }
            axios.post(`${this.zapsurl}/database/collections`, jsoncollection, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

    removeCollection(collectionname) {
        return new Promise((resolve, reject) => {           
            axios.delete(`${this.zapsurl}/database/collections/${collectionname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

    getCollection(collectionname) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.zapsurl}/database/collections/${collectionname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

    getCollectionList(filterquery) {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');
            axios.get(`${this.zapsurl}/database/collections?${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

    createRelation(collectionname, fieldname, foreign_collection, foreign_key) {
        return new Promise((resolve, reject) => {
            var jsonrelation = {
                'fieldname': fieldname,
                'foreign_collection': foreign_collection,
                'foreign_key': foreign_key
            }
            axios.post(`${this.zapsurl}/database/collections/${collectionname}/relations`, jsonrelation, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

    removeRelation(collectionname, relationname) {
        return new Promise((resolve, reject) => {           
            axios.delete(`${this.zapsurl}/database/collections/${collectionname}/relations/${relationname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

    getRelation(collectionname, relationname) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.zapsurl}/database/collections/${collectionname}/relations/${relationname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

    getRelationList(collectionname) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.zapsurl}/database/collections/${collectionname}/relations`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }


    insertOne(collectionname, jsondata) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.zapsurl}/database/documents/${collectionname}`, jsondata, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

    updateOne(collectionname, key, setjsondata, unsetjsondata) {
        return new Promise((resolve, reject) => {
            var jsondata = {};
            if (setjsondata)
                jsondata['set'] = setjsondata;
            if (unsetjsondata)
                jsondata['set'] = unsetjsondata;

            axios.put(`${this.zapsurl}/database/documents/${collectionname}/${key}`, jsondata, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }


    updateMany(collectionname, filterquery, setjsondata, unsetjsondata) {
        return new Promise((resolve, reject) => {
            var jsondata = {};
            if (setjsondata)
                jsondata['set'] = setjsondata;
            if (unsetjsondata)
                jsondata['set'] = unsetjsondata;

            var _filterquery = (filterquery ? `${filterquery}` : '');

            axios.put(`${this.zapsurl}/database/documents/${collectionname}?${_filterquery}`, jsondata, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

    deleteOne(collectionname, key) {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.zapsurl}/database/documents/${collectionname}/${key}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }


    deleteMany(collectionname, filterquery) {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');
            axios.delete(`${this.zapsurl}/database/documents/${collectionname}?${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

    getOne(collectionname, collectionkey, lookupkeys) {
        return new Promise((resolve, reject) => {
            var _lookupkeys = (lookupkeys ? `?lookup=${lookupkeys}` : '');
            console.log('Lookup Keys ', _lookupkeys)
            axios.get(`${this.zapsurl}/database/documents/${collectionname}/${collectionkey}${_lookupkeys}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }


    getMany(collectionname, filterquery) {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');
            axios.get(`${this.zapsurl}/database/documents/${collectionname}?${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

    getAggregation(collectionname, aggquery, filterquery) {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');

            axios.get(`${this.zapsurl}/database/documents/${collectionname}?agg=${ JSON.stringify(aggquery)}&${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response.data);
                });
        });
    }

}