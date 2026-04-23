import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Search</h1>
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input 
          type="text"
          placeholder="Search files, projects, or people..."
          className="w-full bg-card border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300"
          autoFocus
        />
      </div>
      <div className="mt-8 text-center py-20 text-muted-foreground border border-dashed border-border rounded-xl bg-card/30">
        Start typing to see results...
      </div>
    </div>
  );
}
