import React from 'react'
import ReactDOM from 'react-dom'
import promiseFinally from 'promise.prototype.finally'
import { HashRouter } from 'react-router-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import authStore from './stores/authStore'
import commonStore from './stores/commonStore'
import userStore from './stores/userStore'

const stores = {
  authStore,
  commonStore,
  userStore,
}

// For easier debugging
window._____APP_STATE_____ = stores

promiseFinally.shim()
configure({ enforceActions: 'always' })

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
