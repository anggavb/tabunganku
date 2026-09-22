# Transaction Deletion and Safeguards

We considered an append-only ledger requiring reversal/adjustment transactions versus allowing direct deletion of erroneous transactions. We decided to allow transaction deletion with strict validations: deletion is rejected if it would cause the Jar's balance to drop below zero, and a Temporary Withdrawal cannot be deleted once repayments have been applied to its record. This accommodates personal user typos without complicating UX, while preserving balance non-negativity.
