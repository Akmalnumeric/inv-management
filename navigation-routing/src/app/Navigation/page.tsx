import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-black to-white text-white p-9 flex text-center" >
        <h1 className="text-2xl font-[family-name:var(--font-geist-mono)] font-semibold text-center">Navigation</h1>
      </header>

     
      <main className="flex-grow p-4">
        <div className="border border-gray-300 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2 font-[family-name:var(--font-geist-mono)] text-center">Apa itu Navigating?</h2>
          <p className="font-semibold mb-2 font-[family-name:var(--font-geist-mono)] text-justify">Navigating, atau Navigation dalam Nextjs adalah cara seorang client/pengguna website bernavigasi/menjelajah website tersebut. Contoh nya adalah jika ada tombol yang jika ditekan akan mengarahkan kita ke halaman selanjutnya, Nah, itu navigating. dalam bahasa pemrograman, halaman disebut juga dengan rute, nah ada 4 cara untuk mengakses Navigasi di dalam NextJS ini, yaitu :  </p>
          <li className="font-semibold mb-2 font-[family-name:var(--font-geist-mono)] text-justify">Memakai komponen Link</li>
          <li className="font-semibold mb-2 font-[family-name:var(--font-geist-mono)] text-justify">Memakai useRouter hook (komponen klien)</li>
          <li className="font-semibold mb-2 font-[family-name:var(--font-geist-mono)] text-justify">Memakai Redirect function (komponen server)</li>
          <li className="font-semibold mb-2 font-[family-name:var(--font-geist-mono)] text-justify">Memakai native History API</li>
          <li className="m-8 font-semibold mb-2 font-[family-name:var(--font-geist-mono)] text-justify"> Link adalah komponen bawaan yang memperluas tag HTML a untuk menyediakan prapengambilan dan navigasi sisi klien antar rute. Ini adalah cara utama dan direkomendasikan untuk menavigasi antar rute di Next.js.</li>
          <img src="/contoh.png" />
          <li className="m-8 font-semibold mb-2 font-[family-name:var(--font-geist-mono)] text-justify"> useRouter adalah hook di Next.js yang memungkinkan Anda mengakses objek router dalam komponen halaman. Objek router ini berisi objek query yang menyimpan parameter query dari URL saat ini. Pada dasarnya useRouter dan Link memiliki fungsi yang sama, namun useRouter lebih fleksibel dan dapat menangani kondisi lebih kompleks dalam menavigasi website, seperti membuka halaman tertentu jika kondisi tertentu sudah terpenuhi</li>
          <img src="/contoh2.png" />
          <li className="m-8 font-semibold mb-2 font-[family-name:var(--font-geist-mono)] text-justify"> Redirect digunakan ketika sebuah halaman telah dipindahkan ke lokasi baru, sehingga pengguna yang mengakses URL lama akan secara otomatis diarahkan ke URL baru. Ini membantu menjaga pengalaman pengguna yang baik dan mencegah kesalahan 404 (halaman tidak ditemukan).</li>
          <img src="/contoh3.png" />
          <li className="m-8 font-semibold mb-2 font-[family-name:var(--font-geist-mono)] text-justify"> Dasar dari seluruh program navigasi yang ada di nextJS, Metode ini digunakan untuk memperbarui URL di bilah alamat dan menambahkan entri ke tumpukan riwayat browser tanpa memuat ulang halaman</li>
          <img src="/contoh4.png" />
          <p className="m-8 font-semibold mb-2 font-[family-name:var(--font-geist-mono)] text-justify">Berikut contoh dari penggunaan Link dan useRoute :</p>
          <div>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/Link-example"
            target="_blank"
            rel="noopener noreferrer"
          >
            contoh LINK</a>
            <a
            className="m-8 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/Routing"
            target="_blank"
            rel="noopener noreferrer"
          >
            contoh useRoute</a>
            </div>

        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>2025 @my Web</p>
      </footer>
    </div>
  );
};

export default Home;