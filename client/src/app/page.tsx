"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, BrainCircuit, Activity, Sparkles } from "lucide-react";

type AppState = "START" | "TEST" | "CALCULATING" | "RESULTS";

import { CareerRecommendation, Question, Dimension, DIMENSIONS } from "../data/dimensions";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("START");
  const [currentDimIndex, setCurrentDimIndex] = useState(0);
  const [currentSubIndex, setCurrentSubIndex] = useState(0);
  const [dimensionScores, setDimensionScores] = useState<Record<string, number[]>>({});
  const [finalScores, setFinalScores] = useState<Record<string, number>>({});
  const [results, setResults] = useState<CareerRecommendation[]>([]);

  const handleStart = () => setAppState("TEST");

  const calculateWeightedScore = (questions: Question[], answers: number[]) => {
    if (answers.length === 1 && answers[0] <= 40) return answers[0];

    const l1 = answers.filter((_, i) => questions[i].level === 1);
    const l2 = answers.filter((_, i) => questions[i].level === 2);
    const l3 = answers.filter((_, i) => questions[i].level === 3);

    const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

    let score = 0;
    if (l3.length > 0) {
      score = (avg(l1) * 0.40) + (avg(l2) * 0.40) + (avg(l3) * 0.20);
    } else if (l2.length > 0) {
      score = (avg(l1) * 0.60) + (avg(l2) * 0.40);
    } else {
      score = avg(l1);
    }
    
    return Math.round(score);
  };

  const submitTest = async (scores: Record<string, number>) => {
    setAppState("CALCULATING");
    try {
      const res = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scores)
      });
      const data = await res.json();
      setResults(data.top_careers);
      localStorage.setItem('mahalanobis_results', JSON.stringify(data.top_careers));
      localStorage.setItem('mahalanobis_scores', JSON.stringify(scores));
      setTimeout(() => setAppState("RESULTS"), 2500);
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor API Mahalanobis.");
      setAppState("START");
    }
  };

  const handleAnswer = (value: number) => {
    const dim = DIMENSIONS[currentDimIndex];
    const question = dim.questions[currentSubIndex];
    
    const currentDimAnswers = dimensionScores[dim.id] || [];
    const newAnswers = [...currentDimAnswers, value];
    
    // GATING LOGIC ACTUALIZADO: Corte temprano si en exploración o aplicación demuestran total desinterés
    let shouldSkip = false;
    
    if (question.level === 1 && value <= 40) {
      shouldSkip = true;
    } else if (question.level === 2 && value <= 40) {
      shouldSkip = true;
    }

    if (shouldSkip || currentSubIndex === dim.questions.length - 1) {
      const finalScore = calculateWeightedScore(dim.questions, newAnswers);
      const newFinalScores = { ...finalScores, [dim.id]: finalScore };
      
      setFinalScores(newFinalScores);
      setDimensionScores({ ...dimensionScores, [dim.id]: newAnswers });

      if (currentDimIndex < DIMENSIONS.length - 1) {
        setCurrentDimIndex(currentDimIndex + 1);
        setCurrentSubIndex(0);
      } else {
        submitTest(newFinalScores);
      }
    } else {
      setDimensionScores({ ...dimensionScores, [dim.id]: newAnswers });
      setCurrentSubIndex(currentSubIndex + 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-blue-950 to-slate-950 text-slate-200 selection:bg-blue-500/30">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]"></div>
      </div>

      <main className="relative max-w-4xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-24 min-h-screen flex flex-col justify-center">
        
        {/* START STATE */}
        {appState === "START" && (
          <div className="animate-slide-up flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel text-blue-400 text-sm font-semibold mb-10 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <Sparkles size={18} />
              <span>Algoritmo Mahalanobis v3.0 - SJT 5 Opciones</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-tight">
              Diseña tu <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-sm">Futuro</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-14">
              Test de Juicio Situacional con precisión psicométrica de 5 niveles. 96 escenarios reales adaptativos.
            </p>
            <button 
              onClick={handleStart}
              className="group relative inline-flex items-center gap-4 bg-blue-600 text-white font-bold text-lg md:text-xl px-12 py-6 rounded-2xl hover:bg-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.7)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              <span className="relative z-10">Iniciar Evaluación de Alto Nivel</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        )}

        {/* TEST STATE */}
        {appState === "TEST" && (
          <div className="animate-fade-in w-full max-w-4xl mx-auto">
            <div className="mb-10 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-blue-400 font-bold tracking-widest text-xs md:text-sm uppercase drop-shadow-md">
                    Área Evaluada: {currentDimIndex + 1} / {DIMENSIONS.length}
                  </span>
                  <h3 className="text-xl md:text-2xl font-medium text-slate-300 mt-2">{DIMENSIONS[currentDimIndex].title}</h3>
                </div>
                <span className="text-slate-500 font-mono text-sm">{Math.round((currentDimIndex / DIMENSIONS.length) * 100)}% Completado</span>
              </div>
              <div className="h-2 w-full glass-panel rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out relative"
                  style={{ width: `${((currentDimIndex) / DIMENSIONS.length) * 100}%` }}
                >
                  <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-md"></div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-[2rem] p-6 md:p-12 mb-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              
              <div className="mb-10">
                <span className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest ${DIMENSIONS[currentDimIndex].questions[currentSubIndex].level === 1 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : DIMENSIONS[currentDimIndex].questions[currentSubIndex].level === 2 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                  Fase {DIMENSIONS[currentDimIndex].questions[currentSubIndex].level}: {DIMENSIONS[currentDimIndex].questions[currentSubIndex].level === 1 ? 'Exploración de Afinidad' : DIMENSIONS[currentDimIndex].questions[currentSubIndex].level === 2 ? 'Análisis de Aplicación Práctica' : 'Desafío de Especialización Profunda'}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-10 leading-relaxed">
                <span className="text-blue-500 font-black mr-3">Escenario:</span>
                {DIMENSIONS[currentDimIndex].questions[currentSubIndex].q}
              </h2>
              
              <div className="flex flex-col gap-4">
                {DIMENSIONS[currentDimIndex].questions[currentSubIndex].options.map((opt, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left px-5 md:px-8 py-5 md:py-6 rounded-2xl text-base md:text-lg transition-all duration-300 flex items-center gap-6 group bg-slate-900/40 border-white/5 text-slate-300 hover:bg-blue-600/20 hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.3)] border relative overflow-hidden"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors border border-slate-700 bg-slate-800 text-slate-500 group-hover:bg-blue-500 group-hover:border-blue-400 group-hover:text-white font-mono text-sm">
                      {index + 1}
                    </div>
                    <span className="leading-relaxed group-hover:text-white transition-colors relative z-10">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <p className="text-center text-slate-500 text-sm font-medium tracking-wide">
              Lee cuidadosamente las 5 reacciones y selecciona la que describe tu comportamiento más instintivo.
            </p>
          </div>
        )}

        {/* CALCULATING STATE */}
        {appState === "CALCULATING" && (
          <div className="animate-fade-in flex flex-col items-center text-center justify-center min-h-[60vh]">
            <div className="relative mb-10">
              <BrainCircuit size={80} className="text-blue-500 animate-pulse" />
              <div className="absolute inset-0 text-blue-500 blur-2xl animate-pulse opacity-50">
                <BrainCircuit size={80} />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Computando Matrices...</h2>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
              Calculando covarianzas y distancias de Mahalanobis multidimensionales a partir de tu psicometría situacional.
            </p>
          </div>
        )}

        {/* RESULTS STATE */}
        {appState === "RESULTS" && (
          <div className="animate-slide-up w-full max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 text-blue-400 mb-8 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                <Activity size={40} />
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Tu Genética <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Profesional</span></h1>
              <p className="text-xl text-slate-400">
                Estas carreras de la UNAP presentan la menor distancia matemática hacia tu perfil conductual puro.
              </p>
            </div>

            <div className="glass-panel rounded-[2rem] p-6 md:p-10 mb-14 shadow-2xl">
              <div className="flex flex-col gap-6">
                {results.map((r, i) => (
                  <div key={i} className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 rounded-2xl transition-all duration-300 border ${i === 0 ? 'bg-blue-600/20 border-blue-500/40 shadow-[0_0_40px_-5px_rgba(59,130,246,0.3)] transform hover:scale-[1.02]' : 'bg-slate-900/50 border-white/5 hover:bg-slate-800/80 hover:border-white/10'}`}>
                    <div className="flex items-center gap-6 mb-4 md:mb-0">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-2xl font-black ${i === 0 ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' : 'bg-slate-800 text-slate-500'}`}>
                        {i + 1}
                      </div>
                      <div>
                        <h3 className={`text-2xl md:text-3xl font-bold tracking-tight mb-2 ${i === 0 ? 'text-white' : 'text-slate-200'}`}>
                          {r.career}
                        </h3>
                        <p className="text-sm font-mono text-slate-500 bg-slate-900/80 px-3 py-1 rounded-md inline-block">
                          D(Mahalanobis): {r.mahalanobis_dist.toFixed(3)}
                        </p>
                      </div>
                    </div>
                    <div className={`text-4xl md:text-5xl font-black tracking-tighter ${i === 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-sm' : 'text-slate-400'}`}>
                      {r.match_percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => {
                  setAppState("START");
                  setCurrentDimIndex(0);
                  setCurrentSubIndex(0);
                  setDimensionScores({});
                  setFinalScores({});
                }}
                className="group flex items-center justify-center gap-3 mx-auto px-8 py-4 rounded-xl border border-white/10 text-slate-300 font-bold hover:bg-white/10 hover:text-white transition-all hover:scale-105"
              >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Reiniciar Mapeo Cognitivo
              </button>
            </div>
          </div>
        )}
        
      </main>
    </div>
  );
}
