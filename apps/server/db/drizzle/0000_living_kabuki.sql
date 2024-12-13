DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('not-started', 'ongoing', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"compile_cmd" varchar,
	"run_cmd" varchar,
	"source_file" varchar,
	"is_archived" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"player1" varchar(255) NOT NULL,
	"player2" varchar(255) NOT NULL,
	"startTime" timestamp NOT NULL,
	"endTime" timestamp,
	"status" "status" DEFAULT 'not-started' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "problems" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"difficulty" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_code" text,
	"language_id" integer,
	"problem_id" integer,
	"stdin" text,
	"expected_output" text,
	"stdout" text,
	"status_id" integer,
	"created_at" timestamp,
	"finished_at" timestamp,
	"time" numeric,
	"memory" integer,
	"stderr" text,
	"token" varchar,
	"number_of_runs" integer,
	"cpu_time_limit" numeric,
	"cpu_extra_time" numeric,
	"wall_time_limit" numeric,
	"memory_limit" integer,
	"stack_limit" integer,
	"max_processes_and_or_threads" integer,
	"enable_per_process_and_thread_time_limit" boolean,
	"enable_per_process_and_thread_memory_limit" boolean,
	"max_file_size" integer,
	"compile_output" text,
	"exit_code" integer,
	"exit_signal" integer,
	"message" text,
	"wall_time" numeric,
	"compiler_options" varchar,
	"command_line_arguments" varchar,
	"redirect_stderr_to_stdout" boolean,
	"callback_url" varchar,
	"additional_files" "bytea",
	"enable_network" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test_cases" (
	"id" serial PRIMARY KEY NOT NULL,
	"problem_id" serial NOT NULL,
	"input" varchar(255) NOT NULL,
	"expected_output" varchar(255) NOT NULL,
	"is_hidden" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "test_cases" ADD CONSTRAINT "test_cases_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
