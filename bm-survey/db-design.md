# **Database Design**

## **Survey Panel — Survey-Based Rewards Platform**

---

| Field        | Details            |
| ------------ | ------------------ |
| Platform     | Survey Panel       |
| Prepared by  | Pronttera          |
| Contact      | info@pronttera.com |
| Version      | 1.0                |
| Date         | May 2026           |
| Database     | PostgreSQL         |
| Total Tables | 14                 |
| Total ENUMs  | 7                  |

---

## **Table of Contents**

1. ENUM Types
2. Group 1 — Foundation
   - users
   - admin_profiles
   - user_profiles
3. Group 2 — Departments & Bank Details
   - departments
   - bank_details
   - user_company_details
4. Group 3 — Reward Units & Surveys
   - reward_units
   - surveys
5. Group 4 — Survey Audits & Wallet
   - survey_audits
   - user_wallet
   - daily_transaction_log
6. Group 5 — Payment Gateway, Payout Settings & Support Tickets
   - payment_gateway_credentials
   - payout_settings
   - tickets
   - ticket_replies
7. Full Table Summary

---

## **1\. ENUM Types**

ENUMs are defined at the database level in PostgreSQL. All status and role fields use ENUMs instead of plain VARCHAR to enforce data integrity.

| Enum Name                   | Values                                               |
| --------------------------- | ---------------------------------------------------- |
| `user_role`                 | `super_admin`, `admin`, `user`                       |
| `user_status`               | `active`, `suspended`, `deactivated`                 |
| `survey_status`             | `draft`, `active`, `closed`                          |
| `survey_audit_status`       | `wip`, `completed`, `disqualified`, `leaved`         |
| `transaction_status`        | `success`, `failed`, `pending`                       |
| `ticket_category`           | `payment`, `survey`, `account`, `technical`, `other` |
| `ticket_status`             | `open`, `in_progress`, `resolved`, `closed`          |
| `department_request_status` | `pending`, `approved`, `rejected`                    |

---

## **2\. Group 1 — Foundation**

This group covers the core user identity tables shared across all roles — Super Admin, Admin, and User.

---

### **Table: `users`**

The central table for all roles. Role field distinguishes Super Admin, Admin, and User. All other tables reference this table via `user_id`.

| Column            | Type                     | Constraints                   | Notes                                  |
| ----------------- | ------------------------ | ----------------------------- | -------------------------------------- |
| `id`              | UUID                     | PK, DEFAULT gen_random_uuid() |                                        |
| `role`            | user_role                | NOT NULL                      | Enum — super_admin / admin / user      |
| `name`            | VARCHAR(150)             | NOT NULL                      | Full name                              |
| `email`           | VARCHAR(255)             | NOT NULL, UNIQUE              |                                        |
| `phone`           | VARCHAR(20)              | NOT NULL                      |                                        |
| `password_hash`   | TEXT                     |                               | Nullable — OAuth users won't have one  |
| `google_oauth_id` | VARCHAR(255)             |                               | Nullable — only for Google OAuth users |
| `status`          | user_status              | NOT NULL, DEFAULT 'active'    |                                        |
| `created_at`      | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                        |
| `updated_at`      | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                        |
| `deleted_at`      | TIMESTAMP WITH TIME ZONE |                               | Soft delete                            |

**Indexes:** `email`, `role`, `status`

---

### **Table: `admin_profiles`**

Stores organisation details for Admin and Super Admin. Created when Super Admin onboards a new Admin.

| Column         | Type                     | Constraints                   | Notes    |
| -------------- | ------------------------ | ----------------------------- | -------- |
| `id`           | UUID                     | PK, DEFAULT gen_random_uuid() |          |
| `user_id`      | UUID                     | NOT NULL, FK → users(id)      |          |
| `org_name`     | VARCHAR(255)             | NOT NULL                      |          |
| `org_address`  | TEXT                     | NOT NULL                      |          |
| `linkedin_url` | VARCHAR(500)             |                               | Nullable |
| `created_at`   | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |          |
| `updated_at`   | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |          |

**Indexes:** `user_id`

---

### **Table: `user_profiles`**

Stores personal and onboarding details for Users. `onboarding_step` tracks which step the user is currently on so they can resume if they close the app mid-onboarding.

