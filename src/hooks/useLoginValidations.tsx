import { FormErrors, FormValues } from "@/mock/mock";
import toast from "react-hot-toast";

const useLoginValidations = (form: FormValues): FormErrors => {
    const errors: FormErrors = {};
  
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexDni = /^\d{7,8}$/;
  
   
  
    if (!form.email.trim()) {
      toast.error("El campo 'Email' es requerido");
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = "Completa correctamente el campo 'Email'";
      toast.error("El campo 'Email' es incorrecto");
    }else{
      toast.success("El campo 'Email' es valido");
      toast.success("El Email  es valido");
      
    }
  
    if (!form.password) {
      toast.error("El campo 'Contraseña' es requerido");
    } else if (form.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
      toast.error("La contraseña debe tener al menos 6 caracteres");
    }else{
      toast.success("La contraseña es valida");
      toast.success("El campo 'Contraseña' es valido");
      
    }
  
   
  
    return errors;
  };
  export default useLoginValidations