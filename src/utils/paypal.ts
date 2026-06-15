const PAYPAL_BASE = "https://api-m.sandbox.paypal.com"

export const getPayPalAccessToken = async () => {
  const auth = Buffer.from(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
  ).toString("base64")

  const response = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()

  return data.access_token as string
}