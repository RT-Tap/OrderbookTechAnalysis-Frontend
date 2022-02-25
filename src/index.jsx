import React from 'react';
import ReactDOM from 'react-dom';
// styles provided by react grid layout library
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
// my styles on top 
import "./styles/gridlayout.css"

import MyStaticGridLayout from './components/MyStaticGridLayout-Template'
import MyReactiveGridLayout  from './components/MyReactiveGridLayout-Template' 

import ReactiveGridItemSize from './components/GridLayoutWithCustomComponent'


ReactDOM.render(
  <React.StrictMode>
    <hr color="black" />
    <MyStaticGridLayout />
    <hr color="black" />
    <MyReactiveGridLayout />
    <hr color="black" />
    <button onClick={() => console.log('Reset layout')}>Reset Layout</button>
    <button onClick={() => console.log('Adding item')}>Add Grid Element</button>
    <button onClick={() => console.log('Removing item')}>Remove Grid Element</button>
    <ReactiveGridItemSize />
    <hr color="black" />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
