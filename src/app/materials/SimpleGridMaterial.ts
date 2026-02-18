// @ts-nocheck

import { Color, NodeMaterial } from 'three/webgpu'
import {
    uniform, vec4, positionWorld,
    mix, uv, step, fract, abs, sub, mul, div, add, max, min
} from 'three/tsl'

class SimpleGridMaterial extends NodeMaterial
{
    constructor() {
        super()

        const dark = uniform(new Color("#382e4d"))
        const light = uniform(new Color("#83bdda"))

        // Параметры сетки
        const spacing = 4.0 // Расстояние между крестиками
        const thickness = 0.01 // Толщина линий крестика
        const length = 0.05 // Длина линий крестика

        // Получаем координаты в ячейке
        const gridPos = positionWorld.xz.div(spacing)
        const cellPos = gridPos.fract().sub(0.5)

        // Горизонтальная линия крестика
        const horizontal = step(abs(cellPos.y), thickness).mul(
            step(abs(cellPos.x), length)
        )

        // Вертикальная линия крестика
        const vertical = step(abs(cellPos.x), thickness).mul(
            step(abs(cellPos.y), length)
        )

        // Объединяем линии (берем максимальное значение, так как это маски)
        const mask = max(horizontal, vertical)

        this.outputNode = vec4(mix(dark, light, mask), 1)
    }
}

export default SimpleGridMaterial