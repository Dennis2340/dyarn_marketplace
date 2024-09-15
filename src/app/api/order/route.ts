import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });
    if (!productId || !quantity || quantity <= 0) return new Response("Invalid input", { status: 400 });

    const dbUser = await db.user.findFirst({
      where: { id: userId },
    });
    if (!dbUser) return new Response("Unauthorized", { status: 401 });

    // Retrieve the product to get the price
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) return new Response("Product not found", { status: 404 });

    let totalPrice = product.price * quantity;
    let paidAmount = totalPrice; // Default for non-preorders
    let balanceDue = 0.0;
    let paymentStatus = "PAID";

    if (product.isPreorder) {
      paidAmount = product.preorderPrice ? product.preorderPrice * quantity : 0.0;
      balanceDue = totalPrice - paidAmount;
      paymentStatus = "PARTIALLY_PAID";
    }

    // Create the order
    const newOrder = await db.order.create({
      data: {
        userId,
        productId,
        quantity,
        totalPrice,
        paymentStatus,
        isPreorder: product.isPreorder,
        paidAmount,
        balanceDue,
      },
    });

    return new Response(JSON.stringify(newOrder), {
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

export async function GET(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const dbUser = await db.user.findFirst({
      where: { id: userId },
    });
    if (!dbUser) return new Response("Unauthorized", { status: 401 });

    // Retrieve orders for the user
    const orders = await db.order.findMany({
      where: { userId: dbUser.id },
      include: {
        product: true,
      },
    });

    return new Response(JSON.stringify(orders), {
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
