"use client"

import {
  MousePointer2,
  Move,
  Square,
  Circle,
  Type,
  Hand,
  Minus,
  Plus,
} from "lucide-react"
import { useCanvasStore } from "@/src/lib/store"
import type { Tool } from "@/src/lib/types"
import { cn } from "@/src/lib/utils"

interface ToolButtonProps {
  tool: Tool
  icon: React.ReactNode
  label: string
  shortcut?: string
}

function ToolButton({ tool, icon, label, shortcut }: ToolButtonProps) {
  const { activeTool, setActiveTool } = useCanvasStore()
  const isActive = activeTool === tool

  return (
    <button
      onClick={() => setActiveTool(tool)}
      className={cn(
        "group relative flex h-9 w-9 items-center justify-center rounded-md transition-all",
        isActive
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

export function Toolbar() {
  const { zoom, setZoom } = useCanvasStore()

  return (
    <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center gap-1 rounded-lg border border-border bg-toolbar p-1 shadow-lg">
      <ToolButton
        tool="select"
        icon={<MousePointer2 className="h-4 w-4" />}
        label="Select"
        shortcut="V"
      />
      <ToolButton
        tool="move"
        icon={<Hand className="h-4 w-4" />}
        label="Hand"
        shortcut="H"
      />
      <div className="mx-1 h-5 w-px bg-border" />
      <ToolButton
        tool="rectangle"
        icon={<Square className="h-4 w-4" />}
        label="Rectangle"
        shortcut="R"
      />
      <ToolButton
        tool="circle"
        icon={<Circle className="h-4 w-4" />}
        label="Circle"
        shortcut="O"
      />
      <ToolButton
        tool="text"
        icon={<Type className="h-4 w-4" />}
        label="Text"
        shortcut="T"
      />
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
    </div>
  )
}
