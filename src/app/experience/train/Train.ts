import {BoxGeometry, Mesh, MeshBasicMaterial, type Object3DEventMap} from "three";
import {App} from "../../App.ts";
import gsap from "gsap";

export class Train {
    box: Mesh<BoxGeometry, MeshBasicMaterial, Object3DEventMap> | undefined;
    app: App;
    place1mesh: Mesh;
    place2mesh: Mesh;
    place3mesh: Mesh;
    place4mesh: Mesh;
    trainMesh: Mesh;

    constructor() {
        this.app = App.getInstance()
        this.app.ticker.subscribe(this.update.bind(this));
        this.place1mesh = new Mesh()
        this.place2mesh = new Mesh()
        this.place3mesh = new Mesh()
        this.place4mesh = new Mesh()

        this.trainMesh = new Mesh()

        this.train()

        this.place1()
        this.place2()
        this.place3()
        this.place4()

        this.dots()
    }

    train() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: "orange"});
        this.trainMesh = new Mesh(geometry, material);
        this.trainMesh.position.set(-3, 5, 2);
        this.app.scene.add(this.trainMesh);
    }

    dots() {

        const coords = [
            {x: -3, y: 5, z: 2, color: "green"},
            {x: -6, y: 5, z: 3, color: "blue"},
            {x: 8, y: 5, z: 1, color: "red"},
            {x: 3, y: 5, z: 0, color: "white"},
        ]

        coords.forEach(coord => {
            const geometry = new BoxGeometry(1, 1, 1);
            const material = new MeshBasicMaterial({color: coord.color});
            this.box = new Mesh(geometry, material);
            this.box.position.set(coord.x, coord.y, coord.z);
            this.box.scale.set(.2,.2,.2)

            this.app.scene.add(this.box);
        })
    }

    place1() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: "green"});
        this.place1mesh = new Mesh(geometry, material);
        this.place1mesh.position.set(-3, 0, 0);
        this.app.scene.add(this.place1mesh);
        this.app.events.onClick(this.place1mesh, () => {
            gsap.to(this.trainMesh.position, {
                duration: 2.5,
                ease: "power1.out",
                x: -3,
                y: 5,
                z: 2
            });
        })
    }

    place2() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: "blue"});
        this.place2mesh = new Mesh(geometry, material);
        this.place2mesh.position.set(-1, 0, 0);
        this.app.scene.add(this.place2mesh);
        this.app.events.onClick(this.place2mesh, () => {
            gsap.to(this.trainMesh.position, {
                duration: 2.5,
                ease: "power1.out",
                x: -6,
                y: 5,
                z: 3
            });
        })
    }

    place3() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: "red"});
        this.place3mesh = new Mesh(geometry, material);
        this.place3mesh.position.set(1, 0, 0);
        this.app.scene.add(this.place3mesh);
        this.app.events.onClick(this.place3mesh, () => {
            gsap.to(this.trainMesh.position, {
                duration: 2.5,
                ease: "power1.out",
                x: 8,
                y: 5,
                z: 1
            });
        })
    }

    place4() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: "white"});
        this.place4mesh = new Mesh(geometry, material);
        this.place4mesh.position.set(3, 0, 0);
        this.app.scene.add(this.place4mesh);
        this.app.events.onClick(this.place4mesh, () => {
            gsap.to(this.trainMesh.position, {
                duration: 2.5,
                ease: "power1.out",
                x: 3,
                y: 5,
                z: 0
            });
        })
    }

    private update = () => {}

}