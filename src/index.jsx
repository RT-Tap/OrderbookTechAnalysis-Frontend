import React from 'react';
import ReactDOM from 'react-dom';
// styles provided by react grid layout library
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
// my styles on top 
import "./styles/gridlayout.css"

<<<<<<< HEAD
import MyStaticGridLayout from './components/MyStaticGridLayout-Template'
import MyReactiveGridLayout  from './components/MyReactiveGridLayout-Template' 
=======
import MyStaticGridLayout from './components/MyStaticGridLayout'
import MyReactiveGridLayout  from './components/MyReactiveGridLayout' 
>>>>>>> f56023a1617d542e0bcdc2496e43312df71ade8d


ReactDOM.render(
  <React.StrictMode>
    <hr color="black" />
    <MyStaticGridLayout />
    <hr color="black" />
    <MyReactiveGridLayout />
    <hr color="black" />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
