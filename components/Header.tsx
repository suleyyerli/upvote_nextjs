import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import DecoButton from "./Decobutton";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="border-b border-b-accent">
      <div className="flex items-center py-2 max-w-6xl m-auto gap-1">
        <Image src="/icon.png" alt="UPvote" width={40} height={40} />
        <h2 className="text-2xl font-bold mr-auto text-gray-800">UPvote</h2>

        <Link
          href="/"
          className={clsx(
            buttonVariants({}),
            "text-purple-400 bg-purple-400/20"
          )}
        >
          Accueil
        </Link>

        <Link
          href="/posts"
          className={clsx(
            buttonVariants({}),
            "text-purple-400 bg-purple-400/20"
          )}
        >
          Liste des posts
        </Link>
        <Link
          href="/posts/creation"
          className={clsx(
            buttonVariants({}),
            "text-purple-400 bg-purple-400/20"
          )}
        >
          Ajouter un post
        </Link>
        <Link
          href="/profile"
          className={clsx(
            buttonVariants({}),
            "text-purple-400 bg-purple-400/20"
          )}
        >
          Profile
        </Link>
        <Link
          href="/admin"
          className={clsx(
            buttonVariants({}),
            "text-purple-400 bg-purple-400/20"
          )}
        >
          Admin
        </Link>
        <DecoButton />
      </div>
    </header>
  );
};
