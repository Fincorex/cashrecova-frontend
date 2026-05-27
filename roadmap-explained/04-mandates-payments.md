# Chapter 4: Permissions and Payment Highways 💳

Now we have loans and schedules. But how do we actually collect the money when a payment is due? In the roadmap, this is covered in **EPIC 3 — Mandate Management** and **EPIC 4 — Payment Orchestration**.

---

## 1. What is a Mandate? (CASH-3.1) 📝
If a gym wants to withdraw membership fees from your bank account every month, they can't just take it. You have to sign a **Direct Debit Mandate**.
*   A **Mandate** is a legal "permission slip" signed by the borrower.
*   It authorizes CashRecova to automatically withdraw the monthly instalment from their bank account or charge their debit card.
*   **No Mandate = No Loan**: CashRecova enforces a strict rule: a lender cannot disburse (send out) loan money to a borrower unless there is an active, verified mandate on file. This prevents lenders from getting stuck with no way to recover their funds!

---

## 2. Multi-Account Mandates 🏦
Imagine a borrower named John who has two bank accounts:
*   Account A (Access Bank): John's primary account where his salary is paid.
*   Account B (Zenith Bank): John's secondary account.

John registers **both** accounts on CashRecova. 
*   We mark Account A as the **Primary Mandate**. 
*   If Account A has insufficient funds when a repayment is due, the system automatically tries Account B as a backup. This increases the chances of the lender getting paid back on time.

---

## 3. Payment Orchestration (CASH-4.1) 🛣️
If you want to drive from one city to another, you need a highway. If one highway has a massive traffic jam, you want to take a detour.

**Payment Orchestration** acts like a smart GPS navigation system for money transfers:
*   Instead of connecting to just one payment gateway (like Flutterwave), CashRecova connects to multiple payment gateways (Flutterwave, Paystack, NIBSS, etc.).
*   When a repayment is initiated, our system looks at the highways:
    *   *Is Paystack experiencing a server outage?* ➔ Route the money through Flutterwave instead!
    *   *Is NIBSS down?* ➔ Retry through an alternative card provider.
*   This happens automatically in the background within milliseconds, ensuring transaction success rates stay high.

---

## 4. Webhooks (CASH-4.3) 🔔
When you buy something online, the payment gateway takes a few seconds to process the transaction with the bank. The website doesn't just sit there frozen.

*   A **Webhook** is like a text message sent from the payment gateway to our server.
*   It says: *"Hey CashRecova, John's payment of $100 just went through successfully! Please update his loan balance."*
*   Once our server receives this webhook, it updates the database in the background, sends a notification to the borrower, and marks the instalment as `Paid`.
