import React, {forwardRef} from 'react'
import { withSize } from 'react-sizeme';

const withSizeHOC = withSize({monitorHeight: true, monitorWidth: true, refreshRate: 60})

const CustomGridComponent = ({style, className, key, children, value, size, gridRef, exitBtn, ...props})=> {
    const removeStyle = {
        position: "absolute",
        right: "2px",
        top: 0,
        cursor: "pointer"
    };
    return (
        <div style={{...style}} className={['GridCard', className].join(' ')} key={key} {...props} ref={gridRef}>
            <p>{value} has {size.width}px width and {size.height}px height</p>
            {/* children is needed for the resizable corner component */}
            <span className='remove' style={removeStyle} onClick={() => exitBtn(value)}>x</span>
            {children}
        </div>
    )
}

const SizeAwareComponent = withSizeHOC(CustomGridComponent)

export default (forwardRef((props, ref) => {return <SizeAwareComponent {...props} gridRef={ref} />}))