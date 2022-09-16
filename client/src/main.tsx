import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { ContextProvider, SocketProvider } from './contexts'
import { persistor, store } from './store/store'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <SocketProvider>
          <Router>
            <App />
          </Router>
        </SocketProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
)
