export type ShapeType = "rectangle" | "circle" | "text" | "line" | "arrow" | "triangle" | "star"

export type Tool = "select" | "move" | "rectangle" | "circle" | "text" | "line" | "arrow" | "triangle" | "star"

export interface Shape {
  id: string
  type: ShapeType
  x: number
  y: number
  width: number
  height: number
  fill: string
  stroke: string
  strokeWidth: number
  rotation: number
  text?: string
  fontSize?: number
  fontFamily?: string
  textAlign?: "left" | "center" | "right"
}

export interface CanvasState {
  shapes: Shape[]
  selectedId: string | null
  activeTool: Tool
  zoom: number
  panOffset: { x: number; y: number }
}

export interface PropertiesPanelProps {
  selectedShape: Shape | null
  onUpdateShape: (updates: Partial<Shape>) => void
}
