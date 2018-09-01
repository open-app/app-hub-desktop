const html = require('choo/html')
const devtools = require('choo-devtools')
const choo = require('choo')
const Component = require('choo/component')
const { request, GraphQLClient } = require('graphql-request')
const endpoint = 'http://localhost:4000/graphql'
const client = new GraphQLClient(endpoint, { headers: {} })

const app = choo()
app.use(devtools())
app.use(ssbStore)
app.route('/', mainView)
app.mount('body')

const AppList = require('./components/AppList')

function mainView (state, emit) {
  return html`
    <body>
      <h1>Open App Ecosystem</h1>
      ${state.cache(AppList, 'app-list').render({state, emit, client})}
      ${state.applications.map(app => html`<h3>${app.name}</h3>`)}
    </body>
  `
}

function ssbStore (state, emitter) {
  state.applications = []
  emitter.on('add_applications', (data) => {
    state.applications = data
    emitter.emit('render')
  })
}
