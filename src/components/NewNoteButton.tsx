"use client";

import { User } from "@supabase/supabase-js";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createNoteAction } from "@/serverActions/notes";
import { toast } from "sonner";

type Props = {
  user: User | null;
};
function NewNoteButton({ user }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);

      const uuid = uuidv4();
      // console.log("Starting Note Creation");
      await createNoteAction(uuid);
      // console.log("Note Created in main Function Now");
      router.push(`/?noteId=${uuid}`);
      toast.success("Note Created");

      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClickNewNoteButton}
      className="w-24 "
      variant="secondary"
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}

export default NewNoteButton;
