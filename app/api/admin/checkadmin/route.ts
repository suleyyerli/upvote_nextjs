import { NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";

export async function GET() {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  return NextResponse.json({ isAdmin });
}
