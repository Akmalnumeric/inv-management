"use client";

import { useEffect, useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type EditUserModalProps = {
  userId: number;
  onClose: () => void;
  onUserUpdated: () => void;
};

export default function EditUserModal({ userId, onClose, onUserUpdated }: EditUserModalProps) {
  const [username, setUsername] = useState("");
  const [active, setActive] = useState("Yes");
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${baseUrl}/users/${userId}`);
      const data = await res.json();
      setUsername(data.username);
      setActive(data.active);
      setKeterangan(data.keterangan);
    };
    fetchUser();
  }, [userId]);

  const handleUpdateUser = async () => {
    await fetch(`${baseUrl}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, active, keterangan }),
      credentials: "include",
    });
    onUserUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit User</h2>
        <div className="mb-2">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Active</label>
          <select
            className="w-full border p-2 rounded"
            value={active}
            onChange={(e) => setActive(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Keterangan</label>
          <textarea
            className="w-full border p-2 rounded"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleUpdateUser} className="bg-blue-500 px-4 py-2 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
