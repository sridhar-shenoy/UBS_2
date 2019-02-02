import {connectToClient} from './SearchES'

/**
 * get all orders related by inputting log type and the log id, it is event id based as it is unique
 * First of all it will look for event id if proxy or gateway id is given
 * Secondly, it will look for all log correlated to the event id using findAllLog
 * @param logType - String - log type (proxy, event, gateway)
 * @param logId - String - id of the log
 * @returns LogArray - [dict] -array contains dict object of log
 */
export async function traceOrder(logType, logId){
    try{
        // console.log('traceOrder: ' + logType + logId)
        let eventId = logId;
        if(logType !== 'event'){
            // console.log('enter event log type')
            eventId = await findEventId(logType, logId)
            // console.log('event_id' + eventId)
        }
        return await findAllLog(eventId)
    } catch (e){
        throw e
    }
}

/**
 * get logs in dict array by inputting type and id of the log
 * @param logType - String - log type (proxy, event, gateway)
 * @param logId - String - id of the log
 * @returns LogArray - [dict] - get all logs with log id equal to the id with that type
 */
async function getTypeLog(logType, logId){
    try{
        var client = connectToClient();
        // console.log('begin query')
        let _response;
        if(typeof logId === typeof 'string'){
            _response = await client.search({
                index: 'ubs_trade_analysis',
                body: {
                    size: 1000,
                    query: {
                        "simple_query_string": {
                            "query": logId,
                            "fields": [logType + "_id"],
                            "analyze_wildcard": true,
                            "default_operator": "AND"
                        }
                    }
                }
            });
        } else if(typeof logId === typeof []){
            // console.log('logIdToString: ' + logId.toString())
            _response = await client.search({
                index: 'ubs_trade_analysis',
                body: {
                    size: 1000,
                    query: {
                        simple_query_string: {
                            query: logId.toString(),
                            fields: [logType + "_id"],
                            analyze_wildcard: true,
                            default_operator: "AND"
                        }
                    }
                }
            });
        }
        // console.log('finish query')
        client.close();
        return _response.hits.hits
    } catch (e){
        // console.log('exception')
        client.close();
        throw e
    }
}

/**
 * get the event id related to the log by inputting the type and id of the log
 * @param logType - String - log type (proxy, event, gateway)
 * @param logId - String - id of the log
 * @returns eventId - String - the event id related to the selected log
 */
async function findEventId(logType, logId){
    console.log(logType, logId);
    try {
        const response = await getTypeLog(logType, logId);
        return response.filter(log => log._source.type === 'event')[0]._source.event_id
    } catch (e) {
        throw e
    }
}

/**
 * find all the log that is related to the event id given
 * Firstly, it gets all the event logs with that eventId
 * Secondly, it
 * @param eventId - String - the id of the event log
 * @returns LogArray - [dict] - the array of the result object
 */
async function findAllLog(eventId){
    try {
        let _response = await getTypeLog('event', eventId);
        let eventArr = _response.filter(log => log._source.type === 'event');
        let logArr = eventArr;
        // console.log('eventArr: ' + eventArr.length)
        // console.log(eventArr)
        let proxyArr = [], gatewayArr = [], recurrArr = [];
        for(var i = 0; i < eventArr.length; i++){
            // console.log('i: ' + i)
            if("OrigClOrdId<41>" in eventArr[i]._source.EVENT_event_msg){
                // console.log('recursion')
                // if there is tag 41, that means there is previous trade logs in the event stream, find them using recursion
                logArr.push(await findAllLog(findEventId(eventArr[i]._source.EVENT_event_msg['OrigClOrdId<41>'])))
            } else{
                // get the id and push it to the array, wait for the query later on
                if (eventArr[i]._source['proxy_id'] !== '-1' && eventArr[i]._source['proxy_id'] !== null) {
                    proxyArr.push(eventArr[i]._source['proxy_id'])
                } else if (eventArr[i]._source['gateway_id'] !== '-1' && eventArr[i]._source['gateway_id'] !== null) {
                    gatewayArr.push(eventArr[i]._source['gateway_id'])
                }
            }
        }
        let gatewayId = await getTypeLog('gateway', gatewayArr);
        let proxyId = await getTypeLog('proxy', proxyArr);
        // remove duplicated objects
        let result = logArr.concat(proxyId).concat(gatewayId).concat(recurrArr).filter((obj, pos, arr) => {
                return arr.map(mapObj => mapObj['_id']).indexOf(obj['_id']) === pos;
            }
        );
        return result
    } catch (e) {
        throw e
    }
}