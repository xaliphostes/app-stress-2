// import Plotly from 'plotly.js' // !!!!!!!!! DOES not work
import Plotly from 'plotly.js/dist/plotly'

export function scatterPlot(
    { div, x, y, data, width = 500, height = 500, markerSize = 5, colorScale='Portland' }:
        { div: string, x: number[], y: number[], data: number[], width?: number, height?: number, markerSize?: number, colorScale?: string }) {
    const trace = {
        x,
        y,
        mode: 'markers',
        type: 'scatter',
        colorbar: {
            thickness: 30,
            title: 'Cost',
            titleside: 'right',
            titlefont: {
                size: 14,
                family: 'Arial, sans-serif'
            }
        },
        marker: {
            size: markerSize,
            color: data,
            colorscale: colorScale,
            colorbar: {
                tick0: 0,
                dtick: 1
            },
            symbol: 'square'
        }
    } as Partial<Plotly.PlotData>

    const layout = {
        title: 'Domain',
        width,
        height,
        // paper_bgcolor: "rgba(0,0,0,0", //background color of the chart container space
        // plot_bgcolor: "rgba(0,0,0,0)", //background color of plot area
    }

    Plotly.newPlot(div, [trace], layout, { responsive: true })

    const observer = new ResizeObserver(_ => Plotly.Plots.resize(document.getElementById(div)))
    observer.observe(document.getElementById(div))

    // symbols = 'circle', 'diamond', 'square', 'triangle-up' ...
}
