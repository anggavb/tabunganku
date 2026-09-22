# Redis Graceful Fallback Strategy

We considered whether a Redis connection failure should block application requests or fallback to PostgreSQL. We decided to containerize Redis using `redis:8.10.2-alpine` in Docker Compose and implement a resilient caching layer with graceful fallback. If Redis is unavailable, requests log a warning and read/write directly from PostgreSQL, ensuring zero downtime for end users even during cache maintenance or restarts.
