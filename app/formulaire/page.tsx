import { auth } from "@/src/lib/auth";
import { LoginButton, LogoutButton } from "@/components/AuthButtons";

export default async function FormulairePage() {
  const session = await auth();

  return (
    <div>
      <h1>
        {session?.user ? "Authentifié" + session.user.email : "Non authentifié"}
      </h1>
      <div>{!session?.user ? <LoginButton /> : <LogoutButton />}</div>
    </div>
  );
}
