import { notFound } from "next/navigation";
import { HORSES } from "@/mock/mockHorses";
import Link from "next/link";
import {
  ChevronLeft,
  Ruler,
  Weight,
  Tag,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import HorseGallery from "@/components/catalogo/HorseGallery";
import { ContactButton } from "@/components/catalogo/ContactButton";

export default async function HorseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const horseId = parseInt(resolvedParams.id, 10);
  const horse = HORSES.find((h) => h.id === horseId);

  if (!horse) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb section */}
        <div className="mb-6">
          <Link
            href="/equino/catalogo"
            className="inline-flex items-center text-[#000000] underline hover:text-[#B38F43] transition-colors font-medium text-sm"
          >
            <ChevronLeft size={16} className="mr-1" />
            Volver al Catálogo
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Gallery Column */}
            <HorseGallery images={horse.images} category={horse.category} />

            {/* Details Column */}
            <div className="p-8 md:p-10 flex flex-col">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#1F140D] mb-2">
                  {horse.name}
                </h1>
                <p className="text-xl text-[#C9A24D] font-bold">
                  {horse.price}
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
                  <div className="text-gray-500 text-sm mb-1">Edad</div>
                  <div className="font-semibold text-gray-900">
                    {horse.age}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-gray-500 text-sm mb-1">Pelaje</div>
                  <div className="font-semibold text-gray-900">
                    {horse.color}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Ruler size={14} /> Alzada
                  </div>
                  <div className="font-semibold text-gray-900">
                    {horse.height}
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
              <div className="mb-8 flex-grow">
                <h3 className="text-lg font-bold text-[#1F140D] mb-3">
                  Descripción
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {horse.description}
                </p>
              </div>

              {/* Guaranteed */}
              <div className="flex items-center gap-3 bg-green-50 text-green-800 p-4 rounded-xl mb-8 border border-green-100">
                <CheckCircle2 size={24} className="text-green-600" />
                <div>
                  <p className="font-semibold text-sm">Caballo Verificado</p>
                  <p className="text-xs opacity-90 mt-0.5">
                    Sanidad al día y documentación en regla.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <ContactButton
                  horseId={horse.id.toString()}
                  horseName={horse.name}
                  vendorId={horse.vendor.id}
                  vendorName={horse.vendor.name}
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
