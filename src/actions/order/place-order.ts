'use server'

import { auth } from "@/auth.config";
import type { Address, Product, Size } from "@/interfaces";
import prisma from '@/lib/prisma';

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async ( productsIds: ProductToOrder[], address: Address ) => {
    const session = await auth()
    if ( !session?.user.id ) return { ok: false, message: 'No user session'}
    try {  
        const products = await prisma.product.findMany({
            where:{
                id: {
                    in: productsIds.map(p=> p.productId)
                }
            }
        });
        const itemsInOrder = productsIds.reduce( ( count, p ) => count + p.quantity , 0)
        
        //todo: Los totales de tax, subtotal y total
        const { subTotal, tax, total } = productsIds.reduce(( totals, item ) => {
            
            const productQuantity = item.quantity;
            const product = products.find( (p: Product)  => p.id === item.productId);
            if (!product) throw new Error(`${ item.productId } no existe - 500`)
            
            const subTotal = product.price * productQuantity;
            totals.subTotal += subTotal;
            totals.tax += subTotal * 0.15;
            totals.total += subTotal * 1.15;

            return totals;
        }, { subTotal: 0, tax: 0, total: 0 })

        //todo: Crear la transaccion
        const prismaTx = await prisma.$transaction( async(tx: any) => {
            //1. Actualizar el stock de los productos.
            const updatedProductsPrimises = products.map( (product: Product)=>{
                //Acumular los valores
                const productQuantity = productsIds.filter(
                    p=>p.productId=== product.id
                ).reduce((acc, item) => item.quantity + acc, 0)

                if (productQuantity === 0) {
                 throw new Error(`${product.id} no tiene cantidad definida`)   
                }

                return tx.product.update({
                    where: { id: product.id },
                    data: { 
                        //!! inStock: product.inStock - productQuantity no hacer
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                });

            })
            const updatedProducts = await Promise.all(updatedProductsPrimises)
            // Verificar valores negativos en las existencias = NO HAY STOCK
            updatedProducts.forEach((product:Product) => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} no tiene inventario sufuciente`)
                }
            });

            //2. Crear la orden - Encabezado - detalle
            const order = await tx.order.create({
                data:{
                    userId: session.user.id,
                    itemsInOrder,
                    subTotal,
                    tax,
                    total,
                    OrderItem: {
                        createMany: {
                            data: productsIds.map( p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find( (product: Product) => product.id === p.productId)?.price ?? 0

                            }))
                        }
                    }
                }
            })
            console.log('---order---', order);
            // Validar si el price es 0, lanzar un error
            const { country, userId = '', id = '', ...restAddress } = address
            console.log('----restAddress---', restAddress);
            const orderAddress = await tx.orderAddress.create({
                data: {
                    orderId: order.id,
                    countryId: country,
                    ...restAddress,  
                }
            })
            //3. Crear la direccion de la orden
            return {
                order: order,
                updatedProducts: updatedProducts,
                orderAddress: orderAddress
            }

        })
        return {
            ok: true,
            order: prismaTx.order,
            prismaTx,
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            msg: `${error}`
        }
    }
}