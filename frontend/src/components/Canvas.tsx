"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { useCanvasStore } from "@/src/lib/store"
import { generateId } from "@/src/lib/utils"
import type { Shape } from "@/src/lib/types"

interface DragState {
  isDragging: boolean
  startX: number
  startY: number
  shapeStartX: number
  shapeStartY: number
}

interface ResizeState {
  isResizing: boolean
  handle: string
  startX: number
  startY: number
  shapeStartWidth: number
  shapeStartHeight: number
  shapeStartX: number
  shapeStartY: number
}

export function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const {
    shapes,
    selectedId,
    activeTool,
    zoom,
    panOffset,
    addShape,
    selectShape,
    moveShape,
    resizeShape,
    setPanOffset,
  } = useCanvasStore()

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    shapeStartX: 0,
    shapeStartY: 0,
  })

  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    handle: "",
    startX: 0,
    startY: 0,
    shapeStartWidth: 0,
    shapeStartHeight: 0,
    shapeStartX: 0,
    shapeStartY: 0,
  })

  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  const getCanvasCoordinates = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current) return { x: 0, y: 0 }
      const rect = canvasRef.current.getBoundingClientRect()
      return {
        x: (clientX - rect.left - panOffset.x) / zoom,
        y: (clientY - rect.top - panOffset.y) / zoom,
      }
    },
    [zoom, panOffset]
  )

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target !== canvasRef.current) return

      const coords = getCanvasCoordinates(e.clientX, e.clientY)

      if (activeTool === "rectangle" || activeTool === "circle") {
        const newShape: Shape = {
          id: generateId(),
          type: activeTool,
          x: coords.x - 50,
          y: coords.y - 50,
          width: 100,
          height: 100,
          fill: "#5B8DEF",
          stroke: "#3B6FCF",
          strokeWidth: 2,
          rotation: 0,
        }
        addShape(newShape)
      } else if (activeTool === "select") {
        selectShape(null)
      }
    },
    [activeTool, addShape, selectShape, getCanvasCoordinates]
  )

  const handleShapeMouseDown = useCallback(
    (e: React.MouseEvent, shape: Shape) => {
      e.stopPropagation()

      if (activeTool === "select" || activeTool === "move") {
        selectShape(shape.id)
        setDragState({
          isDragging: true,
          startX: e.clientX,
          startY: e.clientY,
          shapeStartX: shape.x,
          shapeStartY: shape.y,
        })
      }
    },
    [activeTool, selectShape]
  )

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent, handle: string, shape: Shape) => {
      e.stopPropagation()
      setResizeState({
        isResizing: true,
        handle,
        startX: e.clientX,
        startY: e.clientY,
        shapeStartWidth: shape.width,
        shapeStartHeight: shape.height,
        shapeStartX: shape.x,
        shapeStartY: shape.y,
      })
    },
    []
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        const dx = e.clientX - panStart.x
        const dy = e.clientY - panStart.y
        setPanOffset({
          x: panOffset.x + dx,
          y: panOffset.y + dy,
        })
        setPanStart({ x: e.clientX, y: e.clientY })
        return
      }

      if (dragState.isDragging && selectedId) {
        const dx = (e.clientX - dragState.startX) / zoom
        const dy = (e.clientY - dragState.startY) / zoom
        moveShape(selectedId, dragState.shapeStartX + dx, dragState.shapeStartY + dy)
      }

      if (resizeState.isResizing && selectedId) {
        const dx = (e.clientX - resizeState.startX) / zoom
        const dy = (e.clientY - resizeState.startY) / zoom

        let newWidth = resizeState.shapeStartWidth
        let newHeight = resizeState.shapeStartHeight
        let newX = resizeState.shapeStartX
        let newY = resizeState.shapeStartY

        if (resizeState.handle.includes("e")) {
          newWidth = resizeState.shapeStartWidth + dx
        }
        if (resizeState.handle.includes("w")) {
          newWidth = resizeState.shapeStartWidth - dx
          newX = resizeState.shapeStartX + dx
        }
        if (resizeState.handle.includes("s")) {
          newHeight = resizeState.shapeStartHeight + dy
        }
        if (resizeState.handle.includes("n")) {
          newHeight = resizeState.shapeStartHeight - dy
          newY = resizeState.shapeStartY + dy
        }

        if (newWidth >= 10 && newHeight >= 10) {
          resizeShape(selectedId, newWidth, newHeight)
          if (resizeState.handle.includes("w") || resizeState.handle.includes("n")) {
            moveShape(selectedId, newX, newY)
          }
        }
      }
    },
    [
      isPanning,
      panStart,
      dragState,
      resizeState,
      selectedId,
      zoom,
      moveShape,
      resizeShape,
      setPanOffset,
      panOffset,
    ]
  )

  const handleMouseUp = useCallback(() => {
    setDragState((prev) => ({ ...prev, isDragging: false }))
    setResizeState((prev) => ({ ...prev, isResizing: false }))
    setIsPanning(false)
  }, [])

  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (activeTool === "move" || e.button === 1) {
        setIsPanning(true)
        setPanStart({ x: e.clientX, y: e.clientY })
      }
    },
    [activeTool]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedId) {
          const store = useCanvasStore.getState()
          store.deleteShape(selectedId)
        }
      }
      if (e.key === "v" || e.key === "V") {
        useCanvasStore.getState().setActiveTool("select")
      }
      if (e.key === "h" || e.key === "H") {
        useCanvasStore.getState().setActiveTool("move")
      }
      if (e.key === "r" || e.key === "R") {
        useCanvasStore.getState().setActiveTool("rectangle")
      }
      if (e.key === "o" || e.key === "O") {
        useCanvasStore.getState().setActiveTool("circle")
      }
      if (e.key === "t" || e.key === "T") {
        useCanvasStore.getState().setActiveTool("text")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedId])

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -0.1 : 0.1
        useCanvasStore.getState().setZoom(zoom + delta)
      }
    },
    [zoom]
  )

  const selectedShape = shapes.find((s) => s.id === selectedId)

  const renderResizeHandles = (shape: Shape) => {
    const handles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"]
    const handlePositions: Record<string, { x: string; y: string }> = {
      nw: { x: "-4px", y: "-4px" },
      n: { x: "calc(50% - 4px)", y: "-4px" },
      ne: { x: "calc(100% - 4px)", y: "-4px" },
      e: { x: "calc(100% - 4px)", y: "calc(50% - 4px)" },
      se: { x: "calc(100% - 4px)", y: "calc(100% - 4px)" },
      s: { x: "calc(50% - 4px)", y: "calc(100% - 4px)" },
      sw: { x: "-4px", y: "calc(100% - 4px)" },
      w: { x: "-4px", y: "calc(50% - 4px)" },
    }

    const cursors: Record<string, string> = {
      nw: "nwse-resize",
      n: "ns-resize",
      ne: "nesw-resize",
      e: "ew-resize",
      se: "nwse-resize",
      s: "ns-resize",
      sw: "nesw-resize",
      w: "ew-resize",
    }

    return handles.map((handle) => (
      <div
        key={handle}
        className="absolute h-2 w-2 rounded-sm border-2 border-primary bg-background"
        style={{
          left: handlePositions[handle].x,
          top: handlePositions[handle].y,
          cursor: cursors[handle],
        }}
        onMouseDown={(e) => handleResizeMouseDown(e, handle, shape)}
      />
    ))
  }

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 overflow-hidden bg-canvas"
      onClick={handleCanvasClick}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{
        cursor:
          activeTool === "move" || isPanning
            ? "grab"
            : activeTool === "rectangle" || activeTool === "circle"
            ? "crosshair"
            : "default",
        backgroundImage: `
          radial-gradient(circle at 1px 1px, oklch(0.3 0 0) 1px, transparent 0)
        `,
        backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
        backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
      }}
    >
      <div
        className="absolute inset-0 origin-top-left"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
        }}
      >
        {shapes.map((shape) => {
          const isSelected = shape.id === selectedId

          if (shape.type === "rectangle") {
            return (
              <div
                key={shape.id}
                className="absolute transition-shadow"
                style={{
                  left: shape.x,
                  top: shape.y,
                  width: shape.width,
                  height: shape.height,
                  backgroundColor: shape.fill,
                  border: `${shape.strokeWidth}px solid ${shape.stroke}`,
                  borderRadius: "4px",
                  transform: `rotate(${shape.rotation}deg)`,
                  cursor: activeTool === "select" ? "move" : "default",
                  boxShadow: isSelected
                    ? "0 0 0 2px oklch(0.65 0.2 250)"
                    : "none",
                }}
                onMouseDown={(e) => handleShapeMouseDown(e, shape)}
              >
                {isSelected && renderResizeHandles(shape)}
              </div>
            )
          }

          if (shape.type === "circle") {
            return (
              <div
                key={shape.id}
                className="absolute rounded-full transition-shadow"
                style={{
                  left: shape.x,
                  top: shape.y,
                  width: shape.width,
                  height: shape.height,
                  backgroundColor: shape.fill,
                  border: `${shape.strokeWidth}px solid ${shape.stroke}`,
                  transform: `rotate(${shape.rotation}deg)`,
                  cursor: activeTool === "select" ? "move" : "default",
                  boxShadow: isSelected
                    ? "0 0 0 2px oklch(0.65 0.2 250)"
                    : "none",
                }}
                onMouseDown={(e) => handleShapeMouseDown(e, shape)}
              >
                {isSelected && renderResizeHandles(shape)}
              </div>
            )
          }

          return null
        })}
      </div>

      {selectedShape && (
        <div className="absolute bottom-4 left-4 rounded-lg border border-border bg-toolbar px-3 py-2 text-xs text-muted-foreground shadow-lg">
          <span className="capitalize">{selectedShape.type}</span>
          <span className="mx-2 text-border">|</span>
          <span>
            {Math.round(selectedShape.width)} × {Math.round(selectedShape.height)}
          </span>
        </div>
      )}
    </div>
  )
}
