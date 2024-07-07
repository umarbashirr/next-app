import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/select-workspace");
  }

  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
};

export default AuthLayout;
