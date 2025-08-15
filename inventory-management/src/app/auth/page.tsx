"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fromSignup, setFromSignup] = useState(false); // trigger notifikasi login setelah signup

  // Reset form ketika masuk ke halaman login setelah signup
  useEffect(() => {
    if (isLogin && fromSignup) {
      setEmail("");
      setPassword("");
      Swal.fire({
        title: "Berhasil!",
        text: "Akun berhasil dibuat. Silakan login.",
        icon: "success",
        confirmButtonText: "Oke",
      });
      setFromSignup(false); // reset
    }
  }, [isLogin, fromSignup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isLogin ? `${baseUrl}/login` : `${baseUrl}/signup`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        if (isLogin) {
          Swal.fire({
            title: "Sukses",
            text: "Kamu berhasil login!",
            icon: "success",
            confirmButtonText: "Oke",
          });
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", data.username);
          router.replace("/");
        } else {
          // Reset input + redirect ke login mode
          setIsLogin(true);
          setFromSignup(true); // trigger efek notifikasi
        }
      } else {
        Swal.fire({
          title: "Gagal",
          text: data.message,
          icon: "error",
          confirmButtonText: "Oke",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        title: "Error",
        text: "Gagal mengirim permintaan",
        icon: "error",
        confirmButtonText: "Oke",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-white">
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? "Login" : "Sign Up"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded text-white"
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
        <button
          className="text-blue-500 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Daftar" : "Login"}
        </button>
      </p>
    </div>
  );
}
