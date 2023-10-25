import Plotly from 'plotly.js/dist/plotly'

export function doHistogram({ div, values, nbBins = 10 }) {
    const trace = {
        xbins: { size: (1 - 0) / (nbBins - 1), start: 0, end: 1 },
        x: values,
        type: 'histogram',
        // text: [1,2,3],
        marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6,
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    }
    const layout = {
        bargap: 5,
        title: 'Histogram',
        paper_bgcolor: "rgba(0,0,0,0", //background color of the chart container space
        plot_bgcolor: "rgba(0,0,0,0)", //background color of plot area
        // height: 500,
        width: 500,
        xaxis: {
            // scaleanchor: 'y',
            // constrain: "domain",
            title: {
                text: 'Angular misfit',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#000000'
                }
            },
        },
        yaxis: {
            title: {
                text: 'Nb of data',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#000000'
                }
            }
        }
    }

    Plotly.newPlot(div, [trace], layout)

    const observer = new ResizeObserver(_ => Plotly.Plots.resize(document.getElementById(div)))
    observer.observe(document.getElementById(div))
}