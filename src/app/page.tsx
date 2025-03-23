import Image from "next/image";
import { getUser } from "./auth/getUser";
import { prisma } from "../../prisma/prisma";
import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function Home({ searchParams }: Props) {
  const noteIdParams = (await searchParams).noteId;
  console.log(noteIdParams);

  const noteId = Array.isArray(noteIdParams)
    ? noteIdParams![0]
    : noteIdParams || "";

  const user = await getUser();

  console.log(user);
  console.log(noteId);
  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
      authorId: user?.id,
    },
  });

  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        {/* <AskAIButton user={user} /> */}
        <NewNoteButton user={user} />
      </div>

      <NoteTextInput noteId={noteId} startingText={note?.text || ""} />
    </div>
  );
}
