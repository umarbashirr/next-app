"use client";

import DynamicSheet from "@/components/DynamicSheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import VendorForm from "./VendorForm";

const AddNewVendor = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Add Vendor</Button>
      <DynamicSheet
        open={isOpen}
        setOpen={setIsOpen}
        title="Add New Vendor"
        description="Fill out the below form to create add new vendor."
      >
        <div>
          <VendorForm />
        </div>
      </DynamicSheet>
    </div>
  );
};

export default AddNewVendor;
