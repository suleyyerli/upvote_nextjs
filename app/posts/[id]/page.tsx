"use client";

// Page qui affiche un post spécifique avec les proposition des utilisateurs
// Raffiche le post sur lequel on a cliqué
// Affiche les propositions des utilisateurs
// Affiche le bouton pour ajouter une proposition
import PropositionForm from "@/components/PropositionForm";

export default function DetailPost() {
  return (
    <div>
      <h1>Detail d&apos;un post</h1>
      <PropositionForm />
    </div>
  );
}
