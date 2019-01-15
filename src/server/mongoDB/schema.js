const mongoose = require('mongoose')
const moment = require('moment')
const theme = require('./models/theme')

const postSchema = require('./models/post')

module.exports = {
  postSchema: postSchema,

  adminSchema: theme.adminSchema,
  themeSchema: theme.themeSchema,
  mainSchema: theme.mainSchema,
  introSchema: theme.introSchema,
  archiveSchema: theme.archiveSchema,
  aboutSchema: theme.aboutSchema,
  brandSchema: theme.brandSchema,
  moreSchema: theme.moreSchema,
  contentSchema: theme.contentSchema,

  reportSchema: theme.reportSchema,

  accountSchema: theme.accountSchema,
}