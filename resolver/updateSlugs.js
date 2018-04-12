const {fromEvent} = require('graphcool-lib')
const {updateSlugs} = require('./util/updateSlugs')
export default (event) => {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')
    const data = event.data
    if (!event.context.auth || !event.context.auth.nodeId) {
        return {error: 'User does not have credentials to update'}
    }
    return updateSlugs(api, data.id, data.slug)
        .then(results => {
            let count = 0
            if (results.length) {
                for (const result of results) {
                    count += result && result.length
                }
                return {
                    data: {
                        count
                    }
                }
            } else {
                return {
                    data: {
                        count: 0
                    }
                }
            }

        })
        .catch(e => {
            console.log(e)
            return {error: 'An unexpected error happened on update.'}
        })
}


