// import Plotly from 'plotly.js' // !!!!!!!!! DOES not work. Use the following line instead.
import Plotly from 'plotly.js/dist/plotly'
import { Domain } from '../../../stress/src/lib'

export function doDomain(
    { div, x, y, data, domain, width = 500, height = 500, markerSize = 5, colorScale = 'Portland', zmin = 0, zmax = 2, spacing = 0.1 }:
        { div: string, x: number[], y: number[], data: number[], domain: Domain, width?: number, height?: number, markerSize?: number, colorScale?: string, zmin?: number, zmax?: number, spacing?: number }) {
    const z = new Array(x.length)

    let k = 0
    for (let i = 0; i < x.length; i++) {
        z[i] = new Array(y.length)
        for (let j = 0; j < y.length; j++) {
            const v = data[k++]
            z[i][j] = v // v > 1.5 ? Number.NaN : v
        }
    }

    const trace = {
        x: x,
        y: y,
        z,
        type: 'contour', // 'contourcarpet'
        colorbar: {
            thickness: 30,
            title: 'Cost',
            titleside: 'right',
            titlefont: {
                size: 14,
                family: 'Arial, sans-serif'
            }
        },
        colorscale: colorScale,
        // zmin,
        // zmax,
        contours: {
            start: zmin,
            end: zmax,
            size: spacing
          }
    } as Partial<Plotly.PlotData>

    const layout = {
        title: 'Domain',
        // paper_bgcolor: "rgba(0,0,0,0", //background color of the chart container space
        // plot_bgcolor: "rgba(0,0,0,0)", //background color of plot area
        width: width,
        height: height,
        xaxis: {
            // scaleanchor: 'y',
            constrain: "domain",
            // range: domain.xAxis().bounds,
            title: {
                text: domain.xAxis().name,
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#000000'
                }
            },
        },
        yaxis: {
            scaleanchor: 'x',
            // range: domain.yAxis().bounds,
            title: {
                text: domain.yAxis().name,
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#000000'
                }
            }
        }
    }

    Plotly.newPlot(div, [trace], layout, { responsive: true })

    const observer = new ResizeObserver(_ => Plotly.Plots.resize(document.getElementById(div)))
    observer.observe(document.getElementById(div))
}
