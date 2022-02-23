import React, {forwardRef} from 'react'
import { withSize } from 'react-sizeme';


const CustomGridComponent = forwardRef(({style, className, key, children, value, size, ...props}, ref)=> {

  return (
    <div style={{...style}} className={['GridCard', className].join(' ')} key={key} {...props} ref={ref}>
        <p>{value} has {size.width}px width and {size.height}px height</p>
        {/* <p>This component is {width}px wide and {height}px high</p> */}
        {/* children is needed for the resizable corner component */}
        {children}
    </div>
  )
})

export default withSize({monitorHeight: true, monitorWidth: true, refreshRate: 60})(CustomGridComponent)

