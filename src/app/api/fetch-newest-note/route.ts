import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId") as string;

  const newestNoteId = await prisma.note.findFirst({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAT: "desc",
    },
    select: {
      id: true,
    },
  });

  console.log(newestNoteId);

  return NextResponse.json({ noteId: newestNoteId?.id });
}
