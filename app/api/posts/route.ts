import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
// GET: Récupérer tous les posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { image: true } } },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

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

//Supprimer un post
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

    await prisma.post.delete({ where: { id: postId } });

    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json(
      { message: "Failed to delete post" },
      { status: 500 }
    );
  }
}
