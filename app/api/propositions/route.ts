// POST: Créer une proposition

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";

// POST: Créer une proposition
export async function POST(req: Request) {
  try {
    const { content, postId } = await req.json(); // Inclure postId
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
        post: { connect: { id: postId } }, // Connecter la proposition à un post
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

// GET: Récupérer toutes les propositions
export async function GET() {
  try {
    const propositions = await prisma.proposition.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { image: true } } },
    });
    return NextResponse.json(propositions, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch propositions:", error);
    return NextResponse.json(
      { message: "Failed to fetch propositions" },
      { status: 500 }
    );
  }
}
