import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { ContextProvider, SocketProvider } from './contexts'
import App from './App'
import './index.css'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <SocketProvider>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </SocketProvider>
    </ContextProvider>
  </React.StrictMode>
)
