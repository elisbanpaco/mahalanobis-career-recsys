import type { Metadata } from "next";
import Link from "next/link";
import { Compass, UserCheck, BookOpen, Orbit } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Encuentra tu Órbita | Mahalanobis RecSys",
  description: "Test vocacional basado en Mahalanobis y el Modelo RIASEC para la Universidad Nacional del Altiplano de Puno.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-200 antialiased min-h-screen">
        <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 bg-slate-950/60">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                  <Orbit size={22} className="group-hover:animate-spin-slow" />
                </div>
                <span className="font-extrabold text-lg tracking-tight text-white hidden sm:block">
                  Mahalanobis<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">RecSys</span>
                </span>
              </Link>
              
              <div className="flex items-center gap-2 md:gap-4">
                <Link 
                  href="/" 
                  className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                >
                  <Compass size={18} className="text-blue-400" />
                  <span className="hidden md:block">Evaluación</span>
                </Link>
                <Link 
                  href="/arquetipo" 
                  className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                >
                  <UserCheck size={18} className="text-indigo-400" />
                  <span className="hidden md:block">Arquetipos</span>
                </Link>
                <Link 
                  href="/fundamentos" 
                  className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                >
                  <BookOpen size={18} className="text-emerald-400" />
                  <span className="hidden md:block">Fundamentos</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="pt-20 md:pt-0">
          {children}
        </div>
      </body>
    </html>
  );
}
