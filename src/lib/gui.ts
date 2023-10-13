import { Pane, TabApi } from "tweakpane"
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

export function createGUI(div: string) {
    const pane = new Pane({
        title: 'Parameters',
        container: document.getElementById(div),
    })

    const PARAMS = {
        speed: 0.5,
        quality: 0,
        k: 0,
        theme: '',
        hidden: true,
        background: { r: 255, g: 0, b: 55 },
        key: '#ff0055ff',
        offset: { x: 50, y: 25 },
        camera: { x: 0, y: 20, z: -10 },
        color: { x: 0, y: 0, z: 0, w: 1 },
        text: "0" // readonly
    }


    pane.addBinding(PARAMS, 'speed')
    pane.addBinding(PARAMS, 'speed', { min: 0, max: 100, })
    pane.addBinding(PARAMS, 'quality', {
        options: {
            low: 0,
            medium: 50,
            high: 100,
        },
    })
    pane.addBinding(PARAMS, 'k', {
        format: (v) => v.toFixed(6),
    })
    pane.addBinding(PARAMS, 'theme', {
        options: {
            none: '',
            dark: 'dark-theme.json',
            light: 'light-theme.json',
        },
    })
    pane.addBinding(PARAMS, 'hidden')
    pane.addBinding(PARAMS, 'background')
    pane.addBinding(PARAMS, 'key', {
        picker: 'inline',
        expanded: true,
    })
    pane.addBinding(PARAMS, 'offset')
    pane.addBinding(PARAMS, 'camera', {
        y: { step: 10 },
        z: { max: 0 },
    })
    pane.addBinding(PARAMS, 'color', {
        x: { min: 0, max: 1 },
        y: { min: 0, max: 1 },
        z: { min: 0, max: 1 },
        w: { min: 0, max: 1 },
    })

    const f1 = pane.addFolder({
        title: 'More',
    })

    const btn = f1.addButton({
        title: 'Increment',
        label: 'counter',   // optional
    })
    let count = 0

    btn.on('click', () => {
        count += 1;
        PARAMS.text = count.toString()
    })

    pane.addBinding(PARAMS, 'text', {
        readonly: true,
    })
}
