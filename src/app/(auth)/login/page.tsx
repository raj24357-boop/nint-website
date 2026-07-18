"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
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

    if (role === "WORKER") {
      router.push("/worker/dashboard");
    } else if (role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to manage your bookings and services.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p> : null}
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Role</label>
              <select value={role} onChange={(event) => setRole(event.target.value)} className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm">
                <option value="CUSTOMER">Customer</option>
                <option value="WORKER">Worker</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <Button className="w-full" disabled={loading}>{loading ? "Signing in..." : "Login"}</Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Don’t have an account? <Link href="/register" className="font-medium text-primary">Create one</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
