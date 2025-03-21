"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const erroMessage = null;
    if (!erroMessage) {
      toast.success("Logout successful");
      router.push("/");
    } else toast.error(erroMessage);

    setLoading(false);
  };
  return (
    <Button
      className="w-24"
      variant={"outline"}
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Logout"}
    </Button>
  );
}

export default LogoutButton;
