"use client";

import DynamicSheet from "@/components/DynamicSheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProductForm from "./ProductForm";

const AddNewProduct = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Add Product</Button>
      <DynamicSheet
        open={isOpen}
        setOpen={setIsOpen}
        title="Add New Product"
        description="Fill out the below form to create new product."
      >
        <div>
          <ProductForm />
        </div>
      </DynamicSheet>
    </div>
  );
};

export default AddNewProduct;
