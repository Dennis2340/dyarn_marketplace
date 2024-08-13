
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { v4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });
    if (!productId || !quantity || quantity <= 0) return new Response("Invalid input", { status: 400 });

    // Retrieve the product to get the price
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) return new Response("Product not found", { status: 404 });

    const totalPrice = product.price * quantity;

    // Fetch and decrypt payment details
    const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-details`, {
      method: 'GET',
      headers: {
         
      },
    });

    if (!paymentResponse.ok) return new Response("Failed to fetch payment details", { status: 500 });

    const paymentDetail = await paymentResponse.json();

    console.log("this is the payment details: ", paymentDetail)
    // Encrypt sensitive data before making the request to external API
    const { monimeSpaceId, monimeAuthorizationKey } = paymentDetail;

    // Make payment request
    const idempotencyKey = v4();
    const monimeSessionResponse = await fetch('https://api.monime.space/v1/checkout-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Monime-Space-Id': monimeSpaceId,
        'Authorization': `Bearer ${monimeAuthorizationKey}`,
        'X-Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({
        clientReference: `order-${userId}-${Date.now()}`,
        callbackUrlState: `order-${userId}-${Date.now()}`,
        bulk: {
          amount: {
            "currency": "SLE",
            "value": totalPrice,
          },
        },
        // write an enpoints to handle this webhooks // for the market place //
        cancelUrl: `${process.env.CPH_REDIRECT_URL}/api/monime-redirect-cancel?price=${totalPrice}`,
        receiptUrl: `${process.env.CPH_REDIRECT_URL}/api/monime-redirect?price=${totalPrice}&monimeSessionId=${idempotencyKey}&userId=${userId}`,
      }),
    });

    if (!monimeSessionResponse.ok) return new Response("Payment request failed", { status: 500 });

    const sessionData = await monimeSessionResponse.json();

    return new Response(JSON.stringify(sessionData), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Error Occurred", error }), {
      status: 500,
    });
  }
}
