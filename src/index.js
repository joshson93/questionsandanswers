import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import AppContextProvider from './appState/index.js';
// import reportWebVitals from './reportWebVitals';
const Stack =(
<AppContextProvider>
  <App />
</AppContextProvider>
)

// ReactDOM.render(Stack,  document.getElementById('root'));
ReactDOM.createRoot(document.getElementById('root')).render(Stack)
