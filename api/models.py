from pydantic import BaseModel, Field

class StudentProfileRequest(BaseModel):
    # Aptitudes
    math: int = Field(..., ge=0, le=100, description="Puntaje Lógico-Matemático")
    science: int = Field(..., ge=0, le=100, description="Puntaje Ciencias Naturales")
    literature: int = Field(..., ge=0, le=100, description="Puntaje Comunicación y Letras")
    
    # RIASEC
    r_realistic: int = Field(..., ge=0, le=100, description="Realista")
    i_investigative: int = Field(..., ge=0, le=100, description="Investigador")
    a_artistic: int = Field(..., ge=0, le=100, description="Artístico")
    s_social: int = Field(..., ge=0, le=100, description="Social")
    e_enterprising: int = Field(..., ge=0, le=100, description="Emprendedor")
    c_conventional: int = Field(..., ge=0, le=100, description="Convencional")
    
    # Strong Interest
    strong_leadership: int = Field(..., ge=0, le=100, description="Liderazgo / Influencia")
    strong_practical: int = Field(..., ge=0, le=100, description="Trabajo Práctico / Mecánico")
    strong_tech: int = Field(..., ge=0, le=100, description="Análisis de Datos / Tecnología")

class CareerRecommendation(BaseModel):
    career: str
    match_percentage: float
    mahalanobis_dist: float
    
class RecommendationResponse(BaseModel):
    top_careers: list[CareerRecommendation]
