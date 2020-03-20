import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {ThemeContextProvider} from './context/ThemeContext'
import App from './App'
import './styles/main.css'
import * as serviceWorker from './serviceWorker'
import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'

if (process.env.NODE_ENV !== 'development') {
  const LOGROCKET_PROJECT_ID = process.env.REACT_APP_LOGROCKET_PROJECT_ID
  LogRocket.init(`${LOGROCKET_PROJECT_ID}`)
  setupLogRocketReact(LogRocket)
}

const app = (
  <Router basename={process.env.PUBLIC_URL}>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </Router>
)

ReactDOM.render(app, document.getElementById('root'))
serviceWorker.unregister()
