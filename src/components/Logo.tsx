"use client";

import { LucideNotebookText } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center justify-start gap-2">
      <LucideNotebookText size={36} className="text-primary" />
      <p className="text-xl font-semibold">Tech CMS</p>
    </div>
  );
};

export default Logo;
