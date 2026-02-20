export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold text-gray-800">Acerca de</h4>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800">EQUI HORSE</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800">Investor relations</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800">Tendencias</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800">Sustentabilidad</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold text-gray-800">Otros sitios</h4>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800">Developers</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800">EQUI HORSE Envíos</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800">EQUI HORSE Shops</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold text-gray-800">Ayuda</h4>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800">Comprar</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800">Vender</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800">Resolución de problemas</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800">Seguridad</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold text-gray-800">Redes sociales</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-blue-600">Twitter</a>
                            <a href="#" className="text-gray-400 hover:text-blue-600">Facebook</a>
                            <a href="#" className="text-gray-400 hover:text-blue-600">Instagram</a>
                            <a href="#" className="text-gray-400 hover:text-blue-600">YouTube</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-gray-400">
                    <div className="flex flex-col gap-1">
                        <p>Copyright © 1999-2024 EQUI HORSE S.R.L.</p>
                        <p>Av. Caseros 3039, Piso 2, CP 1264, Parque Patricios, CABA</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-4">
                        <a href="#" className="hover:text-gray-600">Términos y condiciones</a>
                        <a href="#" className="hover:text-gray-600">Cómo cuidamos tu privacidad</a>
                        <a href="#" className="hover:text-gray-600">Accesibilidad</a>
                        <a href="#" className="hover:text-gray-600">Información al usuario financiero</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
