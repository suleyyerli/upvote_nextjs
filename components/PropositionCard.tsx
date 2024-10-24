// components/PostCard.tsx
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface PropositionCardProps {
  content: string;
  createdAt: string;
  userImage: string;
  userName: string;
  propositionId: number;
}

const PropositionCard: React.FC<PropositionCardProps> = ({
  content,
  createdAt,
  userImage,
  userName,
}) => {
  return (
    <Card className=" bg-white/40 shadow-none rounded-3xl w-full ">
      <CardHeader>
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={userImage} alt="User Avatar" />
          </Avatar>
          <p className="ml-2 text-gray-700 font-semibold text-sm">{userName}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 text-sm text-gray-500">{content}</div>
        <Badge className="mt-2 bg-gray-400/20 text-gray-700">
          Posté le: {new Date(createdAt).toLocaleDateString()}
        </Badge>
      </CardContent>
    </Card>
  );
};
export default PropositionCard;
