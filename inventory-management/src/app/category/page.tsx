"use client";

import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function CategoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    store: "",
    price: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menambahkan item");
      }

      Swal.fire({
        title: "Sukses",
        text: "Item berhasil ditambahkan!",
        icon: "success",
        confirmButtonText: "Oke",
      });

      setIsModalOpen(false);
      setForm({ name: "", store: "", price: "", category: "" });
    } catch (error: any) {
      Swal.fire({
        title: "Gagal",
        text: error.message,
        icon: "error",
        confirmButtonText: "Oke",
      });
    }
  };

  return (
    <main className="p-6 min-h-screen bg-white flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Catalogue Index A–Z
        </h1>

        <div className="grid grid-cols-6 md:grid-cols-13 gap-2 justify-center">
          {alphabet.map((letter) => (
            <Link
              href={`/catalogue/${letter.toLowerCase()}`}
              key={letter}
              className="bg-blue-100 hover:bg-blue-500 hover:text-white text-blue-700 font-medium text-center p-3 rounded shadow transition"
            >
              {letter}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-32 text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Tambah Item
        </button>
      </div>

      {/* Modal Tambah Item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Tambah Item Baru</h2>

            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={form.name}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              name="store"
              placeholder="Toko"
              value={form.store}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Harga"
              value={form.price}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Kategori"
              value={form.category}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
