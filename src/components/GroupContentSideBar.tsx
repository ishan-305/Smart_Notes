"use client";

import { Note } from "@prisma/client";
import React, { useEffect, useMemo } from "react";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import Fuse from "fuse.js";
import Link from "next/link";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";
function GroupContentSideBar({ notes }: { notes: Note[] }) {
  const [searchText, setSearchText] = React.useState("");
  const [localNotes, setLocalNotes] = React.useState(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, [localNotes]);
  const filteredNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;
  const deletenoteLocally = (noteId: string) => {
    setLocalNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId)
    );
  };
  return (
    <SidebarGroupContent>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-4 size-4" />
        <Input
          className="bg-muted pl-8 mx-2"
          placeholder="Search notes"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <SidebarMenu className="mt-4">
        {filteredNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group item">
            <SelectNoteButton note={note} />

            <DeleteNoteButton
              noteId={note.id}
              deleteNoteLocally={deletenoteLocally}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}

export default GroupContentSideBar;
