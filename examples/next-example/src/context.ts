import { TLNuApp } from '@tldraw/next'
import * as React from 'react'
import { NuBoxShape, NuEllipseShape, Shape } from 'stores'
import { NuBoxTool, NuEllipseTool } from 'stores/tools'

type NuAppContext = TLNuApp<Shape>

export const appContext = React.createContext({} as NuAppContext)

export function useCreateAppContext() {
  const [app] = React.useState<NuAppContext>(
    new TLNuApp<Shape>(
      {
        currentPageId: 'page1',
        selectedIds: [],
        pages: [
          {
            name: 'Page',
            id: 'page1',
            shapes: [
              {
                id: 'box1',
                type: 'box',
                parentId: 'page1',
                point: [100, 100],
                size: [100, 100],
              },
            ],
            bindings: [],
          },
        ],
      },
      [NuBoxShape, NuEllipseShape],
      [NuBoxTool, NuEllipseTool]
    )
  )

  React.useEffect(() => {
    // app.registerShapes(NuBoxShape, NuEllipseShape)

    // app.currentPage.addShapes(
    //   new NuBoxShape({
    //     id: 'box1',
    //     parentId: 'page',
    //     point: [100, 100],
    //     size: [100, 100],
    //   }),
    //   new NuBoxShape({
    //     id: 'box2',
    //     parentId: 'page',
    //     point: [150, 150],
    //     size: [100, 100],
    //   }),
    //   new NuEllipseShape({
    //     id: 'ellipse1',
    //     parentId: 'page',
    //     point: [300, 150],
    //     size: [100, 100],
    //   }),
    //   ...Array.from(
    //     { length: 100 },
    //     (_, i) =>
    //       new NuBoxShape({
    //         id: 'test' + i,
    //         parentId: 'page',
    //         point: [(i % 10) * 100, Math.floor(i / 10) * 100],
    //         size: [24, 24],
    //       })
    //   )
    // )

    // app.select('box1', 'box2')

    app.history.reset()
  }, [])

  return app
}

export function useAppContext() {
  const app = React.useContext(appContext)

  return app
}
