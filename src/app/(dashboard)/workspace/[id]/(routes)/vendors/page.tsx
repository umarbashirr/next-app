import DataTable from "../../_components/DataTable";
import AddNewVendor from "./_components/AddNewVendor";
import {
  VendorTableColumnProps,
  vendorTableColumns,
} from "./_components/VendorTableColumns";

const VendorsPage = () => {
  const vendors: VendorTableColumnProps[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      city: "New York",
      country: "USA",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+1234567890",
      city: "Los Angeles",
      country: "USA",
    },
  ];
  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-semibold text-lg mb-1">Vendors</h1>
          <p className="text-muted-foreground text-sm">
            Manage your vendors data here.
          </p>
        </div>
        <div>
          <AddNewVendor />
        </div>
      </div>
      <div>
        <DataTable columns={vendorTableColumns} data={vendors} />
      </div>
    </div>
  );
};

export default VendorsPage;
