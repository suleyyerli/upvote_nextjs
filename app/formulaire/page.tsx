import { auth } from "@/src/lib/auth";
import { LoginButton, LogoutButton } from "@/components/AuthButtons";

export default async function FormulairePage() {
  const session = await auth();

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-4 p-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-700">
          {session?.user
            ? "Authentifié" + session.user.email
            : "Non authentifié"}
        </h1>
        <div>{!session?.user ? <LoginButton /> : <LogoutButton />}</div>
      </div>
    </div>
  );
}
