'use server'

import { FormInputs } from "@/app/auth/new-account/ui/RegisterForm"
import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUser(data: FormInputs) {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: bcrypt.hashSync(data.password)
      },
      select: {
        id: true,
        name: true,
        email: true        
      }
    })

    return {
      ok: true,
      user: user,
      message: 'Usuario creado'
    }

  } catch (error) {
    return {
      ok: false,
      message: 'No se puedo crear el usuario'
    }
  }
}