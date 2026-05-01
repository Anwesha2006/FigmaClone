"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function OAuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user");

    if (token && user) {
      try {
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        router.replace("/dashboard/projects");
      } catch (err) {
        console.error("Failed to store auth data:", err);
        router.push("/login?error=storage_failed");
      }
    } else {
      const error = searchParams.get("error");
      router.push(`/login?error=${error || "unknown"}`);
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="text-muted-foreground font-medium">Completing sign in...</p>
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <OAuthCallbackInner />
    </Suspense>
  );
}
