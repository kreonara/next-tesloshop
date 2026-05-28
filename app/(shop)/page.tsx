import { getPaginationProductsWithImages } from "@/actions/products/product-pagination.action";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Pagination from "@/components/ui/pagination/Pagination";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

interface Props {
  // searchParams: Promise<{ page?: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function ShopPage({ searchParams }: Props) {
  const page = (await searchParams).page ? parseInt((await searchParams).page!) : 1

  const { products, currentPage, totalPages } = await getPaginationProductsWithImages({page: page})

  // si no hay productos redirigir a /
  if(products.length === 0) redirect('/')

  return (
    <>
      <Title 
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}