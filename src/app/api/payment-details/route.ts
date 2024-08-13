// app/api/payment-details/create/route.ts
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { encrypt, decrypt } from "@/lib/encryption"; // Import the encryption utility

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { monimeSpaceId, monimeAuthorizationKey } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const dbUser = await db.user.findFirst({
        where: { id: userId },
      });
    if (!dbUser) return new Response("Unauthorized", { status: 401 });
  
    // Encrypt sensitive data
    const encryptedMonimeSpaceId = encrypt(monimeSpaceId);
    const encryptedMonimeAuthorizationKey = encrypt(monimeAuthorizationKey);

    const newPaymentDetail = await db.paymentDetail.create({
      data: {
        userId: dbUser.id,
        monimeSpaceId: encryptedMonimeSpaceId,
        monimeAuthorizationKey: encryptedMonimeAuthorizationKey,
      },
    });

    return new Response(JSON.stringify(newPaymentDetail), {
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


export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { monimeSpaceId, monimeAuthorizationKey } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const dbUser = await db.user.findFirst({
        where: { id: userId },
      });
    if (!dbUser) return new Response("Unauthorized", { status: 401 });
  
    // Encrypt sensitive data
    const encryptedMonimeSpaceId = encrypt(monimeSpaceId);
    const encryptedMonimeAuthorizationKey = encrypt(monimeAuthorizationKey);

    const updatedPaymentDetail = await db.paymentDetail.update({
      where: { userId: dbUser.id },
      data: {
        monimeSpaceId: encryptedMonimeSpaceId,
        monimeAuthorizationKey: encryptedMonimeAuthorizationKey,
      },
    });

    return new Response(JSON.stringify(updatedPaymentDetail), {
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
  
    const paymentDetail = await db.paymentDetail.findUnique({
      where: { userId:  dbUser.id},
    });

    if (!paymentDetail) return new Response("Payment details not found", { status: 404 });

    // Decrypt sensitive data before sending it to the client
    const decryptedMonimeSpaceId = decrypt(paymentDetail.monimeSpaceId);
    const decryptedMonimeAuthorizationKey = decrypt(paymentDetail.monimeAuthorizationKey);

    return new Response(
      JSON.stringify({
        ...paymentDetail,
        monimeSpaceId: decryptedMonimeSpaceId,
        monimeAuthorizationKey: decryptedMonimeAuthorizationKey,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Error Occurred", error }), {
      status: 500,
    });
  }
}


