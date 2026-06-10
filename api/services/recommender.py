import numpy as np
import pandas as pd
from scipy.spatial.distance import mahalanobis
from scipy.linalg import pinv

class CareerRecommenderMahalanobis:
    def __init__(self, students_data, careers_data, feature_cols):
        self.students_df = students_data.copy()
        self.careers_df = careers_data.copy()
        self.feature_cols = feature_cols

        # Calculamos la matriz de covarianza usando los datos poblacionales
        self.cov_matrix = self.students_df[feature_cols].cov().values

        # Inversa de la matriz de covarianza para el cálculo de distancias
        self.inv_cov_matrix = pinv(self.cov_matrix)

    def recommend(self, student_profile_dict, top_n=5):
        user_vector = np.array([student_profile_dict[col] for col in self.feature_cols])
        distances = []

        for index, row in self.careers_df.iterrows():
            career_vector = row[self.feature_cols].values
            dist = mahalanobis(user_vector, career_vector, self.inv_cov_matrix)
            distances.append(dist)

        results = self.careers_df.copy()
        results['mahalanobis_dist'] = distances

        # Normalizar el score (opcional, para UI)
        # Transformar distancia a un "Match Score" %
        # Distancia 0 = 100%, Distancia mayor = menor %
        max_dist = np.max(distances) if len(distances) > 0 else 1
        results['match_percentage'] = np.clip(100 - (results['mahalanobis_dist'] / max_dist) * 100, 0, 100)

        recommendations = results.sort_values('mahalanobis_dist')
        return recommendations[['career', 'mahalanobis_dist', 'match_percentage'] + self.feature_cols].head(top_n)
