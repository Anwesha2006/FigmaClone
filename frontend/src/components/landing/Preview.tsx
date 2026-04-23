"use client";

import { MousePointer2, Square, Circle, Type, Hand, Minus } from "lucide-react";

export function Preview() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            A workspace that adapts to you
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our intuitive interface puts powerful tools at your fingertips while staying out of your way.
          </p>
        </div>

        {/* Large Editor Preview */}
        <div className="relative">
          {/* Outer Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-3xl blur-3xl opacity-30" />

          {/* Main Container */}
          <div className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-toolbar border-b border-border">
              <div className="flex items-center gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-foreground" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">Figma</span>
                </div>

                {/* File Menu */}
                <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="px-2 py-1 hover:bg-secondary rounded cursor-pointer">File</span>
                  <span className="px-2 py-1 hover:bg-secondary rounded cursor-pointer">Edit</span>
                  <span className="px-2 py-1 hover:bg-secondary rounded cursor-pointer">View</span>
                </div>
              </div>

              {/* Center Tools */}
              <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
                {[
                  { icon: MousePointer2, active: true },
                  { icon: Hand, active: false },
                  { icon: Square, active: false },
                  { icon: Circle, active: false },
                  { icon: Type, active: false },
                  { icon: Minus, active: false },
                ].map((tool, i) => (
                  <button
                    key={i}
                    className={`p-2 rounded-md transition-colors ${
                      tool.active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <tool.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-3 py-1.5 bg-secondary rounded-md">100%</span>
                </div>
                <button className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Share
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex h-[500px]">
              {/* Left Sidebar */}
              <div className="w-14 bg-sidebar border-r border-border flex flex-col items-center py-4 gap-2">
                {[
                  { icon: MousePointer2, active: true },
                  { icon: Hand, active: false },
                  { icon: Square, active: false },
                  { icon: Circle, active: false },
                  { icon: Type, active: false },
                ].map((tool, i) => (
                  <button
                    key={i}
                    className={`p-2.5 rounded-lg transition-all ${
                      tool.active
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <tool.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>

              {/* Layers Panel */}
              <div className="w-60 bg-sidebar border-r border-border hidden lg:block">
                <div className="p-3 border-b border-border">
                  <span className="text-xs font-medium text-muted-foreground">LAYERS</span>
                </div>
                <div className="p-2">
                  {[
                    { name: "Hero Section", indent: 0 },
                    { name: "Header", indent: 1, selected: true },
                    { name: "Logo", indent: 2 },
                    { name: "Navigation", indent: 2 },
                    { name: "Content", indent: 1 },
                    { name: "Title Text", indent: 2 },
                    { name: "CTA Button", indent: 2 },
                    { name: "Background", indent: 1 },
                  ].map((layer, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer transition-colors ${
                        layer.selected
                          ? "bg-primary/20 text-foreground"
                          : "text-muted-foreground hover:bg-secondary"
                      }`}
                      style={{ paddingLeft: `${layer.indent * 12 + 8}px` }}
                    >
                      <div className="w-3 h-3 rounded-sm bg-muted-foreground/30" />
                      <span className="truncate">{layer.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canvas */}
              <div className="flex-1 bg-canvas relative overflow-hidden">
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.02)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:24px_24px]" />

                {/* Design Elements */}
                <div className="absolute inset-8 flex items-center justify-center">
                  {/* Main Frame */}
                  <div className="relative w-full max-w-2xl bg-card/30 rounded-xl border border-border p-8">
                    {/* Selection Handles */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 bg-primary rounded-sm" />

                    {/* Content */}
                    <div className="space-y-6">
                      <div className="w-32 h-8 bg-primary/20 rounded-lg" />
                      <div className="space-y-3">
                        <div className="w-3/4 h-6 bg-foreground/10 rounded" />
                        <div className="w-1/2 h-6 bg-foreground/10 rounded" />
                      </div>
                      <div className="flex gap-4">
                        <div className="w-28 h-10 bg-primary rounded-lg" />
                        <div className="w-28 h-10 bg-secondary rounded-lg border border-border" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-12 right-12 w-20 h-20 rounded-full bg-accent/20 border border-accent/30" />
                  <div className="absolute bottom-20 left-16 w-16 h-16 bg-primary/20 rounded-lg border border-primary/30 rotate-12" />
                </div>

                {/* Cursor */}
                <div className="absolute top-1/3 right-1/3">
                  <div className="relative">
                    <MousePointer2 className="w-5 h-5 text-primary fill-primary" />
                    <div className="absolute top-5 left-2 px-2 py-1 bg-primary rounded text-[10px] text-primary-foreground whitespace-nowrap">
                      Alex M.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Properties Panel */}
              <div className="w-64 bg-sidebar border-l border-border hidden md:block">
                <div className="p-3 border-b border-border">
                  <span className="text-xs font-medium text-muted-foreground">PROPERTIES</span>
                </div>
                <div className="p-4 space-y-6">
                  {/* Position */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Position</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 bg-secondary/50 rounded-md px-3 py-2">
                        <span className="text-xs text-muted-foreground">X</span>
                        <span className="text-sm text-foreground">120</span>
                      </div>
                      <div className="flex items-center gap-2 bg-secondary/50 rounded-md px-3 py-2">
                        <span className="text-xs text-muted-foreground">Y</span>
                        <span className="text-sm text-foreground">85</span>
                      </div>
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Size</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 bg-secondary/50 rounded-md px-3 py-2">
                        <span className="text-xs text-muted-foreground">W</span>
                        <span className="text-sm text-foreground">640</span>
                      </div>
                      <div className="flex items-center gap-2 bg-secondary/50 rounded-md px-3 py-2">
                        <span className="text-xs text-muted-foreground">H</span>
                        <span className="text-sm text-foreground">320</span>
                      </div>
                    </div>
                  </div>

                  {/* Fill */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Fill</label>
                    <div className="flex items-center gap-3 bg-secondary/50 rounded-md px-3 py-2">
                      <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-accent" />
                      <div>
                        <div className="text-sm text-foreground">#6366F1</div>
                        <div className="text-xs text-muted-foreground">100%</div>
                      </div>
                    </div>
                  </div>

                  {/* Stroke */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Stroke</label>
                    <div className="flex items-center gap-3 bg-secondary/50 rounded-md px-3 py-2">
                      <div className="w-8 h-8 rounded-md border-2 border-border bg-transparent" />
                      <div>
                        <div className="text-sm text-foreground">None</div>
                        <div className="text-xs text-muted-foreground">0px</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
