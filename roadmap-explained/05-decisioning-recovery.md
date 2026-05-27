# Chapter 5: Smart Checks & Courteous Collections 🧠

Before a lender gives out a loan, they need to know if the borrower can afford it. And if a borrower misses a payment, how does the system collect it? In the roadmap, this is **EPIC 5 — Credit Decisioning** and **EPIC 6 — Recovery Engine**.

---

## 1. Credit Decisioning: The Automated Gatekeeper (CASH-5.1) 📊
If you ask a bank for a loan, a human analyst might spend days reviewing your bank statements. 

**Credit Decisioning** does this automatically in 5 seconds:
1.  **Risk Scorecard**: The system pulls the borrower's historical financial data and calculates a score based on criteria (e.g. debt-to-income ratio).
2.  **API Integrations**: It connects to external credit bureaus (like CRC or CreditRegistry) to see if the borrower has outstanding bad debts with other lenders.
3.  **Automatic Decisions**: Based on the score, the system automatically marks the loan as:
    *   `Approved` ➔ The funds are sent out.
    *   `Referred` ➔ Pushed to a human manager for manual review.
    *   `Declined` ➔ Blocked immediately.

---

## 2. Recovery Engine: The Direct Debit Cycle (CASH-6.1) 🔁
If an instalment is due today at 8:00 AM, how do we collect it?

The **Recovery Engine** triggers an automated collection cycle:
1.  **First Attempt**: At 8:00 AM, the system tries to debit the primary bank account.
2.  **Backup Attempt**: If that fails (e.g. due to insufficient funds), it automatically tries any backup bank account mandates on file.
3.  **Partial Debit**: If the borrower owes $100, but only has $40 in their account, the system can perform a **Partial Debit** (taking the $40 to cover part of the debt, leaving $60 outstanding).
4.  **Automatic Retries**: If the entire payment failed, the system schedules automatic retries on days when John is likely to have funds (like salary days at the end of the month).

---

## 3. Intelligent Dunning (Friendly Reminders) (CASH-6.3) ✉️
Nobody likes aggressive debt collectors. **Dunning** is the process of sending automated payment reminders.

We use **Intelligent Dunning**, which means the reminders are polite, adaptive, and automated:
*   *3 Days Before Due Date*: A friendly text message: *"Hi John, just a reminder that your payment of $100 is due on Friday."*
*   *Day of Due Date*: *"Hi John, we will attempt to process your payment today at 10:00 AM."*
*   *1 Day Overdue*: *"Hi John, your payment was unsuccessful. Please top up your account so we can retry."*
*   *5 Days Overdue*: The tone becomes slightly more formal, outlining late fee implications.

This keeps collections fully automated and professional, ensuring borrowers are kept informed without human agents needing to call them manually.
