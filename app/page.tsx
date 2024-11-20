import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center mt-20">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-500">
          UPvote
          <br className="max-md:hidden" />
          <span className=" text-7xl bg-clip-text text-transparent bg-gradient-to-t from-purple-100 to-purple-500 font-bold">
            Boostez des posts
          </span>
        </h1>
        <p className="desc mt-4 text-gray-800">
          Mon application est un réseau social innovant conçu pour permettre aux
          utilisateurs de partager leurs dilemmes, questions, ou choix
          difficiles avec la communauté. Le commentaire avec le plus de coeur
          sera affiché en premier.
        </p>
        <Button
          variant="outline"
          className="text-purple-400 mt-4 items-center inline-flex p-2 gap-2"
        >
          <Link href="/formulaire">Commencer</Link>
          <p className="text-sm text-gray-500">
            Vous n&apos;avez pas de compte ? Créer un compte ou connectez vous !
          </p>
          <ArrowRight />
        </Button>
      </div>
    </>
  );
}
