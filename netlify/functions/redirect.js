
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const DOMAIN_CONFIG = {
  "https://bali.dpenyet.com": {
    getHeaders: (event) => ({
      "Content-Type": event.headers["content-type"],
      "Cookie": event.headers["x-cookie"]
    })
  },
  "https://api.klasmart.id": {
    getHeaders: (event) => ({
      "Content-Type": "application/json",
      "Cookie": event.headers["x-cookie"]
    })
  },
  "https://sms-api.klasmart.id": {
    getHeaders: (event) => ({
      "Content-Type": event.headers["content-type"],
      "Xtoken": `${event.headers["xtoken"]}`
    })
  },
  "https://api.klasmart.com": {
    getHeaders: (event) => ({
      "Content-Type": "application/json",
    })
  },
  "https://whitelable.klasmart.id": {
    getHeaders: (event) => ({
      "Content-Type": "application/json",
    })
  },
   "https://api.klasmart.com": {
    getHeaders: (event) => ({
      "Content-Type": event.headers["content-type"],
    })
  },
  "https://cms.klasmart.id": {
    getHeaders: (event) => ({
      "Content-Type": event.headers["content-type"],
      "Cookie": event.headers["x-cookie"]
    })
  }
  // add more domains here
};

exports.handler = async (event) => {
 const url = event.queryStringParameters?.url;
 console.log("Fetched :",url);
if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {

        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Headers": "Content-Type, x-cookie, xtoken",

        "Access-Control-Allow-Methods": "*"

      },

      body: ""

    };

  }
  if(!url){
    return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing url parameter" })
    }
  }
  
  const matchedDomain = Object.keys(DOMAIN_CONFIG).find(
    dom => url.startsWith(dom)
  )
  if(!matchedDomain){
       return { statusCode: 403, body: JSON.stringify({ error: "URL Invalid" }) };
  }

    try {  
        const setBody = event.body
        const domainRetrieve = DOMAIN_CONFIG[matchedDomain].getHeaders(event);
        const response = await fetch(
            url,
            {
                method: event.httpMethod,
                headers: domainRetrieve,
                body: event.httpMethod !== "GET" ? setBody : undefined
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

        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, x-cookie, xtoken"
        },
        body: JSON.stringify({
            name: e.name,
            message: e.message,
            cause: e.cause?.message,
            stack: e.stack
    })
        }
    }
  
}