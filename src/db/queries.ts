import { sql } from "drizzle-orm";
import { db } from ".";
import {
  InsertClient,
  InsertUserProfile,
  InsertWorkspace,
  userProfileTable,
  workspacesTable,
} from "./schema";

export async function createUserProfile(data: InsertUserProfile) {
  return await db.insert(userProfileTable).values(data).returning();
}

export async function selectWorkspaces(id: string) {
  return await db
    .select()
    .from(workspacesTable)
    .where(sql`${workspacesTable.userId} = ${id}`);
}

export async function insertWorkspace(data: InsertWorkspace) {
  return await db.insert(workspacesTable).values(data).returning();
}

export async function getClients() {}
