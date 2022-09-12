import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { ContextProvider } from './contexts/AppContext'
import App from './App'
import './index.css'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ContextProvider>
  </React.StrictMode>
)
