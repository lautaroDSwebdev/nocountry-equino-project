import React from  'react';
import Image from 'next/image';
import simbolo from "../../assets/image.png";
import contacto from "../../assets/caballosContactos.jpg"

interface FormsProps {
  children?: React.ReactNode;
}

const ContactForm = () => {

    return(
        <>
             <div className='login'>
               <article>
               <div className='login1'>
                 <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
               <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                 <Image src={simbolo} alt="Your Company" className="mx-auto h-10 w-auto" />
                 <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">En que podemos ayudarte?</h2>
               </div>
             
               <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                 <form action="#"  method="POST" className="space-y-6">
                    <div>
                     <label htmlFor="name" className="block text-sm/6 font-medium text-black-100">Name</label>
                     <div className="mt-2">
                       <input id="name" type="text" name="name" required autoComplete="name" className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                     </div>
                   </div>

                   <div>
                     <label htmlFor="surname" className="block text-sm/6 font-medium text-black-100">Surname</label>
                     <div className="mt-2">
                       <input id="name" type="text" name="name" required autoComplete="name" className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                     </div>
                   </div>
                   
                   <div>
                     <label htmlFor="email" className="block text-sm/6 font-medium text-black-100">Email address</label>
                     <div className="mt-2">
                       <input id="email" type="email" name="email" required autoComplete="email" className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                     </div>
                   </div>

                   <div className="flex flex-col">
                    <label htmlFor="consulta" className="mb-2 text-sm font-semibold text-gray-700">Tu consulta</label>
                    <div className='mt-2'>
                        <textarea className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Escribí tu consulta..." ></textarea>
                    </div>
                </div>
             
                   <div>
                     <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Send</button>
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
