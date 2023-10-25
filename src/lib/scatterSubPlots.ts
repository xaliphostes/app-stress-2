import Plotly from 'plotly.js/dist/plotly'

export type SubPlots = {
    div: string,
    width: number,
    height: number,
    markerSize: number,
    colorScale: string,
    data: {
        x: number[],
        y: number[],
        data: number[]
    }[],
    grid: {
        rows: number,
        columns: number,
        pattern: string
    }
}

export function scatterSubPlots(args: SubPlots) {
    // Build the traces
    const traces = []

    for (let i = 0; i < args.data.length; ++i) {
        const trace = {
            x: args.data[i].x,
            y: args.data[i].y,
            xaxis: i === 0 ? 'x' : `x${i + 1}`,
            yaxis: i === 0 ? 'y' : `y${i + 1}`,
            mode: 'markers',
            type: 'scatter',
            // colorbar: {
            //     thickness: 30,
            //     title: 'Cost',
            //     titleside: 'right',
            //     titlefont: {
            //         size: 14,
            //         family: 'Arial, sans-serif'
            //     }
            // },
            marker: {
                color: args.data[i].data,
                colorscale: args.colorScale,
                size: args.markerSize,
                symbol: 'square',
                // colorbar: {
                //     tick0: 0,
                //     dtick: 1
                // }
            }
        } as Partial<Plotly.PlotData>
        traces.push(trace)
    }

    // ------------------
    // shared axis labels
    // ------------------
    // https://plotly.com/javascript/axes/
    const layout = {
        showlegend: false,
        width: args.width,
        height: args.height,
        // paper_bgcolor: "rgba(0,0,0,0", //background color of the chart container space
        // plot_bgcolor: "rgba(0,0,0,0)", //background color of plot area
        grid: args.grid,
        // yaxis: {
        //     // nticks: 10,
        //     // domain: [0, 1],
        //     title: "R"
        // },
    }

    Plotly.newPlot(args.div, traces, layout, { responsive: true })

    const observer = new ResizeObserver(_ => Plotly.Plots.resize(document.getElementById(args.div)))
    observer.observe(document.getElementById(args.div))
}
