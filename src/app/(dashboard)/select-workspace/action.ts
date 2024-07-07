"use server";

import { insertWorkspace, selectWorkspaces } from "@/db/queries";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { WorkspaceFormSchema } from "./WorkspaceForm";

export async function getWorkspaces() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const workspaces = await selectWorkspaces(user.id);

  return workspaces;
}

export async function createWorkspace(
  values: z.infer<typeof WorkspaceFormSchema>
) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    await insertWorkspace({
      name: values.name,
      userId: user.id,
    });
  } catch (error: any) {
    console.error(error);
  }
}
