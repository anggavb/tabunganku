# Recurring Transaction Execution Strategy

We considered whether recurring transactions should execute automatically in the background or require manual confirmation. We decided on a user-approval queue by default that prompts the user when a recurring deposit is due, with a configurable "auto-execute / don't ask again" option per recurring rule or preference. This avoids desynchronizing manual savings records from real-world bank balances while allowing automation for users who prefer hands-free tracking.
