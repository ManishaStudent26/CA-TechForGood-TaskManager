import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // 🌟 Imports your App component
import './index.css' // Optional global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {}
  </React.StrictMode>,
)