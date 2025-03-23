import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId") as string;

  const { id } = await prisma.note.create({
    data: {
      text: "",
      authorId: userId,
    },
  });

  return NextResponse.json({ noteId: id });
}
