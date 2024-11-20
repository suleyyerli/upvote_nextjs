"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Heart, HeartOff } from "lucide-react";

interface PropositionCardProps {
  content: string;
  createdAt: string;
  userImage: string;
  userName: string;
  propositionId: number;
  likes: number;
  dislikes: number;
}

const PropositionCard: React.FC<PropositionCardProps> = ({
  content,
  createdAt,
  userImage,
  userName,
  propositionId,
  likes,
  dislikes,
}) => {
  const router = useRouter();
  const handleLikeDislike = async (action: "like" | "dislike") => {
    try {
      const response = await fetch("/api/propositions/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propositionId, action }),
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update likes/dislikes:", error);
    }
  };

  return (
    <Card className="bg-white/40 shadow-none rounded-3xl w-full">
      <CardHeader>
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={userImage} alt="User Avatar" />
          </Avatar>
          <p className="ml-2 text-gray-700 font-semibold text-sm">{userName}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 text-base text-gray-500">{content}</div>
        <Badge className="mt-2 text-purple-400 bg-purple-400/20 hover:bg-purple-400/40">
          Posté le: {new Date(createdAt).toLocaleDateString()}
        </Badge>
        <div className="flex mt-2 gap-2 justify-end">
          <Button
            variant="ghost"
            className="hover:bg-purple-400/20"
            onClick={() => handleLikeDislike("like")}
          >
            <Heart className="w-4 h-4 text-purple-400" /> ({likes})
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-red-400/20"
            onClick={() => handleLikeDislike("dislike")}
          >
            <HeartOff className="w-4 h-4 text-red-500" /> ({dislikes})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropositionCard;
