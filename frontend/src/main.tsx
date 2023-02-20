import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./bootstrap.min .css"
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/jquery/dist/jquery.slim.min.js";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
// import "../node_modules/popper.js/dist/umd/popper.min.js";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
