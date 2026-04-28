"use client";

import { use } from "react";
import { Navbar } from "@/src/components/Navbar";
import { Toolbar } from "@/src/components/Toolbar";
import { Sidebar } from "@/src/components/Sidebar";
import { Canvas } from "@/src/components/Canvas";
import { PropertiesPanel } from "@/src/components/PropertiesPanel";

export default function CanvasPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const fileId = resolvedParams.id;

  return (
    <div className="flex h-screen flex-col bg-background text-foreground overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="relative flex-1 overflow-hidden">
          <Canvas fileId={fileId} />
          <Toolbar />
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
}
