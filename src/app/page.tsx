import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--brand-primary)] text-white">
      <div className="mb-6 relative h-24 w-48">
        <Image 
          src="/logo.png" 
          alt="Nanee AI Logo" 
          fill 
          className="object-contain" 
          priority
        />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Nanee AI API</h1>
    </div>
  );
}
