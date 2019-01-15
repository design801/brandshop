import network from './network'

export const createTheme = async(title, desc, id) => await network('admin', 'create', {title, desc, id})
export const findTheme = async() => await network('admin', 'findTheme', {})
export const find = async() => await network('admin', 'find', {})
export const findID = async(id) => await network('admin', 'findID', {id})
export const changeTheme = async(id) => await network('admin', 'changeTheme', {id})
export const updateTheme = async(id, title, desc , sort ) => await network('admin', 'updateTheme', {id, title, desc , sort})
export const boolTheme = async(id) => await network('admin', 'bool', {id})
export const about = async(id , list) => await network('admin', 'about', { id , list})
export const aboutMobile = async(id , list) => await network('admin', 'aboutMobile', { id , list})
export const brand = async(id , list) => await network('admin', 'brand', { id , list})
export const traffic = async(theme , brand , content ) => await network('admin', 'traffic', { theme , brand , content })
export const report = async(theme , date ) => await network('admin', 'report', { theme , date })
export const archive = async(id , img , link , caption , isLink , title ) => await network('admin', 'archive', { id , img , link , caption , isLink , title })
export const findArchive = async() => await network('admin', 'findArchive', {})
export const loginAccount = async(id , passwd) => await network('admin', 'loginAccount', { id , passwd })
export const createAccount = async(id , passwd) => await network('admin', 'createAccount', { id , passwd })
export const findAccount = async() => await network('admin', 'findAccount', {})