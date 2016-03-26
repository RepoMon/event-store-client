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

    var options = {
        url : Config.getEventStoreService() + '/streams/repo-monitor',
        headers : {
            'Content-Type': 'application/vnd.eventstore.events+json'
        },
        body : JSON.stringify([{
            eventType: event.name,
            eventId: uuid.v4(),
            data: event.data
        }])
    };

    //var event_store_uri = Config.getEventStoreService() + '/streams/events';
    //var data = {
    //    eventType: event.name,
    //    eventId: uuid.v4(),
    //    data: event.data,
    //    version: event.version
    //};
    //
    //var headers = {'Content-Type': 'application/vnd.eventstore.events+json'};

    request.post(options, function(err, response){
        if (err) {
            logger.error(err);
        }
    });

};