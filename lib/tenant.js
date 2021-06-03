'use strict';

const axios = require('axios');
var debug = require('debug')('zapsdb:tenant')

module.exports = class Tenant {
    constructor(){
    }
    createTenant(tenantid, tenantname, tenantregion) {
        return new Promise((resolve, reject) => {
            var jsontenant = {
                'tenant_id': tenantid,
                'tenant_name': tenantname,
                'tenant_region': tenantregion
            }
            debug('Tenent ', `https://platform.api${this.stage}.zapscloud.com/tenants`, jsontenant, this.header_param)
            axios.post(`https://platform.api${this.stage}.zapscloud.com/tenants`, jsontenant, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    removeTenant(tenantid) {
        return new Promise((resolve, reject) => {           
            axios.delete(`https://platform.api${this.stage}.zapscloud.com/tenants/${tenantid}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getTenant(tenantid) {
        return new Promise((resolve, reject) => {
            axios.get(`https://platform.api${this.stage}.zapscloud.com/tenants/${tenantid}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getTenantList(filterquery) {
        return new Promise((resolve, reject) => {

            var queryparam = (filterquery ? `?filter=${filterquery}` : '');
            queryparam = (sortquery ? (queryparam!=''?`${queryparam}&`:'?')+`sort=${sortquery}` : queryparam);
            queryparam = (skip ? (queryparam!=''?`${queryparam}&`:'?')+`skip=${skip}` : queryparam);
            queryparam = (limit ? (queryparam!=''?`${queryparam}&`:'?')+`limit=${limit}` : queryparam);

            debug('Filter Query ',encodeURI(queryparam), `https://platform.api${this.stage}.zapscloud.com/tenants${encodeURI(queryparam)}`)
            axios.get(`https://platform.api${this.stage}.zapscloud.com/tenants?${encodeURI(queryparam)}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }
}