import * as d3 from 'd3'

export function barPlot (refClass, width, height)  {
    console.log(`adding group `)

    const bids  = [[10,39000], [4, 38000], [15, 37000], [2,36000], [8,35000]]
    const asks = [[2,40000], [7,41000], [11, 42000], [4, 43000], [8,44000]]

    const margin = {top: 0, bottom:0, left:0, right:0}
    const xScale = d3.scaleLinear().domain([0, d3.max(bids.map(pair => pair[0]).concat(asks.map(pair => pair[0])))]).range(width-margin.left-margin.right)
    const yScale = d3.scaleBand().domain(bids.length+asks.length).range([0, height-margin.top-margin.bottom]).padding(0.1)

    const svgBids = d3.select(`#${refClass}`).attr('width', width).attr('height', height).append('g').classed('orderbookBidBars', true)
        svgBids.selectAll('rect').data(bids.map()).enter().append()
    const svgAsks = d3.select(`#${refClass}`).attr('width', width).attr('height', height).append('g').classed('orderbookAskBars', true)


}

export const liveResize  = (refClass, width, height) => {
    console.log('resizing')
    d3.select(`#${refClass}`).attr('width', width).attr('height', height)
}