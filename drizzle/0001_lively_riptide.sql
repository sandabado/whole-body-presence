CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quincunx_pillar` text NOT NULL,
	`dodecanic_house` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `gallery_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_id` integer,
	`submitter_name` text NOT NULL,
	`submitter_email` text NOT NULL,
	`photo_url` text NOT NULL,
	`caption` text,
	`consent_subjects` integer DEFAULT false NOT NULL,
	`is_approved` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session_offerings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quincunx_pillar` text NOT NULL,
	`dodecanic_house` integer NOT NULL
);
