"use client";

// Importation des hooks et composants nécessaires
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Définition du composant de création de post
export default function CreationPost() {
  // Déclaration des états pour les champs de saisie
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const router = useRouter(); // Initialisation du hook de navigation

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Envoi des données du formulaire à l'API
    const response = await fetch("/api/posts", {
      method: "POST", // Méthode HTTP pour la requête
      headers: {
        "Content-Type": "application/json", // Type de contenu de la requête
      },
      body: JSON.stringify({ title, content, tag }), // Corps de la requête avec les données du formulaire
    });

    if (response.ok) {
      const nouveauPost = await response.json(); // Récupération de la réponse JSON
      console.log("Post créé:", nouveauPost); // Affichage du post créé dans la console
      setTitle(""); // Réinitialisation du champ de titre
      setTag(""); // Réinitialisation du champ de tag
      router.push("/posts"); // Redirection vers la page de la liste des posts
    } else {
      console.error("Failed to create post"); // Affichage d'un message d'erreur en cas d'échec dans la console
    }
  };

  // Rendu du composant
  return (
    <form
      onSubmit={handleSubmit} // Liaison de la fonction de soumission au formulaire
      className="space-y-4 p-4 shadow-none max-w-md mx-auto rounded-md mt-10 bg-white/40 border-2 border-purple-400/20" // Classes de style pour le formulaire
    >
      <h2 className="text-gray-800 text-2xl font-bold">Créer un post</h2>
      <div>
        <label className="block text-sm font-medium text-purple-400">
          Titre
        </label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Mise à jour de l'état du titre
          placeholder="Title"
          className="mt-1 block w-full bg-gray-400/20"
        />
      </div>
      {/* ne pas le mettre obligatoire */}
      <div>
        <label className="block text-sm font-medium text-purple-400">
          Content
        </label>
        <Input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)} // Mise à jour de l'état du content
          placeholder="Content"
          className="mt-1 block w-full bg-gray-400/20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-purple-400">Tag</label>
        <Input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)} // Mise à jour de l'état du tag
          placeholder="Tag"
          className="mt-1 block w-full bg-gray-400/20"
        />
      </div>
      <Button type="submit" className="w-full bg-gray-800">
        Créer un post
      </Button>
    </form>
  );
}
