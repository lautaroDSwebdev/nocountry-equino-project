import { DISCIPLINE_TRANSLATIONS } from '../utils/translations';

export const LOCATIONS = ["Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Salta"];
export const BREEDS = ["Pura Sangre", "Cuarto de Milla", "Árabe", "Criollo", "Frisón"];
export const VERIFICATION_STATUSES = ["Verificado", "No Verificado"];

export const CATALOG_FILTERS = [
    { title: "Verificación", key: "verification", items: VERIFICATION_STATUSES },
    { title: "Razas", key: "breeds", items: BREEDS },
    { title: "Disciplinas", key: "disciplines", items: Object.keys(DISCIPLINE_TRANSLATIONS).map(k => DISCIPLINE_TRANSLATIONS[k]) },
    { title: "Ubicación", key: "locations", items: LOCATIONS },
];
