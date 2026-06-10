import pandas as pd
import numpy as np
import os

def generate_data():
    np.random.seed(42)
    n_students = 1000
    
    # We want math and physics to be highly correlated.
    # History and literature highly correlated.
    # Features: math, physics, history, literature, art
    mean = [14, 13, 14, 14, 15]
    
    # Covariance matrix (symmetric, positive semi-definite)
    # math-physics cov is high (7.5), history-lit cov is high (6.5)
    cov = [
        [ 9.0,  7.5, -1.0, -1.5,  0.0], # math
        [ 7.5,  8.0, -0.5, -1.0,  0.0], # physics
        [-1.0, -0.5,  8.0,  6.5,  2.0], # history
        [-1.5, -1.0,  6.5,  9.0,  3.0], # literature
        [ 0.0,  0.0,  2.0,  3.0, 10.0]  # art
    ]
    
    students_data = np.random.multivariate_normal(mean, cov, n_students)
    
    # Clip to 0-20 range and round
    students_data = np.clip(np.round(students_data), 0, 20)
    
    df_students = pd.DataFrame(students_data, columns=['math', 'physics', 'history', 'literature', 'art'])
    df_students.index.name = 'student_id'
    
    # Career centroids
    careers_data = {
        'career': ['Ingeniería Civil', 'Derecho', 'Bellas Artes', 'Medicina', 'Ciencias de la Computación', 'Arquitectura'],
        'math': [18, 12, 10, 16, 19, 15],
        'physics': [17, 10, 9, 15, 16, 14],
        'history': [12, 18, 14, 15, 11, 13],
        'literature': [10, 18, 15, 14, 10, 12],
        'art': [9, 12, 19, 10, 12, 18]
    }
    df_careers = pd.DataFrame(careers_data)
    
    # Save to data/
    os.makedirs('../data', exist_ok=True)
    df_students.to_csv('../data/students.csv')
    df_careers.to_csv('../data/careers.csv', index=False)
    print("Datos sintéticos generados en ../data/")

if __name__ == "__main__":
    generate_data()
