// components/PostCard.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, MessageSquarePlus } from "lucide-react";

interface PostCardProps {
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  userImage: string;
  userName: string;
  propositionCount: number; // Ajout du compteur de propositions
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  content,
  tag,
  createdAt,
  userImage,
  userName,
  propositionCount, // Ajout du compteur de propositions
}) => {
  return (
    <Card className="shadow-none rounded-3xl w-full">
      <CardHeader>
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={userImage} alt="User Avatar" />
          </Avatar>
          <p className="ml-2 text-gray-700 font-semibold text-sm">{userName}</p>
          <CardTitle className="ml-4 text-gray-700">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 text-lg text-gray-500">{content}</div>
        <div className="mt-2 text-sm text-gray-500">
          <Badge className="mt-2 text-purple-400 bg-purple-400/20 hover:bg-purple-400/40">
            Posté le: {new Date(createdAt).toLocaleDateString()}
          </Badge>
          <div className="flex mt-3">
            <Badge
              variant="secondary"
              className="p-2 text-purple-400 bg-purple-400/20 hover:bg-purple-400/40"
            >
              #{tag}
            </Badge>
          </div>
          <div className="flex justify-end text-purple-400">
            <MessageSquarePlus className="w-4 h-4" /> Commentez
          </div>
          <div className="flex text-sm text-purple-400 justify-end">
            <MessageSquare className="w-4 h-4" /> {propositionCount}{" "}
            commentaires
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
