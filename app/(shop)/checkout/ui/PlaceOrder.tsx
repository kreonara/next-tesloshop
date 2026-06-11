'use client'

import { useAddressStore } from "@/src/store/address-store"
import { useCartStore } from "@/src/store/cart-store"
import { currencyFormat, sleep } from "@/src/utils"
import clsx from "clsx"
import { useEffect, useMemo, useState } from "react"

const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const address = useAddressStore(state => state.address)
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

  const onPlaceOrder = async() => {
    setIsPlacingOrder(true)

    const productsToOrder = cart.map( product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    console.log({productsToOrder})

    setIsPlacingOrder(false)
  }

  if(!loaded) {
    return <p>Cargando...</p>
  }
  

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{address.firstName} {address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>{address.city}, {address.country}</p>
        <p>Tel: {address.phone}</p>
      </div>

      {/* DIVIDER */}
      <div className="w-full h-0.5 rounded bg-gray-200 my-10" />


      <h2 className="text-2xl mb-2">Resumen de orden</h2>

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

      <div className="mt-5 mb-2 w-full">
        {/* DISCLAIMER */}
        <p className="mb-5">
          <span className="text-xs">
            Al hacer click en "Colocar orden", aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
          </span>
        </p>

        {/* <p className="text-red-500">Error de creación</p> */}
        <button
          onClick={ onPlaceOrder }
          className={
            clsx({
              "btn-primary": !isPlacingOrder,
              "disabled bg-gray-600 text-white py-2 px-4 rounded transition-all": isPlacingOrder
            })
          }
        >
          Colocar orden
        </button>
      </div>
    </div>
  )
}

export default PlaceOrder