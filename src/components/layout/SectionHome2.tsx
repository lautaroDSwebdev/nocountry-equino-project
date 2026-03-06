import react from "react";
import Image from "next/image";
import imagenSeccion2 from "../../../public/Impressive and Powerful Horses Photos.jpg"

export function SectionHome2 () {

    return(
        <>
            <div className="bg-white">
              <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                <div style={{background: '#ebb249'}} className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                  <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h2 style={{color:'black'}} className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">🏇 Donde la tradición y la excelencia se encuentran</h2>
                    <p style={{color:'black'}} className="mt-6 text-lg/8 text-pretty text-gray-300 font-semibold">Cada caballo tiene una historia, una genética y un potencial único. Nuestra plataforma está pensada para destacar esas cualidades, brindando visibilidad a criadores y confianza a compradores.
                    Trabajamos para que cada operación sea clara, segura y profesional, respetando la tradición del mundo equino y acompañando su evolución digital.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <a href="#" style={{background: 'white' , padding:'3%', color:'black'}} className="text-sm/6 font-semibold text-white hover:text-gray-100">
                        Leer más
                        <span aria-hidden="true">→</span>
                    </a>
                    </div>
                  </div>
                  <div className="relative mt-4 h-80 lg:mt-0">
                    <Image width="1000" height="1000"  alt="App screenshot" src={imagenSeccion2} className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10" />
                  </div>
                </div>
              </div>   
            </div>
        </>
    )

}

export default SectionHome2