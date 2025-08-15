"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  name: string;
  store: string;
  price: string;
};

export default function ItemsPage() {
  const params = useParams();
  const rawCategoryId = params?.id;
  const categoryId = Array.isArray(rawCategoryId) ? rawCategoryId[0] : rawCategoryId;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    console.log("categoryId:", categoryId); // 👈 DEBUG
    if (!categoryId) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/by-category/${categoryId}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        if (data) setProducts(data);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (notFound || products.length === 0)
    return <p className="text-center mt-10 text-gray-500">Produk tidak ditemukan.</p>;

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center capitalize text-gray-800">
        Produk: {categoryId}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h2>
            <p className="text-gray-600">Toko: {item.store}</p>
            <p className="text-green-600 font-bold mt-2">{item.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
