import {
    trimAll, DataFactory, Data,
    InverseMethod, displayMatrix3x3
}
from '../../../stress/src/lib/'
// from '../../libs/stress' // '../../../stress/src/lib/utils/trimAlls'

export class Model {
    private data: Data[] = []

    addData(arrayBuffer: ArrayBuffer) {
        const lines = new TextDecoder().decode(arrayBuffer).split('\n')

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
                alert(`Unknown data type "${toks[1]}" for data id ${toks[0]}`)
                continue
            }

            const result = data.initialize([toks])
            if (result.status === false) {
                result.messages.forEach(msg => console.log(msg))
                alert('An error occured. Read the console.')
            }
            else {
                this.data.push(data)
            }
        }

        console.log(this.data)
    }

    run() {
        const inv = new InverseMethod()
        inv.addData(this.data)
        const r = inv.run()

        const stress = r.stressTensorSolution

        const info = document.getElementById("info")


        const t = `
        <table>
            <thead>
            <tr>
                <th colspan="2">Inversion results</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Misfit</td>
                <td>${r.misfit}</td>
            </tr>
            <tr>
                <td>R</td>
                <td>${r.stressRatio}</td>
            </tr>
            </tbody>
        </table>`

        info.innerHTML = t
        
        // `Misfit: ${r.misfit}<br>
        //     R: ${r.stressRatio}<br>
        //     Stress tensor:<br>
        //     ${stress[0][0].toFixed(3)} ${stress[0][1].toFixed(3)} ${stress[0][2].toFixed(3)}<br>
        //     ${stress[1][0].toFixed(3)} ${stress[1][1].toFixed(3)} ${stress[1][2].toFixed(3)}<br>
        //     ${stress[2][0].toFixed(3)} ${stress[2][1].toFixed(3)} ${stress[2][2].toFixed(3)}<br>`
    }

    clear() {
        console.log('clearing the model')
        this.data = []
    }
}