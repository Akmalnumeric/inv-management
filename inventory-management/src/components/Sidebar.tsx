"use client";

import {
  Home,
  Menu,
  PersonStanding,
  Table2Icon,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { table } from "console";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlUsername = params.get("username");

    if (urlUsername) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", urlUsername);
      setLoggedIn(true);
      setUsername(urlUsername);

      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
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
    router.replace("/auth");
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
            <ProtectedSidebarLink
              icon={PersonStanding}
              label="User Management"
              href="/userManagement"
              isOpen={isOpen}
              isLoggedIn={loggedIn}
            />
            <SidebarLink icon={Table2Icon} label="Categories" href="/category" isOpen={isOpen}
            />
            <SidebarLink icon={ShoppingBasket} label="Barang" href="/items" isOpen={isOpen}
            />
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

// Link biasa
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

// Link yang butuh login
function ProtectedSidebarLink({ icon: Icon, label, href, isOpen, isLoggedIn }: any) {
  const router = useRouter();

  const handleClick = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Anda belum login",
        text: "Silahkan login terlebih dahulu untuk mengakses halaman ini",
        icon: "warning",
        confirmButtonText: "Login sekarang",
        showCancelButton: true,
        cancelButtonText: "Nanti",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/auth");
        }
      });
    } else {
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-3 text-sm hover:text-lime-300 w-full text-left"
    >
      <Icon className="w-5 h-5" />
      {isOpen && <span className="flex-1">{label}</span>}
    </button>
  );
}
