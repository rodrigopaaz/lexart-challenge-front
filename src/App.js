import React from 'react'
import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'

function App () {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/home" /> } />
        <Route exact path="/home" component={ Home } />
      </Switch>
    </div>
  )
}

export default App
