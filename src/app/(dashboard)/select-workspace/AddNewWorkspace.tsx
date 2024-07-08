"use client";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AddNewWorkspace = () => {
  return (
    <Button asChild className="w-full mt-4">
      <Link
        href="/select-workspace?create=true"
        className="w-full flex items-center justify-center gap-2"
      >
        <PlusCircleIcon size={16} className="text-white" />
        Add New Workspace
      </Link>
    </Button>
  );
};

export default AddNewWorkspace;
