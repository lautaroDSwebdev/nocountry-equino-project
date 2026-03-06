"use client"
import { useState } from "react";
import { LoginResponseType, namesFormulariLogin } from "@/types/types";
import { endpoint_login } from "@/service/api-general";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/token-store";
import toast from "react-hot-toast";
import { equino_path } from "@/constants/equino.path";

// namesFormulariLogin: por acá llamamos al objeto para almacenar en memoria la info que ingresa del fomrulario
// validateForm: por acá ingresamos la funcion con las condicionales para los mensajes de los inputs
export const useFormLogin = (namesFormulariLogin: namesFormulariLogin, validateForm: any) => {
  const router = useRouter()
  // estado que toma y devuelve lo que enviamos por el formulario
  const [form, setForm] = useState<namesFormulariLogin>(namesFormulariLogin);
  const [errors, setErrors] = useState<namesFormulariLogin | any>({});
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
      try {
        const req = await fetch(endpoint_login, {
          method: "POST", headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify(form)
        })
        // console.log(form);
        const res = await req.json() as LoginResponseType

        console.log(req.status);
        if (req.status === 200) {
          console.log("peticion exitosa" + req.status);
          authStore.getState().setToken({
            access_token: res.access_token,
            user: res.user
          });
          router.push(equino_path)
        } else if (req.status === 403) {
          console.log("hubo un fallo en la peticion", + req.status);
          toast.error("Fallo en el Inicio de Sesion, comprueba los datos")
          throw Error
        }
        console.log(res);
        return res

      } catch (error) {
        setTimeout(() => setResponse(false), 5000);

      }

    } else {
      return;
    }
    console.log(form);
    // setForm(namesFormulariLogin);
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