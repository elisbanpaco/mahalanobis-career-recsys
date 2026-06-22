"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Sparkles, Activity, BrainCircuit } from "lucide-react";

type AppState = "START" | "TEST" | "CALCULATING" | "RESULTS";

interface CareerRecommendation {
  career: string;
  match_percentage: number;
  mahalanobis_dist: number;
}

// Las 16 Dimensiones estrictas de la API (10 EBR + 6 Transversales)
const DIMENSIONS = [
  { id: 'ebr_matematica', title: 'Matemática', question: 'Si te dan un problema matemático o un cálculo presupuestal complejo, ¿qué haces?', options: [ { label: 'Me frustro y evito hacerlo o pido que alguien más lo resuelva.', value: 20 }, { label: 'Lo resuelvo aplicando las fórmulas que me enseñaron, sin complicarme.', value: 60 }, { label: 'Me entusiasma el reto, armo hojas de cálculo y analizo los números a fondo.', value: 100 } ] },
  { id: 'ebr_comunicacion', title: 'Comunicación', question: 'Al momento de exponer un tema frente a un público o redactar un ensayo extenso...', options: [ { label: 'Me pone nervioso y busco excusas para no hacerlo.', value: 20 }, { label: 'Cumplo con lo básico, preparo un guion y leo la información.', value: 60 }, { label: 'Disfruto organizando mis ideas, buscando persuadir y captar la atención de todos.', value: 100 } ] },
  { id: 'ebr_ciencia_tecnologia', title: 'Ciencia y Tecnología', question: 'Cuando ocurre un fenómeno natural inusual o hay un descubrimiento científico...', options: [ { label: 'Simplemente lo observo y sigo con mi rutina.', value: 20 }, { label: 'Leo las noticias para entender superficialmente qué pasó.', value: 60 }, { label: 'Investigo las causas físicas/químicas y busco las explicaciones científicas de fondo.', value: 100 } ] },
  { id: 'ebr_ciencias_sociales', title: 'Ciencias Sociales', question: 'Al debatir sobre historia, geografía o problemas sociales del país...', options: [ { label: 'Me da igual, esos temas me aburren.', value: 20 }, { label: 'Escucho los comentarios, pero no profundizo ni debato.', value: 60 }, { label: 'Leo propuestas, analizo el impacto social e histórico y debato con argumentos.', value: 100 } ] },
  { id: 'ebr_dpcc', title: 'Desarrollo Personal y Ciudadanía (DPCC)', question: 'Ocurre un conflicto entre dos compañeros o surge un dilema ético. ¿Cómo actúas?', options: [ { label: 'No me meto, es problema de los demás.', value: 20 }, { label: 'Intento calmar las cosas si me afecta directamente.', value: 60 }, { label: 'Intervengo para mediar, buscando que ambos dialoguen y lleguen a un acuerdo justo.', value: 100 } ] },
  { id: 'ebr_ingles', title: 'Inglés', question: 'Encuentras un artículo o documentación técnica vital, pero está completamente en inglés...', options: [ { label: 'Lo ignoro y busco algo parecido en español.', value: 20 }, { label: 'Uso un traductor automático para captar la idea principal y terminar rápido.', value: 60 }, { label: 'Lo analizo con interés, intentando comprender el vocabulario por mi cuenta.', value: 100 } ] },
  { id: 'ebr_ept', title: 'Educación para el Trabajo (EPT)', question: 'Ante la idea de iniciar un pequeño proyecto comercial o emprendimiento escolar...', options: [ { label: 'No me interesa, prefiero seguir instrucciones que ya estén dadas.', value: 20 }, { label: 'Ayudo con tareas específicas si me dicen exactamente qué hacer.', value: 60 }, { label: 'Pienso en un producto útil, evalúo costos y organizo un plan comercial.', value: 100 } ] },
  { id: 'ebr_arte_cultura', title: 'Arte y Cultura', question: 'Cuando asistes a un evento artístico o tienes la oportunidad de diseñar algo visual...', options: [ { label: 'No le presto mucha atención, lo visual no es mi fuerte.', value: 20 }, { label: 'Aprecio que se vea bien, pero no me involucro en la creación.', value: 60 }, { label: 'Disfruto muchísimo la estética, el diseño y la expresión artística creativa.', value: 100 } ] },
  { id: 'ebr_educacion_fisica', title: 'Educación Física', question: 'Durante actividades físicas, deportivas o prácticas de campo...', options: [ { label: 'Trato de evitar participar o pongo alguna excusa para no cansarme.', value: 20 }, { label: 'Participo lo necesario para cumplir con el requisito.', value: 60 }, { label: 'Me emociona, exijo mi cuerpo al máximo y disfruto la destreza física.', value: 100 } ] },
  { id: 'ebr_religion', title: 'Valores / Religión', question: 'Al reflexionar sobre temas éticos profundos, ayuda humanitaria o espiritualidad...', options: [ { label: 'No me interesa participar en este tipo de debates.', value: 20 }, { label: 'Escucho por respeto, pero no me involucro más allá de lo necesario.', value: 60 }, { label: 'Participo con convicción, me importa el propósito humanitario y moral.', value: 100 } ] },
  { id: 'transversal_tic', title: 'Tecnologías de la Información (TIC)', question: 'Si necesitas usar un nuevo software avanzado, base de datos o herramientas digitales complejas...', options: [ { label: 'Pido a alguien de soporte que lo haga por mí.', value: 20 }, { label: 'Veo un tutorial rápido para usar solo lo básico.', value: 60 }, { label: 'Me encanta explorar el sistema, configurarlo y exprimir sus funciones.', value: 100 } ] },
  { id: 'transversal_autonomia', title: 'Aprendizaje Autónomo', question: 'Cuando tienes que aprender algo totalmente nuevo para mantenerte actualizado...', options: [ { label: 'Espero a que me den una capacitación oficial u obligatoria.', value: 20 }, { label: 'Busco ayuda de alguien que ya sepa para que me lo explique.', value: 60 }, { label: 'Investigo de manera autodidacta, leo y aprendo por mi propia cuenta de forma proactiva.', value: 100 } ] },
  { id: 'transversal_resolucion_problemas', title: 'Resolución de Problemas', question: 'Frente a un problema técnico o situacional muy complejo donde la respuesta no es obvia...', options: [ { label: 'Me estreso y delego el problema a alguien superior.', value: 20 }, { label: 'Pruebo la primera solución que se me ocurre a ver si hay suerte.', value: 60 }, { label: 'Desarmo el problema en partes, evalúo variables y creo una solución estructurada.', value: 100 } ] },
  { id: 'transversal_pensamiento_critico', title: 'Pensamiento Crítico', question: 'Al evaluar una propuesta o plan de acción de terceros, ¿cómo reaccionas?', options: [ { label: 'Acepto lo que dice la mayoría sin cuestionar.', value: 20 }, { label: 'Reviso que cumpla los requisitos mínimos formales.', value: 60 }, { label: 'Aplico lógica pura, busco fallas en el argumento y evalúo los pros y contras.', value: 100 } ] },
  { id: 'transversal_percepcion_social', title: 'Inteligencia Emocional', question: 'Al trabajar con personas (clientes, pacientes, usuarios) que están molestos o preocupados...', options: [ { label: 'Los ignoro o les respondo de forma seca y cortante.', value: 20 }, { label: 'Les doy la solución técnica sin involucrarme emocionalmente.', value: 60 }, { label: 'Muestro empatía, calmo la situación y me ajusto al estado emocional de la persona.', value: 100 } ] },
  { id: 'transversal_toma_decisiones', title: 'Toma de Decisiones', question: 'Cuando tienes que tomar una decisión que involucra riesgos o el futuro de un proyecto...', options: [ { label: 'Evito tomarla y prefiero que otro asuma la responsabilidad.', value: 20 }, { label: 'Tomo la decisión basándome estrictamente en lo que se hizo en el pasado.', value: 60 }, { label: 'Calculo el ratio de costo/beneficio, mido los riesgos estadísticamente y asumo el control.', value: 100 } ] }
];

