import React from 'react'
import GridLayout from "react-grid-layout";

const MyStaticGridLayout = () => {
  return (
    <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
        <div className='GridCard' key="a" data-grid={{ x: 0, y: 0, w: 1, h: 2, static: true }}>a</div>
        {/* <div className='GridCard' key="b" data-grid={{ x: 1, y: 0, w: 4, h: 4, minW: 2, maxW: 4 }}>b</div> */}
        <div className='GridCard' key="b" data-grid={{ x: 1, y: 0, w: 4, h: 4, minW: 2, maxW: 4 }}>b</div>
        <div className='GridCard' key="c" data-grid={{ x: 5, y: 0, w: 1, h: 2 }}>c</div>
    </GridLayout>
  )
}

export default MyStaticGridLayout