import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import imagen from "../../assets/imagenLogin.png";
import simbolo from "../../assets/image.png";
import Logo from "../../assets/logo.png";

interface FormsProps {
  children?: React.ReactNode;
}

export default function LoginForm({ children }: FormsProps) {

const [email , setEmail] = useState<string>("")

const [password , setPassword] = useState<string>("")

const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {

  e.preventDefault();

  if (!email.trim()) {
    toast.error("El email es obligatorio");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailRegex.test(email)) {
    toast.error("El formato de email no es válido");
    return;
  }

  if(!password.trim()){
    toast.error("la contraseña es obligatoria");
    return;
  }

  if(password.length < 6) {
    toast.error("Esta contraseña no existe")
    return;
  }

  toast.success("Inicio de sesión exitósa!")

}

    return (
    <>
    <Toaster/>
  <div className='login'>
  <article>
  <div className='login1'>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <Image src={simbolo} alt="Your Company" className="mx-auto h-10 w-auto" />
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Iniciar Sesión</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action="#" onSubmit={handleSubmit} method="POST" className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-black-100">Email address</label>
        <div className="mt-2">
          <input id="email" type="email" name="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-black-100">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" type="password" name="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm/6 text-gray-400">
      Not a member?
      <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Start a 14 day free trial</a>
    </p>
  </div>
</div>
</div>
</article>
<article>
  <Image src={imagen} className='imagen' alt='login'/>
</article>
</div>
    </>
    )
}