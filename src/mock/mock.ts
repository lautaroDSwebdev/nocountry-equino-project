export const data = [
    { href: "#", label: "Categorías" },
    { href: "#", label: "Ofertas" },
    { href: "#", label: "Historial" },
    { href: "#", label: "Vender" },
    { href: "#", label: "Ayuda" }
]
export const options = [

    { href: "/register", label: "Crea tu cuenta", className: "font-medium hover:text-blue-600" },
    { href: "#", label: "Ingresa", className: "font-medium hover:text-blue-600" },
    { href: "#", label: "Mis compras", className: "font-medium hover:text-blue-600" },
]
export const namesFormulariRegister = {
    dni: "",
    name: "",
    lastname: "",
    email: "",
    password: ""
};
export const namesFormulariLogin = {
    email: "",
    password: "",
};


export const horses = [
    {
        id: 1,
        name: 'Veloz Rayo',
        breed: 'Pura Sangre de Carrera',
        temperament: 'Nervioso y Explosivo',
        age: 3,
        price: 5500,
        image: "/images/prueba.jpg",
        installments: 'en 12x USD 458',
        shipping: 'Envío gratis'
    },
    {
        id: 2,
        name: 'Lucero del Alba',
        breed: 'Criollo',
        temperament: 'Noble y Equilibrado',
        age: 2,
        price: 2800000,
        image: '/images/prueba.jpg',
        installments: 'en 6x sin interés',
        shipping: ''
    },
    {
        id: 3,
        name: 'Malena',
        breed: 'Polo Argentino',
        temperament: 'Sensible y Reactivo',
        age: 6,
        price: 12000,
        image: '/images/prueba.jpg',
        installments: null,
        shipping: 'Envío gratis'
    },
    {
        id: 4,
        name: 'Indio',
        breed: 'Cuarto de Milla',
        temperament: 'Tranquilo y Enfocado',
        age: 1,
        price: 3200,
        image: '/images/prueba.jpg',
        installments: null,
        shipping: ''
    },
    {
        id: 5,
        name: 'Salto al Futuro',
        breed: 'Silla Argentino',
        temperament: 'Atento y Voluntarioso',
        age: 5,
        price: 8000,
        image: '/images/prueba.jpg',
        installments: 'en 12x USD 666',
        shipping: 'Llega mañana'
    },
    {
        id: 6,
        name: 'Hércules',
        breed: 'Percherón',
        temperament: 'Flemático y Dócil',
        age: 8,
        price: 3500000,
        image: '/images/prueba.jpg',
        installments: 'en 12x sin interés',
        shipping: 'Envío especial'
    },
    {
        id: 7,
        name: 'Sahara',
        breed: 'Árabe',
        temperament: 'Vivaz y Fogoso',
        age: 1,
        price: 15000,
        image: '/images/prueba.jpg',
        installments: null,
        shipping: 'Envío gratis'
    },
    {
        id: 8,
        name: 'Duke',
        breed: 'Hackney',
        temperament: 'Activo y Elegante',
        age: 2,
        price: 4500,
        image: '/images/prueba.jpg',
        installments: 'en 12x USD 375',
        shipping: ''
    }
];
export type FormValues = typeof namesFormulariRegister;
export type FormValuesLogin = typeof namesFormulariLogin;

export type FormErrors = Partial<Record<keyof FormValues, string>>;
export type FormErrorsLogin = Partial<Record<keyof FormValuesLogin, string>>;
