import {App} from "../../App.ts";

export class FollowThePath  {
    app: App;
    constructor() {
        this.app = App.getInstance()
        this.init()
    }

    init() {
        // this.app.ticker.subscribe(this.update.bind(this));
    }

    update = () => {
        console.log("TEST")
    }
}

