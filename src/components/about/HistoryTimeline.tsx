"use client";

import { useScrollReveal } from '@/service/hooks/useScrollReveal';

const HistoryTimeline = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  const milestones = [
    {
      year: "2023",
      title: "Nace la Idea",
      description: "Un grupo de veterinarios, jinetes y desarrolladores detectaron un problema crítico: la compraventa de caballos carecía de una plataforma profesional y segura. Así nació la visión de HorseTrust.",
      highlight: "Primera inversión ángel recibida"
    },
    {
      year: "2024",
      title: "Lanzamiento Beta",
      description: "Lanzamos nuestra primera versión con 500 usuarios pioneros. Más de 120 transacciones exitosas demostraron que el mercado necesitaba esta solución. Implementamos verificación veterinaria digital.",
      highlight: "500+ usuarios activos"
    },
    {
      year: "2025",
      title: "Expansión Regional",
      description: "Abrimos operaciones en Argentina, México y Chile. Asociaciones con criaderos premium y haras de renombre nos consolidaron como referentes en Latinoamérica.",
      highlight: "3 países, 50+ criaderos asociados"
    },
    {
      year: "2026",
      title: "HorseTrust Global",
      description: "Lanzamos nuestra tecnología de certificación digital para garantizar la trazabilidad de cada ejemplar. La comunidad superó los 10.000 miembros activos en toda la región.",
      highlight: "10.000+ miembros activos"
    }
  ];

  return (
    <section ref={sectionRef} className="scroll-reveal py-24 bg-[#1F140D] text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="w-12 h-0.5 bg-[#C9A24D] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Historia</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Cada gran proyecto comienza con una necesidad. Esta es la historia de cómo transformamos
            una idea en la plataforma ecuestre más confiable de la región.
          </p>
        </div>

        <div className="relative">
          {/* linea de tiempo central*/}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-gray-700 via-[#C9A24D] to-gray-700"></div>

          <div className="space-y-16">
            {milestones.map((item, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* espacio vacio para alternancia */}
                <div className="flex-1 w-full"></div>

                {/* punto central */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#C9A24D] rounded-full border-4 border-[#1F140D] shadow-lg shadow-[#C9A24D]/30 z-10 hidden md:block"></div>

                {/* contenido de las cards */}
                <div className="flex-1 w-full md:px-10 text-center md:text-left">
                  <div className={`bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#C9A24D]/30 transition-all duration-500 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="inline-block text-[#C9A24D] font-bold text-2xl mb-3">{item.year}</span>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">{item.description}</p>
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#C9A24D] bg-[#C9A24D]/10 px-3 py-1 rounded-full">
                      {item.highlight}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistoryTimeline