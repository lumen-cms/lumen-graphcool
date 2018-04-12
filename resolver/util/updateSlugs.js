const gql = require('graphql-tag')
const {print} = require('graphql/language/printer')

const contentOnLinkIdGql = gql`
    query allContent($search:String){
        allContents(filter:{
            description_contains:$search
        }){
            id
            description
        }
    }`

const fileReferencesOnLinkIdGql = gql`
    query allFileReferences($linkId:String){
        allFileReferences(filter:{
            linkId:$linkId
        }){
            id
            linkSlug
            linkId
            linkType
        }
    }`

const updateContentGql = gql`
    mutation updateContent($id:ID!,$description:String){
        updateContent(id:$id,description:$description){
            id
            description
        }
    }`

const updateFileReferenceGql = gql`
    mutation updateFileReference($id:ID!,$linkSlug:String){
        updateFileReference(id:$id,linkSlug:$linkSlug){
            id
            linkId
            linkSlug
        }
    }`

/**
 *
 * @param gqlRequest
 * @param id
 * @returns {Promise<T>}
 */
function findAllContentWithSlug (gqlRequest, id) {
    const gqlQuery = print(contentOnLinkIdGql)
    return gqlRequest.request(gqlQuery, {search: id})
        .then(r => r.allContents)
}

/**
 *
 * @param gqlRequest
 * @param id
 * @returns {Promise<T>}
 */
function findAllImagesWithSlug (gqlRequest, id) {
    const gqlQuery = print(fileReferencesOnLinkIdGql)
    return gqlRequest.request(gqlQuery, {linkId: id})
        .then(r => r.allFileReferences)
}

/**
 *
 * @param gqlRequest
 * @param id
 * @returns {Promise<any[]>}
 */
function findAllElements (gqlRequest, id) {
    return Promise.all([
        findAllContentWithSlug(gqlRequest, id),
        findAllImagesWithSlug(gqlRequest, id)
    ])
}

/**
 *
 * @param content
 * @param id
 * @param slug
 * @returns {*}
 */
function replaceContentWithNewSlug (content, id, slug) {
    const regex = new RegExp('<a.*?>(.*?)</a>', 'g')
    const matched = content.match(regex) // find all a-tags
    matched.forEach(tag => {
        // only replace if ID is present. Maybe we need to extend this in the future with slugTypes
        if (tag.indexOf(id) !== -1) {
            const newTag = tag.replace(/href="(.*?)"/, `href="${slug}"`) // replace href with new slug
            content = content.replace(tag, newTag) // replace current content tag
        }
    })
    return content
}

/**
 *
 * @param gqlRequest
 * @param elements
 * @param id
 * @param slug
 * @returns {Promise<any[]>}
 */
function updateAllContent (gqlRequest, elements, id, slug) {
    const gqlQuery = print(updateContentGql)
    const mappedPromises = elements.map(item => {
        const newDescription = replaceContentWithNewSlug(item.description, id, slug)
        const variables = {id: item.id, description: newDescription}
        return gqlRequest.request(gqlQuery, variables)
            .then(r => r.updateContent)
    })
    return Promise.all(mappedPromises)
}


/**
 *
 * @param gqlRequest
 * @param elements
 * @param id
 * @param slug
 * @returns {Promise<any[]>}
 */
function updateAllFileReferences (gqlRequest, elements, id, slug) {
    const gqlQuery = print(updateFileReferenceGql)
    const mappedPromises = elements.map(item => {
        const variables = {
            id: item.id,
            linkSlug: slug
        }
        return gqlRequest.request(gqlQuery, variables)
            .then(r => r.updateFileReference)
    })
    return Promise.all(mappedPromises)
}

/**
 *
 * @param gqlRequest
 * @param id
 * @param slug
 * @returns {PromiseLike<any[]> | Promise<any[]>}
 */
function updateSlugs (gqlRequest, id, slug) {
    return findAllElements(gqlRequest, id, slug)
        .then(result => {
            const contentElements = result[0]
            const allFileReferences = result[1]
            let promises = []
            if (contentElements.length) {
                promises.push(updateAllContent(gqlRequest, contentElements, id, slug))
            }
            if (allFileReferences.length) {
                promises.push(updateAllFileReferences(gqlRequest, allFileReferences, id, slug))
            }
            return Promise.all(promises)
        })
}

module.exports = {updateSlugs, replaceContentWithNewSlug}