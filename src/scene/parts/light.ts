import * as THREE from 'three';
import {AmbientLight, DirectionalLight, DirectionalLightHelper} from 'three';

import {ColorGUIHelper} from "../../helpers/colorGUIhelper.ts";
import {makeXYZGUI} from "../../helpers/xyzGUIHelper.ts";
import type {Pane} from "tweakpane";

export class SceneLight {
    gui: Pane;
    scene;
    ambientLight: AmbientLight;
    directionalLight: DirectionalLight;
    directionalLightHelper: DirectionalLightHelper;

    constructor(scene: THREE.Scene, gui: Pane) {
        this.scene = scene;
        this.gui = gui;
        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 5);
        this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight);

        // this.setAmbientLightGUI()
        // this.setDirectionalLight()
        // this.setDirectionalLightGUI()
    }

    setAmbientLightGUI() {

        const ambientLightGUI = this.gui.addFolder("AMBIENT LIGHT")

        ambientLightGUI.add(this.ambientLight, "visible")
        ambientLightGUI.addColor( new ColorGUIHelper(this.ambientLight, 'color' ), 'value' ).name( 'color' );
        ambientLightGUI.add(this.ambientLight,"intensity", 0, 10, 0.01 )

        this.scene.add(this.ambientLight);
    }

    setDirectionalLight() {

        this.directionalLight.position.set(0, 10, 0);
        this.directionalLight.target.position.set(5, 0, 0);
        this.directionalLight.castShadow = true;

        this.scene.add(this.directionalLight);
        this.scene.add(this.directionalLight.target);
        this.scene.add(this.directionalLightHelper);
    }

    setDirectionalLightGUI() {

        const directionalLightGUI = this.gui.addFolder("DIRECTIONAL LIGHT")

        directionalLightGUI.add(this.directionalLight, "visible")
        directionalLightGUI.addColor( new ColorGUIHelper(this.directionalLight, 'color' ), 'value' ).name( 'color' );
        directionalLightGUI.add(this.directionalLight,"intensity", 0, 10, 0.01 )

        makeXYZGUI( "position", this.directionalLight.position, directionalLightGUI, this.onChange );
        makeXYZGUI( "target", this.directionalLight.target.position, directionalLightGUI, this.onChange );
    }

    onChange = () => {

        this.directionalLight.target.updateMatrixWorld();
        this.directionalLightHelper.update();
    };
}