import * as THREE from 'three';
import {TextureLoader} from 'three';
import {SceneCamera} from "./settings/SceneCamera.ts";
import {SceneLight} from "./settings/SceneLight.ts";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

// @ts-ignore
// TODO вынести в Debug
import * as SPECTOR from 'spectorjs';
import {Debug} from "./settings/Debug.ts";
import {Ticker} from "./Ticker.ts";
import {Experience} from "./experience/Experience.ts";
import {Render} from "./Render.ts";

const spector = new SPECTOR.Spector();
spector.displayUI();

export class App {
    scene: THREE.Scene;
    $dom: Element | null;
    camera: SceneCamera;
    light: SceneLight;
    textureLoader: TextureLoader;
    dracoLoader: DRACOLoader;
    gltfLoader: GLTFLoader;
    debug: Debug;
    ticker: Ticker;
    experience: Experience;
    render: Render;
    domElement: HTMLCanvasElement;
    static instance: App;

    static getInstance()
    {
        return App.instance
    }

    constructor($dom: Element | null) {

        App.instance = this

        this.$dom = $dom
        this.scene = new THREE.Scene();
        this.debug = new Debug();
        this.render = new Render();
        this.domElement = this.render.getDOMElement()
        this.ticker = new Ticker()

        this.textureLoader = new THREE.TextureLoader();
        this.dracoLoader = new DRACOLoader();
        this.gltfLoader = new GLTFLoader();

        this.camera = new SceneCamera()
        this.light = new SceneLight()

        this.experience = new Experience()
    }
}