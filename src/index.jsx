import React from 'react';
import ReactDOM from 'react-dom';
// styles provided by react grid layout library
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
// my styles on top 
import "./styles/gridlayout.css"

// standard static grid layout template
import MyStaticGridLayout from './components/MyStaticGridLayout-Template'
// standard reactive grid layout template
import MyReactiveGridLayout  from './components/MyReactiveGridLayout-Template' 
// grid layout template with component size and layout save to local storage
import ReactiveGridItemSize from './components/GridLayoutWithCustomComponent'
// same as ReactiveGridItemSize but with useImperativeHnalde hook to allow calling functions from here (the parent)
// however the refrence needs to be inside a functional component and this is top level so we need to wrap it in another functional component
import ReactiveGridItemSizeWithForwardRef from './components/GridLayoutWithCustomComponentWithForwardRef';
// because ReactiveGridItemSizeWithForwardRef needs a forward ref that is created in a functional component this just wraps 
// the component and buttons into one component
import FuncWrapperComponentForRefrence from './components/FuncWrapperComponentForRefrence'

ReactDOM.render(
  <React.StrictMode>
    <hr color="black" />
    <MyStaticGridLayout />
    <hr color="black" />
    {/* <MyReactiveGridLayout />
    <hr color="black" />
    <ReactiveGridItemSize /> */}
    <FuncWrapperComponentForRefrence />
    <hr color="black" />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
