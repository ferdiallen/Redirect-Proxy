exports.handler = async (event) => {

    try {

        const cookie = event.headers["x-cookie"]

        const response = await fetch(

            "https://your-api.com/protected-endpoint",

            {

                method: "GET",

                headers: {

                    Cookie: cookie

                }

            }

        )

        const body = await response.text()

        return {

            statusCode: response.status,

            headers: {

                "Access-Control-Allow-Origin": "*",

                "Access-Control-Allow-Headers": "*"

            },

            body

        }

    } catch (e) {

        return {

            statusCode: 500,

            body: e.toString()

        }

    }

}