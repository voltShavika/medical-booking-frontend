// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
//
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client'; // Using 'react-dom/client' in React 18
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import './index.css'; // Optional: global styles

// Create a root element to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with Redux Provider to make the store available
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
