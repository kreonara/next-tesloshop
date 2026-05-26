import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/src/lib/seed";

const products = initialData.products

export default function ShopPage() {
  return (
    <>
      <Title 
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}