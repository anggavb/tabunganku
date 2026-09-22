# JarWis Context

JarWis is a gamified savings management platform that organizes money into purposeful pockets ("Jars") with RPG-styled quest goals.

## Language

### Wadah & Target

**Jar**:
A distinct savings pocket or container holding a dedicated balance for a specific purpose.
_Avoid_: Account, wallet, envelope, toples

**Archived Jar**:
A retired Jar with zero balance and no active repayment obligations, preserved strictly for historical records.
_Avoid_: Deleted jar, closed jar, nonaktif

**Quest**:
An optional saving target and progress milestone attached to a Jar.
_Avoid_: Goal, target, budget

**Total Savings**:
The aggregate balance of all active Jars owned by a user.
_Avoid_: Net worth, total balance, total asset

### Transaksi & Ledger

**Deposit**:
An inflow of external money directly into a Jar, increasing its balance.
_Avoid_: Income, credit, top-up, pemasukan

**Withdrawal**:
An outflow of money from a Jar for spending or external use, reducing its balance.
_Avoid_: Expense, debit, spending, pengeluaran

**Transfer**:
The movement of money between two Jars owned by the same user, recorded as paired outflow and inflow transactions linked by a transfer ID.
_Avoid_: Remittance, reallocation, pindah dana

**Category**:
A classification label for a Deposit (source of funds) or a Withdrawal (spending purpose).
_Avoid_: Tag, label, bucket

### Penarikan Sementara & Pengembalian

**Temporary Withdrawal**:
A withdrawal with an explicit intent and obligation to return the funds back to the Jar over time.
_Avoid_: Borrowing, loan, kasbon, utang jar

**Repayment**:
The process or installment transaction of returning funds back to a Jar from an outstanding temporary withdrawal.
_Avoid_: Debt payment, refund, return, bayar utang

**Repayment Record**:
The tracking entity recording the original amount taken, total amount repaid, remaining balance, and optional due date.
_Avoid_: Loan schedule, debt record

### Rutinitas & Notifikasi

**Recurring Rule**:
A scheduled rule defining periodic deposits into a Jar, executed either via user confirmation or optional automated background execution.
_Avoid_: Subscription, auto-debit, standing order

**In-App Notification**:
An in-system alert delivered via the notification center and dashboard cards regarding quest milestones, repayment due dates, or recurring triggers.
_Avoid_: Push notification, email alert, SMS
