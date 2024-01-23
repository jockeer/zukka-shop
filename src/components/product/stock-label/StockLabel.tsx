'use client'
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
   slug: string; 
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    
    const getStock = async () => {
        const stock = await getStockBySlug(slug)
        setStock(stock);
        setIsLoading(false)
    }

    useEffect(() => {
         getStock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
        { isLoading ? (
            <h1 className={`${titleFont.className} antialiased font-semibold text-lg bg-gray-200 animate-pulse`}>
                &nbsp;
            </h1>
            
        ) : (
            <h1 className={`${titleFont.className} antialiased font-semibold text-lg`}>
                Stock: <span className="text-amber-900">{stock}</span>
            </h1>
        )}
        </>
    )
}
