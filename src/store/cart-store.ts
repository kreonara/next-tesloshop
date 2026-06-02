import { create } from "zustand"
import type { CartProduct } from "../interfaces/product.interface"
import { persist } from "zustand/middleware"

interface State {
  cart: CartProduct[]

  getTotalItems: () => number,

  addProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProduct: (product: CartProduct) => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Metodos
      getTotalItems() {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get()

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          item => (item.id === product.id && item.size === product.size)
        )
        // 1.1 si no existe en producto en el carrito -> ingresamos lo que estaba +el nuevo producto
        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        // 2. si el producto ya existe (por talla), incrementar la cantidad
        const updateCartProducts = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity
            }
          }

          return item
        })

        set({ cart: updateCartProducts })
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get()
        const updatedCartProducts = cart.map(item => {
          if(item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity}
          }
          return item
        })

        set({ cart: updatedCartProducts })
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get()
        const updatedCartProducts = cart.filter(
          item => item.id !== product.id || item.size !== product.size
        )

        set({ cart: updatedCartProducts })
      }
    }), {
    name: 'shopping-cart'
  })
)