| Column                | Type                     | Constraints                   | Notes                                   |
| --------------------- | ------------------------ | ----------------------------- | --------------------------------------- |
| `id`                  | UUID                     | PK, DEFAULT gen_random_uuid() |                                         |
| `user_id`             | UUID                     | NOT NULL, FK → users(id)      |                                         |
| `dob`                 | DATE                     |                               | Date of birth                           |
| `gender`              | VARCHAR(50)              |                               |                                         |
| `city`                | VARCHAR(100)             |                               |                                         |
| `country`             | VARCHAR(100)             |                               |                                         |
| `ip_address`          | VARCHAR(45)              |                               | IPv4 and IPv6 supported                 |
| `linkedin_url`        | VARCHAR(500)             |                               | Nullable                                |
| `onboarding_step`     | SMALLINT                 | NOT NULL, DEFAULT 1           | Current step (1–5)                      |
| `onboarding_complete` | BOOLEAN                  | NOT NULL, DEFAULT FALSE       | User can access platform only when TRUE |
| `created_at`          | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                         |
| `updated_at`          | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                         |

**Indexes:** `user_id`

---

## **3\. Group 2 — Departments & Bank Details**

Departments are a master list managed solely by the Super Admin. Admins select a department when creating a survey. Users select departments during onboarding to filter their survey feed. No junction tables — everyone picks freely from the active departments list.

---

### **Table: `departments`**

| Column       | Type                     | Constraints                   | Notes                                                 |
| ------------ | ------------------------ | ----------------------------- | ----------------------------------------------------- |
| `id`         | UUID                     | PK, DEFAULT gen_random_uuid() |                                                       |
| `name`       | VARCHAR(150)             | NOT NULL, UNIQUE              |                                                       |
| `is_active`  | BOOLEAN                  | NOT NULL, DEFAULT TRUE        | Deactivated departments cannot be used in new surveys |
| `created_by` | UUID                     | NOT NULL, FK → users(id)      | Always Super Admin                                    |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                                       |
| `updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                                       |
| `deleted_at` | TIMESTAMP WITH TIME ZONE |                               | Soft delete                                           |

**Indexes:** `is_active`

---

### **Table: `bank_details`**

Stores bank account information for all roles — Users, Admins, and Super Admin. Used by the payout cron job to process nightly payouts. `bank_details_updated_at` is used by the cron job to detect if bank details were changed on the same day as a payout — if so, the previous day's details are used for that night's payout.

| Column                    | Type                     | Constraints                      | Notes                                               |
| ------------------------- | ------------------------ | -------------------------------- | --------------------------------------------------- |
| `id`                      | UUID                     | PK, DEFAULT gen_random_uuid()    |                                                     |
| `user_id`                 | UUID                     | NOT NULL, UNIQUE, FK → users(id) | One bank record per user                            |
| `account_number`          | VARCHAR(20)              | NOT NULL                         |                                                     |
| `ifsc_code`               | VARCHAR(11)              | NOT NULL                         | Standard IFSC format                                |
| `bank_name`               | VARCHAR(150)             | NOT NULL                         |                                                     |
| `pan`                     | VARCHAR(10)              | NOT NULL                         | Format validated at app level — ABCDE1234F          |
| `bank_details_updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                    | Tracked separately from updated_at for payout logic |
| `created_at`              | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                    |                                                     |
| `updated_at`              | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                    |                                                     |

**Indexes:** `user_id`

---

### **Table: `user_company_details`**

Stores company and organisation email details collected during User onboarding (Step 4). Organisation email is optional — but if provided, it must be verified via OTP before the user can proceed.

| Column               | Type                     | Constraints                      | Notes                              |
| -------------------- | ------------------------ | -------------------------------- | ---------------------------------- |
| `id`                 | UUID                     | PK, DEFAULT gen_random_uuid()    |                                    |
| `user_id`            | UUID                     | NOT NULL, UNIQUE, FK → users(id) |                                    |
| `company_name`       | VARCHAR(255)             | NOT NULL                         |                                    |
| `designation`        | VARCHAR(150)             | NOT NULL                         |                                    |
| `org_email`          | VARCHAR(255)             |                                  | Nullable — optional field          |
| `org_email_verified` | BOOLEAN                  | NOT NULL, DEFAULT FALSE          | Set to TRUE after OTP verification |
| `created_at`         | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                    |                                    |
| `updated_at`         | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                    |                                    |

