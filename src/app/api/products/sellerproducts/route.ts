import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req: Request) {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      const userId = user?.id;
  
      const sellerProducts = await db.product.findMany({
          where: { userId },
          include: {
            user: true,       
            ratings: true,   
          },
      });
  
      return new Response(JSON.stringify(sellerProducts), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ message: "Error occurred", error }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }