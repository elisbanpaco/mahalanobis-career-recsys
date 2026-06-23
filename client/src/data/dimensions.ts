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
