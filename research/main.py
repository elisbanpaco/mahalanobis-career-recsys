import pandas as pd
from data_generator import generate_data, FEATURES
from recommender import CareerRecommenderMahalanobis

def main():
    print("\n--- 1. Cargando Matriz de Carreras (16D: 10 EBR + 6 Transversales O*NET) ---")
    df_careers = pd.read_csv('../data/careers.csv')
    print(f"Total carreras disponibles: {len(df_careers)}")
    
    rec_sys = CareerRecommenderMahalanobis(df_careers, FEATURES)
    
    # Caso de Prueba: Estudiante con perfil analítico y resolutivo
    student_profile = {
        'ebr_matematica': 85,
        'ebr_comunicacion': 60,
        'ebr_ciencia_tecnologia': 80,
        'ebr_ciencias_sociales': 50,
        'ebr_dpcc': 50,
        'ebr_ingles': 75,
        'ebr_ept': 80,
        'ebr_arte_cultura': 40,
        'ebr_educacion_fisica': 50,
        'ebr_religion': 50,
        'transversal_tic': 95,          
        'transversal_autonomia': 80,
        'transversal_resolucion_problemas': 90,
        'transversal_pensamiento_critico': 85,
        'transversal_percepcion_social': 40,
        'transversal_toma_decisiones': 75
    }
    
    print("\n--- 2. Perfil del Estudiante ---")
    for k, v in student_profile.items():
        print(f"  {k}: {v}")
    
    print("\n--- 3. Recomendaciones (Mahalanobis) ---")
    mahalanobis_recs = rec_sys.recommend(student_profile, top_n=5)
    for idx, row in mahalanobis_recs.iterrows():
        print(f"[{row['mahalanobis_dist']:.2f}] {row['career']}")

if __name__ == "__main__":
    main()
