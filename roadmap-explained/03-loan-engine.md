# Chapter 3: The Loan Engine ⚙️

Now we are getting to the heart of the platform: **EPIC 2 — Loan Engine**. This is the mechanical calculator that creates loans, schedules payments, and keeps track of who owes what.

---

## 1. PII Encryption (Protecting Private Info) (CASH-2.1) 🛡️
**PII** stands for *Personally Identifiable Information*. This is highly sensitive data like:
*   Bank Verification Numbers (BVNs)
*   Personal phone numbers and home addresses
*   Bank account details

**AES-256 Encryption**:
To protect borrowers, we encrypt this data using **AES-256** (the same military grade standard used by governments). 
*   If a developer looks at the database, instead of seeing a BVN like `22198765432`, they will see an unreadable wall of gibberish like `U2FsdGVkX19zM245...`.
*   The raw data is decrypted only at the exact millisecond it is displayed on the screen for an authorized user.
*   **Masking**: Even when displayed, we hide most of the numbers (e.g., `***1234`) so people looking over your shoulder can't copy it.

---

## 2. The Loan State Machine (CASH-2.2) 🔄
Imagine ordering a package on Amazon. It travels through specific steps:
`Ordered` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`

It would make no sense if a package was marked `Delivered` before it was even `Ordered`. 

A **State Machine** is a piece of code that makes sure a loan *only* moves through logical steps. 
*   **Valid States**: `Draft` ➔ `Active` ➔ `Repaying` ➔ `Closed`
*   If a lender accidentally tries to move a loan straight from `Draft` to `Defaulted` (late/unpaid), the system throws an error and blocks the change.

---

## 3. Interest Engine (No Floating Points!) (CASH-2.3) 🧮
When you calculate interest in software, you *never* use normal decimals (which computers call "floating points"). 

**Why?**
Computers represent numbers using binary code (0s and 1s). Because of this, they are bad at calculating fractional cents. In normal computer code, `0.1 + 0.2` actually equals `0.30000000000000004`! 
*   If you compound that error across millions of loans, pennies start disappearing or appearing out of nowhere. This is called **Rounding Drift**.

**The Solution: Basis Points & Brick/Money**:
We calculate all money using integer numbers (whole numbers) or high-precision financial libraries. 
*   Instead of storing an interest rate of `5.25%` as a decimal, we store it as `525` **Basis Points** (whole numbers). 
*   The final cent rounding adjustments are always added to the final instalment so the math balances perfectly to the penny.

---

## 4. Repayment Schedules (CASH-2.4) 📅
When a loan becomes active, CashRecova automatically generates a calendar grid of **Repayment Schedules**. 
*   For a 3-month loan, it creates 3 separate rows in the database, detailing exactly:
    *   The date each payment is due.
    *   How much of that payment goes towards paying back the principal (the original borrowed sum).
    *   How much goes towards the interest.
*   Lenders and borrowers can view this schedule at any time to see exactly what remains to be paid.
