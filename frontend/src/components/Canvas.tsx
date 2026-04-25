"use client"

import React, { useRef, useState, useCallback, useEffect } from "react"
import { useCanvasStore } from "@/src/lib/store"
import { generateId } from "@/src/lib/utils"
import type { Shape } from "@/src/lib/types"
import { useAutoSave } from "../hooks/useAutosave"

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
    updateShape,
  } = useCanvasStore()
const fileId = ""  // temporary empty string until you add file routing
const saveStatus = useAutoSave(fileId)
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
  const [editingTextId, setEditingTextId] = useState<string | null>(null)

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

  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setEditingTextId(null)
      if (activeTool === "move" || e.button === 1) {
        setIsPanning(true)
        setPanStart({ x: e.clientX, y: e.clientY })
      } else if (["rectangle", "circle", "text", "line", "arrow", "triangle", "star"].includes(activeTool)) {
        const coords = getCanvasCoordinates(e.clientX, e.clientY)
        const isText = activeTool === "text"
        const isLineOrArrow = activeTool === "line" || activeTool === "arrow"
        
        let width = 100
        let height = 100
        if (isText) { width = 200; height = 50; }
        if (isLineOrArrow) { height = 10; }

        const newShape: Shape = {
          id: generateId(),
          type: activeTool as any,
          x: isText ? coords.x : coords.x - width / 2,
          y: isText ? coords.y : coords.y - height / 2,
          width,
          height,
          fill: isText ? "currentColor" : isLineOrArrow ? "transparent" : "#5B8DEF",
          stroke: isText ? "transparent" : "#3B6FCF",
          strokeWidth: isText ? 0 : 2,
          rotation: 0,
          ...(isText && {
            text: "Double click to edit",
            fontSize: 16,
            fontFamily: "Inter, sans-serif",
            textAlign: "left",
          }),
        }

        addShape(newShape)
        useCanvasStore.getState().setActiveTool("select")
        if (isText) {
          setEditingTextId(newShape.id)
        }
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
      if (e.key === "l" && !e.shiftKey) {
        useCanvasStore.getState().setActiveTool("line")
      }
      if (e.key === "L" || (e.key === "l" && e.shiftKey)) {
        useCanvasStore.getState().setActiveTool("arrow")
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
      className="relative h-full w-full overflow-hidden bg-canvas"
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
                data-shape="true"
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
                data-shape="true"
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

          if (shape.type === "text") {
            const isEditing = editingTextId === shape.id
            return (
              <div
                key={shape.id}
                data-shape="true"
                className="absolute transition-shadow flex items-start"
                style={{
                  left: shape.x,
                  top: shape.y,
                  width: shape.width,
                  height: shape.height,
                  transform: `rotate(${shape.rotation}deg)`,
                  cursor: activeTool === "select" ? "move" : "default",
                  boxShadow: isSelected && !isEditing
                    ? "0 0 0 2px oklch(0.65 0.2 250)"
                    : "none",
                }}
                onMouseDown={(e) => handleShapeMouseDown(e, shape)}
                onDoubleClick={(e) => {
                  e.stopPropagation()
                  setEditingTextId(shape.id)
                }}
              >
                {isEditing ? (
                  <textarea
                    autoFocus
                    className="w-full h-full bg-transparent resize-none outline-none"
                    style={{
                      color: shape.fill,
                      fontSize: `${shape.fontSize || 16}px`,
                      fontFamily: shape.fontFamily || "Inter, sans-serif",
                      textAlign: shape.textAlign as any || "left",
                    }}
                    value={shape.text || ""}
                    onChange={(e) => updateShape(shape.id, { text: e.target.value })}
                    onBlur={() => setEditingTextId(null)}
                    onMouseDown={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div
                    className="w-full h-full select-none"
                    style={{
                      color: shape.fill,
                      fontSize: `${shape.fontSize || 16}px`,
                      fontFamily: shape.fontFamily || "Inter, sans-serif",
                      textAlign: shape.textAlign as any || "left",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {shape.text || "Double click to edit"}
                  </div>
                )}
                {isSelected && !isEditing && renderResizeHandles(shape)}
              </div>
            )
          }

          if (shape.type === "triangle") {
            return (
              <div
                key={shape.id}
                data-shape="true"
                className="absolute transition-shadow"
                style={{
                  left: shape.x, top: shape.y, width: shape.width, height: shape.height,
                  transform: `rotate(${shape.rotation}deg)`,
                  cursor: activeTool === "select" ? "move" : "default",
                  boxShadow: isSelected ? "0 0 0 2px oklch(0.65 0.2 250)" : "none",
                }}
                onMouseDown={(e) => handleShapeMouseDown(e, shape)}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon
                    points="50,0 100,100 0,100"
                    fill={shape.fill}
                    stroke={shape.stroke}
                    strokeWidth={shape.strokeWidth}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                {isSelected && renderResizeHandles(shape)}
              </div>
            )
          }

          if (shape.type === "star") {
            return (
              <div
                key={shape.id}
                data-shape="true"
                className="absolute transition-shadow"
                style={{
                  left: shape.x, top: shape.y, width: shape.width, height: shape.height,
                  transform: `rotate(${shape.rotation}deg)`,
                  cursor: activeTool === "select" ? "move" : "default",
                  boxShadow: isSelected ? "0 0 0 2px oklch(0.65 0.2 250)" : "none",
                }}
                onMouseDown={(e) => handleShapeMouseDown(e, shape)}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon
                    points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
                    fill={shape.fill}
                    stroke={shape.stroke}
                    strokeWidth={shape.strokeWidth}
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="round"
                  />
                </svg>
                {isSelected && renderResizeHandles(shape)}
              </div>
            )
          }

          if (shape.type === "line") {
            return (
              <div
                key={shape.id}
                data-shape="true"
                className="absolute transition-shadow flex items-center"
                style={{
                  left: shape.x, top: shape.y, width: shape.width, height: Math.max(10, shape.height),
                  transform: `rotate(${shape.rotation}deg)`,
                  cursor: activeTool === "select" ? "move" : "default",
                  boxShadow: isSelected ? "0 0 0 2px oklch(0.65 0.2 250)" : "none",
                }}
                onMouseDown={(e) => handleShapeMouseDown(e, shape)}
              >
                <svg width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                  <line
                    x1="0" y1="50%" x2="100%" y2="50%"
                    stroke={shape.stroke}
                    strokeWidth={shape.strokeWidth}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                {isSelected && renderResizeHandles(shape)}
              </div>
            )
          }

          if (shape.type === "arrow") {
            return (
              <div
                key={shape.id}
                data-shape="true"
                className="absolute transition-shadow flex items-center"
                style={{
                  left: shape.x, top: shape.y, width: shape.width, height: Math.max(10, shape.height),
                  transform: `rotate(${shape.rotation}deg)`,
                  cursor: activeTool === "select" ? "move" : "default",
                  boxShadow: isSelected ? "0 0 0 2px oklch(0.65 0.2 250)" : "none",
                }}
                onMouseDown={(e) => handleShapeMouseDown(e, shape)}
              >
                <svg width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                  <defs>
                    <marker id={`arrow-${shape.id}`} markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill={shape.stroke} />
                    </marker>
                  </defs>
                  <line
                    x1="0" y1="50%" x2="100%" y2="50%"
                    stroke={shape.stroke}
                    strokeWidth={shape.strokeWidth}
                    markerEnd={`url(#arrow-${shape.id})`}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
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
      {saveStatus !== "idle" && (
  <div className="absolute bottom-4 right-4 rounded-lg border border-border bg-toolbar px-3 py-2 text-xs text-muted-foreground shadow-lg">
    {saveStatus === "saving" && "Saving..."}
    {saveStatus === "saved" && "Saved ✓"}
    {saveStatus === "error" && "Save failed"}
  </div>
)}
    </div>
  )
}
