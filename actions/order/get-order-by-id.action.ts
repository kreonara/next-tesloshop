'use server'

import { auth } from "@/auth"
import { prisma } from "@/src/lib/prisma"

export async function getOrderById(id: string) {
  const session = await auth()
  if(!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  try {
    // buscamos la orden
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if(!order) throw `${id} no existe`

    // verificar que la orden pertenezca al usuario autenticado
    if(session.user.role === 'user') {
      if(session.user.id !== order.userId) {
        throw `${id} no es del usuario`
      }
    }


    return {
      ok: true,
      order: order
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Orden no existe'
    }
  }
}