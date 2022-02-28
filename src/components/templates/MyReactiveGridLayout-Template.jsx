import React from 'react'
// Choose:
// A- static width -   ...width={1200}
// import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
// B-  Dynamic Width
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

const MyGridLayout = () => {

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

  return (
    <div>
        <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
        >
        <div className='GridCard' key="One" data-grid={{ x: 0, y: 0, w: 1, h: 2, static: true }}>1</div>
        <div className='GridCard' key="Two" data-grid={{ x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }}>2</div>
        <div className='GridCard' key="Three" data-grid={{ x: 4, y: 0, w: 1, h: 2 }}>3</div>
        </ResponsiveGridLayout>
    </div>
  )
}

export default MyGridLayout