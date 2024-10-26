"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  return (
    <div className="flex justify-center items-center">
      <Button
        onClick={() => signIn()}
        className="bg-purple-400  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Se connecter ou créer un compte
      </Button>
    </div>
  );
};

export const LogoutButton = () => {
  return (
    <div className="flex justify-center items-center">
      <Button
        onClick={() => signOut()}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Se déconnecter
      </Button>
    </div>
  );
};
