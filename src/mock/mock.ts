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
export const namesFormularie = {
  firstName: "",
  secondSurname: "",
  email: "",
  password: "",
  secondPassword: "",
};

export type FormValues = typeof namesFormularie;

export type FormErrors = Partial<Record<keyof FormValues, string>>;
