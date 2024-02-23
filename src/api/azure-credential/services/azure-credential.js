'use strict';

/**
 * azure-credential service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::azure-credential.azure-credential');
