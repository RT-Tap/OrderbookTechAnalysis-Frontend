import React, { useState, useRef, createRef} from 'react'
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

import CustomGridComponent from './CustomGridComponentWithSize-Template';
// import CustomGridComponent from './CustomGridComponent-Template.jsx';

const ReactiveGridItemSize = () => {
    const items = ['One', 'Two', 'Three']
    const layouts = {
        lg: [
            { i: "One", x: 0, y: 0, w: 1, h: 2 },
            { i: "Two", x: 1, y: 0, w: 3, h: 4, minW: 2, mxW: 4 },
            { i: "Three", x: 4, y: 0, w: 1, h: 2 }
        ],
        md: [
            { i: "One", x: 0, y: 0, w: 1, h: 2 },
            { i: "Two", x: 1, y: 0, w: 3, h: 4, minW: 2, mxW: 4 },
            { i: "Three", x: 4, y: 0, w: 1, h: 2 }
        ],
        sm: [
            { i: "One", x: 0, y: 0, w: 1, h: 2 },
            { i: "Two", x: 1, y: 0, w: 3, h: 4, minW: 2, maxW: 4 },
            { i: "Three", x: 4, y: 0, w: 1, h: 2 }
        ],
    }

    function getFromLS(key) {
        let ls = {};
        if (localStorage) {
            try {
                ls = JSON.parse(localStorage.getItem("gridLayout")) || {[key]: layouts};
            } catch (e) {
                /*Ignore*/
            }
        }
        return ls[key];
    }

    function saveToLS(key, value) {
        if (localStorage) {
            localStorage.setItem("gridLayout", JSON.stringify({[key]: value}));}
    }

    const [currentLayout, setCurrentLayout] = useState(getFromLS('layout'))
    const gridRef = createRef()

    return (
        <div>
            <ResponsiveGridLayout
                ref={gridRef}
                className="layout"
                layouts={currentLayout}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                // onLayoutChange={(index, newlayout) => {console.log(index);console.log(newlayout)}}
                onLayoutChange={(key, newlayout) => {console.log('saving to ls');setCurrentLayout(newlayout); saveToLS("layout", newlayout)}}
            >
                {items.map((key) => <CustomGridComponent ref={gridRef} key={key} value={key}/>)}
            </ResponsiveGridLayout>
        </div>
    )
} 

export default ReactiveGridItemSize