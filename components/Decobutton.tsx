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
      className="text-orange-500 bg-orange-500/20"
      onClick={handleSignOut}
    >
      <LogOut className="w-4 h-4" />
    </Button>
  );
}
