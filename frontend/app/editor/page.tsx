"use client";

import { Navbar } from "../../src/components/Navbar";
import { Toolbar } from "../../src/components/Toolbar";
import { Sidebar } from "../../src/components/Sidebar";
import { Canvas } from "../../src/components/Canvas";
import { PropertiesPanel } from "../../src/components/PropertiesPanel";

export default function EditorPage() {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="relative flex-1 overflow-hidden">
          <Canvas />
          <Toolbar />
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
}
