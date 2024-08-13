import { db } from "@/db";
import { model } from "@/lib/model";
import { getTitleDescriptionEmbeddings } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, imageUrl } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });
    
    const dbUser = await db.user.findFirst({
        where: { id: userId },
      });
    if (!dbUser) return new Response("Unauthorized", { status: 401 });
  
    // embed the title, and description //
    const { titleEmbedding, descriptionEmbedding} = await getTitleDescriptionEmbeddings({title, description})

    const newProduct = await db.product.create({
      data: {
        title,
        description,
        titleEmbedding: titleEmbedding,
        descriptionEmbedding: descriptionEmbedding,
        price,
        imageUrl,
        user: { connect: { id: dbUser.id } },
      },
    });

    return new Response(JSON.stringify(newProduct), {
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
    const products = await db.product.findMany({
      include: {
        user: true,       
        ratings: true,   
      },
    });

    return new Response(JSON.stringify(products), {
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

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description, price, imageUrl } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });
    if (!id) return new Response("Invalid product ID", { status: 400 });

    // Check if the product belongs to the user
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct || existingProduct.userId !== userId) return new Response("Unauthorized", { status: 403 });

    // Update the product
    const updatedProduct = await db.product.update({
      where: { id },
      data: { title, description, price, imageUrl },
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

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });
    if (!id) return new Response("Invalid product ID", { status: 400 });

    // Check if the product belongs to the user
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct || existingProduct.userId !== userId) return new Response("Unauthorized", { status: 403 });

    // Delete the product
    await db.product.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: "Product deleted" }), {
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
