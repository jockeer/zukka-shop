'use server'

import prisma from '@/lib/prisma';
import type { Gender } from '@prisma/client';

interface PaginationOptions {
    gender?: Gender;
    page?: number;
    take?: number;
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    try {
        //1. Obtener los productos
        const [ products, totalProducts ] = await Promise.all([
            prisma.product.findMany({
                take: take,
                skip:( page - 1) * take,
                include: {
                    ProductImage: {
                        take: 2,
                        select: {
                            url: true
                        }
                    }
                },
                where: {
                   gender 
                }
                
            }),
            prisma.product.count({
                where: {
                    gender
                }
            })
        ])

        //2. Obtener el total de paginas
        const totalPages = Math.ceil( totalProducts / take )

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map( product => ({
                ...product,
                images: product.ProductImage.map( images => images.url)
            }))
        };
        
    } catch (error) {
        throw new Error('no se pudo cargar lo productos')
    }
}