"use client";

import {
  Home,
  BarChart2,
  Package,
  Users,
  Settings,
  DollarSignIcon,
  LucideShoppingCart,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Ambil dari URL kalau redirect dari login
    const params = new URLSearchParams(window.location.search);
    const urlUsername = params.get("username");

    if (urlUsername) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", urlUsername);
      setLoggedIn(true);
      setUsername(urlUsername);

      // Hapus parameter dari URL
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      // Ambil dari localStorage kalau sudah login sebelumnya
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const storedUsername = localStorage.getItem("username");
      if (isLoggedIn === "true" && storedUsername) {
        setLoggedIn(true);
        setUsername(storedUsername);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="flex h-screen">
      <main
        className={`bg-black text-white p-6 flex flex-col transition-all duration-300 ${
          isOpen ? "w-64 h-234.5" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          {isOpen && <h1 className="text-xl font-bold tracking-tight font-[Arial]">INVENTORY360</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-black text-white rounded hover:bg-lime-600"
          >
            <Menu />
          </button>
        </div>

        <div className="flex-1">
          <nav className="space-y-4 mx-1">
            <SidebarLink icon={Home} label="Home" href="/" isOpen={isOpen} />
            <SidebarLink icon={DollarSignIcon} label="Sell" href="/sell" isOpen={isOpen} />
            <SidebarLink icon={BarChart2} label="Reporting" href="/reporting" badge="2" isOpen={isOpen} />
            <SidebarLink icon={LucideShoppingCart} label="Catalog" href="/catalog" isOpen={isOpen} />
            <SidebarLink icon={Package} label="Inventory" href="/inv" isOpen={isOpen} />
            <SidebarLink icon={Users} label="Customers" href="/customers" isOpen={isOpen} />
            <SidebarLink icon={Settings} label="Setup" href="/setup" isOpen={isOpen} />
          </nav>
        </div>

        {isOpen && (
          <div className="mt-6 text-sm">
            {!loggedIn ? (
              <a
                href="/auth"
                className="bg-lime-500 block text-center text-black font-semibold p-2 rounded hover:bg-lime-600"
              >
                Login
              </a>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-black font-bold">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <span>{username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white text-sm p-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarLink({ icon: Icon, label, href, badge, isOpen }: any) {
  return (
    <Link href={href} className="flex items-center gap-3 text-sm hover:text-lime-300">
      <Icon className="w-5 h-5" />
      {isOpen && (
        <>
          <span className="flex-1">{label}</span>
          {badge && (
            <span className="bg-lime-500 text-black text-xs px-2 py-0.5 rounded-full">{badge}</span>
          )}
        </>
      )}
    </Link>
  );
}
