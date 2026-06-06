'use server'

import { prisma } from "@/src/lib/prisma"

export async function getCountries() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return countries
    
  } catch (error) {
    console.log(error)
    return []
  }
}