export default function Home() {
  return (
    <div className="animation-bounce grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <p className="animate-bounce mb-2 tracking-[-.01em] row-start-2">
            Webpage khusus{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              Navigation Routing
            </code>
            .
          </p>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row row-start-2">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto "
            href="/Navigation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Navigation
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/Routing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Routing

          
          </a>
        </div>
      </main>
     

    </div>
  );
}
