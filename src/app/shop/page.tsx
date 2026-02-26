import Filter from "@/components/filter/Filter";
import Categories from "@/components/landing/Categories";
import Hero from "@/components/landing/Hero";
import HorseGrid from "@/components/landing/HorseGrid";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const page = () => {
  return (
    <div className="min-h-screen bg-[#F4F1EC] font-sans">
      <Header />
      <Hero />
      <main>
        <Categories />
        <Filter/>
        <div className="space-y-4">
          <HorseGrid title="Basado en tu última visita" />
         
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default page;
