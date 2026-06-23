"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { UserCheck, ArrowRight, BarChart3, Target, Sparkles, Network } from "lucide-react";
import { DIMENSIONS } from "../../data/dimensions";

export default function PerfilPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const [ebrData, setEbrData] = useState<any[]>([]);
  const [transversalData, setTransversalData] = useState<any[]>([]);
  const [globalData, setGlobalData] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"GLOBAL" | "SPLIT">("SPLIT");

  useEffect(() => {
    const scoresStr = localStorage.getItem("mahalanobis_scores");
    if (scoresStr) {
      try {
        const parsedScores: Record<string, number> = JSON.parse(scoresStr);
        setScores(parsedScores);
        
        const shortTitles: Record<string, string> = {
          ebr_matematica: "Matemática",
          ebr_comunicacion: "Comunicación",
          ebr_ciencia_tecnologia: "Ciencia y Tec.",
          ebr_ciencias_sociales: "C. Sociales",
          ebr_dpcc: "DPCC",
          ebr_ingles: "Inglés",
          ebr_ept: "Emprendimiento",
          ebr_arte_cultura: "Arte y Cultura",
          ebr_educacion_fisica: "E. Física",
          ebr_religion: "Valores",
          transversal_tic: "Competencia TIC",
          transversal_autonomia: "A. Autónomo",
          transversal_resolucion_problemas: "Resol. Problemas",
          transversal_pensamiento_critico: "P. Crítico",
          transversal_percepcion_social: "I. Emocional",
          transversal_toma_decisiones: "Liderazgo"
        };

        const data = DIMENSIONS.map(dim => ({
          subject: shortTitles[dim.id] || dim.title,
          Puntaje: parsedScores[dim.id] || 0,
          fullMark: 100,
          isTransversal: dim.id.includes('transversal')
        }));

        setGlobalData(data);
        setEbrData(data.filter(d => !d.isTransversal));
        setTransversalData(data.filter(d => d.isTransversal));
      } catch (e) {
        console.error(e);
      }
    }
    setHasLoaded(true);
  }, []);

  if (!hasLoaded) return null;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-white font-bold text-sm mb-1">{payload[0].payload.subject}</p>
          <p className="text-blue-400 font-mono text-sm">Puntaje: {payload[0].value} / 100</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative min-h-screen pt-24 pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"></div>
      </div>

      <main className="relative max-w-6xl mx-auto px-4 md:px-8">
        {!scores ? (
          <div className="animate-fade-in text-center flex flex-col items-center justify-center min-h-[60vh]">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-800/50 text-slate-400 mb-8 shadow-inner border border-white/5 relative">
              <BarChart3 size={48} />
              <div className="absolute inset-0 border-2 border-dashed border-slate-600 rounded-full animate-spin-slow opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Gráfico de <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Perfil de Competencias</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
              Visualiza en un diagrama de radar avanzado tus habilidades académicas (10 EBR) y tus competencias blandas transversales (6D).
              <br/><br/>
              Aún no has completado la evaluación para generar tu mapa cognitivo.
            </p>
            <Link 
              href="/"
              className="group relative inline-flex items-center gap-3 bg-rose-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-rose-500 transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(225,29,72,0.6)]"
            >
              Realizar la Evaluación Ahora
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <span className="text-rose-400 font-bold tracking-widest text-sm uppercase drop-shadow-md mb-4 block">
                Visualización Analítica
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Tu Mapa <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Cognitivo 16D</span>
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
                Este diagrama de radar o "Spider Chart" representa la silueta de tu cerebro profesional. Cuanto más alejado del centro está el punto, mayor es tu instinto y capacidad en esa dimensión.
              </p>

              <div className="inline-flex bg-slate-900/80 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setViewMode("SPLIT")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === "SPLIT" ? "bg-slate-800 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
                >
                  Vista Dividida (EBR vs Blandas)
                </button>
                <button 
                  onClick={() => setViewMode("GLOBAL")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === "GLOBAL" ? "bg-slate-800 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
                >
                  Radar Global 16D
                </button>
              </div>
            </div>

            {viewMode === "SPLIT" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {/* ACADEMIC RADAR */}
                <div className="glass-panel rounded-[2rem] p-6 md:p-8 flex flex-col relative border-t-4 border-t-blue-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Target size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Competencias Académicas</h3>
                      <p className="text-sm text-slate-400">10 áreas EBR (Conocimiento duro)</p>
                    </div>
                  </div>
                  <div className="w-full h-[350px] md:h-[450px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={ebrData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Radar name="EBR" dataKey="Puntaje" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.3} activeDot={{ r: 6, fill: '#60a5fa' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* TRANSVERSAL RADAR */}
                <div className="glass-panel rounded-[2rem] p-6 md:p-8 flex flex-col relative border-t-4 border-t-emerald-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Network size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Habilidades Transversales</h3>
                      <p className="text-sm text-slate-400">6 áreas Siglo XXI (Soft skills)</p>
                    </div>
                  </div>
                  <div className="w-full h-[350px] md:h-[450px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={transversalData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Radar name="Transversal" dataKey="Puntaje" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.3} activeDot={{ r: 6, fill: '#34d399' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel rounded-[2rem] p-6 md:p-10 mb-16 relative border-t-4 border-t-rose-500 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6 justify-center">
                  <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Radar Global 16D</h3>
                    <p className="text-sm text-slate-400">Todas las dimensiones combinadas</p>
                  </div>
                </div>
                <div className="w-full h-[500px] md:h-[650px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={globalData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 'bold' }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Radar name="Global" dataKey="Puntaje" stroke="#f43f5e" strokeWidth={3} fill="url(#colorUv)" fillOpacity={0.4} activeDot={{ r: 8, fill: '#fb7185' }} />
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="text-center">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
              >
                Volver a la Evaluación
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
