import { Scene } from "./scene/scene";
import "./style.css"

const $dom = document.querySelector('#app')

const scene = new Scene($dom);

$dom?.appendChild(scene.getDOMElement());