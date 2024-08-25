import { db } from "@/db";
import { getTitleDescriptionEmbeddings } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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

export async function PUT(req: Request, { params }: { params: { productId: string } }) {
  try {
    const body = await req.json();
    const { id, title, description, price, imageUrl } = body;

    const {productId} = params
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });
    if (!productId) return new Response("Invalid product ID", { status: 400 });

    // Check if the product belongs to the user
    const existingProduct = await db.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct || existingProduct.userId !== userId) return new Response("Unauthorized", { status: 403 });

    // embed the title, and description //
    const { titleEmbedding, descriptionEmbedding} = await getTitleDescriptionEmbeddings({title, description})


    // Update the product
    const updatedProduct = await db.product.update({
      where: { id: productId },
      data: { 
        title, 
        description, 
        price, 
        imageUrl,
        titleEmbedding,
        descriptionEmbedding,
      },
    });

    return new Response(JSON.stringify(updatedProduct), {
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