'use client'

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";

export const ProductsInCart = () => {
    const productsInCart = useCartStore(state => state.cart);
    const removeProduct = useCartStore(state => state.removeProduct);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
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
                    <Link className="hover:text-amber-900 font-semibold cursor-pointer" href={`/product/${product.slug}`}>
                        <p><span className="font-bold text-amber-900">{product.size} - </span> {product.title}</p>
                    </Link>
                    <p>$ {product.price.toFixed(2)}</p>
                    <QuantitySelector quantity={ product.quantity } setQuantity={ quantity => updateProductQuantity(product, quantity)}/>
                    <button onClick={() => removeProduct(product)} className="underline mt-3"><IoTrash size={20} color="red"/> </button>
                </div>
                </div>
            ))}
        </>
    )
}
