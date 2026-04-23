"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_var(--border)_1px,_transparent_1px),linear-gradient(to_bottom,_var(--border)_1px,_transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-muted-foreground">Now in public beta</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">
              Design.
            </span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Collaborate.
            </span>{" "}
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">
              Create.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            The next-generation design tool that brings your creative vision to life. 
            Real-time collaboration, powerful features, and an intuitive interface.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group"
              asChild
            >
              <Link href="/sign-in">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary/50 px-8 py-6 text-lg group"
              asChild
            >
              <Link href="/editor">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Try Demo
              </Link>
            </Button>
          </div>

          {/* Mock UI Preview */}
          <div className="relative max-w-5xl mx-auto">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-2xl opacity-50" />
            
            {/* Preview Container */}
            <div className="relative rounded-xl border border-border bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-chart-4/70" />
                  <div className="w-3 h-3 rounded-full bg-chart-3/70" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-background/50 rounded-md px-4 py-1.5 text-sm text-muted-foreground text-center max-w-md mx-auto">
                    figma.app/editor
                  </div>
                </div>
              </div>

              {/* Editor Preview */}
              <div className="flex h-80 sm:h-96">
                {/* Left Sidebar */}
                <div className="w-12 bg-secondary/30 border-r border-border flex flex-col items-center py-4 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg ${
                        i === 0 ? "bg-primary/30" : "bg-muted/50"
                      } flex items-center justify-center`}
                    >
                      <div className="w-4 h-4 rounded bg-muted-foreground/30" />
                    </div>
                  ))}
                </div>

                {/* Layers Panel */}
                <div className="w-48 bg-secondary/20 border-r border-border p-3 hidden sm:block">
                  <div className="text-xs font-medium text-muted-foreground mb-3">Layers</div>
                  {["Frame 1", "Rectangle", "Text Layer", "Group"].map((layer, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${
                        i === 1 ? "bg-primary/20 text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <div className="w-3 h-3 rounded bg-muted-foreground/30" />
                      {layer}
                    </div>
                  ))}
                </div>

                {/* Canvas Area */}
                <div className="flex-1 bg-[#1a1a2e] relative p-8">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.03)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:20px_20px]" />
                  {/* Sample Shapes */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 rounded-lg bg-gradient-to-br from-primary/40 to-accent/40 border-2 border-primary/50 shadow-lg" />
                  <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-accent/30 border border-accent/50" />
                  <div className="absolute bottom-1/4 left-1/3 w-24 h-8 rounded bg-muted/30 border border-muted" />
                </div>

                {/* Right Panel */}
                <div className="w-56 bg-secondary/20 border-l border-border p-3 hidden md:block">
                  <div className="text-xs font-medium text-muted-foreground mb-3">Properties</div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Position</div>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-muted/30 rounded px-2 py-1 text-xs text-foreground">X: 120</div>
                        <div className="flex-1 bg-muted/30 rounded px-2 py-1 text-xs text-foreground">Y: 85</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Size</div>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-muted/30 rounded px-2 py-1 text-xs text-foreground">W: 192</div>
                        <div className="flex-1 bg-muted/30 rounded px-2 py-1 text-xs text-foreground">H: 128</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Fill</div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-accent" />
                        <div className="text-xs text-foreground">#6366F1</div>
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
