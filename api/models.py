from pydantic import BaseModel, Field

class StudentProfileRequest(BaseModel):
    # Áreas Curriculares EBR (10)
    ebr_matematica: int = Field(..., ge=0, le=100)
    ebr_comunicacion: int = Field(..., ge=0, le=100)
    ebr_ciencia_tecnologia: int = Field(..., ge=0, le=100)
    ebr_ciencias_sociales: int = Field(..., ge=0, le=100)
    ebr_dpcc: int = Field(..., ge=0, le=100)
    ebr_ingles: int = Field(..., ge=0, le=100)
    ebr_ept: int = Field(..., ge=0, le=100)
    ebr_arte_cultura: int = Field(..., ge=0, le=100)
    ebr_educacion_fisica: int = Field(..., ge=0, le=100)
    ebr_religion: int = Field(..., ge=0, le=100)
    
    # Competencias Transversales O*NET (6)
    transversal_tic: int = Field(..., ge=0, le=100, description="Interacting With Computers")
    transversal_autonomia: int = Field(..., ge=0, le=100, description="Active Learning")
    transversal_resolucion_problemas: int = Field(..., ge=0, le=100, description="Complex Problem Solving")
    transversal_pensamiento_critico: int = Field(..., ge=0, le=100, description="Critical Thinking")
    transversal_percepcion_social: int = Field(..., ge=0, le=100, description="Social Perceptiveness")
    transversal_toma_decisiones: int = Field(..., ge=0, le=100, description="Judgment and Decision Making")

class CareerRecommendation(BaseModel):
    career: str
    match_percentage: float
    mahalanobis_dist: float
    
class RecommendationResponse(BaseModel):
    top_careers: list[CareerRecommendation]
