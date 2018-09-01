const server = require('open-app-graphql-server')

const ssbDefaults = require('ssb-graphql-defaults')
const dat = require('dat-graphql')
const apphub = require('apphub-graphql')

module.exports = () => server([
  dat,
  ssbDefaults,
  apphub
])

