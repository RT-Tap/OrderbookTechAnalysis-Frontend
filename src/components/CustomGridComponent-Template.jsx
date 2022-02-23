import React, {forwardRef} from 'react'

const CustomGridComponent = forwardRef(({style, className, key, children, value, ...props}, ref)=> {

  return (
    <div style={{...style}} className={['GridCard', className].join(' ')} key={key} {...props} ref={ref}>
        <p>{value} </p>
        {/* children is needed for the resizable corner component */}
        {children}
    </div>
  )
})

export default CustomGridComponent