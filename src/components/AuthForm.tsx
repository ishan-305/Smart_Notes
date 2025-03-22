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
import { toast } from "sonner";
import { loginAction, signupAction } from "@/serverActions/users";
type Prop = {
  type: "login" | "signup";
};
function AuthForm({ type }: Prop) {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email");
      const password = formData.get("password");

      // if (email === null || password === null) {
      //   // Handle the case where email or password is null
      //   toast.error("Email and password are required");
      //   return;
      // }

      let errorMessage;
      let title;
      let description;

      if (isLoginForm) {
        const result = await loginAction(email as string, password as string);
        errorMessage =
          typeof result === "object" ? result.errorMessage : result;
        title = "Logged In";
        description = "You have logged in successfully";
      } else {
        const result = await signupAction(email as string, password as string);

        errorMessage =
          typeof result === "object" ? result.errorMessage : result;
        title = "Signed Up";
        description = "You have signed up successfully";
      }

      if (!errorMessage) {
        toast.success(title);
        router.replace("/");
      } else {
        toast.error(errorMessage);
      }
    });
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
              href={isLoginForm ? "/signup" : "/login"}
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
