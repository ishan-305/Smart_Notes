import AuthForm from "@/components/AuthForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function page() {
  return (
    <>
      <div className="m-auto w-full h-full flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="mb-4">
            <CardTitle className="text-center text-2xl">Login</CardTitle>
          </CardHeader>
          <AuthForm type="login" />
        </Card>
      </div>
    </>
  );
}

export default page;
