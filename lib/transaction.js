'use strict';

const axios = require('axios');

module.exports = class Transaction {

    startTransaction() {
        return new Promise((resolve, reject) => {
            var _headerparam = this.header_param;
            axios.post(`https://database.api${this.stage}.zapscloud.com/transactions`, {}, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }
    

    commitTransaction(zapstxn) {
        return new Promise((resolve, reject) => {
            axios.post(`https://database.api${this.stage}.zapscloud.com/transactions/${zapstxn}/commit`, {}, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    rollbackTransaction(zapstxn) {
        return new Promise((resolve, reject) => {
            axios.post(`https://database.api${this.stage}.zapscloud.com/transactions/${zapstxn}/rollback`, {}, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }
}