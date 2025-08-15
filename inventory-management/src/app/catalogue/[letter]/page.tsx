"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type Category = {
  id: string;
  name: string;
};

export default function CatalogueLetterPage() {
  const params = useParams();
  const letter = (params.letter as string).toUpperCase();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    store: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories?startsWith=${letter}`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, [letter]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Gagal menyimpan item");
      }

      setIsModalOpen(false);
      setForm({ name: "", store: "", price: "", category: "" });
      alert("Item berhasil ditambahkan");
    } catch (err) {
      alert("Terjadi kesalahan saat menyimpan item");
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="p-6 min-h-screen bg-white flex flex-col">
  <div>
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
      Kategori Barang: Huruf {letter}
    </h1>
  </div>

  <div className="grid grid-cols-6 md:grid-cols-13 gap-2 justify-center mb-20">
    {alphabet.map((ltr) => (
      <Link
        href={`/catalogue/${ltr.toLowerCase()}`}
        key={ltr}
        className={`text-center p-3 rounded shadow transition font-medium ${
          ltr === letter
            ? "bg-blue-600 text-white"
            : "bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white"
        }`}
      >
        {ltr}
      </Link>
    ))}
  </div>


{categories.length === 0 ? (
  <p className="text-center text-gray-500">Tidak ada kategori.</p>
) : (
  <div className="max-w-3xl mx-auto overflow-x-auto">
    <table className="table-auto w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-400">
          <th className="px-4 py-2 border">No</th>
          <th className="px-4 py-2 border">Kategori</th>
          <th className="px-4 py-2 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cat, index) => (
          <tr
            key={cat.id}
            className="border-t hover:bg-gray-50 transition"
          >
            <td className="p-3">{index + 1}</td>
            <td className="p-3 font-medium">{cat.name}</td>
            <td className="p-3">
              <Link
                href={`/items/${cat.id}`}
                className="text-gray-600 hover:text-blue-600 hover:underline"
              >
                Lihat Produk
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


      {/* Footer Section */}
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
