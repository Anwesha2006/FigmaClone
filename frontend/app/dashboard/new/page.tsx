import { Plus, Maximize, Smartphone, Monitor, Code } from "lucide-react";
import Link from "next/link";

export default function DraftsPage() {
  const templates = [
    { title: "Blank Canvas", desc: "Start from a clean slate", icon: Maximize, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Mobile App", desc: "iOS & Android ready", icon: Smartphone, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Web Dashboard", desc: "Admin interfaces", icon: Monitor, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Code Component", desc: "React/Next.js setup", icon: Code, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="flex-1 w-full max-w-full">
      <div className="flex items-center px-6 h-14 border-b border-border/40 backdrop-blur-md sticky top-0 z-20">
        <h1 className="text-sm font-semibold text-foreground">Drafts & New</h1>
      </div>

      <div className="p-8 max-w-[1400px] mx-auto w-full">
        {/* Hero Create */}
        <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/5 border border-border/50 p-10 mb-12 overflow-hidden flex items-center justify-between shadow-sm">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
           <div className="relative z-10 max-w-xl">
             <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">What will you design today?</h2>
             <p className="text-lg text-muted-foreground mb-8 text-balance">Choose a starting point or dive into a blank canvas. Your drafts are autosaved and private until you share them.</p>
             <Link href="/editor" className="inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:-translate-y-1">
               <Plus className="w-5 h-5" /> Let's Go
             </Link>
           </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-6">Start with a template</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((t, i) => (
            <Link key={i} href="/editor" className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-48">
              <div className={`w-14 h-14 rounded-2xl ${t.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                <t.icon className={`w-7 h-7 ${t.color}`} />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{t.title}</h4>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
