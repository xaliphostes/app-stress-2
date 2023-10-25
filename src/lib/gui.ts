import { ListBladeApi, Pane, SliderBladeApi } from "tweakpane"
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { parameters } from "./parameters"
import { domainBouds } from "./CostDomain"
import { colorTables } from "./colorTables"

export function createGUI(div: string) {

    const model = parameters.model
    const domain = parameters.domain
    const domains = parameters.domains

    // ---------------------------------------------------------------------------------
    {
        const upload = document.getElementById('upload') as HTMLInputElement
        upload.onchange = () => {
            upload.files[0].arrayBuffer().then(arrayBuffer => {
                model.addDataFromBuffer(arrayBuffer)
            })
        }
    }
    // ---------------------------------------------------------------------------------

    const pane = new Pane({
        title: 'Parameters',
        container: document.getElementById(div),
    })
    pane.registerPlugin(EssentialsPlugin)

    // -------------------------------------
    //          Data
    // -------------------------------------

    const datas = pane.addFolder({
        title: 'Data',
    })
    datas.addButton({
        title: 'Upload data',
    }).on('click', () => document.getElementById('upload').click()) // simulate a click

    datas.addButton({
        title: 'Info'
    }).on('click', () => {
    })

    datas.addButton({
        title: 'Clear'
    }).on('click', () => model.clear())

    // -------------------------------------
    //          Simulation
    // -------------------------------------

    const simulation = pane.addFolder({
        title: 'Simulation',
    })
    simulation.addBlade({
        view: 'slider',
        label: 'Iterations',
        min: 100,
        max: 100000,
        value: 1000,
    })
    simulation.addButton({
        title: 'Run'
    }).on('click', () => model.run())


    // -------------------------------------
    //          Domain
    // -------------------------------------

    {
        const domai = pane.addFolder({
            title: 'Domain',
        })
        let list = domai.addBlade({
            view: 'list',
            label: 'X axis',
            options: [
                { text: 'R', value: 'R' },
                { text: 'ψ', value: 'psi' },
                { text: 'θ', value: 'theta' },
                { text: 'φ', value: 'phi' }
            ],
            value: 'R',
        }) as ListBladeApi<string>
        list.on('change', (e) => {
            const axisName = e.value
            if (domain.axis('y').name !== axisName) {
                domain.changeAxis('x', axisName, domainBouds[axisName])
            }
        })

        list = domai.addBlade({
            view: 'list',
            label: 'Y axis',
            options: [
                { text: 'R', value: 'R' },
                { text: 'ψ', value: 'psi' },
                { text: 'θ', value: 'theta' },
                { text: 'φ', value: 'phi' }
            ],
            value: 'theta'
        }) as ListBladeApi<string>
        list.on('change', (e) => {
            const axisName = e.value
            if (domain.axis('x').name !== axisName) {
                domain.changeAxis('y', axisName, domainBouds[axisName])
            }
        })

        const slider = domai.addBlade({
            view: 'slider',
            label: 'Sampling',
            min: 100,
            max: 10000,
            step: 1,
            value: 1000,
        }) as SliderBladeApi
        slider.on('change', (e) => {
            domain.changeSampling(e.value)
        })

        const slider2 = domai.addBlade({
            view: 'slider',
            label: 'Point size',
            min: 1,
            max: 10,
            step: 1,
            value: 5,
        }) as SliderBladeApi
        slider2.on('change', (e) => {
            domain.changeMarkerSize(e.value)
        })

        const colorScales = domai.addBlade({
            view: 'list',
            label: 'Color table',
            options: colorTables.map( name => {
                return {
                    text: name,
                    value: name
                }
            }),
            value: 'Portland'
        }) as ListBladeApi<string>
        colorScales.on('change', (e) => {
            domain.changeColorScale(e.value)
        })

        domai.addButton({
            title: 'Generate domain'
        }).on('click', () => model.updateDomain())
    }
    // -------------------------------------
    //          Domains
    // -------------------------------------

    {
        const domai = pane.addFolder({
            title: 'Domains',
        })
        const slider = domai.addBlade({
            view: 'slider',
            label: 'Sampling',
            min: 100,
            max: 10000,
            step: 1,
            value: 1000,
        }) as SliderBladeApi
        slider.on('change', (e) => {
            domains.changeSampling(e.value)
        })

        const slider2 = domai.addBlade({
            view: 'slider',
            label: 'Point size',
            min: 1,
            max: 10,
            step: 1,
            value: 5,
        }) as SliderBladeApi
        slider2.on('change', (e) => {
            domains.changeMarkerSize(e.value)
        })

        const colorScales = domai.addBlade({
            view: 'list',
            label: 'Color table',
            options: colorTables.map( name => {
                return {
                    text: name,
                    value: name
                }
            }),
            value: 'Portland'
        }) as ListBladeApi<string>
        colorScales.on('change', (e) => {
            domains.changeColorScale(e.value)
        })

        domai.addButton({
            title: 'Generate domain'
        }).on('click', () => model.updateDomains())
    }

    // -------------------------------------
    //          Histogram...
    // -------------------------------------
    const histo = pane.addFolder({
        title: 'Histogram',
    })
    const h = histo.addBlade({
        view: 'slider',
        label: 'Nb bins',
        min: 2,
        max: 20,
        value: 10
    }) as SliderBladeApi
    h.on('change', (e) => {
    })
}
