"use client"

import { useState, useRef, useEffect } from "react"
import {
  MousePointer2,
  Hand,
  Square,
  Circle,
  Type,
  Minus,
  Plus,
  Triangle,
  Star,
  ArrowRight,
  ChevronDown,
  Download
} from "lucide-react"
import { useCanvasStore } from "@/src/lib/store"
import type { Tool } from "@/src/lib/types"
import { cn } from "@/src/lib/utils"

interface ToolButtonProps {
  tool: Tool
  icon: React.ReactNode
  label: string
  shortcut?: string
  isActive?: boolean
  onClick?: () => void
}

function ToolButton({ tool, icon, label, shortcut, isActive, onClick }: ToolButtonProps) {
  const { activeTool, setActiveTool } = useCanvasStore()
  const active = isActive !== undefined ? isActive : activeTool === tool

  return (
    <button
      onClick={onClick || (() => setActiveTool(tool))}
      className={cn(
        "group relative flex h-9 w-9 items-center justify-center rounded-md transition-all",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
      title={`${label}${shortcut ? ` (${shortcut})` : ""}`}
    >
      {icon}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 pointer-events-none z-50">
        {label}
        {shortcut && <span className="ml-1.5 text-muted-foreground">{shortcut}</span>}
      </span>
    </button>
  )
}

const SHAPE_TOOLS: { id: Tool; label: string; icon: React.FC<any>; shortcut?: string }[] = [
  { id: "rectangle", label: "Rectangle", icon: Square, shortcut: "R" },
  { id: "line", label: "Line", icon: Minus, shortcut: "L" },
  { id: "arrow", label: "Arrow", icon: ArrowRight, shortcut: "Shift+L" },
  { id: "circle", label: "Ellipse", icon: Circle, shortcut: "O" },
  { id: "triangle", label: "Polygon", icon: Triangle },
  { id: "star", label: "Star", icon: Star },
]

export function Toolbar() {
  const { zoom, setZoom, activeTool, setActiveTool } = useCanvasStore()
  const [isShapeMenuOpen, setIsShapeMenuOpen] = useState(false)
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)

  // Find currently active shape tool, default to rectangle
  const currentShapeTool = SHAPE_TOOLS.find(t => t.id === activeTool) || SHAPE_TOOLS[0]
  const isShapeToolActive = SHAPE_TOOLS.some(t => t.id === activeTool)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsShapeMenuOpen(false)
      }
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleExport = async (format: string) => {
    try {
      const shapes = useCanvasStore.getState().shapes;
      const response = await fetch(`http://localhost:5000/api/files/export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ canvasData: shapes, format, name: "canvas-export" }),
      });
      
      if (!response.ok) throw new Error("Export failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `canvas-export.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      alert("Failed to export canvas");
    } finally {
      setIsExportMenuOpen(false);
    }
  }

  return (
    <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center gap-1 rounded-lg border border-border bg-toolbar p-1 shadow-lg">
      <ToolButton tool="select" icon={<MousePointer2 className="h-4 w-4" />} label="Move" shortcut="V" />
      <ToolButton tool="move" icon={<Hand className="h-4 w-4" />} label="Hand" shortcut="H" />
      
      <div className="mx-1 h-5 w-px bg-border" />
      
      {/* Shape Dropdown */}
      <div className="relative" ref={menuRef}>
        <div className="flex items-center">
          <ToolButton 
            tool={currentShapeTool.id} 
            icon={<currentShapeTool.icon className="h-4 w-4" />} 
            label={currentShapeTool.label} 
            shortcut={currentShapeTool.shortcut}
            isActive={isShapeToolActive}
            onClick={() => setActiveTool(currentShapeTool.id)}
          />
          <button
            onClick={() => setIsShapeMenuOpen(!isShapeMenuOpen)}
            className={cn(
              "flex h-9 w-4 items-center justify-center rounded-r-md transition-all -ml-1 opacity-70 hover:opacity-100 hover:bg-secondary",
              isShapeToolActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        {isShapeMenuOpen && (
          <div className="absolute left-0 top-full mt-1 w-48 rounded-md border border-border bg-popover py-1 shadow-md z-50">
            {SHAPE_TOOLS.map((shape) => {
              const Icon = shape.icon
              return (
                <button
                  key={shape.id}
                  onClick={() => {
                    setActiveTool(shape.id)
                    setIsShapeMenuOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    activeTool === shape.id ? "bg-accent/50 text-accent-foreground" : "text-popover-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{shape.label}</span>
                  </div>
                  {shape.shortcut && (
                    <span className="text-xs text-muted-foreground">{shape.shortcut}</span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <ToolButton tool="text" icon={<Type className="h-4 w-4" />} label="Text" shortcut="T" />
      
      <div className="mx-1 h-5 w-px bg-border" />
      
      <div className="flex items-center gap-1">
        <button
          onClick={() => setZoom(zoom - 0.1)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-14 text-center text-sm text-foreground">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(zoom + 0.1)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="mx-1 h-5 w-px bg-border" />
      
      {/* Export Dropdown */}
      <div className="relative" ref={exportRef}>
        <button
          onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
          className="group relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          title="Export"
        >
          <Download className="h-4 w-4" />
        </button>

        {isExportMenuOpen && (
          <div className="absolute right-0 top-full mt-1 w-40 rounded-md border border-border bg-popover py-1 shadow-md z-50">
            <button onClick={() => handleExport('png')} className="flex w-full items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground text-popover-foreground">
              Export as PNG
            </button>
            <button onClick={() => handleExport('svg')} className="flex w-full items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground text-popover-foreground">
              Export as SVG
            </button>
            <button onClick={() => handleExport('pdf')} className="flex w-full items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground text-popover-foreground">
              Export as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
