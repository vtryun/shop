"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthStore from "@/store/useUserStore";

export default function LoginPage() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
      router.push("/products");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="relative block w-full rounded-t-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-b-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-black text-white w-full px-4 py-2"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Try with the test account:</p>
          <p>
            <span className="font-medium">Username:</span>{" "}
            <span className="font-mono">emilys</span>
          </p>
          <p>
            <span className="font-medium">Password:</span>{" "}
            <span className="font-mono">emilyspass</span>
          </p>
        </div>
      </div>
    </div>
  );
}
