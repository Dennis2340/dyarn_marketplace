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
