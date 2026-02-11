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
        const folder = this.GUI.addFolder({title});

        // Создаем объект с методами для работы с папкой
        const folderAPI = {
            addControls: (object: any, key: string, params?: BindingParams) => {
                folder.addBinding(object, key, params);
                return folderAPI;
            },

            addColor: (object: any, color: THREE.Color, label: string) => {
                folder.addBinding(
                    {color: color.getHex(THREE.SRGBColorSpace)},
                    'color',
                    {label, view: 'color'}
                ).on('change', tweak => {
                    object.color.set(tweak.value)
                });
                return folderAPI;
            },

            addSlider: (object: any, label: string, min: number, max: number, value: number) => {
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

            // Вернуть оригинальную папку, если нужно
            getFolder: () => folder
        };

        return folderAPI;
    }

}