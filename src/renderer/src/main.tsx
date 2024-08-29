import './assets/tanuden-ui.css'
import './styles/App.css'
import './styles/Overlay.css'
import '@fontsource/reddit-mono/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppState from './context/app_global_state'
import { HashRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppState>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </HashRouter>
    </AppState>
  </React.StrictMode>
)
