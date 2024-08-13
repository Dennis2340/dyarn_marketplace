import { db } from "@/db";

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  try {
     const { orderId } = params

    if (!orderId) return new Response("Order ID is required", { status: 400 });

    // Retrieve the order by ID
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        product: true,
      },
    });

    if (!order) return new Response("Order not found", { status: 404 });

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Error Occurred", error }), {
      status: 500,
    });
  }
}
