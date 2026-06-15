import { prisma } from "@/src/lib/prisma"
import { getPayPalAccessToken } from "@/src/utils/paypal"

export async function POST(req: Request) {
  const { paypalOrderId } = await req.json()
  const accessToken = await getPayPalAccessToken()

  const response = await fetch(`${process.env.PAYPAL_ORDERS_URL}/${paypalOrderId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  const { status } = data
  const orderId = data.purchase_units[0].reference_id

  console.dir(data, { depth: null })

  if(status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Aún no se a realizado el pago en PayPal'
    }
  }

  await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      isPaid: true,
      paidAt: new Date()
    }
  })


  return Response.json({ ok: true })
}