**Indexes:** `user_id`

---

## **4\. Group 3 — Reward Units & Surveys**

Reward units are platform-wide and managed only by the Super Admin. Admins select from existing active reward units when creating a survey. Surveys are created by Admins or Super Admin and target a single department.

---

### **Table: `reward_units`**

| Column            | Type                     | Constraints                   | Notes                                            |
| ----------------- | ------------------------ | ----------------------------- | ------------------------------------------------ |
| `id`              | UUID                     | PK, DEFAULT gen_random_uuid() |                                                  |
| `name`            | VARCHAR(100)             | NOT NULL, UNIQUE              | e.g. Silver Coin, Gold Coin, Diamond             |
| `value_in_rupees` | DECIMAL(10,2)            | NOT NULL                      | e.g. 2.00, 10.00, 50.00                          |
| `is_active`       | BOOLEAN                  | NOT NULL, DEFAULT TRUE        | Inactive units cannot be selected in new surveys |
| `created_by`      | UUID                     | NOT NULL, FK → users(id)      | Always Super Admin                               |
| `created_at`      | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                                  |
| `updated_at`      | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                                  |
| `deleted_at`      | TIMESTAMP WITH TIME ZONE |                               | Soft delete                                      |

**Indexes:** `is_active`

---

### **Table: `surveys`**

Core survey table. Each survey belongs to one department and one creator (Admin or Super Admin). `current_responses` is incremented each time a user completes the survey. When `current_responses >= quota`, the survey is automatically closed.

| Column              | Type                     | Constraints                     | Notes                                   |
| ------------------- | ------------------------ | ------------------------------- | --------------------------------------- |
| `id`                | UUID                     | PK, DEFAULT gen_random_uuid()   |                                         |
| `created_by`        | UUID                     | NOT NULL, FK → users(id)        | Admin or Super Admin                    |
| `department_id`     | UUID                     | NOT NULL, FK → departments(id)  | Single department per survey            |
| `title`             | VARCHAR(255)             | NOT NULL                        |                                         |
| `description`       | TEXT                     | NOT NULL                        |                                         |
| `external_link`     | TEXT                     | NOT NULL                        | Locked after publish — cannot be edited |
| `expiry_date`       | TIMESTAMP WITH TIME ZONE | NOT NULL                        | Survey auto-closes after this date      |
| `quota`             | INTEGER                  | NOT NULL                        | Maximum number of completions allowed   |
| `current_responses` | INTEGER                  | NOT NULL, DEFAULT 0             | Incremented on each completion          |
| `reward_unit_id`    | UUID                     | NOT NULL, FK → reward_units(id) |                                         |
| `reward_quantity`   | INTEGER                  | NOT NULL                        | Number of reward units per completion   |
| `status`            | survey_status            | NOT NULL, DEFAULT 'draft'       | draft / active / closed                 |
| `created_at`        | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                   |                                         |
| `updated_at`        | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                   |                                         |
| `deleted_at`        | TIMESTAMP WITH TIME ZONE |                                 | Soft delete                             |

**Indexes:** `created_by`, `department_id`, `status`, `expiry_date`

---

## **5\. Group 4 — Survey Audits & Wallet**

Survey audits track every user's interaction with every survey — one record per user per survey. The wallet stores each user's current reward balance. The daily transaction log records every payout attempt made by the nightly cron job.

---

### **Table: `survey_audits`**

One row per user per survey. Created when a user clicks a survey card (status \= wip). Updated when the external platform calls our API with the outcome. The unique constraint on `(survey_id, user_id)` ensures a user can never attempt the same survey more than once.

