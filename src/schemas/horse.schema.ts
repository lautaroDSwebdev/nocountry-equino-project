import z from "zod";

export const createHorseSchema = z.object({
  title: z.string().min(2, "Elija un titulo"),
  breed: z.string().min(2, "Seleccione una raza"),
  ageYears: z.number().min(0, "Debe ser al menos 0").max(40, "Máximo 40 años"),
  ageMonths: z.number().min(0, "Mínimo 0").max(11, "Máximo 11 meses"),
  gender: z.enum(["STALLION", "MARE", "GELDING"]),
  temperament: z.enum(["CALM", "MODERATE", "ENERGIC"]),
  discipline: z.enum([
    "RACING", "SHOW_JUMPING", "DRESSAGE", "POLO", "RECREATIONAL", "ENDURANCE"
  ]),
  price: z.number().min(0.01, "El precio debe ser mayor a 0"),
  location: z.string().min(2, "La ubicación es requerida"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  videoUrl: z.string().url("Ingrese una URL válida (ej. Youtube)").optional().or(z.literal("")),
});

export type CreateHorseFormValues = z.infer<typeof createHorseSchema>;