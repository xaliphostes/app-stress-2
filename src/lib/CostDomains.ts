import {
    Bounds, Data, FullParameterSpace,
    ParameterSpace, RandomDomain2D
} from "../../../stress/src/lib"

import { Engine } from "../../../stress/src/lib/geomeca"
import { scatterSubPlots } from "./scatterSubPlots"

export class CostDomains {
    private div = ''
    private engine: Engine = undefined
    private space: ParameterSpace = undefined
    private domains: RandomDomain2D[] = []
    private markerSize = 5
    private colorScale = 'Portland'

    constructor({ div, engine }: { div: string, engine: Engine }) {
        this.engine = engine
        this.div = div

        this.space = new FullParameterSpace({ engine: this.engine })
        this.domains.push(this.generateDomain('R', 'R'))
        this.domains.push(this.generateDomain('R', 'psi'))
        this.domains.push(this.generateDomain('R', 'theta'))
        this.domains.push(this.generateDomain('R', 'phi'))
        this.domains.push(this.generateDomain('psi', 'R'))
        this.domains.push(this.generateDomain('psi', 'psi'))
        this.domains.push(this.generateDomain('psi', 'theta'))
        this.domains.push(this.generateDomain('psi', 'phi'))
        this.domains.push(this.generateDomain('theta', 'R'))
        this.domains.push(this.generateDomain('theta', 'psi'))
        this.domains.push(this.generateDomain('theta', 'theta'))
        this.domains.push(this.generateDomain('theta', 'phi'))
        this.domains.push(this.generateDomain('phi', 'R'))
        this.domains.push(this.generateDomain('phi', 'psi'))
        this.domains.push(this.generateDomain('phi', 'theta'))
        this.domains.push(this.generateDomain('phi', 'phi'))
    }

    changeSampling(n: number) {
        this.domains.forEach( domain => {
            domain.setSampling(Math.round(n))
        })
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

    setData(data: Data[]) {
        this.space.setData(data)
    }

    generate() {
        const domains = this.domains.map( domain => {
            return {
                x: domain.x(),
                y: domain.y(),
                data: domain.run()
            }
        })

        const args = {
            div: this.div,
            width: 1000,
            height: 1000,
            markerSize: this.markerSize,
            colorScale: this.colorScale,
            data: domains,
            grid: {
                rows: 4,
                columns: 4,
                pattern: 'independent'
            }
        }

        scatterSubPlots(args)
    }

    private static getBounds(name: string) {
        switch(name) {
            case 'R': return [0,1]
            case 'psi': return [0,180]
            case 'theta': return [0,180]
            case 'phi': return [0,180]
        }
    }

    private generateDomain(x: string, y: string) {
        let xAxis = {
            bounds: CostDomains.getBounds(x) as Bounds,
            name: x
        }
        let yAxis = {
            bounds: CostDomains.getBounds(y) as Bounds,
            name: y
        }
        return new RandomDomain2D({
            space: this.space,
            xAxis: xAxis,
            yAxis: yAxis,
            n: 1000
        })
    }
}
