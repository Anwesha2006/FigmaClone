"use client"

import { useState } from "react"
import {
  ChevronDown,
  Menu,
  Layers,
  Share2,
  Play,
} from "lucide-react"

export function Navbar() {
  const [title, setTitle] = useState("Untitled")

  return (
    <header className="flex h-12 items-center justify-between border-b border-border bg-toolbar px-3 z-30 relative">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => alert("Menu opened!")}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-secondary transition-colors"
        >
          <Menu className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-1.5 ml-2 hover:bg-secondary px-2 py-1 rounded-md transition-colors cursor-pointer">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
            <Layers className="h-4 w-4 text-primary-foreground" />
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm font-medium text-foreground bg-transparent border-none outline-none w-24 hover:cursor-text focus:w-40 transition-all focus:bg-background px-1 rounded"
          />
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => alert("Presentation mode starting...")}
          className="flex h-8 items-center gap-1.5 rounded-md px-3 text-sm text-muted-foreground hover:bg-secondary transition-colors"
        >
          <Play className="h-3.5 w-3.5" />
          <span>Present</span>
        </button>
        <button 
          onClick={() => alert("Sharing link copied to clipboard!")}
          className="flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </button>
      </div>
    </header>
  )
}
