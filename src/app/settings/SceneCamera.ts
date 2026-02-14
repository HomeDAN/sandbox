import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {App} from "../App.ts";

export class SceneCamera {
    camera: THREE.PerspectiveCamera;
    orbitControls: OrbitControls;
    private readonly app: App;

    constructor() {

        this.app = App.getInstance()

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        this.orbitControls = new OrbitControls(this.camera, this.app.domElement);
        this.setCamera()
        this.setCameraGUI()
    }

    private setCameraGUI() {
        this.app.debug?.addFolder("🎥 CAMERA")
            .addControls(this.camera, 'position')
            .addSlider(this.camera, "fov", 1, 180, 75)
            .addSlider(this.camera, "far", 0.1, 50, 100)
            .addSlider(this.camera, "near", 0.1, 50, 0.1);
    }

    setCamera() {
        this.camera.position.set(0, 10, 20);

        this.orbitControls.target.set(0, 5, 0);
        this.orbitControls.update();
    }

    getCamera() {
        return this.camera;
    }

    updateOrbitControls() {
        return this.orbitControls.update();
    }

}