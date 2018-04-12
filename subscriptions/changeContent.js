const {fromEvent} = require('graphcool-lib')
const gql = require('graphql-tag')
const {print} = require('graphql/language/printer')

const updateGql = gql`
    mutation updateArticle($id:ID!,$modified:DateTime){
        updateArticle(id:$id,modified:$modified){
            id
        }
    }`

export default async (event) => {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')
    const data = event.data
    let node = data.Content.node
    console.log(data.Content)
    let id = (node.article && node.article.id) || (node.parent && node.parent.article && node.parent.article.id)
    if (id) {
        try {
            await api.request(print(updateGql), {id, modified: new Date()})
            return {
                data: {id}
            }
        } catch (e) {
            console.log(e)
            return {error: 'error happened'}
        }
    }
    return {
        data: 'no article set'
    }
}