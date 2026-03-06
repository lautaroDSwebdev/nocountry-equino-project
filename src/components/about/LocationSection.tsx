"use client";

import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import  {useScrollReveal} from "@/hooks/useScrollReveal"
import { equino_path } from '@/constants/equino.path';
const LocationSection = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="scroll-reveal py-24 bg-[#F9F7F5]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="w-12 h-0.5 bg-[#C9A24D] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F140D] mb-4">Visítanos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Nuestras puertas siempre están abiertas para quienes comparten nuestra pasión.
            Ven a conocer al equipo y descubre cómo podemos ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Contact Info */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Dirección",
                  detail: "Av. del Libertador 1234, Ciudad de Buenos Aires, Argentina",
                },
                {
                  icon: Phone,
                  title: "Teléfono",
                  detail: "+54 11 1234-5678",
                },
                {
                  icon: Mail,
                  title: "Email",
                  detail: "contacto@horset.com",
                },
                {
                  icon: Clock,
                  title: "Horario de Atención",
                  detail: "Lunes a Viernes: 9:00 AM - 6:00 PM",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300">
                  <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="text-[#C9A24D]" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a href={`${equino_path}/contacto`} className="mt-8 inline-flex items-center justify-center gap-2 bg-[#C9A24D] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#B8913C] transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A24D]/25 group w-full md:w-auto">
              Contáctanos
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Map */}
          <div className="w-full h-[400px] lg:h-full min-h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-xl relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168878894544!2d-58.38157032338647!3d-34.60373445749718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11bead4e234e558b!2sObelisco!5e0!3m2!1ses!2sar!4v1689264627448!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  )
}

export default LocationSection
