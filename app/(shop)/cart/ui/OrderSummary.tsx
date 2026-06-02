'use client'

import { useCartStore } from "@/src/store/cart-store"
import { currencyFormat } from "@/src/utils"
import { useEffect, useMemo, useState } from "react"

const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const cart = useCartStore(state => state.cart)

  const { itemsInCart, subtotal, tax, total } = useMemo(() => {
    const subtotal = cart.reduce(
      (subtotal, product) => product.quantity * product.price + subtotal, 0
    )
    const tax = subtotal * 0.15
    const total = subtotal + tax
    const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)

    return {
      subtotal, tax, total, itemsInCart
    }
  }, [cart])

  useEffect(() => {
    setLoaded(true)
  }, [])

  if(!loaded) return <p>Loading...</p>
  
  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>
      
      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subtotal)}</span>
      
      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>
      
      <span className="mt-5 text-2xl">Total</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  )
}

export default OrderSummary