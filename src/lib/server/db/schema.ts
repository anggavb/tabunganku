import { relations, sql } from 'drizzle-orm';
import {
	pgTable,
	text,
	timestamp,
	boolean,
	integer,
	bigint,
	check,
	index
} from 'drizzle-orm/pg-core';
import { user } from './auth.schema';

// Export Better Auth tables and relations
export * from './auth.schema';

/**
 * Jars: The primary savings containers/pockets.
 */
export const jars = pgTable(
	'jars',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		name: text('name').notNull(),
		description: text('description'),
		icon: text('icon').notNull().default('sparkles'),
		themeColor: text('theme_color').notNull().default('emerald'),
		currentBalance: bigint('current_balance', { mode: 'number' }).notNull().default(0),
		displayOrder: integer('display_order').notNull().default(0),
		isArchived: boolean('is_archived').notNull().default(false),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('jars_user_id_idx').on(table.userId),
		check('jars_balance_non_negative', sql`${table.currentBalance} >= 0`)
	]
);

/**
 * Quests: Optional saving goals and target deadlines attached to a Jar.
 */
export const quests = pgTable(
	'quests',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		jarId: text('jar_id')
			.notNull()
			.references(() => jars.id, { onDelete: 'cascade' }),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		targetAmount: bigint('target_amount', { mode: 'number' }).notNull(),
		targetDate: timestamp('target_date'),
		status: text('status', { enum: ['IN_PROGRESS', 'COMPLETED'] })
			.notNull()
			.default('IN_PROGRESS'),
		completedAt: timestamp('completed_at'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('quests_jar_id_idx').on(table.jarId),
		index('quests_user_id_idx').on(table.userId),
		check('quests_target_positive', sql`${table.targetAmount} > 0`)
	]
);

/**
 * Categories: Classification for Deposits (sources) and Withdrawals (purposes).
 */
export const categories = pgTable(
	'categories',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
		name: text('name').notNull(),
		type: text('type', { enum: ['DEPOSIT', 'WITHDRAWAL'] }).notNull(),
		icon: text('icon').notNull().default('tag'),
		isDefault: boolean('is_default').notNull().default(false),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [index('categories_user_id_idx').on(table.userId)]
);

/**
 * Repayments: Tracking records for temporary withdrawals to be repaid over time.
 */
export const repayments = pgTable(
	'repayments',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		jarId: text('jar_id')
			.notNull()
			.references(() => jars.id, { onDelete: 'cascade' }),
		initialWithdrawalId: text('initial_withdrawal_id'),
		totalAmount: bigint('total_amount', { mode: 'number' }).notNull(),
		paidAmount: bigint('paid_amount', { mode: 'number' }).notNull().default(0),
		remainingAmount: bigint('remaining_amount', { mode: 'number' }).notNull(),
		dueDate: timestamp('due_date'),
		status: text('status', { enum: ['OUTSTANDING', 'OVERDUE', 'PAID'] })
			.notNull()
			.default('OUTSTANDING'),
		notes: text('notes'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('repayments_jar_id_idx').on(table.jarId),
		index('repayments_user_id_idx').on(table.userId),
		check('repayments_remaining_non_negative', sql`${table.remainingAmount} >= 0`)
	]
);

/**
 * Transactions: Immutable financial ledger events for all Jars.
 */
export const transactions = pgTable(
	'transactions',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		jarId: text('jar_id')
			.notNull()
			.references(() => jars.id, { onDelete: 'cascade' }),
		type: text('type', {
			enum: ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER_IN', 'TRANSFER_OUT', 'REPAYMENT']
		}).notNull(),
		amount: bigint('amount', { mode: 'number' }).notNull(),
		categoryId: text('category_id').references(() => categories.id, { onDelete: 'set null' }),
		transferId: text('transfer_id'),
		repaymentId: text('repayment_id').references(() => repayments.id, { onDelete: 'set null' }),
		isGoalRealization: boolean('is_goal_realization').notNull().default(false),
		notes: text('notes'),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('transactions_jar_id_idx').on(table.jarId),
		index('transactions_user_id_idx').on(table.userId),
		index('transactions_transfer_id_idx').on(table.transferId),
		check('transactions_amount_positive', sql`${table.amount} > 0`)
	]
);

