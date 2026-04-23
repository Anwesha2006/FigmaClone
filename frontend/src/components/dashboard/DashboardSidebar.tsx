"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Clock, 
  Globe, 
  FolderOpen, 
  Trash2, 
  FileText, 
  Bell, 
  ChevronDown,
  LayoutGrid,
  ArrowUpCircle,
  FolderLock
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { name: "Recents", href: "/dashboard/recents", icon: Clock },
    { name: "Community", href: "/dashboard/contact", icon: Globe }, // routing to contact/community
  ];

  const workspaceLinks = [
    { name: "Drafts", href: "/dashboard/new", icon: FileText },
    { name: "All projects", href: "/dashboard/projects", icon: LayoutGrid },
  ];

  const NavItem = ({ link }: { link: any }) => {
    const Icon = link.icon;
    // Map /dashboard to recents to highlight recents by default if expected
    const isActive = pathname === link.href || (pathname === "/dashboard" && link.href === "/dashboard/recents");

    return (
      <Link
        href={link.href}
        className={`flex items-center gap-3 px-3 py-1.5 rounded-md transition-all duration-200 text-[13px] font-medium ${
          isActive 
            ? "bg-primary/20 text-primary" 
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        }`}
      >
        <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
        {link.name}
      </Link>
    );
  };

  return (
    <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground h-screen flex flex-col hidden md:flex shrink-0 font-sans">
      
      {/* Top Header - User Context */}
      <div className="px-4 flex items-center justify-between h-14 shrink-0 transition-colors">
        <button className="flex items-center gap-2 hover:bg-secondary rounded-md px-1.5 py-1 -ml-1.5 transition-colors group">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-chart-4 to-chart-2 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
            A
          </div>
          <span className="font-semibold text-sm group-hover:text-foreground transition-colors">Anwesha Baidya</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-secondary">
           <Bell className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-3 flex flex-col gap-5">
        
        {/* Search Bar */}
        <div className="relative group px-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-background border border-border/50 hover:border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-md py-1.5 pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 shadow-sm"
          />
        </div>

        {/* Global Links */}
        <nav className="flex flex-col gap-[2px]">
          {mainLinks.map((link) => (
            <NavItem key={link.name} link={link} />
          ))}
        </nav>

        <div className="mx-3 border-t border-border/50" />

        {/* Workspace Context */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-2 cursor-pointer group mb-1">
            <div className="flex items-center gap-2">
               <div className="w-5 h-5 rounded bg-chart-1 flex items-center justify-center text-[10px] font-bold text-white">
                 A
               </div>
               <span className="font-semibold text-[13px] truncate w-[110px] group-hover:text-primary transition-colors">Anwesha Baidya's...</span>
               <ChevronDown className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold bg-primary/20 text-primary px-1.5 py-0.5 rounded">Free</span>
          </div>
          
          <nav className="flex flex-col gap-[2px]">
            {workspaceLinks.map((link) => (
               <NavItem key={link.name} link={link} />
            ))}
          </nav>
        </div>

        <div className="mx-3 border-t border-border/50" />

        {/* Starred Projects */}
        <div className="flex flex-col gap-1">
          <div className="px-3 text-[11px] font-medium text-muted-foreground mb-1">
            Starred
          </div>
          <Link href="/dashboard/projects" className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200 text-[13px] font-medium group">
            <FolderLock className="w-4 h-4 text-muted-foreground group-hover:text-chart-2 transition-colors" />
            Team project
          </Link>
        </div>

      </div>

      {/* Upgrade CTA */}
      <div className="p-3 mb-2">
        <div className="bg-card border border-border rounded-xl p-4 text-center group hover:border-primary/40 transition-colors shadow-sm">
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/5 transition-colors">
             <ArrowUpCircle className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-[12px] text-muted-foreground leading-relaxed mb-4">
            Ready to go beyond this free plan? Upgrade for premium features.
          </p>
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-[13px] font-medium py-1.5 rounded-md transition-all duration-200">
             View plans
          </button>
        </div>
      </div>
      
    </aside>
  );
}
