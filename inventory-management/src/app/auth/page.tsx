"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AuthPage() {
  const router = useRouter();  //hook dari nextjs untuk memungkinkan kita navigasi menggunakan route
  const [isLogin, setIsLogin] = useState(true); // membuat variable isLogin, mengatur state menggunakan hook useState menjadi true(Login) lalu juga menginisilisasi setIsLogin untuk mengupdate state
  const [email, setEmail] = useState(""); // sama seperti diatas, disini state nya kosong
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

<<<<<<< HEAD
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
=======
  const handleSubmit = async (e: React.FormEvent) => { //mengatur fungsi handleSubmit untuk menunggu respon dari backend saat di submit
    e.preventDefault(); //agar website tidak ter refresh saat menginput data
    const url = isLogin ? "http://localhost:3001/login" : "http://localhost:3001/signup"; //endpoint fetch

    const res = await fetch(url, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });  //mengirim request POST ke server backend header nya json, body nya menggunakan method JSON.stringify untuk mengubah value javascript menjadi string json

    const data = await res.json(); //membuat variable data yang harus menunggu respon dari server dulu dalam bentuk json
>>>>>>> 8e31205d29d7e5510c584612c938da9368ff16c7

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
  };  //  kalau data sukses, set data di localStorage isLoggedIn, true(atau sudah login). Lalu menyimpan username, dan menampilkan username setelah di push ke homepage, jika username(data kiri) tidak ada, menggunakan email(data kanan). kalau gagal mengirimkan massage gagal

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
          required //di bagian email, harus memakai tipe email, lalu onChange(saat dirubah) mengubah value variable email menjadi yang diketik tadi
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required // sama dengan email
        />
        <button //
          type="submit"
          className="w-full bg-lime-500 text-white p-2 rounded" 
        >
          {isLogin ? "Login" : "Sign Up"} 
        </button>  
      </form> 
      <p className="mt-4 text-sm text-center">
<<<<<<< HEAD
        {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
        <button
          className="text-blue-500 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Daftar" : "Login"}
        </button>
=======
        {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "} 
        <button className="text-blue-500 underline" onClick={() => setIsLogin(!isLogin)}> 
          {isLogin ? "Daftar" : "Login"} 
        </button> 
>>>>>>> 8e31205d29d7e5510c584612c938da9368ff16c7
      </p>
    </div>
  ); // menggunakan ternary operator untuk mengubah value button sesuai kondisi. menggunakan fungsi onClick={() => setIsLogin(!isLogin), jika isLogin = true, akan menampilkan "login" dan dibawahnya "belum punya akun? lalu ada tombol "daftar". saat mengklik tombol daftar akan membalik kondisi isLogin, sekarang true = signup, dan akan menampilkan "daftar" dengan dibawahnya ""Sudah punya akun?" dan diikuti tombol "login"
}
