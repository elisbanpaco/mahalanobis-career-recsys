import numpy as np
import pandas as pd
from scipy.spatial.distance import mahalanobis
from scipy.linalg import pinv

class CareerRecommenderMahalanobis:
    def __init__(self, careers_data, feature_cols):
        """
        Inicializa el recomendador vocacional basado exclusivamente en Mahalanobis.
        
        :param careers_data: DataFrame con la matriz estática de cada carrera (puntajes EBR + transversales).
        :param feature_cols: Lista de las columnas evaluadas.
        """
        self.careers_df = careers_data.copy()
        self.feature_cols = feature_cols

        # Calculamos la matriz de covarianza usando la matriz estática de las carreras.
        # Esto permite capturar cómo ciertas habilidades (ej. matemáticas y tecnología)
        # co-ocurren naturalmente en los perfiles universitarios.
        self.cov_matrix = self.careers_df[feature_cols].cov().values

        # Calculamos la pseudoinversa de la matriz de covarianza por estabilidad.
        self.inv_cov_matrix = pinv(self.cov_matrix)

    def recommend(self, student_profile_dict, top_n=3):
        """
        Genera recomendaciones usando Distancia de Mahalanobis.
        """
        user_vector = np.array([student_profile_dict[col] for col in self.feature_cols])
        distances = []

        for index, row in self.careers_df.iterrows():
            career_vector = row[self.feature_cols].values
            dist = mahalanobis(user_vector, career_vector, self.inv_cov_matrix)
            distances.append(dist)

        results = self.careers_df.copy()
        results['mahalanobis_dist'] = distances

        # Ordenar por distancia ascendente (menor distancia = mayor similitud)
        recommendations = results.sort_values('mahalanobis_dist')
        
        return recommendations[['career', 'mahalanobis_dist'] + self.feature_cols].head(top_n)
