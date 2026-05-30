'use server'

import { Gender } from "@/generated/prisma/enums"
import { prisma } from "@/src/lib/prisma"

type PaginationOptions = {
  page?: number
  take?: number
  gender?: Gender
}

export async function getPaginationProductsWithImages({ page = 1, take = 12, gender }: PaginationOptions) {
  if(isNaN(Number(page))) page = 1
  if(page < 1) page = 1

  try {
    // 1. OBTENER LOS PRODUCTOS
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take, // 12, 24, ...
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      },
      where: {
        gender: gender
      }
    })

    // 2. OBTENER EL TOTAL DE PAGINAS
    const totalProducts = await prisma.product.count({
      where: {
        gender: gender
      }
    })
    
    const totalPages = Math.ceil(totalProducts / take)

    // return products.map( product => (
    //   {
    //     ...product,
    //     images: product.ProductImage.map(image => ( image.url ))
    //   }
    // ))
    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map( product => ({
        ...product,
        images: product.ProductImage.map( image => image.url)
      }))
    }

  } catch (error) {
    throw new Error('No se cargaron los productos')
  }
}