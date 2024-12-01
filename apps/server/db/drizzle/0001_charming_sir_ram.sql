CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"userName" text,
	"email" text,
	"password" text,
	"emailVerified" timestamp,
	"image" text,
	"refreshToken" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_userName_unique" UNIQUE("userName"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
