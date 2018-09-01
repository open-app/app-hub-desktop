const html = require('choo/html')
const Component = require('choo/component')
const AppItem = require('./AppItem')

const getApplicationsQuery = `{
  getApplications {
    name
  }
}`

module.exports = class Apps extends Component {
  constructor () {
    super()
    this.getApplications = this.getApplications.bind(this)
    console.log(this._arguments)
  }
  getApplications () {
    this.client.request(getApplicationsQuery)
      .then(data => {
        this.emit('add_applications', data.getApplications)
      })
      .catch(err => {
        console.log('Error:', err) // GraphQL response errors
      })
  }

  createElement ({ state, emit, client }) {
    this.emit = emit
    this.client = client
    console.log(state.applications)
    return html`<div>
      <h1>Applications</h1>
      ${state.applications.map(app => state.cache(AppItem, 'app-item').render(app))}
    </div>`
  }
  load () {
    this.getApplications()
  }
  update (state) {

  }
}