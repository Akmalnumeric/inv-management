"use client";

import { useState, useEffect } from "react";
import UserFormModal from "@/components/UserModal";
import ChangePasswordModal from "@/components/ChangePwModal";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type User = {
  no: number;
  username: string;
  active: string;
  keterangan: string;
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editUserData, setEditUserData] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${baseUrl}/accounts`);
      const data = await res.json();
      const numbered = data.map((u: any, i: number) => ({ no: i + 1, ...u }));
      setUsers(numbered);
    } catch (err) {
      console.error("Gagal fetch user:", err);
    }
  };

  const handleDelete = async (username: string) => {
    const ok = confirm(`Yakin hapus "${username}"?`);
    if (!ok) return;

    const res = await fetch(`${baseUrl}/accounts/${username}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("✅ User dihapus");
      fetchUsers();
    } else {
      alert("❌ Gagal hapus user");
    }
  };

  const handleSubmitUser = async (data: Omit<User, "no">) => {
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `${baseUrl}/accounts/${editUserData?.username}`
        : `${baseUrl}/accounts`;

      const payload = {
        username: data.username,
        active: data.active === "Yes" ? 1 : 0,
        keterangan: data.keterangan,
      };

      console.log("🟢 Payload yang dikirim:", JSON.stringify(payload, null, 2));

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      await fetchUsers();
      setIsModalOpen(false);
      setIsEdit(false);
      setEditUserData(null);
    } catch (err) {
      alert("❌ Terjadi kesalahan simpan");
      console.error("🛑 Error saat menyimpan:", err);
    }
  };

  const handleEditClick = (user: User) => {
    setEditUserData(user);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEdit(false);
          setEditUserData(null);
        }}
        onSubmit={handleSubmitUser}
        initialData={editUserData ?? undefined}
        isEdit={isEdit}
      />

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <input
          type="text"
          placeholder="Cari username..."
          className="border px-3 py-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEdit(false);
            setEditUserData(null);
          }}
          className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700"
        >
          + Add
        </button>
      </div>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-400">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Active</th>
            <th className="border px-4 py-2">Keterangan</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) =>
              user.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <tr key={user.no} className="text-center">
                <td className="border px-4 py-2">{user.no}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">
                  {user.active === "1" || user.active === 1 ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2">{user.keterangan}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.username)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Account Management</h2>
        <button
          onClick={() => setShowChangePassword(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ganti Password
        </button>
      </div>

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
}
