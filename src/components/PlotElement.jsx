import React, {useEffect} from 'react'
// import * as myplots from './../resources/plotting'
import * as myPlots from '../resources/myPlots'

const PlotElement = ({ dataSource, plotType, plotSize, refClass}) => {
    // runs everytime the element is rerendered - allows us to update the size of the svg as the component is being resized
    useEffect(() => {
        myPlots.barPlot('plotRef-'+refClass, plotSize[0], plotSize[1] - 25)
    }, [])

  return (
    <>
    <svg id={'plotRef-'+refClass} />
    {myPlots.barPlot('plotRef-'+refClass, plotSize[0], plotSize[1] - 25)}
    </>
  )
}

export default PlotElement