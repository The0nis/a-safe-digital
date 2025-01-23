"use server";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function handleLogout() {
  await signOut({ redirectTo: "/auth/login" });
}

export async function handleCredentialLogin(data: Credentials) {
  try {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.error) {
      console.error(response.error, "from signIn");
      return { success: false, error: response.error };
    }
    revalidatePath("/");
    return { success: true, data: response };
  } catch (err) {
    console.error(err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
