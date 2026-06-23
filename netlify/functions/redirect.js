exports.handler = async (event) => {

    try {

        const cookie = event.headers["x-cookie"]

        const response = await fetch(

            "https://bali.dpenyet.com/edcmid-central/ksi/user0",

            {

                method: "POST",

                headers: {

                    Cookie: cookie

                },
                body: JSON.stringify({

          operationName: "profiles",

          variables: {},

          query: `query profiles {

  myUser {

    profiles {

      ...ProfileFragment

      __typename

    }

    __typename

  }

}

fragment ProfileFragment on UserConnectionNode {

  id

  givenName

  familyName

  dateOfBirth

  __typename

}`
        })
            }

        )
        const body = await response.json();
        return {
            statusCode: response.status,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: body
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: e.toString()
        }
    }
}