# Repayment as Linked Deposit Ledger Transaction

When a user takes a temporary withdrawal, we needed to decide how the ledger records the repayment installments. We decided that a temporary withdrawal immediately reduces the Jar's actual balance, and each repayment installment is recorded as a `Deposit` transaction linked to a `Repayment Record`, immediately incrementing the Jar balance and decrementing the remaining obligation until paid in full. This preserves ledger integrity while keeping cash-on-hand figures truthful.
