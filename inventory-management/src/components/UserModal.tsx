"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { username: string; active: string; keterangan: string }) => void;
  initialData?: {
    username: string;
    active: string;
    keterangan: string;
  }; 
  isEdit?: boolean;
}

export default function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEdit = false,
}: UserFormModalProps) {
  const [username, setUsername] = useState("");
  const [active, setActive] = useState("Yes");
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    if (initialData) {
      setUsername(initialData.username);
      setActive(initialData.active);
      setKeterangan(initialData.keterangan);
    } else {
      setUsername("");
      setActive("Yes");
      setKeterangan("");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!username.trim()) return; 
    onSubmit({ username, active, keterangan, });
    onClose();
  };
   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">{isEdit ? "Edit User" : "Add New User"}</h2>

        {/* Username */}
        <div className="mb-2">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Active toggle */}
        <div className="mb-4">
          <label className="block mb-1">Active</label>
          <div className="flex items-center gap-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={active === "Yes"}
                onChange={(e) => setActive(e.target.checked ? "Yes" : "No")}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-lime-500 transition-all relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all" />
              </div>
            </label>
            <span>{active}</span>
          </div>
        </div>

        {/* Keterangan */}
        <div className="mb-4">
          <label className="block mb-1">Keterangan</label>
          <textarea
            className="w-full border p-2 rounded"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-lime-500 text-black px-4 py-2 rounded hover:bg-lime-600"
          >
            {isEdit ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
