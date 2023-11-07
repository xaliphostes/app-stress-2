import {
    Axis, Bounds, Data, RegularDomain2D, Domain, FullParameterSpace,
    ParameterSpace, RandomDomain2D,
    hasOwn
} from "../../../stress/src/lib"

import { Engine } from "../../../stress/src/lib/geomeca"
import { scatterPlot } from "./scatterPlot"
import { minMaxArray } from '@youwol/math'
import { triangulate, InterpolateInGrid2D } from '@youwol/geometry'
import { Serie, array } from '@youwol/dataframe'
import { doDomain } from "./doDomain"

export const domainBouds = {
    "R": [0, 1],
    "psi": [0, 180],
    "theta": [0, 180],
    "phi": [0, 180]
}

export class CostDomain {
    private div = ''
    private engine: Engine = undefined
    private domain: Domain = undefined
    private space: ParameterSpace = undefined
    private xAxis: Axis
    private yAxis: Axis
    private markerSize = 5
    private colorScale = 'Portland'
    private regular = true
    zmin = 0
    zmax = 2
    spacing_ = 0.1
    private min_ = 0
    private max_ = 2

    constructor({ div, engine, regular = true }: { div: string, engine: Engine, regular?: boolean }) {
        this.engine = engine
        this.div = div
        this.regular = regular

        this.space = new FullParameterSpace({ engine: this.engine })

        if (regular) {
            this.xAxis = {
                bounds: [0, 1] as Bounds,
                name: 'R',
            }

            this.yAxis = {
                bounds: [0, 180] as Bounds,
                name: 'theta'
            }

            this.domain = new RegularDomain2D({
                space: this.space,
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                n: 50
            })
        }
        else {
            this.xAxis = {
                bounds: [0, 1] as Bounds,
                name: 'R'
            }

            this.yAxis = {
                bounds: [0, 180] as Bounds,
                name: 'theta'
            }

            this.domain = new RandomDomain2D({
                space: this.space,
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                n: 1000
            })
        }
    }

    get min() {
        return this.min_
    }
    set min(v: number) {
        // nothing
    }
    get max() {
        return this.max_
    }
    set max(v: number) {
        // nothing
    }

    set nbr(v: number) {
        this.spacing_ = (this.max_ - this.min_) / v
    }

    changeSampling(n: number) {
        this.domain.setSampling(Math.round(n))
        this.generate()
    }

    changeMarkerSize(n: number) {
        this.markerSize = n
        this.generate()
    }

    changeColorScale(name: string) {
        this.colorScale = name
        this.generate()
    }

    axis(name: string) {
        switch (name) {
            case 'x': return this.xAxis
            case 'y': return this.yAxis
            default: throw `Axis named ${name} is undefined. Shoule be 'x' or 'y'`
        }
    }

    changeAxis(name: string, value: string, bounds: Bounds) {
        if (hasOwn(this.space, value) === false) {
            throw `parameter-space does not have property named ${value}`
        }

        switch (name) {
            case 'x': {
                this.xAxis.name = value
                this.xAxis.bounds = bounds
                break
            }
            case 'y': {
                this.yAxis.name = value
                this.yAxis.bounds = bounds
                break
            }
            default: throw `Axis named ${name} is undefined. Shoule be 'x' or 'y'`
        }

        this.generate()
    }

    /**
     * 
     * @param name A name in the parameter space (aka, introspection)
     * @param value The value
     */
    setParameter(name: string, value: number) {
        if (hasOwn(this.space, name) === false) {
            throw `parameter-space does not have property named ${name}`
        }

        // this.space.R = value
        // this.space.psi = value
        // ...
        this.space[name] = value
        this.generate()
    }

    getParameter(name: string): number {
        if (hasOwn(this.space, name) === false) {
            throw `parameter-space does not have property named ${name}`
        }
        return this.space[name]
    }

    setData(data: Data[]) {
        this.space.setData(data)
    }

    generate() {
        const z = this.domain.run()

        const mm = minMaxArray(z)
        this.min_ = mm[0]
        this.max_ = mm[1]

        if (this.regular) {
            doDomain({
                div: this.div,
                x: this.domain.x(),
                y: this.domain.y(),
                data: z,
                colorScale: this.colorScale,
                domain: this.domain,
                zmin: this.zmin,
                zmax: this.zmax,
                spacing: this.spacing_
            })
        }
        else {
            scatterPlot({
                div: this.div,
                x: this.domain.x(),
                y: this.domain.y(),
                data: z,
                colorScale: this.colorScale,
                markerSize: this.markerSize
            })
        }
    }
}
