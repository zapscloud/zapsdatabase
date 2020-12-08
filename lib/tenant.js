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
            debug('Tenent ', `https://setup.${this.stage}api.zapscloud.com/tenants`, jsontenant, this.header_param)
            axios.post(`https://setup.${this.stage}api.zapscloud.com/tenants`, jsontenant, this.header_param)
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
            axios.delete(`https://setup.${this.stage}api.zapscloud.com/tenants/${tenantid}`, this.header_param)
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
            axios.get(`https://setup.${this.stage}api.zapscloud.com/tenants/${tenantid}`, this.header_param)
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
            var _filterquery = (filterquery ? `${filterquery}` : '');
            axios.get(`https://setup.${this.stage}api.zapscloud.com/tenants?${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }
}