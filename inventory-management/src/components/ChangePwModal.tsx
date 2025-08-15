import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ChangePasswordForUserModal({ isOpen, onClose }: any) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isOpen) fetchUsers();
  }, [isOpen]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${baseUrl}/users`, 
        {
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Respon bukan array:", data);
      }
    } catch (err) {
      console.error("Gagal fetch user:", err);
    }
  };

  const handleSubmit = async () => {
    if (!selectedUser || !oldPassword || !newPassword || !confirmPassword) {
      return Swal.fire("Error", "Semua field wajib diisi", "error");
    }

    if (newPassword !== confirmPassword) {
      return Swal.fire("Error", "Password baru dan konfirmasi tidak cocok", "error");
    }

    try {
      const res = await fetch(`${baseUrl}/users/${selectedUser}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword,
          newPassword
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Gagal");

      Swal.fire("Sukses", result.message || "Password berhasil diubah", "success");
      setSelectedUser("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    } catch (err: any) {
      Swal.fire("Error", err.message || "Gagal mengubah password", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-[350px] animate-in">
        <h2 className="text-lg font-bold mb-4">Ganti Password User</h2>

        <label className="block mb-2">Pilih Akun:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full mb-4 border p-2 rounded"
        >
          <option value="">-- Accounts --</option>
          {users.map((user: any) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>

        <label className="block mb-2">Password Lama:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full mb-4 border p-2 rounded"
        />

        <label className="block mb-2">Password Baru:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-4 border p-2 rounded"
        />

        <label className="block mb-2">Konfirmasi Password Baru:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 border p-2 rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">Batal</button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
