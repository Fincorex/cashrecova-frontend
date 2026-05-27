# Chapter 6: Subscriptions and Alerts 🔔

We are at the final chapters: **EPIC 7 — Billing Engine** and **EPIC 8 — Notifications**. 

These modules keep CashRecova running as a profitable business and keep everyone (lenders and borrowers) up to date in real-time.

---

## 1. The Billing Engine (CASH-7.1) 🧾
**How does CashRecova make money?**
CashRecova is a B2B SaaS (Business-to-Business Software-as-a-Service) platform. We charge the lenders who use our platform:
*   **A Monthly Subscription Fee**: E.g. $500/month.
*   **Usage-Based Fees**: E.g. a small percentage of every loan disbursed, or $0.05 for every automated BVN verification check performed.

**Automated Invoicing**:
The **Billing Engine** acts like an automated utility meter. 
*   It tracks every API call, loan, and KYC verification performed by Lender A.
*   At the end of the month, it compiles these records into a single itemized invoice.
*   It automatically charges the lender's registered payment card. If the charge fails, it sends alerts and can temporarily restrict access to the API if left unpaid.

---

## 2. The Notifications Dispatcher (CASH-8.1) 📣
When a loan is approved, or a payment fails, we need to send immediate notifications. 

The **Notifications Dispatcher** is a central postal service that handles this:
*   Instead of each module (like Loan Engine or Recovery Engine) sending emails independently, they all send notification requests to this central dispatcher.
*   **Channels**: It supports multi-channel deliveries:
    *   **SMS** (text messages via services like Twilio).
    *   **Email** (via services like Mailgun or Postmark).
    *   **Web Push** (browser popup alerts).
*   **Template Manager**: Admins can change the wording of the "Loan Approved" email inside a central visual dashboard without having to edit any code.

---

## 3. Background Queues (Asynchronous Delivery) (CASH-8.3) 🚀
Imagine you are checking out at a supermarket. If the cashier stops to physically write and mail a thank-you letter to the customer in front of you before scanning your items, the line would be backed up for hours!

**Asynchronous queues** solve this:
*   When a loan is disbursed, the database is updated instantly.
*   Instead of waiting for the email server to send the message (which takes 2-3 seconds), the system places a ticket in our **Queue** (backed by **Redis**) that says: *"Please send the loan disbursement email to John."*
*   The system immediately completes the checkout process.
*   In the background, a separate server worker picks up the ticket from the queue and sends the email.
*   The user experiences a blazing-fast website load speed, and the emails arrive securely in the background.

---

## Congratulations! 🎉
You have completed the beginner's tour of the CashRecova build roadmap! 

Now when you look at the master `Roadmap.md` file, you can easily picture the structure: a secure, high-speed apartment building (database schemas) with active security guards (RLS), OAuth keycard systems (Passport), automatic billing meters, and intelligent payment pathways.
