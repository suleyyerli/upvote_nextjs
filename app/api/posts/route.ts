import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// GET: Récupérer tous les posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
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
    const creePost = await prisma.post.create({
      data: { title, tag, content },
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
