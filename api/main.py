from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

from models import StudentProfileRequest, RecommendationResponse
from services.recommender import CareerRecommenderMahalanobis

app = FastAPI(
    title="Mahalanobis Career RecSys API",
    description="API con modelo 16D: 10 EBR + 6 Transversales (O*NET)",
    version="1.2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

careers_df = None
recommender = None

FEATURES = [
    'ebr_matematica', 'ebr_comunicacion', 'ebr_ciencia_tecnologia', 
    'ebr_ciencias_sociales', 'ebr_dpcc', 'ebr_ingles', 'ebr_ept', 
    'ebr_arte_cultura', 'ebr_educacion_fisica', 'ebr_religion',
    'transversal_tic', 'transversal_autonomia',
    'transversal_resolucion_problemas', 'transversal_pensamiento_critico',
    'transversal_percepcion_social', 'transversal_toma_decisiones'
]

@app.on_event("startup")
async def startup_event():
    global careers_df, recommender
    try:
        data_path_careers = os.path.join(os.path.dirname(__file__), '..', 'data', 'careers.csv') # Lee el perfil de la matriz de carreras UNAP (16D) validada por profesionales del area
        careers_df = pd.read_csv(data_path_careers)
        recommender = CareerRecommenderMahalanobis(careers_df, FEATURES)
        print("✅ Sistema de recomendación inicializado correctamente.")
    except Exception as e:
        print(f"❌ Error al inicializar datos: {e}")

@app.get("/")
def read_root():
    return {"message": "Bienvenido a Mahalanobis Career RecSys API (16D)"}

@app.post("/recommend", response_model=RecommendationResponse)
def get_recommendations(profile: StudentProfileRequest):
    if recommender is None:
        raise HTTPException(status_code=500, detail="El modelo no está inicializado")
        
    profile_dict = profile.model_dump() if hasattr(profile, 'model_dump') else profile.dict()
    recs_df = recommender.recommend(profile_dict, top_n=5)
    
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
