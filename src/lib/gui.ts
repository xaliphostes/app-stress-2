import { ListBladeApi, Pane, SliderBladeApi } from "tweakpane"
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { parameters } from "./parameters"
import { domainBouds } from "./CostDomain"
import { colorTables } from "./colorTables"
import { AxeSwitcher } from "./AxeSwitcher"
import { Bounds } from "../../../stress/src/lib"

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

        let x = undefined
        let y = undefined
        let sx = undefined
        let sy = undefined
        const switcher = new AxeSwitcher()

        function changeSlider(s: SliderBladeApi, axisName: string, label: string) {
            s.label = label
            s.min = domainBouds[axisName][0]
            s.max = domainBouds[axisName][1]
        }

        // ----------------------------------------

        x = domai.addBlade({
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
        x.on('change', (e) => {
            const axisName = e.value
            if (domain.axis('y').name !== axisName) {
                if (switcher.setX(axisName)) {
                    domain.changeAxis('x', axisName, domainBouds[axisName])
                    changeSlider(sx, switcher.sx, switcher.getSx())
                    changeSlider(sy, switcher.sy, switcher.getSy())
                }
                else {
                    x.value = switcher.x
                }
            }
            else {
                x.value = switcher.x
            }
        })

        // ----------------------------------------

        y = domai.addBlade({
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
        y.on('change', (e) => {
            const axisName = e.value
            if (domain.axis('x').name !== axisName) {
                if (switcher.setY(axisName)) {
                    domain.changeAxis('y', axisName, domainBouds[axisName])
                    changeSlider(sx, switcher.sx, switcher.getSx())
                    changeSlider(sy, switcher.sy, switcher.getSy())
                }
                else {
                    y.value = switcher.y
                }
            }
            else {
                y.value = switcher.y
            }
        })

        // ----------------------------------------

        sx = domai.addBlade({
            view: 'slider',
            label: 'ψ',
            min: 0,
            max: 180,
            step: 1,
            value: 0,
        }) as SliderBladeApi
        sx.on('change', (e) => {
            domain.setParameter(switcher.sx, e.value)
        })

        // ----------------------------------------

        sy = domai.addBlade({
            view: 'slider',
            label: 'φ',
            min: 0,
            max: 180,
            step: 1,
            value: 0,
        }) as SliderBladeApi
        sy.on('change', (e) => {
            domain.setParameter(switcher.sy, e.value)
        })

        domai.addBlade({
            view: 'separator',
        });

        domai.addButton({
            title: 'Generate domain'
        }).on('click', () => model.updateDomain())

        // ----------------------------------------

        const domaiFolder = domai.addFolder({
            title: 'Visu',
        })

        // ----------------------------------------

        const slider = domaiFolder.addBlade({
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

        // ----------------------------------------

        const slider2 = domaiFolder.addBlade({
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

        // ----------------------------------------

        const colorScales = domaiFolder.addBlade({
            view: 'list',
            label: 'Color table',
            options: colorTables.map(name => {
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

        domaiFolder.expanded = false
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
            options: colorTables.map(name => {
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

        domai.expanded = false
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

    histo.expanded = false
}
