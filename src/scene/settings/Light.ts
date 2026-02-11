import * as THREE from 'three';
import {AmbientLight, DirectionalLight, DirectionalLightHelper} from 'three';

import {Debug} from "./Debug.ts";

export class SceneLight {
    scene;
    ambientLight: AmbientLight;
    directionalLight: DirectionalLight;
    directionalLightHelper: DirectionalLightHelper;
    debug: Debug;

    constructor(scene: THREE.Scene, debug: Debug) {
        this.scene = scene;
        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 5);
        this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight);
        this.debug = debug;

        this.setDirectionalLight()
        this.setDirectionalLightGUI()
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
        this.debug.addFolder("🔦 DIRECTIONAL LIGHT")
            .addControls(this.directionalLight, "visible", { visible: true })
            .addColor(this.directionalLight, this.directionalLight.color, "color")
            .addSlider(this.directionalLight, "intensity", 0, 5, 0.1)

        this.scene.add(this.directionalLight);
    }
}