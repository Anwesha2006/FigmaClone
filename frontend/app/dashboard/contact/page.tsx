import { Globe, Users, MessagesSquare, ArrowRight, MapPin } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="flex-1 w-full max-w-full">
      <div className="flex items-center px-6 h-14 border-b border-border/40 backdrop-blur-md sticky top-0 z-20 bg-background/80">
        <h1 className="text-sm font-semibold text-foreground">Community Hub</h1>
      </div>

      <div className="p-8 max-w-[1400px] mx-auto w-full">
        {/* Top Split area */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            <div className="bg-card border border-border/50 rounded-3xl p-8 lg:p-12 relative overflow-hidden group shadow-sm hover:border-primary/40 transition-colors cursor-pointer">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
               <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-sm border border-border">
                 <Globe className="w-7 h-7 text-primary" />
               </div>
               <h2 className="text-3xl font-bold mb-4">Explore the Community</h2>
               <p className="text-muted-foreground mb-8 text-lg text-balance">Discover thousands of free templates, plugins, and UI kits created by creators around the world.</p>
               <button className="flex items-center gap-2 text-primary font-semibold group-hover:text-primary transition-colors hover:translate-x-1">
                 Browse files <ArrowRight className="w-4 h-4" />
               </button>
            </div>

            <div className="bg-gradient-to-br from-secondary/40 to-background border border-border/50 rounded-3xl p-8 lg:p-12 shadow-sm">
               <h2 className="text-2xl font-bold mb-6">Get Support</h2>
               <div className="space-y-4">
                  <div className="flex items-center p-4 bg-card rounded-2xl border border-border/50 hover:border-primary/40 cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md">
                     <div className="w-12 h-12 rounded-full bg-chart-4/10 border border-chart-4/20 flex items-center justify-center mr-5">
                       <MessagesSquare className="w-5 h-5 text-chart-4" />
                     </div>
                     <div className="flex-1">
                        <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">Contact Support</h4>
                        <p className="text-[13px] text-muted-foreground mt-0.5">Average response time: 2 hours</p>
                     </div>
                  </div>
                  <div className="flex items-center p-4 bg-card rounded-2xl border border-border/50 hover:border-primary/40 cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md">
                     <div className="w-12 h-12 rounded-full bg-chart-2/10 border border-chart-2/20 flex items-center justify-center mr-5">
                       <Users className="w-5 h-5 text-chart-2" />
                     </div>
                     <div className="flex-1">
                        <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">Join Discord</h4>
                        <p className="text-[13px] text-muted-foreground mt-0.5">24,000+ active members</p>
                     </div>
                  </div>
               </div>
            </div>

        </div>

        {/* Global Events */}
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">Upcoming Events</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {[
             { name: "Design Systems 101", date: "Nov 12, 10:00 AM PST", loc: "Virtual" },
             { name: "FigmaClone Config 2026", date: "Dec 1, 9:00 AM EST", loc: "New York" },
             { name: "Advanced Prototyping", date: "Dec 15, 2:00 PM GMT", loc: "Virtual" }
           ].map((e,i) => (
             <div key={i} className="p-6 bg-card border border-border/50 rounded-2xl hover:border-primary/40 transition-all duration-300 cursor-pointer group shadow-sm hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="px-2.5 py-1 bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider rounded border border-primary/20">Event</div>
                  {e.loc === "New York" && <MapPin className="w-4 h-4 text-muted-foreground" />}
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{e.name}</h4>
                <p className="text-[13px] text-muted-foreground font-medium">{e.date}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
