import 'es6-promise/auto'
import 'isomorphic-fetch'
import config from '@common/config.json'
import urlencode from 'urlencode'

const serverURL = config[process.env.NODE_ENV].serverURL

const makeMessage = async(id, type, data) => serverURL + '/' + id + '/' + urlencode( JSON.stringify({type, data}) )
const toJson = async(res) => JSON.parse( await res.json() )

export default async(id, type, data) => await toJson( await fetch( await makeMessage(id, type, data)) )