import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";

// POST: Créer un nouveau post
export async function POST(req: Request) {
  try {
    const { title, tag, content } = await req.json();
    const session = await auth();
    const userId = session?.user?.id; // Assurez-vous d'extraire l'id de l'utilisateur
    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    const creePost = await prisma.post.create({
      data: {
        title,
        tag,
        content,
        user: { connect: { id: userId } },
      },
    });
    return NextResponse.json(creePost, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      { message: "Failed to create post" },
      { status: 500 }
    );
  }
}
