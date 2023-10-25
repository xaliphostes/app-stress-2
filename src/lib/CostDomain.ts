import {
    Axis, Bounds, Data, FullParameterSpace,
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
    private domain: RandomDomain2D = undefined
    private space: ParameterSpace = undefined
    private xAxis: Axis
    private yAxis: Axis
    private markerSize = 5
    private colorScale = 'Portland'

    constructor({ div, engine }: { div: string, engine: Engine }) {
        this.engine = engine
        this.div = div

        this.space = new FullParameterSpace({ engine: this.engine })

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

    setData(data: Data[]) {
        this.space.setData(data)
    }

    generate() {
        const z = this.domain.run()
        console.log(minMaxArray(z))

        scatterPlot({
            div: this.div,
            x: this.domain.x(),
            y: this.domain.y(),
            data: z,
            markerSize: this.markerSize,
            colorScale: this.colorScale
        })
    }
}
