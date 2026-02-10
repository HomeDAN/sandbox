import { Controller } from './internal/controller.js';

import { Sound } from './internal/sounds.js';
import type {Scene, BoxGeometry, Mesh, MeshPhongMaterial} from 'three';
import { MeshGeometry } from './internal/mesh-geometry.js';
import { MeshMaterial } from './internal/mesh-material.js';

export class Ground  {
    controller: Controller;
    meshGeometry: Mesh<BoxGeometry, MeshPhongMaterial>;
    meshMaterial: MeshPhongMaterial;
    sound: Sound;

    constructor(scene: Scene) {
        this.meshMaterial =     new MeshMaterial().createMaterial();
        this.meshGeometry =     new MeshGeometry(this.meshMaterial).createMesh();
        this.controller =       new Controller();
        this.sound =            new Sound();

        scene.add(this.meshGeometry)
    }  
}