"use client"

import {
  ChevronDown,
  Menu,
  Layers,
  Share2,
  Play,
} from "lucide-react"

export function Navbar() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-border bg-toolbar px-3">
      <div className="flex items-center gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-secondary transition-colors">
          <Menu className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
            <Layers className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">Untitled</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex h-8 items-center gap-1.5 rounded-md px-3 text-sm text-muted-foreground hover:bg-secondary transition-colors">
          <Play className="h-3.5 w-3.5" />
          <span>Present</span>
        </button>
        <button className="flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </button>
      </div>
    </header>
  )
}
