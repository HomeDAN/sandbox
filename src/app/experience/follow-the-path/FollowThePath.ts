import {App} from "../../App.ts";
import {
    BoxGeometry,
    BufferGeometry,
    CatmullRomCurve3,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial,
    Vector3
} from "three";

export class FollowThePath {
    private app: App;
    private box: Mesh;
    private path: CatmullRomCurve3;
    private readonly points: Vector3[];
    private readonly isPathClosed: boolean;

    constructor() {
        this.app = App.getInstance()
        this.app.ticker.subscribe(this.update.bind(this));

        this.points = [
            new Vector3(15, 9, 0),
            new Vector3(0, 0, 0),
            new Vector3(0, -17, 0),
        ]

        this.path = new CatmullRomCurve3()

        this.isPathClosed = false
        this.box = new Mesh()

        this.createPath()
        this.createBox()

        this.setupEventListeners()
    }

    private setupEventListeners() {
        // Клик по объекту
        this.app.events.onClick(this.box, () => {
            console.log('Box clicked!');
            (this.box.material as MeshBasicMaterial).color.setHex(0x0000ff);
        });

        // Hover с использованием нового метода
        this.app.events.onHover(this.box, {
            onEnter: () => {
                console.log('Mouse entered box!');
                (this.box.material as MeshBasicMaterial).color.setHex(0xff0000);
                this.box.scale.set(2, 2, 2);
            },
            onLeave: () => {
                console.log('Mouse left box!');
                (this.box.material as MeshBasicMaterial).color.setHex(0x00ff00);
                this.box.scale.set(1, 1, 1);
            },
            onMove: () => {
                // Дополнительная логика при движении внутри объекта
                // Например, можно менять цвет в зависимости от позиции
            }
        });
    }

    private createPath() {

        // True означает замкнутость пути и добавляет 1 сегмент в путь
        this.path = new CatmullRomCurve3(this.points, this.isPathClosed);

        const pathGeometry = new BufferGeometry().setFromPoints(
            this.path.getPoints(50)
        );

        const pathMaterial = new LineBasicMaterial({color: 0xff0000});
        const pathObject = new Line(pathGeometry, pathMaterial);

        this.app.scene.add(pathObject);
    }

    private createBox() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: 0x00ff00});
        this.box = new Mesh(geometry, material);
        this.app.scene.add(this.box);

    }

    private update = () => {

        const time = Date.now();

        // Чем меньше значаеие тем быстрее движение объекта
        const velocity = 2000

        // количеству сегментов между точками пути
        // Если isPathClosed === true добавляем дополнительный сегмент
        // для интерполяции в месте замыкания
        const segments = this.isPathClosed ? this.points.length + 1 : this.points.length

        // Преобразование времени в параметр пути
        // интерполяции для кривой (перевод в значение от 0 до 1)
        const timeToPath = ((time / velocity) % segments) / segments;

        const position = this.path?.getPointAt(timeToPath)
        const direction = this.path.getTangentAt(timeToPath).normalize();

        this.box.position.copy(position);

        // Для того чтобы объект смотрел в сторону нормалей
        this.box.lookAt(position.clone().add(direction));

    }
}

