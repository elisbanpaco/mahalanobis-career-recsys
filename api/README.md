# Servidor API Mahalanobis (Backend)

Esta carpeta contiene el backend de alto rendimiento desarrollado en **FastAPI (Python)**. Su función exclusiva es actuar como el motor estadístico en tiempo real del sistema: recibe el perfil vectorial del estudiante desde el frontend, calcula distancias multidimensionales y devuelve las recomendaciones de carreras universitarias.

## Arquitectura Matemática

El corazón de este servidor es el cálculo de la **Distancia de Mahalanobis**, implementado en `services/recommender.py` usando las librerías `numpy` y `scipy`. A diferencia de la distancia Euclidiana tradicional, Mahalanobis comprende que las dimensiones psicológicas y académicas están correlacionadas (ej. un estudiante bueno en Ciencias probablemente también sea bueno en Matemáticas).

### 1. Inicialización en Memoria (Arranque)
Cuando el servidor se enciende, carga inmediatamente el archivo estático maestro `../data/careers.csv` en la memoria RAM mediante Pandas. Esto garantiza tiempos de respuesta del orden de los milisegundos.
A partir de este CSV (que contiene los "centroides" ideales de las 39 carreras), calcula:
*   **La Matriz de Covarianza:** Entiende las relaciones y varianzas entre las 16 dimensiones de la educación básica y competencias transversales.
*   **La Matriz de Covarianza Inversa (Pseudoinversa):** Calculada mediante `scipy.linalg.pinv` para evitar errores de singularidad matricial y asegurar estabilidad matemática absoluta.

### 2. Endpoint de Recomendación (`POST /recommend`)
Cuando el estudiante finaliza su test de Juicio Situacional en la web, el servidor recibe un JSON con 16 valores (escalados de 0 a 100). 
El servidor toma este "Vector del Estudiante" y lo compara uno a uno contra los vectores de las 39 carreras de la UNAP:
*   **Cálculo de Distancia:** Se aplica la fórmula geométrica de Mahalanobis. Una distancia cercana a `0` indica que el perfil del estudiante es un "clon" del perfil ideal de la carrera.
*   **Normalización y Match (%):** La distancia pura (que es un número abstracto) se normaliza estadísticamente contra la distancia máxima posible para convertirla en un *"Match Score"* porcentual (0% - 100%), fácilmente comprensible para el usuario final.

El servidor retorna un arreglo JSON con el "Top 5" de carreras más afines.

---

## Flujo de Trabajo en `api/`

Si necesitas modificar las librerías matemáticas, los modelos de Pydantic o la configuración de CORS, este es el flujo estandarizado:

1. **Gestión de Entorno y Dependencias:**
   Este proyecto utiliza `uv` como gestor de paquetes de Python de altísima velocidad. Asegúrate de tenerlo instalado.
   Para sincronizar el entorno virtual o instalar librerías:
   ```bash
   uv pip install -r requirements.txt
   ```
   *(Las dependencias principales son `fastapi`, `uvicorn`, `pandas`, `scipy` y `pydantic`).*

2. **Ejecutar el Servidor en Desarrollo:**
   Levanta el servidor con recarga en caliente (hot-reload) para que cualquier cambio en el código se refleje al instante:
   ```bash
   uv run main.py
   ```
   El servidor se alojará por defecto en `http://localhost:8000`.

3. **Documentación Swagger UI Automática:**
   Gracias a FastAPI, no necesitas postman para probar las llamadas en blanco. Puedes acceder a la documentación interactiva e inyectar perfiles JSON de prueba accediendo a:
   [http://localhost:8000/docs](http://localhost:8000/docs)

4. **Estructura Interna:**
   *   `main.py`: Punto de entrada, configuración de FastAPI y declaración de rutas/endpoints.
   *   `models.py`: Esquemas de validación estricta de Pydantic para los datos de entrada/salida.
   *   `services/recommender.py`: Motor de cálculo matemático puro (Algoritmo de Mahalanobis).
