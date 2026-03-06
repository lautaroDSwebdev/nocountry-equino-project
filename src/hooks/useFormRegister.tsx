"use client"
import { useState } from "react";
// import { helpHttp } from "../helpers/helpHttp";
import { namesFormulariRegister } from "@/types/types";
import { API_URL, endpoint_register } from "@/service/api-general";
import { useRouter } from "next/navigation";

// namesFormulariRegister: por acá llamamos al objeto para almacenar en memoria la info que ingresa del fomrulario
// validateForm: por acá ingresamos la funcion con las condicionales para los mensajes de los inputs
export const useFormRegister = (namesFormulariRegister: namesFormulariRegister, validateForm: any) => {
  const router = useRouter()
  // estado que toma y devuelve lo que enviamos por el formulario
  const [form, setForm] = useState<namesFormulariRegister>(namesFormulariRegister);
  const [errors, setErrors] = useState<namesFormulariRegister | any>({});
  // estado de carga de respuesta de la api
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<boolean | null>(null);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    // const { name, value } = e.target;

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: any) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setErrors(validateForm(form));

    if (Object.keys(errors).length === 0) {
      // alert("Enviando Formulario");
      setLoading(true);
      try {
        const req = await fetch(endpoint_register, {
          method: "POST", headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify(form)
        })

        if (req.status === 201) {
          router.push("/login")
          console.log("peticion exitosa" + req.status);
        } else {
          console.log("hubo un fallo en la peticion", + req.status);
          throw Error
        }
        console.log(form);
        const res = await req.json() as namesFormulariRegister
        setLoading(false);
        console.log(res);
        return res

      } catch (error) {
        setTimeout(() => setResponse(false), 5000);

      }

    } else {
      return;
    }
    // setForm(namesFormulariRegister);
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};