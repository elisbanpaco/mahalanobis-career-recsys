import numpy as np
import pandas as pd
from scipy.spatial.distance import mahalanobis
from scipy.linalg import pinv

class CareerRecommenderMahalanobis:
    def __init__(self, students_data, careers_data, feature_cols):
        """
        Inicializa el recomendador de carreras.
        
        :param students_data: DataFrame con el historial de todos los estudiantes (para calcular la covarianza global).
        :param careers_data: DataFrame con los perfiles ideales (centroides) de cada carrera.
        :param feature_cols: Lista de columnas numéricas (ej. 'math', 'physics', etc.).
        """
        self.students_df = students_data.copy()
        self.careers_df = careers_data.copy()
        self.feature_cols = feature_cols

        # Calculamos la matriz de covarianza usando los datos de la POBLACIÓN ESTUDIANTIL
        # Esto nos permite entender cómo se correlacionan las materias (ej. Matemáticas y Física)
        self.cov_matrix = self.students_df[feature_cols].cov().values

        # Inversa de la matriz de covarianza. Usamos pinv por estabilidad numérica.
        self.inv_cov_matrix = pinv(self.cov_matrix)

    def recommend(self, student_profile_dict, top_n=3):
        """
        Genera recomendaciones de carreras para un estudiante dado su perfil.
        
        :param student_profile_dict: Diccionario con las notas del estudiante.
        """
        user_vector = np.array([student_profile_dict[col] for col in self.feature_cols])

        distances = []

        # Calculamos la distancia de Mahalanobis contra cada carrera (centroide)
        for index, row in self.careers_df.iterrows():
            career_vector = row[self.feature_cols].values
            dist = mahalanobis(user_vector, career_vector, self.inv_cov_matrix)
            distances.append(dist)

        results = self.careers_df.copy()
        results['mahalanobis_dist'] = distances

        # Ordenar por distancia (menor es mejor)
        recommendations = results.sort_values('mahalanobis_dist')

        return recommendations[['career', 'mahalanobis_dist'] + self.feature_cols].head(top_n)

    def get_euclidean_recommendation(self, student_profile_dict, top_n=3):
        """
        Utilidad para comparar con la distancia Euclidiana normal.
        """
        from scipy.spatial.distance import euclidean
        user_vector = np.array([student_profile_dict[col] for col in self.feature_cols])
        distances = []
        for index, row in self.careers_df.iterrows():
            career_vector = row[self.feature_cols].values
            dist = euclidean(user_vector, career_vector)
            distances.append(dist)
        
        results = self.careers_df.copy()
        results['euclidean_dist'] = distances
        recommendations = results.sort_values('euclidean_dist')
        return recommendations[['career', 'euclidean_dist'] + self.feature_cols].head(top_n)
