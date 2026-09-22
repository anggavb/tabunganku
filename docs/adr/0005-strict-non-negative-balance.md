# Strict Non-Negative Balance

We considered whether to allow a Jar's balance to dip below zero (overdraft). We decided to strictly prohibit negative balances via database check constraints (`balance >= 0`) and domain validation. A savings quest container cannot be in deficit, ensuring mathematically reliable progress tracking and preventing distorted total savings statistics.
