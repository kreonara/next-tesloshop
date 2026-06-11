'use server'

import { auth } from "@/auth"
import type { Address } from "@/src/interfaces/address.interface"
import type { Size } from "@/src/interfaces/product.interface"
import { prisma } from "@/src/lib/prisma"
import { currencyFormat } from "@/src/utils"

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export async function placeOrder(products: ProductToOrder[], address: Address) {
  const session = await auth()

  // verificar usuario
  if(!session?.user.id) {
    return {
      ok: false,
      message: "No hay sesión de usuario"
    }
  }

  // obtener info de cada producto (si son iguales solo toma uno)
  const productsDB = await prisma.product.findMany({
    where: { // donde el id SEA (contenga) el/los id´s...
      id: {
        in: products.map( p => p.productId)
      }
    }
  })

  // calcular montos - total de articulos
  const totalArticulos = products.reduce( (count, product) => count + product.quantity, 0)

  // calcular: subtotal, tax, total
  const { subTotal, tax, total } = products.reduce((totals, product) => {
    const productQuantity = product.quantity // cantidad de cada producto
    const productDB = productsDB.find(productDB => productDB.id === product.productId)
    if(!productDB) throw new Error(`${product.productId} no existe - 500`)

    const subTotal = productDB.price * productQuantity

    totals.subTotal += subTotal
    totals.tax += subTotal * 0.15
    totals.total += subTotal * 1.15

    return totals

  }, {subTotal: 0, tax: 0, total: 0})

  // guardar en la DB y si algo sale mal hacer un rollback (deshacer) - prisma.$transaction
  const prismaTx = await prisma.$transaction( async(tx) => {
    // 1. actualizar/verificar el stock de los productos

    // 2. crear la orden (model Order) y los productos de la orden (model OrderItem)
    const order = await tx.order.create({
      data: {
        // Encabezado
        userId: session.user.id,
        itemsInOrder: totalArticulos,
        subTotal: subTotal,
        tax: tax,
        total: +total.toFixed(2),
        isPaid: false,

        // Detalle
        OrderItem: {
          createMany: {
            data: products.map( product => ({
              quantity: product.quantity,
              size: product.size,
              productId: product.productId,
              price: productsDB.find(p => p.id === product.productId)?.price ?? 0
            }))
          }
        }
      }
    })
    
    // si el precio es cero -> lanzar un error

    // 3. crear la dirección de la orden

    return {
      order: order
    }
  })
}