import gql from 'graphql-tag'
import {print} from 'graphql/language/printer'
import {authGqlApi} from "../util/graphqlRequest"
import test from "ava"


const gqlQuery = gql`
    mutation updateSlugs($id:ID!,$slug:String!){
        updateSlugs(id:$id,slug:$slug){
            count
        }
    }
`


test('update slug on article ID', async t => {
    const id = "cj9tlvejoemtu0112hi1yr0lb" // mit
    const slug = "mitgliederinformationen-bearbeiten"
    const result = await authGqlApi.request(print(gqlQuery), {id, slug})
        .then(r => r.updateSlugs)
    t.is(result.count, 2)
})