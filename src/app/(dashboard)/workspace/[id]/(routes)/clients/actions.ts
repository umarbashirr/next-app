"use server";

import { db } from "@/db";
import { addressTable, clientWorkspaceTable, clientsTable } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { clientFormSchema } from "./_components/ClientForm";
import { eq } from "drizzle-orm";

export const createNewClient = async (
  values: z.infer<typeof clientFormSchema>,
  workspaceId: string
) => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Not Authenticated");
    }

    await db.transaction(async (tx) => {
      const [insertedBillingAddress] = await tx
        .insert(addressTable)
        .values(values.address)
        .returning();

      let insertedShippingAddress;

      if (!values.sameAddress) {
        [insertedShippingAddress] = await tx
          .insert(addressTable)
          .values(values.shippingAddress)
          .returning();
      } else {
        insertedShippingAddress = insertedBillingAddress;
      }

      const [newClient] = await tx
        .insert(clientsTable)
        .values({
          name: values.name,
          email: values.email,
          phone: values.phone,
          billingAddressId: insertedBillingAddress.id,
          shippingAddressId: insertedShippingAddress.id,
        })
        .returning();

      await tx.insert(clientWorkspaceTable).values({
        clientId: newClient.id,
        workspaceId: parseInt(workspaceId),
      });

      return newClient;
    });
  } catch (error: any) {
    console.error(error);
  }
};

export async function getAllClients(workspaceId: string) {
  try {
    return await db.query.clientWorkspaceTable.findMany({
      where: (clientWorkspaceTable, { eq }) =>
        eq(clientWorkspaceTable.workspaceId, parseInt(workspaceId)),
      with: {
        client: {
          with: {
            billingAddress: true,
            shippingAddress: true,
          },
        },
      },
    });
  } catch (error: any) {
    console.error(error.message);
  }
}
