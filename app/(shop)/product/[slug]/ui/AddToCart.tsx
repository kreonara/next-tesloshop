'use client'

import QuantitySelector from "@/components/product/QuantitySelector"
import SizeSelector from "@/components/product/SizeSelector"
import { CartProduct, Product, Size } from "@/src/interfaces/product.interface"
import { useCartStore } from "@/src/store/cart-store"
import { useState } from "react"

interface Props {
  product: Product
}

const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart)

  const [size, setSize] = useState<Size|undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const addToCart = () => {
    setPosted(true)
    if(!size) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }
    addProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
    // PODEMOS MOSTRAR UNA ALERTA
  }

  return (
    <>
      {
        posted && !size && (
          <span className="mt-2 text-red-500 fade-in">
            Debe de seleccionar una talla*
          </span>
        )
      }

      {/* SELECTOR DE TALLAS */}
      <SizeSelector 
        selectedSize={size}
        availableSizes={product.sizes}
        onSize={ setSize }
      />

      {/* SELECTOR DE CANTIDAD */}
      <QuantitySelector 
        quantity={quantity}
        onQuantity={ setQuantity }
      />

      {/* BOTON Add to Cart */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  )
}

export default AddToCart