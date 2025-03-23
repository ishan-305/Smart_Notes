"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { debounceTimeout } from "@/lib/constants";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/serverActions/notes";

type Props = {
  noteId: string;
  startingText: string;
};

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingText }: Props) {
  const noteIdParams = useSearchParams().get("noteId") || "";
  const { noteText, setNoteText } = useNote();

  useEffect(() => {
    if (noteIdParams === noteId) {
      setNoteText(startingText);
    }
  }, [startingText, noteIdParams, noteId, setNoteText]);

  const handleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const note = e.target.value;
    setNoteText(note);

    updateTimeout = setTimeout(() => {
      updateNoteAction(noteId, note);
    }, debounceTimeout);
  };
  return (
    <Textarea
      className="mt-4 custom-scrollbar mb-4 h-full max-w-4xl resize-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
      placeholder="Write Your Notes Here"
      value={noteText}
      onChange={handleUpdate}
    ></Textarea>
  );
}

export default NoteTextInput;
