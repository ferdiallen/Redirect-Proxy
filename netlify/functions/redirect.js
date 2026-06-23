exports.handler = async (event) => {

    try {

        const cookie = 'access=eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5N2I4ODFjLWEwM2EtNDk0ZC05MmQ0LTQxYjdhYzhkNDViMSIsImVtYWlsIjoibXVyaWQxNi5zbXNAa2xhc21hcnQuaWQiLCJwaG9uZSI6bnVsbCwibmFtZSI6Ik11cmlkIDE2IFNNUyIsImdpdmVuX25hbWUiOiJNdXJpZCAxNiBTTVMiLCJmYW1pbHlfbmFtZSI6Ik11cmlkIDE2IFNNUyIsImV4cCI6MTc4MjE4Njc3MCwiaXNzIjoia2lkc2xvb3AifQ.cp5uPZZXstv_v28xadCOqUd6BuL5DWvLDbUf49yZBifx2X1evQniTuxVeBcev7q9eAcj1EuNQeTGFpSumu278d6H5Duk5dI9eEwLSqVp2Nvbc6ZRK-yhgr4NDjbM15xxBzUWO3Ta0sFohAocKfIVzQ8O8atqQIn1yW6EuUL3TW91EfPwSp-l5dne4Zdn1T94NsRicZ7Bagg7GnrcpLIIaxy5G3VZsX-fxmMG3KeKslU6PXGyrtLTOo3S1QOhQMNbOGLd5YREGHqCAB7z5nT5pIGhrm80BrKpFSl091f83ffCebGsYp8NWv_NZ4HN50MKoxfmJVYE5UpF2nHC10RXzg; Max-Age=900; Domain=klasmart.id; Path=/; Expires=Tue, 23 Jun 2026 03:52:50 GMT; Secure; SameSite=None'

        const response = await fetch(
            "https://bali.dpenyet.com/edcmid-central/ksi/user0",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookie,

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