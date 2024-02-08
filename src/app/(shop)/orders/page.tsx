// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser } from '@/actions';
import { Title } from '@/components';
import clsx from 'clsx';

import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersPage() {

  const orders = await getOrdersByUser();
  console.log({orders});
  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-amber-900 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                Products
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                State
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map( (order: any) => (
              <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id.substring(0, 7)}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderItem.map((item:any, i:any) =>(
                    <span key={i}>
                      <span className='font-semibold'>-</span> { item.producto.title }
                      <br />
                    </span>
                  ))}
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <div className='flex items-center '>
                      <IoCardOutline className={clsx("font-semibold",{
                        "text-green-800": order.isPaid,
                        "text-red-800": !order.isPaid,
                      })} />
                      <span className={clsx("mx-2 font-semibold",{
                        "text-green-800": order.isPaid,
                        "text-red-800": !order.isPaid,
                
                      })}>{order.isPaid ? 'Paid': 'Pending'}</span>

                    </div>

                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href={`/orders/${order.id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>

              </tr>
            ))}


          </tbody>
        </table>
      </div>
    </>
  );
}