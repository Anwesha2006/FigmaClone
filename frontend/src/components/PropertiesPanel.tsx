"use client"

import { useCanvasStore } from "@/src/lib/store"
import { Trash2, Copy, RotateCw } from "lucide-react"

export function PropertiesPanel() {
  const { shapes, selectedId, updateShape, deleteShape } = useCanvasStore()
  const selectedShape = shapes.find((s) => s.id === selectedId)

  if (!selectedShape) {
    return (
      <aside className="w-64 border-l border-border bg-sidebar p-4">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="mb-2 rounded-lg bg-secondary p-3">
            <svg
              className="h-6 w-6 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
              />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">
            Select an element to view its properties
          </p>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-64 border-l border-border bg-sidebar">
      <div className="border-b border-border p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground capitalize">
            {selectedShape.type}
          </h3>
          <div className="flex gap-1">
            <button
              onClick={() => {}}
              className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              title="Duplicate"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => deleteShape(selectedShape.id)}
              className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Position
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">X</label>
              <input
                type="number"
                value={Math.round(selectedShape.x)}
                onChange={(e) =>
                  updateShape(selectedShape.id, { x: Number(e.target.value) })
                }
                className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Y</label>
              <input
                type="number"
                value={Math.round(selectedShape.y)}
                onChange={(e) =>
                  updateShape(selectedShape.id, { y: Number(e.target.value) })
                }
                className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Size
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">W</label>
              <input
                type="number"
                value={Math.round(selectedShape.width)}
                onChange={(e) =>
                  updateShape(selectedShape.id, { width: Number(e.target.value) })
                }
                className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">H</label>
              <input
                type="number"
                value={Math.round(selectedShape.height)}
                onChange={(e) =>
                  updateShape(selectedShape.id, { height: Number(e.target.value) })
                }
                className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Rotation
          </h4>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={selectedShape.rotation}
              onChange={(e) =>
                updateShape(selectedShape.id, { rotation: Number(e.target.value) })
              }
              className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
            />
            <button
              onClick={() => updateShape(selectedShape.id, { rotation: 0 })}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              title="Reset rotation"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Fill
          </h4>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={selectedShape.fill}
              onChange={(e) =>
                updateShape(selectedShape.id, { fill: e.target.value })
              }
              className="h-8 w-8 cursor-pointer overflow-hidden rounded-md border border-input bg-transparent"
            />
            <input
              type="text"
              value={selectedShape.fill}
              onChange={(e) =>
                updateShape(selectedShape.id, { fill: e.target.value })
              }
              className="h-8 flex-1 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
            />
          </div>
        </div>

        <div className="mb-4">
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Stroke
          </h4>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={selectedShape.stroke}
              onChange={(e) =>
                updateShape(selectedShape.id, { stroke: e.target.value })
              }
              className="h-8 w-8 cursor-pointer overflow-hidden rounded-md border border-input bg-transparent"
            />
            <input
              type="text"
              value={selectedShape.stroke}
              onChange={(e) =>
                updateShape(selectedShape.id, { stroke: e.target.value })
              }
              className="h-8 flex-1 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
            />
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Stroke Width
          </h4>
          <input
            type="range"
            min="0"
            max="20"
            value={selectedShape.strokeWidth}
            onChange={(e) =>
              updateShape(selectedShape.id, { strokeWidth: Number(e.target.value) })
            }
            className="w-full accent-primary"
          />
          <div className="mt-1 text-xs text-muted-foreground">
            {selectedShape.strokeWidth}px
          </div>
        </div>
      </div>
    </aside>
  )
}
