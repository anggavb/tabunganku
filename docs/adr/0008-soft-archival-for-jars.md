# Soft Archival for Jars

We considered allowing permanent deletion of Jars versus requiring soft archival. We decided that Jars cannot be hard deleted once created. A Jar can only be transitioned to an `Archived` state after two prerequisites are met: it must have a zero balance (funds withdrawn or transferred) and no open Repayment Records. This guarantees auditability and prevents orphaned ledger entries or vanishing wealth.
