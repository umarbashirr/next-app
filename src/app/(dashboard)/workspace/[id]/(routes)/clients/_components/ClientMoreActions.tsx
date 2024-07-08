"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import React from "react";

const ClientMoreActions = ({ client }: any) => {
  const deleteHandler = () => {
    console.log("Delete client", client);
  };
  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="icon" aria-label="edit">
        <Edit size={16} className="text-gray-600" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="more"
        onClick={deleteHandler}
      >
        <Trash size={16} className="text-red-600" />
      </Button>
    </div>
  );
};

export default ClientMoreActions;
