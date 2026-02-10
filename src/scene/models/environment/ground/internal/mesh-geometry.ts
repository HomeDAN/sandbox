import {BoxGeometry, Mesh, type MeshPhongMaterial} from "three";
import { DefaultSettings } from "./constants";

export class MeshGeometry {
    public material: MeshPhongMaterial

    private geometry: BoxGeometry;

    constructor(material: MeshPhongMaterial) {
        this.geometry = new BoxGeometry();
        this.material = material;
    }

    createMesh() {
        const mesh = new Mesh(this.geometry, this.material)
        mesh.position.x = DefaultSettings.position.x
        mesh.position.y = DefaultSettings.position.y
        mesh.position.z = DefaultSettings.position.z

        mesh.scale.x = DefaultSettings.scale.x
        mesh.scale.y = DefaultSettings.scale.y
        mesh.scale.z = DefaultSettings.scale.z

        mesh.rotation.x = DefaultSettings.rotation.x
        mesh.rotation.y = DefaultSettings.rotation.y
        mesh.rotation.z = DefaultSettings.rotation.z

        mesh.receiveShadow = true;

        return mesh
    }
}