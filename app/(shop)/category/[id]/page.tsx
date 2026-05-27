import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { Category } from "@/src/interfaces/product.interface";
import { initialData } from "@/prisma/seed";
import { notFound } from "next/navigation";

const seedProducts = initialData.products

interface Props {
  params: Promise<{ id: Category }>
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params
  const products = seedProducts.filter(product => product.gender === id)

  const labels: Record<Category, string> = {
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
        title={`Articulos para ${labels[id]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}