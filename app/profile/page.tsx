"use client";

import React, { useEffect, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    const response = await fetch(`/api/posts/supp`, {
      method: "DELETE",
      body: JSON.stringify({ postId }),
    });

    if (response.ok) {
      setPosts(posts.filter((post) => post.id !== postId));
    } else {
      console.error("Failed to delete post");
    }
  };

  if (!user)
    return <div>Chargement... ou veuillez vous connecter ou vous inscrire</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl border-2 border-purple-400/20 rounded-md mt-10">
      <h2 className="text-2xl font-bold pb-4 mb-4 bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-500">
        Profile
      </h2>
      <Separator />
      <div className="flex flex-col gap-4 p-4">
        <Avatar>
          <AvatarImage src={user?.image} alt="User Avatar" />
        </Avatar>

        <h1 className="text-2xl font-bold text-gray-700">{user?.name}</h1>
        <p className="text-sm text-gray-500">{user?.email}</p>
        <p className="text-sm text-gray-500">
          Nombre de posts : {posts.length}
        </p>
      </div>
      <Separator />

      <div className="mt-4 space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="p-4 shadow-sm rounded-md text-gray-700"
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
