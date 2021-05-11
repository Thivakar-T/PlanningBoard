import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './pages/login'
import dashboard from './pages/dashboard'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={dashboard} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  )
}

export default App
