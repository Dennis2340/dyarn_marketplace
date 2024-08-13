import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, value } = body; // `value` should be +1 for thumbs up or -1 for thumbs down

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });
    const dbUser = await db.user.findFirst({
        where: { id: userId },
      });
    if (!dbUser) return new Response("Unauthorized", { status: 401 });
  
    if (!productId || ![1, -1].includes(value)) {
      return new Response("Invalid input", { status: 400 });
    }

    // Check if a rating by this user for this product already exists
    const existingRating = await db.rating.findFirst({
      where: {
        userId: dbUser.id,
        productId,
      },
    });

    if (existingRating) {
      // Update the existing rating
      const updatedRating = await db.rating.update({
        where: {
          id: existingRating.id,
        },
        data: {
          value,
        },
      });

      return new Response(JSON.stringify(updatedRating), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // Create a new rating
      const newRating = await db.rating.create({
        data: {
          value,
          user: { connect: { id: dbUser.id } },
          product: { connect: { id: productId } },
        },
      });

      return new Response(JSON.stringify(newRating), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Error Occurred", error }), {
      status: 500,
    });
  }
}
