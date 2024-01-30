'use client'

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormImputs = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('')

    const { register, handleSubmit, formState:{ errors } } = useForm<FormImputs>();

    const onSubmit = async ( data: FormImputs) => {
        setErrorMessage('')
        const { name, email, password} = data
        const resp = await registerUser(name, email, password);
        if (!resp.ok){
            setErrorMessage(resp.message)
            return;
        }
        await login(email.toLowerCase(), password)
        window.location.replace('/')
    }

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

        <label htmlFor="email" className="font-semibold">Name</label>
        <input
            {...register('name', {required: true})}
            className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",{
                'border-red-500': errors.name
            })}
            type="text"/>
       
        <label htmlFor="email" className="font-semibold">Email</label>
        <input
        {...register('email',{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",{
            'border-red-500': errors.email
        })}
        type="email" />


        <label htmlFor="password" className="font-semibold">Password</label>
        <input
        {...register('password', {required:true})}
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",{
            'border-red-500': errors.password
        })}
        type="password" />

        {/* {errors.password?.type === 'required' && <span className="text-red-500 mb-3">This field is required</span>} */}

        {errorMessage &&  <span className="text-red-500 mb-3">{errorMessage}</span>}

        <button
            type="submit"
            className="btn-primary text-center">
            Register
        </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
        </div>


    </form>
  )
}
