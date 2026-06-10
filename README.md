# Mahalanobis Career RecSys

Este proyecto resuelve el "Espejismo de la Doble Puntuación" en los sistemas de recomendación universitarios tradicionales. A diferencia de los enfoques basados en la Distancia Euclidiana, este sistema utiliza la **Distancia de Mahalanobis** para comprender el contexto estadístico y las correlaciones entre las habilidades de un estudiante (como Matemáticas y Física).

## Estructura del Monorepo

Este repositorio está estructurado como un monorepo para facilitar el desarrollo y despliegue a escala:

- `/api`: Backend (Python). Se encarga de procesar el perfil numérico del estudiante y calcular la Distancia de Mahalanobis contra los centroides de las carreras.
- `/client`: Frontend (Web). Aplicación de usuario (SPA) donde los estudiantes ingresan sus promedios y visualizan sus resultados a través de un gráfico de radar comparativo.
- `/research`: Laboratorio de datos. Scripts para generación de datos sintéticos y validación matemática del algoritmo.

## El Problema: "El Espejismo Euclidiano"
Si un estudiante es analíticamente brillante (Matemáticas=18) pero tuvo una mala experiencia atípica (Física=12), un algoritmo de Distancia Euclidiana lo aleja de carreras STEM porque asume que la caída en Física significa "no sirve para ciencias".

Mahalanobis, en cambio, lee la matriz de covarianza de la población estudiantil y determina que esa caída en Física rompe la correlación natural, por ende, lo trata como una anomalía contextual en lugar de una carencia estructural, recomendando la carrera correcta.
