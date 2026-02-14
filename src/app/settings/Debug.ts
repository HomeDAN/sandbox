import * as THREE from 'three';
import {type BindingParams, Pane} from "tweakpane";
import type {FolderApiEvents} from "@tweakpane/core";
import * as EssentialsPlugin from "@tweakpane/plugin-essentials";
import type {Bindable} from "@tweakpane/core/src/common/binding/target.ts";
import * as SPECTOR from 'spectorjs';

const spector = new SPECTOR.Spector();

export class Debug {
    GUI: Pane;
    constructor() {
        this.GUI = new Pane()
        this.GUI.registerPlugin(EssentialsPlugin)
        spector.displayUI();
    }

    addFolder(title: string) {
        const folder = this.GUI.addFolder({title});

        // Создаем объект с методами для работы с папкой
        const folderAPI = {
            addControls: (object: Bindable, key: string, params?: BindingParams) => {
                folder.addBinding(object, key, params);
                return folderAPI;
            },

            addColor: (object: Bindable, color: THREE.Color, label: string) => {
                folder.addBinding(
                    {color: color.getHex(THREE.SRGBColorSpace)},
                    'color',
                    {label, view: 'color'}
                ).on('change', tweak => {
                    object.color.set(tweak.value)
                });
                return folderAPI;
            },

            addSlider: (object: Bindable, label: string, min: number, max: number, value: number) => {
                folder.addBlade({
                    view: 'slider',
                    label,
                    min,
                    max,
                    value,
                }).on('change', (e: FolderApiEvents['change']) => {
                    object[label] = e.value;
                    if (object.updateProjectionMatrix) {
                        object.updateProjectionMatrix()
                    }
                });
                return folderAPI;
            },
        };

        return folderAPI;
    }

}