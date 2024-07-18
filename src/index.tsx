import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
import { Provider } from 'react-redux'
import { store } from './App/store.ts'
import { SocketContextProvider } from '../server/context/socketContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </Provider>
  </React.StrictMode>,
)
