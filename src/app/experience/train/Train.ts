import {
    BoxGeometry,
    BufferGeometry,
    CatmullRomCurve3,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial,
    type Object3DEventMap,
    Vector3
} from "three";
import {App} from "../../App.ts";

export class Train {
    box: Mesh<BoxGeometry, MeshBasicMaterial, Object3DEventMap> | undefined;
    app: App;
    place1mesh: Mesh;
    place2mesh: Mesh;
    place3mesh: Mesh;
    place4mesh: Mesh;
    trainMesh: Mesh;
    points: Vector3[];
    path: CatmullRomCurve3;
    isPathClosed: boolean;
    pathObject: Line<BufferGeometry, LineBasicMaterial>;
     activeDot: string;

    constructor() {
        this.app = App.getInstance()
        this.app.ticker.subscribe(this.update.bind(this));
        this.place1mesh = new Mesh()
        this.place2mesh = new Mesh()
        this.place3mesh = new Mesh()
        this.place4mesh = new Mesh()

        this.pathObject = new Line()

        this.trainMesh = new Mesh()
        this.isPathClosed = false

        this.activeDot = "green"

        this.points = [
            new Vector3(-15.5, 0, 9.1),
            new Vector3(-8.75, 0, 4.55),
            new Vector3(0, 0, 0),
            new Vector3(8.75, 0, 4.55),
            new Vector3(15.5, 0, 9.1),
        ]

        this.path = new CatmullRomCurve3()

        this.createPath()
        this.createBox()

        this.dots()
    }

    dots() {

        const coords = [
            {x: -15.5, y: 0, z: 9.1, color: "green"},
            {x: 0, y: 0, z: -17.8, color: "blue"},
            {x: 15.5, y: 0, z: 9.1, color: "red"},
            {x: 0, y: 0, z: 0, color: "white"},
        ]

        coords.forEach(coord => {
            const geometry = new BoxGeometry(1, 1, 1);
            const material = new MeshBasicMaterial({color: coord.color});
            this.box = new Mesh(geometry, material);
            this.box.position.set(coord.x, coord.y, coord.z);
            this.box.scale.set(1,1,1)

            this.app.scene.add(this.box);

            this.app.events.onClick(this.box, () => {

                this.activeDot = coord.color

                // если (активная точка равно синему цвету) {
                //     то можем пойти
                //         - в красную
                //         - в зеленую
                // }
                //
                // если (активная точка равно красному цвету) {
                //     то можем пойти
                //         - в зеленую
                //         - в синюю
                // }
                //
                // если (активная точка равно зеленому цвету) {
                //     то можем пойти
                //         - в красную
                //         - в синюю
                // }

                if (coord.color === 'green') {
                    this.pathObject.rotation.y = 0;
                }

                if (coord.color === 'red') {
                    this.pathObject.rotation.y = 2.10;
                }

                if (coord.color === "blue") {
                    this.pathObject.rotation.y = 4.18;
                }
            })
        })
    }

    private createPath() {

        // True означает замкнутость пути и добавляет 1 сегмент в путь
        this.path = new CatmullRomCurve3(this.points, this.isPathClosed);

        const pathGeometry = new BufferGeometry().setFromPoints(
            this.path.getPoints(2)
        );

        const pathMaterial = new LineBasicMaterial({color: 0xff0000});
        this.pathObject = new Line(pathGeometry, pathMaterial);

        this.app.debug?.addFolder("pathRotation").addControls(this.pathObject, "rotation")

        this.app.scene.add(this.pathObject);
    }

    private createBox() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: 0x00ff00});
        this.box = new Mesh(geometry, material);
        this.app.scene.add(this.box);

    }


    private update = () => {}

}