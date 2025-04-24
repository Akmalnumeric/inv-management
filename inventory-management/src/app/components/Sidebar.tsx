// components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">My App</h2>
      <nav className="space-y-4">
        <li><Link href="/" className="hover:bg-gray-700 p-2 rounded">Home</Link></li>
        <Link href="/about" className="hover:bg-gray-700 p-2 rounded">About</Link>
        <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
      </nav>
    </div>
  );
}
