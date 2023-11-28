import Plotly from 'plotly.js/dist/plotly'
import { Model } from './Model'

export class Histogram {
    private div = ''
    private model: Model = undefined
    private nbBins = 20
    private start = 0
    private end = 90
    private size = 2

    constructor({ div, model, nbBins = 20 }: { div: string, model: Model, nbBins?: number }) {
        this.model = model
        this.div = div
        this.nbBins = nbBins
    }

    setStart(s: number) {
        this.start = s
    }

    setEnd(s: number) {
        this.end = s
    }

    setSize(s: number) {
        this.size = s
    }

    generate() {
        const values = this.model.getMisfitAngles()

        const trace = {
            xbins: {
                size: this.size, //1 / (this.nbBins - 1),
                start: this.start,
                end: this.end
            },
            x: values,
            type: 'histogram',
            marker: {
                color: 'rgb(158,202,225)',
                opacity: 0.6,
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            },
            autobinx: false
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
    
        Plotly.newPlot(this.div, [trace], layout)
    
        const observer = new ResizeObserver(_ => Plotly.Plots.resize(document.getElementById(this.div)))
        observer.observe(document.getElementById(this.div))
    }
        
}
