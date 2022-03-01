import * as d3 from 'd3'

export function barPlot (refClass, width, height)  {
    console.log(`we got ${refClass} `)

    const svg = d3.select('#'+refClass).attr('width', width).attr('height', height).append('g')


}

export const liveResize  = (refClass, width, height) => {
    d3.select('#'+refClass).attr('width', width).attr('height', height)
}