// import {FollowThePath} from "./follow-the-path/FollowThePath.ts";
import {Train} from "./train/Train.ts";
import {Ground} from "./ground/Ground.ts";

export class Experience {
    constructor() {
        this.init()
    }

    init() {
        // new FollowThePath()         // Движение объекта по curve
        new Ground()
        new Train()

    }
}
