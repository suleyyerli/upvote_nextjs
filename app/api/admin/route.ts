import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";

// Vérifier si l'utilisateur est admin
async function isAdmin(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user?.role === "admin";
}

// GET: Récupérer tous les utilisateurs et posts
export async function GET() {
  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany();
  return NextResponse.json({ users, posts });
}

// DELETE: Supprimer un utilisateur ou un post
export async function DELETE(req: Request) {
  const { userId, postId } = await req.json();
  const session = await auth();
  const currentUserId = session?.user?.id;

  if (!currentUserId || !(await isAdmin(currentUserId))) {
    return NextResponse.json({ message: "Not authorized" }, { status: 403 });
  }

  try {
    if (userId) {
      await prisma.user.delete({ where: { id: userId } });
      return NextResponse.json({ message: "User deleted" }, { status: 200 });
    }

    if (postId) {
      // Utiliser une transaction pour supprimer le post et ses propositions
      await prisma.$transaction([
        prisma.proposition.deleteMany({ where: { postId } }),
        prisma.post.delete({ where: { id: postId } }),
      ]);
      return NextResponse.json(
        { message: "Post and its propositions deleted" },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}
