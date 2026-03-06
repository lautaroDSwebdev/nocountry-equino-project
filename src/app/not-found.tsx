"use client";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <section className="relative overflow-hidden rounded-xl bg-[#1F140D] text-[#F4F1EC] shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent opacity-80" />

          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 text-left">
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#C9A24D] uppercase">
              Error 404
            </p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
              Página no encontrada
            </h1>
            <p className="mb-8 max-w-xl text-sm text-[#F4F1EC]/80 sm:text-base">
              No pudimos encontrar la página que estás buscando. Puede que el
              enlace haya cambiado o que el ejemplar ya no esté disponible.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/equino"
                className="inline-flex items-center justify-center rounded-md bg-[#C9A24D] px-5 py-2.5 text-sm font-semibold text-[#1F140D] shadow-md transition hover:bg-[#9E7C32] hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F140D]"
              >
                Volver al inicio
              </a>
              <a
                href="/equino/catalogo"
                className="inline-flex items-center justify-center rounded-md border border-[#C9A24D]/60 px-5 py-2.5 text-sm font-semibold text-[#F4F1EC] transition hover:border-[#C9A24D] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F140D]"
              >
                Ver catálogo de equinos
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NotFound;