"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

type AppState = "START" | "TEST" | "CALCULATING" | "RESULTS";

interface CareerRecommendation {
  career: string;
  match_percentage: number;
  mahalanobis_dist: number;
}

const DIMENSIONS = [
  { 
    id: 'math', 
    title: 'Matemática', 
    question: '¿Cómo te desempeñaste en matemáticas durante la secundaria?',
    options: [
      { label: "Me costaban bastante, mi promedio era bajo.", value: 20 },
      { label: "Me iba bien, las entendía sin mucho problema.", value: 60 },
      { label: "Era de mis mejores materias, incluso ayudaba a mis compañeros.", value: 100 }
    ]
  },
  { 
    id: 'science', 
    title: 'Ciencia', 
    question: 'Ves un documental sobre genética o astrofísica en la TV. ¿Cuál es tu reacción?',
    options: [
      { label: "Cambio de canal o me aburro rápidamente.", value: 20 },
      { label: "Lo veo un rato si no hay nada mejor, es interesante.", value: 50 },
      { label: "Me quedo viéndolo fascinado y luego busco más info en internet.", value: 100 }
    ]
  },
  { 
    id: 'literature', 
    title: 'Letras', 
    question: 'El profesor manda a leer un libro de 300 páginas para un ensayo. ¿Qué haces?',
    options: [
      { label: "Busco un resumen en internet para salir del paso.", value: 20 },
      { label: "Lo leo completo porque debo hacerlo, pero me cuesta.", value: 60 },
      { label: "Me emociona, disfruto la lectura y escribir mi análisis.", value: 100 }
    ]
  },
  { 
    id: 'r_realistic', 
    title: 'Realista', 
    question: 'Se descompone un aparato en tu casa (ej. la licuadora o un mando).',
    options: [
      { label: "Espero a que alguien más lo arregle o sugiero comprar uno nuevo.", value: 20 },
      { label: "Veo si es algo muy obvio (un cable suelto), si no, lo dejo.", value: 50 },
      { label: "Busco un destornillador, lo abro e intento repararlo yo mismo.", value: 100 }
    ]
  },
  { 
    id: 'i_investigative', 
    title: 'Investigador', 
    question: 'Alguien te cuenta un rumor impactante o una teoría de conspiración.',
    options: [
      { label: "Me asombro y lo comparto inmediatamente con mis amigos.", value: 20 },
      { label: "Me parece curioso, pero no le doy mucha importancia.", value: 50 },
      { label: "Dudo de inmediato y verifico las fuentes en internet antes de creerlo.", value: 100 }
    ]
  },
  { 
    id: 'a_artistic', 
    title: 'Artístico', 
    question: 'Tienes tiempo libre un domingo por la tarde. ¿Qué prefieres hacer?',
    options: [
      { label: "Ver series, jugar videojuegos o dormir.", value: 20 },
      { label: "Escuchar música mientras ordeno mi cuarto.", value: 50 },
      { label: "Dibujar, tocar un instrumento, escribir, diseñar o crear algo.", value: 100 }
    ]
  },
  { 
    id: 's_social', 
    title: 'Social', 
    question: 'Un compañero nuevo llega a tu clase y no conoce a nadie.',
    options: [
      { label: "No le presto mucha atención, ya hará amigos con el tiempo.", value: 20 },
      { label: "Lo saludo amablemente si me toca sentarme cerca de él.", value: 60 },
      { label: "Me acerco proactivamente, me presento y lo integro a mi grupo.", value: 100 }
    ]
  },
  { 
    id: 'e_enterprising', 
    title: 'Emprendedor', 
    question: 'El colegio organiza una feria y cada salón debe vender algo.',
    options: [
      { label: "Ayudo en lo mínimo indispensable para que no me regañen.", value: 20 },
      { label: "Me ofrezco para atender el puesto un rato si me lo piden.", value: 60 },
      { label: "Tomo el liderazgo, decido qué vender y organizo el presupuesto para ganar más.", value: 100 }
    ]
  },
  { 
    id: 'c_conventional', 
    title: 'Convencional', 
    question: 'Tienes que guardar todos tus apuntes y archivos del año en tu PC.',
    options: [
      { label: "Lo guardo todo en el escritorio o en 'Descargas' hecho un caos.", value: 20 },
      { label: "Hago un par de carpetas generales (ej. Letras y Ciencias).", value: 50 },
      { label: "Creo una estructura perfecta por mes, curso y con nombres claros.", value: 100 }
    ]
  },
  { 
    id: 'strong_leadership', 
    title: 'Liderazgo', 
    question: 'Estás en un trabajo grupal y nadie sabe cómo empezar. ¿Qué sueles hacer?',
    options: [
      { label: "Espero en silencio a que alguien más tome la iniciativa.", value: 20 },
      { label: "Doy alguna sugerencia pero dejo que otro tome la decisión final.", value: 50 },
      { label: "Tomo la palabra, divido las tareas y organizo los tiempos de entrega.", value: 100 }
    ]
  },
  { 
    id: 'strong_practical', 
    title: 'Práctico', 
    question: 'Tienes que aprender a usar un nuevo software o herramienta complicada.',
    options: [
      { label: "Leo todo el manual o veo un tutorial completo antes de tocar nada.", value: 20 },
      { label: "Veo un resumen rápido y luego intento usarlo.", value: 50 },
      { label: "Empiezo a hacer clic; aprendo equivocándome en la práctica.", value: 100 }
    ]
  },
  { 
    id: 'strong_tech', 
    title: 'Tecnología', 
    question: 'Escuchas que salió una nueva Inteligencia Artificial muy novedosa.',
    options: [
      { label: "No me importa mucho mientras mi celular siga funcionando.", value: 20 },
      { label: "Me parece interesante pero solo leo el titular de la noticia.", value: 50 },
      { label: "Investigo a fondo cómo funciona e intento probarla yo mismo.", value: 100 }
    ]
  }
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
          setTimeout(() => setAppState("RESULTS"), 1500);
        } catch (err) {
          console.error(err);
          alert("Error de conexión con el servidor.");
          setAppState("START");
        }
      }
    }, 400);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 w-full font-sans text-gray-900 bg-gray-50 min-h-screen">
      {/* START STATE */}
      {appState === "START" && (
        <div className="flex flex-col min-h-[80vh] justify-center animate-fade-in py-12">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">Evaluación de Carrera UNAP</h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
              Descubre qué carreras de la Universidad Nacional del Altiplano se alinean con tus verdaderos intereses y comportamiento, basado en modelos psicométricos avanzados.
            </p>
            <button 
              className="bg-blue-600 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 hover:bg-blue-700 hover:shadow-md mx-auto flex items-center justify-center gap-2 w-full sm:w-auto"
              onClick={handleStart}
            >
              Comenzar Evaluación <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* TEST STATE */}
      {appState === "TEST" && (
        <div className="flex flex-col min-h-[80vh] justify-center animate-fade-in py-12">
          
          <div className="mb-8">
            <span className="text-sm text-gray-500 font-bold tracking-wider mb-3 block uppercase">
              Pregunta {currentIndex + 1} de {DIMENSIONS.length}
            </span>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${((currentIndex + 1) / DIMENSIONS.length) * 100}%` }} 
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-10 leading-snug text-center">
              {DIMENSIONS[currentIndex].question}
            </h2>
            
            <div className="flex flex-col gap-4">
              {DIMENSIONS[currentIndex].options.map((opt, index) => {
                const currentDimId = DIMENSIONS[currentIndex].id;
                const isSelected = answers[currentDimId] === opt.value;
                
                return (
                  <button 
                    key={index} 
                    className={`w-full text-left bg-white border p-5 rounded-xl text-lg transition-all duration-200 flex items-center justify-between group
                      ${isSelected 
                        ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 text-blue-900' 
                        : 'border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    onClick={() => handleAnswer(opt.value)}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={24} className="text-blue-600 shrink-0 ml-4" />}
                  </button>
                );
              })}
            </div>

            {currentIndex > 0 && (
              <button 
                className="mt-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer"
                onClick={() => setCurrentIndex(currentIndex - 1)}
              >
                <ArrowLeft size={16} /> Volver
              </button>
            )}
          </div>
        </div>
      )}

      {/* CALCULATING STATE */}
      {appState === "CALCULATING" && (
        <div className="flex flex-col min-h-[80vh] justify-center items-center animate-fade-in text-center py-12">
          <div className="border-4 border-gray-100 border-t-blue-600 rounded-full w-12 h-12 animate-spin-slow mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Analizando tu perfil...</h2>
          <p className="text-lg text-gray-500">Calculando compatibilidad con 38 programas académicos.</p>
        </div>
      )}

      {/* RESULTS STATE */}
      {appState === "RESULTS" && (
        <div className="py-16 animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tus Mejores Opciones</h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Basado en tus respuestas, tu perfil se alinea fuertemente con los siguientes programas académicos de la UNAP.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm mb-10">
            <div className="flex flex-col gap-4">
              {results.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-5 border border-gray-100 bg-gray-50/50 rounded-xl hover:border-gray-200 transition-colors">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Opción {i + 1}</span>
                    <h3 className="text-xl font-semibold text-gray-900">{r.career}</h3>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {r.match_percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button 
              className="text-gray-500 hover:text-gray-900 font-medium transition-colors bg-transparent border-none cursor-pointer underline underline-offset-4"
              onClick={() => {
                setAppState("START");
                setCurrentIndex(0);
                setAnswers({});
              }}
            >
              Reiniciar evaluación
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
