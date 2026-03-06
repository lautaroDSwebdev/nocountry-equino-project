import Hero from "@/components/landing/Hero"
import HorseGrid from "@/components/landing/HorseGrid"
import SectionHome from "@/components/layout/SectionHome"
import SectionHome2 from "@/components/layout/SectionHome2"

function page() {


    return (
        <>
            <Hero></Hero>
            <HorseGrid title="Nuestros Caballos" />
            <SectionHome />
            <SectionHome2 />
        </>
    )
}

export default page