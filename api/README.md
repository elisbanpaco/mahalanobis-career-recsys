# Backend API (Mahalanobis RecSys)

Este servicio provee el motor matemático y la API para el sistema de recomendación de carreras.

## Responsabilidades
- **Procesamiento del Vector de Estudiante**: Recibe las notas/intereses desde el frontend y los formatea.
- **Cálculo de Distancia**: Utiliza `scipy.spatial.distance.mahalanobis` y la matriz de covarianza pre-calculada de la población para generar las recomendaciones.
- **Endpoints de Explicabilidad**: Devuelve no solo el Top de carreras, sino los datos necesarios (centroides y perfiles) para que el frontend dibuje el Gráfico de Radar de forma precisa.

## Arquitectura y Stack
- **Lenguaje**: Python
- **Framework Web**: (Por definir, ej. FastAPI por su excelente integración con sistemas de Machine Learning y alto rendimiento)
- **Matemáticas**: NumPy, SciPy, Pandas
