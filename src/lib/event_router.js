var Config = require('./config'),
    logger = require('./logger'),
    request = require('request'),
    uuid = require('node-uuid');

/**
 * @param sub subscribe object
 * @param pub publish object
 * @param event object
 */
module.exports.handle = function(sub, pub, event) {

    /**
     * POST event objects as json inside an array
     *
     * @type {{url: string, headers: {Content-Type: string}, body: string}}
     */
    var options = {
        url : Config.getEventStoreService() + '/streams/' + Config.getEventStoreStream(),
        headers : {
            'Content-Type': 'application/vnd.eventstore.events+json'
        },
        body : JSON.stringify([
            {
                eventType: event.name,
                eventId: uuid.v4(),
                data: event.data
            }
        ])
    };

    request.post(options, function(err, response){
        if (err) {
            logger.error(JSON.stringify(options) + ' ' + err);
        }
    });
};