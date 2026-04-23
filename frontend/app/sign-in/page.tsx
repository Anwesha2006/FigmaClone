"use client";

import { Mail, Lock, Sparkles, ArrowRight, Github, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* Left Column - Branding / Artistic abstract */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-card relative overflow-hidden border-r border-border">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-background/20 to-background z-0" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] z-0 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] z-0 pointer-events-none" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-sm shadow-primary/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter">FigmaClone</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg mb-12">
          <h1 className="text-5xl font-bold leading-[1.15] tracking-tight mb-8 mt-16">
            Start designing, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3">in seconds.</span>
          </h1>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed mb-12">
            Create your account to join thousands of designers and developers collaborating in real-time. Experience the next generation of creative tools built for the modern web.
          </p>
          
          <div className="flex items-center gap-5 border-t border-border/60 pt-8 mt-8">
             <div className="flex -space-x-3">
                {[
                  { color: "bg-chart-1", label: "A" },
                  { color: "bg-chart-2", label: "B" },
                  { color: "bg-chart-3", label: "C" },
                  { color: "bg-chart-4", label: "D" },
                ].map((user, i) => (
                  <div 
                    key={i} 
                    className={`w-11 h-11 rounded-full border-[3px] border-card flex items-center justify-center font-bold text-xs text-primary-foreground ${user.color} shadow-sm transition-transform hover:scale-110 hover:-translate-y-1 relative`} 
                    style={{ zIndex: 10 - i }}
                  >
                    {user.label}
                  </div>
                ))}
             </div>
             <div className="text-sm font-medium text-muted-foreground flex flex-col">
               <span className="text-foreground font-semibold text-base">24,500+</span> 
               creators online now
             </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex items-center justify-center p-8 sm:p-12 relative">
        {/* Subtle background glow for right side */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-primary/5 to-chart-2/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-md space-y-10 relative z-10">
          
          <div className="lg:hidden flex items-center gap-3 group mb-12 justify-center">
            <div className="bg-primary text-primary-foreground p-2.5 rounded-xl shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter">FigmaClone</span>
          </div>

          <div className="text-center sm:text-left space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Create an account</h2>
            <p className="text-base text-muted-foreground font-medium">
              Enter your details to get started
            </p>
          </div>

          <div className="space-y-6">
            {/* Social Login Provider */}
            <button className="w-full relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-chart-1/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center justify-center gap-3 w-full bg-card hover:bg-muted/40 border border-border text-foreground py-3.5 px-4 rounded-xl font-semibold transition-all duration-200">
                <Github className="w-5 h-5" />
                Sign up with Google
              </div>
            </button>
            
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
                <span className="bg-background px-4 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <form className="space-y-5" action="#" onSubmit={(e) => { e.preventDefault(); router.push("/dashboard"); }}>
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-foreground ml-1" htmlFor="name">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                  <input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-background/50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground font-medium outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-foreground ml-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                  <input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full bg-background/50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground font-medium outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-foreground" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                  <input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-background/50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground font-medium outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Create account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                  {/* Sweep highlight effect on hover */}
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground font-medium pt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors underline-offset-4 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
