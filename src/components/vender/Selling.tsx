"use client"

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2";
//import {useFormSelling} from "../../hooks/useFormSelling"
import Image from 'next/image';
import useFormSelling from '@/hooks/useFormSelling';
import { data } from '@/mock/mock';

interface FormsProps {
  children?: React.ReactNode;
}

const Selling = () => {
  const [image1 , setImage1] = useState<File | null>(null);
  const [image2 , setImage2] = useState<File | null>(null)

  const [preview , setPreview] = useState<string | null>(null);
  const [preview1 , setPreview1] = useState<string | null>(null);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;

    const file = e.target.files[0];
    setImage1(file);
    setPreview(URL.createObjectURL(file))
  }

  const handleImagenChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;
    
    const file = e.target.files[0];
    setImage2(file);
    setPreview1(URL.createObjectURL(file))
  }
  
  const handleDelete = () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }

      setPreview(null)
  }

  const handleDelete1 = () => {
      if (preview1) {
        URL.revokeObjectURL(preview1)
      }

      setPreview1(null)
  }


  const [raza , setRaza] = useState<string>('');

  const [price , setPrice] = useState<number>(0);

  const [edad , setEdad] = useState<number>(0);

  const [description , setDescription] = useState<string>('');

  const [gender , setGender] = useState<string>('');

  const [temperature , setTemperature] = useState<string>('');

  const [discipline , setDiscipline] = useState<string>('');

  const [discountPrice , setDiscountPrice] = useState<string>('');

  const [location , setLocation] = useState<string>('')

  const [videoID , setVideoID] = useState<string>('')

  const {sellHorse} = useFormSelling(); 

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {

  e.preventDefault()

  if (!raza || !price || !edad || !description || !image1  || !image2 || !gender || !temperature || !discipline || !discountPrice || !location || !videoID) {
    toast.error("Faltan campos que completar");
    return;
  }

  try {

  await sellHorse({
  breed: raza,
  age: Number(edad),
  gender: gender,
  temperament: temperature,
  discipline: discipline,
  price: Number(price),
  discountPrice: Number(discountPrice),
  location: location,
  description: description,
  files: [image1 , image2],
  videoId: videoID
  })
    
    Swal.fire({
    title: "Publicado!",
    icon: "success",
    draggable: true
  });

  } catch(error) {
    toast.error("Error al publicar el caballo")
  }

}

    return (
        <>
        <Toaster/>
        <div style={{padding:'5%'}} className="bg-white">
  <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
    <div style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}} className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"></div>
  </div>
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Vende tu Caballo</h2>
  </div>
  <form style={{background:'#6C430E' , padding:'3%' , width:'200%'}} action="#" method="POST" className="mx-auto form mt-16 border-black max-w-xl sm:mt-20"  onSubmit={handleSubmit}>
    <div>
      <div>
        <label htmlFor="raza" className="block text-white font-semibold text-gray-900">Raza</label>
        <div className="mt-2.5">
          <input id="raza" type="text" name="raza" autoComplete="family-raza" value={raza}  onChange={e => setRaza(e.target.value)} className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
      

      <div>
        <label htmlFor="raza" className="block text-white font-semibold text-gray-900">Genero</label>
        <div className="mt-2.5">
          <input id="genero" type="text" name="genero" autoComplete="family-genero" value={gender}  onChange={e => setGender(e.target.value)} className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
      

      <div>
        <label htmlFor="raza" className="block text-white font-semibold text-gray-900">Temperamento</label>
        <div className="mt-2.5">
          <input id="temperamento" type="text" name="temperamento" autoComplete="family-temperatura" value={temperature}  onChange={e => setTemperature(e.target.value)} className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
      
      <div>
        <label htmlFor="raza" className="block text-white font-semibold text-gray-900">Disciplina</label>
        <div className="mt-2.5">
          <input id="disciplina" type="text" name="disciplina" autoComplete="family-disciplina" value={discipline}  onChange={e => setDiscipline(e.target.value)} className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
  

  <div>
  <label htmlFor="price" className="block text-white font-medium text-gray-900">Price</label>
  <div className="mt-2">
    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
      <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div>
      <input id="price" type="number" name="price" placeholder="0.00" value={price}  onChange={e => setPrice(Number(e.target.value))} className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
      <div className="grid shrink-0 grid-cols-1 focus-within:relative">
        <select id="currency" name="currency" aria-label="Currency" className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <option>USD</option>
          <option>CAD</option>
          <option>EUR</option>
        </select>
        <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
          <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</div>
<div>
        <label htmlFor="raza" className="block text-white font-semibold text-gray-900">Descuento del Precio</label>
        <div className="mt-2.5">
          <input id="descuentoDelPrecio" type="number" name="descuentoDelPrecio" autoComplete="family-descuentoDelPrecio" value={discountPrice}  onChange={e => setDiscountPrice(e.target.value)} className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>


<div>
        <label htmlFor="raza" className="block text-white font-semibold text-gray-900">Edad</label>
        <div className="mt-2.5">
          <input id="number" type="number" name="number" value={edad}  onChange={e => setEdad(Number(e.target.value))} autoComplete="number" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="email" className="block text-white font-semibold text-gray-900">Ciudad y Provincia</label>
        <div className="mt-2.5">
          <input id="location" type="text" name="location" autoComplete="location" value={location}  onChange={e => setLocation(e.target.value)} className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="block text-white font-semibold text-gray-900">Descripción</label>
        <div className="mt-2.5">
          <textarea id="message" name="message" value={description}  onChange={e => setDescription(e.target.value)}  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"></textarea>
        </div>
      </div>
    </div>


    <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-white font-medium text-gray-900">Foto del caballo</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 relative h-64 w-full overflow-hidden">
            {!preview ? (
      <div className="text-center">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mx-auto size-12 text-gray-300"
        >
          <path d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6Z" />
        </svg>

        <div className="mt-4 text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Upload a file
          </label>


          <input
            id="file-upload-1"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleImagenChange}
          />
        </div>

        <p className="text-xs text-gray-500 mt-2">
          PNG, JPG, GIF hasta 10MB
        </p>
      </div>
    ) : (
      <>
        <img
          src={preview}
          alt="Preview caballo"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={handleDelete}
          className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm shadow-md hover:bg-red-700"
        >
          Eliminar
        </button>
        </>
    )}
        </div>
      </div>
    </div>
       <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-white font-medium text-gray-900">Foto del caballo</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 relative h-64 w-full overflow-hidden">
            {!preview1 ? (
      <div className="text-center">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mx-auto size-12 text-gray-300"
        >
          <path d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6Z" />
        </svg>

        <div className="mt-4 text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Upload a file
          </label>


          <input
            id="file-upload-2"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleImagenChange1}
          />
        </div>

        <p className="text-xs text-gray-500 mt-2">
          PNG, JPG, GIF hasta 10MB
        </p>
      </div>
    ) : (
      <>
        <img
          src={preview1}
          alt="Preview caballo"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={handleDelete1}
          className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm shadow-md hover:bg-red-700"
        >
          Eliminar
        </button>
        </>
    )}
        </div>
      </div>
    </div>
    <div className="sm:col-span-2">
        <label htmlFor="email" className="block text-white font-semibold text-gray-900">Video</label>
        <div className="mt-2.5">
          <input id="video" type="text" name="video" autoComplete="video" value={videoID}  onChange={e => setVideoID(e.target.value)} className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
        </div>
      </div>
    <div>
        <button type="submit" style={{marginTop:'3%' , background:'white'}} className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-black font-semibold text-black hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Publicar</button>
      </div>
  </form>
</div>
    </>

)
}


export default Selling