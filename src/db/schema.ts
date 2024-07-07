import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const userProfileTable = pgTable("users_profile_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  userAuthId: text("user_auth_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const workspacesTable = pgTable("workspaces_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const workspaceTableRelations = relations(
  workspacesTable,
  ({ many }) => ({
    clients: many(clientWorkspaceTable),
  })
);

export const clientsTable = pgTable("clients_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  billingAddressId: integer("billing_address_id"),
  shippingAddressId: integer("shipping_address_id"),
});

export const clientRelations = relations(clientsTable, ({ one, many }) => ({
  billingAddress: one(addressTable, {
    fields: [clientsTable.billingAddressId],
    references: [addressTable.id],
  }),
  shippingAddress: one(addressTable, {
    fields: [clientsTable.shippingAddressId],
    references: [addressTable.id],
  }),
  workspaces: many(clientWorkspaceTable),
}));

export const clientWorkspaceTable = pgTable(
  "client_workspace",
  {
    clientId: integer("client_id")
      .notNull()
      .references(() => clientsTable.id),
    workspaceId: integer("workspace_id")
      .notNull()
      .references(() => workspacesTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.clientId, t.workspaceId] }),
  })
);

export const clientWorkspaceRelations = relations(
  clientWorkspaceTable,
  ({ one }) => ({
    client: one(clientsTable, {
      fields: [clientWorkspaceTable.clientId],
      references: [clientsTable.id],
    }),
    workspace: one(workspacesTable, {
      fields: [clientWorkspaceTable.workspaceId],
      references: [workspacesTable.id],
    }),
  })
);

export const addressTable = pgTable("address_table", {
  id: serial("id").primaryKey(),
  street: text("street"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  country: text("country"),
});

export const addressRelations = relations(addressTable, ({ many }) => ({
  clientsWithBillingAddress: many(clientsTable, {
    relationName: "billingAddress",
  }),
  clientsWithShippingAddress: many(clientsTable, {
    relationName: "shippingAddress",
  }),
}));

export type InsertUserProfile = typeof userProfileTable.$inferInsert;
export type SelectUserProfile = typeof userProfileTable.$inferSelect;

export type InsertWorkspace = typeof workspacesTable.$inferInsert;
export type SelectWorkspace = typeof workspacesTable.$inferSelect;

export type InsertClient = typeof clientsTable.$inferInsert;
export type SelectClient = typeof clientsTable.$inferSelect;

export type InsertAddress = typeof addressTable.$inferInsert;
export type SelectAddress = typeof addressTable.$inferSelect;
