'use client'

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationCircle } from "react-icons/io5";
import { useEffect } from 'react';
import { redirect } from "next/navigation";

export const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
      if (state === 'Success') {
        redirect('/')
      }
    }, [state])
    

    return (
        <form action={dispatch} className="flex flex-col">

            <label htmlFor="email">Email</label>
            <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="email" name="email" />

            <label htmlFor="password">Password</label>
            <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="password" name="password" />

            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {state === 'CredentialsSignin' && (
                    <div className="mb-3 flex flex-row">
                        <IoInformationCircle className="h-5 w-5 text-red-500 mr-5" />
                        <p className="text-sm text-red-500">Invalid Credentials</p>
                    </div>
                )}
            </div>

            <LoginButton />


            {/* divisor l ine */ }
            <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account" 
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();
   
    return (
        <button
            type="submit"
            className={clsx({
                "btn-primary": !pending,
                "btn-disable" : pending
            })}
            disabled={pending}>
            Ingresar
    </button>
    );
  }
