import React, {useRef, createRef} from 'react'
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

// import CustomGridComponent from './CustomGridComponentWithSize-Template';
import CustomGridComponent from './CustomGridComponent-Template.jsx';



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


    const datagrids = {One:{ x: 0, y: 0, w: 1, h: 2, static: true },
                        Two: { x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
                        Three: { x: 4, y: 0, w: 1, h: 2 }}

    const gridRef = createRef()

    return (
        <div>
            <ResponsiveGridLayout
                ref={gridRef}
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
            >
                {items.map((key) => <CustomGridComponent ref={gridRef} key={key} data-grid={datagrids[key]} value={key}/>)}
            </ResponsiveGridLayout>
        </div>
    )
} 

export default ReactiveGridItemSize
