import { prisma } from "@/src/lib/prisma"
import { getPayPalAccessToken } from "@/src/utils/paypal"


export async function POST(req: Request) {
  const paypalOrdersUrl = process.env.PAYPAL_ORDERS_URL ?? ''
  const { orderId } = await req.json()

  const order = await prisma.order.findUnique({
    where: { id: orderId }
  })
  if(!order) {
    return Response.json({
      ok: false,
      message: "Orden no encontrada"
    }, {status: 404})
  }

  const accessToken = await getPayPalAccessToken()

  const paypalResponse = await fetch(paypalOrdersUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: order.id,
          amount: {
            currency_code: "USD",
            value: (Math.round(order.total * 100)) / 100
          }
        }
      ]
    })
  })

  const paypalOrder = await paypalResponse.json()

  await prisma.order.update({
    where: { id: orderId },
    data: {
      transactionId: paypalOrder.id
    }
  })

  return Response.json({
    ok: true,
    paypalOrderId: paypalOrder.id
  })
}