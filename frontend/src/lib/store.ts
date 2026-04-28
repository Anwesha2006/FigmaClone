import { create } from "zustand"
import type { Shape, Tool, CanvasState } from "./types"
import * as Y from "yjs"

let yShapesMap: Y.Map<Shape> | null = null;

export const setYShapesMap = (map: Y.Map<Shape> | null) => {
  yShapesMap = map;
}

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
  setShapes: (shapes: Shape[]) => void
  duplicateShape: (id: string) => void
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  shapes: [],
  selectedId: null,
  activeTool: "select",
  zoom: 1,
  panOffset: { x: 0, y: 0 },

  addShape: (shape) => {
    yShapesMap?.set(shape.id, shape);
    set((state) => ({
      shapes: [...state.shapes, shape],
      selectedId: shape.id,
    }));
  },

  updateShape: (id, updates) => {
    set((state) => {
      const newShapes = state.shapes.map((shape) =>
        shape.id === id ? { ...shape, ...updates } : shape
      );
      const updatedShape = newShapes.find((s) => s.id === id);
      if (updatedShape) yShapesMap?.set(id, updatedShape);
      return { shapes: newShapes };
    });
  },

  deleteShape: (id) => {
    yShapesMap?.delete(id);
    set((state) => ({
      shapes: state.shapes.filter((shape) => shape.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }));
  },

  selectShape: (id) => set({ selectedId: id }),

  setActiveTool: (tool) => set({ activeTool: tool, selectedId: null }),

  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),

  setPanOffset: (offset) => set({ panOffset: offset }),

  
  moveShape: (id, x, y) => {
    set((state) => {
      const newShapes = state.shapes.map((shape) =>
        shape.id === id ? { ...shape, x, y } : shape
      );
      const updatedShape = newShapes.find((s) => s.id === id);
      if (updatedShape) yShapesMap?.set(id, updatedShape);
      return { shapes: newShapes };
    });
  },

  resizeShape: (id, width, height) => {
    set((state) => {
      const newShapes = state.shapes.map((shape) =>
        shape.id === id ? { ...shape, width: Math.max(10, width), height: Math.max(10, height) } : shape
      );
      const updatedShape = newShapes.find((s) => s.id === id);
      if (updatedShape) yShapesMap?.set(id, updatedShape);
      return { shapes: newShapes };
    });
  },
  setShapes: (shapes) => set({ shapes }),

  duplicateShape: (id) => {
    set((state) => {
      const shapeToDuplicate = state.shapes.find((s) => s.id === id)
      if (!shapeToDuplicate) return state

      const newShape: Shape = {
        ...shapeToDuplicate,
        id: Math.random().toString(36).substr(2, 9),
        x: shapeToDuplicate.x + 20,
        y: shapeToDuplicate.y + 20,
      }

      yShapesMap?.set(newShape.id, newShape);

      return {
        shapes: [...state.shapes, newShape],
        selectedId: newShape.id,
      }
    })
  },
}))
