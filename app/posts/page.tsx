// app/posts/page.tsx
import { prisma } from "@/src/lib/prisma";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export default async function PostsPage() {
  // Requete pour récupérer tous les posts
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { image: true, name: true } } },
  });

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-5xl font-bold mb-4 text-center gap-4 p-4 text-gray-800">
        Liste des posts
      </h1>
      <div className="flex flex-col gap-4 p-4 ">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <PostCard
              title={post.title || ""}
              content={post.content || ""}
              tag={post.tag || ""}
              createdAt={post.createdAt.toString()}
              userImage={post.user?.image || "https://github.com/shadcn.png"}
              userName={post.user?.name || "Nom inconnue"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
