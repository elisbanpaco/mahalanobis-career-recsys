from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

from models import StudentProfileRequest, RecommendationResponse
from services.recommender import CareerRecommenderMahalanobis

app = FastAPI(
    title="Mahalanobis Career RecSys API",
    description="API para recomendación de carreras UNAP usando distancia de Mahalanobis",
    version="1.0.0"
)

# CORS para que el Frontend (/client) pueda consumir la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción se restringe al puerto del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Variables globales para los datos
students_df = None
careers_df = None
recommender = None

FEATURES = [
    'math', 'science', 'literature',
    'r_realistic', 'i_investigative', 'a_artistic', 's_social', 'e_enterprising', 'c_conventional',
    'strong_leadership', 'strong_practical', 'strong_tech'
]

@app.on_event("startup")
async def startup_event():
    global students_df, careers_df, recommender
    try:
        # Rutas relativas asumiendo que se corre desde la carpeta /api
        data_path_students = os.path.join(os.path.dirname(__file__), '..', 'data', 'students.csv')
        data_path_careers = os.path.join(os.path.dirname(__file__), '..', 'data', 'careers.csv')
        
        students_df = pd.read_csv(data_path_students)
        careers_df = pd.read_csv(data_path_careers)
        
        recommender = CareerRecommenderMahalanobis(students_df, careers_df, FEATURES)
        print("✅ Sistema de recomendación inicializado correctamente.")
    except Exception as e:
        print(f"❌ Error al inicializar datos: {e}")

@app.get("/")
def read_root():
    return {"message": "Bienvenido a Mahalanobis Career RecSys API"}

@app.post("/recommend", response_model=RecommendationResponse)
def get_recommendations(profile: StudentProfileRequest):
    if recommender is None:
        raise HTTPException(status_code=500, detail="El modelo no está inicializado")
        
    profile_dict = profile.dict()
    
    # Obtener el top 5 de carreras recomendadas
    recs_df = recommender.recommend(profile_dict, top_n=5)
    
    # Formatear la respuesta
    top_careers = []
    for _, row in recs_df.iterrows():
        top_careers.append({
            "career": row["career"],
            "match_percentage": round(row["match_percentage"], 2),
            "mahalanobis_dist": round(row["mahalanobis_dist"], 2)
        })
        
    return RecommendationResponse(top_careers=top_careers)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
