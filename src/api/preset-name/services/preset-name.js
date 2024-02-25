'use strict';

/**
 * preset-name service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::preset-name.preset-name');
