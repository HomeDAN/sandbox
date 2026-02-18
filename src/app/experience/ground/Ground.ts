import {BoxGeometry, Mesh} from "three";
import {App} from "../../App.ts";
import SimpleGridMaterial from "../../materials/SimpleGridMaterial.ts";

export class Ground {
    private app: App;
    ground: Mesh | undefined;
    constructor() {
        this.app = App.getInstance()
        this.createGround()
    }

    createGround() {

        const geometry = new BoxGeometry(500, 0.1, 500);
        // const material = new MeshBasicMaterial({color: "#61a7bf"});

        const material = new SimpleGridMaterial();

        this.ground = new Mesh(geometry, material);
        this.ground?.position.set(0, -.5, 0);
        this.app.scene.add(this.ground);
    }
}