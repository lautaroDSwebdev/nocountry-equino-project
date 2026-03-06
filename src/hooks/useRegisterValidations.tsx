import { FormErrors, FormValues } from "@/mock/mock";
import toast from "react-hot-toast";

const useRegisterValidations = (form: FormValues): FormErrors => {
  const errors: FormErrors = {};

  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexDni = /^\d{7,8}$/;

  if (!form.dni.trim()) {
    toast.error("El campo 'DNI' es requerido");
  } else if (!regexDni.test(form.dni.trim())) {
    errors.dni = "El campo 'DNI' debe tener entre 7 y 8 dígitos";
    toast.error("El campo 'DNI' debe tener entre 7 y 8 dígitos");
  } else {
    toast.success("El campo 'DNI' es válido");
  }

  if (!form.name.trim()) {
    toast.error("El campo 'Nombre' es requerido");
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
    toast.error("El campo 'Nombre' sólo acepta letras y espacios en blanco");
  } else {
    toast.success("El campo 'Nombre' es válido");
  }

  if (!form.lastname.trim()) {
    toast.error("El campo 'Apellido' es requerido");
  } else if (!regexName.test(form.lastname.trim())) {
    errors.lastname = "El campo 'Apellido' sólo acepta letras y espacios en blanco";
    toast.error("El campo 'Apellido' sólo acepta letras y espacios en blanco");
  } else {
    toast.success("El campo 'Apellido' es válido");
  }

  if (!form.email.trim()) {
    toast.error("El campo 'Email' es requerido");
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "Completa correctamente el campo 'Email'";
    toast.error("El campo 'Email' es incorrecto");
  } else {
    toast.success("El campo 'Email' es válido");
  }

  if (!form.password) {
    toast.error("El campo 'Contraseña' es requerido");
  } else if (form.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
    toast.error("La contraseña debe tener al menos 6 caracteres");
  } else {
    toast.success("La contraseña es válida");
    toast.success("El campo 'Contraseña' es válido");
  }



  return errors;
};
export default useRegisterValidations