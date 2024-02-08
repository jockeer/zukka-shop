'use client'
import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PlaceOrder = () => {
    const router = useRouter()
    const [loaded, setLoaded] = useState(false)
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)
    const [error, serError] = useState('')
    
    const address = useAddressStore(state => state.address)
    const { subTotal, tax, total, totalItems } = useCartStore( state => state.getSummaryInformation() )
    const clearCart = useCartStore( state => state.clearCart )
    const cart = useCartStore(state => state.cart);

    useEffect(() => {
      setLoaded(true)
    }, [])

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true);
        
        const productsToOrder = cart.map( product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }))
        console.log({address, productsToOrder});

        const resp = await placeOrder(productsToOrder, address)
        console.log({resp});
        if (!resp.ok) {
            setIsPlacingOrder(false)
            serError(resp.msg!);
            return;
        }
        clearCart()
        router.replace('/orders/' + resp.order?.id)

    }

    if (!loaded) {
        return <p>Loading...</p>
    }
    
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
        <h2 className="text-2xl mb-2 capitalize font-semibold">delivery address</h2>
        <div className="mb-10 grid grid-cols-2">
        <p className="font-semibold">Name:</p>
        <span>{address.firstName} {address.lastName}</span>
        <p className="font-semibold">Address:</p>
        <span>{address.address}</span>
        <p className="font-semibold">Address 2:</p>
        <span>{address.address2}</span>
        <p className="font-semibold">Zip code: </p>
        <span>{address.postalCode}</span>
        <p className="font-semibold">Country: </p>
        <span>{address.country}</span>
        <p className="font-semibold">City: </p>
        <span>{address.city}</span>
        <p className="font-semibold">Phone: </p>
        <span>{address.phone}</span>
        </div>
        <div className="w-full h-0.5 rounded bg-amber-900 mb-10"/>
        <h2 className="text-2xl mb-2 font-semibold">Summary</h2>
        <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">{totalItems} items</span>
        
        <span>Subtotal</span>
        <span className="text-right">$ {subTotal.toFixed(2)}</span>

        <span>Taxes (15%) </span>
        <span className="text-right">$ {tax.toFixed(2)}</span>

        <span className="mt-5 text-2xl">Total </span>
        <span className="text-right mt-5 text-2xl font-semibold">$ {total.toFixed(2)}</span>
        </div>
        <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
            <span className="text-xs">
            By clicking <span className="font-bold">&quot;Place Order&quot;</span>, you agree to our <a href="#" className="underline text-amber-900 font-bold hover:text-amber-700">Terms and Conditions</a>  and <a href="#" className="underline text-amber-900 font-bold hover:text-amber-700">Privacy Policy</a>
            </span>
        </p>
        {/* <button href={'/orders/123'} className="flex btn-primary justify-center"> */}
        <p className='text-red-500 font-semibold m-2 text-sm'>{error}</p>
        <button 
            disabled={isPlacingOrder}
            onClick={onPlaceOrder} className={clsx( "justify-center w-full",{
            'btn-primary': !isPlacingOrder,
            'btn-disable': isPlacingOrder,
        })}>
            Place Order
        </button>
        </div>
    </div>
  )
}
