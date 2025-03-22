"use server";

import { createClient } from "./server";

export async function getUser() {
  const { auth } = await createClient();
  const userObject = await auth.getUser();
  if (userObject.error) {
    console.log(userObject.error.message);

    return null;
  }

  return userObject.data.user;
}
