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
                    console.log('error', error)
                    return reject(error.response.data);
                });
        });
    }

    removeCollection(collectionname) {
        return new Promise((resolve, reject) => {
            var jsoncollection = {
                'collection_id': name,
                'collection_name': description,
                'collection_key': key
            }
            axios.delete(`${this.zapsurl}/database/collections/${collectionname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    console.log('error', error)
                    return reject(error.response.data);
                });
        });
    }

    insertOne(collectionname, jsondata) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.zapsurl}/database/${collectionname}`, jsondata, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    console.log('error', error)
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

            axios.put(`${this.zapsurl}/database/${collectionname}/${key}`, jsondata, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    console.log('error', error)
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

            axios.put(`${this.zapsurl}/database/${collectionname}?${_filterquery}`, jsondata, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    console.log('error', error)
                    return reject(error.response.data);
                });
        });
    }

    deleteOne(collectionname, key) {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.zapsurl}/database/${collectionname}/${key}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    console.log('error', error)
                    return reject(error.response.data);
                });
        });
    }


    deleteMany(collectionname, filterquery) {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');
            axios.delete(`${this.zapsurl}/database/${collectionname}?${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    console.log('error', error)
                    return reject(error.response.data);
                });
        });
    }

    getOne(collectionname, key, lazykeys) {
        return new Promise((resolve, reject) => {
            var lookupkeys = (lazykeys ? `?lazy=[${lazykeys}]` : '');
            axios.get(`${this.zapsurl}/database/${collectionname}/${key}${lookupkeys}`, this.header_param)
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
            axios.get(`${this.zapsurl}/database/${collectionname}?${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    console.log('error', error)
                    return reject(error.response.data);
                });
        });
    }

    getAggregation(collectionname, aggquery, filterquery) {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');

            axios.get(`${this.zapsurl}/database/${collectionname}?agg=${ JSON.stringify(aggquery)}&${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    console.log('error', error)
                    return reject(error.response.data);
                });
        });
    }

}