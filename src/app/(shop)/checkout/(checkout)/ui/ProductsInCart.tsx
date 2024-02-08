'use client'

import { useCartStore } from "@/store"
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
    const productsInCart = useCartStore(state => state.cart);
    const [loaded, seLoaded] = useState(false);

    useEffect(() => {
      seLoaded(true);
    }, [])
    
    if (!loaded) {
        return <p>Loading...</p>
    }
    return (
        <>
            { productsInCart.map( product => (
                <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                <Image src={`/products/${product.image}`} width={100} height={100} style={{width: 100, height: 100}} alt={product.title} className="mr-5 rounded"/>
                <div>
                    <span className="hover:text-amber-900 font-semibold">
                        <p><span className="font-bold text-amber-900">{product.size} - </span> {product.title} ({product.quantity})</p>
                    </span>
                    <p>$ {(product.price * product.quantity).toFixed(2)}</p>
                </div>
                </div>
            ))}
        </>
    )
}
