import Link from "next/link";

export default function Home() {
    return 
      <main>
        <div className="hero">
          <h1>Hai, Aku Akmal! 👋</h1>
          <p>Selamat datang di website perkenalanku.</p>
          <Link href = "/hobbies">Ini hobiku</Link>
        </div>
  
  
      </main>
    ;
  }
  
