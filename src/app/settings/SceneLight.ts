import * as THREE from 'three';
import {AmbientLight, DirectionalLight, DirectionalLightHelper} from 'three';

import {App} from "../App.ts";

export class SceneLight {
    ambientLight: AmbientLight;
    directionalLight: DirectionalLight;
    directionalLightHelper: DirectionalLightHelper;
    private readonly app: App;

    constructor() {

        this.app = App.getInstance()

        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 5);
        this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight);

        this.setDirectionalLight()
        this.setDirectionalLightGUI()
    }

    setDirectionalLight() {

        this.directionalLight.position.set(0, 10, 0);
        this.directionalLight.target.position.set(5, 0, 0);
        this.directionalLight.castShadow = true;

        this.app.scene.add(this.directionalLight);
        this.app.scene.add(this.directionalLight.target);
        this.app.scene.add(this.directionalLightHelper);
    }

    setDirectionalLightGUI() {
        this.app.debug?.addFolder("🔦 DIRECTIONAL LIGHT")
            .addControls(this.directionalLight, "visible", { visible: true })
            .addColor(this.directionalLight, this.directionalLight.color, "color")
            .addSlider(this.directionalLight, "intensity", 0, 5, 0.1)

        this.app.scene.add(this.directionalLight);
    }
}