import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  params: {
    id: string;
  }
}

export default function OrderPage({ params }: Props ) {
  const { id } = params;
  //Todo : verificar id

  return (
    <div className="flex justify-center items-center mb-52 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #`} spanTitle={id}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/*  Carrito */}
            <div className="flex flex-col mt-5">

              <div className={
                clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',{
                  'bg-red-500': false,
                  'bg-green-700': true,
                })
              }>
                <IoCardOutline size={30}/>
                {/* <span className="mx-2">Pending</span> */}
                <span className="mx-2">Order paid</span>
              </div>
            
            {/*  Items */}
            { productsInCart.map( product => (
              <div key={product.slug} className="flex mb-5">
                <Image src={`/products/${product.images[0]}`} width={100} height={100} style={{width: 100, height: 100}} alt={product.title} className="mr-5 rounded"/>
                <div>
                  <p>{product.title}</p>
                  <p>$ {product.price.toFixed(2)} x 3</p>
                  <p  className="font-bold"> Subtotal: ${ product.price * 3 } </p>
                </div>
              </div>
            ))}

          </div>
          {/*  Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
              <h2 className="text-2xl mb-2 capitalize font-semibold">delivery address</h2>
              <div className="mb-10 grid grid-cols-2">
                <p className="font-semibold">Name:</p>
                <span>Daniel Gorianz Ferrufino</span>
                <p className="font-semibold">Address:</p>
                <span>Av. Radial 13, B. Guapuro</span>
                <p className="font-semibold">Zip code: </p>
                <span>00000</span>
                <p className="font-semibold">Country: </p>
                <span>Bolivia</span>
                <p className="font-semibold">City: </p>
                <span>Santa Cruz</span>
                <p className="font-semibold">Phone: </p>
                <span>+591 76597228</span>
              </div>
              <div className="w-full h-0.5 rounded bg-amber-900 mb-10"/>
              <h2 className="text-2xl mb-2 font-semibold">Summary</h2>
              <div className="grid grid-cols-2">
                <span>No. Products</span>
                <span className="text-right">3 Items</span>
                
                <span>Subtotal</span>
                <span className="text-right">$ 100</span>

                <span>Taxes (15%) </span>
                <span className="text-right">$ 100</span>

                <span className="mt-5 text-2xl">Total </span>
                <span className="text-right mt-5 text-2xl font-semibold">$ 100</span>
              </div>
              <div className="mt-5 mb-2 w-full">

                <div className={
                  clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',{
                    'bg-red-500': false,
                    'bg-green-700': true,
                  })
                }>
                  <IoCardOutline size={30}/>
                  {/* <span className="mx-2">Pending</span> */}
                  <span className="mx-2">Order paid</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}