'use strict';

/**
 * preset-backup router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::preset-backup.preset-backup');
