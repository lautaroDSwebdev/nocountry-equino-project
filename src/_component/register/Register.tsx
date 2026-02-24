"use client";
import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import Logo from "../../assets/logo.png"
import Logo1 from "../../assets/caballos.jpg"
import image from "../../assets/image.png"

interface FormsProps {
  children?: React.ReactNode;
}

export default function Register({ children }: FormsProps) {

const [firstName , setFirstName] = useState<string>("");

const [secondSurname , setSecondSurname] = useState<string>("");

const [email , setEmail] = useState<string>("");

const [password , setPassword] = useState<string>("");

const [secondPassword , setSecondPassword] = useState<string>("");

const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if(!firstName || !secondSurname || !email || !password || !secondPassword) {
    toast.error('faltan campos que completar')
    return;
  }

  if(!/\S+@\S+\.\S+/.test(email)) {
    toast.error("Email inválida")
    return;
  }

  if (password.length < 6) {
    toast.error("contraseña muy corta")
    return;
  }

  if (password !== secondPassword) {
    toast.error("La contraseña no coincide")
    return;
  }

  toast.success("Creación de cuenta existósa!")

}


return (
  <>
  <Toaster/>
  <Image src={Logo} width={200} height={200} alt='logo'/>
<div className='formulario'>
  <article>
    <div className="formulario1">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <Image src={image} alt="Your Company" className="mx-auto h-10 w-auto" />
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Create your account</h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100" style={{color: 'black'}}>Name</label>
        <div className="mt-2">
          <input id="name" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} name="name" required autoComplete="name" className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>
      <div>
        <label htmlFor="surname" className="block text-sm/6 font-medium text-gray-100" style={{color:'black'}}>Surname</label>
        <div className="mt-2">
          <input id="surname" type="text" value={secondSurname} onChange={e => setSecondSurname(e.target.value)} name="surname" required autoComplete="surname" className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100" style={{color:'black'}}>Email</label>
        <div className="mt-2">
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" required autoComplete="surname" className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100" style={{color:'black'}}>Create password</label>
        <div className="mt-2">
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" required autoComplete="password" className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>
      <div>
        <label htmlFor="secondPassword" className="block text-sm/6 font-medium text-gray-100" style={{color:'black'}}>Repeat Password</label>
        <div className="mt-2">
          <input id="secondPassword" type="password" value={secondPassword} onChange={e => setSecondPassword(e.target.value)} name="secondPassword" required autoComplete="new-password" style={{border: 'black'}} className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>
      <Link href="/login" className='link'>Or sign in with</Link>
      <div>
        <button  type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Create account</button>
      </div>
    </form>
  </div>
</div>
  </article>
  <article>
    <Image src={Logo1} className='imagenDeCaballos' alt="caballos" />
  </article>
</div>
    </>
  
  )
}
