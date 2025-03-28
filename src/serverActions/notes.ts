"use server";

import { getUser } from "@/app/auth/getUser";
import { handleError } from "@/lib/utils";
import { prisma } from "../../prisma/prisma";
import { PrismaClient } from "@prisma/client";

export const createNoteAction = async (noteId: string) => {
  const prima = new PrismaClient();
  try {
    const user = await getUser();

    if (!user) throw new Error("User not found");

    await prima.note.create({
      data: {
        id: noteId,
        text: "",
        authorId: user.id,
      },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const updateNoteAction = async (noteId: string, text: string) => {
  try {
    const user = await getUser();

    if (!user) throw new Error("User not found");

    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        text,
      },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to delete a note");

    await prisma.note.delete({
      where: { id: noteId, authorId: user.id },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
