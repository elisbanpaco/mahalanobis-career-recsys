"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, BrainCircuit, Activity, Sparkles } from "lucide-react";

type AppState = "START" | "TEST" | "CALCULATING" | "RESULTS";

interface CareerRecommendation {
  career: string;
  match_percentage: number;
  mahalanobis_dist: number;
}

interface Question {
  q: string;
  level: 1 | 2 | 3;
  options: { label: string; value: number }[];
}

interface Dimension {
  id: string;
  title: string;
  questions: Question[];
}

const DIMENSIONS: Dimension[] = [
  {
    id: 'ebr_matematica',
    title: 'Matemática',
    questions: [
      { level: 1, q: 'Vas al supermercado y notas descuentos complejos en tus productos favoritos.', options: [
        { value: 20, label: 'Pago lo que diga la caja, ni siquiera miro el ticket o el precio final.' },
        { value: 40, label: 'Si veo un descuento lo aprovecho, pero evito hacer cálculos matemáticos.' },
        { value: 60, label: 'Calculo mentalmente muy por encima para saber si me conviene llevarlo.' },
        { value: 80, label: 'Saco mi celular para sumar rápido, comparar y asegurar el ahorro exacto.' },
        { value: 100, label: 'Disfruto calculando mentalmente el porcentaje exacto y el margen de ahorro.' }
      ]},
      { level: 2, q: 'En un proyecto grupal te piden llevar el control de todos los gastos y el presupuesto.', options: [
        { value: 20, label: 'Me niego rotundamente y pido cambiar a un rol donde no toque números.' },
        { value: 40, label: 'Acepto con mala cara y le pido a alguien que revise mis sumas luego.' },
        { value: 60, label: 'Anoto los gastos en un papel sumando lo básico para cumplir la tarea.' },
        { value: 80, label: 'Uso una hoja de cálculo simple con fórmulas básicas para ordenar todo.' },
        { value: 100, label: 'Armo una matriz estructurada con proyecciones y análisis al centavo.' }
      ]},
      { level: 2, q: 'En las noticias muestran un gráfico estadístico complejo sobre la economía.', options: [
        { value: 20, label: 'Cambio de canal o me salto la noticia, me aburren profundamente los gráficos.' },
        { value: 40, label: 'Miro el gráfico un segundo pero solo leo el texto que lo acompaña.' },
        { value: 60, label: 'Entiendo la tendencia general (si la línea sube o baja) y con eso me basta.' },
        { value: 80, label: 'Me detengo a mirar los porcentajes y entiendo exactamente qué significa.' },
        { value: 100, label: 'Analizo las variables, los ejes y saco conclusiones numéricas avanzadas.' }
      ]},
      { level: 3, q: 'Tienes frente a ti un problema de álgebra o geometría abstracta sin resolver.', options: [
        { value: 20, label: 'Lo evito por completo, me frustran inmensamente los problemas abstractos.' },
        { value: 40, label: 'Copio la respuesta de otro o busco el resultado directo en internet.' },
        { value: 60, label: 'Aplico la fórmula de memoria mecánicamente solo para aprobar el curso.' },
        { value: 80, label: 'Intento resolverlo por mi cuenta porque no me gusta dejar tareas a medias.' },
        { value: 100, label: 'Me entusiasma genuinamente el desafío intelectual de buscar la solución.' }
      ]},
      { level: 3, q: 'Te invitan a un taller gratuito de programación basada en lógica matemática.', options: [
        { value: 20, label: 'Lo rechazo de inmediato, los algoritmos y la lógica no son para mí.' },
        { value: 40, label: 'Voy obligado o solo por curiosidad, pero sé que me costará mucho.' },
        { value: 60, label: 'Asisto y trato de aprender lo básico para tener una habilidad extra.' },
        { value: 80, label: 'Participo activamente y me esfuerzo por entender las secuencias lógicas.' },
        { value: 100, label: 'Acepto emocionado, mi cerebro está hecho para la estructura y los algoritmos.' }
      ]},
      { level: 3, q: 'Después de mucho esfuerzo, logras cuadrar una ecuación larga que no salía.', options: [
        { value: 20, label: 'Solo siento un enorme alivio de que por fin terminó ese castigo.' },
        { value: 40, label: 'Me quejo del tiempo perdido pero entrego la hoja.' },
        { value: 60, label: 'Me alegra haber cumplido con la tarea y cierro el libro.' },
        { value: 80, label: 'Siento orgullo personal por no haberme rendido ante la dificultad.' },
        { value: 100, label: 'Siento una profunda y genuina satisfacción intelectual por la precisión lograda.' }
      ]}
    ]
  },
  {
    id: 'ebr_comunicacion',
    title: 'Comunicación',
    questions: [
      { level: 1, q: 'Debes enviar un mensaje importante y largo para coordinar a un equipo.', options: [
        { value: 20, label: 'Mando un audio rápido y enredado para no tener que tipear nada.' },
        { value: 40, label: 'Escribo todo junto sin comas ni puntos, esperando que me entiendan.' },
        { value: 60, label: 'Escribo lo básico para que se entienda la idea principal y lo envío.' },
        { value: 80, label: 'Reviso un par de veces la ortografía para que no se vea informal.' },
        { value: 100, label: 'Cuido minuciosamente las palabras, la puntuación y el tono persuasivo.' }
      ]},
      { level: 2, q: 'Tienes que exponer un tema importante frente a toda tu clase u oficina.', options: [
        { value: 20, label: 'Me aterra, busco cualquier excusa médica o me escondo para no hacerlo.' },
        { value: 40, label: 'Hablo rápido, mirando al suelo y rogando que acabe el tormento pronto.' },
        { value: 60, label: 'Leo casi todas las diapositivas para cumplir con mi parte sin arriesgarme.' },
        { value: 80, label: 'Trato de explicar con mis propias palabras mirando al público.' },
        { value: 100, label: 'Me preparo a fondo, modulo mi voz, uso lenguaje corporal y busco persuadir.' }
      ]},
      { level: 2, q: 'Te piden escribir un ensayo crítico sobre tu libro o película favorita.', options: [
        { value: 20, label: 'Me da demasiada pereza escribir, evito la tarea a toda costa.' },
        { value: 40, label: 'Escribo un par de párrafos obvios copiando reseñas de internet.' },
        { value: 60, label: 'Hago un resumen básico de la trama cumpliendo la longitud pedida.' },
        { value: 80, label: 'Escribo mi opinión sincera y trato de estructurarla con algo de orden.' },
        { value: 100, label: 'Escribo un análisis profundo, impecablemente argumentado y redactado.' }
      ]},
      { level: 3, q: 'Entras a un debate sobre un tema ideológico o controversial.', options: [
        { value: 20, label: 'Me quedo completamente callado y me alejo, detesto las confrontaciones.' },
        { value: 40, label: 'Asiento con la cabeza pero no me atrevo a decir nada en voz alta.' },
        { value: 60, label: 'Doy mi opinión brevemente solo si alguien me pregunta directamente.' },
        { value: 80, label: 'Expongo mis ideas e intento defenderme si me contradicen.' },
        { value: 100, label: 'Uso argumentos estructurados, refuto ideas y convenzo usando oratoria.' }
      ]},
      { level: 3, q: 'Encuentras un libro clásico de la literatura universal de 500 páginas.', options: [
        { value: 20, label: 'Jamás lo tocaría, la lectura densa me da sueño al instante.' },
        { value: 40, label: 'Leerías un resumen en YouTube para saber de qué trata y aparentar.' },
        { value: 60, label: 'Lo leo lentamente a lo largo de los meses si es una tarea obligatoria.' },
        { value: 80, label: 'Lo leo por iniciativa propia porque aprecio las buenas historias.' },
        { value: 100, label: 'Me apasiona devorarlo y analizar a fondo su estructura narrativa y retórica.' }
      ]},
      { level: 3, q: 'Te ofrecen dirigir el periódico institucional o el club de oratoria de tu zona.', options: [
        { value: 20, label: 'Me niego rotundamente y salgo huyendo de la propuesta.' },
        { value: 40, label: 'Acepto solo si me prometen hacer el trabajo pesado por mí.' },
        { value: 60, label: 'Acepto si no hay nadie más para hacerlo, asumiendo lo básico.' },
        { value: 80, label: 'Lo tomo como una buena oportunidad para mejorar mis habilidades.' },
        { value: 100, label: 'Acepto emocionado por el inmenso reto comunicativo y editorial.' }
      ]}
    ]
  },
  {
    id: 'ebr_ciencia_tecnologia',
    title: 'Ciencia y Tecnología',
    questions: [
      { level: 1, q: 'Un documental explica la física de los agujeros negros o el código genético humano.', options: [
        { value: 20, label: 'Cambio de canal inmediatamente a algo de entretenimiento ligero.' },
        { value: 40, label: 'Lo dejo de fondo mientras hago otra cosa, sin prestarle atención.' },
        { value: 60, label: 'Lo veo un rato si no hay nada mejor, me parece curioso.' },
        { value: 80, label: 'Me detengo a mirarlo y trato de entender los conceptos que explican.' },
        { value: 100, label: 'Me quedo viéndolo absolutamente fascinado por los misterios del universo.' }
      ]},
      { level: 2, q: 'Toca hacer un experimento de reacciones químicas o circuitos en el laboratorio.', options: [
        { value: 20, label: 'Me siento atrás, dejo que mis compañeros lo hagan y yo me distraigo.' },
        { value: 40, label: 'Hago de asistente pasándose tubos o cables sin entender qué pasa.' },
        { value: 60, label: 'Sigo las instrucciones del manual paso a paso, mecánicamente.' },
        { value: 80, label: 'Participo activamente y me preocupo de que el resultado salga bien.' },
        { value: 100, label: 'Observo cada reacción emocionado, buscando entender el proceso científico profundo.' }
      ]},
      { level: 2, q: 'Lees una noticia sobre un nuevo avance médico, biológico o aeroespacial.', options: [
        { value: 20, label: 'No me interesan esas noticias, me salto directo a los deportes o memes.' },
        { value: 40, label: 'Solo leo el titular grande y deslizo hacia abajo.' },
        { value: 60, label: 'Leo el primer párrafo para estar medianamente informado y converso de ello.' },
        { value: 80, label: 'Leo el artículo completo para entender los beneficios de ese avance.' },
        { value: 100, label: 'Busco otras fuentes para entender a detalle el principio físico o biológico.' }
      ]},
      { level: 3, q: 'Tienes la opción de participar en una feria de ciencias regional muy rigurosa.', options: [
        { value: 20, label: 'Falto a clases ese día para asegurarme de que no me obliguen a ir.' },
        { value: 40, label: 'Hago un volcán de bicarbonato o algo copiado de internet de última hora.' },
        { value: 60, label: 'Armo un proyecto sencillo y presentable para cumplir con la nota.' },
        { value: 80, label: 'Investigo un buen tema y me preparo para explicarlo con claridad.' },
        { value: 100, label: 'Diseño un experimento original, documentado bajo el rigor del método científico.' }
      ]},
      { level: 3, q: 'Se te descompone un aparato electrónico o mecanismo complejo en casa.', options: [
        { value: 20, label: 'Lo boto a la basura y le pido a alguien que compre uno nuevo.' },
        { value: 40, label: 'Lo golpeo un par de veces esperando que vuelva a encender.' },
        { value: 60, label: 'Reviso si hay un cable suelto o algo obvio antes de llamar al técnico.' },
        { value: 80, label: 'Busco un tutorial en internet para ver si puedo arreglarlo yo mismo.' },
        { value: 100, label: 'Lo desarmo pacientemente intentando descifrar su lógica y mecanismo interno.' }
      ]},
      { level: 3, q: 'Te imaginas tu futuro profesional vistiendo una bata investigando en un laboratorio.', options: [
        { value: 20, label: 'Es mi peor pesadilla, me deprimiría estar encerrado entre microscopios.' },
        { value: 40, label: 'Lo odiaría, preferiría algo con más contacto humano y movimiento.' },
        { value: 60, label: 'Lo toleraría como un trabajo normal si el sueldo fuera muy bueno.' },
        { value: 80, label: 'Me gustaría, me parece un entorno ordenado, limpio e interesante.' },
        { value: 100, label: 'Sería un sueño absoluto dedicarme a expandir la frontera de la ciencia pura.' }
      ]}
    ]
  },
  {
    id: 'ebr_ciencias_sociales',
    title: 'Ciencias Sociales',
    questions: [
      { level: 1, q: 'Alguien empieza a hablar sobre la historia antigua o mundial en una reunión.', options: [
        { value: 20, label: 'Me desconecto totalmente, el pasado no me importa en lo absoluto.' },
        { value: 40, label: 'Pienso en otra cosa mientras asiento con la cabeza fingiendo interés.' },
        { value: 60, label: 'Escucho por respeto pero no me involucro ni aporto nada.' },
        { value: 80, label: 'Hago un par de preguntas porque me gusta aprender cosas nuevas.' },
        { value: 100, label: 'Participo activamente aportando datos, nombres y contextos históricos.' }
      ]},
      { level: 2, q: 'Hay elecciones presidenciales y se debaten diferentes modelos socioeconómicos.', options: [
        { value: 20, label: 'Ignoro todo, la política y la economía son una pérdida de tiempo.' },
        { value: 40, label: 'Me guío solo por los memes políticos o lo que dice mi familia.' },
        { value: 60, label: 'Escucho los debates por encima para decidir un voto básico.' },
        { value: 80, label: 'Investigo las propuestas para entender qué harán con el país.' },
        { value: 100, label: 'Analizo críticamente el impacto macroeconómico y social de cada candidato.' }
      ]},
      { level: 2, q: 'Viajas de turismo a una ciudad con ruinas arqueológicas milenarias.', options: [
        { value: 20, label: 'Me quejo de caminar tanto, me tomo una selfie rápida y busco un mall.' },
        { value: 40, label: 'Camino por ahí sin prestar atención a los monumentos.' },
        { value: 60, label: 'Sigo al guía turístico un rato para saber qué es cada cosa de forma general.' },
        { value: 80, label: 'Leo los carteles y hago preguntas sobre cómo fue construida la ciudad.' },
        { value: 100, label: 'Me sumerjo en la historia profunda, economía y cosmología de sus habitantes.' }
      ]},
      { level: 3, q: 'Te regalan un libro profundo sobre sociología, antropología o geopolítica.', options: [
        { value: 20, label: 'Lo uso para nivelar una mesa, jamás abriría algo tan aburrido.' },
        { value: 40, label: 'Lo guardo en el librero para aparentar inteligencia, pero no lo toco.' },
        { value: 60, label: 'Leerías solo un capítulo si alguien me obliga o por curiosidad extrema.' },
        { value: 80, label: 'Lo leo poco a poco subrayando las ideas que me parecen importantes.' },
        { value: 100, label: 'Lo devoraría por completo con un interés académico y analítico total.' }
      ]},
      { level: 3, q: 'En una clase universitaria se debate sobre las causas de la pobreza y la desigualdad.', options: [
        { value: 20, label: 'Me pongo los audífonos, no soporto esos discursos sociales.' },
        { value: 40, label: 'Digo "es culpa de los políticos" sin dar ningún otro argumento.' },
        { value: 60, label: 'Doy una opinión superficial basada en lo que escucho en las noticias.' },
        { value: 80, label: 'Trato de analizar la situación económica actual para dar mi punto de vista.' },
        { value: 100, label: 'Argumento de forma impecable usando causas demográficas, históricas y sociopolíticas.' }
      ]},
      { level: 3, q: 'Te proponen dedicar tu vida a investigar rigurosamente el comportamiento de las sociedades.', options: [
        { value: 20, label: 'Me volvería loco de aburrimiento y frustración, rechazo la oferta.' },
        { value: 40, label: 'No lo elegiría, preferiría crear cosas palpables o hacer negocios.' },
        { value: 60, label: 'Podría hacerlo si el ambiente laboral es relajado, pero no me apasiona.' },
        { value: 80, label: 'Lo vería como una carrera interesante y digna para ayudar al mundo.' },
        { value: 100, label: 'Sería mi vocación ideal: documentar, analizar y comprender la evolución humana.' }
      ]}
    ]
  },
  {
    id: 'ebr_dpcc',
    title: 'Desarrollo Personal y Cívica',
    questions: [
      { level: 1, q: 'Eres testigo de cómo una persona abusa verbalmente de alguien muy vulnerable.', options: [
        { value: 20, label: 'Saco mi celular para grabar o me alejo rápido, no es mi problema.' },
        { value: 40, label: 'Siento mucha lástima pero miro a otro lado por temor a meterme.' },
        { value: 60, label: 'Espero que alguien más intervenga o aviso a una autoridad discretamente.' },
        { value: 80, label: 'Le digo al agresor desde lejos que se detenga y pido ayuda.' },
        { value: 100, label: 'Intervengo de frente y con firmeza absoluta para frenar la injusticia.' }
      ]},
      { level: 2, q: 'En tu entorno hay un conflicto tenso y prolongado entre dos grupos de personas.', options: [
        { value: 20, label: 'Los ignoro completamente o me burlo de sus peleas desde lejos.' },
        { value: 40, label: 'Evito acercarme a ambos grupos para que no me arrastren al problema.' },
        { value: 60, label: 'Trato de llevarme bien con ambos bandos sin opinar ni meterme.' },
        { value: 80, label: 'Hablo con los líderes por separado para sugerirles que paren.' },
        { value: 100, label: 'Actúo de mediador activo buscando conciliación, empatía y resolución estructural.' }
      ]},
      { level: 2, q: 'Te invitan a ser parte de un comité para defender y organizar los derechos de tu grupo.', options: [
        { value: 20, label: 'Me niego tajantemente, detesto asumir responsabilidades ajenas.' },
        { value: 40, label: 'Me escondo en el fondo para que voten por otro.' },
        { value: 60, label: 'Acepto un cargo menor solo si mis amigos también se meten.' },
        { value: 80, label: 'Acepto y asisto a las reuniones para dar ideas útiles.' },
        { value: 100, label: 'Acepto con inmensa pasión impulsado por una profunda vocación cívica.' }
      ]},
      { level: 3, q: 'Hay un debate sumamente técnico sobre derechos humanos y el código penal.', options: [
        { value: 20, label: 'Me da mucho sueño y estrés escuchar hablar de leyes y normas.' },
        { value: 40, label: 'Digo que "las leyes no sirven" y me salgo de la conversación.' },
        { value: 60, label: 'Participo brevemente diciendo lo que me parece "justo" desde el sentido común.' },
        { value: 80, label: 'Presto atención y trato de usar lógica para debatir los vacíos legales.' },
        { value: 100, label: 'Debato implacablemente usando filosofía del derecho y principios constitucionales.' }
      ]},
      { level: 3, q: 'Alguien te confía que está pasando por una crisis emocional destructiva y compleja.', options: [
        { value: 20, label: 'Me pongo sumamente incómodo, me bloqueo y me voy rápido.' },
        { value: 40, label: 'Le digo que "eche ganas" e intento cambiar de tema inmediatamente.' },
        { value: 60, label: 'Lo escucho en silencio un rato y le aconsejo que busque a un profesional.' },
        { value: 80, label: 'Lo acompaño, le doy consejos e intento subirle el ánimo pacientemente.' },
        { value: 100, label: 'Lo contengo empáticamente aplicando principios sólidos de validación psicológica.' }
      ]},
      { level: 3, q: 'Te ves en el futuro trabajando como juez, abogado de DDHH o psicólogo social.', options: [
        { value: 20, label: 'De ninguna manera, absorber los problemas de otros me destruiría.' },
        { value: 40, label: 'No me agrada, preferiría trabajar con máquinas, plantas o números.' },
        { value: 60, label: 'Tal vez, pero me costaría mucho desconectar del trabajo al llegar a casa.' },
        { value: 80, label: 'Me parece una carrera muy noble y estaría dispuesto a afrontar el estrés.' },
        { value: 100, label: 'Absolutamente sí, nací con la vocación de ayudar, mediar y administrar justicia.' }
      ]}
    ]
  },
  {
    id: 'ebr_ingles',
    title: 'Inglés como Lengua Extranjera',
    questions: [
      { level: 1, q: 'Lanzan un video espectacular de tu interés, pero el audio está totalmente en inglés.', options: [
        { value: 20, label: 'Me molesto, lo cierro de inmediato y busco otra cosa en español.' },
        { value: 40, label: 'Lo veo sin entender el audio, solo mirando las imágenes.' },
        { value: 60, label: 'Activo los subtítulos en español y me olvido por completo del audio.' },
        { value: 80, label: 'Pongo subtítulos en inglés para intentar relacionar lo que dicen con el texto.' },
        { value: 100, label: 'Lo escucho atentamente afinando mi oído para entender las frases originales.' }
      ]},
      { level: 2, q: 'Un software o juego que necesitas usar obligatoriamente no tiene versión en español.', options: [
        { value: 20, label: 'Lo desinstalo de inmediato y busco un programa pirata en español.' },
        { value: 40, label: 'Le doy clic a todo al azar hasta que funcione de casualidad.' },
        { value: 60, label: 'Me aprendo de memoria la ubicación de los botones sin leer las palabras.' },
        { value: 80, label: 'Uso un traductor en mi celular para entender los menús que no conozco.' },
        { value: 100, label: 'Lo configuro en inglés y aprovecho la situación para forzarme a aprender vocabulario.' }
      ]},
      { level: 2, q: 'Un turista extranjero se acerca repentinamente y te pide direcciones en inglés.', options: [
        { value: 20, label: 'Entro en pánico, niego con la cabeza y me voy corriendo.' },
        { value: 40, label: 'Le hablo en español más lento esperando que por arte de magia me entienda.' },
        { value: 60, label: 'Le indico la ruta usando muchas señas y palabras sueltas como "go" y "right".' },
        { value: 80, label: 'Armo oraciones simples en mi cabeza y le explico el camino con calma.' },
        { value: 100, label: 'Le respondo con total fluidez, amabilidad y buena pronunciación sin dudar.' }
      ]},
      { level: 3, q: 'Tienes que leer un manual o paper técnico vital que solo está publicado en inglés.', options: [
        { value: 20, label: 'Renuncio a la tarea, me declaro incapaz de leerlo.' },
        { value: 40, label: 'Copio y pego todo el documento en el Traductor de Google sin revisar.' },
        { value: 60, label: 'Uso el traductor pero trato de corregir las partes que no tienen sentido.' },
        { value: 80, label: 'Lo leo en inglés pero con un diccionario al lado para las palabras difíciles.' },
        { value: 100, label: 'Lo leo directamente en inglés con total fluidez técnica y analítica.' }
      ]},
      { level: 3, q: 'Te ofrecen un diplomado intensivo y denso sobre fonética y gramática inglesa avanzada.', options: [
        { value: 20, label: 'Preferiría barrer las calles antes que estudiar estructuras gramaticales inglesas.' },
        { value: 40, label: 'Rechazo la oferta, la gramática siempre ha sido mi mayor debilidad.' },
        { value: 60, label: 'Voy arrastrando los pies solo porque sé que me dará puntos en mi currículum.' },
        { value: 80, label: 'Asisto y pongo mucho empeño para pulir los errores que siempre cometo.' },
        { value: 100, label: 'Asisto con máxima emoción porque me apasiona dominar el idioma como un nativo.' }
      ]},
      { level: 3, q: 'Te ofrecen un empleo de alto nivel ejecutivo donde el 100% de la comunicación es en inglés.', options: [
        { value: 20, label: 'Renuncio el primer día, la ansiedad de no poder hablar me paralizaría.' },
        { value: 40, label: 'Rechazo la oferta porque sufriría demasiado tratando de expresarme.' },
        { value: 60, label: 'Acepto por el sueldo, pero usaría traductores en secreto para sobrevivir.' },
        { value: 80, label: 'Acepto el reto, me costaría un poco al inicio pero sé que me adaptaré rápido.' },
        { value: 100, label: 'Sería fantástico, me encantaría vivir inmerso personal y profesionalmente en el idioma.' }
      ]}
    ]
  },
  {
    id: 'ebr_ept',
    title: 'Educación para el Trabajo (EPT)',
    questions: [
      { level: 1, q: 'Tienes la oportunidad de ganar un buen dinero extra comprando y vendiendo productos.', options: [
        { value: 20, label: 'No lo hago, me da demasiada vergüenza y pánico ofrecer cosas a la gente.' },
        { value: 40, label: 'Trato de venderle solo a mis familiares para no tener que hablar con extraños.' },
        { value: 60, label: 'Lo hago de mala gana si necesito el dinero urgente, pero no lo disfruto.' },
        { value: 80, label: 'Me parece una buena idea, me organizo bien para vender rápido.' },
        { value: 100, label: 'Me emociona la idea de idear estrategias de venta, convencer y ver las ganancias.' }
      ]},
      { level: 2, q: 'Tu grupo debe crear y ejecutar un proyecto de emprendimiento para generar fondos.', options: [
        { value: 20, label: 'No aporto nada, espero que los demás hagan el negocio y yo miro.' },
        { value: 40, label: 'Hago el trabajo manual o de limpieza, pero me alejo de las finanzas y las ventas.' },
        { value: 60, label: 'Ayudo en lo que me asignen sin tomar nunca la iniciativa ni el control.' },
        { value: 80, label: 'Propongo buenas ideas de productos y ayudo activamente a vender.' },
        { value: 100, label: 'Lidero con fuerza la estrategia corporativa, el marketing y el control del dinero.' }
      ]},
      { level: 2, q: 'Te piden diseñar una campaña o plan comercial para lograr que un servicio sea un éxito.', options: [
        { value: 20, label: 'Delego inmediatamente esa tarea a otro, odio la palabra "comercial".' },
        { value: 40, label: 'Hago un cartel básico de "Se vende" y doy por terminada la tarea.' },
        { value: 60, label: 'Uso una publicidad típica y genérica que he visto en todos lados.' },
        { value: 80, label: 'Pienso en quiénes son los clientes y trato de hacer algo llamativo para ellos.' },
        { value: 100, label: 'Investigo al consumidor, analizo la competencia y creo una campaña ultra persuasiva.' }
      ]},
      { level: 3, q: 'Tienes acceso a un reporte financiero extenso con balances de ganancias de una empresa.', options: [
        { value: 20, label: 'Lo veo extremadamente aburrido, me marea y lo cierro al instante.' },
        { value: 40, label: 'Miro solo la última línea para ver si hay un número en rojo o verde.' },
        { value: 60, label: 'Lo reviso por encima si me lo exigen para cumplir con mi trabajo.' },
        { value: 80, label: 'Leo con atención las ventas y los gastos para entender cómo funciona la empresa.' },
        { value: 100, label: 'Analizo meticulosamente márgenes de rentabilidad, flujos de caja y costos fijos.' }
      ]},
      { level: 3, q: 'Te proponen crear una "Startup" asumiendo grandes riesgos y pedir préstamos.', options: [
        { value: 20, label: 'De ninguna manera, yo exijo la paz y seguridad absoluta de un sueldo fijo.' },
        { value: 40, label: 'Me aterra la idea de deber dinero o fracasar, rechazo la propuesta.' },
        { value: 60, label: 'Lo pensaría muchísimo y solo lo haría si el riesgo de perder es casi nulo.' },
        { value: 80, label: 'Acepto si el plan es sólido, estoy dispuesto a trabajar duro por mi propio negocio.' },
        { value: 100, label: 'Me fascina la adrenalina pura del riesgo corporativo, el emprendimiento y la innovación.' }
      ]},
      { level: 3, q: 'Te imaginas tu futuro administrando y dirigiendo la expansión comercial de una multinacional.', options: [
        { value: 20, label: 'Odio el mundo corporativo capitalista y la presión de los negocios me destruiría.' },
        { value: 40, label: 'Ser un "ejecutivo" de negocios me parece una vida gris y estresante.' },
        { value: 60, label: 'Lo haría solo por alcanzar estatus económico, aunque no me guste el trabajo.' },
        { value: 80, label: 'Me parece una carrera exitosa y desafiante, me prepararía para hacerlo bien.' },
        { value: 100, label: 'Es mi máximo sueño, nací para liderar grandes cadenas de valor en el mundo.' }
      ]}
    ]
  },
  {
    id: 'ebr_arte_cultura',
    title: 'Arte y Cultura',
    questions: [
      { level: 1, q: 'Pasas por una plaza y hay un músico tocando o un pintor trabajando muy concentrado.', options: [
        { value: 20, label: 'Paso de largo rápidamente quejándome del ruido o estorbo.' },
        { value: 40, label: 'Los ignoro completamente, no les presto la más mínima atención.' },
        { value: 60, label: 'Me detengo un par de segundos si me llama la atención visualmente, y luego sigo.' },
        { value: 80, label: 'Me quedo a observar su trabajo, lo aprecio y lo aplaudo.' },
        { value: 100, label: 'Me quedo un gran rato inmerso admirando la técnica, el esfuerzo y la expresión pura.' }
      ]},
      { level: 2, q: 'Te asignan la tarea de armar la estética, colores y diseño visual de un documento.', options: [
        { value: 20, label: 'Uso texto negro puro sobre fondo blanco, me importa cero lo visual.' },
        { value: 40, label: 'Le pido a un compañero que lo haga él porque yo "no tengo buen ojo".' },
        { value: 60, label: 'Elijo una plantilla predeterminada genérica para salir del paso rápido.' },
        { value: 80, label: 'Intento combinar colores y fuentes para que se vea bastante atractivo y limpio.' },
        { value: 100, label: 'Cuido obsesivamente la teoría del color, las tipografías y el impacto artístico.' }
      ]},
      { level: 2, q: 'Tienes un fin de semana libre y te regalan entradas VIP para una muestra de arte o teatro clásico.', options: [
        { value: 20, label: 'Se las regalo o vendo a otra persona, prefiero dormir o jugar videojuegos.' },
        { value: 40, label: 'Voy obligado por no perder el dinero, pero me aburro durante todo el evento.' },
        { value: 60, label: 'Voy para salir de casa un rato, pero lo veo como una actividad normal.' },
        { value: 80, label: 'Voy con interés, tomo fotos y trato de entender el mensaje de la obra.' },
        { value: 100, label: 'Voy con altísima emoción y disfruto analizando cada minucioso detalle de las obras.' }
      ]},
      { level: 3, q: 'Te invitan a practicar un instrumento, danza o técnica de pintura rigurosa diariamente.', options: [
        { value: 20, label: 'Abandono al primer día, me frustra inmensamente no ser bueno de inmediato.' },
        { value: 40, label: 'Pongo excusas para faltar a los ensayos porque me da mucha pereza la rutina.' },
        { value: 60, label: 'Lo haría solo intermitentemente como un pasatiempo relajado y sin compromiso.' },
        { value: 80, label: 'Practico con disciplina porque me gusta ver cómo mejoro mi arte con el tiempo.' },
        { value: 100, label: 'Entrenaría obsesivamente durante horas diarias buscando alcanzar la perfección técnica.' }
      ]},
      { level: 3, q: 'Estás en un foro de críticos donde analizan profundamente la historia del arte o la teoría musical.', options: [
        { value: 20, label: 'Siento que hablan en otro idioma, me voy del lugar por aburrimiento extremo.' },
        { value: 40, label: 'Me quedo callado mirando el reloj esperando a que termine la charla.' },
        { value: 60, label: 'Escucho en silencio para culturizarme un poco, pero no opino nada.' },
        { value: 80, label: 'Hago preguntas para entender las diferentes escuelas o corrientes artísticas.' },
        { value: 100, label: 'Me fascina intervenir, debatir, criticar e interpretar significados estéticos profundos.' }
      ]},
      { level: 3, q: '¿Renunciarías a una carrera tradicional segura para vivir exclusivamente de tu propia creación artística?', options: [
        { value: 20, label: 'Jamás, me parece un acto de locura e irracionalidad financiera absoluta.' },
        { value: 40, label: 'No lo haría, el arte debe ser solo un pasatiempo para no morir de hambre.' },
        { value: 60, label: 'Solo lo haría si una disquera o galería me firma un contrato millonario previo.' },
        { value: 80, label: 'Lo pensaría seriamente si veo que mi talento tiene demanda en el mercado real.' },
        { value: 100, label: 'Sí, sin dudarlo; la necesidad de expresar mi arte supera cualquier comodidad económica.' }
      ]}
    ]
  },
  {
    id: 'ebr_educacion_fisica',
    title: 'Educación Física y Deportes',
    questions: [
      { level: 1, q: 'Es tu único día de descanso y te proponen salir a correr, nadar o jugar un partido intenso.', options: [
        { value: 20, label: 'Invento una excusa médica para no moverme de mi cama en todo el día.' },
        { value: 40, label: 'Digo que sí pero voy de mala gana, solo para que dejen de insistir.' },
        { value: 60, label: 'Voy para sudar un rato, caminar y conversar, pero sin exigirme mucho.' },
        { value: 80, label: 'Me gusta la idea, me pongo ropa deportiva y salgo a dar lo mejor de mí.' },
        { value: 100, label: 'Salto de la cama emocionado por quemar energía y disfrutar el desgaste físico.' }
      ]},
      { level: 2, q: 'Estás compitiendo en un torneo deportivo escolar oficial representando a tu salón.', options: [
        { value: 20, label: 'Me escondo en la defensa o evito la pelota a toda costa por miedo a fallar.' },
        { value: 40, label: 'Juego sin ganas, si perdemos o ganamos me da exactamente igual.' },
        { value: 60, label: 'Juego tranquilo para divertirme y cumplir, sin estresarme por el resultado.' },
        { value: 80, label: 'Me concentro, hago estrategias con el equipo y corro bastante para intentar ganar.' },
        { value: 100, label: 'Me transformo, exijo mi cuerpo al límite absoluto y dejo el alma por la victoria.' }
      ]},
      { level: 2, q: 'Lees un artículo científico sobre cómo ciertos nutrientes y rutinas cambian la musculatura.', options: [
        { value: 20, label: 'Paso de largo inmediatamente, como lo que haya y detesto las dietas o rutinas.' },
        { value: 40, label: 'Me parece demasiado esfuerzo andar calculando lo que como, lo cierro.' },
        { value: 60, label: 'Lo leo por curiosidad superficial pero no cambio mis hábitos alimenticios.' },
        { value: 80, label: 'Me parece información muy útil e intento comer más sano a partir de eso.' },
        { value: 100, label: 'Lo estudio a detalle y modifico milimétricamente mi régimen de nutrición y rutina.' }
      ]},
      { level: 3, q: 'Te proponen estudiar a fondo la biomecánica, las articulaciones y los umbrales del dolor.', options: [
        { value: 20, label: 'Me da demasiada pereza aprender tantos términos médicos y biológicos.' },
        { value: 40, label: 'Me parece un tema muy denso, preferiría solo ir al gimnasio sin tanta teoría.' },
        { value: 60, label: 'Lo estudiaría solo para aprobar si fuera una materia obligatoria en el colegio.' },
        { value: 80, label: 'Me interesaría para poder entrenar mejor y evitar lesiones en el futuro.' },
        { value: 100, label: 'Me fascinaría comprender minuciosamente cómo funciona la increíble máquina del cuerpo.' }
      ]},
      { level: 3, q: '¿Te someterías voluntariamente a una rutina casi militar de entrenamiento físico de alto rendimiento?', options: [
        { value: 20, label: 'Renuncio y me voy a mi casa llorando o enojado en los primeros 5 minutos.' },
        { value: 40, label: 'Fingiría una lesión para salirme de ese nivel de tortura física.' },
        { value: 60, label: 'Aguantaría lo más que pueda sin matarme, pero al final me retiraría exhausto.' },
        { value: 80, label: 'Trataría de terminarla con orgullo, superando mi cansancio mental.' },
        { value: 100, label: 'Soportaría el dolor con disciplina estoica diaria para destruir mis propios límites.' }
      ]},
      { level: 3, q: 'Te ves dedicando tu vida profesional exclusivamente como atleta de élite, fisioterapeuta o coach.', options: [
        { value: 20, label: 'Para nada, desprecio esa vida; mi éxito debe estar en una silla y una oficina.' },
        { value: 40, label: 'El cuerpo envejece rápido, buscaría algo más seguro y menos agotador físicamente.' },
        { value: 60, label: 'Tal vez lo mantendría como un "plan B" o un hobby de fin de semana, nada más.' },
        { value: 80, label: 'Me parece una carrera hermosa, saludable y respetable, la tomaría en serio.' },
        { value: 100, label: 'Definitivamente; el deporte, el movimiento y la actividad física son mi verdadera vida.' }
      ]}
    ]
  },
  {
    id: 'ebr_religion',
    title: 'Ética, Valores y Espiritualidad',
    questions: [
      { level: 1, q: 'Alguien empieza a hablar profundamente sobre el sentido espiritual de la vida, el bien y el mal.', options: [
        { value: 20, label: 'Le cambio de tema agresivamente, me fastidian esas conversaciones místicas o moralistas.' },
        { value: 40, label: 'Saco mi celular y me distraigo hasta que deje de hablar de eso.' },
        { value: 60, label: 'Lo escucho en silencio por cortesía, pero sus ideas no resuenan en mí.' },
        { value: 80, label: 'Escucho con atención y aporto mi propia visión sobre lo que es éticamente correcto.' },
        { value: 100, label: 'Participo con gran entusiasmo, la reflexión existencial me llena profundamente.' }
      ]},
      { level: 2, q: 'Tu comunidad organiza una jornada de trabajo duro y gratuito para ayudar a personas sin hogar.', options: [
        { value: 20, label: 'Me escondo e invento una mentira diciendo que estoy enfermo para no ir.' },
        { value: 40, label: 'Me parece bien que otros lo hagan, pero yo prefiero quedarme descansando en casa.' },
        { value: 60, label: 'Doy una donación económica pequeña para cumplir, pero prefiero no ir físicamente.' },
        { value: 80, label: 'Asisto un par de horas, ayudo a repartir cosas y me retiro satisfecho.' },
        { value: 100, label: 'Voy voluntariamente de principio a fin, trabajando duro y conectando con los afectados.' }
      ]},
      { level: 2, q: 'Ocurre una gran tragedia mundial y alguien pregunta por qué hay tanto sufrimiento en el mundo.', options: [
        { value: 20, label: 'Digo "cosas que pasan" o "qué mala suerte" para cortar el tema denso de raíz.' },
        { value: 40, label: 'Culpo rápidamente a los políticos o al clima sin pensar en nada más profundo.' },
        { value: 60, label: 'Doy una respuesta genérica como "el mundo es injusto" y sigo con mi vida.' },
        { value: 80, label: 'Me tomo el tiempo de reflexionar sobre la bondad humana y nuestras responsabilidades.' },
        { value: 100, label: 'Reflexiono profundamente sobre la filosofía, la teodicea y el propósito del sufrimiento.' }
      ]},
      { level: 3, q: 'Te regalan un tomo enciclopédico sobre teología compleja, ética pura y la historia de las religiones.', options: [
        { value: 20, label: 'Lo tiro a la basura o lo uso para atrancar una puerta, no tolero esos textos.' },
        { value: 40, label: 'Lo dejo empolvándose en el fondo de mi cuarto, jamás abriría algo tan denso.' },
        { value: 60, label: 'Leo un par de páginas si el título me llama la atención, pero me aburro rápido.' },
        { value: 80, label: 'Lo leo poco a poco porque me interesa conocer las creencias éticas de la humanidad.' },
        { value: 100, label: 'Lo estudio rigurosamente con inmenso interés analítico, antropológico y espiritual.' }
      ]},
      { level: 3, q: '¿Sacrificarías un gran salario y lujos de por vida por trabajar en una ONG de servicio social puro?', options: [
        { value: 20, label: 'De ninguna manera, mi máxima prioridad y dios es mi riqueza personal y comodidad.' },
        { value: 40, label: 'Me llamaría "tonto" a mí mismo por perder la oportunidad de hacerme millonario.' },
        { value: 60, label: 'Lo haría solo de joven por la experiencia, pero luego buscaría dinero y estabilidad.' },
        { value: 80, label: 'Lo consideraría seriamente si mi labor allí realmente salva vidas o cambia el mundo.' },
        { value: 100, label: 'Sí, el servicio absoluto al prójimo y mi vocación moral me enriquecen más que el oro.' }
      ]},
      { level: 3, q: 'Te ves en el futuro trabajando profesionalmente como filósofo ético, consejero espiritual o líder ONG.', options: [
        { value: 20, label: 'Me daría asco esa vida, me incomoda muchísimo ser visto como un "santo" o guía moral.' },
        { value: 40, label: 'Lo evitaría, no tengo la paciencia ni la limpieza moral para andar guiando a otros.' },
        { value: 60, label: 'No es mi plan en absoluto, pero si la vida me arrastra a ello, haría lo que pueda.' },
        { value: 80, label: 'Me parece una carrera súper honorable e impactante, sería un orgullo dedicarme a eso.' },
        { value: 100, label: 'Siento una vocación espiritual innegable para guiar éticamente a grandes grupos de almas.' }
      ]}
    ]
  },
  {
    id: 'transversal_tic',
    title: 'Tecnología de la Información (TIC)',
    questions: [
      { level: 1, q: 'En tu trabajo o escuela te obligan a usar un nuevo software informático complejo para tus tareas.', options: [
        { value: 20, label: 'Me niego a usarlo, exijo seguir usando papel o herramientas antiguas.' },
        { value: 40, label: 'Pido desesperadamente a alguien que me instale todo y me dicte qué botones presionar.' },
        { value: 60, label: 'Aprendo a usar solo los tres botones que necesito para cumplir mi tarea y listo.' },
        { value: 80, label: 'Busco tutoriales en YouTube y aprendo a manejarlo con bastante soltura.' },
        { value: 100, label: 'Exploro instintivamente todas sus configuraciones y atajos complejos el primer día.' }
      ]},
      { level: 2, q: 'Tu computadora lanza una pantalla azul/negra con un código de error de sistema desconocido.', options: [
        { value: 20, label: 'Entro en pánico absoluto, me rindo llorando y compro otra computadora si puedo.' },
        { value: 40, label: 'Llamo urgente a un técnico y le pago lo que pida para no tocar nada yo.' },
        { value: 60, label: 'La reinicio mil veces rogando al cielo que vuelva a prender sola por milagro.' },
        { value: 80, label: 'Busco la solución general en internet y sigo pasos fáciles para arreglarla.' },
        { value: 100, label: 'Identifico el código de error en foros técnicos y lo soluciono mediante comandos o BIOS.' }
      ]},
      { level: 2, q: 'Alguien te pide que le ayudes a configurar la red Wi-Fi y los protocolos de seguridad de su router.', options: [
        { value: 20, label: 'Salgo corriendo, creo que la palabra "router" tiene que ver con carpintería.' },
        { value: 40, label: 'Digo "yo no sé de hackers" y me niego a acercarme al módem.' },
        { value: 60, label: 'Logro entrar a la configuración básica, le pongo la contraseña y no toco nada más.' },
        { value: 80, label: 'Le cambio el nombre, la contraseña y oculto la red para que nadie más entre.' },
        { value: 100, label: 'Entro a la IP, configuro servidores DNS, optimizo canales y elevo la encriptación.' }
      ]},
      { level: 3, q: 'Te proponen un diplomado para aprender a escribir código puro en lenguajes como Python, Java o C++.', options: [
        { value: 20, label: 'Me parece un lenguaje alienígena horroroso, prefiero torturarme antes que programar.' },
        { value: 40, label: 'Rechazo la oferta porque soy malísimo memorizando comandos e inglés técnico.' },
        { value: 60, label: 'Asisto a un par de clases solo para hacer currículum, pero copio y pego todo el código.' },
        { value: 80, label: 'Me esfuerzo y estudio duro porque sé que programar es el futuro laboral.' },
        { value: 100, label: 'Acepto con la máxima emoción, mi cerebro entiende la lógica algorítmica de forma natural.' }
      ]},
      { level: 3, q: 'Te encargan diseñar y mantener activa una arquitectura de servidores y base de datos masiva.', options: [
        { value: 20, label: 'Renuncio de inmediato, me daría terror borrar o destruir los datos del sistema.' },
        { value: 40, label: 'Rechazo el cargo, el estrés de que "se caiga el sistema" no es para mí.' },
        { value: 60, label: 'Hago una hoja de Excel gigante guardada en la nube y cruzo los dedos para que aguante.' },
        { value: 80, label: 'Leo la documentación, contrato un servicio en la nube y organizo la estructura con cuidado.' },
        { value: 100, label: 'Me fascina la idea de programar, estructurar y orquestar bases de datos de alto rendimiento.' }
      ]},
      { level: 3, q: '¿Te ves pasando tu vida laboral entera frente a tres monitores escribiendo líneas de código oscuro?', options: [
        { value: 20, label: 'Me volvería loco de depresión por el encierro; necesito estar en la calle y hablar con humanos.' },
        { value: 40, label: 'Odiaría estar sentado todo el día frente a luces azules, mi cuerpo no lo soportaría.' },
        { value: 60, label: 'Podría soportarlo mecánicamente solo si el sueldo me permite retirarme joven.' },
        { value: 80, label: 'Me parece un estilo de vida súper interesante, productivo y acorde a mi perfil.' },
        { value: 100, label: 'Sería el trabajo de mis sueños, entro en un estado de trance y pura felicidad codificando.' }
      ]}
    ]
  },
  {
    id: 'transversal_autonomia',
    title: 'Aprendizaje Autónomo',
    questions: [
      { level: 1, q: 'Un profesor o jefe menciona un concepto técnico fascinante pero no lo explica en absoluto.', options: [
        { value: 20, label: 'Me quejo de que es un mal profesor por no explicarlo, y me niego a buscarlo yo.' },
        { value: 40, label: 'Me olvido del asunto y de la palabra exactamente 5 segundos después de la clase.' },
        { value: 60, label: 'Espero que un compañero más listo lo busque y me lo resuma luego en el receso.' },
        { value: 80, label: 'Anoto la palabra clave en mi cuaderno para buscarla cuando llegue a mi casa.' },
        { value: 100, label: 'Saco mi celular debajo de la mesa y lo busco instantáneamente en Google o Wikipedia.' }
      ]},
      { level: 2, q: 'Debes dominar un tema extremadamente difícil y no tienes a quién pedirle clases particulares.', options: [
        { value: 20, label: 'Me frustro, lloro, acepto mi trágico destino y me presento al examen a reprobar.' },
        { value: 40, label: 'Me leo un resumen de una página y confío ciega e ingenuamente en mi suerte.' },
        { value: 60, label: 'Leo mis apuntes un par de veces la noche anterior rogando que venga algo fácil.' },
        { value: 80, label: 'Busco varios tutoriales en YouTube y los veo hasta entender el panorama general.' },
        { value: 100, label: 'Me encierro en mi habitación, busco libros, foros y no duermo hasta dominarlo por mi cuenta.' }
      ]},
      { level: 2, q: 'Descubres una plataforma internacional de cursos universitarios gratuitos (Coursera, edX).', options: [
        { value: 20, label: 'Huyo de la página web; qué idea tan espantosa es estudiar en mi tiempo libre.' },
        { value: 40, label: 'Abro la página, me da pereza leer en inglés y la cierro para siempre.' },
        { value: 60, label: 'Me registro, veo motivado el primer video de un curso y luego lo abandono para siempre.' },
        { value: 80, label: 'Me inscribo en un curso que necesito para mi carrera y lo avanzo lentamente los domingos.' },
        { value: 100, label: 'Me convierto en adicto al sitio, terminando certificados rigurosos por puro interés intelectual.' }
      ]},
      { level: 3, q: 'Necesitas extraer datos de un artículo científico (paper) de 40 páginas, sin resúmenes.', options: [
        { value: 20, label: 'Digo tajantemente "no entiendo esas letras" y exijo que me cambien la tarea.' },
        { value: 40, label: 'Uso inteligencia artificial para que me genere un párrafo corto y no leo el documento real.' },
        { value: 60, label: 'Leo solo la introducción y las conclusiones finales saltándome el marco metodológico.' },
        { value: 80, label: 'Uso resaltador y lo leo pacientemente, deteniéndome para buscar términos desconocidos.' },
        { value: 100, label: 'Lo leo metódica y analíticamente, diseccionando cada hipótesis y fórmula matemática expuesta.' }
      ]},
      { level: 3, q: 'Te dan un mes libre en el trabajo y te dicen: "Elige qué investigar, nadie te supervisará".', options: [
        { value: 20, label: 'Me paso el mes entero viendo series, durmiendo y engañando a mis jefes.' },
        { value: 40, label: 'Entro en crisis existencial porque no sé qué hacer si alguien no me da órdenes estrictas.' },
        { value: 60, label: 'Hago el mínimo esfuerzo posible la última semana del mes para entregar "algo".' },
        { value: 80, label: 'Armo un horario de oficina para mí mismo e investigo un tema que beneficia a la empresa.' },
        { value: 100, label: 'Aprovecho frenéticamente esa libertad para investigar a profundidad mi mayor pasión académica.' }
      ]},
      { level: 3, q: '¿Te ves dedicando tu vida laboral al 100% a la investigación académica publicando libros y papers?', options: [
        { value: 20, label: 'Esa vida aislada entre libros viejos me deprimiría, me parece una existencia miserable.' },
        { value: 40, label: 'No lo soportaría, yo necesito un jefe y un equipo que me digan exactamente qué hacer hoy.' },
        { value: 60, label: 'Prefiero el trabajo dinámico y social corporativo, pero podría publicar un artículo al año.' },
        { value: 80, label: 'Me encantaría el prestigio del ambiente universitario y tener la disciplina para publicar.' },
        { value: 100, label: 'Me apasiona intensamente la idea de ser un científico solitario o investigador académico puro.' }
      ]}
    ]
  },
  {
    id: 'transversal_resolucion_problemas',
    title: 'Resolución de Problemas Complejos',
    questions: [
      { level: 1, q: 'Te regalan un rompecabezas mecánico de 1000 piezas o un cubo Rubik totalmente desarmado.', options: [
        { value: 20, label: 'Me enojo por el regalo inútil y lo escondo en un cajón para no verlo nunca más.' },
        { value: 40, label: 'Muevo un par de piezas al azar sin entender nada y lo dejo tirado en la mesa.' },
        { value: 60, label: 'Juego concentrado unos 15 minutos, y al ver que no sale, busco la solución en YouTube.' },
        { value: 80, label: 'Dedico tiempo cada tarde intentando descifrar cómo encajar las piezas poco a poco.' },
        { value: 100, label: 'No duermo, no como y no respiro hasta analizar el patrón matemático para resolverlo yo solo.' }
      ]},
      { level: 2, q: 'Un proyecto logístico o maqueta de arquitectura colapsa inesperadamente a 2 horas de la entrega.', options: [
        { value: 20, label: 'Entro en crisis total de pánico, lloro a gritos, pateo las cosas y me voy del lugar.' },
        { value: 40, label: 'Me paralizo del shock, me siento en una silla y espero que otra persona lo solucione.' },
        { value: 60, label: 'Agarro cinta y pegamento intentando unir las partes al azar esperando un milagro estético.' },
        { value: 80, label: 'Pido calma a mi equipo, evaluamos los daños rápidamente y rearmamos lo esencial.' },
        { value: 100, label: 'Aíslo fríamente el punto de falla estructural, diseño una solución de carga y lo reconstruyo mejorado.' }
      ]},
      { level: 2, q: 'La lavadora o un electrodoméstico mecánico de tu casa hace un ruido extraño y deja de funcionar.', options: [
        { value: 20, label: 'Lo declaro muerto, exijo que compren uno nuevo inmediatamente sin revisarlo.' },
        { value: 40, label: 'Le doy un par de golpes fuertes y lo sacudo a ver si por magia vuelve a prender.' },
        { value: 60, label: 'Llamo directamente al técnico y le pago lo que sea para no ensuciarme las manos.' },
        { value: 80, label: 'Busco tutoriales en internet, verifico filtros y cables antes de pedir ayuda experta.' },
        { value: 100, label: 'Busco mis herramientas, lo desarmo metódicamente hasta encontrar el engranaje o circuito fallado.' }
      ]},
      { level: 3, q: 'Te contratan de emergencia para evitar que una gran fábrica siga perdiendo millones por cuellos de botella.', options: [
        { value: 20, label: 'Renuncio inmediatamente; jamás aceptaría una responsabilidad de vida o muerte corporativa.' },
        { value: 40, label: 'Me aterro, culpo a los obreros por flojos y despido al azar para fingir que hago algo.' },
        { value: 60, label: 'Aplico soluciones estándar que leí en un manual genérico y cruzo los dedos para que funcionen.' },
        { value: 80, label: 'Me reúno con los gerentes de planta para escuchar los problemas y aplicar control de calidad.' },
        { value: 100, label: 'Mapeo todo el flujo logístico usando matemáticas y control estadístico de procesos para aislar el fallo.' }
      ]},
      { level: 3, q: 'Te presentan un problema corporativo con múltiples variables, riesgos cruzados y altísima incertidumbre.', options: [
        { value: 20, label: 'Mi cerebro se apaga ante la abrumadora complejidad, dejo el trabajo botado en la mesa.' },
        { value: 40, label: 'Busco la solución más superficial y mediocre posible solo para sacarme el peso de encima.' },
        { value: 60, label: 'Tomo la decisión más segura y tradicional, copiando exactamente lo que hizo otra empresa.' },
        { value: 80, label: 'Dibujo mapas conceptuales, analizo pros y contras y trazo un plan estratégico meditado.' },
        { value: 100, label: 'Me apasiona diseccionar el caos: desmenuzo las variables ocultas y creo un algoritmo de solución.' }
      ]},
      { level: 3, q: '¿Te gustaría ser el experto ingeniero u optimizador al que todos llaman cuando hay una crisis catastrófica?', options: [
        { value: 20, label: 'Absolutamente no, huyo despavorido de esa tremenda presión y estrés infartante.' },
        { value: 40, label: 'Odio las emergencias, yo preferiría un trabajo donde todo sea predecible y monótono.' },
        { value: 60, label: 'Podría hacerlo un par de años por prestigio y dinero, pero luego buscaría la paz.' },
        { value: 80, label: 'Me gustaría el respeto que conlleva ese cargo y me prepararía para no fallar bajo presión.' },
        { value: 100, label: 'Es mi droga; amo la adrenalina intelectual de resolver analíticamente lo que todos creen imposible.' }
      ]}
    ]
  },
  {
    id: 'transversal_pensamiento_critico',
    title: 'Pensamiento Crítico',
    questions: [
      { level: 1, q: 'Ves una noticia o imagen sumamente indignante circulando velozmente por WhatsApp o TikTok.', options: [
        { value: 20, label: 'Me dejo llevar por la rabia ciega y lo comparto de inmediato con todos mis contactos familiares.' },
        { value: 40, label: 'Dudo un segundo de si la imagen es real, pero igual asumo que es verdad y la comento enojado.' },
        { value: 60, label: 'No lo comparto por pereza, pero termino creyendo lo que dice porque "todos lo dicen".' },
        { value: 80, label: 'Abro Google y busco si algún medio oficial desmintió la noticia antes de formarme una opinión.' },
        { value: 100, label: 'Desconfío instintivamente: verifico fechas, leo las fuentes cruzadas y busco la metodología de la nota.' }
      ]},
      { level: 2, q: 'Un líder, influencer o político muy carismático da un discurso apasionado lleno de promesas increíbles.', options: [
        { value: 20, label: 'Me emociono hasta las lágrimas, me vuelvo su fanático y defiendo todo lo que dice ciegamente.' },
        { value: 40, label: 'Me cae bien porque habla bonito, así que asumo que sus promesas técnicas son viables.' },
        { value: 60, label: 'Lo escucho como entretenimiento, pero no analizo mucho las implicaciones de lo que promete.' },
        { value: 80, label: 'Escucho con atención intentando separar sus emociones de los datos reales que presenta.' },
        { value: 100, label: 'Desmonto mentalmente sus falacias argumentales, sus sesgos y exijo evidencia empírica a sus datos.' }
      ]},
      { level: 2, q: 'Tu grupo de trabajo universitario aprueba una idea que tú sabes que es lógica y estadísticamente desastrosa.', options: [
        { value: 20, label: 'Me callo la boca cobardemente y asiento con la cabeza para no ser excluido del grupo social.' },
        { value: 40, label: 'Digo "ok, hagámoslo" sabiendo que va a fallar, solo para no generar una discusión tensa.' },
        { value: 60, label: 'Les menciono muy débilmente que "podría salir mal", pero dejo que ellos asuman el choque.' },
        { value: 80, label: 'Me pongo firme, les explico los riesgos e intento convencerlos amablemente de cambiar de rumbo.' },
        { value: 100, label: 'Juego al "abogado del diablo" con datos fríos y contundentes hasta destruir lógicamente su propuesta.' }
      ]},
      { level: 3, q: 'Te encargan la pesada tarea de auditar un contrato legal o los estándares de calidad de una fábrica.', options: [
        { value: 20, label: 'Fírmo o apruebo rápido sin leer la letra pequeña, yo confío plenamente en la bondad de la gente.' },
        { value: 40, label: 'Me da demasiada pereza leer las 100 páginas, así que leo solo el título y la última hoja.' },
        { value: 60, label: 'Reviso por encima que los márgenes, títulos y firmas parezcan legales para cumplir mi turno.' },
        { value: 80, label: 'Leo con atención todo el documento resaltando las partes que me parecen ambiguas o dudosas.' },
        { value: 100, label: 'Analizo minuciosamente y con aguda sospecha cada coma y cláusula buscando lagunas legales y fraudes.' }
      ]},
      { level: 3, q: 'Debes tomar la decisión de despedir a muchos obreros basándote en un sistema de rendimiento puro.', options: [
        { value: 20, label: 'Me pongo a llorar de lástima, me paralizo por la presión y renuncio para no hacerlo yo.' },
        { value: 40, label: 'Me dejo llevar por la presión del sindicato y no despido a nadie para que no me odien.' },
        { value: 60, label: 'Trato de tomar una ruta intermedia mediocre para complacer a los gerentes y a los obreros.' },
        { value: 80, label: 'Hablo con los afectados intentando ser justo, pero ejecuto los recortes necesarios para la empresa.' },
        { value: 100, label: 'Tomo la decisión dura, objetiva y gélida que dictan irrevocablemente los datos estadísticos de eficiencia.' }
      ]},
      { level: 3, q: '¿Sientes un inmenso placer al destruir paradigmas tradicionales demostrando estadísticamente que están mal?', options: [
        { value: 20, label: 'No, yo prefiero someterme y respetar incondicionalmente las tradiciones, mitos y jerarquías impuestas.' },
        { value: 40, label: 'No me gusta pelear; evito a toda costa los conflictos ideológicos con mis mayores o jefes.' },
        { value: 60, label: 'A veces encuentro que la tradición falla, pero me guardo la información para no ser antipático.' },
        { value: 80, label: 'Me gusta investigar la verdad e intento persuadir educadamente a otros con mis hallazgos empíricos.' },
        { value: 100, label: 'Siento un éxtasis intelectual absoluto al usar la ciencia y la lógica para aniquilar dogmas irracionales.' }
      ]}
    ]
  },
  {
    id: 'transversal_percepcion_social',
    title: 'Inteligencia Emocional',
    questions: [
      { level: 1, q: 'Estás en una reunión festiva y alguien en una esquina se aísla repentinamente viéndose muy triste y apagado.', options: [
        { value: 20, label: 'Ni me doy cuenta del entorno, estoy enfocado 100% en mi propia diversión o mi celular.' },
        { value: 40, label: 'Lo noto de reojo, me da curiosidad pero sigo en lo mío esperando que alguien más se acerque.' },
        { value: 60, label: 'Le grito desde lejos "¿Todo bien?" y si me responde que "sí", me doy la vuelta tranquilo.' },
        { value: 80, label: 'Me acerco y le ofrezco un vaso de agua o lo invito a unirse al grupo para que no esté solo.' },
        { value: 100, label: 'Leo su lenguaje no verbal, me acerco sutilmente y lo acompaño empáticamente adaptándome a su ritmo.' }
      ]},
      { level: 2, q: 'Un usuario, paciente o cliente profundamente frustrado comienza a gritarte e insultarte por un error administrativo.', options: [
        { value: 20, label: 'Me ofendo, le grito de vuelta con furia descontrolada o llamo a seguridad para que lo saquen a golpes.' },
        { value: 40, label: 'Me pongo a llorar de impotencia o salgo corriendo a esconderme en el baño por la ansiedad.' },
        { value: 60, label: 'Le hablo como un robot, de manera fría, seca y cortante, ignorando totalmente su tormenta emocional.' },
        { value: 80, label: 'Mantengo la calma, respiro profundo y trato de darle una solución técnica rápida para que se vaya.' },
        { value: 100, label: 'Uso altísima empatía clínica, modulación asertiva de voz y psicología táctica para desescalar su ira.' }
      ]},
      { level: 2, q: 'Un amigo o familiar te confía un problema íntimo muy doloroso y comienza a llorar desconsoladamente frente a ti.', options: [
        { value: 20, label: 'Me pongo sumamente asqueado o incómodo ante el llanto, me bloqueo y me voy del lugar.' },
        { value: 40, label: 'Me pongo nervioso e intento hacer chistes o cambiar de tema agresivamente para frenar sus lágrimas.' },
        { value: 60, label: 'Le doy palmaditas en la espalda y le digo frases cliché ("todo estará bien") para que acabe pronto.' },
        { value: 80, label: 'Trato de darle soluciones lógicas inmediatas y consejos directos sobre qué debe hacer mañana.' },
        { value: 100, label: 'Lo contengo, lo escucho activamente sin juzgar, validando absolutamente su desborde emocional.' }
      ]},
      { level: 3, q: 'Te proponen estudiar a profundidad la complejidad química y los traumas detrás de los trastornos mentales severos.', options: [
        { value: 20, label: 'Me parece un tema muy perturbador, morboso y repulsivo; prefiero estudiar cosas "normales".' },
        { value: 40, label: 'Me da miedo que analizar la locura humana termine afectándome la mente a mí también.' },
        { value: 60, label: 'Lo estudiaría solo por curiosidad teórica superficial o cultura general, pero sin aplicar nada.' },
        { value: 80, label: 'Me interesa mucho la psicología y creo que podría usar ese conocimiento para mejorar mis relaciones.' },
        { value: 100, label: 'Me apasiona intensamente la idea de entender, diagnosticar y ayudar a sanar la psique humana enferma.' }
      ]},
      { level: 3, q: 'En tu trabajo médico o clínico debes comunicar noticias de muertes y desahucios a familiares todos los días.', options: [
        { value: 20, label: 'Renunciaría en el minuto 1; no soportaría ni un solo día esa desgarradora carga emocional.' },
        { value: 40, label: 'Trataría de hacerlo pero terminaría con una severa depresión crónica o ataque de pánico en meses.' },
        { value: 60, label: 'Lo haría delegando a enfermeras o leyendo un papel de forma desapegada para proteger mi salud.' },
        { value: 80, label: 'Afrontaría el dolor y trataría de ser lo más amable posible, aunque llegaría muy cansado a casa.' },
        { value: 100, label: 'Tendría la resistente coraza emocional y la altísima empatía clínica necesaria para hacerlo profesionalmente.' }
      ]},
      { level: 3, q: '¿Disfrutarías dedicando tu vida laboral diaria a rehabilitar en el fango a adictos, indigentes o presidiarios?', options: [
        { value: 20, label: 'Siento un profundo desprecio, asco o miedo irracional por esos ambientes oscuros e higiénicamente feos.' },
        { value: 40, label: 'Yo creo que "cada quien tiene lo que merece", jamás perdería mi tiempo intentando salvar a esa gente.' },
        { value: 60, label: 'Solo lo haría temporalmente si fuera mi única y desesperada opción de supervivencia económica.' },
        { value: 80, label: 'Me parece un trabajo admirable y heroico, estaría dispuesto a colaborar en una ONG si me capacitan.' },
        { value: 100, label: 'Siento la inmensa, pura y genuina vocación inquebrantable de rescatar vidas marginadas por la sociedad.' }
      ]}
    ]
  },
  {
    id: 'transversal_toma_decisiones',
    title: 'Toma de Decisiones y Liderazgo',
    questions: [
      { level: 1, q: 'Tu grupo de amigos lleva una hora discutiendo en la calle sin lograr ponerse de acuerdo sobre a qué lugar ir.', options: [
        { value: 20, label: 'Me voy a mi casa, me estresa que me presionen para elegir o liderar al grupo.' },
        { value: 40, label: 'Espero en silencio sepulcral durante otra hora más a que ellos sigan discutiendo hasta cansarse.' },
        { value: 60, label: 'Digo "a mí me da exactamente igual" y sigo mirando mi teléfono totalmente desconectado del debate.' },
        { value: 80, label: 'Propongo un par de ideas lógicas y les pregunto si quieren votar democráticamente para avanzar.' },
        { value: 100, label: 'Tomo la iniciativa directiva, elijo el lugar óptimo e instruyo enérgicamente a todos para que caminen.' }
      ]},
      { level: 2, q: 'En el proyecto final, nadie sabe qué hacer, todo es un caos total y el tiempo de entrega límite se acaba.', options: [
        { value: 20, label: 'Me paralizo de ansiedad, me rindo mentalmente, abandono el grupo y asumo el "cero" de calificación.' },
        { value: 40, label: 'Culpo a los demás de ser unos inútiles y me quejo con el profesor pidiendo prórroga o clemencia.' },
        { value: 60, label: 'Hago solo mi pequeña partecita en silencio absoluto y dejo que el resto del barco se hunda.' },
        { value: 80, label: 'Pido calma, organizo una lluvia de ideas rápida y trato de que todos aportemos algo útil al proyecto.' },
        { value: 100, label: 'Asumo el control dictatorial de la crisis, delego roles milimétricos, doy órdenes frías y exijo resultados.' }
      ]},
      { level: 2, q: 'Te proponen participar en una inversión comercial innovadora con un riesgo altísimo pero ganancias millonarias.', options: [
        { value: 20, label: 'Huyo despavorido del riesgo sin pensarlo ni medio segundo; mi filosofía es el miedo al fracaso.' },
        { value: 40, label: 'Prefiero poner mi dinero bajo el colchón o en el banco a ganar 1% anual pero 100% seguro.' },
        { value: 60, label: 'Invierto solo lo poquito que me sobra a fin de mes por si acaso suena la flauta y me hago rico.' },
        { value: 80, label: 'Estudio la viabilidad del negocio, hablo con expertos y si tiene sentido, asumo un riesgo moderado.' },
        { value: 100, label: 'Calculo matemáticamente la desviación del riesgo, evalúo probabilidades de ruina e invierto agresivamente.' }
      ]},
      { level: 3, q: 'Te ofrecen el codiciado puesto de Gerente General (CEO) de una enorme transnacional que está al borde de la quiebra.', options: [
        { value: 20, label: 'Lo rechazo tajantemente, asumir una empresa moribunda es un suicidio profesional que no toleraría.' },
        { value: 40, label: 'El estrés de que cientos de empleados dependan de mí me daría ataques de pánico; no acepto.' },
        { value: 60, label: 'Acepto el cargo únicamente para cobrar el enorme sueldo final, pero sabiendo que igual quebraremos.' },
        { value: 80, label: 'Acepto con respeto el cargo e intento aplicar metodologías corporativas estándar para estabilizar la caída.' },
        { value: 100, label: 'Acepto extasiado el reto titánico de tomar el timón en la peor tormenta, reestructurando todo el imperio.' }
      ]},
      { level: 3, q: 'Una orden directa tuya en la empresa resulta equivocada y provoca una dolorosa pérdida de millones de dólares.', options: [
        { value: 20, label: 'Culpo desesperadamente a mis subordinados, a la economía o invento mentiras para salvar mi cuello.' },
        { value: 40, label: 'Me escondo en mi oficina, evito las llamadas y ruego al cielo que la junta directiva no me audite.' },
        { value: 60, label: 'Intento maquillar los números en el reporte trimestral para que el golpe parezca mucho menor de lo que es.' },
        { value: 80, label: 'Pido disculpas sinceras a la gerencia, acepto mi error éticamente y trato de aprender de la lección.' },
        { value: 100, label: 'Doy la cara gélidamente, asumo la responsabilidad penal/gerencial y ejecuto inmediatamente el plan de contingencia.' }
      ]},
      { level: 3, q: '¿Sientes pasión desbordante por la idea de ejercer el máximo poder político o corporativo sobre miles de personas?', options: [
        { value: 20, label: 'Me aterra, me da náuseas y asco tener que ejercer dominación, poder y responsabilidad sobre otra gente.' },
        { value: 40, label: 'Desprecio a los políticos y gerentes; prefiero una vida anónima trabajando en cosas pequeñas y artísticas.' },
        { value: 60, label: 'Prefiero ser un mando medio tranquilo que obedece las órdenes de un superior sin cuestionar la macroestructura.' },
        { value: 80, label: 'Me atrae el prestigio y la capacidad de hacer grandes cambios sociales desde una plataforma de liderazgo sólida.' },
        { value: 100, label: 'Amo profundamente el peso del liderazgo estratégico global, el ajedrez del poder y tomar decisiones sistémicas.' }
      ]}
    ]
  }
];

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
