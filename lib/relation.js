'use strict';

const axios = require('axios');

module.exports = class Relation {
    constructor(){
    }
    
    createRelation(collectionname, fieldname, foreign_collection, foreign_key) {
        return new Promise((resolve, reject) => {
            var jsonrelation = {
                'fieldname': fieldname,
                'foreign_collection': foreign_collection,
                'foreign_key': foreign_key
            }
            axios.post(`https://database.api${this.stage}.zapscloud.com/collections/${collectionname}/relations`, jsonrelation, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    removeRelation(collectionname, relationname) {
        return new Promise((resolve, reject) => {           
            axios.delete(`https://database.api${this.stage}.zapscloud.com/collections/${collectionname}/relations/${relationname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getRelation(collectionname, relationname) {
        return new Promise((resolve, reject) => {
            axios.get(`https://database.api${this.stage}.zapscloud.com/collections/${collectionname}/relations/${relationname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getRelationList(collectionname) {
        return new Promise((resolve, reject) => {
            axios.get(`https://database.api${this.stage}.zapscloud.com/collections/${collectionname}/relations`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

}