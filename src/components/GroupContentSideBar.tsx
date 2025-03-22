"use client";

import { Note } from "@prisma/client";
import React from "react";

function GroupContentSideBar({ notes }: { notes: Note[] }) {
  console.log(notes);

  return <div>Your Notes Here</div>;
}

export default GroupContentSideBar;
