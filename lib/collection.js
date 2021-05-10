'use strict';

const axios = require('axios');
var debug = require('debug')('zapsdb:collection')

module.exports = class Collection {
    constructor(){
    }
    createCollection(collectionname, collectionkey, description) {
        return new Promise((resolve, reject) => {
            var jsoncollection = {
                'collection_id': collectionname,
                'collection_name': description,
                'collection_key': collectionkey
            }
            axios.post(`https://database.api${this.stage}.zapscloud.com/collections`, jsoncollection, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    removeCollection(collectionname) {
        return new Promise((resolve, reject) => {           
            axios.delete(`https://database.api${this.stage}.zapscloud.com/collections/${collectionname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getCollection(collectionname) {
        return new Promise((resolve, reject) => {
            axios.get(`https://database.api${this.stage}.zapscloud.com/collections/${collectionname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getCollectionList(filterquery, sortquery, skip, limit) {
        return new Promise((resolve, reject) => {
            var queryparam = (filterquery ? `?filter=${filterquery}` : '');
            queryparam = (sortquery ? (queryparam!=''?`${queryparam}&`:'?')+`sort=${sortquery}` : queryparam);
            queryparam = (skip ? (queryparam!=''?`${queryparam}&`:'?')+`skip=${skip}` : queryparam);
            queryparam = (limit ? (queryparam!=''?`${queryparam}&`:'?')+`limit=${limit}` : queryparam);

            debug('Filter Query ',encodeURI(queryparam), `https://database.api${this.stage}.zapscloud.com/collections${encodeURI(queryparam)}`)
            axios.get(`https://database.api${this.stage}.zapscloud.com/collections${encodeURI(queryparam)}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }
}