export default function Home() {
  const [appState, setAppState] = useState<AppState>("START");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<CareerRecommendation[]>([]);

  const handleStart = () => setAppState("TEST");

  const handleAnswer = async (value: number) => {
    const currentDim = DIMENSIONS[currentIndex].id;
    const newAnswers = { ...answers, [currentDim]: value };
    setAnswers(newAnswers);

    setTimeout(async () => {
      if (currentIndex < DIMENSIONS.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setAppState("CALCULATING");
        try {
          const res = await fetch("http://localhost:8000/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAnswers)
          });
          const data = await res.json();
          setResults(data.top_careers);
          setTimeout(() => setAppState("RESULTS"), 2000);
        } catch (err) {
          console.error(err);
          alert("Error de conexión con el servidor API Mahalanobis.");
          setAppState("START");
        }
      }
    }, 400);
  };

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-blue-950 to-slate-950 text-slate-200 selection:bg-blue-500/30">
      
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]"></div>
      </div>

      <main className="relative max-w-4xl mx-auto px-6 pt-20 pb-24 min-h-screen flex flex-col justify-center">
        
        {/* START STATE */}
        {appState === "START" && (
          <div className="animate-slide-up flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-blue-400 text-sm font-semibold mb-8">
              <Sparkles size={16} />
              <span>Algoritmo de Mahalanobis v2.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
              Descubre tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Camino</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-12">
              Evaluación psicométrica avanzada de 16 dimensiones basada en la currícula EBR y estándares O*NET para la Universidad Nacional del Altiplano.
            </p>
            
            <button 
              onClick={handleStart}
              className="group relative inline-flex items-center gap-3 bg-blue-600 text-white font-bold text-lg px-10 py-5 rounded-2xl hover:bg-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10">Iniciar Evaluación</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* TEST STATE */}
        {appState === "TEST" && (
          <div className="animate-fade-in w-full max-w-3xl mx-auto">
            <div className="mb-10 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-blue-400 font-bold tracking-wider text-sm uppercase">
                    Dimensión {currentIndex + 1} de {DIMENSIONS.length}
                  </span>
                  <h3 className="text-xl font-medium text-slate-300 mt-1">{DIMENSIONS[currentIndex].title}</h3>
                </div>
                <span className="text-slate-500 font-mono text-sm">{Math.round(((currentIndex) / DIMENSIONS.length) * 100)}%</span>
              </div>
              <div className="h-2 w-full glass-panel rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out relative"
                  style={{ width: `${((currentIndex + 1) / DIMENSIONS.length) * 100}%` }}
                >
                  <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-md"></div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-8 md:p-12 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-tight">
                {DIMENSIONS[currentIndex].question}
              </h2>
              
              <div className="flex flex-col gap-4">
                {DIMENSIONS[currentIndex].options.map((opt, index) => {
                  const currentDimId = DIMENSIONS[currentIndex].id;
                  const isSelected = answers[currentDimId] === opt.value;
                  
                  return (
                    <button 
                      key={index} 
                      onClick={() => handleAnswer(opt.value)}
                      className={`w-full text-left p-6 rounded-2xl text-lg transition-all duration-300 flex items-center justify-between group
                        ${isSelected 
                          ? 'bg-blue-600/20 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] text-white' 
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                        } border`}
                    >
                      <span className="pr-6">{opt.label}</span>
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-600 group-hover:bg-slate-700'}`}>
                        <Check size={18} className={isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {currentIndex > 0 && (
              <button 
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-2 px-4 rounded-xl hover:bg-white/5"
              >
                <ArrowLeft size={18} /> Pregunta anterior
              </button>
            )}
          </div>
        )}

        {/* CALCULATING STATE */}
        {appState === "CALCULATING" && (
          <div className="animate-fade-in flex flex-col items-center text-center justify-center min-h-[50vh]">
            <div className="relative mb-8">
              <BrainCircuit size={64} className="text-blue-500 animate-pulse" />
              <div className="absolute inset-0 text-blue-500 blur-xl animate-pulse">
                <BrainCircuit size={64} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Procesando Matriz Vectorial...</h2>
            <p className="text-xl text-slate-400 max-w-md">
              Calculando distancias de Mahalanobis en un espacio de 16 dimensiones contra 39 carreras profesionales.
            </p>
          </div>
        )}

        {/* RESULTS STATE */}
        {appState === "RESULTS" && (
          <div className="animate-slide-up w-full max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mb-6">
                <Activity size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tus Carreras Ideales</h1>
              <p className="text-xl text-slate-400">
                Basado en tu perfil cognitivo y habilidades transversales.
              </p>
            </div>

            <div className="glass-panel rounded-3xl p-6 md:p-8 mb-12">
              <div className="flex flex-col gap-4">
                {results.map((r, i) => (
                  <div key={i} className={`flex items-center justify-between p-6 rounded-2xl transition-colors border ${i === 0 ? 'bg-blue-600/20 border-blue-500/30 shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                    <div className="flex items-center gap-6">
                      <div className={`text-4xl font-black ${i === 0 ? 'text-blue-400' : 'text-slate-600'}`}>
                        {i + 1}
                      </div>
                      <div>
                        <h3 className={`text-xl md:text-2xl font-bold ${i === 0 ? 'text-white' : 'text-slate-200'}`}>
                          {r.career}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">Distancia Mahalanobis: {r.mahalanobis_dist.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className={`text-2xl md:text-3xl font-black ${i === 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400' : 'text-slate-300'}`}>
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
                  setCurrentIndex(0);
                  setAnswers({});
                }}
                className="px-8 py-3 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 hover:text-white transition-all"
              >
                Volver a evaluar
              </button>
            </div>
          </div>
        )}
        
      </main>
    </div>
  );
}
