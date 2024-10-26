import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const { propositionId, action } = await req.json();

    if (action !== "like" && action !== "dislike") {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
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
