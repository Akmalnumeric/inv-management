"use client";

import { useEffect, useState } from "react";

type Item = {
  name: string;
  store: string;
  price: string;
  category: string;
};

type Category = {
  id: number;
  name: string;
};

export default function AllItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    store: "",
    price: "",
    category: "",
  });
  const [newCategory, setNewCategory] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

      if (!res.ok) throw new Error("Gagal menyimpan item");

      setForm({ name: "", store: "", price: "", category: "" });
      setIsModalOpen(false);
      fetchItems();
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Gagal menyimpan data item.");
    }
  };

  const handleAddCategory = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!res.ok) throw new Error("Gagal menambahkan kategori");

      setNewCategory("");
      setIsCategoryModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error("Gagal tambah kategori:", err);
      alert("Gagal menambahkan kategori.");
    }
  };

  const fetchItems = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`);
      if (!res.ok) throw new Error("Failed to fetch items");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError(true);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/category`);
      if (!res.ok) throw new Error("Gagal fetch kategori");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Gagal ambil kategori:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      fetchCategories();
    }
  }, [isModalOpen]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Gagal memuat data produk.
      </p>
    );
  if (items.length === 0)
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Semua Produk Tersedia
        </h1>
        <p className="text-center text-gray-500">
          Belum ada produk tersedia.
        </p>
        <div className="text-center mt-4 space-x-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Tambah Item
          </button>
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Tambah Kategori
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-6">
        Semua Produk Tersedia
      </h1>

      <div className="flex justify-end mb-4 space-x-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah Item
        </button>
        <button
          onClick={() => setIsCategoryModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Tambah Kategori
        </button>
      </div>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-400 text-white">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Toko</th>
            <th className="border px-4 py-2">Kategori</th>
            <th className="border px-4 py-2">Harga</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="border px-4 py-2">{idx + 1}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.store}</td>
              <td className="border px-4 py-2 capitalize">{item.category}</td>
              <td className="border px-4 py-2 text-green-700 font-medium">
                {item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
              required
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

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

      {/* Modal Tambah Kategori */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Tambah Kategori Baru</h2>

            <input
              type="text"
              placeholder="Nama Kategori"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
