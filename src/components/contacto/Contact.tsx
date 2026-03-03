"use client"

import React, { useState } from  'react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import simbolo from "../../../public/image.png";
import contacto from "../../../public/caballosContactos.jpg"
import { text } from 'stream/consumers';

interface FormsProps {
  children?: React.ReactNode;
}

const ContactForm = () => {


  const [firstName  , setFirstName] = useState<string>("");

  const [secondSurname , setSecondSurname] = useState<string>("");

  const [email , setEmail] = useState<string>("");

  const [asking, setAsking] = useState<string>("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {

  e.preventDefault();

      
  if(!firstName || !secondSurname || !email || !asking) {
    toast.error('faltan campos que completar')
    return;
  }

  if(!/\S+@\S+\.\S+/.test(email)) {
    toast.error("Email inválida")
    return;
  }

  toast.success("Mensaje Enviado!")

}



    return(
        <>
        <Toaster/>
             <div className='login'>
               <article>
               <div className='contacto1'>
                 <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
               <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                 <Image src={simbolo} alt="Your Company" className="mx-auto h-10 w-auto" />
                 <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">En que podemos ayudarte?</h2>
               </div>
             
               <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                 <form action="#" onSubmit={handleSubmit}  method="POST" className="space-y-6">
                    <div>
                     <label htmlFor="name" className="block text-sm/6 font-medium text-white">Name</label>
                     <div className="mt-2">
                       <input id="name" type="text" name="name" required autoComplete="name" value={firstName} onChange={e => setFirstName(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                     </div>
                   </div>


                   <div>
                     <label htmlFor="surname" className="block text-sm/6 font-medium text-white">Surname</label>
                     <div className="mt-2">
                       <input id="name" type="text" name="name" required autoComplete="name" value={secondSurname} onChange={e => setSecondSurname(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                     </div>
                   </div>


                   <div>
                     <label htmlFor="email" className="block text-sm/6 font-medium text-white">Email address</label>
                     <div className="mt-2">
                       <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" required autoComplete="surname" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                   <div className="flex flex-col">
                  </div>
                    
                    <label htmlFor="consulta" className="mb-2 text-sm font-semibold text-white">Tu consulta</label>
                    <div className='mt-2'>
                        <textarea className="w-full h-40 p-3 border border-white bg-white rounded-lg resize-y focus:outline-none text-black focus:ring-2 focus:ring-white" value={asking} onChange={e => setAsking(e.target.value)} placeholder="Escribí tu consulta..." ></textarea>
                    </div>
                </div>
                </div>
                   <div>
                     <button type="submit" style={{background:'white'}} className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Send</button>
                   </div>
                 </form>
                </div>    
                </div>
             </div>
             </article>
             <article>
               <Image src={contacto} className='imagenContacto' alt='login'/>
             </article>
             </div>
        </>
    )
}


export default ContactForm;
