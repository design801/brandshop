import network from './network'

export const mailSupport = async(company, name, email, phone, content) => await network('user', 'mail', {company, name, email, phone, content})