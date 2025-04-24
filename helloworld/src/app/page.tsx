import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="hero bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-700">Hai, Saya Akmal! 👋</h1>
        <p className="mt-4 text-gray-600">Ini website ku yang baru aja ChatGPT kasih.</p>
        
        <Link href="/navigation" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
            Navigation
        </Link>
      </div>
    </main>
  );
}