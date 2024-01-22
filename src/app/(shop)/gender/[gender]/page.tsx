export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import type { Gender } from "@prisma/client";


interface Props {
  params: {
    gender: Gender;
  },
  searchParams:{
    page?: string;
  }
}

export default async function GenderPage({ params, searchParams }: Props) {
  
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page): 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender })
  return (
    <div>
      <Title title="Articles for " spanTitle={gender}  subtitle="All Products" className="mb-2 capitalize"/>
      <ProductGrid products={products}/>
      <Pagination totalPages={totalPages}/>
    </div>
  );
}