"use client";

import { log } from "console";
import { Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
type Prop = {
  type: "login" | "signup";
};
function AuthForm({ type }: Prop) {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    console.log("Form Submitted");
  };

  return (
    <>
      <form action={handleSubmit}>
        <CardContent className="grid w-full items-center gap-4">
          <div className="flex flex-col spce-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              className="my-2"
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              required
              disabled={isPending}
            />
          </div>
          <div className="flex flex-col spce-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              className="mt-2"
              id="password"
              name="password"
              placeholder="Enter your Password"
              type="password"
              required
              disabled={isPending}
            />
          </div>
        </CardContent>
        <CardFooter className="mt-10 flex flex-col gap-4">
          <Button className="w-full">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : isLoginForm ? (
              "Log In"
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-xs">
            {isLoginForm
              ? "Don't Have an Acoount ?"
              : "Already a registered user?"}
            {"  "}
            <Link
              href={isLoginForm ? "/auth/signup" : "/auth/login"}
              className={`text-blue-500 underline ${
                isPending ? "pointer-events-none opacity-50" : ""
              } `}
            >
              {isLoginForm ? "Signup" : "Login"}
            </Link>
          </p>
        </CardFooter>
      </form>
    </>
  );
}

export default AuthForm;
