const {GraphQLClient} = require('graphql-request')
const fixtures = {
    apolloClient: 'cj8yj66xc01740164lh5bv4fz' // demo test account
}
const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDU3ODg1MTMsImNsaWVudElkIjoiY2l3eW9jOHl4Mzd2dzAxMjlwYnpybHAxbyJ9.U4ZKH1ZDNQXHH5xteE5BMrTY76NcApWYXWulHyGu7vo'

const client = new GraphQLClient('https://api.graph.cool/simple/v1/' + fixtures.apolloClient)

const authClient = new GraphQLClient('https://api.graph.cool/simple/v1/' + fixtures.apolloClient, {
    headers: {
        Authorization: `Bearer ${authToken}`
    }
})


/**
 *
 * @param gql
 * @param variables
 * @param [isAuth]
 * @returns {Promise<any>}
 */
function queryGql (gql, variables, isAuth) {
    const reqClient = isAuth ? authClient : client
    return reqClient.request(gql, variables)
        .catch((e) => {
            console.error(e)
        })
}

module.exports = {
    gqlApi: client,
    authGqlApi: authClient,
    queryGql
}
