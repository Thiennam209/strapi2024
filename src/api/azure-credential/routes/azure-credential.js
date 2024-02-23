'use strict';

/**
 * azure-credential router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::azure-credential.azure-credential');
