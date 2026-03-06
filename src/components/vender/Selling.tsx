"use client"

import  { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { CldUploadWidget } from "next-cloudinary";
import { Loader2, X, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { horseService } from "@/services/horseService";
import { authStore } from "@/store/token-store";
import { BREEDS } from "@/constants/catalogFilters";
import { useEffect } from "react";
import { CreateHorseFormValues, createHorseSchema } from "@/schemas/horse.schema";



export default function Selling() {
  const router = useRouter();
  const tokenState = authStore((state) => state.token);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!tokenState?.access_token) {
      toast.error("Debes iniciar sesión para publicar");
      router.push("/login");
    }
  }, [tokenState, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateHorseFormValues>({
    resolver: zodResolver(createHorseSchema),
    defaultValues: {
      ageYears: 0,
      ageMonths: 0,
      price: 0,
    },
  });

  const onSubmit = async (data: CreateHorseFormValues) => {
    if (!tokenState?.access_token) {
      toast.error("Debes iniciar sesión para publicar");
      router.push("/login");
      return;
    }

    if (images.length === 0) {
      toast.error("Es obligatorio cargar al menos una imagen del caballo");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: any = {
        title: data.title,
        breed: data.breed,
        age: Number(data.ageYears),
        gender: data.gender,
        temperament: data.temperament,
        discipline: data.discipline,
        price: Number(data.price),
        location: data.location,
        description: data.description,
        imageIds: images,
      };

      if (data.videoUrl) {
        payload.videoUrl = data.videoUrl;
      }

      await horseService.createHorse(payload, tokenState.access_token);

      Swal.fire({
        title: "¡Publicado!",
        text: "El caballo ha sido publicado exitosamente.",
        icon: "success",
        confirmButtonColor: "#C9A24D",
      }).then(() => {
        router.push("/equino/catalogo");
      });
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al publicar el caballo");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-[#1F140D] sm:text-5xl">
            Vende tu Caballo
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Completa los detalles a continuación para listar tu caballo en nuestro catálogo.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              {/* Sección: Información Básica */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#1F140D] border-b pb-2">
                  Información Básica
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título del caballo *
                  </label>
                  <input
                    {...register("title")}
                    className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#C9A24D] focus:ring-[#C9A24D] sm:text-sm ${errors.title ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Ej. Caballo de salto, Yegua criolla..."
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Raza *
                    </label>
                    <select
                      {...register("breed")}
                      className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#C9A24D] focus:ring-[#C9A24D] sm:text-sm ${errors.breed ? "border-red-500" : "border-gray-300"
                        }`}
                    >
                      <option value="">Selecciona una raza</option>
                      {BREEDS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    {errors.breed && (
                      <p className="mt-1 text-sm text-red-600">{errors.breed.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Género *
                    </label>
                    <select
                      {...register("gender")}
                      className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#C9A24D] focus:ring-[#C9A24D] sm:text-sm ${errors.gender ? "border-red-500" : "border-gray-300"
                        }`}
                    >
                      <option value="">Selecciona un género</option>
                      <option value="STALLION">Padrillo / Semental</option>
                      <option value="MARE">Yegua</option>
                      <option value="GELDING">Castrado</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Temperamento *
                    </label>
                    <select
                      {...register("temperament")}
                      className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#C9A24D] focus:ring-[#C9A24D] sm:text-sm ${errors.temperament ? "border-red-500" : "border-gray-300"
                        }`}
                    >
                      <option value="">Selecciona un temperamento</option>
                      <option value="CALM">Tranquilo</option>
                      <option value="MODERATE">Moderado</option>
                      <option value="ENERGIC">Enérgico</option>
                    </select>
                    {errors.temperament && (
                      <p className="mt-1 text-sm text-red-600">{errors.temperament.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Disciplina *
                    </label>
                    <select
                      {...register("discipline")}
                      className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#C9A24D] focus:ring-[#C9A24D] sm:text-sm ${errors.discipline ? "border-red-500" : "border-gray-300"
                        }`}
                    >
                      <option value="">Selecciona una disciplina</option>
                      <option value="RACING">Carreras</option>
                      <option value="SHOW_JUMPING">Salto</option>
                      <option value="DRESSAGE">Doma</option>
                      <option value="POLO">Polo</option>
                      <option value="RECREATIONAL">Recreacional</option>
                      <option value="ENDURANCE">Endurance / Resistencia</option>
                    </select>
                    {errors.discipline && (
                      <p className="mt-1 text-sm text-red-600">{errors.discipline.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Edad (Años) *
                      </label>
                      <input
                        type="number"
                        {...register("ageYears", { valueAsNumber: true })}
                        className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#C9A24D] focus:ring-[#C9A24D] sm:text-sm ${errors.ageYears ? "border-red-500" : "border-gray-300"
                          }`}
                      />
                      {errors.ageYears && (
                        <p className="mt-1 text-sm text-red-600">{errors.ageYears.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Edad (Meses) *
                      </label>
                      <input
                        type="number"
                        {...register("ageMonths", { valueAsNumber: true })}
                        className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#C9A24D] focus:ring-[#C9A24D] sm:text-sm ${errors.ageMonths ? "border-red-500" : "border-gray-300"
                          }`}
                      />
                      {errors.ageMonths && (
                        <p className="mt-1 text-sm text-red-600">{errors.ageMonths.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección: Precio y Ubicación */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#1F140D] border-b pb-2">
                  Condiciones y Ubicación
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Precio (USD) *
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">USD</span>
                      </div>
                      <input
                        type="number"
                        step="100"
                        {...register("price", { valueAsNumber: true })}
                        className={`block w-full rounded-md border pl-12 py-2 pr-3 shadow-sm focus:border-[#C9A24D] focus:ring-[#C9A24D] sm:text-sm ${errors.price ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                    )}
                  </div>



                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Provincia / Ubicación *
                    </label>
                    <input
                      {...register("location")}
                      className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#C9A24D] focus:ring-[#C9A24D] sm:text-sm ${errors.location ? "border-red-500" : "border-gray-300"
                        }`}
                      placeholder="Ej. Buenos Aires, Argentina"
                    />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Sección: Detalles */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#1F140D] border-b pb-2">
                  Detalles y Multimedia
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción / Biografía *
                  </label>
                  <textarea
                    rows={4}
                    {...register("description")}
                    className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#C9A24D] focus:ring-[#C9A24D] sm:text-sm ${errors.description ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="Describe las características, historia y aptitudes del caballo..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL del Video (opcional)
                  </label>
                  <input
                    {...register("videoUrl")}
                    className={`block w-full rounded-md border py-2 px-3 shadow-sm focus:border-[#C9A24D] focus:ring-[#C9A24D] sm:text-sm ${errors.videoUrl ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  {errors.videoUrl && (
                    <p className="mt-1 text-sm text-red-600">{errors.videoUrl.message}</p>
                  )}
                </div>

                {/* Cloudinary Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fotos del Caballo *
                  </label>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                      {images.map((publicId, index) => (
                        <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                          <img
                            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'}/image/upload/c_fill,w_300,h_300/${publicId}`}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-600/90 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-sm"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "horsetrust"}
                    onSuccess={(result: any) => {
                      if (result?.info?.public_id) {
                        setImages((prev) => [...prev, result.info.public_id]);
                      }
                    }}
                    options={{
                      maxFiles: 5,
                      sources: ["local", "url", "camera"],
                      folder: "no-country/horse-trust/horses", // Directorio específico
                    }}
                  >
                    {({ open }) => {
                      return (
                        <button
                          type="button"
                          onClick={() => {
                            open();
                          }}
                          className="w-full flex justify-center items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 text-center hover:border-[#C9A24D] hover:bg-orange-50/50 transition-colors group"
                        >
                          <UploadCloud className="text-gray-400 group-hover:text-[#C9A24D]" size={32} />
                          <span className="text-sm font-medium text-gray-600 group-hover:text-[#C9A24D]">
                            Haz clic para subir imágenes
                          </span>
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white bg-[#1F140D] hover:bg-black font-semibold shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Publicando...
                    </>
                  ) : (
                    "Publicar Caballo"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
