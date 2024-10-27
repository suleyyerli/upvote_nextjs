import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    await prisma.user.update({
      where: { email },
      data: { role: "admin" },
    });

    return NextResponse.json(
      { message: `L'utilisateur avec l'email ${email} est maintenant admin.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour de l'utilisateur" },
      { status: 500 }
    );
  }
}
