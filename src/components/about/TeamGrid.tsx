"use client";

import { Linkedin, Twitter, Mail } from 'lucide-react';
import { useScrollReveal } from '@/service/hooks/useScrollReveal';

const TeamGrid = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  const team = [
    {
      name: "Ana Martínez",
      role: "Fundadora & CEO",
      bio: "Ex-amazona olímpica con más de 15 años de experiencia en gestión ecuestre. Su visión de un mercado más justo y transparente dio origen a HorseTrust.",
      initials: "AM",
      color: "from-[#C9A24D] to-[#8B6914]"
    },
    {
      name: "Carlos Ruiz",
      role: "Director de Tecnología",
      bio: "Ingeniero de software full-stack apasionado por conectar comunidades nicho con soluciones digitales innovadoras. Lidera el desarrollo de nuestra plataforma.",
      initials: "CR",
      color: "from-[#1F140D] to-[#3D2B1A]"
    },
    {
      name: "Sofía Chen",
      role: "Veterinaria Jefe",
      bio: "Especialista en medicina equina con certificación internacional. Garantiza que cada ejemplar listado cumpla con los más altos estándares de salud y bienestar.",
      initials: "SC",
      color: "from-[#2D5016] to-[#4A7A28]"
    },
    {
      name: "Miguel Ángel",
      role: "Head of Sales",
      bio: "Experto en comercio internacional y logística de transporte animal. Ha facilitado más de 200 transacciones exitosas en tres países de Latinoamérica.",
      initials: "MA",
      color: "from-[#1A3A5C] to-[#2E6B9E]"
    }
  ];

  return (
    <section ref={sectionRef} className="scroll-reveal py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-12 h-0.5 bg-[#C9A24D] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F140D] mb-4">Nuestro Equipo</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Somos un equipo multidisciplinario unido por una pasión: hacer del mundo ecuestre
            un espacio más seguro, profesional y accesible para todos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="group bg-[#F4F1EC] rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              {/* Avatar with initials */}
              <div className={`relative h-56 w-full bg-gradient-to-br ${member.color} flex items-center justify-center overflow-hidden`}>
                <span className="text-5xl font-bold text-white/80 group-hover:scale-110 transition-transform duration-500">
                  {member.initials}
                </span>
                {/* Decorative circles */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/5" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <span className="text-[#C9A24D] font-medium text-sm block mb-4">{member.role}</span>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {member.bio}
                </p>

                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button className="text-gray-400 hover:text-[#0077B5] transition-colors duration-300"><Linkedin size={18} /></button>
                  <button className="text-gray-400 hover:text-[#1DA1F2] transition-colors duration-300"><Twitter size={18} /></button>
                  <button className="text-gray-400 hover:text-gray-900 transition-colors duration-300"><Mail size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;