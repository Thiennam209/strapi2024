'use strict';

/**
 * trigger-from-unity service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::trigger-from-unity.trigger-from-unity');
