'use client'

import { authenticate } from "@/actions/auth/login.action"
import clsx from "clsx"
import Link from "next/link"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { IoInformationOutline } from "react-icons/io5"

const LoginForm = () => {
  const [ state, action ] = useActionState(authenticate, undefined)

  console.log(state)

  return (
    <form action={action} className="flex flex-col">

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email" />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password" />

      <div 
        className="flex h-8 justify-center space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {
          state === "CredentialsSignin" &&
            <div className="flex mb-2">
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">Las credenciales no son correctas</p>
            </div>
        }
      </div>

      <LoginButton />


      {/* divisor line */}
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

export default LoginForm

function LoginButton() {
  const { pending } = useFormStatus()

  return (
  <button
    type="submit"
    className={clsx({
      "bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded transition-all": !pending,
      "bg-gray-600 text-white py-2 px-4 rounded transition-all": pending
    })}
    disabled={pending}
  >
    Ingresar
  </button>
  )
}