"use client";
import Link from "next/link";
import React from "react";  
import { useRouter } from "next/navigation"; 


export default function Navigation() {
  const router = useRouter(); 

  return (
    <main>
      <div className="hero">
        <h1 className="text-3xl font-bold text-yellow-900">Contoh Halaman Navigasi</h1>

        <div><Link href="/navigation/nav2">Nested Route</Link></div>
        
        <div><button onClick={() => router.push("/")}>UseRoute</button></div>
      </div>
    </main>
  );
}