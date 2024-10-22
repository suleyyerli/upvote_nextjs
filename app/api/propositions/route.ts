// POST: Créer une proposition

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    const creeProposition = await prisma.proposition.create({
      data: {
        content,
        user: { connect: { id: userId } },
      },
    });
    return NextResponse.json(creeProposition, { status: 201 });
  } catch (error) {
    console.error("Failed to create proposition:", error);
    return NextResponse.json(
      { message: "Failed to create proposition" },
      { status: 500 }
    );
  }
}
