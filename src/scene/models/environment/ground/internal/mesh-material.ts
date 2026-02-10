
import {MeshPhongMaterial} from "three";
import { DefaultSettings } from "./constants";

export class MeshMaterial{
    constructor() {}

    createMaterial() {
        return new MeshPhongMaterial( { color: DefaultSettings.color } );
    }

}