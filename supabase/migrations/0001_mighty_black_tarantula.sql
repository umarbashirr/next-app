ALTER TABLE "workspaces_table" DROP CONSTRAINT "workspaces_table_user_profile_id_users_profile_table_id_fk";
--> statement-breakpoint
ALTER TABLE "workspaces_table" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces_table" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces_table" DROP COLUMN IF EXISTS "user_profile_id";