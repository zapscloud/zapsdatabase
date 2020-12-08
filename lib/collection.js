'use strict';

const axios = require('axios');

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
            axios.post(`https://database.${this.stage}api.zapscloud.com/collections`, jsoncollection, this.header_param)
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
            axios.delete(`https://database.${this.stage}api.zapscloud.com/collections/${collectionname}`, this.header_param)
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
            axios.get(`https://database.${this.stage}api.zapscloud.com/collections/${collectionname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getCollectionList(filterquery) {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');
            axios.get(`https://database.${this.stage}api.zapscloud.com/collections?${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }
}