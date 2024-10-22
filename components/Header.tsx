import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import DecoButton from "./Decobutton";
export const Header = () => {
  return (
    <header className="border-b border-b-accent">
      <div className="flex items-center py-2 max-w-6xl m-auto gap-1">
        <h2 className="text-2xl font-bold mr-auto text-gray-800">UPvote^^</h2>

        <Link
          href="/"
          className={clsx(
            buttonVariants({ variant: "outline" }),
            "text-purple-400"
          )}
        >
          Accueil
        </Link>

        <Link
          href="/posts"
          className={clsx(
            buttonVariants({ variant: "outline" }),
            "text-purple-400"
          )}
        >
          Liste des posts
        </Link>
        <Link
          href="/posts/creation"
          className={clsx(
            buttonVariants({ variant: "outline" }),
            "text-purple-400"
          )}
        >
          Ajouter un post
        </Link>
        <Link
          href="/profile"
          className={clsx(
            buttonVariants({ variant: "outline" }),
            "text-purple-400"
          )}
        >
          Profile
        </Link>
        <DecoButton />
      </div>
    </header>
  );
};
