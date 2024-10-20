DO $$ BEGIN
 CREATE TYPE "public"."user_status" AS ENUM('ACTIVE', 'INACTIVE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DROP TABLE "email_verification_codes";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" "user_status" DEFAULT 'ACTIVE' NOT NULL;