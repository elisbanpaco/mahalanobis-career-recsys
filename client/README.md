# Interfaz de Usuario (Frontend Client)

Esta carpeta contiene la aplicación web interactiva desarrollada en **Next.js y React**. Funciona como la cara visible del sistema de recomendación vocacional, encargada de evaluar el perfil cognitivo y conductual del estudiante para luego comunicarse con la API de cálculo matemático (Mahalanobis).

## Arquitectura Psicométrica de la Interfaz

El frontend no es un simple formulario de preguntas; implementa lógicas conductuales avanzadas para asegurar la mayor fidelidad y limpieza en los datos extraídos del estudiante antes de ser procesados por la API.

### 1. Test de Juicio Situacional (SJT) - Escala de 5 Puntos
En lugar de preguntar al estudiante *"¿Eres bueno en X?"* (lo cual genera alta distorsión o *"faking"*), el sistema utiliza el formato **SJT (Situational Judgment Test)**.
*   **96 Escenarios Reales:** Presenta problemas, crisis o situaciones que obligan al estudiante a visualizarse en el contexto.
*   **5 Opciones de Acción Conductual:** No se mide la "intensidad" de una emoción, sino la elección de un plan de acción real, escalados de menor a mayor dominio:
    *   **Nivel 20:** Evasión profunda, rechazo, negación o pánico.
    *   **Nivel 40:** Fastidio, delegar el problema o buscar la salida más mediocre.
    *   **Nivel 60:** Cumplimiento pasivo o hacer lo mínimo indispensable para sobrevivir a la situación.
    *   **Nivel 80:** Proactividad, interés analítico y búsqueda de soluciones.
    *   **Nivel 100:** Maestría absoluta, liderazgo, pasión intelectual y control.

### 2. Algoritmo de Compuertas (Gating Adaptativo)
Diseñado para combatir el *"Efecto Dunning-Kruger"* (creer saber mucho de un tema sin haber enfrentado su dificultad real) y evitar la fatiga de prueba (test fatigue).
*   Las 6 preguntas de cada competencia están divididas en tres niveles asimétricos: **Nivel 1 (Exploración)**, **Nivel 2 (Aplicación Práctica)** y **Nivel 3 (Especialización Profunda)**.
*   **Lógica de Salto (Early-Stopping):** Si el estudiante demuestra aversión o rechazo en los escenarios básicos (Nivel 1 o 2), el sistema aborta de inmediato el resto de preguntas de esa competencia, asumiendo su incapacidad, y salta a la siguiente materia para no aburrirlo.
*   Sin embargo, si el estudiante demuestra afinidad, se le obliga a superar las compuertas más difíciles (Nivel 3) para validar si su interés es real (vocación) o solo un pasatiempo (hobby).

### 3. Cálculo de Ponderación Asimétrica
Al finalizar una competencia, el frontend calcula un promedio ponderado que castiga el abandono temprano y premia la resistencia intelectual:
*   Si completa los 3 niveles: Nivel 1 (40%) + Nivel 2 (40%) + Nivel 3 (20%).
*   Si abandona en niveles bajos, hereda el puntaje del último fallo.

---

## Flujo de Trabajo en `client/`

Si necesitas modificar la interfaz visual, el banco de preguntas o la lógica de salto, este es el flujo estandarizado:

1. **Instalar Dependencias:**
   Si es la primera vez que clonas el repositorio o se actualizaron paquetes:
   ```bash
   npm install
   ```

2. **Ejecutar el Servidor de Desarrollo:**
   Asegúrate de que la API en Python (puerto 8000) esté corriendo, luego levanta el frontend:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

3. **Modificar el Banco de Preguntas:**
   Todas las dimensiones, escenarios y acciones situacionales están estructuradas de forma declarativa dentro del array `DIMENSIONS` en el archivo principal:
   ```path
   src/app/page.tsx
   ```

4. **Diseño y Estilos:**
   El frontend utiliza **Tailwind CSS** con una estética "Glassmorphism" en modo oscuro. Los colores y efectos visuales se controlan mediante clases utilitarias directamente en los componentes de React, y las configuraciones globales residen en `src/app/globals.css`.
