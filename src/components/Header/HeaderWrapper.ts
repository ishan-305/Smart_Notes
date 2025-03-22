"use server";

import { getUser } from "@/app/auth/getUser";

export default async function HeaderWrapper() {
  const user = await getUser(); // Fetch user data on the server

  return user;
}
