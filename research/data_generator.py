import pandas as pd
import os

# Las 10 áreas curriculares de la EBR + 6 Competencias Transversales (O*NET + EBR)
FEATURES = [
    # EBR
    'ebr_matematica', 'ebr_comunicacion', 'ebr_ciencia_tecnologia', 
    'ebr_ciencias_sociales', 'ebr_dpcc', 'ebr_ingles', 'ebr_ept', 
    'ebr_arte_cultura', 'ebr_educacion_fisica', 'ebr_religion',
    
    # Transversales (EBR 28 y 29 / O*NET)
    'transversal_tic', # Interacting with Computers
    'transversal_autonomia', # Active Learning
    'transversal_resolucion_problemas', # Complex Problem Solving
    'transversal_pensamiento_critico', # Critical Thinking
    'transversal_percepcion_social', # Social Perceptiveness
    'transversal_toma_decisiones' # Judgment and Decision Making
]

PROFILES = {
    'ENGINEERING': {
        'ebr_matematica': 85, 'ebr_comunicacion': 50, 'ebr_ciencia_tecnologia': 80, 
        'ebr_ciencias_sociales': 40, 'ebr_dpcc': 50, 'ebr_ingles': 60, 'ebr_ept': 70, 
        'ebr_arte_cultura': 40, 'ebr_educacion_fisica': 50, 'ebr_religion': 50,
        'transversal_tic': 85, 'transversal_autonomia': 70,
        'transversal_resolucion_problemas': 85, 'transversal_pensamiento_critico': 80,
        'transversal_percepcion_social': 50, 'transversal_toma_decisiones': 70
    },
    'HEALTH': {
        'ebr_matematica': 60, 'ebr_comunicacion': 60, 'ebr_ciencia_tecnologia': 90, 
        'ebr_ciencias_sociales': 60, 'ebr_dpcc': 70, 'ebr_ingles': 60, 'ebr_ept': 50, 
        'ebr_arte_cultura': 40, 'ebr_educacion_fisica': 60, 'ebr_religion': 60,
        'transversal_tic': 60, 'transversal_autonomia': 80,
        'transversal_resolucion_problemas': 80, 'transversal_pensamiento_critico': 85,
        'transversal_percepcion_social': 85, 'transversal_toma_decisiones': 85
    },
    'SOCIAL': {
        'ebr_matematica': 40, 'ebr_comunicacion': 85, 'ebr_ciencia_tecnologia': 40, 
        'ebr_ciencias_sociales': 90, 'ebr_dpcc': 85, 'ebr_ingles': 70, 'ebr_ept': 40, 
        'ebr_arte_cultura': 60, 'ebr_educacion_fisica': 50, 'ebr_religion': 60,
        'transversal_tic': 55, 'transversal_autonomia': 75,
        'transversal_resolucion_problemas': 65, 'transversal_pensamiento_critico': 80,
        'transversal_percepcion_social': 90, 'transversal_toma_decisiones': 75
    },
    'BUSINESS': {
        'ebr_matematica': 70, 'ebr_comunicacion': 70, 'ebr_ciencia_tecnologia': 40, 
        'ebr_ciencias_sociales': 70, 'ebr_dpcc': 70, 'ebr_ingles': 80, 'ebr_ept': 80, 
        'ebr_arte_cultura': 40, 'ebr_educacion_fisica': 50, 'ebr_religion': 50,
        'transversal_tic': 70, 'transversal_autonomia': 75,
        'transversal_resolucion_problemas': 75, 'transversal_pensamiento_critico': 75,
        'transversal_percepcion_social': 70, 'transversal_toma_decisiones': 85
    },
    'ART_EDU': {
        'ebr_matematica': 40, 'ebr_comunicacion': 75, 'ebr_ciencia_tecnologia': 40, 
        'ebr_ciencias_sociales': 75, 'ebr_dpcc': 70, 'ebr_ingles': 60, 'ebr_ept': 60, 
        'ebr_arte_cultura': 90, 'ebr_educacion_fisica': 80, 'ebr_religion': 60,
        'transversal_tic': 60, 'transversal_autonomia': 70,
        'transversal_resolucion_problemas': 60, 'transversal_pensamiento_critico': 70,
        'transversal_percepcion_social': 85, 'transversal_toma_decisiones': 65
    }
}

