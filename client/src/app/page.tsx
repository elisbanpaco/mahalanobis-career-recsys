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

    // Pequeño delay para mostrar la selección limpia antes de avanzar
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
    <main className="container">
      {/* START STATE */}
      {appState === "START" && (
        <div className="center-stage">
          <div className="card" style={{ textAlign: 'center' }}>
            <h1 className="question-text" style={{ fontSize: '2rem' }}>Evaluación de Carrera UNAP</h1>
            <p className="subtitle">
              Descubre qué carreras de la Universidad Nacional del Altiplano se alinean con tus verdaderos intereses y comportamiento, basado en modelos psicométricos avanzados.
            </p>
            <button className="btn-primary" onClick={handleStart} style={{ maxWidth: '300px', margin: '0 auto' }}>
              Comenzar Evaluación <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* TEST STATE */}
      {appState === "TEST" && (
        <div className="center-stage">
          <div className="progress-container">
            <span className="progress-text">Pregunta {currentIndex + 1} de {DIMENSIONS.length}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentIndex + 1) / DIMENSIONS.length) * 100}%` }} 
              />
            </div>
          </div>

          <div className="card">
            <h2 className="question-text">{DIMENSIONS[currentIndex].question}</h2>
            
            <div className="options-container">
              {DIMENSIONS[currentIndex].options.map((opt, index) => {
                const currentDimId = DIMENSIONS[currentIndex].id;
                const isSelected = answers[currentDimId] === opt.value;
                
                return (
                  <button 
                    key={index} 
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleAnswer(opt.value)}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={20} color="var(--primary)" />}
                  </button>
                );
              })}
            </div>

            {currentIndex > 0 && (
              <button 
                className="btn-secondary"
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
        <div className="center-stage" style={{ textAlign: 'center' }}>
          <div className="spinner"></div>
          <h2 className="question-text">Analizando tu perfil...</h2>
          <p className="subtitle">Calculando compatibilidad con 38 programas académicos.</p>
        </div>
      )}

      {/* RESULTS STATE */}
      {appState === "RESULTS" && (
        <div style={{ paddingTop: '2rem' }} className="center-stage">
          <div className="results-header">
            <h1>Tus Mejores Opciones</h1>
            <p className="subtitle">
              Basado en tus respuestas, tu perfil se alinea fuertemente con los siguientes programas académicos.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            {results.map((r, i) => (
              <div key={i} className="career-card">
                <div className="career-info">
                  <span className="rank-badge">Opción {i + 1}</span>
                  <h3>{r.career}</h3>
                </div>
                <div className="career-score">
                  {r.match_percentage}%
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              className="btn-secondary" 
              onClick={() => {
                setAppState("START");
                setCurrentIndex(0);
                setAnswers({});
              }}
              style={{ margin: '0 auto' }}
            >
              Reiniciar evaluación
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
