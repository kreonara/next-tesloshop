export const revalidate = 60 // 60 seg

import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { getPaginationProductsWithImages } from "@/actions/products/product-pagination.action";
import { Gender } from "@/generated/prisma/enums";
import Pagination from "@/components/ui/pagination/Pagination";

interface Props {
  params: Promise<{ gender: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = await params
  // const products = seedProducts.filter(product => product.gender === id)

  const page = (await searchParams).page ? parseInt((await searchParams).page!) : 1
  
  const { products, currentPage, totalPages } = await getPaginationProductsWithImages({page, gender: gender as Gender})

  // si no hay productos redirigir a /
  if(products.length === 0) redirect(`/gender/${gender}`)

  const labels: Record<string, string> = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex': 'Todos'
  }

  // if(id === 'kids') {
  //   notFound()
  // }

  return (
    <>
      <Title
        title={`Articulos para ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}