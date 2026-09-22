# Quest Completion Reversibility

We considered whether a completed Quest stays permanently completed regardless of subsequent withdrawals. We decided that if a withdrawal drops the Jar's balance below the target amount, the Quest automatically reverts to `IN_PROGRESS` unless the withdrawal is explicitly categorized with the purpose "Goal Realized". This ensures the progress state reflects real-world achievement while properly tracking when savings have been cashed out for their intended reward.
