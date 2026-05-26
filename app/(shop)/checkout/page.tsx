import QuantitySelector from "@/components/product/QuantitySelector";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/src/lib/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-10 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verifiar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href={"/cart"} className="underline mb-5">
              Editar carrito
            </Link>

            {/* ITEMS */}
            {
              productsInCart.map( product => (
                <div className="flex mb-5" key={product.slug}>
                  <Image 
                    src={`/products/${product.images[0]}`}
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
                    <p>{product.title}</p>
                    <p>{product.price} x 3</p>
                    <p className="font-bold">Subtotal: ${product.price * 3}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* CHECKOUT - RESUMEN DE LA ORDEN */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Yenaro O.</p>
              <p>C. Francisco I Madero 778</p>
              <p>Col. Americana</p>
              <p>Guadalajara</p>
              <p>Jalisco</p>
              <p>CP 44160</p>
              <p>Tel: 12 3456 7890</p>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-0.5 rounded bg-gray-200 my-10" />


            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>
              
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>
              
              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>
              
              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>
            
            <div className="mt-5 mb-2 w-full">
              {/* DISCLAIMER */}
              <p className="mb-5">
                <span className="text-xs">
                  Al hacer click en "Colocar orden", aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                </span>
              </p>

              <Link 
                href="/orders/123"
                className="flex btn-primary justify-center"
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}