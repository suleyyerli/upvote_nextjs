// Formulaire pour ajouter une proposition

"use client";

// Importation des hooks et composants nécessaires
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Définition du composant de création de post
export default function PropositionForm() {
  // Déclaration des états pour les champs de saisie
  const [content, setContent] = useState("");

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Envoi des données du formulaire à l'API
    const response = await fetch("/api/propositions", {
      method: "POST", // Méthode HTTP pour la requête
      headers: {
        "Content-Type": "application/json", // Type de contenu de la requête
      },
      body: JSON.stringify({ content }), // Corps de la requête avec les données du formulaire
    });

    if (response.ok) {
      const nouveauProposition = await response.json(); // Récupération de la réponse JSON
      console.log("Proposition créée:", nouveauProposition); // Affichage de la proposition créée dans la console
    } else {
      console.error("Failed to create proposition"); // Affichage d'un message d'erreur en cas d'échec dans la console
    }
  };

  // Rendu du composant
  return (
    <Card className="p-4 max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold">Ajouter une proposition</h2>
        <Input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="mt-2"
        />
        <Button type="submit" className="mt-4 w-full">
          Ajouter
        </Button>
      </form>
    </Card>
  );
}
