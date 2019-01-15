const routes = module.exports = require('next-routes')()

routes
.add('home', '/', 'index')
.add('shop', '/shop', 'index')
.add('about', '/about', 'about')
.add('archive', '/archive', 'archive')
.add('admin', '/admin', 'admin')
.add('archiveLink', '/archiveLink?id=:id&title=:title', 'archiveLink')
