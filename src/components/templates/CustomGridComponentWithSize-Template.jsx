import React, {forwardRef} from 'react'
import { withSize } from 'react-sizeme';

const withSizeHOC = withSize({monitorHeight: true, monitorWidth: true, refreshRate: 60})

const CustomGridComponent = ({style, className, key, children, value, size, gridRef, ...props})=> {
  return (
    <div style={{...style}} className={['GridCard', className].join(' ')} key={key} {...props} ref={gridRef}>
        <p>{value} has {size.width}px width and {size.height}px height</p>
        {/* children is needed for the resizable corner component */}
        {children}
    </div>
  )
}

const SizeAwareComponent = withSizeHOC(CustomGridComponent)

export default (forwardRef((props, ref) => {return <SizeAwareComponent {...props} gridRef={ref} />}))