'use client'

import { PayPalOneTimePaymentButton, usePayPal, INSTANCE_LOADING_STATE } from "@paypal/react-paypal-js/sdk-v6"
import { useRouter } from "next/navigation"

interface Props {
  orderId: string
}

const PayPalButton = ({ orderId }: Props) => {
  const router = useRouter()
  const { loadingStatus } = usePayPal()

  if(loadingStatus === INSTANCE_LOADING_STATE.PENDING) {
    return (
      <div className="animate-pulse">
        <div className="h-11 bg-gray-300 rounded-md"></div>
      </div>
    )
  }

  const createOrder = async() => {
    const response = await fetch('/api/paypal/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderId })
    })

    const data = await response.json()

    return {
      orderId: data.paypalOrderId
    }
  }

  const onApprove = async(data: any) => {
    const response = await fetch('/api/paypal/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({paypalOrderId: data.orderId})
    })

    const result = await response.json()
    console.log(result)

    router.refresh()
  }

  return (
    <PayPalOneTimePaymentButton
      createOrder={ createOrder }
      onApprove={ onApprove }
    />
  )
}

export default PayPalButton