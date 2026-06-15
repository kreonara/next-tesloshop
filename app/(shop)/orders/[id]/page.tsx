import { getOrderById } from "@/actions/order/get-order-by-id.action";
import PayPalButton from "@/components/paypal/PayPalButton";
import Title from "@/components/ui/title/Title";
import { currencyFormat } from "@/src/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

interface Props {
  params: Promise<{ id: string }>
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params

  const { ok, order } = await getOrderById(id)
  if(!ok) redirect('/')

  const address = order!.OrderAddress

  return (
    <div className="flex justify-center items-center mb-10 px-10 sm:px-0">
      <div className="flex flex-col w-250">
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          <div className="flex flex-col mt-5">

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': !order!.isPaid,
                  'bg-green-700': order!.isPaid,
                }
              )
            }>
              <IoCartOutline size={30} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">
                {
                  order?.isPaid ? 'Pagada' : 'No pagada'
                }
              </span>
            </div>

            {/* ITEMS */}
            {
              order!.OrderItem.map( item => (
                <div className="flex mb-5" key={item.product.slug + '-' + item.size}>
                  <Image 
                    src={`/products/${item.product.ProductImage[0].url}`}
                    alt={item.product.title}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    className="mr-5 rounded"
                  />

                  <div>
                    <p>{item.product.title}</p>
                    <p>{item.price} x {item.quantity}</p>
                    <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* CHECKOUT - RESUMEN DE LA ORDEN */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{address!.firstName} {address!.lastName}</p>
              <p>{address!.address!}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>{address!.city}, {address!.countryId}</p>
              <p>Tel: {address!.phone}</p>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-0.5 rounded bg-gray-200 my-10" />


            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">{order?.itemsInOrder === 1 ? '1 artículo' : `${order?.itemsInOrder} artículos`}</span>
              
              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order!.subTotal)}</span>
              
              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>
              
              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">{currencyFormat(order!.total)}</span>
            </div>
            
            <div className="mt-5 mb-2 w-full text-center">

              {
                order?.isPaid
                  ? (
                    <div className={
                      clsx(
                        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                        {
                          'bg-red-500': !order!.isPaid,
                          'bg-green-700': order!.isPaid,
                        }
                      )
                    }>
                      <IoCartOutline size={30} />
                      {/* <span className="mx-2">Pendiente de pago</span> */}
                      <span className="mx-2">
                        {
                          order?.isPaid ? 'Pagada' : 'No pagada'
                        }
                      </span>
                    </div>
                  ) : (
                    <PayPalButton orderId={order!.id} />
                  )
              }


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}