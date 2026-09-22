# Bigint IDR Currency Representation

We considered storing monetary values as decimals/numerics versus integer cents or whole Rupiah. We decided to store all money amounts as `bigint` in whole Indonesian Rupiah (IDR). IDR does not use decimal cents in daily transactions, and integer arithmetic avoids floating-point precision issues while maximizing query performance.
