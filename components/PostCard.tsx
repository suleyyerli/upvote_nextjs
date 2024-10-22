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
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  content,
  tag,
  createdAt,
  userImage,
}) => {
  return (
    <Card className="p-4 bg-white/40 shadow-sm rounded-md w-full ">
      <CardHeader>
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={userImage} alt="User Avatar" />
          </Avatar>
          <CardTitle className="ml-4 text-gray-700">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 text-sm text-gray-500">{content}</div>
        <div className="mt-2 text-sm text-gray-500">
          <Badge variant="secondary" className="bg-gray-400/20 text-gray-700">
            #{tag}
          </Badge>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          Posté le: {new Date(createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};
export default PostCard;
