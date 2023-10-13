import Plotly from 'plotly.js'

export function doDomain(
    { div, width, n, m, values }:
    { div: string, width: number, n: number, m: number, values: number[] })
{
    const size = n
    const x = new Array(size)
    const y = new Array(size)
    const z = new Array(size)

    for (let i = 0; i < size; i++) {
        x[i] = y[i] = i / (n - 1)
        z[i] = new Array(size)
    }

    let k = 0
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            z[i][j] = values[k++]
        }
    }

    const data = [{
        z: z,
        x: x,
        y: y,
        type: 'contour',
        colorbar: {
            thickness: 30,
            title: 'Cost',
            titleside: 'right',
            titlefont: {
                size: 14,
                family: 'Arial, sans-serif'
            }
        }
    } as Partial<Plotly.PlotData>
    ];

    const layout = {
        title: 'Domain',
        paper_bgcolor: "rgba(0,0,0,0", //background color of the chart container space
        plot_bgcolor: "rgba(0,0,0,0)", //background color of plot area
        height: 500,
        xaxis: {
            // scaleanchor: 'y',
            // constrain: "domain",
            title: {
                text: 'R',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#000000'
                }
            },
        },
        yaxis: {
            title: {
                text: 'Theta',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#000000'
                }
            }
        }
    }

    const config = { responsive: true }

    Plotly.newPlot(div, data, layout, config)

    const observer = new ResizeObserver(_ => Plotly.Plots.resize(document.getElementById(div)))
    observer.observe(document.getElementById(div))
}
