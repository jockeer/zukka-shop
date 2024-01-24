'use client'
import { useState } from 'react'

import { QuantitySelector, SizeSelector } from '@/components'
import { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store';

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props ) => {

    const addProductToCart = useCartStore( state => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined >();
    const [quantity, setQuantity] = useState<number>(1);
    const [error, setError] = useState<boolean>(false);
    
    const addToCart = () => {
        if (!size) return setError(true);

        const productCart: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }

        addProductToCart(productCart)

        setError(false);
        setSize(undefined);
        setQuantity(1);
    }

    return (
        <>
            <SizeSelector selectedSize={size} availableSizes={product.sizes} onSizeSelected={setSize}/>
            <QuantitySelector quantity={ quantity } setQuantity={setQuantity}/>
            {error && <p className='mt-5 text-red-500 font-semibold fade-in'>- Choose a Size</p> }
            <button onClick={addToCart} className="btn-primary my-5">Add to Cart</button>
        </>
    )
}
