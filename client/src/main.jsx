import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Allroutes from "./routes/Allroutes.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Allroutes}>
    <App />
    </RouterProvider>
  </React.StrictMode>,
)
