import * as THREE from 'three';
import {type BindingParams, Pane} from "tweakpane";
import type {FolderApiEvents} from "@tweakpane/core";
import * as EssentialsPlugin from "@tweakpane/plugin-essentials";

export class Debug {
    GUI: Pane;
    constructor() {
        this.GUI = new Pane()
        this.GUI.registerPlugin(EssentialsPlugin)
    }

    addFolder(title: string) {

        this.GUI.addFolder({ title })

        return this
    }

    addControls(object: any, key: string, params: BindingParams) {

        this.GUI.addBinding(object, key, params)

        return this
    }

    addColorGUI(object: any, color: THREE.Color, label: string) {

        this.GUI.addBinding(
            { color: color.getHex(THREE.SRGBColorSpace) },
            'color',
            { label, view: 'color' })
            .on('change', tweak => {
                object.color.set(tweak.value)
            })

        return this
    }

    addSlider(object: any, label: string, min: number, max: number, value: number) {

        this.GUI.addBlade({
            view: 'slider',
            label,
            min,
            max,
            value,
        }).on('change', (e: FolderApiEvents['change']) => {
            object[label] = e.value;
            object.updateProjectionMatrix()
        })

        return this
    }

}