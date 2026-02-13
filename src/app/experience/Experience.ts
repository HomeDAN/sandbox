import {FollowThePath} from "./follow-the-path/FollowThePath.ts";

export class Experience {
    constructor() {
        this.init()
    }

    init() {
        new FollowThePath()         // Движение объекта по path или curve
    }
}
