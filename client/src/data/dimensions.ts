export interface CareerRecommendation {
  career: string;
  match_percentage: number;
  mahalanobis_dist: number;
}

export interface Question {
  q: string;
  level: 1 | 2 | 3;
  options: { label: string; value: number }[];
}

export interface Dimension {
  id: string;
  title: string;
  questions: Question[];
}

export const DIMENSIONS: Dimension[] = [
  {
  id: 'ebr_matematica',
  title: 'Matemática',
  questions: [
    {
      level: 1,
      q: 'Cuando vas al supermercado y encuentras descuentos en tus productos favoritos, ¿cómo decides si realmente te conviene comprarlos?',
      options: [
        { value: 20, label: 'Compro sin revisar mucho los precios, confío en lo que aparece en la caja.' },
        { value: 40, label: 'Me fijo en el descuento, pero prefiero no hacer cálculos.' },
        { value: 60, label: 'Hago un cálculo rápido para tener una idea de cuánto estoy ahorrando.' },
        { value: 80, label: 'Comparo precios y uso herramientas como la calculadora del celular para verificar.' },
        { value: 100, label: 'Disfruto calcular exactamente porcentajes, descuentos y cuánto puedo ahorrar.' }
      ]
    },
    {
      level: 2,
      q: 'Si en un trabajo grupal te piden organizar los gastos y controlar el presupuesto, ¿cómo actuarías?',
      options: [
        { value: 20, label: 'Preferiría no hacerlo porque trabajar con números no me resulta cómodo.' },
        { value: 40, label: 'Lo hago, pero necesitaría que alguien revise mis cálculos después.' },
        { value: 60, label: 'Organizo los gastos básicos y trato de mantener todo ordenado.' },
        { value: 80, label: 'Uso herramientas como hojas de cálculo para organizar mejor la información.' },
        { value: 100, label: 'Me gusta analizar los datos, hacer proyecciones y encontrar la mejor forma de administrar el dinero.' }
      ]
    },
    {
      level: 2,
      q: 'Cuando ves un gráfico estadístico en una noticia, ¿qué haces normalmente?',
      options: [
        { value: 20, label: 'No suelo prestar atención porque los gráficos me parecen complicados.' },
        { value: 40, label: 'Miro rápidamente la información, pero no intento analizarla mucho.' },
        { value: 60, label: 'Identifico si los datos suben o bajan y entiendo la idea general.' },
        { value: 80, label: 'Reviso porcentajes y detalles para comprender mejor lo que muestran los datos.' },
        { value: 100, label: 'Analizo las variables, comparo información y saco mis propias conclusiones.' }
      ]
    },
    {
      level: 3,
      q: 'Cuando tienes un problema de álgebra o geometría que parece difícil, ¿qué sueles hacer?',
      options: [
        { value: 20, label: 'Prefiero evitarlo porque me frustra enfrentar problemas abstractos.' },
        { value: 40, label: 'Busco una respuesta rápida o una guía para poder resolverlo.' },
        { value: 60, label: 'Intento aplicar los pasos aprendidos para encontrar la solución.' },
        { value: 80, label: 'Me esfuerzo por resolverlo por mi cuenta antes de pedir ayuda.' },
        { value: 100, label: 'Disfruto el reto y me motiva encontrar la solución aunque tome tiempo.' }
      ]
    },
    {
      level: 3,
      q: 'Si te invitan a un taller de programación donde usarás lógica y matemáticas, ¿cómo reaccionarías?',
      options: [
        { value: 20, label: 'No me interesaría porque siento que ese tipo de temas no son para mí.' },
        { value: 40, label: 'Iría por curiosidad, aunque probablemente me costaría bastante.' },
        { value: 60, label: 'Participaría para aprender algo nuevo y tener otra habilidad.' },
        { value: 80, label: 'Me esforzaría por entender cómo funcionan los procesos y la lógica.' },
        { value: 100, label: 'Me entusiasmaría porque disfruto resolver problemas y crear soluciones con lógica.' }
      ]
    },
    {
      level: 3,
      q: 'Después de intentar varias veces resolver una ecuación complicada, ¿qué sentirías al lograrlo?',
      options: [
        { value: 20, label: 'Principalmente sentiría alivio porque por fin terminó.' },
        { value: 40, label: 'Me alegraría haber terminado, aunque no lo disfrutaría mucho.' },
        { value: 60, label: 'Me sentiría satisfecho por haber cumplido con la tarea.' },
        { value: 80, label: 'Sentiría orgullo por haber superado una dificultad.' },
        { value: 100, label: 'Disfrutaría mucho la sensación de haber encontrado la solución después del esfuerzo.' }
      ]
    }
  ]
},
  {
  id: 'ebr_comunicacion',
  title: 'Comunicación',
  questions: [
    {
      level: 1,
      q: 'Cuando tienes que enviar un mensaje importante y explicar algo a un equipo, ¿cómo sueles hacerlo?',
      options: [
        { value: 20, label: 'Prefiero enviar algo corto sin preocuparme mucho por cómo se entiende.' },
        { value: 40, label: 'Escribo la información básica, aunque a veces no reviso mucho el mensaje.' },
        { value: 60, label: 'Intento explicar lo necesario para que los demás comprendan la idea principal.' },
        { value: 80, label: 'Reviso el mensaje para que sea claro, ordenado y fácil de entender.' },
        { value: 100, label: 'Cuido mucho las palabras, el tono y la forma de comunicar para lograr el objetivo.' }
      ]
    },
    {
      level: 2,
      q: 'Si tienes que presentar un tema importante frente a tu clase o equipo de trabajo, ¿cómo te preparas?',
      options: [
        { value: 20, label: 'Me pongo muy nervioso y preferiría evitar hablar frente a otros.' },
        { value: 40, label: 'Lo hago, pero con bastante nervios y tratando de terminar rápido.' },
        { value: 60, label: 'Preparo lo básico y sigo una guía para poder explicar el tema.' },
        { value: 80, label: 'Practico y busco explicar con mis propias palabras para conectar mejor.' },
        { value: 100, label: 'Me preparo bastante, manejo mi voz y busco transmitir el mensaje de forma convincente.' }
      ]
    },
    {
      level: 2,
      q: 'Cuando tienes que escribir un ensayo o una opinión sobre un libro, película o tema, ¿cómo lo haces?',
      options: [
        { value: 20, label: 'Me cuesta mucho escribir y prefiero evitar este tipo de tareas.' },
        { value: 40, label: 'Escribo algo sencillo basándome en información que encuentro.' },
        { value: 60, label: 'Hago un resumen con mi opinión general sobre el tema.' },
        { value: 80, label: 'Intento organizar mis ideas y expresar claramente lo que pienso.' },
        { value: 100, label: 'Disfruto analizar, argumentar y desarrollar ideas profundas por escrito.' }
      ]
    },
    {
      level: 3,
      q: 'Cuando participas en un debate sobre un tema importante, ¿cómo sueles actuar?',
      options: [
        { value: 20, label: 'Prefiero no participar porque me incomodan las discusiones.' },
        { value: 40, label: 'Escucho a los demás, pero me cuesta expresar mi opinión.' },
        { value: 60, label: 'Comparto mi punto de vista cuando siento que es necesario.' },
        { value: 80, label: 'Explico mis ideas y trato de defenderlas con buenos argumentos.' },
        { value: 100, label: 'Disfruto debatir, analizar diferentes puntos de vista y construir argumentos sólidos.' }
      ]
    },
    {
      level: 3,
      q: 'Si encuentras un libro extenso sobre un tema interesante, ¿qué harías?',
      options: [
        { value: 20, label: 'Probablemente no lo leería porque me cuesta mantener la atención con textos largos.' },
        { value: 40, label: 'Buscaría un resumen para conocer la idea principal.' },
        { value: 60, label: 'Lo leería poco a poco si necesito aprender sobre el tema.' },
        { value: 80, label: 'Lo leería porque disfruto aprender y descubrir nuevas ideas.' },
        { value: 100, label: 'Me interesaría analizarlo profundamente y comprender cómo está construido.' }
      ]
    },
    {
      level: 3,
      q: 'Si te ofrecen dirigir un periódico, proyecto de comunicación o grupo de expresión, ¿cómo reaccionarías?',
      options: [
        { value: 20, label: 'Preferiría no aceptar porque no me sentiría cómodo liderando algo así.' },
        { value: 40, label: 'Aceptaría solo si tengo bastante apoyo de otras personas.' },
        { value: 60, label: 'Lo asumiría si fuera necesario y cumpliría con lo básico.' },
        { value: 80, label: 'Lo vería como una oportunidad para mejorar mis habilidades comunicativas.' },
        { value: 100, label: 'Me entusiasmaría liderar un espacio donde pueda crear, comunicar y expresar ideas.' }
      ]
    }
  ]
},
  {
  id: 'ebr_ciencia_tecnologia',
  title: 'Ciencia y Tecnología',
  questions: [
    {
      level: 1,
      q: 'Cuando ves un documental sobre temas como el espacio, la genética o nuevos descubrimientos científicos, ¿qué haces normalmente?',
      options: [
        { value: 20, label: 'No suele llamarme la atención y prefiero ver otro tipo de contenido.' },
        { value: 40, label: 'Lo dejo de fondo, pero no siempre presto mucha atención.' },
        { value: 60, label: 'Lo veo por curiosidad y trato de entender la idea general.' },
        { value: 80, label: 'Me interesa aprender y trato de comprender los conceptos que explican.' },
        { value: 100, label: 'Me apasiona descubrir cómo funciona el mundo y quiero conocer más del tema.' }
      ]
    },
    {
      level: 2,
      q: 'Si participas en un experimento de laboratorio con reacciones químicas o tecnología, ¿cómo actuarías?',
      options: [
        { value: 20, label: 'Prefiero observar desde lejos porque no me interesa mucho participar.' },
        { value: 40, label: 'Ayudo siguiendo instrucciones, aunque sin involucrarme demasiado.' },
        { value: 60, label: 'Sigo los pasos indicados para completar correctamente la actividad.' },
        { value: 80, label: 'Participo activamente y me interesa entender por qué ocurre cada cosa.' },
        { value: 100, label: 'Me emociona investigar, experimentar y descubrir cómo funcionan los procesos.' }
      ]
    },
    {
      level: 2,
      q: 'Cuando lees una noticia sobre un nuevo avance médico, tecnológico o científico, ¿qué haces?',
      options: [
        { value: 20, label: 'Normalmente no le presto atención porque no es un tema que me interese.' },
        { value: 40, label: 'Leo solo el título para saber de qué trata.' },
        { value: 60, label: 'Leo la información principal para entender la idea general.' },
        { value: 80, label: 'Investigo más porque me interesa conocer cómo funciona ese avance.' },
        { value: 100, label: 'Busco diferentes fuentes para comprender a fondo la ciencia detrás del descubrimiento.' }
      ]
    },
    {
      level: 3,
      q: 'Si tienes la oportunidad de participar en una feria de ciencias, ¿cómo prepararías tu proyecto?',
      options: [
        { value: 20, label: 'Preferiría no participar porque no me siento cómodo con ese tipo de actividades.' },
        { value: 40, label: 'Haría algo sencillo para cumplir con la presentación.' },
        { value: 60, label: 'Prepararía un proyecto básico siguiendo las indicaciones necesarias.' },
        { value: 80, label: 'Investigo un tema que me interese y me preparo para explicarlo bien.' },
        { value: 100, label: 'Me entusiasma crear un proyecto original y aplicar el método científico.' }
      ]
    },
    {
      level: 3,
      q: 'Si un aparato electrónico deja de funcionar, ¿qué haces normalmente?',
      options: [
        { value: 20, label: 'Prefiero reemplazarlo o pedir ayuda sin intentar revisarlo.' },
        { value: 40, label: 'Intento revisar cosas simples, pero no profundizo mucho.' },
        { value: 60, label: 'Busco identificar problemas básicos antes de llevarlo a reparar.' },
        { value: 80, label: 'Investigo posibles soluciones y sigo tutoriales para intentar arreglarlo.' },
        { value: 100, label: 'Me interesa entender cómo funciona y descubrir qué está fallando.' }
      ]
    },
    {
      level: 3,
      q: 'Si imaginas tu futuro trabajando en un laboratorio investigando nuevos descubrimientos, ¿qué opinas?',
      options: [
        { value: 20, label: 'No sería algo que disfrutaría porque prefiero otro tipo de actividades.' },
        { value: 40, label: 'No me atrae mucho, aunque podría hacerlo si fuera necesario.' },
        { value: 60, label: 'Me parece interesante, pero no estoy seguro de dedicarme a eso.' },
        { value: 80, label: 'Me gustaría porque disfruto aprender y trabajar con conocimiento científico.' },
        { value: 100, label: 'Me entusiasma la idea de investigar y aportar nuevos descubrimientos.' }
      ]
    }
  ]
},
  {
  id: 'ebr_ciencias_sociales',
  title: 'Ciencias Sociales',
  questions: [
    {
      level: 1,
      q: 'Cuando alguien empieza a conversar sobre historia, culturas antiguas o acontecimientos del mundo, ¿cómo sueles reaccionar?',
      options: [
        { value: 20, label: 'No suele interesarme mucho y prefiero hablar de otros temas.' },
        { value: 40, label: 'Escucho un poco, pero normalmente pierdo el interés rápido.' },
        { value: 60, label: 'Presto atención y entiendo las ideas principales.' },
        { value: 80, label: 'Me interesa aprender y suelo hacer preguntas para conocer más.' },
        { value: 100, label: 'Disfruto profundizar en los hechos, contextos y razones detrás de los acontecimientos.' }
      ]
    },
    {
      level: 2,
      q: 'Cuando hay elecciones o se discuten temas políticos y económicos, ¿qué haces normalmente?',
      options: [
        { value: 20, label: 'Prefiero no involucrarme porque esos temas no llaman mi atención.' },
        { value: 40, label: 'Escucho comentarios de otras personas, pero no investigo mucho.' },
        { value: 60, label: 'Reviso información básica para tener una idea general del tema.' },
        { value: 80, label: 'Investigo diferentes opiniones para formar mi propio criterio.' },
        { value: 100, label: 'Analizo las propuestas, sus consecuencias y el impacto en la sociedad.' }
      ]
    },
    {
      level: 2,
      q: 'Cuando visitas un lugar con mucha historia o restos arqueológicos, ¿qué suele interesarte más?',
      options: [
        { value: 20, label: 'Prefiero hacer otras actividades y no suelo interesarme mucho por la historia del lugar.' },
        { value: 40, label: 'Lo observo por encima, pero sin profundizar demasiado.' },
        { value: 60, label: 'Escucho la explicación general para conocer un poco más.' },
        { value: 80, label: 'Leo información y hago preguntas para entender su historia.' },
        { value: 100, label: 'Me interesa conocer la cultura, organización y forma de vida de quienes estuvieron allí.' }
      ]
    },
    {
      level: 3,
      q: 'Si recibes un libro sobre sociología, antropología o temas sociales, ¿qué harías?',
      options: [
        { value: 20, label: 'Probablemente no lo leería porque no es un tema que me atraiga.' },
        { value: 40, label: 'Lo revisaría por encima, pero difícilmente lo terminaría.' },
        { value: 60, label: 'Leería algunas partes si encuentro algo interesante.' },
        { value: 80, label: 'Lo leería con calma para comprender mejor la sociedad y sus problemas.' },
        { value: 100, label: 'Disfrutaría analizar profundamente las ideas y relacionarlas con la realidad.' }
      ]
    },
    {
      level: 3,
      q: 'Cuando se debate sobre problemas sociales como desigualdad, pobreza o cambios culturales, ¿cómo participas?',
      options: [
        { value: 20, label: 'Prefiero no participar porque siento que son temas difíciles o incómodos.' },
        { value: 40, label: 'Doy una opinión general basada en lo que he escuchado.' },
        { value: 60, label: 'Comparto mi punto de vista desde mi experiencia personal.' },
        { value: 80, label: 'Intento analizar las causas y escuchar diferentes perspectivas.' },
        { value: 100, label: 'Me gusta investigar el tema y argumentar usando información histórica y social.' }
      ]
    },
    {
      level: 3,
      q: 'Si tuvieras la oportunidad de investigar cómo funcionan las sociedades y el comportamiento humano, ¿te interesaría?',
      options: [
        { value: 20, label: 'No sería una actividad que disfrutaría hacer durante mucho tiempo.' },
        { value: 40, label: 'Me parece interesante, pero preferiría otro tipo de trabajo.' },
        { value: 60, label: 'Podría hacerlo si fuera parte de mis estudios o trabajo.' },
        { value: 80, label: 'Me gustaría porque ayuda a comprender mejor a las personas y comunidades.' },
        { value: 100, label: 'Me apasionaría investigar y descubrir cómo evoluciona la sociedad.' }
      ]
    }
  ]
},
  {
  id: 'ebr_dpcc',
  title: 'Desarrollo Personal y Cívica',
  questions: [
    {
      level: 1,
      q: 'Si ves que una persona está siendo tratada injustamente o recibe un mal trato, ¿cómo reaccionarías?',
      options: [
        { value: 20, label: 'Preferiría no involucrarme porque no sabría cómo actuar.' },
        { value: 40, label: 'Me preocuparía, pero probablemente esperaría que alguien más intervenga.' },
        { value: 60, label: 'Intentaría buscar una forma segura de ayudar o avisar a alguien responsable.' },
        { value: 80, label: 'Buscaría apoyar a la persona y trataría de detener la situación de manera adecuada.' },
        { value: 100, label: 'Me comprometería activamente a defender a la persona y buscar una solución justa.' }
      ]
    },
    {
      level: 2,
      q: 'Si hay un conflicto entre dos grupos de personas en tu entorno, ¿qué harías?',
      options: [
        { value: 20, label: 'Preferiría mantenerme al margen y no involucrarme.' },
        { value: 40, label: 'Evitaría el problema para no generar más tensión.' },
        { value: 60, label: 'Intentaría mantener una buena relación con ambas partes.' },
        { value: 80, label: 'Buscaría conversar con las personas para ayudar a encontrar una solución.' },
        { value: 100, label: 'Intentaría mediar activamente para lograr un acuerdo y mejorar la situación.' }
      ]
    },
    {
      level: 2,
      q: 'Si te invitan a participar en un grupo que busca mejorar tu comunidad o defender una causa importante, ¿qué harías?',
      options: [
        { value: 20, label: 'Preferiría no participar porque no me gusta asumir ese tipo de responsabilidades.' },
        { value: 40, label: 'Participaría poco y solo si otras personas me acompañan.' },
        { value: 60, label: 'Ayudaría en algunas actividades cuando sea necesario.' },
        { value: 80, label: 'Participaría activamente aportando ideas y apoyando al grupo.' },
        { value: 100, label: 'Me comprometería mucho porque me motiva ayudar y generar cambios positivos.' }
      ]
    },
    {
      level: 3,
      q: 'Cuando escuchas un debate sobre derechos, leyes o temas sociales importantes, ¿cómo participas?',
      options: [
        { value: 20, label: 'Me cuesta mantener la atención porque esos temas no me interesan mucho.' },
        { value: 40, label: 'Escucho, pero prefiero no opinar porque no conozco suficiente del tema.' },
        { value: 60, label: 'Comparto mi opinión desde lo que considero justo o correcto.' },
        { value: 80, label: 'Analizo el tema y trato de expresar mis ideas con argumentos.' },
        { value: 100, label: 'Disfruto reflexionar, debatir y comprender los principios detrás de las normas y derechos.' }
      ]
    },
    {
      level: 3,
      q: 'Si alguien cercano te cuenta que está pasando por un momento emocional difícil, ¿cómo actuarías?',
      options: [
        { value: 20, label: 'No sabría cómo reaccionar y preferiría tomar distancia.' },
        { value: 40, label: 'Intentaría animarlo, aunque no siempre sabría qué decir.' },
        { value: 60, label: 'Lo escucharía y le recomendaría buscar apoyo si lo necesita.' },
        { value: 80, label: 'Le brindaría apoyo, compañía y trataría de ayudarlo con paciencia.' },
        { value: 100, label: 'Escucharía con mucha empatía y buscaría comprender realmente lo que siente.' }
      ]
    },
    {
      level: 3,
      q: 'Si imaginas tu futuro trabajando como abogado, psicólogo, juez o en una profesión relacionada con ayudar a otros, ¿qué opinas?',
      options: [
        { value: 20, label: 'No sería algo que me gustaría porque prefiero otro tipo de actividades.' },
        { value: 40, label: 'No estoy muy interesado, aunque reconozco que es importante.' },
        { value: 60, label: 'Podría considerarlo si encuentro un área que me motive.' },
        { value: 80, label: 'Me parece una profesión valiosa donde podría aportar a otras personas.' },
        { value: 100, label: 'Me entusiasma dedicarme a una carrera donde pueda orientar, ayudar y generar impacto.' }
      ]
    }
  ]
},
  {
  id: 'ebr_ingles',
  title: 'Inglés como Lengua Extranjera',
  questions: [
    {
      level: 1,
      q: 'Si encuentras un video interesante, pero está completamente en inglés, ¿qué haces normalmente?',
      options: [
        { value: 20, label: 'Prefiero buscar otro contenido porque no me siento cómodo con el idioma.' },
        { value: 40, label: 'Lo veo, pero me cuesta seguirlo porque no entiendo mucho.' },
        { value: 60, label: 'Uso subtítulos en español para comprender la información.' },
        { value: 80, label: 'Intento usar subtítulos en inglés para aprender nuevas palabras y expresiones.' },
        { value: 100, label: 'Lo escucho directamente y trato de comprender el mensaje en el idioma original.' }
      ]
    },
    {
      level: 2,
      q: 'Si necesitas usar un programa, aplicación o juego que solo está disponible en inglés, ¿cómo actuarías?',
      options: [
        { value: 20, label: 'Preferiría no usarlo porque el idioma sería una dificultad importante para mí.' },
        { value: 40, label: 'Intentaría usarlo, aunque tendría que pedir ayuda para entender algunas partes.' },
        { value: 60, label: 'Aprendería las palabras básicas necesarias para poder manejarlo.' },
        { value: 80, label: 'Buscaría información y aprovecharía la oportunidad para mejorar mi inglés.' },
        { value: 100, label: 'Lo usaría en inglés sin problema y lo tomaría como una forma de seguir aprendiendo.' }
      ]
    },
    {
      level: 2,
      q: 'Si un turista extranjero te pide ayuda y te habla en inglés, ¿cómo responderías?',
      options: [
        { value: 20, label: 'Me pondría nervioso y probablemente no sabría cómo responder.' },
        { value: 40, label: 'Intentaría ayudar con algunas palabras básicas o gestos.' },
        { value: 60, label: 'Usaría frases sencillas para poder comunicar la idea principal.' },
        { value: 80, label: 'Intentaría mantener una conversación y explicar con claridad.' },
        { value: 100, label: 'Respondería con confianza, buena pronunciación y naturalidad.' }
      ]
    },
    {
      level: 3,
      q: 'Si tienes que leer un manual o documento importante que solo está en inglés, ¿qué harías?',
      options: [
        { value: 20, label: 'Me costaría mucho y buscaría evitar leerlo directamente.' },
        { value: 40, label: 'Usaría un traductor para entender la mayor parte del contenido.' },
        { value: 60, label: 'Lo leería con apoyo de herramientas para comprender mejor.' },
        { value: 80, label: 'Lo leería en inglés ayudándome con un diccionario cuando sea necesario.' },
        { value: 100, label: 'Lo comprendería directamente y analizaría el contenido en profundidad.' }
      ]
    },
    {
      level: 3,
      q: 'Si te ofrecen un curso avanzado de inglés para mejorar tu pronunciación y gramática, ¿qué harías?',
      options: [
        { value: 20, label: 'No lo tomaría porque aprender inglés no es una prioridad para mí.' },
        { value: 40, label: 'Lo consideraría, aunque probablemente me costaría mantener la motivación.' },
        { value: 60, label: 'Lo tomaría para mejorar mis conocimientos básicos.' },
        { value: 80, label: 'Me esforzaría bastante para mejorar mis habilidades en el idioma.' },
        { value: 100, label: 'Me entusiasmaría dominar el idioma y comunicarme con mayor fluidez.' }
      ]
    },
    {
      level: 3,
      q: 'Si te ofrecen un trabajo donde toda la comunicación es en inglés, ¿cómo reaccionarías?',
      options: [
        { value: 20, label: 'Preferiría no aceptarlo porque no me sentiría preparado.' },
        { value: 40, label: 'Lo aceptaría solo si tuviera bastante apoyo al inicio.' },
        { value: 60, label: 'Aceptaría el reto y usaría herramientas para adaptarme.' },
        { value: 80, label: 'Me esforzaría por mejorar rápidamente y desenvolverme mejor.' },
        { value: 100, label: 'Me gustaría la oportunidad de trabajar y crecer usando el idioma constantemente.' }
      ]
    }
  ]
},
  {
  id: 'ebr_ept',
  title: 'Educación para el Trabajo',
  questions: [
    {
      level: 1,
      q: 'Si tienes una idea para crear un pequeño negocio o proyecto, ¿qué harías primero?',
      options: [
        { value: 20, label: 'Probablemente no intentaría desarrollarla porque no sabría por dónde empezar.' },
        { value: 40, label: 'La comentaría con otras personas, pero no avanzaría mucho con la idea.' },
        { value: 60, label: 'Intentaría organizar algunas ideas básicas para ponerla en práctica.' },
        { value: 80, label: 'Investigo, planifico y busco la manera de convertir la idea en un proyecto real.' },
        { value: 100, label: 'Me entusiasma crear soluciones, organizar un plan y buscar oportunidades para hacerlo crecer.' }
      ]
    },
    {
      level: 2,
      q: 'Cuando tienes que trabajar en equipo para lograr un objetivo, ¿qué papel sueles asumir?',
      options: [
        { value: 20, label: 'Prefiero que otras personas organicen el trabajo y yo seguir indicaciones.' },
        { value: 40, label: 'Participo cuando me asignan una tarea específica.' },
        { value: 60, label: 'Cumplo con mi responsabilidad y apoyo al equipo cuando es necesario.' },
        { value: 80, label: 'Propongo ideas y ayudo a organizar el trabajo para lograr mejores resultados.' },
        { value: 100, label: 'Me gusta liderar, motivar al equipo y buscar nuevas formas de mejorar.' }
      ]
    },
    {
      level: 2,
      q: 'Si tienes que aprender una nueva herramienta digital para un trabajo o proyecto, ¿cómo actuarías?',
      options: [
        { value: 20, label: 'Me frustraría fácilmente y preferiría que otra persona lo haga.' },
        { value: 40, label: 'Intentaría aprender lo básico con ayuda de alguien más.' },
        { value: 60, label: 'Buscaría aprender lo necesario para poder utilizarla.' },
        { value: 80, label: 'Exploraría la herramienta y practicaría hasta manejarla mejor.' },
        { value: 100, label: 'Me motivaría aprenderla porque disfruto descubrir nuevas tecnologías y formas de trabajar.' }
      ]
    },
    {
      level: 3,
      q: 'Si un proyecto en el que trabajas no obtiene los resultados esperados, ¿qué harías?',
      options: [
        { value: 20, label: 'Me desanimaría y preferiría dejarlo de lado.' },
        { value: 40, label: 'Buscaría ayuda para saber qué salió mal.' },
        { value: 60, label: 'Revisaría los errores e intentaría mejorar algunos aspectos.' },
        { value: 80, label: 'Analizaría la situación y propondría cambios para mejorar el proyecto.' },
        { value: 100, label: 'Vería el problema como una oportunidad para aprender, innovar y encontrar nuevas soluciones.' }
      ]
    },
    {
      level: 3,
      q: 'Cuando tienes que organizar tu tiempo entre estudios, responsabilidades y actividades personales, ¿cómo lo haces?',
      options: [
        { value: 20, label: 'Me cuesta organizarme y suelo dejar las cosas para después.' },
        { value: 40, label: 'Intento cumplir, aunque a veces pierdo el orden de mis actividades.' },
        { value: 60, label: 'Organizo mis tareas según lo que considero más importante.' },
        { value: 80, label: 'Planifico mis actividades para aprovechar mejor mi tiempo.' },
        { value: 100, label: 'Me gusta establecer metas, organizar procesos y buscar formas de ser más eficiente.' }
      ]
    },
    {
      level: 3,
      q: 'Si tuvieras la oportunidad de crear un producto o servicio para solucionar una necesidad, ¿cómo lo tomarías?',
      options: [
        { value: 20, label: 'No sería algo que me interesaría porque prefiero actividades más conocidas.' },
        { value: 40, label: 'Me parecería interesante, aunque no sabría cómo desarrollarlo.' },
        { value: 60, label: 'Intentaría crear una idea sencilla que pueda funcionar.' },
        { value: 80, label: 'Investigarías las necesidades de las personas y buscaría una buena solución.' },
        { value: 100, label: 'Me entusiasmaría crear algo nuevo, innovador y con impacto para otros.' }
      ]
    }
  ]
},
  {
  id: 'ebr_arte_cultura',
  title: 'Arte y Cultura',
  questions: [
    {
      level: 1,
      q: 'Cuando escuchas música, ves una obra de arte o una presentación cultural, ¿qué suele llamar más tu atención?',
      options: [
        { value: 20, label: 'No suelo prestar mucha atención porque no es un tema que me interese demasiado.' },
        { value: 40, label: 'Lo disfruto, pero no suelo analizar mucho lo que representa.' },
        { value: 60, label: 'Me gusta observar y conocer la idea principal detrás de la obra.' },
        { value: 80, label: 'Me interesa descubrir el significado, la técnica y la historia detrás de la creación.' },
        { value: 100, label: 'Me apasiona analizar y comprender cómo el arte expresa ideas, emociones y culturas.' }
      ]
    },
    {
      level: 2,
      q: 'Si te piden crear un dibujo, diseño, video o presentación creativa, ¿cómo lo tomarías?',
      options: [
        { value: 20, label: 'Me incomodaría porque no siento mucha confianza en mis habilidades creativas.' },
        { value: 40, label: 'Lo haría siguiendo ejemplos o instrucciones para cumplir con la tarea.' },
        { value: 60, label: 'Intentaría crear algo sencillo usando mis propias ideas.' },
        { value: 80, label: 'Disfrutaría el proceso de crear y buscaría una forma original de expresarme.' },
        { value: 100, label: 'Me entusiasmaría experimentar, innovar y transformar ideas en una creación artística.' }
      ]
    },
    {
      level: 2,
      q: 'Cuando conoces una tradición, costumbre o manifestación cultural de otro lugar, ¿qué haces?',
      options: [
        { value: 20, label: 'Normalmente no me interesa mucho conocer sobre otras culturas.' },
        { value: 40, label: 'La observo por curiosidad, pero sin investigar más.' },
        { value: 60, label: 'Aprendo algunos aspectos básicos para entenderla mejor.' },
        { value: 80, label: 'Investigo su historia, significado y la importancia que tiene para las personas.' },
        { value: 100, label: 'Me interesa profundamente comprender cómo las culturas reflejan la identidad de una sociedad.' }
      ]
    },
    {
      level: 3,
      q: 'Si tuvieras la oportunidad de participar en una obra de teatro, exposición o proyecto artístico, ¿cómo reaccionarías?',
      options: [
        { value: 20, label: 'Preferiría no participar porque no me sentiría cómodo en ese ambiente.' },
        { value: 40, label: 'Participaría solo si fuera necesario o si alguien me acompaña.' },
        { value: 60, label: 'Aceptaría para aprender y vivir una nueva experiencia.' },
        { value: 80, label: 'Me gustaría participar y aportar mis ideas al proyecto.' },
        { value: 100, label: 'Me emocionaría formar parte de una creación donde pueda expresarme y conectar con otros.' }
      ]
    },
    {
      level: 3,
      q: 'Cuando tienes una idea nueva para una historia, canción, diseño o creación, ¿qué haces normalmente?',
      options: [
        { value: 20, label: 'La dejo pasar porque no suelo desarrollar ese tipo de ideas.' },
        { value: 40, label: 'La pienso un momento, pero pocas veces la llevo a cabo.' },
        { value: 60, label: 'Intento desarrollarla de alguna manera sencilla.' },
        { value: 80, label: 'Busco darle forma y convertirla en un proyecto creativo.' },
        { value: 100, label: 'Me motiva crear, experimentar y convertir mis ideas en algo nuevo.' }
      ]
    },
    {
      level: 3,
      q: 'Si pudieras trabajar en una carrera relacionada con diseño, música, comunicación visual o arte, ¿qué pensarías?',
      options: [
        { value: 20, label: 'No sería una opción que elegiría porque prefiero otros campos.' },
        { value: 40, label: 'Me parece interesante, aunque no estoy seguro de dedicarme a eso.' },
        { value: 60, label: 'Podría considerarlo si encuentro un área artística que me motive.' },
        { value: 80, label: 'Me gustaría porque podría crear, comunicar ideas y desarrollar mi talento.' },
        { value: 100, label: 'Me entusiasma una carrera donde pueda innovar y expresar mi creatividad.' }
      ]
    }
  ]
},
// Educación Física y Deportes
  {
    id: 'ebr_educacion_fisica',
    title: 'Educación Física y Deportes',
    questions: [
      {
        level: 1,
        q: 'Es tu único día de descanso y te proponen salir a correr, nadar o jugar un partido intenso, ¿cómo haces?',
        options: [
          { value: 20, label: 'Prefiero quedarme descansando en casa y evitar cualquier actividad física pesada.' },
          { value: 40, label: 'Iría por compromiso social, pero preferiría hacer algo menos cansado.' },
          { value: 60, label: 'Aceptaría para pasar el rato y recrearme, sin tomármelo con mucha exigencia.' },
          { value: 80, label: 'Me parece una excelente idea para mantenerme activo y disfrutar del ejercicio.' },
          { value: 100, label: 'Me entusiasma mucho la propuesta y disfruto el reto físico de dar mi máximo rendimiento.' }
        ]
      },
      {
        level: 2,
        q: 'Estás compitiendo en un torneo deportivo escolar o local representando a tu equipo, ¿qué actitud sueles tomar?',
        options: [
          { value: 20, label: 'Prefiero tener un rol muy pasivo o secundario para no cometer errores importantes.' },
          { value: 40, label: 'Juego para cumplir, pero no me involucro emocionalmente en el resultado del partido.' },
          { value: 60, label: 'Participo de forma tranquila, buscando divertirme y pasar un buen rato con mis compañeros.' },
          { value: 80, label: 'Me esfuerzo bastante, sigo la estrategia del equipo y busco activamente ganar el encuentro.' },
          { value: 100, label: 'Me concentro al máximo, pongo toda mi energía en cada jugada y lidero al equipo hacia la victoria.' }
        ]
      },
      {
        level: 2,
        q: 'Lees un artículo sobre cómo el ejercicio y la nutrición modifican y mejoran el funcionamiento muscular, ¿qué decides hacer?',
        options: [
          { value: 20, label: 'No le presto atención, prefiero no preocuparme por dietas ni rutinas de entrenamiento.' },
          { value: 40, label: 'Lo leo por encima, pero no me interesa aplicar este tipo de pautas en mi día a día.' },
          { value: 60, label: 'Me parece informativo, aunque solo aplicaría algún consejo sencillo si me resulta muy fácil.' },
          { value: 80, label: 'Encuentro los datos útiles y trato de ajustar mis hábitos de alimentación y ejercicio para estar saludable.' },
          { value: 100, label: 'Me interesa a fondo el tema, investigo el fundamento científico y ajusto detalladamente mi rutina y nutrición.' }
        ]
      },
      {
        level: 3,
        q: 'Te proponen estudiar a fondo la anatomía humana, la biomecánica de los movimientos y la recuperación física, ¿qué opinas al respecto?',
        options: [
          { value: 20, label: 'Prefiero evitarlo, me resulta tedioso estudiar temas relacionados con la biología o el cuerpo.' },
          { value: 40, label: 'Lo estudiaría solo por cumplir con un requisito académico obligatorio.' },
          { value: 60, label: 'Me parece un tema interesante para conocer lo básico sobre cómo funciona el cuerpo.' },
          { value: 80, label: 'Me gustaría aprender sobre ello para mejorar mi rendimiento deportivo y evitar posibles lesiones.' },
          { value: 100, label: 'Me entusiasma profundizar en el análisis científico del movimiento y el cuidado del cuerpo humano.' }
        ]
      },
      {
        level: 3,
        q: '¿Cómo reaccionarías si tuvieras que seguir un plan de entrenamiento físico altamente exigente y estructurado?',
        options: [
          { value: 20, label: 'Lo abandonaría rápidamente, no me atrae seguir rutinas con ese nivel de esfuerzo y disciplina física.' },
          { value: 40, label: 'Intentaría hacerlo, pero probablemente me costaría mucho ser constante y lo dejaría a los pocos días.' },
          { value: 60, label: 'Cumpliría con las sesiones básicas sin exigirme más allá de lo que me resulte cómodo.' },
          { value: 80, label: 'Me comprometería a seguir la rutina con constancia para superarme físicamente.' },
          { value: 100, label: 'Asumiría el reto con total disciplina y motivación para alcanzar el mejor estado físico posible.' }
        ]
      },
      {
        level: 3,
        q: 'Si imaginas tu futuro profesional dedicado a la preparación física, el entrenamiento deportivo o la kinesiología/fisioterapia, ¿qué opinas?',
        options: [
          { value: 20, label: 'No me interesa en absoluto, prefiero desarrollarme en áreas alejadas de la actividad física.' },
          { value: 40, label: 'Me parece un sector respetable, pero no me veo trabajando en él a largo plazo.' },
          { value: 60, label: 'Podría considerarlo si está relacionado con la salud de forma general o como una actividad complementaria.' },
          { value: 80, label: 'Lo veo como una carrera atractiva y saludable donde podría guiar a otros a mejorar su bienestar físico.' },
          { value: 100, label: 'Me apasiona la idea de dedicar mi vida al deporte, la rehabilitación y el entrenamiento de alto nivel.' }
        ]
      }
    ]
  },
  {
    id: 'ebr_religion',
    title: 'Ética, Valores y Espiritualidad',
    questions: [
      {
        level: 1,
        q: 'Alguien empieza a hablar profundamente sobre el sentido espiritual de la vida, el bien y el mal, ¿cómo reaccionas?',
        options: [
          { value: 20, label: 'Prefiero cambiar de tema, ya que no suelo interesarme en debates existenciales o morales.' },
          { value: 40, label: 'Escucho pero sin comprometerme, pues no es una conversación que capte mi atención.' },
          { value: 60, label: 'Escucho con respeto, aunque estas reflexiones no influyen demasiado en mi forma de pensar.' },
          { value: 80, label: 'Escucho atentamente y comparto mis propios puntos de vista sobre los valores humanos.' },
          { value: 100, label: 'Participo activamente y me entusiasma profundizar en el sentido ético y espiritual de nuestras acciones.' }
        ]
      },
      {
        level: 2,
        q: 'Tu comunidad organiza una jornada de voluntariado para apoyar a familias en situación de vulnerabilidad, ¿cómo decides participar?',
        options: [
          { value: 20, label: 'Prefiero no asistir ni participar, ya que priorizo mi tiempo libre en otras actividades personales.' },
          { value: 40, label: 'Apoyo la iniciativa, pero prefiero no involucrarme directamente en el trabajo físico.' },
          { value: 60, label: 'Colaboraría de forma breve o con un aporte sencillo si la mayoría de mis conocidos asiste.' },
          { value: 80, label: 'Asisto con buena disposición para colaborar en lo que sea necesario y ayudar a la comunidad.' },
          { value: 100, label: 'Participo de manera comprometida durante toda la jornada, organizando y apoyando directamente a los beneficiarios.' }
        ]
      },
      {
        level: 2,
        q: 'Ocurre un desastre natural importante y en tu entorno se debate sobre las razones de la adversidad y la resiliencia humana, ¿qué opinas al respecto?',
        options: [
          { value: 20, label: 'Trato de evitar la conversación, ya que prefiero no enfocarme en situaciones tristes o complejas.' },
          { value: 40, label: 'Expreso una opinión rápida sobre las consecuencias visibles sin entrar a analizar el fondo.' },
          { value: 60, label: 'Opino de manera general sobre lo difícil de la situación y sigo atento a las noticias.' },
          { value: 80, label: 'Reflexiono sobre la importancia de la solidaridad y el apoyo mutuo frente a la adversidad.' },
          { value: 100, label: 'Analizo profundamente el impacto humano, las lecciones éticas y la capacidad de superación de la sociedad.' }
        ]
      },
      {
        level: 3,
        q: 'Te prestan un libro sobre filosofía ética, teología comparada o historia de las religiones, ¿qué decides hacer?',
        options: [
          { value: 20, label: 'Lo devolvería pronto, pues los temas filosóficos o religiosos no son de mi interés.' },
          { value: 40, label: 'Lo conservaría por cortesía, pero es poco probable que dedique tiempo a leerlo.' },
          { value: 60, label: 'Leería alguna sección corta que me llame la atención por curiosidad general.' },
          { value: 80, label: 'Lo leería con interés para comprender mejor los sistemas de valores de diferentes culturas.' },
          { value: 100, label: 'Lo estudiaría con entusiasmo para analizar a fondo los dilemas éticos y las corrientes espirituales.' }
        ]
      },
      {
        level: 3,
        q: 'Si tuvieras la oportunidad de trabajar en una organización sin fines de lucro (ONG) con fines sociales, aunque el salario sea modesto, ¿qué harías?',
        options: [
          { value: 20, label: 'No la aceptaría, para mí es fundamental priorizar una estabilidad económica y crecimiento material.' },
          { value: 40, label: 'Sería difícil que acepte, a menos que no tuviera otra opción de empleo en ese momento.' },
          { value: 60, label: 'Lo consideraría como una experiencia temporal de aprendizaje, pero buscando luego mejores ingresos.' },
          { value: 80, label: 'Aceptaría la oportunidad si el propósito de la organización se alinea con mis valores personales.' },
          { value: 100, label: 'Aceptaría con total convencimiento, ya que para mí el impacto social y el servicio ético son la mayor retribución.' }
        ]
      },
      {
        level: 3,
        q: 'Si en el futuro te ves trabajando en la resolución de dilemas éticos, orientación comunitaria o liderazgo en causas sociales, ¿qué opinas?',
        options: [
          { value: 20, label: 'No me interesa en absoluto, prefiero roles con funciones de carácter más técnico u operativo.' },
          { value: 40, label: 'No es mi primera opción, considero que liderar el bienestar de otros requiere un perfil que no tengo.' },
          { value: 60, label: 'Podría colaborar de vez en cuando, pero no como mi ocupación principal.' },
          { value: 80, label: 'Me parecería una labor sumamente noble y gratificante a la que me adaptaría con responsabilidad.' },
          { value: 100, label: 'Me motivaría plenamente guiar y acompañar a otros desde una perspectiva ética y comunitaria.' }
        ]
      }
    ]
  },
  {
    id: 'transversal_tic',
    title: 'Tecnología de la Información (TIC)',
    questions: [
      {
        level: 1,
        q: 'En tu entorno de estudio o trabajo te solicitan implementar una nueva plataforma digital compleja, ¿cómo actúas?',
        options: [
          { value: 20, label: 'Prefiero seguir utilizando métodos tradicionales de registro impreso o manuales sencillos.' },
          { value: 40, label: 'Solicito ayuda a un compañero para que realice la instalación inicial y me enseñe a usar lo básico.' },
          { value: 60, label: 'Aprendo a utilizar únicamente las funciones necesarias para cumplir con mis deberes.' },
          { value: 80, label: 'Investigo de manera independiente la guía de usuario y aprendo a operarla con facilidad.' },
          { value: 100, label: 'Exploro a fondo todas las opciones avanzadas, configuraciones y atajos del sistema para optimizar su uso.' }
        ]
      },
      {
        level: 2,
        q: 'Tu computadora o dispositivo muestra un error en la pantalla y no inicia el sistema operativo correctamente, ¿qué haces normalmente?',
        options: [
          { value: 20, label: 'Prefiero solicitar apoyo inmediato a soporte técnico sin intentar interactuar con el error.' },
          { value: 40, label: 'Apago y enciendo el equipo con la esperanza de que vuelva a la normalidad de forma automática.' },
          { value: 60, label: 'Reviso que las conexiones estén bien e intento algunas soluciones simples que conozco.' },
          { value: 80, label: 'Busco el mensaje de error en internet y sigo paso a paso la solución recomendada para corregirlo.' },
          { value: 100, label: 'Analizo el código de error y ejecuto la solución técnica adecuada modificando archivos del sistema o BIOS.' }
        ]
      },
      {
        level: 2,
        q: 'Te piden que configures los parámetros de seguridad de una red de internet y el router de tu hogar u oficina, ¿cómo reaccionas?',
        options: [
          { value: 20, label: 'Prefiero no hacerlo, ya que desconozco el funcionamiento básico de redes y conectividad.' },
          { value: 40, label: 'Sigo las instrucciones impresas básicas y configuro solo el nombre de red y la clave estándar.' },
          { value: 60, label: 'Logro acceder a los ajustes principales de administración y verifico la configuración inicial.' },
          { value: 80, label: 'Configuro la red y modifico los ajustes de seguridad y privacidad para proteger los accesos.' },
          { value: 100, label: 'Entro al panel de administración avanzado para optimizar los canales, DNS, IP estáticas y protocolos de encriptación.' }
        ]
      },
      {
        level: 3,
        q: 'Te ofrecen la oportunidad de participar en un curso de programación en lenguajes como Python, Java o C++, ¿qué decides hacer?',
        options: [
          { value: 20, label: 'No me interesa aprender programación, considero que es un área lejana a mi perfil y preferencias.' },
          { value: 40, label: 'Asistiría si fuera un requisito, pero considero que me costaría comprender la lógica del código.' },
          { value: 60, label: 'Participaría para adquirir nociones básicas del funcionamiento del software.' },
          { value: 80, label: 'Estudiaría con entusiasmo porque reconozco el valor y la utilidad práctica del desarrollo de software.' },
          { value: 100, label: 'Aceptaría emocionado porque disfruto de la lógica de programación y el diseño de algoritmos complejos.' }
        ]
      },
      {
        level: 3,
        q: 'Te asignan la tarea de diseñar la estructura técnica y de almacenamiento de una base de datos importante, ¿cómo actuarías?',
        options: [
          { value: 20, label: 'Solicitaría que reasignen la tarea, ya que no me siento cómodo manejando estructuras de datos complejas.' },
          { value: 40, label: 'Intentaría estructurarla de forma muy sencilla con las herramientas de oficina más familiares.' },
          { value: 60, label: 'Desarrollaría un modelo básico aplicando las normas de almacenamiento indispensables.' },
          { value: 80, label: 'Analizaría los requerimientos técnicos del proyecto para diseñar un sistema seguro y organizado.' },
          { value: 100, label: 'Diseñaría una arquitectura optimizada para grandes volúmenes de información, garantizando eficiencia y escalabilidad.' }
        ]
      },
      {
        level: 3,
        q: 'Si en el futuro te ves trabajando de forma constante frente a computadoras escribiendo código y desarrollando sistemas, ¿qué opinas?',
        options: [
          { value: 20, label: 'Preferiría un trabajo con mayor interacción social directa o que involucre actividades de campo.' },
          { value: 40, label: 'Considero que la jornada sedentaria y la concentración prolongada frente a la pantalla me desgastarían mucho.' },
          { value: 60, label: 'Podría desempeñarlo si el proyecto es interesante, aunque buscaría intercalarlo con otras actividades.' },
          { value: 80, label: 'Me parece una profesión dinámica y con excelente proyección laboral a la cual me adaptaría con facilidad.' },
          { value: 100, label: 'Sería ideal para mí, disfruto del desarrollo continuo de soluciones de software y la resolución técnica de problemas.' }
        ]
      }
    ]
  },
  {
    id: 'transversal_autonomia',
    title: 'Aprendizaje Autónomo',
    questions: [
      {
        level: 1,
        q: 'Un docente o expositor menciona un concepto técnico relevante pero no profundiza en su explicación, ¿qué decides hacer?',
        options: [
          { value: 20, label: 'No presto atención al término, asumiendo que si no se explicó no es de gran importancia.' },
          { value: 40, label: 'Lo escucho, pero prefiero no tomar notas ni buscar información adicional sobre él.' },
          { value: 60, label: 'Espero a que el tema se retome en la siguiente sesión para comprenderlo mejor.' },
          { value: 80, label: 'Anoto la palabra clave para buscar una definición simple en internet al finalizar la clase.' },
          { value: 100, label: 'Busco de inmediato la definición y ejemplos en internet para entender el concepto en el momento.' }
        ]
      },
      {
        level: 2,
        q: 'Debes estudiar un tema muy complejo por tu cuenta y no tienes la opción de recurrir a asesoría externa, ¿cómo reaccionas?',
        options: [
          { value: 20, label: 'Prefiero no avanzar y esperar a que la evaluación pase de largo o a que cambien la tarea.' },
          { value: 40, label: 'Intento leer la primera página de un manual básico esperando que la evaluación no sea muy difícil.' },
          { value: 60, label: 'Repaso mis notas generales un día antes de la entrega o examen para recordar lo elemental.' },
          { value: 80, label: 'Busco explicaciones, videos introductorios y guías en internet para comprender los fundamentos del tema.' },
          { value: 100, label: 'Consulto múltiples libros y artículos de referencia para resolver todas mis dudas de manera profunda.' }
        ]
      },
      {
        level: 2,
        q: 'Descubres una plataforma internacional que ofrece cursos virtuales gratuitos y especializados, ¿qué decides hacer?',
        options: [
          { value: 20, label: 'Prefiero no inscribirme, ya que no tengo interés en estudiar fuera del horario obligatorio.' },
          { value: 40, label: 'Reviso la lista de cursos disponibles pero considero que estudiar en mi tiempo libre requiere demasiado esfuerzo.' },
          { value: 60, label: 'Me inscribo en un curso motivado por el tema, aunque me resulta difícil mantener el ritmo para finalizarlo.' },
          { value: 80, label: 'Selecciono un curso alineado con mis estudios actuales y me organizo para avanzar periódicamente.' },
          { value: 100, label: 'Me entusiasma cursar programas de estudio avanzados para expandir mis conocimientos de manera continua.' }
        ]
      },
      {
        level: 3,
        q: 'Necesitas extraer información detallada de un informe científico o manual extenso de muchas páginas, ¿cómo actúas?',
        options: [
          { value: 20, label: 'Prefiero no leerlo e intentar conseguir una síntesis muy breve elaborada por otra persona.' },
          { value: 40, label: 'Utilizo una herramienta automática para generar un resumen breve y leo solo ese texto.' },
          { value: 60, label: 'Leo únicamente las partes introductorias y los resultados finales para ahorrar tiempo.' },
          { value: 80, label: 'Dedico tiempo a leer el documento completo de forma paulatina, anotando las ideas más importantes.' },
          { value: 100, label: 'Realizo un análisis exhaustivo y metódico del texto, evaluando la metodología de estudio y sus conclusiones.' }
        ]
      },
      {
        level: 3,
        q: 'En tu ámbito laboral o académico te otorgan libertad para definir y desarrollar un tema de investigación propio, ¿cómo procedes?',
        options: [
          { value: 20, label: 'Me cuesta definir un tema sin directrices específicas y prefiero realizar el mínimo esfuerzo.' },
          { value: 40, label: 'Elijo el tema más sencillo posible solo para cumplir con la presentación reglamentaria.' },
          { value: 60, label: 'Defino una propuesta estándar basada en plantillas previas para asegurar la aprobación.' },
          { value: 80, label: 'Planifico mi cronograma de trabajo e investigo un tema relevante y de utilidad práctica para el área.' },
          { value: 100, label: 'Aprovecho la oportunidad para investigar rigurosamente un tema complejo que me apasiona a nivel profesional.' }
        ]
      },
      {
        level: 3,
        q: 'Si imaginas tu futuro profesional dedicado a la investigación académica continua o la escritura científica, ¿qué opinas?',
        options: [
          { value: 20, label: 'Prefiero evitarlo, ya que me parece una labor solitaria y alejada del dinamismo práctico.' },
          { value: 40, label: 'No me resulta muy atractivo, preferiría un rol operativo clásico con instrucciones predefinidas.' },
          { value: 60, label: 'Podría redactar reportes de forma ocasional, pero no enfocaría mi carrera exclusivamente en la investigación.' },
          { value: 80, label: 'Considero que la generación de conocimiento científico es fundamental y me gustaría formar parte de proyectos académicos.' },
          { value: 100, label: 'Me apasiona la idea de ser un investigador especializado y contribuir activamente al avance científico de mi disciplina.' }
        ]
      }
    ]
  },
  {
    id: 'transversal_resolucion_problemas',
    title: 'Resolución de Problemas Complejos',
    questions: [
      {
        level: 1,
        q: 'Te regalan un rompecabezas tridimensional complejo de muchas piezas o un cubo Rubik totalmente desordenado, ¿qué haces normalmente?',
        options: [
          { value: 20, label: 'Prefiero no intentar armarlo, ya que los acertijos mecánicos me cansan rápidamente.' },
          { value: 40, label: 'Intento mover algunas partes de forma intuitiva, pero lo dejo si no avanzo pronto.' },
          { value: 60, label: 'Lo juego por un momento corto y busco guías sencillas para comprender la solución básica.' },
          { value: 80, label: 'Dedico ratos libres para intentar descifrar el patrón y avanzar en el armado de forma lógica.' },
          { value: 100, label: 'Me concentro en comprender el mecanismo y disfruto de descifrar las reglas por mi propia cuenta.' }
        ]
      },
      {
        level: 2,
        q: 'Un proyecto importante en el que has trabajado colapsa de forma imprevista pocas horas antes de la entrega, ¿cómo reaccionas?',
        options: [
          { value: 20, label: 'Siento un gran estrés y prefiero alejarme de la situación para calmarme antes de actuar.' },
          { value: 40, label: 'Espero a que las directrices de mis superiores o compañeros me indiquen qué pasos seguir.' },
          { value: 60, label: 'Trato de unir las partes dañadas rápidamente de manera superficial para salvar la entrega.' },
          { value: 80, label: 'Mantengo la tranquilidad, analizo los daños y coordino con el equipo para reconstruir lo necesario.' },
          { value: 100, label: 'Evalúo la falla de origen, implemento un ajuste y reestructuro el diseño para entregarlo en óptimas condiciones.' }
        ]
      },
      {
        level: 2,
        q: 'Un electrodoméstico o dispositivo del hogar presenta una falla técnica inesperada, ¿cómo procedes?',
        options: [
          { value: 20, label: 'Decido reemplazar el equipo o contratar ayuda externa sin intentar verificar el problema.' },
          { value: 40, label: 'Intento reiniciar el dispositivo o darle ligeros toques para ver si vuelve a funcionar por sí solo.' },
          { value: 60, label: 'Solicito apoyo técnico, pero antes trato de inspeccionar que los cables estén conectados correctamente.' },
          { value: 80, label: 'Busco guías de soporte en internet para verificar si es una falla simple que pueda reparar yo mismo.' },
          { value: 100, label: 'Consigo herramientas para abrir el equipo, diagnosticar la falla física y realizar el reemplazo de la pieza afectada.' }
        ]
      },
      {
        level: 3,
        q: 'Te contratan para resolver problemas de baja productividad o cuellos de botella en una línea de producción importante, ¿cómo actuarías?',
        options: [
          { value: 20, label: 'Rechazaría el rol, pues no me agrada asumir la presión de solucionar problemas organizacionales graves.' },
          { value: 40, label: 'Tomo la posición y espero las opiniones de los operarios para proponer soluciones generales de orden.' },
          { value: 60, label: 'Aplico los procedimientos de resolución estándar descritos en las guías de administración convencionales.' },
          { value: 80, label: 'Analizo los tiempos de entrega de cada estación para implementar mejoras y agilizar los procesos.' },
          { value: 100, label: 'Realizo un mapeo completo de los flujos de trabajo usando métodos matemáticos para rediseñar el sistema de producción.' }
        ]
      },
      {
        level: 3,
        q: 'Te presentan un problema estratégico con múltiples variables cruzadas, riesgos y mucha incertidumbre, ¿cómo procedes?',
        options: [
          { value: 20, label: 'Prefiero no liderar el análisis, ya que me confunden los escenarios de gran complejidad.' },
          { value: 40, label: 'Intento aplicar la solución más sencilla posible para resolver el problema inmediato rápidamente.' },
          { value: 60, label: 'Tomo una decisión segura basada en la experiencia de casos anteriores parecidos.' },
          { value: 80, label: 'Elaboro esquemas para analizar pros y contras de cada camino, buscando mitigar los riesgos principales.' },
          { value: 100, label: 'Desgloso todas las variables ocultas y desarrollo un modelo estratégico para resolver el problema de raíz.' }
        ]
      },
      {
        level: 3,
        q: 'Si en el futuro trabajas como el consultor experto en resolución de crisis al que llaman cuando surge una situación crítica, ¿qué opinas?',
        options: [
          { value: 20, label: 'Evitaría ese rol, prefiero trabajar en un entorno predecible y con menor exigencia bajo presión.' },
          { value: 40, label: 'Me resultaría demasiado estresante y buscaría una labor con rutinas diarias más tranquilas.' },
          { value: 60, label: 'Lo consideraría si se presenta la oportunidad y cuento con un buen equipo de apoyo técnico.' },
          { value: 80, label: 'Me atrae el reconocimiento profesional y me prepararía metódicamente para actuar con eficacia en momentos difíciles.' },
          { value: 100, label: 'Me entusiasma el desafío, ya que disfruto de la adrenalina intelectual de resolver problemas complejos bajo presión.' }
        ]
      }
    ]
  },
  {
    id: 'transversal_pensamiento_critico',
    title: 'Pensamiento Crítico',
    questions: [
      {
        level: 1,
        q: 'Encuentras una noticia impactante compartida repetidamente en tus redes sociales, ¿cómo reaccionas?',
        options: [
          { value: 20, label: 'Comparto la información de inmediato con mis conocidos para alertarlos.' },
          { value: 40, label: 'Reacciono a la publicación asumiendo que los datos son reales sin mayor verificación.' },
          { value: 60, label: 'Leo la publicación y la comento de manera informal con otras personas.' },
          { value: 80, label: 'Busco el tema en fuentes periodísticas confiables para confirmar la autenticidad de la noticia.' },
          { value: 100, label: 'Evalúo críticamente las fuentes de origen, la fecha de publicación y las intenciones del artículo antes de tomar una postura.' }
        ]
      },
      {
        level: 2,
        q: 'Un orador o líder muy carismático expone planes sumamente atractivos pero con pocos detalles de viabilidad técnica, ¿qué postura adoptas?',
        options: [
          { value: 20, label: 'Me convence su discurso por su confianza y me muestro de acuerdo con sus planteamientos.' },
          { value: 40, label: 'Apoyo sus ideas de forma general porque me resulta agradable su presentación.' },
          { value: 60, label: 'Escucho el discurso pero no me detengo a evaluar si los planes son realmente realizables.' },
          { value: 80, label: 'Presto atención al contenido buscando separar la elocuencia de las propuestas prácticas reales.' },
          { value: 100, label: 'Analizo los datos aportados, identifico las falacias argumentativas y exijo bases objetivas a sus promesas.' }
        ]
      },
      {
        level: 2,
        q: 'Tu grupo de trabajo aprueba una propuesta de proyecto que consideras que tiene errores de diseño importantes, ¿cómo reaccionas?',
        options: [
          { value: 20, label: 'Acepto la propuesta grupal en silencio para no generar tensiones ni debates en el equipo.' },
          { value: 40, label: 'Expreso que estoy de acuerdo aunque crea que fallará, priorizando mantener la armonía grupal.' },
          { value: 60, label: 'Menciono de forma breve mi inquietud pero dejo que el grupo decida sin insistir en mi postura.' },
          { value: 80, label: 'Explico mis dudas de forma ordenada e intento convencer al equipo de buscar opciones alternativas.' },
          { value: 100, label: 'Expongo un análisis estructurado con argumentos firmes para demostrar por qué es necesario modificar la propuesta.' }
        ]
      },
      {
        level: 3,
        q: 'Te asignan la responsabilidad de evaluar detalladamente un contrato o un informe de calidad en tu organización, ¿cómo actúas?',
        options: [
          { value: 20, label: 'Apruebo el documento con una revisión muy rápida porque confío en el criterio del equipo redactor.' },
          { value: 40, label: 'Leo solamente los resúmenes iniciales y la conclusión general para validar el documento.' },
          { value: 60, label: 'Realizo una revisión general de la estructura y formato formal para asegurar que cumpla los requisitos indispensables.' },
          { value: 80, label: 'Leo a detalle el documento completo e identifico cláusulas o especificaciones que podrían ser ambiguas.' },
          { value: 100, label: 'Analizo minuciosamente cada punto y condición buscando discrepancias o fallas técnicas antes de otorgar mi conformidad.' }
        ]
      },
      {
        level: 3,
        q: 'Te corresponde reorganizar el personal de un departamento evaluando exclusivamente los datos de productividad laboral, ¿cómo procedes?',
        options: [
          { value: 20, label: 'Me resulta muy difícil tomar decisiones sobre el empleo de las personas y prefiero delegar esta responsabilidad.' },
          { value: 40, label: 'Evito aplicar cambios drásticos para no generar inconformidades o críticas en el entorno laboral.' },
          { value: 60, label: 'Busco soluciones intermedias y parciales para mitigar el descontento de todas las partes involucradas.' },
          { value: 80, label: 'Tomo las decisiones necesarias de forma respetuosa con los trabajadores para asegurar el bienestar del proyecto.' },
          { value: 100, label: 'Aplico rigurosamente las pautas de rendimiento y tomo las decisiones basándome estrictamente en el análisis de los indicadores.' }
        ]
      },
      {
        level: 3,
        q: 'Si en tu futuro profesional debes retar paradigmas organizacionales o metodologías tradicionales que consideres ineficientes, ¿qué harías?',
        options: [
          { value: 20, label: 'Prefiero apegarme a los reglamentos y dinámicas tradicionales de la organización para no crear controversia.' },
          { value: 40, label: 'Evito cuestionar el orden establecido para evitar discusiones con superiores o colegas con mayor trayectoria.' },
          { value: 60, label: 'Expresaría alguna mejora solo si me lo solicitan directamente en una reunión de planificación.' },
          { value: 80, label: 'Formulo una propuesta de cambio y la presento de manera formal y amable demostrando sus beneficios prácticos.' },
          { value: 100, label: 'Disfruto de estructurar argumentos fundamentados y debatir activamente las metodologías ineficientes con datos sólidos.' }
        ]
      }
    ]
  },
  {
    id: 'transversal_percepcion_social',
    title: 'Inteligencia Emocional',
    questions: [
      {
        level: 1,
        q: 'En una reunión social, notas que un integrante del grupo se aísla de pronto con gesto triste y decaído, ¿cómo reaccionas?',
        options: [
          { value: 20, label: 'No me percato de su situación ya que estoy concentrado en mis propios asuntos y entretenimiento.' },
          { value: 40, label: 'Lo noto de reojo, me da curiosidad pero sigo en lo mío esperando que alguien más se acerque.' },
          { value: 60, label: 'Le pregunto de forma breve si se siente bien y continúo conversando con los demás.' },
          { value: 80, label: 'Me acerco con amabilidad para ofrecerle algo de tomar y sugerirle integrarse de nuevo al grupo.' },
          { value: 100, label: 'Me acerco discretamente, escucho su estado de ánimo y lo acompaño respetando sus emociones.' }
        ]
      },
      {
        level: 2,
        q: 'Un usuario o cliente muy molesto te reclama con agresividad verbal debido a una mala gestión del servicio, ¿cómo respondes?',
        options: [
          { value: 20, label: 'Respondo con molestia y busco la intervención de un tercero para que lo retire del lugar.' },
          { value: 40, label: 'Me genera mucha tensión y prefiero ausentarme momentáneamente para evitar la confrontación.' },
          { value: 60, label: 'Le hablo con tono formal y seco para centrarme únicamente en la transacción operativa del servicio.' },
          { value: 80, label: 'Mantengo la calma, escucho su queja con tranquilidad y le ofrezco una solución práctica viable.' },
          { value: 100, label: 'Modulo asertivamente mi voz, muestro empatía ante su malestar y aplico técnicas de diálogo para desescalar el conflicto.' }
        ]
      },
      {
        level: 2,
        q: 'Un conocido o familiar cercano te confía un problema personal delicado y se quiebra emocionalmente frente a ti, ¿cómo actúas?',
        options: [
          { value: 20, label: 'Me incomoda bastante la situación y busco un motivo rápido para retirarme o delegar el apoyo.' },
          { value: 40, label: 'Intento cambiar de tema o desviar la atención para que no continúe expresando su aflicción.' },
          { value: 60, label: 'Le doy palabras sencillas de aliento y le aconsejo que trate de calmarse pronto.' },
          { value: 80, label: 'Le ofrezco consejos lógicos y sugerencias prácticas directas sobre cómo solucionar su problema.' },
          { value: 100, label: 'Escucho activamente y con gran empatía, brindándole contención y validando sus sentimientos sin juzgar.' }
        ]
      },
      {
        level: 3,
        q: 'Te proponen participar en un proyecto de estudio sobre la complejidad biológica y psicológica de los trastornos mentales severos, ¿cómo lo tomarías?',
        options: [
          { value: 20, label: 'Prefiero evitar el tema, ya que no me interesa el estudio de las patologías de la mente humana.' },
          { value: 40, label: 'Lo consideraría si fuera indispensable, pero prefiero no profundizar en temáticas complejas de salud mental.' },
          { value: 60, label: 'Estudiaría los conceptos generales del tema por cultura académica general.' },
          { value: 80, label: 'Me interesa comprender cómo funcionan estos trastornos para tener mayor empatía ante el comportamiento humano.' },
          { value: 100, label: 'Me apasiona el estudio profundo de la psiquiatría y la psicología clínica para comprender y ayudar a sanar a otros.' }
        ]
      },
      {
        level: 3,
        q: 'En un entorno laboral del sector salud, debes informar de manera constante a familiares sobre diagnósticos médicos desfavorables, ¿cómo actuarías?',
        options: [
          { value: 20, label: 'Preferiría no asumir este rol, ya que considero que la carga emocional afectaría severamente mi bienestar.' },
          { value: 40, label: 'Sería muy difícil para mí manejar estas conversaciones cotidianamente sin experimentar agotamiento emocional.' },
          { value: 60, label: 'Lo haría apegándome estrictamente al protocolo formal para proteger mis propias emociones.' },
          { value: 80, label: 'Afrontaría la situación mostrando empatía y cuidado en la forma de comunicar los diagnósticos.' },
          { value: 100, label: 'Cuento con la preparación y resiliencia emocional necesarias para guiar a los familiares con profesionalismo y empatía.' }
        ]
      },
      {
        level: 3,
        q: 'Si tuvieras la oportunidad de dedicar tu labor al acompañamiento y la reinserción social de personas en situaciones de alta vulnerabilidad, ¿qué opinas?',
        options: [
          { value: 20, label: 'No me interesaría participar en esas áreas debido a los desafíos sociales y de seguridad que conllevan.' },
          { value: 40, label: 'Considero que es una labor noble, pero prefiero desarrollarme en sectores más estables y estructurados.' },
          { value: 60, label: 'Estaría dispuesto a colaborar en actividades específicas si tengo la capacitación e inducción requerida.' },
          { value: 80, label: 'Me parece un servicio comunitario muy importante y me agradaría asumir funciones de apoyo y orientación.' },
          { value: 100, label: 'Siento la inmensa, pura y genuina vocación inquebrantable de rescatar vidas marginadas por la sociedad.' }
        ]
      }
    ]
  },
  {
    id: 'transversal_toma_decisiones',
    title: 'Toma de Decisiones y Liderazgo',
    questions: [
      {
        level: 1,
        q: 'Tu grupo de trabajo o amigos discute largamente sin ponerse de acuerdo sobre qué decisión tomar, ¿cómo actúas?',
        options: [
          { value: 20, label: 'Prefiero mantenerme al margen y que los demás elijan lo que consideren conveniente.' },
          { value: 40, label: 'Espero a que el debate termine sin intervenir directamente en la conversación.' },
          { value: 60, label: 'Acepto cualquier decisión de la mayoría sin preocuparme demasiado por el rumbo final.' },
          { value: 80, label: 'Propongo alternativas estructuradas y sugiero una votación democrática para resolverlo de forma ordenada.' },
          { value: 100, label: 'Tomo la iniciativa de orientar el debate, defino la mejor opción y guío al grupo hacia esa dirección.' }
        ]
      },
      {
        level: 2,
        q: 'En un proyecto final o de trabajo reina la desorganización, y la fecha límite de entrega está muy cerca, ¿cómo reaccionas?',
        options: [
          { value: 20, label: 'Prefiero distanciarme y asumir las consecuencias académicas o laborales en lugar de lidiar con el caos.' },
          { value: 40, label: 'Reclamo a mis compañeros por la falta de orden y solicito una prórroga para la entrega.' },
          { value: 60, label: 'Me concentro exclusivamente en desarrollar la parte asignada a mi persona para asegurar mi cumplimiento.' },
          { value: 80, label: 'Pido orden al grupo, sugiero una reunión breve de planificación y busco que todos apoyen con sus tareas.' },
          { value: 100, label: 'Asumo la dirección del proyecto, defino las tareas críticas pendientes, delego funciones y controlo los avances.' }
        ]
      },
      {
        level: 2,
        q: 'Te proponen realizar una inversión en un negocio innovador con alto riesgo pero con proyecciones de excelente rentabilidad, ¿qué decides hacer?',
        options: [
          { value: 20, label: 'Rechazo la propuesta de inmediato, priorizando la seguridad y estabilidad total de mi presupuesto.' },
          { value: 40, label: 'Prefiero destinar mis fondos a opciones financieras convencionales que no impliquen ningún riesgo.' },
          { value: 60, label: 'Invierto solo una cantidad mínima que no afecte mi economía si el proyecto llega a fallar.' },
          { value: 80, label: 'Analizo la viabilidad de la propuesta técnica y, si el mercado lo respalda, asumo el riesgo con un plan de respaldo.' },
          { value: 100, label: 'Evalúo matemáticamente el nivel de riesgo, desarrollo proyecciones financieras complejas e invierto de manera decidida.' }
        ]
      },
      {
        level: 3,
        q: 'Te proponen asumir la gerencia general de una organización en crisis financiera con el reto de restructurarla, ¿aceptarías el reto?',
        options: [
          { value: 20, label: 'Rechazo el cargo, no considero viable asumir un puesto de alta responsabilidad en un entorno de inestabilidad.' },
          { value: 40, label: 'Prefiero no aceptar porque la presión y la responsabilidad sobre el empleo de otros me generarían mucha tensión.' },
          { value: 60, label: 'Aceptaría si el salario lo justifica, enfocándome en seguir los procesos de liquidación estándar establecidos.' },
          { value: 80, label: 'Aceptaría con respeto por el reto, aplicando pautas organizacionales de contingencia para estabilizar la situación.' },
          { value: 100, label: 'Asumo el cargo con entusiasmo, planifico una restructuración global de la entidad y ejecuto decisiones de alto impacto.' }
        ]
      },
      {
        level: 3,
        q: 'Una decisión estratégica tomada por ti resulta errónea y genera pérdidas importantes en tu organización, ¿cómo actúas?',
        options: [
          { value: 20, label: 'Busco justificar el resultado responsabilizando a factores del entorno macroeconómico o de mercado.' },
          { value: 40, label: 'Intento evitar las reuniones de evaluación esperando que la situación se resuelva sin intervención directa.' },
          { value: 60, label: 'Explico que seguí los lineamientos usuales del área y trato de minimizar las consecuencias visibles.' },
          { value: 80, label: 'Asumo el error ante mis superiores, propongo un plan de mitigación y busco lecciones operativas del caso.' },
          { value: 100, label: 'Doy la cara asumiendo la responsabilidad del resultado e implemento de inmediato las medidas correctivas.' }
        ]
      },
      {
        level: 3,
        q: 'Si en tu futuro profesional debes ejercer responsabilidades de liderazgo y toma de decisiones corporativas de alto nivel, ¿qué opinas?',
        options: [
          { value: 20, label: 'Prefiero roles técnicos sin responsabilidades de gestión de personal ni decisiones estratégicas críticas.' },
          { value: 40, label: 'Me resultaría incómodo coordinar y guiar el desempeño de grandes grupos de trabajo de forma continua.' },
          { value: 60, label: 'Podría ejercer mandos intermedios y reportar mis avances a un director general.' },
          { value: 80, label: 'Me atrae el liderazgo y la oportunidad de guiar proyectos e implementar mejoras operativas importantes.' },
          { value: 100, label: 'Me apasiona el rol directivo de alto nivel, la toma de decisiones sistémicas y la gestión de planes estratégicos globales.' }
        ]
      }
    ]
  }
];
