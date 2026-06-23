exports.handler = async (event) => {

    try {

        const cookie = event.headers["x-cookie"]

        const response = await fetch(

            "https://bali.dpenyet.com/edcmid-central/ksi/user0",

            {

                method: "POST",

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