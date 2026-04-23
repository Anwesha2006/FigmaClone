"use client"

import {
  Layers,
  Image,
  Pen,
  Component,
  Grid3X3,
  Palette,
  FolderOpen,
  Search,
} from "lucide-react"
import { cn } from "@/src/lib/utils"
import { useCanvasStore } from "@/src/lib/store"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
}

function SidebarItem({ icon, label, isActive, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex h-10 w-10 items-center justify-center rounded-lg transition-all",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {icon}
      <span className="absolute left-12 whitespace-nowrap rounded bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 pointer-events-none z-50">
        {label}
      </span>
    </button>
  )
}

export function Sidebar() {
  const { shapes, selectedId, selectShape } = useCanvasStore()

  return (
    <aside className="flex w-14 flex-col items-center border-r border-border bg-sidebar py-3">
      <div className="flex flex-col gap-1.5">
        <SidebarItem
          icon={<Search className="h-5 w-5" />}
          label="Search"
        />
        <SidebarItem
          icon={<Layers className="h-5 w-5" />}
          label="Layers"
          isActive
        />
        <SidebarItem
          icon={<Component className="h-5 w-5" />}
          label="Components"
        />
        <SidebarItem
          icon={<Image className="h-5 w-5" />}
          label="Assets"
        />
        <SidebarItem
          icon={<Grid3X3 className="h-5 w-5" />}
          label="Plugins"
        />
      </div>

      <div className="my-3 h-px w-8 bg-border" />

      <div className="flex flex-1 flex-col gap-1.5">
        <SidebarItem
          icon={<Pen className="h-5 w-5" />}
          label="Draw"
        />
        <SidebarItem
          icon={<Palette className="h-5 w-5" />}
          label="Colors"
        />
        <SidebarItem
          icon={<FolderOpen className="h-5 w-5" />}
          label="Files"
        />
      </div>

      {shapes.length > 0 && (
        <div className="mt-auto w-full border-t border-border px-2 pt-3">
          <div className="max-h-40 overflow-y-auto">
            {shapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() => selectShape(shape.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs transition-colors",
                  selectedId === shape.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {shape.type === "rectangle" ? (
                  <div className="h-3 w-3 rounded-sm border border-current" />
                ) : (
                  <div className="h-3 w-3 rounded-full border border-current" />
                )}
                <span className="truncate capitalize">{shape.type}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
