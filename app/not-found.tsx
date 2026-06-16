import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-heading text-[#1a1a18]/10 mb-8">404</h1>
      <h2 className="text-3xl md:text-4xl font-heading mb-6">A Missing Page</h2>
      <p className="font-body text-lg text-[#1a1a18]/70 max-w-md mb-10">
        It seems the words you are looking for have not been written, or perhaps they've been lost to the archives.
      </p>
      <Link 
        href="/"
        className="font-ui text-sm uppercase tracking-widest border-b border-[#1a1a18] pb-1 hover:text-[#1a1a18]/60 transition-colors"
      >
        Return to the Index
      </Link>
    </div>
  );
}
