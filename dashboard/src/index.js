import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import Root from "./components/Root.js"
import { Provider } from 'react-redux'
import store from './components/store/'
// import { Switch, Router, Route } from 'react-router-dom'
require('dotenv').config()

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();