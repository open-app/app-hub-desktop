const html = require('choo/html')
const Component = require('choo/component')

module.exports = class AppItem extends Component {
  constructor () {
    super()
  }

  createElement ({ name }) {
    console.log('Woot')
    return html`<div>
      <h3>${name}</h3>
    </div>`
  }
}