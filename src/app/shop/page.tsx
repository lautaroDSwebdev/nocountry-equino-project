import Filter from "@/components/filter/Filter";
import Categories from "@/components/landing/Categories";
import Hero from "@/components/landing/Hero";
import HorseGrid from "@/components/landing/HorseGrid";

const page = () => {
  return (
    <div className="min-h-screen bg-[#F4F1EC] font-sans">
      <Hero />
      <main>
        <Categories />
        <Filter />
        <div className="space-y-4">
          <HorseGrid title="Basado en tu última visita" />

        </div>
      </main>
    </div>
  );
};

export default page;
