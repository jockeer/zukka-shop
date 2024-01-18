import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category
  }
}
const seedProducts = initialData.products;

export default function CategoryPage({ params }: Props) {
  const { id } = params;
  const products = seedProducts.filter(product => product.gender === id);
  // if ( id instanceof ValidCategories) {
  //   notFound();
  // }
  return (
    <div>
      <Title title="Articles for " spanTitle={id}  subtitle="All Products" className="mb-2 capitalize"/>
      <ProductGrid products={products}/>
    </div>
  );
}