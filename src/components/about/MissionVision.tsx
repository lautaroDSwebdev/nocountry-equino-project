"use client";

import { Target, Eye, ShieldCheck, HeartHandshake, Lightbulb, Users } from 'lucide-react';
import { useScrollReveal } from '@/service/hooks/useScrollReveal';

const MissionVision = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  const pilares = [
    { icon: ShieldCheck, title: "Seguridad", desc: "Verificación rigurosa de cada ejemplar y vendedor certificado." },
    { icon: HeartHandshake, title: "Confianza", desc: "Tratos transparentes con protección al comprador garantizada." },
    { icon: Lightbulb, title: "Innovación", desc: "Tecnología de punta aplicada al mercado ecuestre tradicional." },
    { icon: Users, title: "Comunidad", desc: "Red de apasionados que comparten conocimiento y experiencias." },
  ];

  return (
    <section ref={sectionRef} className="scroll-reveal py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Intro */}
        <div className="text-center mb-16">
          <div className="w-12 h-0.5 bg-[#C9A24D] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F140D] mb-4">
            Lo Que Nos Define
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Creemos que el mundo ecuestre merece una plataforma a la altura de su tradición.
            Nuestra misión y visión guían cada decisión que tomamos.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-stretch mb-20">
          {/* Misión */}
          <div className="flex flex-col gap-4 p-8 md:p-10 rounded-2xl bg-[#F9F7F5] border-l-4 border-[#C9A24D] hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#C9A24D]/10 rounded-2xl flex items-center justify-center mb-2">
              <Target className="text-[#C9A24D]" size={30} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Nuestra Misión</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Democratizar y profesionalizar el mercado equino global, proporcionando una plataforma
              <span className="font-semibold text-[#C9A24D]"> segura, transparente y eficiente</span>.
              Nos esforzamos por conectar a vendedores y compradores con herramientas tecnológicas
              que garantizan el bienestar animal y la confianza en cada transacción.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Cada caballo tiene una historia, y cada comprador merece conocerla.
              Facilitamos ese encuentro con documentación verificada, historial veterinario
              y un proceso de compra diseñado para proteger a ambas partes.
            </p>
          </div>

          {/* Visión */}
          <div className="flex flex-col gap-4 p-8 md:p-10 rounded-2xl bg-[#F9F7F5] border-l-4 border-[#1F140D] hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#1F140D]/5 rounded-2xl flex items-center justify-center mb-2">
              <Eye className="text-[#1F140D]" size={30} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Nuestra Visión</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Convertirnos en el <span className="font-semibold text-gray-900">estándar de oro mundial</span> para
              la comercialización de caballos, siendo reconocidos no solo por nuestra innovación tecnológica,
              sino por fomentar una comunidad ética apasionada por el legado ecuestre.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Imaginamos un futuro donde comprar o vender un caballo sea tan seguro y transparente
              como cualquier otra transacción premium, sin importar la distancia ni las fronteras.
            </p>
          </div>
        </div>

        {/* Pilares / Valores */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[#1F140D] mb-12">Nuestros Pilares</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {pilares.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[#F9F7F5] hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-[#C9A24D]/10 rounded-full flex items-center justify-center group-hover:bg-[#C9A24D]/20 transition-colors duration-300">
                  <item.icon className="text-[#C9A24D]" size={32} strokeWidth={1.2} />
                </div>
                <h4 className="font-bold text-lg text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;