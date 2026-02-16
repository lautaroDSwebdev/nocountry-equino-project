"use client";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "@/service/api-general";
import { FormErrors, FormValues, namesFormularie } from "@/mock/mock";
import { useForm } from "@/hooks/useForm";

const useValidations = (form: FormValues): FormErrors => {
  const errors: FormErrors = {};

  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;


  if (!form.firstName.trim()) {
    // errors.firstName = "El campo 'Nombre' es requerido";
    toast.error("El campo 'Nombre' es requerido");
  } else if (!regexName.test(form.firstName.trim())) {
    errors.firstName = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
    toast.error("El campo 'Nombre' sólo acepta letras y espacios en blanco");
  }

  if (!form.secondSurname.trim()) {
    // errors.secondSurname = "El campo 'Apellido' es requerido";
    toast.error("El campo 'Apellido' es requerido");
  } else if (!regexName.test(form.secondSurname.trim())) {
    errors.secondSurname = "El campo 'Apellido' sólo acepta letras y espacios en blanco";
    toast.error("El campo 'Apellido' sólo acepta letras y espacios en blanco");
  }

  if (!form.email.trim()) {
    // errors.email = "El campo 'Email' es requerido";
    toast.error("El campo 'Email' es requerido");
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "Completa correctamente el campo 'Email'";
    toast.error("El campo 'Email' es incorrecto");
  }

  if (!form.password) {
    // errors.password = "El campo 'Contraseña' es requerido";
    toast.error("El campo 'Contraseña' es requerido");
  } else if (form.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
    toast.error("La contraseña debe tener al menos 6 caracteres");
  }

  if (!form.secondPassword) {
    // errors.secondPassword = "El campo 'Repite la contraseña' es requerido";
    toast.error("El campo 'Repite la contraseña' es requerido");
  } else if (form.password !== form.secondPassword) {
    errors.secondPassword = "Las contraseñas no coinciden";
    toast.error("Las contraseñas no coinciden");
  }

  return errors;
};





