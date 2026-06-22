"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserCheck, ArrowRight, Brain, Target, Globe, Heart, Shield, Sparkles, Compass, Zap, Flame, Lightbulb, Users, Crown } from "lucide-react";
import { DIMENSIONS } from "../../data/dimensions";

type JungArchetype = {
  id: string;
  name: string;
  desire: string;
  group: string;
  color: string;
  bgBase: string;
  textColor: string;
  icon: any;
  description: string;
  angle: number; // For circular positioning
};

const JUNG_ARCHETYPES: JungArchetype[] = [
  { id: "explorador", name: "Explorador", desire: "Libertad", group: "Realización e independencia", color: "border-blue-400", bgBase: "bg-blue-500", textColor: "text-blue-400", icon: Compass, description: "Buscas experimentar un mundo mejor, auténtico y pleno. Eres ambicioso y te encanta descubrir nuevas cosas y salir de la rutina.", angle: -75 },
  { id: "inocente", name: "Inocente", desire: "Seguridad", group: "Realización e independencia", color: "border-sky-400", bgBase: "bg-sky-500", textColor: "text-sky-400", icon: Heart, description: "Buscas ser feliz. Eres optimista, romántico y confiado. Prefieres lo simple y transparente.", angle: -45 },
  { id: "sabio", name: "Sabio", desire: "Conocimiento", group: "Realización e independencia", color: "border-indigo-400", bgBase: "bg-indigo-500", textColor: "text-indigo-400", icon: Brain, description: "Utilizas la inteligencia y el análisis para entender el mundo. Eres lógico, estudioso y valoras profundamente la verdad y la información.", angle: -15 },
  
  { id: "mago", name: "Mago", desire: "Poder", group: "Legado o dejar huella", color: "border-emerald-400", bgBase: "bg-emerald-500", textColor: "text-emerald-400", icon: Sparkles, description: "Quieres comprender las leyes fundamentales del universo y transformar la realidad. Eres carismático, visionario e inspiras a otros.", angle: 15 },
  { id: "heroe", name: "Héroe", desire: "Maestría", group: "Legado o dejar huella", color: "border-green-500", bgBase: "bg-green-600", textColor: "text-green-500", icon: Shield, description: "Tu meta es probar tu valor a través de actos valientes. Eres disciplinado, fuerte y siempre estás listo para enfrentar desafíos.", angle: 45 },
  { id: "rebelde", name: "Rebelde", desire: "Liberación", group: "Legado o dejar huella", color: "border-teal-500", bgBase: "bg-teal-600", textColor: "text-teal-500", icon: Flame, description: "Las reglas se hicieron para romperse. Buscas destruir lo que no funciona e iniciar revoluciones. Eres disruptivo e independiente.", angle: 75 },

  { id: "cotidiano", name: "Cotidiano", desire: "Pertenencia", group: "Comunidad y diversión", color: "border-amber-500", bgBase: "bg-amber-500", textColor: "text-amber-500", icon: Users, description: "Deseas conectar con los demás y pertenecer. Eres realista, empático, sin pretensiones y muy accesible.", angle: 105 },
  { id: "bufon", name: "Bufón", desire: "Diversión", group: "Comunidad y diversión", color: "border-yellow-400", bgBase: "bg-yellow-500", textColor: "text-yellow-400", icon: Zap, description: "Vives en el momento y buscas disfrutarlo al máximo. Aportas alegría, humor e irreverencia a cualquier entorno.", angle: 135 },
  { id: "amante", name: "Amante", desire: "Intimidad", group: "Comunidad y diversión", color: "border-orange-400", bgBase: "bg-orange-500", textColor: "text-orange-400", icon: Heart, description: "La intimidad y la experiencia compartida son lo tuyo. Eres pasional, comprometido y aprecias profundamente la belleza y las emociones.", angle: 165 },

  { id: "creador", name: "Creador", desire: "Innovación", group: "Estabilidad y estructura", color: "border-rose-500", bgBase: "bg-rose-600", textColor: "text-rose-500", icon: Lightbulb, description: "Tu meta es crear cosas de valor duradero. Eres imaginativo, expresivo y perfeccionista en tus obras artísticas o intelectuales.", angle: 195 },
  { id: "lider", name: "Líder", desire: "Control", group: "Estabilidad y estructura", color: "border-red-500", bgBase: "bg-red-600", textColor: "text-red-500", icon: Crown, description: "El control lo es todo para crear una comunidad próspera o exitosa. Eres autoritario, responsable y un excelente organizador.", angle: 225 },
  { id: "protector", name: "Protector", desire: "Servicio", group: "Estabilidad y estructura", color: "border-pink-400", bgBase: "bg-pink-500", textColor: "text-pink-400", icon: Target, description: "Deseas proteger y cuidar a los demás. Eres compasivo, generoso y altamente empático ante el sufrimiento o necesidad ajena.", angle: 255 },
];

