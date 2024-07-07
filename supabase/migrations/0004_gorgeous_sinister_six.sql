CREATE TABLE IF NOT EXISTS "client_workspace" (
	"client_id" integer NOT NULL,
	"workspace_id" integer NOT NULL,
	CONSTRAINT "client_workspace_client_id_workspace_id_pk" PRIMARY KEY("client_id","workspace_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_workspace" ADD CONSTRAINT "client_workspace_client_id_clients_table_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_workspace" ADD CONSTRAINT "client_workspace_workspace_id_workspaces_table_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
