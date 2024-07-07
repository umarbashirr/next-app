import DataTable from "../../_components/DataTable";
import AddNewClient from "./_components/AddNewClient";
import { clientTableColumns } from "./_components/ClientTableColumns";
import { getAllClients } from "./actions";

const ClientsPage = async ({ params }: { params: { id: string } }) => {
  const data = await getAllClients(params.id);

  const clients = data
    ? data.map((d) => ({
        id: d.client.id,
        name: d?.client?.name || "",
        email: d?.client?.email || "",
        phone: d?.client?.phone || "",
        city: d?.client?.billingAddress?.city || "",
        country: d?.client?.billingAddress?.country || "",
      }))
    : [];

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-semibold text-lg mb-1">Clients</h1>
          <p className="text-muted-foreground text-sm">
            Manage your clients data here.
          </p>
        </div>
        <div>
          <AddNewClient workspaceId={params.id} />
        </div>
      </div>
      <div>
        <DataTable columns={clientTableColumns} data={clients} />
      </div>
    </div>
  );
};

export default ClientsPage;
