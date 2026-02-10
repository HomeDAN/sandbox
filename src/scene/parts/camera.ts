import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {MinMaxGUIHelper} from "../../helpers/minMaxGUIHelper.ts";
import {Pane} from "tweakpane";

export class SceneCamera {
    camera: THREE.PerspectiveCamera;
    orbitControls: OrbitControls;
    gui: Pane;

    constructor(domElement: HTMLCanvasElement, gui: Pane) {
        this.gui = gui;
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        this.orbitControls = new OrbitControls(this.camera, domElement);
        this.setCamera()
        this.setCameraGUI()
    }

    setCamera() {
        this.camera.position.set(0, 10, 20);

        this.orbitControls.target.set(0, 5, 0);
        this.orbitControls.update();
    }

    setCameraGUI() {
        const PARAMS = {
            speed: 50,
        };

        this.gui.addBinding(PARAMS, 'speed', {
            min: 0,
            max: 100,
        })

        const cameraFolder = this.gui.addFolder("CAMERA")
        cameraFolder.add(this.camera, 'fov', 1, 180).onChange(this.updateCamera);
        const minMaxGUIHelper = new MinMaxGUIHelper(this.camera, 'near', 'far', 0.1);
        cameraFolder.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(this.updateCamera);
        cameraFolder.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(this.updateCamera);
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