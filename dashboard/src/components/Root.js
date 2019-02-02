import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom'
import DashBoard from './DashBoard.js'
// import Login from './LoginPage.js'
import AdminPage from './AdminPage.js'

// const supportsHistory = 'pushState' in window.history

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter basename={process.env.PUBLIC_URL} >
      <Switch>
        <Route exact path={'/'} render={
          () => (
            <Redirect to={'/dashboard'} />
          )
        } />
        <Route exact path={'/admin'} component={ AdminPage } />
        <Route exact path={'/dashboard'} component={ DashBoard } />
      </Switch >
    </HashRouter >
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root