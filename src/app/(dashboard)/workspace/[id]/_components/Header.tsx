"use client";

import { signOut } from "@/app/(auth)/actions";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";

const Header = () => {
  const [isPending, startTransition] = useTransition();
  async function logoutHandler() {
    try {
      startTransition(() => {
        signOut();
      });
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error: any) {
      console.error(error.message);
      toast({
        title: "Error",
        description: error?.message,
      });
    }
  }
  return (
    <div className="h-16 px-6 border-b flex items-center justify-between">
      <div></div>
      <div>
        <LoadingButton
          loading={isPending}
          disabled={isPending}
          onClick={logoutHandler}
          loadingText="Please wait"
        >
          Logout
        </LoadingButton>
      </div>
    </div>
  );
};

export default Header;
