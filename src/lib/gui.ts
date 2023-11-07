import { ListBladeApi, Pane, SliderBladeApi } from "tweakpane"
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { parameters } from "./parameters"
import { domainBouds } from "./CostDomain2D"
import { colorTables } from "./colorTables"
import { AxeSwitcher } from "./AxeSwitcher"
import { MenuBuilder } from "./MenuBuilder"
import { FolderSwitcher } from "./FolderSwitcher"

export function createGUI(div: string) {

    const menu = new MenuBuilder("rmenu")
    menu.add("m1", ["fa-solid", "fa-phone"], (e) => console.log(e))
    menu.add("m1", ["fa-solid", "fa-comment-dots"], (e) => console.log(e))

    const model = parameters.model
    const domain = parameters.domain
    const domains = parameters.domains

    const folderSwitcher = new FolderSwitcher()

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
    {
        const dataFolder = pane.addFolder({
            title: 'Data',
        })
        dataFolder.addButton({
            title: 'Upload data',
        }).on('click', () => document.getElementById('upload').click()) // simulate a click

        dataFolder.addButton({
            title: 'Info'
        }).on('click', () => {
        })

        dataFolder.addButton({
            title: 'Clear'
        }).on('click', () => model.clear())

        folderSwitcher.addFolder(dataFolder)
    }

    // -------------------------------------
    //          Simulation
    // -------------------------------------

    {
        const simulFolder = pane.addFolder({
            title: 'Simulation',
        })
        simulFolder.addBlade({
            view: 'slider',
            label: 'Iterations',
            min: 100,
            max: 100000,
            value: 1000,
        })
        simulFolder.addButton({
            title: 'Run'
        }).on('click', () => model.run())

        folderSwitcher.addFolder(simulFolder)
    }

    // -------------------------------------
    //          Domain
    // -------------------------------------

    {
        const domainFolder = pane.addFolder({
            title: 'Domain',
        })

        const TEST = {
            show: true
        }
        domainFolder.addBinding(TEST, 'show')

        let x = undefined
        let y = undefined
        let sx = undefined
        let sy = undefined
        const switcher = new AxeSwitcher()

        function changeSlider(s: SliderBladeApi, axisName: string, label: string) {
            s.label = label
            s.min = domainBouds[axisName][0]
            s.max = domainBouds[axisName][1]
            s.value = domain.getParameter(axisName)
        }

        // ----------------------------------------

        x = domainFolder.addBlade({
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

        y = domainFolder.addBlade({
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

        sx = domainFolder.addBlade({
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

        sy = domainFolder.addBlade({
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

        const smin = domainFolder.addBlade({
            view: 'slider',
            label: 'Min',
            min: 0,
            max: 10,
            step: 0.1,
            value: 0,
        }) as SliderBladeApi
        smin.on('change', (e) => {
            domain.zmin = e.value
            domain.generate()
        })

        const smax = domainFolder.addBlade({
            view: 'slider',
            label: 'Max',
            min: 0,
            max: 10,
            step: 0.1,
            value: 2,
        }) as SliderBladeApi
        smax.on('change', (e) => {
            domain.zmax = e.value
            domain.generate()
        })

        const space = domainFolder.addBlade({
            view: 'slider',
            label: 'Spacing',
            min: 2,
            max: 100,
            step: 1,
            value: 1,
        }) as SliderBladeApi
        space.on('change', (e) => {
            domain.nbr = e.value
            domain.generate()
        })

        domainFolder.addBlade({
            view: 'separator',
        });

        domainFolder.addBinding(domain, 'min', { label: 'Real min', readonly: true })
        domainFolder.addBinding(domain, 'max', { label: 'Real max', readonly: true })

        const colorScales = domainFolder.addBlade({
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

        domainFolder.addButton({
            title: 'Generate domain'
        }).on('click', () => model.updateDomain())

        folderSwitcher.addFolder(domainFolder)

        // ----------------------------------------

        // const domainFolder2 = domainFolder.addFolder({
        //     title: 'Visu',
        // })

        // ----------------------------------------

        // const slider = domainFolder2.addBlade({
        //     view: 'slider',
        //     label: 'Sampling',
        //     min: 100,
        //     max: 10000,
        //     step: 1,
        //     value: 1000,
        // }) as SliderBladeApi
        // slider.on('change', (e) => {
        //     domain.changeSampling(e.value)
        // })

        // // ----------------------------------------

        // const slider2 = domainFolder2.addBlade({
        //     view: 'slider',
        //     label: 'Point size',
        //     min: 1,
        //     max: 10,
        //     step: 1,
        //     value: 5,
        // }) as SliderBladeApi
        // slider2.on('change', (e) => {
        //     domain.changeMarkerSize(e.value)
        // })

        // ----------------------------------------
    }

    // -------------------------------------
    //          Domains
    // -------------------------------------

    {
        const domainsFolder = pane.addFolder({
            title: 'Domains',
        })
        const slider = domainsFolder.addBlade({
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

        const slider2 = domainsFolder.addBlade({
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

        const colorScales = domainsFolder.addBlade({
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

        domainsFolder.addButton({
            title: 'Generate domain'
        }).on('click', () => model.updateDomains())

        folderSwitcher.addFolder(domainsFolder)
    }

    // -------------------------------------
    //          Histogram...
    // -------------------------------------
    {
        const histoFolder = pane.addFolder({
            title: 'Histogram',
        })
        const h = histoFolder.addBlade({
            view: 'slider',
            label: 'Nb bins',
            min: 2,
            max: 20,
            value: 10
        }) as SliderBladeApi
        h.on('change', (e) => {
        })

        folderSwitcher.addFolder(histoFolder)
    }

    // -------------------------------------
    //          Iso surface...
    // -------------------------------------
    {
        const isoFolder  = pane.addFolder({
            title: 'Cube 3D',
        })
        const h = isoFolder.addBlade({
            view: 'slider',
            label: 'N',
            min: 5,
            max: 100,
            value: 20
        }) as SliderBladeApi
        h.on('change', (e) => {
            parameters.domain3D.n = e.value
            parameters.domain3D.plot()
        })

        const R = isoFolder.addBlade({
            view: 'slider',
            label: 'R',
            min: 0,
            max: 1,
            value: 0.01
        }) as SliderBladeApi
        R.on('change', (e) => {
            parameters.domain3D.R = e.value
            parameters.domain3D.plot()
        })

        const iso = isoFolder.addBlade({
            view: 'slider',
            label: 'Iso',
            min: 0,
            max: 1,
            step: 0.01,
            value: 0.1
        }) as SliderBladeApi
        iso.on('change', (e) => {
            parameters.domain3D.iso = e.value
            parameters.domain3D.plot()
        })

        isoFolder.addButton({
            title: 'Generate'
        }).on('click', () => parameters.domain3D.plot())

        folderSwitcher.addFolder(isoFolder)
    }


    // ===============================================
    folderSwitcher.openFirst()
}
