import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {Debug} from "./Debug.ts";

export class SceneCamera {
    camera: THREE.PerspectiveCamera;
    orbitControls: OrbitControls;
    debug: Debug;

    constructor(domElement: HTMLCanvasElement, debug: Debug) {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        this.orbitControls = new OrbitControls(this.camera, domElement);
        this.debug = debug;
        this.setCamera()
        this.setCameraGUI()
    }

    setCamera() {
        this.camera.position.set(0, 10, 20);

        this.orbitControls.target.set(0, 5, 0);
        this.orbitControls.update();
    }

    setCameraGUI() {
        this.debug.addFolder("CAMERA 🎥")
            .addControls(this.camera, 'position', {fov: {x: 0, y: 0, z: 0}})
            .addSlider(this.camera, "fov", 1, 180, 1)
            .addSlider(this.camera, "far", 0.1, 50, 0.1)
            .addSlider(this.camera, "near", 0.1, 50, 0.1)

    }

    getCamera() {
        return this.camera;
    }

    updateOrbitControls() {
        return this.orbitControls.update();
    }

    updateCamera = () => {
        this.camera.updateProjectionMatrix();
    }
}