import {type Intersection, Raycaster, Vector2} from "three";
import {App} from "../App.ts";

export class RayCursor {
    raycaster: Raycaster;
    pointer: Vector2;
    app: App;
    intersects: Intersection[] = [];

    constructor() {
        this.app = App.getInstance()
        this.raycaster = new Raycaster();
        this.pointer = new Vector2(0, 0)

        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('click', this.onClick.bind(this));
    }

    private updatePointer(event: MouseEvent) {
        this.pointer.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );
    }

    private updateIntersects() {
        this.raycaster.setFromCamera(this.pointer, this.app.camera.getCamera());
        this.intersects = this.raycaster.intersectObjects(this.app.scene.children);
    }

    onMouseMove(event: MouseEvent) {
        this.updatePointer(event);
        this.updateIntersects();
        this.app.events.emit('mousemove', this.intersects);
    }

    onClick(event: MouseEvent) {
        this.updatePointer(event);
        this.updateIntersects();
        this.app.events.emit('click', this.intersects);
    }
}