import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";

// Supprimer un post et ses propositions associées
export async function DELETE(req: Request) {
  try {
    const { postId } = await req.json();
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (post?.userId !== userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    // Utiliser une transaction pour supprimer le post et ses propositions
    await prisma.$transaction([
      prisma.proposition.deleteMany({ where: { postId } }),
      prisma.post.delete({ where: { id: postId } }),
    ]);

    return NextResponse.json(
      { message: "Post and its propositions deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete post and its propositions:", error);
    return NextResponse.json(
      { message: "Failed to delete post and its propositions" },
      { status: 500 }
    );
  }
}
