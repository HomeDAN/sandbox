import * as THREE from 'three';
import {AnimationMixer, TextureLoader} from 'three';
import {SceneCamera} from "./settings/Camera.ts";
import {SceneLight} from "./settings/Light.ts";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

// @ts-ignore
// TODO вынести в Debug
import * as SPECTOR from 'spectorjs';
import {Ground} from "./models/environment/ground/ground.ts";
import {Debug} from "./settings/Debug.ts";

const spector = new SPECTOR.Spector();
spector.displayUI();


export class Scene {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    $dom: Element | null;
    camera: SceneCamera;
    light: SceneLight;
    mixer: AnimationMixer | undefined;
    clock: any;
    textureLoader: TextureLoader;
    dracoLoader: DRACOLoader;
    gltfLoader: GLTFLoader;
    debug: Debug;

    constructor($dom: Element | null) {
        this.$dom = $dom
        this.scene = new THREE.Scene();
        this.debug = new Debug();

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.textureLoader = new THREE.TextureLoader();
        this.dracoLoader = new DRACOLoader();
        this.gltfLoader = new GLTFLoader();

        this.camera = new SceneCamera(this.renderer.domElement, this.debug)
        this.light = new SceneLight(this.scene, this.debug)
        this.clock = new THREE.Clock();
        this.renderer.setAnimationLoop(this.animate.bind(this));
        this.loadModel()
    }

    getDOMElement(): HTMLCanvasElement {
        return this.renderer.domElement;
    }

    loadModel = () => {

        new Ground(this.scene);


        // this.dracoLoader.setDecoderPath('/draco/');
        // this.gltfLoader.setDRACOLoader(this.dracoLoader)
        //
        // const texture = this.textureLoader.load('/texture.png')
        // texture.flipY = false
        // texture.colorSpace = SRGBColorSpace
        //
        // const bakedMaterial = new MeshBasicMaterial({map: texture});
        //
        // this.gltfLoader.load('/tank_head.glb', (gltf) => {
        //
        //     gltf.scene.traverse((child) => {
        //         const mesh = child as Mesh;
        //
        //         mesh.material = bakedMaterial;
        //     })
        //
        //     this.scene.add(gltf.scene);
        // })
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