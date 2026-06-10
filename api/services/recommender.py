import numpy as np
import pandas as pd
from scipy.spatial.distance import mahalanobis
from scipy.linalg import pinv

class CareerRecommenderMahalanobis:
    def __init__(self, students_data, careers_data, feature_cols):
        self.students_df = students_data.copy()
        self.careers_df = careers_data.copy()
        self.feature_cols = feature_cols

        # Calculamos la matriz de covarianza inversa por cada carrera (Clasificador Verdadero)
        self.career_inv_covs = {}
        global_cov = pinv(self.students_df[feature_cols].cov().values)
        
        for career in self.careers_df['career'].unique():
            career_data = self.students_df[self.students_df['career'] == career]
            if len(career_data) > 10:
                cov = career_data[feature_cols].cov().values
                self.career_inv_covs[career] = pinv(cov)
            else:
                self.career_inv_covs[career] = global_cov

    def recommend(self, student_profile_dict, top_n=5):
        user_vector = np.array([student_profile_dict[col] for col in self.feature_cols])
        distances = []

        for index, row in self.careers_df.iterrows():
            career_name = row['career']
            career_vector = row[self.feature_cols].values
            inv_cov = self.career_inv_covs.get(career_name)
            
            dist = mahalanobis(user_vector, career_vector, inv_cov)
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
