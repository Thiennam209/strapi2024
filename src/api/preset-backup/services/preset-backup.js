'use strict';

/**
 * preset-backup service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::preset-backup.preset-backup');
