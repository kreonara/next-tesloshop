'use client'

import { PayPalOneTimePaymentButton } from "@paypal/react-paypal-js/sdk-v6"

interface OnApproveDataOneTimePayments {
  orderId: string
}

const PayPalButton = () => {
  return (
    <PayPalOneTimePaymentButton 
      createOrder={async () => {
        const response = await fetch("/api/create-order", {
          method: "POST",
        });
        const { orderId } = await response.json();
        return { orderId };
      }}
      onApprove={async ({ orderId }: OnApproveDataOneTimePayments) => {
        await fetch(`/api/capture-order/${orderId}`, {
          method: "POST",
        });
        console.log("Payment captured!");
      }}
    />
  )
}

export default PayPalButton