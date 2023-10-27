// import Plotly from 'plotly.js' // !!!!!!!!! DOES not work
import Plotly from 'plotly.js/dist/plotly'

import { Data, FullParameterSpace, RegularDomain3D } from '../../../stress/src/lib'
import { ImplicitGrid3D, MarchingCubes } from '@youwol/geometry'
import { minMax, normalize } from '@youwol/math'
import { Serie } from '@youwol/dataframe'
import { Engine } from '../../../stress/src/lib/geomeca'

class Grid implements ImplicitGrid3D {
    private s_: number[] = []

    constructor(n: number) { this.s_ = [n, n, n] }
    get sizes() { return this.s_ }
    pos(i: number, j: number, k: number): number[] {
        return [i / (this.s_[0] - 1), j / (this.s_[1] - 1), k / (this.s_[2] - 1)]
    }
}

/**
 * - Create a 3D domain of the cost function for the 3 Euler angles
 * - Update the cube when necessary
 * - Generate iso-surfaces close to the minimum cost
 * - Use a slider for the the 4th dimension (the stress ratio, R)
 */
export class CostDomain3D extends RegularDomain3D {
    private div = ''
    private _x: number[]
    private _y: number[]
    private _z: number[]
    private iso_ = 0.1
    private width = 500
    private height = 500
    private colorScale = 'Jet'

    constructor(
        { div, engine, n, width = 500, height = 500, colorScale = 'Jet' }:
        { div: string, engine: Engine, n: number, width?: number, height?: number, colorScale?: string })
    {
        super({
            space: new FullParameterSpace({ engine }),
            n,
            xAxis: { name: "psi", bounds: [0, 180] },
            yAxis: { name: "theta", bounds: [0, 180] },
            zAxis: { name: "phi", bounds: [0, 180] }
        })

        this.div = div
        this.n = n
        this.width = width
        this.height = height
        this.colorScale = colorScale
    }

    set n(v: number) {
        const n = Math.round(v)
        this.nx_ = n
        this.ny_ = n
        this.nz_ = n

        this._x = new Array(n**3)
        this._y = new Array(n**3)
        this._z = new Array(n**3)
        let l = 0
        for (let i=0; i<n; ++i) {
            const I = i/(n-1)
            for (let j=0; j<n; ++j) {
                const J = j/(n-1)
                for (let k=0; k<n; ++k) {
                    const K = k/(n-1)
                    this._x[l] = I
                    this._y[l] = J
                    this._z[l] = K
                    l++
                }
            }
        }
    }

    set R(v: number) {
        this.space.R = v
    }

    set iso(v: number) {
        this.iso_ = v
    }

    setData(data: Data[]) {
        this.space.setData(data)
    }

    plot() {
        const value = super.run()
        const serie = Serie.create({ array: value, itemSize: 1 })
        const mm = minMax(serie)
        const iso1 = mm[0] + this.iso_ * (mm[1] - mm[0])
        const iso2 = iso1 //+ 0.01 * (mm[1] - mm[0])

        const data = {
            type: "isosurface",
            colorscale: this.colorScale,
            showscale: false,
            x: this._x,
            y: this._y,
            z: this._z,
            value,
            isomin: iso1,
            isomax: iso2,
            surface: { show: true, count: 1, fill: 1 },
            // slices: {z: {
            //   show: false, locations: [-0.3, 0.5]
            // }},
            caps: {
                x: { show: false },
                y: { show: false },
                z: { show: false }
            }
        }

        const graphDiv = document.getElementById(this.div)
        let layout = graphDiv['layout']

        if (layout === undefined) {
            const layout = {
                margin: { t: 0, r: 0, l: 0, b: 0 },
                width: this.width,
                height: this.height,
                scene: {
                    camera: {
                        eye: {
                            x: 1.86,
                            y: 0.61,
                            z: 0.98
                        }
                    }
                }
            }
        }

        Plotly.newPlot(this.div, [data], layout, { responsive: true })

        const observer = new ResizeObserver(_ => Plotly.Plots.resize(document.getElementById(this.div)))
        observer.observe(document.getElementById(this.div))
    }

    // Unused for now. Have to use kepler for this
    generate() {
        const serie = normalize(Serie.create({ array: super.run(), itemSize: 1 }))
        const mm = minMax(serie)
        const algo = new MarchingCubes(new Grid(this.nx), serie.array)
        const iso = mm[0] + 0.05 * (mm[1] - mm[0])
        const geom = algo.run(iso /*, bounds */)
        console.log(geom.positions, geom.indices)
    }
}
