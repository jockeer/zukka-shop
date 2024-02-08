import { initialData } from "./seed";
import { countries } from "./seed-countries";
import prisma from '../lib/prisma';


async function main(){

    //1. borrar registros previos
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.country.deleteMany();
   
    const { categories, products, users } = initialData;
    
    

    await prisma.user.createMany({
        data: users
    })

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

    // console.log(categoriesMap);

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

    //SEED COUNTRIES

    await prisma.country.createMany({
        data: countries
    })

    console.log('ejectudado correctamente');
} 

(() => {
    if(process.env.NODE_ENV === 'production') return;
    main()
})();