export default function Register() {


  // const [form, setForm] = useState<typeof namesFormularie>(namesFormularie);
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  // const [errors, setErrors] = useState({});
  // const [loading, setLoading] = useState(false);

  const {
    errors,
    form,
    handleBlur,
    handleChange,
    handleSubmit,
    loading,
    response
   } = useForm(namesFormularie, useValidations)

  // const handleChange = (field: keyof typeof namesFormularie) => (e: React.ChangeEvent<HTMLInputElement>) => {

  //   setForm({
  //     ...form,
  //     [field]: e.target.value
  //   });
  // };

  // const handleBlur = (e) => {
  //   handleChange(e);
  //   setErrors(validateForm(form));
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // const formElement = e.currentTarget;
  //   // const formData = new FormData(formElement);

  //   // const values = {
  //   //   firstName: (formData.get("name") ?? "") as string,
  //   //   secondSurname: (formData.get("surname") ?? "") as string,
  //   //   email: (formData.get("email") ?? "") as string,
  //   //   password: (formData.get("password") ?? "") as string,
  //   //   secondPassword: (formData.get("secondPassword") ?? "") as string,
  //   // };


  //   // if (
  //   //   !values.firstName?.trim() ||
  //   //   !values.secondSurname?.trim() ||
  //   //   !values.email?.trim() ||
  //   //   !values.password ||
  //   //   !values.secondPassword
  //   // ) {
  //   //   errors.firstName = "Completa el campo vacio"
  //   //   errors.secondSurname = "Completa el campo vacio"
  //   //   errors.password = "Completa el campo vacio"
  //   //   errors.secondPassword = "Completa el campo vacio"
  //   //   errors.email = "Completa el campo vacio"
  //   //   toast.error("faltan campos que completar");
  //   //   return;
  //   // }
  //   // if (!values.firstName.trim()) {
  //   //   errors.firstName = "El campo 'Nombre' es requerido";
  //   // } else if (!regexName.test(form.firstName.trim())) {
  //   //   errors.firstName = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
  //   // }

  //   // if (!form.secondSurname.trim()) {
  //   //   errors.secondSurname = "El campo 'Apellido' es requerido";
  //   // } else if (!regexName.test(form.secondSurname.trim())) {
  //   //   errors.secondSurname = "El campo 'Apellido' sólo acepta letras y espacios en blanco";
  //   // }

  //   // if (regexEmail.test(values.email)) {
  //   //   errors.email = "El campo 'Email' es incorrecto";
  //   //   toast.error("Email inválida");
  //   //   return;
  //   // }

  //   // if (values.password.length < 6) {
  //   //   errors.password = "La contraseña debe tener al menos 6 caracteres";
  //   //   toast.error("contraseña muy corta");
  //   //   return;
  //   // }

  //   // if (values.password !== values.secondPassword) {
  //   //   errors.secondPassword = "Las contraseñas no coinciden";
  //   //   toast.error("La contraseña no coincide");
  //   //   return;
  //   // }
  //   // console.log(errors);
  //   // return errors
  //   console.log(e);


  //   // toast.success("Cuenta creada correctamente");


  //   // try {
  //   //   const response = await fetch(API_URL + "/api/register", {
  //   //     method: "POST",
  //   //     body: formData,
  //   //   });

  //   //   if (!response.ok) {
  //   //     const error = await response.json().catch(() => ({}));
  //   //     toast.error(error.message ?? "Error al crear la cuenta");
  //   //     return;
  //   //   }

  //   //   toast.success("Creación de cuenta exitosa!");
  //   // } catch {
  //   //   toast.error("Error de conexión");
  //   // }
  //   // setForm(initialForm);
  // };
  // console.log("loading: "+  loading);
  // console.log("response: "+ response);
  return (
    <div className="div_bg-colorheader ">
      <Toaster position="top-right" />
      <Image src={"/Logo.png"} width={200} height={200} alt="logo" />
      <div className="header_register">
        <article className="article_div_form">
          <div className="div_formulario">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                src={"/image.png"}
                alt="Your Company"
                className="mx-auto h-[5rem] w-auto"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
                Crea tu cuenta
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm/6 font-medium text-gray-100"
                    style={{ color: "black" }}
                  >
                    Nombre
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      type="text"
                      value={form.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="firstName"
                      required
                      autoComplete="name"
                      className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 my-0">{errors.firstName}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="surname"
                    className="block text-sm/6 font-medium text-gray-100"
                    style={{ color: "black" }}
                  >
                    Apellido
                  </label>
                  <div className="mt-2">
                    <input
                      id="surname"
                      type="text"
                      value={form.secondSurname}
                      onChange={handleChange}
                      name="secondSurname"
                      required
                      autoComplete="surname"
                      className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    {errors.secondSurname && (
                      <p className="text-red-400 my-0">{errors.secondSurname}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-100"
                    style={{ color: "black" }}
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      name="email"
                      required
                      autoComplete="surname"
                      className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    {errors.email && (
                      <p className="text-red-400 my-0">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-100"
                    style={{ color: "black" }}
                  >
                    Crea tu contraseña
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      name="password"
                      required
                      autoComplete="password"
                      className="block w-full rounded-md bg-black/5 px-3 py-1.5 pr-10 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                    {errors.password && (
                      <p className="text-red-400 my-0">{errors.password}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="secondPassword"
                    className="block text-sm/6 font-medium text-gray-100"
                    style={{ color: "black" }}
                  >
                    Repite la contraseña
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="secondPassword"
                      type={showSecondPassword ? "text" : "password"}
                      value={form.secondPassword}
                      onChange={handleChange}
                      name="secondPassword"
                      required
                      autoComplete="new-password"
                      style={{ border: "black" }}
                      className="block w-full rounded-md bg-black/5 px-3 py-1.5 pr-10 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecondPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={showSecondPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showSecondPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                    {errors.secondPassword && (
                      <p className="text-red-400 my-0">{errors.secondPassword}</p>
                    )}
                  </div>
                </div>
                <Link href="/login" className="link">
                  o inicia sesion
                </Link>
                <div>
                  <button className="g-button" type="submit" >
                    Registrar usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        </article>
        <article className="h-[120vh]">
          <img
            src={"/caballos.jpg"}
            className="imagenDeCaballos"
            alt="caballos"
          />
        </article>
      </div>
    </div>
  );
}
