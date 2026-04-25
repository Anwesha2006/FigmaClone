"use client"

import { useState } from "react"
import {
  Layers,
  Image,
  Pen,
  Component,
  Grid3X3,
  Palette,
  FolderOpen,
  Search,
  Type,
  Square,
  Circle,
  Minus,
  ArrowRight,
  Triangle,
  Star
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
  const [activeTab, setActiveTab] = useState<string>("Layers")

  const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? "" : tab)
  }

  const getShapeIcon = (type: string) => {
    switch (type) {
      case "rectangle": return <Square className="h-3 w-3" />
      case "circle": return <Circle className="h-3 w-3" />
      case "text": return <Type className="h-3 w-3" />
      case "line": return <Minus className="h-3 w-3" />
      case "arrow": return <ArrowRight className="h-3 w-3" />
      case "triangle": return <Triangle className="h-3 w-3" />
      case "star": return <Star className="h-3 w-3" />
      default: return <div className="h-3 w-3 rounded-sm border border-current" />
    }
  }

  return (
    <div className="flex h-full">
      <aside className="flex w-14 flex-col items-center border-r border-border bg-sidebar py-3 z-20">
        <div className="flex flex-col gap-1.5">
          <SidebarItem icon={<Search className="h-5 w-5" />} label="Search" isActive={activeTab === "Search"} onClick={() => toggleTab("Search")} />
          <SidebarItem icon={<Layers className="h-5 w-5" />} label="Layers" isActive={activeTab === "Layers"} onClick={() => toggleTab("Layers")} />
          <SidebarItem icon={<Component className="h-5 w-5" />} label="Components" isActive={activeTab === "Components"} onClick={() => toggleTab("Components")} />
          <SidebarItem icon={<Image className="h-5 w-5" />} label="Assets" isActive={activeTab === "Assets"} onClick={() => toggleTab("Assets")} />
          <SidebarItem icon={<Grid3X3 className="h-5 w-5" />} label="Plugins" isActive={activeTab === "Plugins"} onClick={() => toggleTab("Plugins")} />
        </div>

        <div className="my-3 h-px w-8 bg-border" />

        <div className="flex flex-1 flex-col gap-1.5">
          <SidebarItem icon={<Pen className="h-5 w-5" />} label="Draw" isActive={activeTab === "Draw"} onClick={() => toggleTab("Draw")} />
          <SidebarItem icon={<Palette className="h-5 w-5" />} label="Colors" isActive={activeTab === "Colors"} onClick={() => toggleTab("Colors")} />
          <SidebarItem icon={<FolderOpen className="h-5 w-5" />} label="Files" isActive={activeTab === "Files"} onClick={() => toggleTab("Files")} />
        </div>
      </aside>

      {activeTab && (
        <aside className="w-56 border-r border-border bg-sidebar flex flex-col z-10">
          <div className="p-3 border-b border-border flex items-center">
            <h3 className="text-sm font-medium text-foreground">{activeTab}</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {activeTab === "Layers" && (
              <div className="flex flex-col gap-1">
                {shapes.length === 0 ? (
                  <div className="text-center mt-8">
                    <p className="text-xs text-muted-foreground">No layers yet</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Add shapes to get started</p>
                  </div>
                ) : (
                  shapes.map((shape) => (
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
                      {getShapeIcon(shape.type)}
                      <span className="truncate capitalize">{shape.type === 'text' ? (shape.text || 'Text') : shape.type}</span>
                    </button>
                  ))
                )}
              </div>
            )}

            {activeTab === "Components" && (
              <div className="flex flex-col items-center justify-center text-center p-4 mt-8 opacity-60">
                <Component className="h-8 w-8 mb-2" />
                <p className="text-xs">No components in this file</p>
              </div>
            )}

            {activeTab === "Assets" && (
              <div className="flex flex-col items-center justify-center text-center p-4 mt-8 opacity-60">
                <Image className="h-8 w-8 mb-2" />
                <p className="text-xs">No assets available</p>
              </div>
            )}

            {activeTab === "Plugins" && (
              <div className="flex flex-col items-center justify-center text-center p-4 mt-8 opacity-60">
                <Grid3X3 className="h-8 w-8 mb-2" />
                <p className="text-xs">No plugins installed</p>
              </div>
            )}
            
            {activeTab === "Search" && (
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  placeholder="Search layers..." 
                  className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <p className="text-xs text-muted-foreground text-center mt-4">Search your canvas layers and assets</p>
              </div>
            )}

            {["Draw", "Colors", "Files"].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center text-center p-4 mt-8 opacity-60">
                <p className="text-xs">Panel content for {activeTab}</p>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  )
}
