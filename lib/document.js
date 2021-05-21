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

            axios.post(`https://database.api${this.stage}.zapscloud.com/documents/${collectionname}${_transactionid}`, jsondata, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    updateOne(collectionname, key, jsondata, transactionid) {
        return new Promise((resolve, reject) => {
            
            var _transactionid = (transactionid ? `?zapstxn=${transactionid}` : '');
            debug('Transaction Id', _transactionid)
        
            axios.put(`https://database.api${this.stage}.zapscloud.com/documents/${collectionname}/${key}${_transactionid}`, jsondata, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }


    updateMany(collectionname, filterquery, jsondata, transactionid) {
        return new Promise((resolve, reject) => {
            var paramquery = (transactionid)?`?zapstxn=${transactionid}`:'';
            paramquery =  ((paramquery !=='' )?`${paramquery}&`:'?')+(filterquery ? `${filterquery}` : '');

            debug('Update Many', paramquery)

            axios.put(`https://database.api${this.stage}.zapscloud.com/documents/${collectionname}${paramquery}`, jsondata, this.header_param)
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
            axios.delete(`https://database.api${this.stage}.zapscloud.com/documents/${collectionname}/${key}${_transactionid}`, this.header_param)
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

            axios.delete(`https://database.api${this.stage}.zapscloud.com/documents/${collectionname}${paramquery}`, this.header_param)
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
            debug('URL & Header values ', `https://database.api${this.stage}.zapscloud.com/documents/${collectionname}/${collectionkey}${_lookupkeys}`, this.header_param)
            axios.get(`https://database.api${this.stage}.zapscloud.com/documents/${collectionname}/${collectionkey}${_lookupkeys}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getMany(collectionname, filterquery, sortquery, skip, limit) {
        return new Promise((resolve, reject) => {
            var queryparam = (filterquery ? `?filter=${filterquery}` : '');
            queryparam = (sortquery ? (queryparam!=''?`${queryparam}&`:'?')+`sort=${sortquery}` : queryparam);
            queryparam = (skip ? (queryparam!=''?`${queryparam}&`:'?')+`skip=${skip}` : queryparam);
            queryparam = (limit ? (queryparam!=''?`${queryparam}&`:'?')+`limit=${limit}` : queryparam);


            debug('Filter Query ', queryparam, `https://database.api${this.stage}.zapscloud.com/documents/${collectionname}${queryparam}`)
            axios.get(`https://database.api${this.stage}.zapscloud.com/documents/${collectionname}${queryparam}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getAggregation(collectionname, filterquery, aggquery, sortquery, skip, limit) {
        return new Promise((resolve, reject) => {
            var queryparam = (filterquery ? `?filter=${filterquery}` : "");
            queryparam = (aggquery ? (queryparam!=''?`${queryparam}&`:'?')+`aggregate=${aggquery}` : queryparam);
            queryparam = (sortquery ? (queryparam!=''?`${queryparam}&`:'?')+`sort=${sortquery}` : queryparam);
            queryparam = (skip ? (queryparam!=''?`${queryparam}&`:'?')+`skip=${skip}` : queryparam);
            queryparam = (limit ? (queryparam!=''?`${queryparam}&`:'?')+`limit=${limit}` : queryparam);

            debug('Filter Agg Query ',queryparam)

            axios.get(`https://database.api${this.stage}.zapscloud.com/documents/${collectionname}${queryparam}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }
}