import {App} from "../App.ts";
import {WebGPURenderer} from "three/webgpu";

export class Render {
    renderer: WebGPURenderer;
    private readonly app: App;

    constructor() {

        this.app = App.getInstance()

        this.renderer = new WebGPURenderer()
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setAnimationLoop(this.animate.bind(this));
    }

    getDOMElement(): HTMLCanvasElement {
        return this.renderer.domElement;
    }

    private animate = () => {
        this.app.camera.updateOrbitControls();

        this.app.ticker.tick()

        this.renderer.render(this.app.scene, this.app.camera.getCamera());
    }

}