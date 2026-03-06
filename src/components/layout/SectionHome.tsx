import react from "react"
import Image from "next/image"
import caballosHome from "../../../public/laChicayElCaballo.jpg"

export function SectionHome () {

    return (
        <>
            <div className="bg-white">
  <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
    <div style={{background: '#1F140D'}} className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
      <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
        <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">🐎 Pasión, genética y rendimiento en un solo lugar</h2>
        <p className="mt-6 text-lg/8 text-pretty text-gray-300 font-semibold">En nuestro marketplace conectamos criadores, jinetes y amantes del mundo equino en una plataforma segura y especializada. Ofrecemos una selección de caballos con información detallada sobre linaje, edad, disciplina, entrenamiento y estado sanitario, para que encuentres el ejemplar ideal según tus objetivos.
        Ya sea para salto, doma, polo, trabajo rural o competición, facilitamos un proceso transparente y confiable, acercando oportunidades tanto para compradores como para vendedores.</p>
      </div>
      <div className="relative mt-4 h-80 lg:mt-0">
        <Image width="1000" height="1000"  alt="App screenshot" src={caballosHome} className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10" />
      </div>
    </div>
  </div>
</div>
        </>
    )

}

export default SectionHome