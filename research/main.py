import pandas as pd
from data_generator import generate_data
from recommender import CareerRecommenderMahalanobis

def main():
    # 1. Generar los datos
    print("--- 1. Generando Datos Sintéticos ---")
    generate_data()
    
    # 2. Cargar los datos
    print("\n--- 2. Cargando Datos ---")
    df_students = pd.read_csv('../data/students.csv', index_col='student_id')
    df_careers = pd.read_csv('../data/careers.csv')
    
    print("Centroides de Carreras:")
    print(df_careers)
    
    # 3. Configurar el recomendador
    features = ['math', 'physics', 'history', 'literature', 'art']
    rec_sys = CareerRecommenderMahalanobis(df_students, df_careers, features)
    
    # 4. Caso de Prueba: "María"
    # María tiene un perfil excelente en Matemáticas, pero le fue mal en Física.
    # En un sistema de Distancia Euclidiana sería penalizada severamente para carreras de ciencias exactas.
    maria_profile = {
        'math': 18,
        'physics': 12,  # Anomalía (caída por un mal profesor, pero buena base matemática)
        'history': 12,
        'literature': 12,
        'art': 10
    }
    
    print("\n--- 3. Perfil de la Estudiante (María) ---")
    print(maria_profile)
    
    # 5. Obtener Recomendaciones con Euclidiana vs Mahalanobis
    print("\n--- 4a. Comparación: Distancia Euclidiana (El 'Espejismo') ---")
    euclidean_recs = rec_sys.get_euclidean_recommendation(maria_profile, top_n=3)
    for idx, row in euclidean_recs.iterrows():
        print(f"[{row['euclidean_dist']:.2f}] {row['career']}")
        
    print("\n--- 4b. Comparación: Distancia de Mahalanobis (Contexto Real) ---")
    mahalanobis_recs = rec_sys.recommend(maria_profile, top_n=3)
    for idx, row in mahalanobis_recs.iterrows():
        print(f"[{row['mahalanobis_dist']:.2f}] {row['career']}")

if __name__ == "__main__":
    main()
