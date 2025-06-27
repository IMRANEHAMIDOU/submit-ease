import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit'
const store = createStore({
  authType: 'localstorage',
  authName: '_auth',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
