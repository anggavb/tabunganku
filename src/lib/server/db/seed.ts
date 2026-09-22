import { db } from './index';
import { categories } from './schema';
import { eq, and } from 'drizzle-orm';

export interface DefaultCategoryTemplate {
	name: string;
	type: 'DEPOSIT' | 'WITHDRAWAL';
	icon: string;
}

export const DEFAULT_CATEGORIES: DefaultCategoryTemplate[] = [
	// Deposit sources
	{ name: 'Gaji', type: 'DEPOSIT', icon: 'briefcase' },
	{ name: 'Bonus & THR', type: 'DEPOSIT', icon: 'award' },
	{ name: 'Hadiah / Uang Saku', type: 'DEPOSIT', icon: 'gift' },
	{ name: 'Pendapatan Tambahan', type: 'DEPOSIT', icon: 'coins' },
	{ name: 'Pemasukan Lainnya', type: 'DEPOSIT', icon: 'arrow-down-left' },

	// Withdrawal purposes
	{ name: 'Kebutuhan Pokok', type: 'WITHDRAWAL', icon: 'shopping-cart' },
	{ name: 'Tagihan & Utilitas', type: 'WITHDRAWAL', icon: 'receipt' },
	{ name: 'Makanan & Minuman', type: 'WITHDRAWAL', icon: 'utensils' },
	{ name: 'Elektronik & Gadget', type: 'WITHDRAWAL', icon: 'laptop' },
	{ name: 'Liburan & Hiburan', type: 'WITHDRAWAL', icon: 'plane' },
	{ name: 'Kesehatan & Darurat', type: 'WITHDRAWAL', icon: 'heart-pulse' },
	{ name: 'Pendidikan', type: 'WITHDRAWAL', icon: 'graduation-cap' },
	{ name: 'Realisasi Quest', type: 'WITHDRAWAL', icon: 'trophy' },
	{ name: 'Pengeluaran Lainnya', type: 'WITHDRAWAL', icon: 'arrow-up-right' }
];

/**
 * Seed initial default categories for a newly registered user if they don't already exist.
 */
export async function seedUserDefaultCategories(userId: string): Promise<void> {
	for (const item of DEFAULT_CATEGORIES) {
		const existing = await db.query.categories.findFirst({
			where: and(
				eq(categories.userId, userId),
				eq(categories.name, item.name),
				eq(categories.type, item.type)
			)
		});

		if (!existing) {
			await db.insert(categories).values({
				userId,
				name: item.name,
				type: item.type,
				icon: item.icon,
				isDefault: true
			});
		}
	}
}
