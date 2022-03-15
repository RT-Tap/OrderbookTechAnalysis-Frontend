import React, {forwardRef, useEffect} from 'react'
import { withSize } from 'react-sizeme';
// import PlotElement from './PlotElement';
import * as myPlots from '../resources/myPlots'


const withSizeHOC = withSize({monitorHeight: true, monitorWidth: true, refreshRate: 60})

const GridElement = ({style, className, key, children, value, size, gridRef, exitBtn, visualizationDataType, ...props})=> {

    // useEffect(() => {
    //     myPlots.barPlot('plotRef-'+value, size.width, size.height - 25)
    // }, [])

    useEffect(() => {
        myPlots.liveResize('plotRef-'+value, size.width, size.height - 25)
    }, [size])

    const removeStyle = {
        position: "absolute",
        right: "2px",
        top: 0,
        cursor: "pointer"
    };
    
    return (
        <div style={{...style}} className={['GridCard', className].join(' ')} key={key} {...props} ref={gridRef}>
            <div style={{textAlign: 'center'}} className='dragHandleClass'>Drag location</div>
            {/* draw info or plot */}
            {visualizationDataType.dataType[1] === 'NA' ? <p className='GridCardContent'>{value} has {size.width}px width and {size.height}px height <br /> it 
            visualizes {visualizationDataType.dataType[1]} using a {visualizationDataType.dataType[0]} graph </p> :
            // <PlotElement dataSource={visualizationDataType.dataType[1]} plotType={visualizationDataType.dataType[0]} plotSize={[size.width, size.height]} refClass={value} />}
            <svg id={'plotRef-'+value} />}
            {/* children is needed for the resizable corner component */}
            <span className='remove' style={removeStyle} onClick={() => exitBtn(value)}>x</span>
            {children}
        </div>
    )
}

const SizeAwareElement = withSizeHOC(GridElement)

export default (forwardRef((props, ref) => {return <SizeAwareElement {...props} gridRef={ref} />}))