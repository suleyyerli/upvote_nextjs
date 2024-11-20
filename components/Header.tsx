import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import DecoButton from "./Decobutton";
import Image from "next/image";
import { auth } from "@/src/lib/auth";

export const Header = async () => {
  const session = await auth();

  const userStatus = session?.user ? true : false;

  const userStatusAdmin = session?.user?.role === "admin" ? true : false;

  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-80 backdrop-blur-md border-b border-b-accent z-50">
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
            "text-purple-400 bg-purple-400/20",
            userStatus ? "" : "invisible"
          )}
        >
          Profile
        </Link>
        <Link
          href="/admin"
          className={clsx(
            buttonVariants({}),
            "text-purple-400 bg-purple-400/20",
            userStatusAdmin ? "" : "invisible"
          )}
        >
          Admin
        </Link>
        <DecoButton />
      </div>
    </header>
  );
};
