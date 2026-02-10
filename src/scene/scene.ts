import * as THREE from 'three';
import {AnimationMixer, Mesh, MeshBasicMaterial, SRGBColorSpace, TextureLoader} from 'three';
import {SceneCamera} from "./parts/camera.ts";
import {SceneLight} from "./parts/light.ts";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

import {Pane} from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';

// @ts-ignore
// TODO вынести в Debug
import * as SPECTOR from 'spectorjs';

const spector = new SPECTOR.Spector();
spector.displayUI();


export class Scene {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    $dom: Element | null;
    gui: Pane;
    camera: SceneCamera;
    light: SceneLight;
    mixer: AnimationMixer | undefined;
    clock: any;
    textureLoader: TextureLoader;
    dracoLoader: DRACOLoader;
    gltfLoader: GLTFLoader;

    constructor($dom: Element | null) {
        this.$dom = $dom
        this.scene = new THREE.Scene();

        this.gui = new Pane()
        this.gui.registerPlugin(EssentialsPlugin)

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.textureLoader = new THREE.TextureLoader();
        this.dracoLoader = new DRACOLoader();
        this.gltfLoader = new GLTFLoader();

        this.camera = new SceneCamera(this.renderer.domElement, this.gui)
        this.light = new SceneLight(this.scene, this.gui)
        this.clock = new THREE.Clock();
        this.renderer.setAnimationLoop(this.animate.bind(this));
        this.loadModel()
    }

    getDOMElement(): HTMLCanvasElement {
        return this.renderer.domElement;
    }

    loadModel = () => {
        this.dracoLoader.setDecoderPath('/draco/');
        this.gltfLoader.setDRACOLoader(this.dracoLoader)

        const texture = this.textureLoader.load('/texture.png')
        texture.flipY = false
        texture.colorSpace = SRGBColorSpace

        const bakedMaterial = new MeshBasicMaterial({map: texture});

        this.gltfLoader.load('/tank_head.glb', (gltf) => {

            gltf.scene.traverse((child) => {
                const mesh = child as Mesh;

                mesh.material = bakedMaterial;
            })

            this.scene.add(gltf.scene);
        })
    }

    animate = () => {
        this.camera.updateOrbitControls();

        if (this.mixer) {
            const delta = this.clock ? this.clock.getDelta() : 0.016;
            this.mixer.update(delta);
        }
        this.renderer.render(this.scene, this.camera.getCamera());
    }
}