import { getOrderById } from "@/actions";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
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

export default async function OrderPage({ params }: Props ) {
  const { id } = params;

  //Todo : verificar id
  const response = await getOrderById(id);
  const { order } = response;
  const { OrderAddress, OrderItem } = order;

  return (
    <div className="flex justify-center items-center mb-52 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #`} spanTitle={id}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/*  Carrito */}
            <div className="flex flex-col mt-5">

              <div className={
                clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',{
                  'bg-red-500': !order.isPaid,
                  'bg-green-700': order.isPaid,
                })
              }>
                <IoCardOutline size={30}/>
                {/* <span className="mx-2">Pending</span> */}
                <span className="mx-2">{order.isPaid ? 'Order paid':'Pending'}</span>
              </div>
            
            {/*  Items */}
            { OrderItem.map( (item:any) => (
              <div key={item.id} className="flex mb-5">
                <Image src={`/products/${item.producto.ProductImage[0].url}`} width={100} height={100} style={{width: 100, height: 100}} alt={item.producto.title} className="mr-5 rounded"/>
                <div>
                  <p>{item.producto.title}</p>
                  <p>$ {item.price.toFixed(2)} x {item.quantity}</p>
                  <p  className="font-bold"> Subtotal: ${ (item.price * item.quantity).toFixed(2)} </p>
                </div>
              </div>
            ))}

          </div>
          {/*  Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
              <h2 className="text-2xl mb-2 capitalize font-semibold">delivery address</h2>
              <div className="mb-10 grid grid-cols-2">
                <p className="font-semibold">Name:</p>
                <span>{OrderAddress.firstName} {OrderAddress.lastName}</span>
                <p className="font-semibold">Address:</p>
                <span>{OrderAddress.address}</span>
                <p className="font-semibold">Address2:</p>
                <span>{OrderAddress.address2}</span>
                <p className="font-semibold">Zip code: </p>
                <span>{OrderAddress.postalCode}</span>
                <p className="font-semibold">Country: </p>
                <span>{OrderAddress.countryId}</span>
                <p className="font-semibold">City: </p>
                <span>{OrderAddress.city}</span>
                <p className="font-semibold">Phone: </p>
                <span>{OrderAddress.phone}</span>
              </div>
              <div className="w-full h-0.5 rounded bg-amber-900 mb-10"/>
              <h2 className="text-2xl mb-2 font-semibold">Summary</h2>
              <div className="grid grid-cols-2">
                <span>No. Products</span>
                <span className="text-right">{order.itemsInOrder} Items</span>
                
                <span>Subtotal</span>
                <span className="text-right">$ {order.subTotal.toFixed(2)}</span>

                <span>Taxes (15%) </span>
                <span className="text-right">$ {order.tax.toFixed(2)}</span>

                <span className="mt-5 text-2xl">Total </span>
                <span className="text-right mt-5 text-2xl font-semibold">$ {order.total.toFixed(2)}</span>
              </div>
              <div className="mt-5 mb-2 w-full">

                <div className={
                  clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',{
                    'bg-red-500': !order.isPaid,
                    'bg-green-700': order.isPaid,
                  })
                }>
                  <IoCardOutline size={30}/>
                  {/* <span className="mx-2">Pending</span> */}
                  <span className="mx-2">{order.isPaid ? 'Order paid':'Pending'}</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}