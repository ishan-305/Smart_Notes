"use client";

import { User } from "@supabase/supabase-js";
import React from "react";

type Props = {
  user: User | null;
};
function NewNoteButton({ user }: Props) {
  return <div>AddNewNote</div>;
}

export default NewNoteButton;
