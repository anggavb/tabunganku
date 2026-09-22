# Paired Ledger Records for Inter-Jar Transfers

We considered storing inter-jar transfers in a separate transfers table versus paired rows in the transactions ledger. We decided that every transfer produces two linked records in the `transactions` table (`TRANSFER_OUT` on the source Jar and `TRANSFER_IN` on the destination Jar, correlated by a `transfer_id`). This standardizes the ledger format across all Jars, enabling unified ledger queries, pagination, and auditability without poly-table joins.
