CREATE TABLE IF NOT EXISTS "address_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"street" text,
	"city" text,
	"state" text,
	"zip" text,
	"country" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clients_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text
);
