"use client";

import {
  Shield,
  FileSearch,
  Video,
  MessageCircle,
  Star,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const helpCards = [
  {
    id: 1,
    icon: Shield,
    category: "Confianza y seguridad",
    title: "Solo listados verificados",
    description:
      "Cada caballo publicado en nuestra plataforma pasa por un riguroso proceso de verificación. Los vendedores deben presentar documentación que acredite la propiedad, el estado de salud y la identidad antes de publicar el anuncio",
    badge: "Característica principal",
    badgeColor: "#C8A951",
    accent: "#291F18",
  },
  {
    id: 2,
    icon: FileSearch,
    category: "Registros de salud",
    title: "Historial veterinario completo",
    description:
      "Exigimos a los vendedores que carguen su historial veterinario completo, incluyendo exámenes previos a la compra, historial de vacunación, historial dental y cualquier lesión o tratamiento previo. Sin sorpresas después de la venta.",
    badge: "Transparencia",
    badgeColor: "#4A7C59",
    accent: "#1A3A2A",
  },
  {
    id: 3,
    icon: Video,
    category: "Actuación",
    title: "Prueba de video verificada",
    description:
      "Todas las afirmaciones de rendimiento deben estar respaldadas por pruebas de video con fecha y hora. Nuestro equipo revisa las grabaciones del caballo en acción (en terreno llano, saltos, senderos o disciplinas específicas) antes de su aprobación.",
    badge: "Verificado",
    badgeColor: "#2E5F8A",
    accent: "#1A3A2A",
  },
  {
    id: 4,
    icon: MessageCircle,
    category: "Comunicación",
    title: "Mensajería segura",
    description:
      "Chatea directamente con los vendedores a través de nuestro sistema de mensajería encriptada. Todas las conversaciones se registran para la resolución de disputas. Nunca compartas tus datos personales hasta que estés listo para continuar.",
    badge: "Cifrado",
    badgeColor: "#6B3FA0",
    accent: "#1A3A2A",
  },
  {
    id: 5,
    icon: Star,
    category: "Reputación del vendedor",
    title: "Puntuaciones de credibilidad del vendedor",
    description:
      "Los compradores califican a los vendedores después de cada transacción. La credibilidad considera el tiempo de respuesta, la precisión del anuncio, el estado del producto al momento de la entrega y la atención posventa. Compre con confianza.",
    badge: "Comunidad",
    badgeColor: "#B85C2A",
    accent: "#1A3A2A",
  },
  {
    id: 6,
    icon: AlertCircle,
    category: "Resolución de disputas",
    title: "Programa de protección al comprador",
    description:
      "Si un caballo no coincide con su anuncio, nuestro Programa de Protección al Comprador le cubre. Informe cualquier discrepancia dentro de las 72 horas posteriores a la entrega y nuestro equipo mediará para encontrar una solución justa.",
    badge: "Protegido",
    badgeColor: "#C8373A",
    accent: "#1F140D",
  },
];

export default function HelpPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F3F4F6",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        color: "#E8E0D0",
        padding: "0",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(200, 169, 81, 0.2)",
          padding: "64px 48px 48px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#a08439",
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
          }}
        >
          Centro de ayuda
        </span>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "400",
            marginTop: "16px",
            marginBottom: "0",
            lineHeight: "1.1",
            color: "#1F140D",
            letterSpacing: "-0.5px",
          }}
        >
          Comprar un caballo debe ser
          <br />
          <em style={{ color: "#C8A951" }}>confiable</em>, No es una apuesta.
        </h1>
        <p
          style={{
            marginTop: "20px",
            fontSize: "16px",
            color: "#1F140D",
            maxWidth: "560px",
            lineHeight: "1.7",
            fontFamily: "system-ui, sans-serif",
            fontWeight: "300",
          }}
        >
          Creamos esta plataforma para eliminar la opacidad que ha afectado
          durante mucho tiempo al mercado hípico. Todas las funciones a
          continuación están diseñadas para protegerte.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 48px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "2px",
        }}
      >
        {helpCards.map((card) => {
          const Icon = card.icon;
          const isHovered = hovered === card.id;

          return (
            <div
              key={card.id}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                backgroundColor: isHovered ? "#3f2c1f" : "#291F18",
                border: isHovered
                  ? `1px solid rgba(200, 169, 81, 0.4)`
                  : "1px solid #291F18",
                borderRadius: "2px",
                padding: "36px 32px 32px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Acento de la barra superior*/}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: isHovered ? card.badgeColor : "transparent",
                  transition: "background-color 0.25s ease",
                }}
              />

              {/* Categoría + Insignia */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#5A6E5A",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {card.category}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: card.badgeColor,
                    fontFamily: "system-ui, sans-serif",
                    border: `1px solid ${card.badgeColor}40`,
                    padding: "3px 8px",
                    borderRadius: "2px",
                  }}
                >
                  {card.badge}
                </span>
              </div>

              {/* Icon */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: `${card.badgeColor}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  transition: "background-color 0.25s ease",
                }}
              >
                <Icon size={20} color={card.badgeColor} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  color: "#F2EBD9",
                  marginBottom: "12px",
                  letterSpacing: "-0.2px",
                }}
              >
                {card.title}
              </h3>

              {/* Descripcion */}
              <p
                style={{
                  fontSize: "16px",
                  color: "#a19282",
                  lineHeight: "1.75",
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: "300",
                  marginBottom: "24px",
                }}
              >
                {card.description}
              </p>

              {/* Más información */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: isHovered ? "#C8A951" : "#291F18",
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontFamily: "system-ui, sans-serif",
                  transition: "color 0.25s ease",
                }}
              >
                <span>Más información</span>
                <ChevronRight size={12} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer  */}
      <div
        style={{
          borderTop: "1px solid rgba(200, 169, 81, 0.15)",
          padding: "48px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "13px",
              color: "#5A6E5A",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            ¿Aún tienes preguntas?
          </p>
          <p
            style={{
              fontSize: "18px",
              color: "#C8A951",
              marginTop: "4px",
            }}
          >
            Nuestro equipo está aquí para ayudarle a comprar con confianza.
          </p>
        </div>
        <button  className="mt-8 inline-flex items-center justify-center gap-2 bg-[#C9A24D] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#B8913C] transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A24D]/25 group w-full md:w-auto">
          Contáctanos
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>
    </div>
  );
}
