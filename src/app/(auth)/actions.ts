"use server";

import { createUserProfile } from "@/db/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { LoginFormSchema } from "./_components/LoginForm";
import { RegisterFormSchema } from "./_components/RegisterForm";

export async function signUp(values: z.infer<typeof RegisterFormSchema>) {
  const supabase = createClient();

  const formData = {
    email: values.email,
    password: values.password,
  };

  try {
    const { data, error } = await supabase.auth.signUp(formData);

    if (error) {
      throw new Error(error.message);
    }

    const result = await createUserProfile({
      name: values.name,
      email: values.email,
      userAuthId: data.user?.id || "",
    });

    console.log(result);

    revalidatePath("/", "layout");

    redirect("/");
  } catch (error) {
    console.error(error);
  }
}

export async function signIn(values: z.infer<typeof LoginFormSchema>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword(values);

  if (error) {
    return { success: false, message: error?.message };
  }

  revalidatePath("/", "layout");

  redirect("/select-workspace");
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, message: error?.message };
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
