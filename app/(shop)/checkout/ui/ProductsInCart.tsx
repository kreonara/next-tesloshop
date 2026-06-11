'use client'

import { useCartStore } from "@/src/store/cart-store"
import { currencyFormat } from "@/src/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

const ProductsInCart = () => {
  const productsInCart = useCartStore(state => state.cart)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])
  

  if(!loaded) {
    return <p>Loading...</p>
  }

  return (
    <>
      {
        productsInCart.map(product => (
          <div className="flex mb-5" key={`${product.slug}-${product.size}`}>
            <Image
              src={`/products/${product.image}`}
              alt={product.title}
              width={100}
              height={100}
              style={{
                width: '100px',
                height: '100px'
              }}
              className="mr-5 rounded"
            />

            <div>
              <span>
              {product.size} - {product.title} ({product.quantity})
              </span>
              <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default ProductsInCart