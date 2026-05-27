# Chapter 2: Locks, Keys, and Permissions 🔑

Now that the building has walls, we need to decide who gets to go inside. In the roadmap, this is **EPIC 1 — Auth Module**.

Lenders need to log in to a web dashboard to see their metrics, and their own servers need to talk to CashRecova. Here is how we secure these entrances:

---

## 1. Sanctum vs. Passport (CASH-0.2 & CASH-1.3) 🎫
Laravel (our backend framework) has two built-in security systems:
*   **Sanctum**: Simple keycards. Great for small websites where users log in from a browser.
*   **Passport**: High-security, industrial-grade entry tokens. It supports **OAuth 2.0**, which is the global security standard used by Google, Stripe, and large banks.

We replaced Sanctum with **Passport** because CashRecova is built for financial institutions. Passport allows:
1.  **Machine-to-Machine (M2M) Auth**: Lender B's automated servers can talk directly to our servers securely using secure client credentials, without needing a human to type a password.
2.  **Short-Lived Access Tokens**: If someone intercepts a keycard, it will stop working automatically after 1 hour, requiring them to get a fresh one.

---

## 2. API Keys & Key Rotation (CASH-1.2) 🔐
When a developer connects their software to CashRecova, they get an **API Key** (a long secret password that looks like `cr_live_abc123...`).

**Bcrypt Hashing (Security standard)**:
If a hacker steals our main database, we don't want them seeing the keys! So we never save the actual API key. Instead, we run it through a mathematical blender called **Bcrypt**. 
*   If you blend an apple, you get apple juice. You can't turn apple juice back into a solid apple. 
*   Bcrypt turns a key into a "hash". When a server connects, we blend their input and see if the juice matches our database records. If yes, they are let in!

**Key Rotation**:
If a key is accidentally posted online or compromised, the developer can trigger a **Key Rotation**. This instantly deactivates the old compromised key and generates a brand new one in a single split-second step, ensuring their systems stay connected without any downtime.

---

## 3. RBAC (Role-Based Access Control) (CASH-1.4) 👥
Just because you work in a building doesn't mean you should have keys to the vault. We have three user levels:
1.  **Admin**: The owner. They can change settings, add or remove employees, and view all money logs.
2.  **Ops (Operations)**: The worker. They can create loans and process repayments, but they cannot change settings or delete users.
3.  **Viewer**: The auditor. They can look at records and charts, but they are physically blocked from adding, editing, or deleting anything.

---

## 4. TOTP MFA (Multi-Factor Authentication) (CASH-1.4) 📱
Passwords can be guessed or stolen. **MFA** adds a second step. 
*   **TOTP** stands for *Time-Based One-Time Password*. 
*   It's the 6-digit code that changes every 30 seconds on your phone's authenticator app (like Google Authenticator). 
*   Even if a hacker has your email and password, they cannot log in unless they also have physical possession of your smartphone.
