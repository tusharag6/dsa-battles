DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('not-started', 'ongoing', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player1" varchar(255) NOT NULL,
	"player2" varchar(255) NOT NULL,
	"startTime" timestamp NOT NULL,
	"endTime" timestamp,
	"status" "status" DEFAULT 'not-started' NOT NULL
);
