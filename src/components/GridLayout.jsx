import React, { forwardRef, useState, useRef, useImperativeHandle, useEffect} from 'react'
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

import GridElements from './GridElements';

const GridLayout = forwardRef((props, ref) => {
    const originalLayouts = {
        lg: [
            { i: "1", x: 0, y: 0, w: 1, h: 2 },
            { i: "2", x: 1, y: 0, w: 2, h: 10, minW: 2 },
            { i: "3", x: 4, y: 0, w: 1, h: 2 }
        ],
        md: [
            { i: "1", x: 0, y: 0, w: 1, h: 2 },
            { i: "2", x: 1, y: 0, w: 3, h: 4, minW: 2 },
            { i: "3", x: 4, y: 0, w: 1, h: 2 }
        ],
        sm: [
            { i: "1", x: 0, y: 0, w: 1, h: 2 },
            { i: "2", x: 1, y: 0, w: 3, h: 4, minW: 2, maxW: 4 },
            { i: "3", x: 4, y: 0, w: 1, h: 2 }
        ],
    }

    // const visualizationDataType = {
    const [visualizationDataType, setVisualizationDataType] = useState({
        lg:[
            {i: "1", dataType: ['testLG', 'NA']},
            {i: "2", dataType: ['bar', 'NA']},
            {i: "3", dataType: ['testLG', 'NA']}
        ],
        md:[
            {i: "1", dataType: ['testMD', 'NA']},
            {i: "2", dataType: ['bar', 'orders']},
            {i: "3", dataType: ['testMD', 'NA']}
        ],
        sm:[
            {i: "1", dataType: ['testSM', 'NA']},
            {i: "2", dataType: ['bar', 'orders']},
            {i: "3", dataType: ['testSM', 'NA']}
        ],
    })

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
    // const gridRef = createRef()
    const gridRef = useRef(null)

    // react-grid-layout seems to default to large(est) breakpoint - intially(first load) will only call onBreakpointchnage for anything but the biggest size
    const [currentBreakpoint, setCurrentBreakpoint] = useState({breakpoint: 'lg', columns: 12})

    function createNewElement(){
        setVisualizationDataType( (prevVisualizationDataType) => {
            for (let sze in prevVisualizationDataType){
                const newID = Math.max(...prevVisualizationDataType[sze].map( i => parseInt(i.i))) +1
                prevVisualizationDataType[sze].push({i: newID.toString(), dataType: ['new', 'NA']})
            }
            return prevVisualizationDataType
        })

        // if no elements Math.max returns -Infinity so we need to check for that
        const elementId = Math.max(...currentLayout[currentBreakpoint.breakpoint].map(eachObj => +eachObj.i))
        return {
            i: isFinite(elementId)? (elementId + 1).toString() : "1",
            x:0,
            y:Infinity,
            w:3,
            h:2,
        }
    }

    const removeElement = (id) => {
        setCurrentLayout(oldLayout => ({
            ...oldLayout,  [currentBreakpoint.breakpoint]: oldLayout[currentBreakpoint.breakpoint].filter(element => element.i != id)
        }))
    }

    useImperativeHandle(ref, () => ({
        addGridItem: () => {
            const newElement = createNewElement()
            setCurrentLayout(oldLayout => ({
                ...oldLayout,  [currentBreakpoint.breakpoint]: [...oldLayout[currentBreakpoint.breakpoint], newElement]
            }))
        },
        resetGrid: () => {
            setCurrentLayout(originalLayouts)
        }
    }))


    return (
        <div>
            <ResponsiveGridLayout
                ref={gridRef}
                className="layout"
                layouts={currentLayout}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                draggableHandle='.dragHandleClass'
                // onLayoutChange={(currentLayout, allLayout) => {console.log(currentLayout);console.log(allLayout)}} // pretty sure tis returns current and all layouts
                onLayoutChange={(key, newlayout) => {setCurrentLayout(newlayout); saveToLS("layout", newlayout)}}
                onBreakpointChange={(breakpoint, cols) => {setCurrentBreakpoint({breakpoint: breakpoint, columns: cols})}}
            >
                {/* (array of property value i of the current layout).map(key) => ...  */}
                {(currentLayout[currentBreakpoint.breakpoint].map(eachObj => eachObj.i)).map((key) => <GridElements visualizationDataType={visualizationDataType[currentBreakpoint.breakpoint].find(elem => elem.i === key) } ref={gridRef} key={key} value={key} exitBtn={removeElement} />)} 
            </ResponsiveGridLayout>
        </div>
    )
})

export default  GridLayout