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

    const totalPrice = product.price * quantity;

    // Create the order
    const newOrder = await db.order.create({
      data: {
        userId,
        productId,
        quantity,
        totalPrice,
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