export default function ArquetipoPage() {
  const [userArchetype, setUserArchetype] = useState<{ primary: JungArchetype, secondary: JungArchetype } | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeArchetype, setActiveArchetype] = useState<JungArchetype | null>(null);

  useEffect(() => {
    const scoresStr = localStorage.getItem("mahalanobis_scores");
    if (scoresStr) {
      try {
        const scores: Record<string, number> = JSON.parse(scoresStr);
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        
        if (sorted.length > 0) {
          const getArchId = (dimId: string) => {
            if (['ebr_matematica', 'transversal_pensamiento_critico'].includes(dimId)) return "sabio";
            if (['ebr_ciencia_tecnologia', 'transversal_tic'].includes(dimId)) return "mago";
            if (['ebr_comunicacion', 'ebr_ingles'].includes(dimId)) return "explorador";
            if (['ebr_ciencias_sociales', 'transversal_percepcion_social'].includes(dimId)) return "protector";
            if (['ebr_religion'].includes(dimId)) return "inocente";
            if (['ebr_ept', 'transversal_toma_decisiones'].includes(dimId)) return "lider";
            if (['ebr_arte_cultura'].includes(dimId)) return "creador";
            if (['ebr_educacion_fisica'].includes(dimId)) return "heroe";
            if (['transversal_autonomia'].includes(dimId)) return "rebelde";
            if (['transversal_resolucion_problemas'].includes(dimId)) return "sabio";
            if (['ebr_dpcc'].includes(dimId)) return "cotidiano";
            return "explorador";
          };

          const primaryId = getArchId(sorted[0][0]);
          let secondaryId = primaryId;
          
          // Buscar un arquetipo secundario diferente al primario
          let i = 1;
          while(secondaryId === primaryId && i < sorted.length) {
            secondaryId = getArchId(sorted[i][0]);
            i++;
          }
          
          const primary = JUNG_ARCHETYPES.find(a => a.id === primaryId);
          const secondary = JUNG_ARCHETYPES.find(a => a.id === secondaryId) || primary; // fallback

          if (primary && secondary) {
            setUserArchetype({ primary, secondary });
            setActiveArchetype(primary);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    setHasLoaded(true);
  }, []);

  if (!hasLoaded) return null;

  return (
    <div className="relative min-h-screen pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative max-w-6xl mx-auto px-4 md:px-8">
        {!userArchetype ? (
          <div className="animate-fade-in text-center flex flex-col items-center justify-center min-h-[60vh]">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-800/50 text-slate-400 mb-8 shadow-inner border border-white/5 relative">
              <UserCheck size={48} />
              <div className="absolute inset-0 border-2 border-dashed border-slate-600 rounded-full animate-spin-slow opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Los 12 Arquetipos de <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Carl Jung</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
              Descubre qué motivación profunda y deseo inconsciente impulsa tu perfil profesional y las decisiones de tu vida.
              <br/><br/>
              Aún no has completado la evaluación para que podamos revelar tu arquetipo dominante.
            </p>
            <Link 
              href="/"
              className="group relative inline-flex items-center gap-3 bg-amber-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-500 transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.6)]"
            >
              Realizar la Evaluación Ahora
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-amber-400 font-bold tracking-widest text-sm uppercase drop-shadow-md mb-4 block">
                Composición de Personalidad Dual
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                La Rueda de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Personalidad</span>
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Los seres humanos no somos de una sola pieza. Tu evaluación revela una sinergia entre un <strong className="text-white">Arquetipo Primario</strong> (tu esencia) y un <strong className="text-white">Arquetipo Secundario</strong> (tu estilo de soporte).
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center mb-16">
              {/* THE WHEEL UI */}
              <div className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px] shrink-0">
                {/* Center Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 rounded-full bg-slate-900 border-2 border-white/10 z-30 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <div className="text-center">
                    <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Motivación o</span>
                    <span className="text-sm md:text-base font-black text-white">DESEO</span>
                  </div>
                </div>

                {/* 4 Quadrants Background */}
                <div className="absolute inset-6 rounded-full border-2 border-white/5 opacity-50 z-0"></div>

                {/* Archetype Nodes */}
                {JUNG_ARCHETYPES.map((arch) => {
                  const isPrimary = arch.id === userArchetype.primary.id;
                  const isSecondary = arch.id === userArchetype.secondary.id;
                  const isActive = activeArchetype?.id === arch.id;
                  
                  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 210;
                  const rad = arch.angle * (Math.PI / 180);
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;

                  return (
                    <div 
                      key={arch.id}
                      className="absolute top-1/2 left-1/2 z-20 transition-transform duration-500"
                      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                    >
                      <button 
                        onMouseEnter={() => setActiveArchetype(arch)}
                        onClick={() => setActiveArchetype(arch)}
                        className={`group relative flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 shadow-xl ${
                          isPrimary ? 'ring-4 ring-offset-4 ring-offset-slate-950 ring-amber-400 scale-110 z-30' : 
                          isSecondary ? 'ring-2 ring-offset-4 ring-offset-slate-950 ring-white scale-105 z-20 opacity-90' : 
                          isActive ? 'scale-110 z-30' : 'hover:scale-105 opacity-40 hover:opacity-100'
                        } ${arch.bgBase}`}
                      >
                        <arch.icon size={24} className="text-white mb-1" />
                        
                        {/* Tooltip */}
                        <div className={`absolute ${x > 0 ? 'left-full ml-4' : 'right-full mr-4'} top-1/2 -translate-y-1/2 w-48 bg-slate-800 border border-white/10 rounded-xl p-3 shadow-2xl transition-all duration-300 pointer-events-none z-50 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                          <h4 className={`font-bold text-base ${arch.textColor}`}>{arch.name}</h4>
                          <p className="text-xs text-slate-300 mt-1">{arch.desire}</p>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* DETAILS PANEL */}
              <div className="w-full max-w-lg glass-panel rounded-[2rem] p-8 md:p-10 relative overflow-hidden transition-all duration-500 min-h-[400px] flex flex-col justify-center border-t-4" style={{ borderColor: activeArchetype ? `var(--color-${activeArchetype.id})` : 'transparent' }}>
                {activeArchetype && (
                  <div className="animate-fade-in">
                    {(userArchetype.primary.id === activeArchetype.id || userArchetype.secondary.id === activeArchetype.id) && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles size={14} className={userArchetype.primary.id === activeArchetype.id ? "text-amber-400" : "text-white"} />
                        {userArchetype.primary.id === activeArchetype.id ? 'Arquetipo Primario (Esencia)' : 'Arquetipo Secundario (Soporte)'}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${activeArchetype.bgBase}`}>
                        <activeArchetype.icon size={32} className="text-white" />
                      </div>
                      <div>
                        <h2 className={`text-3xl md:text-4xl font-extrabold ${activeArchetype.textColor}`}>{activeArchetype.name}</h2>
                        <p className="text-slate-400 font-medium">Meta principal: <span className="text-white">{activeArchetype.group}</span></p>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-xl p-5 border border-white/5 mb-6">
                      <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Deseo Inconsciente</p>
                      <p className="text-2xl font-black text-white">{activeArchetype.desire}</p>
                    </div>

                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                      {activeArchetype.description}
                    </p>

                    {(userArchetype.primary.id === activeArchetype.id || userArchetype.secondary.id === activeArchetype.id) && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20">
                        <h4 className="text-blue-400 font-bold mb-2">Sinergia Profesional</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          Al combinar el deseo de <strong>{userArchetype.primary.desire}</strong> ({userArchetype.primary.name}) con el impulso por <strong>{userArchetype.secondary.desire}</strong> ({userArchetype.secondary.name}), tu perfil opera como un profesional altamente especializado que ejecuta estrategias complejas utilizando herramientas únicas.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

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
