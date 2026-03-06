export const DISCIPLINE_TRANSLATIONS: Record<string, string> = {
    RACING: 'Carreras',
    SHOW_JUMPING: 'Salto',
    DRESSAGE: 'Doma',
    POLO: 'Polo',
    RECREATIONAL: 'Recreacional',
    ENDURANCE: 'Endurance',
};

export const REVERSE_DISCIPLINE_MAP: Record<string, string> = {
    'Salto': 'SHOW_JUMPING',
    'Doma': 'DRESSAGE',
    'Polo': 'POLO',
    'Endurance': 'ENDURANCE',
    'Carreras': 'RACING',
    'Recreacional': 'RECREATIONAL',
};

export const GENDER_TRANSLATIONS: Record<string, string> = {
    STALLION: 'Semental',
    MARE: 'Yegua',
    GELDING: 'Castrado',
};

export const TEMPERAMENT_TRANSLATIONS: Record<string, string> = {
    CALM: 'Tranquilo',
    MODERATE: 'Moderado',
    ENERGIC: 'Enérgico',
};

export const STATUS_TRANSLATIONS: Record<string, string> = {
    PENDING_DATA: 'Datos Pendientes',
    PENDING_VERIFICATION: 'Verificación Pendiente',
    VERIFIED: 'Verificado',
    REJECTED: 'Rechazado',
};

export const BREED_TRANSLATIONS: Record<string, string> = {
    'Pura Sangre': 'Pura Sangre',
    'Cuarto de Milla': 'Cuarto de Milla',
    'Árabe': 'Árabe',
    'Criollo': 'Criollo',
    'Frisón': 'Frisón',
};

export const translateDiscipline = (val: string | undefined): string => {
    if (!val) return 'Desconocida';
    return DISCIPLINE_TRANSLATIONS[val] || val;
};

export const translateGender = (val: string | undefined): string => {
    if (!val) return 'Desconocido';
    return GENDER_TRANSLATIONS[val] || val;
};

export const translateTemperament = (val: string | undefined): string => {
    if (!val) return 'Desconocido';
    return TEMPERAMENT_TRANSLATIONS[val] || val;
};

export const translateStatus = (val: string | undefined): string => {
    if (!val) return 'Desconocido';
    return STATUS_TRANSLATIONS[val] || val;
};
