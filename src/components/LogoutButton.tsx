"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/serverActions/users";

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLoading(true);
    const result = await logoutAction();
    const errorMessage =
      typeof result === "object" ? result.errorMessage : result;
    if (!errorMessage) {
      toast.success("Logout successful");
      router.push("/");
    } else toast.error(errorMessage);

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
