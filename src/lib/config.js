var rabbitmq = require('rabbit.js');

var queue_url = 'amqp://' + process.env.RABBITMQ_PORT_5672_TCP_ADDR + ':' + process.env.RABBITMQ_PORT_5672_TCP_PORT;

/**
 * @returns {*}
 */
module.exports.getQueueContext = function() {

    'use strict';

    if (!module.exports.queue_context){
        module.exports.queue_context = rabbitmq.createContext(queue_url);
    }

    return module.exports.queue_context;
};

/**
 * should get this from an env var
 * @returns {string}
 */
module.exports.getQueueName = function () {
    return 'repo-mon.main';
};

/**
 * should get this from an env var
 * @returns {string}
 */
module.exports.getEventStoreService = function () {
    return 'http://eventstore';
};

/**
 * should get this from an env var
 * @returns {string}
 */
module.exports.getEventStorePort = function () {
    return '2113';
};


/**
 * should get this from an env var
 * @returns {string}
 */
module.exports.getEventStoreStream = function () {
    return 'repo-monitor';
};