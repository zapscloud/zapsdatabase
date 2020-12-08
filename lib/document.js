'use strict';
const axios = require('axios');
var debug = require('debug')('zapsdb:document')

module.exports = class Document {
    constructor(){        
    }

    insertOne(collectionname, jsondata, transactionid) {
        return new Promise((resolve, reject) => {
            var _transactionid = (transactionid ? `?zapstxn=${transactionid}` : '');
            debug('Transaction Id', _transactionid)

            axios.post(`https://database.${this.stage}api.zapscloud.com/documents/${collectionname}${_transactionid}`, jsondata, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    updateOne(collectionname, key, setjsondata, unsetjsondata, transactionid) {
        return new Promise((resolve, reject) => {
            var jsondata = {};
            if (setjsondata)
                jsondata['set'] = setjsondata;
            if (unsetjsondata)
                jsondata['unset'] = unsetjsondata;

            var _transactionid = (transactionid ? `?zapstxn=${transactionid}` : '');
            debug('Transaction Id', _transactionid)
        
            axios.put(`https://database.${this.stage}api.zapscloud.com/documents/${collectionname}/${key}${_transactionid}`, jsondata, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }


    updateMany(collectionname, filterquery, setjsondata, unsetjsondata, transactionid) {
        return new Promise((resolve, reject) => {
            var jsondata = {};
            if (setjsondata)
                jsondata['set'] = setjsondata;
            if (unsetjsondata)
                jsondata['unset'] = unsetjsondata;

            var paramquery = (transactionid)?`?zapstxn=${transactionid}`:'';
            paramquery =  ((paramquery !=='' )?`${paramquery}&`:'?')+(filterquery ? `${filterquery}` : '');

            debug('Update Many', paramquery)

            axios.put(`https://database.${this.stage}api.zapscloud.com/documents/${collectionname}${paramquery}`, jsondata, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    deleteOne(collectionname, key, transactionid) {
        return new Promise((resolve, reject) => {
            var _transactionid = (transactionid ? `?zapstxn=${transactionid}` : '');

            debug('Delete one Transaction ', _transactionid)
            axios.delete(`https://database.${this.stage}api.zapscloud.com/documents/${collectionname}/${key}${_transactionid}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }


    deleteMany(collectionname, filterquery, transactionid) {
        return new Promise((resolve, reject) => {

            var paramquery = (transactionid)?`?zapstxn=${transactionid}`:'';
            paramquery =  ((paramquery !=='' )?`${paramquery}&`:'?')+(filterquery ? `${filterquery}` : '');

            axios.delete(`https://database.${this.stage}api.zapscloud.com/documents/${collectionname}${paramquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getOne(collectionname, collectionkey, lookupkeys) {
        return new Promise((resolve, reject) => {
            var _lookupkeys = (lookupkeys ? `?lookup=${lookupkeys}` : '');
            debug('Lookup Keys ', _lookupkeys)
            axios.get(`https://database.${this.stage}api.zapscloud.com/documents/${collectionname}/${collectionkey}${_lookupkeys}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getMany(collectionname, filterquery) {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');
            debug('Filter Query ', filterquery)
            axios.get(`https://database.${this.stage}api.zapscloud.com/documents/${collectionname}?${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getAggregation(collectionname, aggquery, filterquery) {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');

            axios.get(`https://database.${this.stage}api.zapscloud.com/documents/${collectionname}?agg=${ JSON.stringify(aggquery)}&${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }
}