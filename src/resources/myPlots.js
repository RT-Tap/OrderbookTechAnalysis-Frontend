import * as d3 from 'd3'

export function barPlot (refClass, width, height)  {
    console.log(`adding group `)

    const bids  = [[10,39000], [4, 38000], [15, 37000], [2,36000], [8,35000]]
    const asks = [[2,40000], [7,41000], [11, 42000], [4, 43000], [8,44000]]


    const svg = d3.select(`#${refClass}`).attr('width', width).attr('height', height).append('g')


}

export const liveResize  = (refClass, width, height) => {
    console.log('resizing')
    d3.select(`#${refClass}`).attr('width', width).attr('height', height)
}