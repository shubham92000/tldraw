import { v4 as uuid } from "uuid"
import * as vec from "utils/vec"
import { DotShape, ShapeType } from "types"
import { boundsCache } from "./index"
import { boundsContained } from "utils/bounds"
import { intersectCircleBounds } from "utils/intersections"
import { createShape } from "./base-shape"

const dot = createShape<DotShape>({
  create(props) {
    return {
      id: uuid(),
      type: ShapeType.Dot,
      name: "Dot",
      parentId: "page0",
      childIndex: 0,
      point: [0, 0],
      rotation: 0,
      style: {},
      ...props,
    }
  },

  render({ id }) {
    return <circle id={id} cx={4} cy={4} r={4} />
  },

  getBounds(shape) {
    if (boundsCache.has(shape)) {
      return boundsCache.get(shape)
    }

    const {
      point: [x, y],
    } = shape

    const bounds = {
      minX: x,
      maxX: x + 8,
      minY: y,
      maxY: y + 8,
      width: 8,
      height: 8,
    }

    boundsCache.set(shape, bounds)
    return bounds
  },

  hitTest(shape, test) {
    return vec.dist(shape.point, test) < 4
  },

  hitTestBounds(this, shape, brushBounds) {
    const shapeBounds = this.getBounds(shape)
    return (
      boundsContained(shapeBounds, brushBounds) ||
      intersectCircleBounds(shape.point, 4, brushBounds).length > 0
    )
  },

  rotate(shape) {
    return shape
  },

  translate(shape, delta) {
    shape.point = vec.add(shape.point, delta)
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
})

export default dot
