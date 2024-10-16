// app/posts/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";

interface Post {
  id: number;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
}

const PostsPage: React.FC = () => {
  // Déclare une variable d'état 'posts' et une fonction 'setPosts' pour la mettre à jour.
  // Le type de 'posts' est un tableau d'objets de type 'Post', initialisé avec un tableau vide.
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
      <h1 className="text-5xl font-bold mb-4 text-center gap-4 p-4 ">
        Liste des posts
      </h1>
      <div className="flex flex-col gap-4 p-4 ">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            content={post.content}
            tag={post.tag}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
