import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./pages/login";
import dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
     <Switch>
       <Route exact path="/" component={Login} />
       <Route exact path="/dashboard" component={dashboard} />

     </Switch>
    </Router>
  
  );
}

export default App;
