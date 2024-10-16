// components/PostCard.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface PostCardProps {
  title: string;
  content: string;
  tag: string;
  createdAt: string;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  content,
  tag,
  createdAt,
}) => {
  return (
    <Card className="p-4 bg-white/40 shadow-sm rounded-md w-full ">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2 text-sm text-gray-500">{content}</div>
        <div className="mt-2 text-sm text-gray-500">
          <Badge variant="secondary" className="bg-gray-400/20">
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
