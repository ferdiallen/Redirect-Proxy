exports.handler = async (event) => {

    try {

        const cookie = event.headers['x-cookie'];
        const setBody = event.body
        const response = await fetch(
            "https://bali.dpenyet.com/edcmid-central/ksi/user0",
            {
                method: "POST",
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