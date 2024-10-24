// components/PostCard.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  userImage: string;
  userName: string; // Ajout du nom de l'utilisateur
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  content,
  tag,
  createdAt,
  userImage,
  userName, // Ajout du nom de l'utilisateur
}) => {
  return (
    <Card className="shadow-none rounded-3xl w-full ">
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
        <div className="mt-2 text-sm text-gray-500">{content}</div>
        <div className="mt-2 text-sm text-gray-500">
          <Badge className="mt-2 bg-gray-400/20 text-gray-700">
            Posté le: {new Date(createdAt).toLocaleDateString()}
          </Badge>
          <div className="flex mt-3">
            <Badge
              variant="secondary"
              className="p-2 bg-gray-400/20 text-gray-700 "
            >
              #{tag}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default PostCard;
