import ProductMobileSlideshow from "@/components/product/ProductMobileSlideshow";
import ProductSlideshow from "@/components/product/ProductSlideshow";
import QuantitySelector from "@/components/product/QuantitySelector";
import SizeSelector from "@/components/product/SizeSelector";
import { montserratAlt } from "@/src/config/fonts";
import { initialData } from "@/prisma/seed";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = initialData.products.find(product => product.slug === slug)

  if(!product) {
    notFound()
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SLIDESHOW */}
      <div className="col-span-1 md:col-span-2">

        {/* MOBILE SLIDESHOW - modificar hasta los 600px */}
        <ProductMobileSlideshow 
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* DESKTOP SLIDESHOW - mostrar despues de los ...??px */}
        <ProductSlideshow 
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* DETALLES */}
      <div className="col-span-1 px-5">
        
        {/* NOMBRE PRENDA */}
        <h1 className={`${ montserratAlt.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* SELECTOR DE TALLAS */}
        <SizeSelector 
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* SELECTOR DE CANTIDAD */}
        <QuantitySelector 
          quantity={2}
        />

        {/* BOTON Add to Cart */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* DESCRIPCIÓN */} 
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}