| Column       | Type                     | Constraints                   | Notes                                       |
| ------------ | ------------------------ | ----------------------------- | ------------------------------------------- |
| `id`         | UUID                     | PK, DEFAULT gen_random_uuid() |                                             |
| `survey_id`  | UUID                     | NOT NULL, FK → surveys(id)    |                                             |
| `user_id`    | UUID                     | NOT NULL, FK → users(id)      |                                             |
| `status`     | survey_audit_status      | NOT NULL, DEFAULT 'wip'       | wip / completed / disqualified / leaved     |
| `token`      | TEXT                     | NOT NULL                      | Signed JWT passed to external platform      |
| `token_used` | BOOLEAN                  | NOT NULL, DEFAULT FALSE       | Set to TRUE after external platform uses it |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                             |
| `updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                             |

**Unique constraint:** `(survey_id, user_id)`

**Indexes:** `survey_id`, `user_id`, `status`

---

### **Table: `user_wallet`**

One wallet per user. Balance is in ₹. Credited immediately when a survey is completed. Debited by the nightly payout cron job after successful Razorpay transfer.

| Column       | Type                     | Constraints                      | Notes                |
| ------------ | ------------------------ | -------------------------------- | -------------------- |
| `id`         | UUID                     | PK, DEFAULT gen_random_uuid()    |                      |
| `user_id`    | UUID                     | NOT NULL, UNIQUE, FK → users(id) | One wallet per user  |
| `balance`    | DECIMAL(10,2)            | NOT NULL, DEFAULT 0.00           | Current balance in ₹ |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                    |                      |
| `updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                    |                      |

**Indexes:** `user_id`

---

### **Table: `daily_transaction_log`**

Records every payout attempt made by the nightly cron job. One row per user per admin per night. Failed transactions are retried the next night — `retry_count` tracks how many times a transaction has been attempted.

| Column                  | Type                     | Constraints                   | Notes                                             |
| ----------------------- | ------------------------ | ----------------------------- | ------------------------------------------------- |
| `id`                    | UUID                     | PK, DEFAULT gen_random_uuid() |                                                   |
| `user_id`               | UUID                     | NOT NULL, FK → users(id)      | Recipient of the payout                           |
| `admin_id`              | UUID                     | NOT NULL, FK → users(id)      | Admin or SA whose Razorpay account is used        |
| `survey_id`             | UUID                     | NOT NULL, FK → surveys(id)    | Survey that triggered the reward                  |
| `amount`                | DECIMAL(10,2)            | NOT NULL                      | Total payout amount in ₹                          |
| `status`                | transaction_status       | NOT NULL, DEFAULT 'pending'   | success / failed / pending                        |
| `failure_comment`       | TEXT                     |                               | Nullable — populated on failure with error reason |
| `retry_count`           | SMALLINT                 | NOT NULL, DEFAULT 0           | Incremented on each failed retry                  |
| `razorpay_reference_id` | VARCHAR(255)             |                               | Nullable — populated on successful payout         |
| `created_at`            | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                                   |

**Indexes:** `user_id`, `admin_id`, `status`, `created_at`

---

## **6\. Group 5 — Payment Gateway, Payout Settings & Support Tickets**

---

### **Table: `payment_gateway_credentials`**

Stores Razorpay credentials for each Admin and Super Admin. Each has their own independent Razorpay account. Credentials are encrypted at the application level before being stored.

| Column                | Type                     | Constraints                      | Notes                               |
| --------------------- | ------------------------ | -------------------------------- | ----------------------------------- |
| `id`                  | UUID                     | PK, DEFAULT gen_random_uuid()    |                                     |
| `user_id`             | UUID                     | NOT NULL, UNIQUE, FK → users(id) | One Razorpay account per Admin / SA |
| `razorpay_key_id`     | TEXT                     | NOT NULL                         | Encrypted at application level      |
| `razorpay_key_secret` | TEXT                     | NOT NULL                         | Encrypted at application level      |
| `created_at`          | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                    |                                     |
| `updated_at`          | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                    |                                     |

**Indexes:** `user_id`

---

### **Table: `payout_settings`**

Stores the minimum payout threshold per Admin and Super Admin. The nightly cron job checks this value before triggering a payout — if the user's wallet balance is below this threshold, the payout is skipped until the next night.

