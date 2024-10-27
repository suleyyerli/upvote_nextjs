import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { propositionId, action } = await req.json();

    if (action !== "like" && action !== "dislike") {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ message: "Pas connecté" }, { status: 401 });
    }

    const updateData =
      action === "like"
        ? { likes: { increment: 1 } }
        : { dislikes: { increment: 1 } };

    const updatedProposition = await prisma.proposition.update({
      where: { id: propositionId },
      data: updateData,
    });

    return NextResponse.json(updatedProposition, { status: 200 });
  } catch (error) {
    console.error("Failed to update proposition:", error);
    return NextResponse.json(
      { message: "Failed to update proposition" },
      { status: 500 }
    );
  }
}
