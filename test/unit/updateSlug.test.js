import test from 'ava'
import {authGqlApi} from '../util/graphqlRequest'

const {updateSlugs, replaceContentWithNewSlug} = require('../../resolver/util/updateSlugs')


test('href on id and slug try the replace html function', t => {
    const content = '<p>Cras <a href="mitgliederinformationen-bearbeiten" data-link-id="cj9tlvejoemtu0112hi1yr0lb" data-link-type="article">facilisis</a> mi vitae nunc lobortis pharetra. Nulla volutpat <a href="mitgliederinformationen-bearbeiten" data-link-id="cj9tlvejoemtu0112hi1yr0lb" data-link-type="article">tincidunt</a> ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.</p>'
    const id = "cj9tlvejoemtu0112hi1yr0lb" // mit
    const slug = "mitgliederinformationen-bearbeiten-neu"
    const replaced = replaceContentWithNewSlug(content, id, slug)
    const regex = new RegExp(slug, 'g')
    const regex2 = new RegExp(id, 'g')
    t.is((replaced.match(regex) || []).length, 2)
    t.is((replaced.match(regex2) || []).length, 2)
})

test('update slug on article ID', async t => {
    const id = "cj9tlvejoemtu0112hi1yr0lb" // mit
    const slug = "mitgliederinformationen-bearbeiten"
    const result = await updateSlugs(authGqlApi, id, slug)
    t.is(!!result, true)
})