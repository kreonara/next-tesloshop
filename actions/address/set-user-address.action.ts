'use server'

import type { Address } from "@/src/interfaces/address.interface"
import { prisma } from "@/src/lib/prisma"

export async function setUserAddress(address: Address, userId: string) {
  try {
    const newAddress = createOrReplaceAddress(address, userId)

    return {
      ok: true,
      address: newAddress
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo grabar la dirección'
    }
  }
}

const createOrReplaceAddress = async(address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({ where: { userId }})
    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city
    }

    if(!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      })

      return newAddress
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave
    })

    return updatedAddress

  } catch (error) {
    console.log(error)
    throw new Error('No se grabo la dirección')
  }
}