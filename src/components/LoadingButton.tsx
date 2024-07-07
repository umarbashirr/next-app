"use client";

import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  onClick?: any;
  disabled: boolean;
  loading: boolean;
  loadingText: string;
  children: ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button";
}

const LoadingButton = ({
  onClick,
  disabled,
  loading,
  loadingText,
  className,
  children,
  type = "button",
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn("flex items-center gap-2", className)}
    >
      {loading && <ReloadIcon className="animate-spin repeat-infinite" />}
      {loading ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;
