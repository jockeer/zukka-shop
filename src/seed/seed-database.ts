import { initialData } from "./seed";
import prisma from '../lib/prisma';


async function main(){

    //1. borrar registros previos
    
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
   
    const { categories, products } = initialData;
    
    // SEED CATEGORIES
    const categoriesData = categories.map( category => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData,
    })


    const categoriesDb = await prisma.category.findMany()

    const categoriesMap = categoriesDb.reduce(( map, category) => {
        map[ category.name.toLowerCase()] = category.id
        return map;
    }, {} as Record<string, string>);

    console.log(categoriesMap);

    //SEED PRODUCTS

    products.forEach( async product => {
        const { type, images, ...rest} = product
        const dbProduct= await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })
        
        const imagesData = images.map( image =>({
            url: image,
            productId: dbProduct.id
        }))
        await prisma.productImage.createMany({
            data: imagesData
        })
    })    
    console.log('ejectudado correctamente');
} 

(() => {
    if(process.env.NODE_ENV === 'production') return;
    main()
})();