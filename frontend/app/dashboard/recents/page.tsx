import { Sparkles, ArrowRight, X, LayoutGrid, List, ChevronDown, MonitorPlay } from "lucide-react";

export default function RecentsPage() {
  const projects = [
    { title: "Ecommerce UI Design", time: "Edited 4 months ago", category: "blue", type: "design" },
    { title: "Untitled", time: "Edited 5 months ago", category: "blue", type: "design" },
    { title: "Ecommerce UI Design - Page 1", time: "Edited 5 months ago", category: "purple", type: "prototype" },
    { title: "Untitled", time: "Edited 5 months ago", category: "purple", type: "design" },
    { title: "Untitled", time: "Edited 5 months ago", category: "purple", type: "design" },
    { title: "Untitled", time: "Edited 5 months ago", category: "blue", type: "design" },
    { title: "BUS BOOKING APP (Community)", time: "Edited 7 months ago", category: "blue", type: "design" },
    { title: "BUS BOOKING APP - Prototype", time: "Edited 7 months ago", category: "purple", type: "prototype" },
  ];

  return (
    <div className="flex-1 w-full max-w-full">
      {/* Header bar */}
      <div className="flex items-center px-6 h-14 border-b border-border/40 backdrop-blur-md sticky top-0 z-20">
        <h1 className="text-sm font-semibold text-foreground">Recents</h1>
      </div>

      <div className="p-8 max-w-[1400px] mx-auto w-full">
        {/* AI Banner */}
        <div className="bg-card/40 border border-border/40 rounded-2xl p-6 mb-10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-transparent pointer-events-none" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Describe your idea and make it come to life <span className="text-[10px] uppercase font-bold bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground group-hover:text-primary transition-colors">AI</span>
            </h2>
            <button className="text-muted-foreground hover:text-foreground transition-colors p-1"><X className="w-4 h-4" /></button>
          </div>
          
          <div className="relative z-10">
            <input 
              type="text"
              placeholder="Create a landing page for an AI startup..."
              className="w-full bg-background/50 border border-border/50 hover:border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3.5 pl-4 pr-32 text-sm outline-none transition-all duration-300"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
              Make it <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 sticky top-[56px] z-10 bg-background/95 backdrop-blur py-2">
          <div className="flex items-center gap-6">
            <button className="text-sm font-semibold text-foreground border-b-2 border-foreground pb-1 -mb-[5px]">Recently viewed</button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-1 -mb-[5px]">Shared files</button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-1 -mb-[5px]">Shared projects</button>
          </div>

          <div className="flex items-center gap-2">
            {["All organizations", "All files", "Last viewed"].map((filter) => (
              <button key={filter} className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-secondary/30 hover:bg-secondary/50 border border-border/50 px-3 py-1.5 rounded-[6px] transition-colors">
                {filter} <ChevronDown className="w-3 h-3" />
              </button>
            ))}
            <div className="flex items-center ml-2 border-l border-border/50 pl-2 gap-1 text-muted-foreground">
              <button className="p-1.5 hover:bg-secondary/50 rounded transition-colors text-foreground"><LayoutGrid className="w-4 h-4" /></button>
              <button className="p-1.5 hover:bg-secondary/50 rounded transition-colors"><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="group flex flex-col bg-card/20 rounded-xl border border-border/50 overflow-hidden hover:border-border transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm hover:shadow-md">
              {/* Preview image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-secondary/50 to-background flex items-center justify-center p-6 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 ease-out">
                 <div className="absolute inset-0 bg-background/10 mix-blend-overlay"></div>
                 {/* Fake UI preview block */}
                 <div className="w-full h-full bg-background border border-border/50 rounded-lg shadow-sm flex overflow-hidden">
                    {i % 2 === 0 ? (
                      <>
                        <div className="w-1/4 border-r border-border/50 bg-secondary/20 block"></div>
                        <div className="flex-1 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                        <div className="w-1/2 h-1/2 bg-background shadow-md rounded border border-border/20"></div>
                      </div>
                    )}
                 </div>
              </div>

              {/* Footer */}
              <div className="p-3 bg-card border-t border-border/50 flex items-center gap-3">
                 <div className={`w-6 h-6 rounded flex items-center justify-center text-white shrink-0 ${p.category === 'blue' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                   {p.type === 'prototype' ? <MonitorPlay className="w-3.5 h-3.5" /> : <div className="w-2.5 h-2.5 rounded-sm bg-white/80"></div>}
                 </div>
                 <div className="min-w-0 flex-1">
                   <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{p.title}</h3>
                   <div className="flex items-center gap-2 mt-0.5">
                     <p className="text-[11px] text-muted-foreground truncate">{p.time}</p>
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
