import React, { useState, useRef, createRef} from 'react'
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

import CustomGridComponent from './CustomGridComponentWithSize-Template';
// import CustomGridComponent from './CustomGridComponent-Template.jsx';

const ReactiveGridItemSize = () => {
    const items = ['1', '2', '3']
    const originalLayouts = {
        lg: [
            { i: "1", x: 0, y: 0, w: 1, h: 2 },
            { i: "2", x: 1, y: 0, w: 3, h: 4, minW: 2, mxW: 4 },
            { i: "3", x: 4, y: 0, w: 1, h: 2 }
        ],
        md: [
            { i: "1", x: 0, y: 0, w: 1, h: 2 },
            { i: "2", x: 1, y: 0, w: 3, h: 4, minW: 2, mxW: 4 },
            { i: "3", x: 4, y: 0, w: 1, h: 2 }
        ],
        sm: [
            { i: "1", x: 0, y: 0, w: 1, h: 2 },
            { i: "2", x: 1, y: 0, w: 3, h: 4, minW: 2, maxW: 4 },
            { i: "3", x: 4, y: 0, w: 1, h: 2 }
        ],
    }

    function getFromLS(key) {
        let ls = {};
        if (localStorage) {
            try {
                ls = JSON.parse(localStorage.getItem("gridLayout")) || {[key]: originalLayouts};
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

    // react-grid-layout seems to default to large(est) breakpoint - intially(first load) will only call onBreakpointchnage for anything but the biggest size
    const [currentBreakpoint, setCurrentBreakpoint] = useState({breakpoint: 'lg', columns: 12})

    const onAddGridItem = () => {}

    // this handles creating the actual 
    const createGridItem = ([ ref=gridRef, key]) => {
    }

    return (
        <div>
            <ResponsiveGridLayout
                ref={gridRef}
                className="layout"
                layouts={currentLayout}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                // onLayoutChange={(currentLayout, allLayout) => {console.log(currentLayout);console.log(allLayout)}} // pretty sure tis returns current and all layouts
                onLayoutChange={(key, newlayout) => {console.log('saving to ls');setCurrentLayout(newlayout); saveToLS("layout", newlayout)}}
                onBreakpointChange={(breakpoint, cols) => {console.log('setting new breakpoint');setCurrentBreakpoint({breakpoint: breakpoint, columns: cols})}}
            >
                {items.map((key) => <CustomGridComponent ref={gridRef} key={key} value={key}/>)}
            </ResponsiveGridLayout>
        </div>
    )
} 

export default ReactiveGridItemSize