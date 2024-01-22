export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function HomePage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page): 1;
  
  const { products, totalPages } = await getPaginatedProductsWithImages({ page })

  if (products.length === 0) redirect('/')

  return (
    <>
      <div className="px-5">
        <Title title='Shop' subtitle="All Products" className="mb-2"/>
        <ProductGrid products={products}/>

        <Pagination totalPages={totalPages}/>
      </div>
    </>
  )
}
