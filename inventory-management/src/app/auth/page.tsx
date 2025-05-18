"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isLogin ? "http://localhost:3002/login" : "http://localhost:3002/signup";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", data.username || email);
      router.push("/"); // redirect ke dashboard
    } else {
      alert(data.message || data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-lime-500 text-white p-2 rounded"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
        <button className="text-blue-500 underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Daftar" : "Login"}
        </button>
      </p>
    </div>
  );
}