| Column              | Type                     | Constraints                      | Notes                                        |
| ------------------- | ------------------------ | -------------------------------- | -------------------------------------------- |
| `id`                | UUID                     | PK, DEFAULT gen_random_uuid()    |                                              |
| `user_id`           | UUID                     | NOT NULL, UNIQUE, FK → users(id) | One setting per Admin / SA                   |
| `min_payout_amount` | DECIMAL(10,2)            | NOT NULL, DEFAULT 100.00         | Minimum ₹ balance required to trigger payout |
| `created_at`        | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                    |                                              |
| `updated_at`        | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                    |                                              |

**Indexes:** `user_id`

---

### **Table: `tickets`**

Support tickets raised by Users or Admins. All user tickets go to Super Admin. Admin tickets also go to Super Admin. `raised_by` stores who raised it, `assigned_to` stores who it is assigned to (always Super Admin for now).

| Column        | Type                     | Constraints                   | Notes                                          |
| ------------- | ------------------------ | ----------------------------- | ---------------------------------------------- |
| `id`          | UUID                     | PK, DEFAULT gen_random_uuid() |                                                |
| `raised_by`   | UUID                     | NOT NULL, FK → users(id)      | User or Admin who raised the ticket            |
| `assigned_to` | UUID                     | NOT NULL, FK → users(id)      | Super Admin always                             |
| `category`    | ticket_category          | NOT NULL                      | payment / survey / account / technical / other |
| `status`      | ticket_status            | NOT NULL, DEFAULT 'open'      | open / in_progress / resolved / closed         |
| `created_at`  | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                                |
| `updated_at`  | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                                                |
| `deleted_at`  | TIMESTAMP WITH TIME ZONE |                               | Soft delete                                    |

**Indexes:** `raised_by`, `assigned_to`, `status`

---

### **Table: `ticket_replies`**

Stores all replies in a ticket conversation thread. Both the ticket raiser and the assignee (Super Admin) can reply. Full conversation history is preserved.

| Column       | Type                     | Constraints                   | Notes                       |
| ------------ | ------------------------ | ----------------------------- | --------------------------- |
| `id`         | UUID                     | PK, DEFAULT gen_random_uuid() |                             |
| `ticket_id`  | UUID                     | NOT NULL, FK → tickets(id)    |                             |
| `replied_by` | UUID                     | NOT NULL, FK → users(id)      | User, Admin, or Super Admin |
| `message`    | TEXT                     | NOT NULL                      | Text only — no attachments  |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW()                 |                             |

**Indexes:** `ticket_id`, `replied_by`

---

## **7\. Full Table Summary**

| \#  | Table                         | Group                  | Soft Delete | Notes                                  |
| --- | ----------------------------- | ---------------------- | ----------- | -------------------------------------- |
| 1   | `users`                       | Foundation             | Yes         | Central table for all roles            |
| 2   | `admin_profiles`              | Foundation             | No          | Org details for Admin and SA           |
| 3   | `user_profiles`               | Foundation             | No          | Personal \+ onboarding data for Users  |
| 4   | `departments`                 | Departments & Bank     | Yes         | Master list managed by SA              |
| 5   | `bank_details`                | Departments & Bank     | No          | All roles — used by payout cron        |
| 6   | `user_company_details`        | Departments & Bank     | No          | Company details from onboarding Step 4 |
| 7   | `reward_units`                | Reward Units & Surveys | Yes         | Platform-wide, managed by SA only      |
| 8   | `surveys`                     | Reward Units & Surveys | Yes         | Created by Admin or SA                 |
| 9   | `survey_audits`               | Survey Audits & Wallet | No          | One row per user per survey            |
| 10  | `user_wallet`                 | Survey Audits & Wallet | No          | One wallet per user                    |
| 11  | `daily_transaction_log`       | Survey Audits & Wallet | No          | Nightly payout log                     |
| 12  | `payment_gateway_credentials` | Payments & Tickets     | No          | Razorpay creds per Admin / SA          |
| 13  | `payout_settings`             | Payments & Tickets     | No          | Min payout threshold per Admin / SA    |
| 14  | `tickets`                     | Payments & Tickets     | Yes         | Support tickets                        |
| 15  | `ticket_replies`              | Payments & Tickets     | No          | Ticket conversation thread             |

---

_DB Design v1.0 — Prepared by Pronttera for Beacon Martech Private Limited — May 2026_