CAREERS_MAPPING = {
    'Administración': 'BUSINESS', 'Antropología': 'SOCIAL', 'Arquitectura y Urbanismo': 'ENGINEERING',
    'Arte: Especialidad de Artes Plásticas': 'ART_EDU', 'Arte: Especialidad de Música': 'ART_EDU',
    'Ciencias Biológicas': 'HEALTH', 'Ciencias Contables': 'BUSINESS', 'Ciencias de la Comunicación Social': 'SOCIAL',
    'Ciencias Físico Matemáticas': 'ENGINEERING', 'Derecho': 'SOCIAL', 'Educación Física': 'ART_EDU',
    'Educación Inicial': 'ART_EDU', 'Educación Primaria': 'ART_EDU', 'Educación Secundaria': 'ART_EDU',
    'Enfermería': 'HEALTH', 'Ingeniería Agrícola': 'ENGINEERING', 'Ingeniería Agroindustrial': 'ENGINEERING',
    'Ingeniería Agronómica': 'ENGINEERING', 'Ingeniería Civil': 'ENGINEERING',
    'Ingeniería de Inteligencia Artificial y Ciencia de Datos': 'ENGINEERING', 'Ingeniería de Minas': 'ENGINEERING',
    'Ingeniería de Sistemas': 'ENGINEERING', 'Ingeniería de Telecomunicaciones': 'ENGINEERING',
    'Ingeniería Económica': 'BUSINESS', 'Ingeniería Electrónica': 'ENGINEERING', 'Ingeniería Empresarial': 'BUSINESS',
    'Ingeniería Estadística e Informática': 'ENGINEERING', 'Ingeniería Geológica': 'ENGINEERING',
    'Ingeniería Mecánica Eléctrica': 'ENGINEERING', 'Ingeniería Metalúrgica': 'ENGINEERING',
    'Ingeniería Química': 'ENGINEERING', 'Ingeniería Topográfica y Agrimensura': 'ENGINEERING',
    'Medicina Humana': 'HEALTH', 'Medicina Veterinaria y Zootecnia': 'HEALTH',
    'Nutrición Humana': 'HEALTH', 'Odontología': 'HEALTH', 'Sociología': 'SOCIAL',
    'Trabajo Social': 'SOCIAL', 'Turismo': 'SOCIAL'
}

# Inyección de métricas O*NET para competencias transversales
CAREER_OVERRIDES = {
    'Arquitectura y Urbanismo': {'ebr_arte_cultura': 85, 'transversal_tic': 88, 'transversal_autonomia': 69, 'transversal_resolucion_problemas': 75, 'transversal_pensamiento_critico': 75, 'transversal_percepcion_social': 60, 'transversal_toma_decisiones': 65},
    'Ingeniería de Sistemas': {'transversal_tic': 99, 'transversal_autonomia': 75, 'transversal_resolucion_problemas': 90, 'transversal_pensamiento_critico': 85, 'transversal_percepcion_social': 50, 'transversal_toma_decisiones': 75},
    'Ingeniería Estadística e Informática': {'ebr_matematica': 90, 'transversal_tic': 94, 'transversal_autonomia': 78, 'transversal_resolucion_problemas': 85, 'transversal_pensamiento_critico': 85, 'transversal_percepcion_social': 40, 'transversal_toma_decisiones': 70},
    'Derecho': {'ebr_comunicacion': 90, 'ebr_dpcc': 95, 'transversal_tic': 76, 'transversal_autonomia': 69, 'transversal_resolucion_problemas': 80, 'transversal_pensamiento_critico': 90, 'transversal_percepcion_social': 85, 'transversal_toma_decisiones': 90},
    'Medicina Humana': {'ebr_ciencia_tecnologia': 95, 'transversal_tic': 78, 'transversal_autonomia': 85, 'transversal_resolucion_problemas': 95, 'transversal_pensamiento_critico': 95, 'transversal_percepcion_social': 90, 'transversal_toma_decisiones': 95},
    'Sociología': {'ebr_ciencias_sociales': 95, 'transversal_tic': 68, 'transversal_autonomia': 72, 'transversal_resolucion_problemas': 75, 'transversal_pensamiento_critico': 85, 'transversal_percepcion_social': 85, 'transversal_toma_decisiones': 70},
    'Educación Física': {'ebr_educacion_fisica': 95, 'ebr_arte_cultura': 50, 'transversal_tic': 45, 'transversal_autonomia': 56, 'transversal_resolucion_problemas': 55, 'transversal_pensamiento_critico': 60, 'transversal_percepcion_social': 80, 'transversal_toma_decisiones': 65},
    'Ciencias de la Comunicación Social': {'ebr_comunicacion': 95, 'transversal_tic': 75, 'transversal_autonomia': 70, 'transversal_resolucion_problemas': 65, 'transversal_pensamiento_critico': 80, 'transversal_percepcion_social': 85, 'transversal_toma_decisiones': 75},
    'Ciencias Contables': {'transversal_tic': 94, 'transversal_autonomia': 63, 'transversal_resolucion_problemas': 75, 'transversal_pensamiento_critico': 80, 'transversal_percepcion_social': 60, 'transversal_toma_decisiones': 85},
    'Trabajo Social': {'transversal_tic': 63, 'transversal_autonomia': 63, 'transversal_resolucion_problemas': 70, 'transversal_pensamiento_critico': 75, 'transversal_percepcion_social': 95, 'transversal_toma_decisiones': 80},
    'Turismo': {'transversal_tic': 55, 'transversal_autonomia': 53, 'transversal_resolucion_problemas': 60, 'transversal_pensamiento_critico': 65, 'transversal_percepcion_social': 85, 'transversal_toma_decisiones': 70},
}

def generate_data():
    career_rows = []
    
    for career, area in CAREERS_MAPPING.items():
        profile = PROFILES[area].copy()
        profile['career'] = career
        
        if career in CAREER_OVERRIDES:
            profile.update(CAREER_OVERRIDES[career])
            
        career_rows.append(profile)
        
    df_careers = pd.DataFrame(career_rows)
    df_careers = df_careers[['career'] + FEATURES]
    
    os.makedirs('../data', exist_ok=True)
    df_careers.to_csv('../data/careers.csv', index=False)
    
    print(f"✅ Matriz estática generada: {len(df_careers)} carreras x {len(FEATURES)} columnas.")
    print("✅ Dimensiones: 10 EBR + 6 Transversales (O*NET).")

if __name__ == "__main__":
    generate_data()
