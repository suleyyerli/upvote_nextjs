// app/posts/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  user: {
    image: string;
  };
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-5xl font-bold mb-4 text-center gap-4 p-4 text-gray-800">
        Liste des posts
      </h1>
      <div className="flex flex-col gap-4 p-4 ">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <PostCard
              title={post.title}
              content={post.content}
              tag={post.tag}
              createdAt={post.createdAt}
              userImage={post.user?.image || "https://github.com/shadcn.png"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
