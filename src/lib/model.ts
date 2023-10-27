import { trimAll, DataFactory, Data, InverseMethod, MisfitCriteriunSolution } from '../../../stress/src/lib'
import { parameters } from './parameters'

export class Model {
    private inv: InverseMethod = undefined
    // private domain: CostDomain = undefined

    constructor() {
        this.inv = new InverseMethod()
        // this.domain = new CostDomain({div: 'divDomain', engine: this.inv.engine})
    }

    get engine() {
        return this.inv.engine
    }

    addData(data: Data[]) {
        this.inv.addData(data)
    }

    addDataFromBuffer(arrayBuffer: ArrayBuffer) {
        let buffer = new TextDecoder().decode(arrayBuffer)
        const lines = buffer.split('\n')
        buffer = buffer.substring(buffer.indexOf('\n') + 1)

        let ok = true
        const datas: Data[] = []

        for (let i = 1; i < lines.length; ++i) {
            const line = trimAll(lines[i].trim())
            if (line.length === 0) {
                continue
            }

            const toks = line.split(';').map(s => s.replace(',', '.'))
            if (toks.length === 0) {
                continue
            }

            const data = DataFactory.create(toks[1])

            if (data === undefined) {
                document.getElementById("info").innerHTML = `<p>Unknown data type "${toks[1]}" for data id ${toks[0]}</p>
                <br>
                Original file:
                <textarea style="width: 100%" cols="50" rows="10" class="numbered">${buffer}</textarea>`
                continue
            }

            const result = data.initialize([toks])
            if (result.status === false) {
                ok = false
                let t = ''
                result.messages.forEach((msg: string) => t += `<p>${msg}</p>`)
                document.getElementById("info").innerHTML = t
            }
            else {
                datas.push(data)
            }
        }

        if (ok) {
            document.getElementById("logs").innerHTML = `<p>Loaded ${datas.length} data</p>`
            this.addData(datas) // i.e., in this.inv
            parameters.domain.setData(datas)
            parameters.domains.setData(datas)
            parameters.domain3D.setData(datas)
        }
    }

    run() {
        this.displayResults(this.inv.run())
    }

    updateDomain() {
        parameters.domain.generate()
    }

    updateDomains() {
        parameters.domains.generate()
    }

    clear() {
        console.log('clearing the model')
        this.inv.clearData()
    }

    displayResults(solution: MisfitCriteriunSolution) {
        const stress = solution.stressTensorSolution

        document.getElementById("info").innerHTML = `<div>
            <center><h3>Inversion results</h3></center>
            <table>
                <tbody>
                    <tr>
                        <td>Misfit</td>
                        <td><code>${solution.misfit.toFixed(2)} </code></td>
                    </tr>
                    <tr>
                        <td>R</td>
                        <td><code>${solution.stressRatio.toFixed(2)}</code></td>
                    </tr>
                </tbody>
            </table>
            <br>
            <div>
                <math>
                    <mrow>
                        <mo>&sigma; =</mo>
                        <mo>[</mo>
                        <mtable>
                            <mtr>
                                <mtd><mn>${stress[0][0].toFixed(3)}</mn></mtd>
                                <mtd><mn>${stress[0][1].toFixed(3)}</mn></mtd>
                                <mtd><mn>${stress[0][2].toFixed(3)}</mn></mtd>
                            </mtr>
                            
                            <mtr>
                                <mtd><mn>${stress[1][0].toFixed(3)}</mn></mtd>
                                <mtd><mn>${stress[1][1].toFixed(3)}</mn></mtd>
                                <mtd><mn>${stress[1][2].toFixed(3)}</mn></mtd>
                            </mtr>
                            
                            <mtr>
                                <mtd><mn>${stress[2][0].toFixed(3)}</mn></mtd>
                                <mtd><mn>${stress[2][1].toFixed(3)}</mn></mtd>
                                <mtd><mn>${stress[2][2].toFixed(3)}</mn></mtd>
                            </mtr>
                        </mtable>
                        <mo>]</mo>
                    </mrow>
                </math>
            </div>
        </div>`
    }
}
