import DataTable from "../../_components/DataTable";
import {
  ProductTableColumnProps,
  productTableColumns,
} from "../products/_components/ProductTableColumns";
import AddNewProduct from "./_components/AddNewProduct";

const ProductsPage = () => {
  const products: ProductTableColumnProps[] = [
    {
      id: "1",
      name: "Website Development",
      price: 20000,
      description: "Package of website development",
    },
    {
      id: "2",
      name: "Website Maintenance",
      price: 5000,
      description: "Package of website maintenance",
    },
  ];
  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-semibold text-lg mb-1">Products</h1>
          <p className="text-muted-foreground text-sm">
            Manage your products data here.
          </p>
        </div>
        <div>
          <AddNewProduct />
        </div>
      </div>
      <div>
        <DataTable columns={productTableColumns} data={products} />
      </div>
    </div>
  );
};

export default ProductsPage;
