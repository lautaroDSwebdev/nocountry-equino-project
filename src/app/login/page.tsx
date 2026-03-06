"use client"
import { useFormLogin } from '@/hooks/useFormLogin';
import useLoginValidations from '@/hooks/useLoginValidations';
import { namesFormulariLogin } from '@/mock/mock';
import { authStore } from '@/store/token-store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

interface FormsProps {
  children?: React.ReactNode;
}

export default function LoginForm({ children }: FormsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    errors,
    form,
    handleBlur,
    handleChange,
    handleSubmit,
    loading,
    response
  } = useFormLogin(namesFormulariLogin, useLoginValidations)

  return (
    <div className='div_bg-colorheader'>
      <Toaster position="top-right" />
      <Image src={"/Logo.png"} width={200} height={200} alt="logo" />
      <div className="header_begin-app">
        <article className="article_div_form">
          <div className="div_formulario">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img src={"/image.png"} alt="Your Company" className="mx-auto h-10 w-auto" />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
                Iniciar Sesión
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit}>
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
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="email"
                      required
                      autoComplete="email"
                      className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
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
                    Password
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-black/5 px-3 py-1.5 pr-10 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      )}
                    </button>
                    {errors.password && (
                      <p className="text-red-400 ">{errors.password}</p>
                    )}
                  </div>
                </div>
                <Link href="/register" className="link">
                  todavia no tengo cuenta
                </Link>
                <div>
                  <button
                    type="submit"
                    className="g-button w-full mt-6"
                  >
                    Iniciar Sesion
                  </button>
                </div>
              </form>
            </div>
          </div>
        </article>
        <article className='article_img_horses'>

          <img
            src={"/caballos2.jpg"}
            className="img-horses"
            alt="image-horses"
          />
        </article>
      </div>
    </div>
  )
}