"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Compass, Stars, Navigation } from "lucide-react";

type AppState = "START" | "TEST" | "CALCULATING" | "RESULTS";

interface CareerRecommendation {
  career: string;
  match_percentage: number;
  mahalanobis_dist: number;
}

// METODO DE JUICIO SITUACIONAL
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

    if (currentIndex < DIMENSIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Finished
      setAppState("CALCULATING");
      try {
        const res = await fetch("http://localhost:8000/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAnswers)
        });
        const data = await res.json();
        setResults(data.top_careers);
        // Pequeño delay para que la animación se disfrute
        setTimeout(() => setAppState("RESULTS"), 2500);
      } catch (err) {
        console.error(err);
        alert("Error de conexión con el núcleo Mahalanobis.");
        setAppState("START");
      }
    }
  };

  return (
    <main className="container">
      {/* Progress Bar during test */}
      {appState === "TEST" && (
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentIndex / DIMENSIONS.length) * 100}%` }} 
          />
        </div>
      )}

      {/* START STATE */}
      {appState === "START" && (
        <div className="center-stage">
          <Compass size={64} color="var(--accent-primary)" style={{ marginBottom: '2rem' }} />
          <h1>Encuentra tu verdadera órbita.</h1>
          <p className="subtitle">
            Un test vocacional distinto, potenciado por Inteligencia Artificial y el modelo matemático de Mahalanobis para recomendarte la carrera ideal en la UNAP. No evaluamos solo lo que sabes, evaluamos cómo piensas y actúas.
          </p>
          <button className="btn-primary" onClick={handleStart}>
            Iniciar Calibración <ArrowRight size={20} style={{ display: 'inline', marginLeft: '8px', verticalAlign: 'middle' }} />
          </button>
        </div>
      )}

      {/* TEST STATE */}
      {appState === "TEST" && (
        <div className="center-stage">
          <div className="glass-panel">
            <span className="mono-label">Situación {currentIndex + 1} / {DIMENSIONS.length}</span>
            <div className="question-header">
              <h2 className="question-text">&quot;{DIMENSIONS[currentIndex].question}&quot;</h2>
            </div>
            
            {/* Opciones adaptadas a Juicio Situacional */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
              {DIMENSIONS[currentIndex].options.map((opt, index) => {
                const currentDimId = DIMENSIONS[currentIndex].id;
                const isSelected = answers[currentDimId] === opt.value;
                
                return (
                  <button 
                    key={index} 
                    className="option-btn"
                    onClick={() => handleAnswer(opt.value)}
                    style={{ 
                      textAlign: 'left', 
                      alignItems: 'flex-start',
                      borderColor: isSelected ? 'var(--accent-secondary)' : 'var(--border-subtle)',
                      background: isSelected ? 'var(--bg-panel-hover)' : 'var(--bg-panel)'
                    }}
                  >
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Botón para regresar a la pregunta anterior */}
            {currentIndex > 0 && (
              <div style={{ marginTop: '2rem', textAlign: 'left' }}>
                <button 
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    color: 'var(--text-secondary)', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--step--1)',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <ArrowLeft size={16} /> Pregunta anterior
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CALCULATING STATE */}
      {appState === "CALCULATING" && (
        <div className="center-stage">
          <div className="orbit-container">
            <div className="orbit-ring"></div>
            <div className="orbit-ring"></div>
            <div className="orbit-ring"></div>
            <div className="core"></div>
          </div>
          <h2>Calculando Covarianza</h2>
          <p className="subtitle">Mapeando tu comportamiento contra las 38 órbitas de la UNAP...</p>
        </div>
      )}

      {/* RESULTS STATE */}
      {appState === "RESULTS" && (
        <div style={{ paddingTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Stars size={48} color="var(--accent-secondary)" style={{ marginBottom: '1rem' }} />
            <h1>Tu Destino Académico</h1>
            <p className="subtitle" style={{ margin: '1rem auto 0 auto' }}>
              Estas son las carreras donde tu perfil encaja naturalmente, considerando tus comportamientos reales frente a las tendencias de la UNAP.
            </p>
          </div>

          <div className="results-grid">
            <div className="glass-panel" style={{ height: 'fit-content' }}>
              <h3 style={{ marginBottom: '1rem' }}><Navigation size={24} style={{ display:'inline', marginRight:'8px' }}/>El Espejismo Evitado</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Si hubiéramos usado un test tradicional, probablemente habrías obtenido resultados sesgados por tu autopercepción. 
                El algoritmo de <strong>Mahalanobis</strong> ha leído entre líneas, notando cómo tus decisiones prácticas compensan ciertas áreas para recomendarte ecosistemas donde brillarás.
              </p>
              <button className="btn-primary" onClick={() => {
                setAppState("START");
                setCurrentIndex(0);
                setAnswers({});
              }} style={{ marginTop: '2rem', width: '100%' }}>
                Recalibrar Perfil
              </button>
            </div>

            <div>
              <span className="mono-label" style={{ display: 'block', marginBottom: '1rem' }}>TOP 5 ÓRBITAS COMPATIBLES</span>
              {results.map((r, i) => (
                <div key={i} className="career-card" style={{ animationDelay: `${i * 0.1}s`, animation: 'fadeUp 0.5s forwards', opacity: 0 }}>
                  <div className="career-info">
                    <span className="mono-label">#{i + 1}</span>
                    <h3>{r.career}</h3>
                  </div>
                  <div className="career-score">
                    {r.match_percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
