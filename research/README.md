# Entorno de Investigación (Research)

Esta carpeta contiene el código base del sistema de recomendación vocacional. Sirve como el "laboratorio" donde se prueban y definen las lógicas matemáticas (Distancia de Mahalanobis) y la generación de la matriz de datos maestras (`careers.csv`), la cual luego es consumida por el backend de producción (`/api`).

## Estructura del Modelo 16D

El sistema clasifica tanto a las carreras como a los perfiles de los estudiantes en un espacio vectorial de **16 dimensiones**, combinando normativas educativas peruanas y estándares laborales internacionales.

### 1. Áreas de la Educación Básica Regular (10 Dimensiones)
El núcleo del modelo se basa estrictamente en la currícula oficial del Perú para estudiantes de los últimos años de secundaria. Se evalúan las notas o aptitudes en las 10 materias principales de la Educación Básica Regular (EBR). Los perfiles ideales de las carreras para estas dimensiones se obtienen mediante encuestas directas a profesionales en ejercicio (ver `/data/cuestionario_profesionales.md`).
* **Fuente oficial y normativa:** [Currículo Nacional de la Educación Básica (Minedu Perú)](http://www.minedu.gob.pe/curriculo/)

### 2. Competencias Transversales O*NET (6 Dimensiones)
Para medir destrezas que cruzan todas las profesiones (como el dominio tecnológico y la resolución de problemas cognitivos), utilizamos los estándares de EE.UU. Estas métricas homologan a las competencias 28 (TIC) y 29 (Autonomía) peruanas, dándoles un soporte cuantitativo riguroso (escala 0-100) y agregando 4 destrezas interfuncionales clave.
Las 6 competencias seleccionadas son:
1. *Interacting With Computers* (Uso de TIC)
2. *Active Learning* (Aprendizaje autónomo)
3. *Complex Problem Solving* (Resolución de problemas complejos)
4. *Critical Thinking* (Pensamiento Crítico)
5. *Social Perceptiveness* (Percepción Social / Inteligencia Emocional)
6. *Judgment and Decision Making* (Toma de Decisiones)
* **Fuente técnica internacional:** [The O*NET Content Model (Worker Requirements & Occupational Requirements)](https://www.onetcenter.org/content.html#cm4)

---

## Flujo de Trabajo en `research/`

Si necesitas modificar la lógica matemática, añadir carreras o cambiar las puntuaciones, este es el flujo de trabajo estandarizado:

1. **Modificar Perfiles Base:** Al recolectar datos nuevos del *Cuestionario para Profesionales*, abre el archivo `data_generator.py` y modifica los diccionarios `PROFILES` (puntajes base por área) o `CAREER_OVERRIDES` (ajustes exactos carrera por carrera).
2. **Generar Matriz Estática:** Ejecuta el generador de datos usando `uv`:
   ```bash
   uv run data_generator.py
   ```
   Esto compilará todas las configuraciones en un archivo CSV y lo guardará en `../data/careers.csv`. El sistema usa matrices estáticas pre-calculadas en lugar de generar estudiantes falsos, evitando problemas de distorsión matemática.
3. **Probar el Motor Matemático:** Abre `main.py`, modifica el diccionario `student_profile` simulando las notas y aptitudes de un estudiante, y ejecuta el sistema de prueba:
   ```bash
   uv run main.py
   ```
   Esto calculará y mostrará en consola las distancias de Mahalanobis y el Top 5 de carreras más afines al estudiante evaluado.
4. **Desplegar:** Si el script de `main.py` devuelve resultados lógicos, tu trabajo en `research/` ha terminado. El servidor web de producción (en la carpeta `/api`) leerá automáticamente el archivo `careers.csv` actualizado en su próximo reinicio.
