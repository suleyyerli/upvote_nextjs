import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import clsx from "clsx";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold">
          UPvote
          <br className="max-md:hidden" />
          <span className="text-orange-500 text-7xl">Boostez des posts</span>
        </h1>
        <p className="desc mt-4">
          Mon application est un réseau social innovant conçu pour permettre aux
          utilisateurs de partager leurs dilemmes, questions, ou choix
          difficiles avec la communauté.
        </p>
        <div
          className={clsx(
            buttonVariants({ variant: "outline" }),
            "text-orange-500 mt-4"
          )}
        >
          <Link href="/formulaire">Commencer</Link>
        </div>
      </div>
    </>
  );
}
