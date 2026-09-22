import Redis from 'ioredis';

let redisClient: Redis | null = null;

function resolveRedisUrl(): string {
	try {
		if (typeof process !== 'undefined' && process.env?.REDIS_URL) {
			return process.env.REDIS_URL;
		}
	} catch {
		// ignore
	}
	return 'redis://localhost:6379';
}

function getRedisInstance(): Redis | null {
	if (redisClient) return redisClient;

	const redisUrl = resolveRedisUrl();

	try {
		redisClient = new Redis(redisUrl, {
			maxRetriesPerRequest: 1,
			connectTimeout: 2000,
			retryStrategy(times) {
				if (times > 3) return null;
				return Math.min(times * 200, 1000);
			}
		});

		redisClient.on('connect', () => {
			console.info('[Redis] Connected successfully.');
		});

		redisClient.on('error', (err) => {
			console.warn('[Redis] Connection error, graceful fallback active:', err.message);
		});

		return redisClient;
	} catch (error) {
		console.warn('[Redis] Failed to initialize client, fallback active:', error);
		return null;
	}
}

/**
 * Retrieve cached JSON data by key. Returns null if key not found or Redis is unavailable.
 */
export async function getCache<T>(key: string): Promise<T | null> {
	const client = getRedisInstance();
	if (!client) return null;

	try {
		const raw = await client.get(key);
		if (!raw) return null;
		return JSON.parse(raw) as T;
	} catch (error) {
		console.warn(`[Redis] Error getting key "${key}":`, (error as Error).message);
		return null;
	}
}

/**
 * Store data as JSON in Redis with optional TTL in seconds.
 */
export async function setCache<T>(key: string, value: T, ttlSeconds = 300): Promise<void> {
	const client = getRedisInstance();
	if (!client) return;

	try {
		const payload = JSON.stringify(value);
		if (ttlSeconds > 0) {
			await client.set(key, payload, 'EX', ttlSeconds);
		} else {
			await client.set(key, payload);
		}
	} catch (error) {
		console.warn(`[Redis] Error setting key "${key}":`, (error as Error).message);
	}
}

/**
 * Invalidate a specific cache key or array of keys.
 */
export async function delCache(key: string | string[]): Promise<void> {
	const client = getRedisInstance();
	if (!client) return;

	try {
		if (Array.isArray(key)) {
			if (key.length > 0) await client.del(...key);
		} else {
			await client.del(key);
		}
	} catch (error) {
		console.warn(`[Redis] Error deleting key "${key}":`, (error as Error).message);
	}
}

/**
 * Invalidate cache keys matching a pattern (e.g. `user:123:*`) using non-blocking SCAN.
 */
export async function invalidatePattern(pattern: string): Promise<void> {
	const client = getRedisInstance();
	if (!client) return;

	try {
		const stream = client.scanStream({ match: pattern, count: 100 });
		const keysToDelete: string[] = [];

		for await (const chunk of stream) {
			keysToDelete.push(...(chunk as string[]));
		}

		if (keysToDelete.length > 0) {
			await client.del(...keysToDelete);
		}
	} catch (error) {
		console.warn(`[Redis] Error invalidating pattern "${pattern}":`, (error as Error).message);
	}
}

