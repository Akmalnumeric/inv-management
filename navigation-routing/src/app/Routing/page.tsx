'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Routing() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Misalnya login berhasil
    if (username === 'admin' && password === '1234') {
      router.push('/dashboard-routingexample'); // redirect ke dashboard
    } else {
      alert('karena useRoute bersifat kondisional, kalau akun atau password mu salah, akan muncul notifikasi ini!');
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </main>
  );
}
