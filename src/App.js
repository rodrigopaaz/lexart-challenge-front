import React from 'react'
import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import History from './pages/History'
import About from './pages/About'

function App () {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/home" /> } />
        <Route exact path="/home" component={ Home } />
        <Route exact path="/history" component={ History } />
        <Route exact path="/about" component={ About } />
      </Switch>
    </div>
  )
}

export default App
