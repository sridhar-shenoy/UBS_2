import elasticSearch from 'elasticsearch'

var INDEX_NAME = 'new_index'

/**
 * connect to remote ES client
 * @returns {Client} - ES client
 */
export function connectToClient() {
    let secret = process.env.REACT_APP_ES_PORT;
    var client = new elasticSearch.Client({
        host: [
            {
                host: process.env.REACT_APP_ES_HOST.toString(),
                auth: process.env.REACT_APP_ES_AUTH.toString(),
                protocol: process.env.REACT_APP_ES_PROTOCOL.toString(),
                port: process.env.REACT_APP_ES_PORT
            }
        ]
    });
    return client
}

/*export async function countEntries() {
    try{
        var client = connectToClient();
        const count = await client.count({
            index: INDEX_NAME
        });
        client.close()
        return count
    }
    catch(e) {
        return 0
    }
}*/

export async function countEntries() {
    try {
        var client = connectToClient();
        const count = await client.count({
            index: INDEX_NAME,
        });
        client.close();
        return count.count
    } catch (e) {
        console.log("Count not found")
        //
        throw e
    }
}

/**
 * query the remote ES server for logs matches the substring in index from client
 * @param queryString - String - substring to be searched
 * @returns logArray - [dict] - array which store the search results of log dict
 */
export async function getRespondWithQueryString(queryString) {
    try {
        var client = connectToClient();
        const response = await client.search({
            size: 1000,
            index: INDEX_NAME,
            body: {
                query: {
                    "query_string": {
                        "query": "*" + queryString + "*"
                    }
                }
            }
        });
        client.close();
        return response.hits.hits
    } catch (e) {
        alert("No search results")
        //
        throw e
    }
}