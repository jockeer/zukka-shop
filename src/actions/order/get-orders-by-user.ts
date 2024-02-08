'use server'

import { auth } from "@/auth.config"
import prisma from '@/lib/prisma';

export const getOrdersByUser = async() => {
    const session = await auth();
    if (!session?.user) return {ok: false, msg: 'El usuario debe estar autenticado'}
    const orders = await prisma.order.findMany({
        where: { userId: session?.user.id},
        include: {
            OrderItem: {
                select:{
                    price:true,
                    quantity:true,
                    size:true,
                    producto:{
                        select:{
                            title: true
                        }
                    }

                }
            }
        }
    })
    console.log(JSON.stringify(orders));
    return orders;
}