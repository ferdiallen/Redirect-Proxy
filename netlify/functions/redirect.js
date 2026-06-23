exports.handler = async (event) => {
 const url = event.queryStringParameters?.url;
if (event.httpMethod === "OPTIONS") {
    return {

      statusCode: 200,

      headers: {

        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Headers": "Content-Type, x-cookie",

        "Access-Control-Allow-Methods": "POST, OPTIONS"

      },

      body: ""

    };

  }
    try {
        
        const cookie = event.headers['x-cookie'];
        const setBody = event.body
        const response = await fetch(
            url,
            {
                method: event.method,
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookie,
                },
                body: setBody
            }

        )
        const body = await response.json();
        return {
            statusCode: response.status,
            headers: {
                  "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(body)
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: e.toString()
        }
    }
}