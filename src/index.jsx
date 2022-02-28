import React from 'react';
import ReactDOM from 'react-dom';
// styles provided by react grid layout library
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
// my styles on top 
import "./styles/gridlayout.css"

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
