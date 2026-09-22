# Cached Balance with Redis Invalidation

We considered calculating balances purely on the fly or storing them only in SQL. We decided to maintain a durable `current_balance` column on the `jars` table protected by a `CHECK (current_balance >= 0)` constraint, while caching aggregated user balances and Jar states in Redis for fast reads. Any transaction that mutates balance (deposit, withdrawal, transfer, repayment) updates the PostgreSQL database within an atomic transaction and immediately invalidates the corresponding Redis cache keys.
