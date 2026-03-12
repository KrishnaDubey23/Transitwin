"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const result = await signIn(email, password);
    setIsLoading(false);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-[#E5E5E5] bg-white p-8 shadow-sm">
          <Link href="/" className="text-xl font-semibold text-[#111111]">
            TransitWin
          </Link>
          <h1 className="mt-6 font-sans text-2xl font-normal text-[#111111]">
            Welcome back
          </h1>
          <p className="mt-1 text-[#6B6B6B] text-sm">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-lg border-[#E5E5E5] bg-[#FAFAFA]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-lg border-[#E5E5E5] bg-[#FAFAFA]"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#111111] py-3 text-sm font-medium text-white hover:bg-[#333333] disabled:opacity-60 transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6B6B6B]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-[#111111] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
