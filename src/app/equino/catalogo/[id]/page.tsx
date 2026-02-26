import { notFound } from "next/navigation";
import { horseService } from "@/services/horseService";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  Layers,
  Tag,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import HorseGallery from "@/components/catalogo/HorseGallery";
import { ContactButton } from "@/components/catalogo/ContactButton";
import FavoriteButton from "@/components/ui/FavoriteButton";

export default async function HorseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const horseId = parseInt(resolvedParams.id, 10);

  let horse = null;
  try {
    horse = await horseService.getHorseById(horseId);
  } catch (error) {
    console.error("Error fetching horse details:", error);
  }

  if (!horse) {
    return notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const isVerified = horse.status === 'VERIFIED';
  const titleDisplay = horse.description ? horse.description : `${horse.breed} de ${horse.age} años`;
  // Fallbacks per OpenApi shape not having array for gallery initially, etc.
  const galleryImages = horse.imageIds && horse.imageIds.length > 0 ? horse.imageIds : ['https://via.placeholder.com/800x600?text=Sin+Imagen'];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb section */}
        <div className="mb-6">
          <Link
            href="/equino/catalogo"
            className="inline-flex items-center text-[#000000] underline hover:text-[#B38F43] transition-colors font-medium text-lg"
          >
            <ChevronLeft size={16} className="mr-1 " />
            Volver al Catálogo
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Gallery Column */}
            <HorseGallery images={galleryImages} category={horse.discipline} />

            {/* Details Column */}
            <div className="p-8 md:p-10 flex flex-col">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-3xl font-bold text-[#1F140D]">
                    {titleDisplay}
                  </h1>
                  <FavoriteButton horseId={horse.id} />
                </div>
                <p className="text-xl text-[#C9A24D] font-bold">
                  {formatPrice(horse.price)}
                </p>
              </div>

              {/* Tags / Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm font-medium">
                  <Tag size={16} />
                  {horse.breed}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                  <MapPin size={16} />
                  {horse.location}
                </span>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Calendar size={14} /> Edad
                  </div>
                  <div className="font-semibold text-gray-900">
                    {horse.age} años
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Layers size={14} /> Temperamento
                  </div>
                  <div className="font-semibold text-gray-900">
                    {horse.temperament}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-gray-500 text-sm mb-1">Disciplina</div>
                  <div className="font-semibold text-gray-900">
                    {horse.discipline}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-gray-500 text-sm mb-1">Sexo</div>
                  <div className="font-semibold text-gray-900">
                    {horse.gender}
                  </div>
                </div>
              </div>

              {/* Description */}
              {horse.description && (
                <div className="mb-8 flex-grow">
                  <h3 className="text-lg font-bold text-[#1F140D] mb-3">
                    Descripción
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {horse.description}
                  </p>
                </div>
              )}

              {/* Guaranteed */}
              {isVerified && (
                <div className="flex items-center gap-3 bg-green-50 text-green-800 p-4 rounded-xl mb-8 border border-green-100">
                  <CheckCircle2 size={24} className="text-green-600" />
                  <div>
                    <p className="font-semibold text-sm">Caballo Verificado</p>
                    <p className="text-xs opacity-90 mt-0.5">
                      Sanidad al día y documentación en regla en la plataforma.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <ContactButton
                  horseId={horse.id.toString()}
                  horseName={titleDisplay}
                  vendorId={horse.ownerId.toString()}
                  vendorName={`Vendedor #${horse.ownerId}`}
                />
                <button className="flex-1 bg-white border-2 border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-white px-6 py-3.5 rounded-xl font-bold transition-colors">
                  Hacer Oferta
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
