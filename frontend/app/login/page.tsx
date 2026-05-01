"use client";

import { Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* Left Column */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-card relative overflow-hidden border-r border-border">
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
            Design together, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3">faster than ever.</span>
          </h1>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed mb-12">
            Join thousands of designers and developers collaborating in real-time. Experience the next generation of creative tools built for the modern web.
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

      {/* Right Column */}
      <div className="flex items-center justify-center p-8 sm:p-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-primary/5 to-chart-2/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-md space-y-10 relative z-10">
          <div className="lg:hidden flex items-center gap-3 group mb-12 justify-center">
            <div className="bg-primary text-primary-foreground p-2.5 rounded-xl shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter">FigmaClone</span>
          </div>

          <div className="text-center sm:text-left space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="text-base text-muted-foreground font-medium">
              Log in to your account to continue designing
            </p>
          </div>

          <div className="space-y-6">
            {/* Google OAuth */}
            <a href={`${BACKEND_URL}/api/auth/google`} className="w-full relative group block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-chart-1/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative flex items-center justify-center gap-3 w-full bg-card hover:bg-muted/40 border border-border text-foreground py-3.5 px-4 rounded-xl font-semibold transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </div>
            </a>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
                <span className="bg-background px-4 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

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
                    value={formData.email}
                    onChange={handleInputChange}
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
                  <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-background/50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground font-medium outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? "Logging in..." : "Log in"}
                    {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />}
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground font-medium pt-4">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:text-primary/80 font-semibold transition-colors underline-offset-4 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
