import { db } from "@/db";

export async function GET(req: Request, { params }: { params: { productId: string } }) {
  try {
    const { productId } = params
    if (!productId) return new Response("Product ID is required", { status: 400 });

    const product = await db.product.findUnique({
      where: { id: productId },
      include: {
        user: true,       
        ratings: true,     
      },
    });

    if (!product) return new Response("Product not found", { status: 404 });

    return new Response(JSON.stringify(product), {
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