/**
 * Recurring Rules: Scheduled periodic deposits into a Jar.
 */
export const recurringRules = pgTable(
	'recurring_rules',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		jarId: text('jar_id')
			.notNull()
			.references(() => jars.id, { onDelete: 'cascade' }),
		categoryId: text('category_id').references(() => categories.id, { onDelete: 'set null' }),
		name: text('name').notNull(),
		amount: bigint('amount', { mode: 'number' }).notNull(),
		frequency: text('frequency', { enum: ['DAILY', 'WEEKLY', 'MONTHLY'] })
			.notNull()
			.default('MONTHLY'),
		dayOfMonth: integer('day_of_month'),
		autoExecute: boolean('auto_execute').notNull().default(false),
		nextRunDate: timestamp('next_run_date').notNull(),
		lastRunDate: timestamp('last_run_date'),
		isActive: boolean('is_active').notNull().default(true),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [
		index('recurring_rules_user_id_idx').on(table.userId),
		index('recurring_rules_jar_id_idx').on(table.jarId),
		check('recurring_rules_amount_positive', sql`${table.amount} > 0`)
	]
);

/**
 * In-App Notifications: Alerts for quest milestones, repayment due dates, and recurring deposits.
 */
export const notifications = pgTable(
	'notifications',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		type: text('type', {
			enum: ['QUEST_COMPLETED', 'REPAYMENT_DUE', 'REPAYMENT_OVERDUE', 'RECURRING_TRIGGER', 'INFO']
		}).notNull(),
		title: text('title').notNull(),
		message: text('message').notNull(),
		isRead: boolean('is_read').notNull().default(false),
		metadata: text('metadata'),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [index('notifications_user_id_idx').on(table.userId)]
);

// --- Drizzle Relations ---

export const jarsRelations = relations(jars, ({ one, many }) => ({
	user: one(user, {
		fields: [jars.userId],
		references: [user.id]
	}),
	quests: many(quests),
	transactions: many(transactions),
	repayments: many(repayments),
	recurringRules: many(recurringRules)
}));

export const questsRelations = relations(quests, ({ one }) => ({
	jar: one(jars, {
		fields: [quests.jarId],
		references: [jars.id]
	}),
	user: one(user, {
		fields: [quests.userId],
		references: [user.id]
	})
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
	user: one(user, {
		fields: [categories.userId],
		references: [user.id]
	}),
	transactions: many(transactions),
	recurringRules: many(recurringRules)
}));

export const repaymentsRelations = relations(repayments, ({ one, many }) => ({
	user: one(user, {
		fields: [repayments.userId],
		references: [user.id]
	}),
	jar: one(jars, {
		fields: [repayments.jarId],
		references: [jars.id]
	}),
	transactions: many(transactions)
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
	user: one(user, {
		fields: [transactions.userId],
		references: [user.id]
	}),
	jar: one(jars, {
		fields: [transactions.jarId],
		references: [jars.id]
	}),
	category: one(categories, {
		fields: [transactions.categoryId],
		references: [categories.id]
	}),
	repayment: one(repayments, {
		fields: [transactions.repaymentId],
		references: [repayments.id]
	})
}));

export const recurringRulesRelations = relations(recurringRules, ({ one }) => ({
	user: one(user, {
		fields: [recurringRules.userId],
		references: [user.id]
	}),
	jar: one(jars, {
		fields: [recurringRules.jarId],
		references: [jars.id]
	}),
	category: one(categories, {
		fields: [recurringRules.categoryId],
		references: [categories.id]
	})
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
	user: one(user, {
		fields: [notifications.userId],
		references: [user.id]
	})
}));
