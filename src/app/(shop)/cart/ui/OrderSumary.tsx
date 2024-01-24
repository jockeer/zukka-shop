'use client'

import { useCartStore } from "@/store";
import { useEffect, useState } from "react"

export const OrderSumary = () => {
    const [loaded, setLoaded] = useState(false);
    const { subTotal, tax, total, totalItems } = useCartStore( state => state.getSummaryInformation() )

    useEffect(() => {
      setLoaded(true);
      
    }, [])
    
    if (!loaded) return <p>Loading..</p>
    return (
        <div className="grid grid-cols-2">
            <span>No. Products</span>
            <span className="text-right">{totalItems} Items</span>

            <span>Subtotal</span>
            <span className="text-right">$ {subTotal.toFixed(2)}</span>

            <span>Taxes (15%) </span>
            <span className="text-right">$ {tax.toFixed(2)}</span>

            <span className="mt-5 text-2xl">Total </span>
            <span className="text-right mt-5 text-2xl font-semibold">$ {total.toFixed(2)}</span>
        </div>
    )
}
