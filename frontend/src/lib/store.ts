import { create } from "zustand"
import type { Shape, Tool, CanvasState } from "./types"

interface CanvasStore extends CanvasState {
  addShape: (shape: Shape) => void
  updateShape: (id: string, updates: Partial<Shape>) => void
  deleteShape: (id: string) => void
  selectShape: (id: string | null) => void
  setActiveTool: (tool: Tool) => void
  setZoom: (zoom: number) => void
  setPanOffset: (offset: { x: number; y: number }) => void
  moveShape: (id: string, x: number, y: number) => void
  resizeShape: (id: string, width: number, height: number) => void
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  shapes: [],
  selectedId: null,
  activeTool: "select",
  zoom: 1,
  panOffset: { x: 0, y: 0 },

  addShape: (shape) =>
    set((state) => ({
      shapes: [...state.shapes, shape],
      selectedId: shape.id,
    })),

  updateShape: (id, updates) =>
    set((state) => ({
      shapes: state.shapes.map((shape) =>
        shape.id === id ? { ...shape, ...updates } : shape
      ),
    })),

  deleteShape: (id) =>
    set((state) => ({
      shapes: state.shapes.filter((shape) => shape.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),

  selectShape: (id) => set({ selectedId: id }),

  setActiveTool: (tool) => set({ activeTool: tool, selectedId: null }),

  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),

  setPanOffset: (offset) => set({ panOffset: offset }),

  moveShape: (id, x, y) =>
    set((state) => ({
      shapes: state.shapes.map((shape) =>
        shape.id === id ? { ...shape, x, y } : shape
      ),
    })),

  resizeShape: (id, width, height) =>
    set((state) => ({
      shapes: state.shapes.map((shape) =>
        shape.id === id ? { ...shape, width: Math.max(10, width), height: Math.max(10, height) } : shape
      ),
    })),
}))
