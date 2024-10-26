import { prisma } from "@/src/lib/prisma";
import PropositionForm from "@/components/PropositionForm";
import PropositionCard from "@/components/PropositionCard";
import PostCard from "@/components/PostCard";
import { Separator } from "@/components/ui/separator";
import { ArrowDown } from "lucide-react";

export default async function DetailPost({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      proposition: {
        orderBy: { likes: "desc" }, // Trier par le nombre de likes
        include: { user: { select: { image: true } } },
      },
      user: { select: { image: true, name: true } },
      _count: { select: { proposition: true } },
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-500">
          Commentez
        </h1>
        <PropositionForm />
        <div>
          <PostCard
            title={post.title || ""}
            content={post.content || ""}
            tag={post.tag || ""}
            createdAt={post.createdAt.toString()}
            userImage={post.user?.image || "https://github.com/shadcn.png"}
            userName={post.user?.name || "Nom inconnue"}
            propositionCount={post._count.proposition}
          />
        </div>
        <Separator />
        <div className="flex justify-center my-4">
          <ArrowDown className="w-10 h-10 text-gray-700" />
        </div>

        {post.proposition.map((proposition) => (
          <PropositionCard
            key={proposition.id}
            propositionId={proposition.id}
            content={proposition.content}
            createdAt={proposition.createdAt.toString()}
            userImage={
              proposition.user?.image || "https://github.com/shadcn.png"
            }
            userName={post.user?.name || "Nom inconnue"}
            likes={proposition.likes}
            dislikes={proposition.dislikes}
          />
        ))}
      </div>
    </div>
  );
}
