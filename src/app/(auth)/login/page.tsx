"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: Form Side */}
      <div className="flex w-full items-center justify-center bg-white px-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8 py-12">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tight text-indigo-600">nint</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">.co.in</span>
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to manage your bookings and listings.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-2xl border-slate-300 bg-slate-50 px-4 py-6 text-base focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-2xl border-slate-300 bg-slate-50 px-4 py-6 pr-12 text-base focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-indigo-600 px-4 py-6 text-base font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-1 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Branding / Image Side */}
      <div className="hidden lg:flex lg:w-1/2">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-indigo-900">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)" }} />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-md px-8 text-center">
            <div className="mb-6 inline-flex items-baseline gap-1">
              <span className="text-5xl font-black tracking-tight text-white">nint</span>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">.co.in</span>
            </div>
            <h3 className="text-3xl font-bold text-white">Welcome to your dashboard</h3>
            <p className="mt-4 text-lg text-indigo-200">
              Manage your services, bookings, and connect with customers all in one place.
            </p>
            <div className="mt-8 flex justify-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">10K+</p>
                <p className="mt-1 text-sm text-indigo-300">Verified Workers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="mt-1 text-sm text-indigo-300">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">100+</p>
                <p className="mt-1 text-sm text-indigo-300">Cities Covered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

