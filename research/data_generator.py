import pandas as pd
import numpy as np
import os
import json

# Fijamos la semilla para reproducibilidad
np.random.seed(42)

# 12 Dimensiones del Modelo Híbrido
FEATURES = [
    'math', 'science', 'literature', # Aptitudes
    'r_realistic', 'i_investigative', 'a_artistic', 's_social', 'e_enterprising', 'c_conventional', # RIASEC
    'strong_leadership', 'strong_practical', 'strong_tech' # Strong Interest
]

# Base Profiles por Área [math, sci, lit, R, I, A, S, E, C, Ldr, Prac, Tech]
PROFILES = {
    'ENGINEERING': np.array([85, 80, 50,  70, 85, 30, 30, 50, 60,  50, 70, 85]),
    'HEALTH':      np.array([60, 90, 60,  40, 85, 30, 80, 40, 50,  50, 70, 40]),
    'SOCIAL':      np.array([40, 40, 85,  20, 75, 60, 85, 50, 40,  60, 20, 30]),
    'BUSINESS':    np.array([70, 40, 70,  30, 60, 30, 70, 90, 85,  85, 30, 50]),
    'ART_EDU':     np.array([40, 40, 75,  30, 50, 85, 90, 40, 40,  60, 40, 30])
}

# Clasificación de las 38 Carreras de la UNAP
CAREERS_MAPPING = {
    'Administración': 'BUSINESS',
    'Antropología': 'SOCIAL',
    'Arquitectura y Urbanismo': 'ENGINEERING', # Más artístico luego
    'Arte: Especialidad de Artes Plásticas': 'ART_EDU',
    'Arte: Especialidad de Música': 'ART_EDU',
    'Ciencias Biológicas': 'HEALTH',
    'Ciencias Contables': 'BUSINESS',
    'Ciencias de la Comunicación Social': 'SOCIAL',
    'Ciencias Físico Matemáticas': 'ENGINEERING',
    'Derecho': 'SOCIAL',
    'Educación Física': 'ART_EDU',
    'Educación Inicial': 'ART_EDU',
    'Educación Primaria': 'ART_EDU',
    'Educación Secundaria': 'ART_EDU',
    'Enfermería': 'HEALTH',
    'Ingeniería Agrícola': 'ENGINEERING',
    'Ingeniería Agroindustrial': 'ENGINEERING',
    'Ingeniería Agronómica': 'ENGINEERING',
    'Ingeniería Civil': 'ENGINEERING',
    'Ingeniería de Inteligencia Artificial y Ciencia de Datos': 'ENGINEERING',
    'Ingeniería de Minas': 'ENGINEERING',
    'Ingeniería de Sistemas': 'ENGINEERING',
    'Ingeniería de Telecomunicaciones': 'ENGINEERING',
    'Ingeniería Económica': 'BUSINESS',
    'Ingeniería Electrónica': 'ENGINEERING',
    'Ingeniería Empresarial': 'BUSINESS',
    'Ingeniería Estadística e Informática': 'ENGINEERING',
    'Ingeniería Geológica': 'ENGINEERING',
    'Ingeniería Mecánica Eléctrica': 'ENGINEERING',
    'Ingeniería Metalúrgica': 'ENGINEERING',
    'Ingeniería Química': 'ENGINEERING',
    'Ingeniería Topográfica y Agrimensura': 'ENGINEERING',
    'Medicina Humana': 'HEALTH',
    'Medicina Veterinaria y Zootecnia': 'HEALTH',
    'Nutrición Humana': 'HEALTH',
    'Odontología': 'HEALTH',
    'Sociología': 'SOCIAL',
    'Trabajo Social': 'SOCIAL',
    'Turismo': 'SOCIAL'
}

# Ajustes finos (Deltas) para carreras particulares
CAREER_DELTAS = {
    'Arquitectura y Urbanismo': {'a_artistic': +40, 'r_realistic': -10},
    'Ingeniería de Inteligencia Artificial y Ciencia de Datos': {'math': +10, 'strong_tech': +15, 'r_realistic': -20},
    'Derecho': {'strong_leadership': +20, 'e_enterprising': +15},
    'Medicina Humana': {'science': +10, 'i_investigative': +10},
}

def generate_data():
    all_students = []
    career_centroids = []
    
    n_students_per_career = 150
    
    for career, area in CAREERS_MAPPING.items():
        base_vector = np.copy(PROFILES[area])
        
        # Aplicar deltas específicos
        if career in CAREER_DELTAS:
            for feat, change in CAREER_DELTAS[career].items():
                idx = FEATURES.index(feat)
                base_vector[idx] += change
                
        # Agregar pequeña variación única a cada carrera para evitar empates (espejismos de clúster)
        jitter = np.random.uniform(-3, 3, size=len(FEATURES))
        base_vector = base_vector + jitter
        
        # Asegurar límites 0-100
        base_vector = np.clip(base_vector, 0, 100)
        
        career_centroids.append([career] + base_vector.tolist())
        
        # Construir matriz de covarianza base
        # Varianza base de ~150 para que los scores fluctúen +/- 12 puntos
        cov_matrix = np.diag(np.random.uniform(100, 200, size=len(FEATURES)))
        
        # Inyectar correlaciones fuertes (esto es lo que Mahalanobis aprovecha)
        # Math(0) con Investigative(4) y Tech(11)
        cov_matrix[0, 4] = cov_matrix[4, 0] = 80
        cov_matrix[0, 11] = cov_matrix[11, 0] = 70
        # Lit(2) con Social(6) y Artistic(5)
        cov_matrix[2, 6] = cov_matrix[6, 2] = 80
        cov_matrix[2, 5] = cov_matrix[5, 2] = 60
        
        # Asegurar que la matriz sea definida positiva usando un pequeño truco
        min_eig = np.min(np.real(np.linalg.eigvals(cov_matrix)))
        if min_eig < 0:
            cov_matrix -= 10 * min_eig * np.eye(*cov_matrix.shape)
            
        students_data = np.random.multivariate_normal(base_vector, cov_matrix, n_students_per_career)
        students_data = np.clip(np.round(students_data), 0, 100)
        
        for student in students_data:
            all_students.append([career] + student.tolist())
            
    # Guardar estudiantes
    df_students = pd.DataFrame(all_students, columns=['career'] + FEATURES)
    os.makedirs('../data', exist_ok=True)
    df_students.to_csv('../data/students.csv', index_label='student_id')
    
    # Guardar centroides
    df_careers = pd.DataFrame(career_centroids, columns=['career'] + FEATURES)
    df_careers.to_csv('../data/careers.csv', index=False)
    
    print(f"✅ Generados {len(df_students)} estudiantes sintéticos (150 por cada una de las 38 carreras).")
    print(f"✅ Datos guardados en ../data/students.csv y ../data/careers.csv")

if __name__ == "__main__":
    generate_data()
