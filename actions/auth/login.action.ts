'use server'

import { signIn } from "@/auth"

type ActionStateType = {
  errors: string[]
}

export async function authenticate(prevState: ActionStateType, formData: FormData) {
  try {
    await signIn("credentials", formData)
    
  } catch (error) {
    console.log('Credenciales Incorrectas:', error)
  }
  
  return {
    errors: []
  }
}