import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    // Get query parameters for pagination
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const skip = (page - 1) * pageSize;

    // Fetch paginated products for the seller
    const sellerProducts = await db.product.findMany({
      where: { userId },
      include: {
        user: true,
        ratings: true,
      },
      skip,
      take: pageSize,
    });

    // Get the total count of products
    const totalProducts = await db.product.count({ where: { userId } });

    // Return products and pagination metadata
    return new Response(
      JSON.stringify({
        products: sellerProducts,
        totalProducts,
        page,
        pageSize,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error occurred", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
