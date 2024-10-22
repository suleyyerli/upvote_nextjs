import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center mt-20">
        <h1 className="text-5xl font-bold text-gray-800">
          UPvote
          <br className="max-md:hidden" />
          <span className="text-purple-400 text-7xl">Boostez des posts</span>
        </h1>
        <p className="desc mt-4 text-gray-800">
          Mon application est un réseau social innovant conçu pour permettre aux
          utilisateurs de partager leurs dilemmes, questions, ou choix
          difficiles avec la communauté.
        </p>
        <div
          className={clsx(
            buttonVariants({ variant: "outline" }),
            "text-purple-400 mt-4 flex items-center gap-2"
          )}
        >
          <Link href="/formulaire">Commencer</Link>
          <ArrowRight />
        </div>
      </div>
    </>
  );
}
