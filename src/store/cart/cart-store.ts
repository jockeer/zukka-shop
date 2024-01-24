import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[];
    getTotalItem: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        totalItems: number;
    };
    addProductToCart: (product: CartProduct ) => void;
    updateProductQuantity: ( product: CartProduct, quantity: number) => void;
    removeProduct: ( product: CartProduct) => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) =>({
            cart: [],
            getTotalItem: () => {
                const { cart } = get();
                return cart.reduce( ( total, item ) => total + item.quantity, 0 )
            },
            getSummaryInformation: () => {
                const { cart } = get();
                const subTotal = cart.reduce( (subtotal, product) => product.quantity * product.price + subtotal, 0);

                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const totalItems = cart.reduce( ( total, item ) => total + item.quantity, 0 )
                return {
                    subTotal,
                    tax,
                    total,
                    totalItems
                }

            },
            addProductToCart: ( product: CartProduct ) => {
                const { cart } = get();
                //* 1. Revisar si el producto seleccionado ya existe en el carrito 

                const productInCart = cart.some( itemCart => (itemCart.id === product.id && itemCart.size === product.size));

                if (!productInCart) return set({ cart: [ ...cart, product ] })

                //* 2. Se que el producto existe por talla.. entonces tengo que aumentar

                const updatedCartProducts = cart.map( itemCart => {
                    if (itemCart.id === product.id && itemCart.size === product.size){
                        return { ...itemCart, quantity: itemCart.quantity + product.quantity}
                    }
                    return itemCart
                })

                set({ cart: updatedCartProducts })
                
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();
                const productInCart = cart.map( itemCart => {
                    if (itemCart.id === product.id && itemCart.size === product.size) {
                        return {...itemCart, quantity: quantity}
                    }
                    return itemCart;
                });
                set({ cart: productInCart })
                
            },
            removeProduct: ( product: CartProduct) => {
                const { cart } = get();
                const updateCartProducts = cart.filter(item => item.id !== product.id || item.size !== product.size)
                set({ cart: updateCartProducts })
            }
        })
        ,{
            name:'shopping-cart',
        }
    )

)