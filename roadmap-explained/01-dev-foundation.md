# Chapter 1: The Foundation & The Multi-Tenant Apartment 🏗️

Before we write code that handles money, we have to build the "pipes" and "electrical systems." In the roadmap, this is **EPIC 0 — Foundation & Developer Experience**. 

Here is what these tasks mean in plain English:

---

## 1. Multi-Tenancy (CASH-0.6) 🏢
**What is a "Tenant"?**
In real estate, a tenant is someone who rents an apartment in a building. In our software, a tenant is a **lender** (a company that uses our platform to give loans).

**How do we separate their data?**
Imagine a giant apartment building. We have two ways to design it:
*   *Bad Design*: One massive room where all tenants sleep, eat, and store their money together. (If one person makes a mess, everyone suffers. If someone walks around at night, they might accidentally take another tenant's money!)
*   *Good Design (Our Way)*: We give each tenant their own locked apartment with its own key, walls, and safe box.

In database terms, these apartments are called **isolated PostgreSQL schemas**. If Lender A runs a query to find borrower details, the database physically makes it impossible for Lender A to see Lender B's borrowers.

---

## 2. Row Level Security (RLS) (CASH-0.8) 👮‍♂️
Even in an apartment building with separate locked doors, what if a door is accidentally left open by mistake? 

**Row Level Security (RLS)** is like hiring a security guard who stands inside the apartment. Even if a door is unlocked, the guard stops anyone from entering unless they can prove they live in *that specific apartment*. 

If a programmer writes a bug in the code that forgets to check which lender is logged in, the database itself detects the access attempt and says: *"Nope! You don't have permission to look at this database row."* It is our second line of defense.

---

## 3. The Audit Log (CASH-0.9) 📝
Imagine a bank where employees can write down transaction values. If someone changes a borrower's outstanding debt from $1,000 to $0, we need to know:
*   Who did it?
*   When did they do it?
*   What was the value *before* the change?

The **Audit Log** is like an **invisible camera** that automatically records every single change made to the database. 
*   It is **immutable**, meaning once a log is written, it is physically impossible to edit or delete it (even for the database administrators). 
*   If someone attempts to delete an audit log, the database immediately triggers a alarm and blocks the request.

---

## 4. Redis (CASH-0.3) ⚡
When you are working at a desk, you have:
1.  A **filing cabinet** across the room (PostgreSQL database): It stores everything permanently, but takes a few seconds to walk over, open the drawer, and find a folder.
2.  A **desk organizer** right in front of you (Redis): It holds a few documents you need *right now*. You can reach them in a millisecond.

**Redis** is a super-fast database that lives in the computer's memory. We use it to:
*   Keep counters for rate limits (making sure nobody is spamming the API).
*   Coordinate background queues (tasks that run in the background, like sending thousands of emails without slowing down the active website).
