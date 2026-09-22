DROP TABLE IF EXISTS "task";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"icon" text DEFAULT 'tag' NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jars" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"icon" text DEFAULT 'sparkles' NOT NULL,
	"theme_color" text DEFAULT 'emerald' NOT NULL,
	"current_balance" bigint DEFAULT 0 NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "jars_balance_non_negative" CHECK ("jars"."current_balance" >= 0)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"metadata" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quests" (
	"id" text PRIMARY KEY NOT NULL,
	"jar_id" text NOT NULL,
	"user_id" text NOT NULL,
	"target_amount" bigint NOT NULL,
	"target_date" timestamp,
	"status" text DEFAULT 'IN_PROGRESS' NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "quests_target_positive" CHECK ("quests"."target_amount" > 0)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recurring_rules" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"jar_id" text NOT NULL,
	"category_id" text,
	"name" text NOT NULL,
	"amount" bigint NOT NULL,
	"frequency" text DEFAULT 'MONTHLY' NOT NULL,
	"day_of_month" integer,
	"auto_execute" boolean DEFAULT false NOT NULL,
	"next_run_date" timestamp NOT NULL,
	"last_run_date" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "recurring_rules_amount_positive" CHECK ("recurring_rules"."amount" > 0)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repayments" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"jar_id" text NOT NULL,
	"initial_withdrawal_id" text,
	"total_amount" bigint NOT NULL,
	"paid_amount" bigint DEFAULT 0 NOT NULL,
	"remaining_amount" bigint NOT NULL,
	"due_date" timestamp,
	"status" text DEFAULT 'OUTSTANDING' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "repayments_remaining_non_negative" CHECK ("repayments"."remaining_amount" >= 0)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"jar_id" text NOT NULL,
	"type" text NOT NULL,
	"amount" bigint NOT NULL,
	"category_id" text,
	"transfer_id" text,
	"repayment_id" text,
	"is_goal_realization" boolean DEFAULT false NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "transactions_amount_positive" CHECK ("transactions"."amount" > 0)
);
--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "jars" ADD CONSTRAINT "jars_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "quests" ADD CONSTRAINT "quests_jar_id_jars_id_fk" FOREIGN KEY ("jar_id") REFERENCES "public"."jars"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "quests" ADD CONSTRAINT "quests_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "recurring_rules" ADD CONSTRAINT "recurring_rules_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "recurring_rules" ADD CONSTRAINT "recurring_rules_jar_id_jars_id_fk" FOREIGN KEY ("jar_id") REFERENCES "public"."jars"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "recurring_rules" ADD CONSTRAINT "recurring_rules_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "repayments" ADD CONSTRAINT "repayments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "repayments" ADD CONSTRAINT "repayments_jar_id_jars_id_fk" FOREIGN KEY ("jar_id") REFERENCES "public"."jars"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_jar_id_jars_id_fk" FOREIGN KEY ("jar_id") REFERENCES "public"."jars"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_repayment_id_repayments_id_fk" FOREIGN KEY ("repayment_id") REFERENCES "public"."repayments"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "categories_user_id_idx" ON "categories" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "jars_user_id_idx" ON "jars" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notifications_user_id_idx" ON "notifications" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "quests_jar_id_idx" ON "quests" USING btree ("jar_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "quests_user_id_idx" ON "quests" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recurring_rules_user_id_idx" ON "recurring_rules" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recurring_rules_jar_id_idx" ON "recurring_rules" USING btree ("jar_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "repayments_jar_id_idx" ON "repayments" USING btree ("jar_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "repayments_user_id_idx" ON "repayments" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_jar_id_idx" ON "transactions" USING btree ("jar_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_user_id_idx" ON "transactions" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_transfer_id_idx" ON "transactions" USING btree ("transfer_id");