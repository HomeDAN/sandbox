import { App } from "./app/App.ts";
import "./style.css"

const $dom = document.querySelector('#app')

const app = new App($dom);

$dom?.appendChild(app.domElement);