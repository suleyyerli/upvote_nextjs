import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import DecoButton from "./Decobutton";
export const Header = () => {
  return (
    <header className="border-b border-b-accent">
      <div className="flex items-center py-2 max-w-6xl m-auto gap-1">
        <h2 className="text-2xl font-bold mr-auto">UPvote^^</h2>

        <Link
          href="/"
          className={clsx(
            buttonVariants({ variant: "outline" }),
            "text-orange-500"
          )}
        >
          Accueil
        </Link>

        <Link
          href="/posts"
          className={clsx(
            buttonVariants({ variant: "outline" }),
            "text-orange-500"
          )}
        >
          Liste des posts
        </Link>
        <Link
          href="/posts/creation"
          className={clsx(
            buttonVariants({ variant: "outline" }),
            "text-orange-500"
          )}
        >
          Ajouter un post
        </Link>
        <Link
          href="/profile"
          className={clsx(
            buttonVariants({ variant: "outline" }),
            "text-orange-500"
          )}
        >
          Profile
        </Link>
        <DecoButton />
      </div>
    </header>
  );
};
