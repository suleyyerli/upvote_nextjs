"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

// Définition du composant de création de post
export default function PropositionForm() {
  // Déclaration des états pour les champs de saisie
  const [content, setContent] = useState("");
  const params = useParams();
  const router = useRouter();
  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postId = parseInt(params.id as string);

    const response = await fetch("/api/propositions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, postId }), // Utiliser la variable postId
    });

    if (response.ok) {
      const nouveauProposition = await response.json();
      console.log("Proposition créée:", nouveauProposition);
      setContent("");
      router.refresh();
    } else {
      console.error("Failed to create proposition");
    }
  };

  // Rendu du composant
  return (
    <Card className="p-4 shadow-none rounded-md w-full ">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-700">
          Ajouter une proposition
        </h2>
        <Input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="mt-2"
        />
        <Button type="submit" className="mt-4 w-full bg-purple-400">
          Ajouter
        </Button>
      </form>
    </Card>
  );
}
