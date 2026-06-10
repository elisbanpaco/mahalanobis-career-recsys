import pandas as pd
from data_generator import generate_data, FEATURES
from recommender import CareerRecommenderMahalanobis

def main():
    # 2. Cargar los datos
    print("\n--- 1. Cargando Datos (Modelo Híbrido 12D) ---")
    df_students = pd.read_csv('../data/students.csv')
    df_careers = pd.read_csv('../data/careers.csv')
    
    print(f"Total estudiantes en dataset: {len(df_students)}")
    print(f"Total carreras disponibles: {len(df_careers)}")
    
    # 3. Configurar el recomendador
    rec_sys = CareerRecommenderMahalanobis(df_students, df_careers, FEATURES)
    
    # 4. Caso de Prueba: "Juan" (El Espejismo en Inteligencia Artificial)
    # Juan tiene una nota regular/baja en matemáticas (60/100), pero tiene una motivación brutal 
    # por investigar (i_investigative = 95) y la tecnología (strong_tech = 95).
    # Un algoritmo Euclidiano lo alejaría de carreras de ciencias/ingeniería puras.
    # Mahalanobis notará que su alta motivación tecnológica e investigativa es común en ese perfil.
    juan_profile = {
        'math': 60,
        'science': 70,
        'literature': 50,
        'r_realistic': 60,
        'i_investigative': 95,
        'a_artistic': 40,
        's_social': 30,
        'e_enterprising': 50,
        'c_conventional': 50,
        'strong_leadership': 40,
        'strong_practical': 50,
        'strong_tech': 95
    }
    
    print("\n--- 2. Perfil del Estudiante (Juan) ---")
    for k, v in juan_profile.items():
        print(f"  {k}: {v}")
    
    # 5. Obtener Recomendaciones con Euclidiana vs Mahalanobis
    print("\n--- 3a. Distancia Euclidiana (El 'Espejismo') ---")
    euclidean_recs = rec_sys.get_euclidean_recommendation(juan_profile, top_n=5)
    for idx, row in euclidean_recs.iterrows():
        print(f"[{row['euclidean_dist']:.2f}] {row['career']}")
        
    print("\n--- 3b. Distancia de Mahalanobis (El Contexto Real) ---")
    mahalanobis_recs = rec_sys.recommend(juan_profile, top_n=5)
    for idx, row in mahalanobis_recs.iterrows():
        print(f"[{row['mahalanobis_dist']:.2f}] {row['career']}")

if __name__ == "__main__":
    main()
