export const revalidate = 604800 // 7 días

import { getProductBySlug } from "@/actions/products/get-product-by-slug.action";
import ProductMobileSlideshow from "@/components/product/ProductMobileSlideshow";
import ProductSlideshow from "@/components/product/ProductSlideshow";
import QuantitySelector from "@/components/product/QuantitySelector";
import SizeSelector from "@/components/product/SizeSelector";
import StockLabel from "@/components/product/StockLabel";
import { montserratAlt } from "@/src/config/fonts";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>
}

import type { Metadata } from 'next'
import AddToCart from "./ui/AddToCart";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug)

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`]
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

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
        <StockLabel slug={product.slug} />
        <h1 className={`${ montserratAlt.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        {/* DESCRIPCIÓN */} 
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}