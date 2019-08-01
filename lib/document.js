'use strict';
const axios = require('axios');

module.exports = class Document {
    constructor(){        
    }

    insertOne(collectionname, jsondata, transactionid) {
        return new Promise((resolve, reject) => {
            var _transactionid = (transactionid ? `?zapstxn=${transactionid}` : '');
            console.log('Transaction Id', _transactionid)

            axios.post(`${this.zapsurl}/database/documents/${collectionname}${_transactionid}`, jsondata, this.header_param)
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
                jsondata['set'] = unsetjsondata;

            var _transactionid = (transactionid ? `?zapstxn=${transactionid}` : '');
            console.log('Transaction Id', _transactionid)
        
            axios.put(`${this.zapsurl}/database/documents/${collectionname}/${key}${_transactionid}`, jsondata, this.header_param)
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
                jsondata['set'] = unsetjsondata;

            var paramquery = (transactionid)?`?zapstxn=${transactionid}`:'';
            paramquery =  ((paramquery !=='' )?`${paramquery}&`:'?')+(filterquery ? `${filterquery}` : '');

            console.log('Update Many', paramquery)

            axios.put(`${this.zapsurl}/database/documents/${collectionname}${paramquery}`, jsondata, this.header_param)
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

            console.log('Delete one Transaction ', _transactionid)
            axios.delete(`${this.zapsurl}/database/documents/${collectionname}/${key}${_transactionid}`, this.header_param)
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

            axios.delete(`${this.zapsurl}/database/documents/${collectionname}${paramquery}`, this.header_param)
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
            console.log('Lookup Keys ', _lookupkeys)
            axios.get(`${this.zapsurl}/database/documents/${collectionname}/${collectionkey}${_lookupkeys}`, this.header_param)
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
            console.log('Filter Query ', filterquery)
            axios.get(`${this.zapsurl}/database/documents/${collectionname}?${_filterquery}`, this.header_param)
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

            axios.get(`${this.zapsurl}/database/documents/${collectionname}?agg=${ JSON.stringify(aggquery)}&${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }
}