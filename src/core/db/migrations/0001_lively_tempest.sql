ALTER TABLE "users" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_photo_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "url_profile_photo";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "description";