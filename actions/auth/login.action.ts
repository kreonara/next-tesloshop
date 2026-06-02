'use server'

import { signIn } from "@/auth"
import { sleep } from "@/src/utils"


export async function authenticate(prevState: string|undefined, formData: FormData) {
  try {
    await sleep(2)
    await signIn("credentials", formData)
    
  } catch (error) {
    return 'CredentialsSignin'
  }
}