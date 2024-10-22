"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function DecoButton() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  return (
    <Button
      className="text-purple-400 bg-purple-400/20"
      onClick={handleSignOut}
    >
      <LogOut className="w-4 h-4" />
    </Button>
  );
}
