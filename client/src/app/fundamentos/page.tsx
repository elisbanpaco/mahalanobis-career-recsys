"use client";

import { useState } from "react";
import { BookOpen, GraduationCap, Network, CheckCircle2, ChevronDown, Activity, Sparkles, BrainCircuit, ShieldCheck, Landmark } from "lucide-react";

const EBR_COMPETENCIES = [
  { name: "Matemática", desc: "Resolución de problemas, formas, movimiento, gestión de datos e incertidumbre." },
  { name: "Comunicación", desc: "Expresión oral, comprensión lectora y producción de textos en lengua materna." },
  { name: "Ciencia y Tecnología", desc: "Indagación mediante métodos científicos y comprensión del mundo físico, químico y biológico." },
  { name: "Ciencias Sociales", desc: "Construcción de interpretaciones históricas, gestión del espacio, ambiente y recursos económicos." },
  { name: "Desarrollo Personal (DPCC)", desc: "Construcción de identidad, convivencia ciudadana y participación democrática." },
  { name: "Inglés", desc: "Comunicación asertiva y comprensión profunda como lengua extranjera." },
  { name: "Educación para el Trabajo", desc: "Gestión de proyectos de emprendimiento económico o social (EPT)." },
  { name: "Arte y Cultura", desc: "Apreciación y creación de proyectos desde los lenguajes artísticos." },
  { name: "Educación Física", desc: "Desarrollo de la corporeidad y asunción de una vida saludable." },
  { name: "Educación Religiosa / Valores", desc: "Formación de la conciencia moral, espiritual y ética." }
];

const TRANSVERSAL_COMPETENCIES = [
  { name: "Tecnología de la Información (TIC)", desc: "Dominio de entornos virtuales, programación y gestión tecnológica." },
  { name: "Aprendizaje Autónomo", desc: "Capacidad para investigar y dominar conceptos sin supervisión externa." },
  { name: "Resolución de Problemas Complejos", desc: "Disección analítica de crisis sistémicas y creación de soluciones óptimas." },
  { name: "Pensamiento Crítico", desc: "Cuestionamiento de dogmas, validación de fuentes y argumentación lógica." },
  { name: "Inteligencia Emocional", desc: "Empatía clínica, percepción social y manejo asertivo del estrés." },
  { name: "Toma de Decisiones y Liderazgo", desc: "Capacidad de guiar equipos y asumir riesgos bajo altos niveles de incertidumbre." }
];

const FAQS = [
  {
    q: "¿Por qué este test es más preciso que los tradicionales?",
    a: "La mayoría de tests vocacionales utilizan preguntas planas (Escala Likert) como '¿Te gustan los números? (Sí/No)'. Este algoritmo utiliza un Test de Juicio Situacional (SJT), exponiéndote a escenarios de la vida real con 5 niveles crecientes de complejidad de reacción. Esto anula el sesgo psicológico de autoengaño y mide tu verdadero instinto conductual."
  },
  {
    q: "¿Qué es la Distancia de Mahalanobis y por qué es crucial?",
    a: "A diferencia de la distancia Euclidiana (que usan los tests comunes), la métrica de Mahalanobis comprende la 'covarianza'. Si eres bueno en Matemáticas y en Física, un test normal sumaría esos puntos doblemente, creando un perfil falso. Mahalanobis entiende que esas variables están correlacionadas matemáticamente y ajusta el cálculo en un espacio multidimensional de 16 ejes, logrando una precisión milimétrica al buscar la carrera que más se acerca a tu 'centro de gravedad' estadístico."
  },
  {
    q: "¿De dónde provienen las 10 competencias EBR evaluadas?",
    a: "Están extraídas directamente del Currículo Nacional de la Educación Básica (CNEB) establecido por el Ministerio de Educación (MINEDU) del Estado Peruano. Al alinear el algoritmo con los estándares nacionales reales, garantizamos que el salto entre el colegio y la universidad sea coherente con lo que el estudiante realmente ha experimentado académicamente."
  },
  {
    q: "¿Para qué sirven las 6 competencias transversales adicionales?",
    a: "El mundo moderno no se define solo por lo que sabes en el colegio. Hemos incorporado 6 habilidades blandas y cognitivas críticas extraídas de estándares globales (como el Foro Económico Mundial y O*NET). Puedes ser un genio matemático, pero si tu Inteligencia Emocional es baja, tu arquetipo y carrera ideal cambian radicalmente. Estas 6 dimensiones cierran la brecha entre la teoría escolar y el éxito en el mercado laboral real."
  }
];

export default function FundamentosPage() {
  const [openFaq, setOpenFaq] = useState<number | 0>(0);

  return (
    <div className="relative min-h-screen pt-24 pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"></div>
      </div>

      <main className="relative max-w-5xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 text-emerald-400 mb-8 shadow-inner border border-white/5">
            <BookOpen size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Fundamentos <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Científicos</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Arquitectura de un motor de recomendación de 16 dimensiones. Basado en el Currículo del Estado Peruano y estadística de alta precisión.
          </p>
        </div>

        {/* 10 EBR */}
        <section className="mb-24 animate-slide-up">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
              <Landmark size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Las 10 Competencias EBR</h2>
              <p className="text-slate-400 text-sm mt-1">Fuente oficial: Ministerio de Educación del Perú (MINEDU)</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EBR_COMPETENCIES.map((comp, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border-l-4 border-l-red-500 hover:bg-slate-800/80 transition-colors flex gap-4 items-start">
                <div className="shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-red-400 border border-white/5 shadow-inner">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-200 mb-1">{comp.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6 TRANSVERSALES */}
        <section className="mb-24 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Network size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">6 Competencias Transversales</h2>
              <p className="text-slate-400 text-sm mt-1">Habilidades críticas de alto impacto para el Siglo XXI</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRANSVERSAL_COMPETENCIES.map((comp, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border-l-4 border-l-blue-500 hover:bg-slate-800/80 transition-colors flex gap-4 items-start">
                <div className="shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 border border-white/5 shadow-inner">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-200 mb-1">{comp.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ROBUSTNESS */}
        <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Solidez del Motor RecSys</h2>
              <p className="text-slate-400 text-sm mt-1">¿Por qué es uno de los algoritmos más robustos?</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'ring-1 ring-emerald-500/30 bg-slate-800/80' : 'hover:bg-slate-800/60'}`}
                >
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className={`font-bold text-lg md:text-xl pr-8 ${isOpen ? 'text-white' : 'text-slate-300'}`}>
                      {faq.q}
                    </span>
                    <ChevronDown className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-400' : 'text-slate-500'}`} />
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="w-full h-[1px] bg-white/5 mb-4"></div>
                    <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
