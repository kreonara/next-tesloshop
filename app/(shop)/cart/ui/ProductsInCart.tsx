'use client'

import QuantitySelector from "@/components/product/QuantitySelector"
import { useCartStore } from "@/src/store/cart-store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const ProductsInCart = () => {
  const productsInCart = useCartStore(state => state.cart)
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
  const removeProduct = useCartStore(state => state.removeProduct)
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
              <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
              {product.size} - {product.title}
              </Link>
              <p>${product.price}</p>
              <QuantitySelector 
                quantity={product.quantity}
                onQuantity={value => updateProductQuantity(product, value)}
              />

              <button 
                onClick={() => removeProduct(product)}
                className="underline mt-3 cursor-pointer"
              >
                Remover
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default ProductsInCart