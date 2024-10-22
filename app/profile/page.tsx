"use client";

import React, { useEffect, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
}

interface User {
  name: string;
  image: string;
  email: string;
  // Ajoutez d'autres propriétés si nécessaire
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUser(data.user);
      setPosts(data.posts);
    };

    fetchUserData();
  }, []);

  const handleDelete = async (postId: number) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setPosts(posts.filter((post) => post.id !== postId));
    } else {
      console.error("Failed to delete post");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl border-2 border-purple-400/20 rounded-md mt-10">
      <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-4 mb-4 text-gray-800">
        Profile
      </h2>
      <div className="flex items-center space-x-4 p-4 border-b-2 border-gray-300">
        <Avatar>
          <AvatarImage src={user?.image} alt="User Avatar" />
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-sm text-gray-500">
            Nombre de posts : {posts.length}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="p-4 bg-white/40 shadow-sm rounded-md text-gray-800"
          >
            <CardTitle>{post.title}</CardTitle>

            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={() => handleDelete(post.id)}
                size="icon"
                className="bg-red-400"
              >
                <Trash />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
