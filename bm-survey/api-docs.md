# **API Documentation**

## **Survey Panel — Survey-Based Rewards Platform**

---

| Field          | Details                                    |
| -------------- | ------------------------------------------ |
| Document Title | API Documentation                          |
| Platform Name  | Survey Panel                               |
| Prepared by    | Pronttera                                  |
| Contact        | info@pronttera.com                         |
| Version        | 1.0                                        |
| Date           | May 2026                                   |
| Base URL       | `https://api.surveypanel.com/v1`           |
| Auth           | JWT Bearer Token (unless stated otherwise) |
| Format         | JSON                                       |

---

## **Table of Contents**

1. [Authentication & Common Headers](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#1-authentication--common-headers)
2. [Auth APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#2-auth-apis)
3. [Admin Management APIs (Super Admin)](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#3-admin-management-apis-super-admin)
4. [Department APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#4-department-apis)
5. [Reward Unit APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#5-reward-unit-apis)
6. [Survey APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#6-survey-apis)
7. [User Management APIs (Super Admin)](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#7-user-management-apis-super-admin)
8. [User Onboarding APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#8-user-onboarding-apis)
9. [Survey Feed & Flow APIs (User App)](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#9-survey-feed--flow-apis-user-app)
10. [External Survey Callback APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#10-external-survey-callback-apis)
11. [Wallet APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#11-wallet-apis)
12. [Payout & Payment APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#12-payout--payment-apis)
13. [Analytics APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#13-analytics-apis)
14. [Support Ticket APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#14-support-ticket-apis)
15. [Profile APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#15-profile-apis)
16. [Utility APIs](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#16-utility-apis)
17. [API Summary Table](https://claude.ai/chat/be7c4a46-2664-4279-8ad9-9e9fe363b2dc#17-api-summary-table)

---

## **1\. Authentication & Common Headers**

### **Request Headers (Authenticated Routes)**

| Header          | Value                |
| --------------- | -------------------- |
| `Authorization` | `Bearer <JWT_TOKEN>` |
| `Content-Type`  | `application/json`   |

### **JWT Payload Structure**

{  
 "sub": "user_uuid",  
 "role": "super_admin | admin | user",  
 "email": "user@email.com",  
 "iat": 1716000000,  
 "exp": 1716604800  
}

### **Common Error Responses**

| Status | Description                                                              |
| ------ | ------------------------------------------------------------------------ |
| 400    | Bad Request — validation error, missing fields                           |
| 401    | Unauthorized — invalid or expired JWT                                    |
| 403    | Forbidden — insufficient role permissions, account suspended/deactivated |
| 404    | Not Found — resource does not exist                                      |
| 409    | Conflict — duplicate resource (e.g. email already exists)                |
| 500    | Internal Server Error                                                    |

---

## **2\. Auth APIs**

---

### **2.1 POST /auth/register**

**Description:** Register a new user account (User App only)

**Auth:** None

**Request Body:**

| Field      | Type   | Required | Validation                                       |
| ---------- | ------ | -------- | ------------------------------------------------ |
| `name`     | string | Yes      | Max 150 chars                                    |
| `email`    | string | Yes      | Valid email format, unique                       |
| `phone`    | string | Yes      | Max 20 chars                                     |
| `password` | string | Yes      | Min 8 chars, at least 1 number \+ 1 special char |

**Success Response (201):**

{  
 "message": "Account created. Please verify your email.",  
 "user_id": "uuid"  
}

**Error Responses:**

| Status | Condition            | Message                                      |
| ------ | -------------------- | -------------------------------------------- |
| 409    | Email already exists | "An account with this email already exists." |
| 400    | Validation error     | Field-specific error messages                |

---

### **2.2 POST /auth/verify-email**

**Description:** Verify user's email address after registration

**Auth:** None

**Request Body:**

| Field   | Type   | Required |
| ------- | ------ | -------- |
| `email` | string | Yes      |
| `otp`   | string | Yes      |

**Success Response (200):**

{  
 "message": "Email verified successfully."  
}

**Error Responses:**

| Status | Condition   | Message                                      |
| ------ | ----------- | -------------------------------------------- |
| 400    | Invalid OTP | "Incorrect OTP. Please try again."           |
| 400    | OTP expired | "OTP has expired. Please request a new one." |

---

### **2.3 POST /auth/resend-verification**

**Description:** Resend email verification OTP

**Auth:** None

**Request Body:**

| Field   | Type   | Required |
| ------- | ------ | -------- |
| `email` | string | Yes      |

**Success Response (200):**

{  
 "message": "Verification OTP sent."  
}

**Error Responses:**

| Status | Condition               | Message                                    |
| ------ | ----------------------- | ------------------------------------------ |
| 429    | Resent within 2 minutes | "Please wait before requesting a new OTP." |

---

### **2.4 POST /auth/login**

**Description:** Log in for all roles (User App \+ Admin Portal)

**Auth:** None

**Request Body:**

| Field      | Type   | Required |
| ---------- | ------ | -------- |
| `email`    | string | Yes      |
| `password` | string | Yes      |

**Success Response (200):**

{  
 "token": "jwt_token",  
 "user": {  
 "id": "uuid",  
 "name": "John",  
 "email": "john@example.com",  
 "role": "user",  
 "status": "active",  
 "onboarding_complete": true  
 }  
}

**Error Responses:**

| Status | Condition           | Message                                                            |
| ------ | ------------------- | ------------------------------------------------------------------ |
| 401    | Wrong credentials   | "Invalid email or password."                                       |
| 403    | Account suspended   | "Your account has been suspended. Please contact the Super Admin." |
| 403    | Account deactivated | "Your account has been deactivated. Please contact support."       |
| 403    | Email not verified  | "Please verify your email before logging in."                      |

---

### **2.5 POST /auth/google**

**Description:** Google OAuth login/register (User App only)

**Auth:** None

**Request Body:**

| Field          | Type   | Required |
| -------------- | ------ | -------- |
| `google_token` | string | Yes      |

**Flow:**

- Server verifies Google token, extracts name, email, google_oauth_id
- If email exists → log in
- If email does not exist → create account, return user with onboarding_complete \= false

**Success Response (200):**

{  
 "token": "jwt_token",  
 "user": {  
 "id": "uuid",  
 "name": "John",  
 "email": "john@gmail.com",  
 "role": "user",  
 "status": "active",  
 "onboarding_complete": false  
 },  
 "is_new_user": true  
}

---

### **2.6 POST /auth/forgot-password**

**Description:** Send password reset link via email

**Auth:** None

**Request Body:**

| Field   | Type   | Required |
| ------- | ------ | -------- |
| `email` | string | Yes      |

**Success Response (200):**

{  
 "message": "If this email is registered, you will receive a password reset link. Please check your spam folder."  
}

**Note:** Always returns 200 regardless of whether email exists — prevents email enumeration.

---

### **2.7 POST /auth/reset-password**

**Description:** Reset password using token from email link

**Auth:** None

**Request Body:**

| Field      | Type   | Required | Validation                                       |
| ---------- | ------ | -------- | ------------------------------------------------ |
| `token`    | string | Yes      | Reset token from email                           |
| `password` | string | Yes      | Min 8 chars, at least 1 number \+ 1 special char |

**Success Response (200):**

{  
 "message": "Password reset successfully. Please log in."  
}

**Error Responses:**

| Status | Condition          | Message                                                            |
| ------ | ------------------ | ------------------------------------------------------------------ |
| 400    | Token expired      | "This reset link has expired. Please request a new one."           |
| 400    | Token already used | "This reset link has already been used. Please request a new one." |

---

### **2.8 POST /auth/change-password**

**Description:** Change password from profile (all roles). Logs out user on success.

**Auth:** Required

**Request Body:**

| Field              | Type   | Required | Validation                                       |
| ------------------ | ------ | -------- | ------------------------------------------------ |
| `current_password` | string | Yes      |                                                  |
| `new_password`     | string | Yes      | Min 8 chars, at least 1 number \+ 1 special char |

**Success Response (200):**

{  
 "message": "Password updated. Please log in again."  
}

**Error Responses:**

| Status | Condition              | Message                                                 |
| ------ | ---------------------- | ------------------------------------------------------- |
| 400    | Wrong current password | "Current password is incorrect."                        |
| 400    | Same as current        | "New password must be different from current password." |

---

## **3\. Admin Management APIs (Super Admin)**

All endpoints require role \= `super_admin`.

---

### **3.1 POST /admins**

**Description:** Create a new Admin account

**Request Body:**

| Field          | Type   | Required | Validation          |
| -------------- | ------ | -------- | ------------------- |
| `name`         | string | Yes      | Max 150 chars       |
| `email`        | string | Yes      | Valid email, unique |
| `phone`        | string | Yes      | Max 20 chars        |
| `org_name`     | string | Yes      | Max 255 chars       |
| `org_address`  | string | Yes      |                     |
| `linkedin_url` | string | No       | Valid URL format    |

**Flow:**

- Create user record with role \= admin, auto-generate password
- Create admin_profiles record
- Send email with credentials via NodeMailer

**Success Response (201):**

{  
 "message": "Admin created successfully.",  
 "admin_id": "uuid",  
 "email_sent": true  
}

**Error Responses:**

| Status | Condition            | Message                                      |
| ------ | -------------------- | -------------------------------------------- |
| 409    | Email already exists | "An account with this email already exists." |

---

### **3.2 GET /admins**

**Description:** List all Admins

**Query Params:**

| Param    | Type   | Default | Description                      |
| -------- | ------ | ------- | -------------------------------- |
| `page`   | number | 1       | Page number                      |
| `limit`  | number | 20      | Items per page                   |
| `status` | string | all     | Filter: all / active / suspended |
| `search` | string |         | Search by name or email          |

**Success Response (200):**

{  
 "data": \[  
 {  
 "id": "uuid",  
 "name": "Admin Name",  
 "email": "admin@org.com",  
 "phone": "+91...",  
 "status": "active",  
 "org_name": "Org Ltd",  
 "created_at": "2026-05-01T10:00:00Z"  
 }  
 \],  
 "total": 25,  
 "page": 1,  
 "limit": 20  
}

---

### **3.3 GET /admins/:id**

**Description:** Get single Admin details with organisation profile

**Success Response (200):**

{  
 "id": "uuid",  
 "name": "Admin Name",  
 "email": "admin@org.com",  
 "phone": "+91...",  
 "status": "active",  
 "profile": {  
 "org_name": "Org Ltd",  
 "org_address": "Address",  
 "linkedin_url": "https://linkedin.com/..."  
 },  
 "created_at": "2026-05-01T10:00:00Z"  
}

---

### **3.4 PATCH /admins/:id/suspend**

**Description:** Suspend an Admin account

**Success Response (200):**

{  
 "message": "Admin suspended successfully."  
}

---

### **3.5 PATCH /admins/:id/reactivate**

**Description:** Reactivate a suspended Admin account

**Success Response (200):**

{  
 "message": "Admin reactivated successfully."  
}

---

## **4\. Department APIs**

---

### **4.1 POST /departments**

**Description:** Create a new department (Super Admin only)

**Auth:** role \= `super_admin`

**Request Body:**

| Field  | Type   | Required | Validation            |
| ------ | ------ | -------- | --------------------- |
| `name` | string | Yes      | Max 150 chars, unique |

**Success Response (201):**

{  
 "message": "Department created successfully.",  
 "department": {  
 "id": "uuid",  
 "name": "IT Industry",  
 "is_active": true  
 }  
}

**Error Responses:**

| Status | Condition      | Message                                       |
| ------ | -------------- | --------------------------------------------- |
| 409    | Duplicate name | "A department with this name already exists." |

---

### **4.2 GET /departments**

**Description:** List all departments. Used by all roles — Admin (survey creation), User (onboarding \+ preferences), Super Admin (management).

**Auth:** Required (any role)

**Query Params:**

| Param       | Type    | Default | Description               |
| ----------- | ------- | ------- | ------------------------- |
| `is_active` | boolean |         | Filter by active/inactive |

**Success Response (200):**

{  
 "data": \[  
 {  
 "id": "uuid",  
 "name": "IT Industry",  
 "is_active": true,  
 "created_at": "2026-05-01T10:00:00Z"  
 }  
 \]  
}

---

### **4.3 PATCH /departments/:id**

**Description:** Update department name (Super Admin only)

**Auth:** role \= `super_admin`

**Request Body:**

| Field  | Type   | Required |
| ------ | ------ | -------- |
| `name` | string | Yes      |

**Success Response (200):**

{  
 "message": "Department updated successfully."  
}

---

### **4.4 PATCH /departments/:id/deactivate**

**Description:** Deactivate a department (Super Admin only)

**Auth:** role \= `super_admin`

**Success Response (200):**

{  
 "message": "Department deactivated successfully."  
}

---

### **4.5 PATCH /departments/:id/reactivate**

**Description:** Reactivate a department (Super Admin only)

**Auth:** role \= `super_admin`

**Success Response (200):**

{  
 "message": "Department reactivated successfully."  
}

---

## **5\. Reward Unit APIs**

---

### **5.1 POST /reward-units**

**Description:** Create a new reward unit (Super Admin only)

**Auth:** role \= `super_admin`

**Request Body:**

| Field             | Type   | Required | Validation            |
| ----------------- | ------ | -------- | --------------------- |
| `name`            | string | Yes      | Max 100 chars, unique |
| `value_in_rupees` | number | Yes      | \> 0, decimal allowed |

**Success Response (201):**

{  
 "message": "Reward unit created successfully.",  
 "reward_unit": {  
 "id": "uuid",  
 "name": "Silver Coin",  
 "value_in_rupees": 2.00,  
 "is_active": true  
 }  
}

**Error Responses:**

| Status | Condition      | Message                                        |
| ------ | -------------- | ---------------------------------------------- |
| 409    | Duplicate name | "A reward unit with this name already exists." |
| 400    | Value \<= 0    | "Value must be greater than ₹0."               |

---

### **5.2 GET /reward-units**

**Description:** List all reward units. Used by Admin (survey creation) and Super Admin (management).

**Auth:** Required (super_admin or admin)

**Query Params:**

| Param       | Type    | Default | Description               |
| ----------- | ------- | ------- | ------------------------- |
| `is_active` | boolean |         | Filter by active/inactive |

**Success Response (200):**

{  
 "data": \[  
 {  
 "id": "uuid",  
 "name": "Silver Coin",  
 "value_in_rupees": 2.00,  
 "is_active": true  
 }  
 \]  
}

---

### **5.3 PATCH /reward-units/:id**

**Description:** Update a reward unit (Super Admin only)

**Auth:** role \= `super_admin`

**Request Body:**

| Field             | Type   | Required |
| ----------------- | ------ | -------- |
| `name`            | string | No       |
| `value_in_rupees` | number | No       |

**Success Response (200):**

{  
 "message": "Reward unit updated successfully."  
}

---

### **5.4 PATCH /reward-units/:id/deactivate**

**Description:** Deactivate a reward unit (Super Admin only)

**Success Response (200):**

{  
 "message": "Reward unit deactivated successfully."  
}

---

### **5.5 PATCH /reward-units/:id/reactivate**

**Description:** Reactivate a reward unit (Super Admin only)

**Success Response (200):**

{  
 "message": "Reward unit reactivated successfully."  
}

---

## **6\. Survey APIs**

---

### **6.1 POST /surveys**

**Description:** Create a new survey (Admin or Super Admin)

**Auth:** role \= `super_admin` or `admin`

**Request Body:**

| Field             | Type     | Required | Validation                         |
| ----------------- | -------- | -------- | ---------------------------------- |
| `title`           | string   | Yes      | Max 255 chars                      |
| `description`     | string   | Yes      |                                    |
| `external_link`   | string   | Yes      | Valid URL                          |
| `department_id`   | uuid     | Yes      | Must be active department          |
| `expiry_date`     | datetime | Yes      | Must be in the future              |
| `quota`           | integer  | Yes      | \>= 1                              |
| `reward_unit_id`  | uuid     | Yes      | Must be active reward unit         |
| `reward_quantity` | integer  | Yes      | \>= 1                              |
| `status`          | string   | No       | Default: "draft". Options: "draft" |

**Success Response (201):**

{  
 "message": "Survey created successfully.",  
 "survey": {  
 "id": "uuid",  
 "title": "Customer Feedback Survey",  
 "status": "draft",  
 "total_reward_value": 20.00,  
 "created_at": "2026-05-01T10:00:00Z"  
 }  
}

**Error Responses:**

| Status | Condition            | Message                                          |
| ------ | -------------------- | ------------------------------------------------ |
| 400    | Department inactive  | "The selected department has been deactivated."  |
| 400    | Reward unit inactive | "The selected reward unit has been deactivated." |
| 400    | Expiry in past       | "Expiry date must be in the future."             |
| 400    | Quota \< 1           | "Quota must be at least 1."                      |
| 400    | Invalid URL          | "Please enter a valid URL."                      |

---

### **6.2 GET /surveys**

**Description:** List surveys. Admin sees own only. SA sees all.

**Auth:** role \= `super_admin` or `admin`

**Query Params:**

| Param           | Type   | Default | Description                           |
| --------------- | ------ | ------- | ------------------------------------- |
| `page`          | number | 1       |                                       |
| `limit`         | number | 20      |                                       |
| `status`        | string | all     | Filter: all / draft / active / closed |
| `department_id` | uuid   |         | Filter by department                  |
| `search`        | string |         | Search by title                       |

**Success Response (200):**

{  
 "data": \[  
 {  
 "id": "uuid",  
 "title": "Customer Feedback Survey",  
 "description": "...",  
 "department": {  
 "id": "uuid",  
 "name": "IT Industry"  
 },  
 "expiry_date": "2026-06-01T00:00:00Z",  
 "quota": 100,  
 "current_responses": 45,  
 "reward_unit": {  
 "id": "uuid",  
 "name": "Silver Coin",  
 "value_in_rupees": 2.00  
 },  
 "reward_quantity": 10,  
 "total_reward_value": 20.00,  
 "status": "active",  
 "created_at": "2026-05-01T10:00:00Z"  
 }  
 \],  
 "total": 15,  
 "page": 1,  
 "limit": 20  
}

---

### **6.3 GET /surveys/:id**

**Description:** Get single survey details

**Auth:** role \= `super_admin` or `admin`

**Success Response (200):**

{  
 "id": "uuid",  
 "title": "Customer Feedback Survey",  
 "description": "Full description...",  
 "external_link": "https://external-platform.com/survey/123",  
 "department": {  
 "id": "uuid",  
 "name": "IT Industry"  
 },  
 "expiry_date": "2026-06-01T00:00:00Z",  
 "quota": 100,  
 "current_responses": 45,  
 "reward_unit": {  
 "id": "uuid",  
 "name": "Silver Coin",  
 "value_in_rupees": 2.00  
 },  
 "reward_quantity": 10,  
 "total_reward_value": 20.00,  
 "status": "active",  
 "created_by": {  
 "id": "uuid",  
 "name": "Admin Name",  
 "org_name": "Org Ltd"  
 },  
 "created_at": "2026-05-01T10:00:00Z"  
}

---

### **6.4 PATCH /surveys/:id**

**Description:** Update a survey. Draft \= all fields. Published \= title, description only.

**Auth:** role \= `super_admin` or `admin` (owner or SA)

**Request Body (Draft):**

| Field             | Type     | Required |
| ----------------- | -------- | -------- |
| `title`           | string   | No       |
| `description`     | string   | No       |
| `external_link`   | string   | No       |
| `department_id`   | uuid     | No       |
| `expiry_date`     | datetime | No       |
| `quota`           | integer  | No       |
| `reward_unit_id`  | uuid     | No       |
| `reward_quantity` | integer  | No       |

**Request Body (Active/Published):**

| Field         | Type   | Required |
| ------------- | ------ | -------- |
| `title`       | string | No       |
| `description` | string | No       |

**Error Responses:**

| Status | Condition                                | Message                                           |
| ------ | ---------------------------------------- | ------------------------------------------------- |
| 403    | Admin editing another Admin's survey     | "You do not have permission to edit this survey." |
| 400    | Editing locked field on published survey | "This field cannot be edited after publishing."   |

---

### **6.5 PATCH /surveys/:id/publish**

**Description:** Publish a draft survey — makes it active and visible to users

**Auth:** role \= `super_admin` or `admin` (owner or SA)

**Validation before publish:**

- Department must be active
- Reward unit must be active
- Expiry date must be in the future
- All required fields filled

**Success Response (200):**

{  
 "message": "Survey published successfully.",  
 "status": "active"  
}

**Error Responses:**

| Status | Condition            | Message                                                                               |
| ------ | -------------------- | ------------------------------------------------------------------------------------- |
| 400    | Department inactive  | "The selected department has been deactivated. Please select an active department."   |
| 400    | Reward unit inactive | "The selected reward unit has been deactivated. Please select an active reward unit." |
| 400    | Expiry in past       | "Expiry date must be in the future."                                                  |

---

### **6.6 PATCH /surveys/:id/close**

**Description:** Manually close an active survey

**Auth:** role \= `super_admin` or `admin` (owner or SA)

**Success Response (200):**

{  
 "message": "Survey closed successfully.",  
 "status": "closed"  
}

---

### **6.7 GET /surveys/:id/responses**

**Description:** Get all responses for a survey

**Auth:** role \= `super_admin` or `admin` (owner or SA)

**Query Params:**

| Param    | Type   | Default | Description                                           |
| -------- | ------ | ------- | ----------------------------------------------------- |
| `page`   | number | 1       |                                                       |
| `limit`  | number | 50      |                                                       |
| `status` | string | all     | Filter: all / completed / disqualified / leaved / wip |

**Success Response (200):**

{  
 "data": \[  
 {  
 "id": "uuid",  
 "user": {  
 "id": "uuid",  
 "name": "User Name",  
 "email": "user@email.com"  
 },  
 "status": "completed",  
 "created_at": "2026-05-01T10:00:00Z",  
 "updated_at": "2026-05-01T10:15:00Z"  
 }  
 \],  
 "total": 45,  
 "page": 1,  
 "limit": 50  
}

---

### **6.8 GET /surveys/:id/export**

**Description:** Export survey responses as CSV

**Auth:** role \= `super_admin` or `admin` (owner or SA)

**Success Response (200):**

Content-Type: `text/csv` Content-Disposition: `attachment; filename="survey_responses_<survey_id>.csv"`

---

## **7\. User Management APIs (Super Admin)**

All endpoints require role \= `super_admin`.

---

### **7.1 GET /users**

**Description:** List all users on the platform

**Query Params:**

| Param           | Type   | Default | Description                        |
| --------------- | ------ | ------- | ---------------------------------- |
| `page`          | number | 1       |                                    |
| `limit`         | number | 20      |                                    |
| `status`        | string | all     | Filter: all / active / deactivated |
| `department_id` | uuid   |         | Filter by department               |
| `search`        | string |         | Search by name or email            |

**Success Response (200):**

{  
 "data": \[  
 {  
 "id": "uuid",  
 "name": "User Name",  
 "email": "user@email.com",  
 "phone": "+91...",  
 "status": "active",  
 "onboarding_complete": true,  
 "departments": \["IT Industry", "Manufacturing"\],  
 "created_at": "2026-05-01T10:00:00Z"  
 }  
 \],  
 "total": 150,  
 "page": 1,  
 "limit": 20  
}

---

### **7.2 GET /users/:id**

**Description:** Get single user full details including profile, company, bank, departments

**Success Response (200):**

{  
 "id": "uuid",  
 "name": "User Name",  
 "email": "user@email.com",  
 "phone": "+91...",  
 "status": "active",  
 "profile": {  
 "dob": "1995-06-15",  
 "gender": "Male",  
 "city": "Pune",  
 "country": "India",  
 "linkedin_url": "https://linkedin.com/...",  
 "ip_address": "103.x.x.x"  
 },  
 "company": {  
 "company_name": "Tech Corp",  
 "designation": "Engineer",  
 "org_email": "user@techcorp.com",  
 "org_email_verified": true  
 },  
 "bank_details": {  
 "account_number": "\*\*\*\*5678",  
 "ifsc_code": "KKBK0001782",  
 "bank_name": "Kotak Bank",  
 "pan": "\*\*\*\*1234F"  
 },  
 "departments": \["IT Industry", "Manufacturing"\],  
 "wallet_balance": 250.00,  
 "created_at": "2026-05-01T10:00:00Z"  
}

**Note:** Bank account number and PAN are partially masked for security.

---

### **7.3 GET /users/:id/survey-history**

**Description:** Get all surveys attempted by a user

**Query Params:**

| Param    | Type   | Default | Description            |
| -------- | ------ | ------- | ---------------------- |
| `page`   | number | 1       |                        |
| `limit`  | number | 20      |                        |
| `status` | string | all     | Filter by audit status |

**Success Response (200):**

{  
 "data": \[  
 {  
 "survey": {  
 "id": "uuid",  
 "title": "Customer Feedback Survey"  
 },  
 "status": "completed",  
 "reward_earned": 20.00,  
 "created_at": "2026-05-01T10:00:00Z"  
 }  
 \],  
 "total": 30,  
 "page": 1,  
 "limit": 20  
}

---

### **7.4 GET /users/:id/transactions**

**Description:** Get all payout transactions for a user

**Query Params:**

| Param    | Type   | Default |
| -------- | ------ | ------- |
| `page`   | number | 1       |
| `limit`  | number | 20      |
| `status` | string | all     |

**Success Response (200):**

{  
 "data": \[  
 {  
 "id": "uuid",  
 "survey_name": "Customer Feedback Survey",  
 "amount": 20.00,  
 "status": "success",  
 "failure_comment": null,  
 "razorpay_reference_id": "pay_xyz123",  
 "created_at": "2026-05-01T00:00:00Z"  
 }  
 \],  
 "total": 10,  
 "page": 1,  
 "limit": 20  
}

---

### **7.5 PATCH /users/:id/deactivate**

**Description:** Deactivate a user

**Success Response (200):**

{  
 "message": "User deactivated successfully."  
}

---

### **7.6 PATCH /users/:id/reactivate**

**Description:** Reactivate a deactivated user

**Success Response (200):**

{  
 "message": "User reactivated successfully."  
}

---

## **8\. User Onboarding APIs**

All endpoints require role \= `user` and `onboarding_complete = false`.

---

### **8.1 GET /onboarding/status**

**Description:** Get current onboarding progress for logged-in user

**Success Response (200):**

{  
 "onboarding_step": 3,  
 "onboarding_complete": false,  
 "steps": {  
 "1_user_details": "completed",  
 "2_departments": "completed",  
 "3_location": "pending",  
 "4_company": "pending",  
 "5_bank": "pending"  
 }  
}

---

### **8.2 POST /onboarding/user-details**

**Description:** Step 1 — Save user details

**Request Body:**

| Field          | Type   | Required | Validation                                     |
| -------------- | ------ | -------- | ---------------------------------------------- |
| `name`         | string | Yes      | Max 150 chars                                  |
| `dob`          | date   | Yes      | Must be 18+ years old                          |
| `gender`       | string | Yes      | Male / Female / Non-binary / Prefer not to say |
| `city`         | string | Yes      | Max 100 chars                                  |
| `linkedin_url` | string | No       | Valid LinkedIn URL format                      |

**Success Response (200):**

{  
 "message": "User details saved.",  
 "onboarding_step": 2  
}

**Error Responses:**

| Status | Condition            | Message                                                   |
| ------ | -------------------- | --------------------------------------------------------- |
| 400    | Under 18             | "You must be at least 18 years old to use this platform." |
| 400    | Invalid LinkedIn URL | "Please enter a valid LinkedIn URL."                      |

---

### **8.3 POST /onboarding/departments**

**Description:** Step 2 — Save department selections

**Request Body:**

| Field            | Type     | Required | Validation                     |
| ---------------- | -------- | -------- | ------------------------------ |
| `department_ids` | uuid\[\] | Yes      | At least 1, all must be active |

**Success Response (200):**

{  
 "message": "Departments saved.",  
 "onboarding_step": 3  
}

**Error Responses:**

| Status | Condition                    | Message                                                  |
| ------ | ---------------------------- | -------------------------------------------------------- |
| 400    | Empty array                  | "Please select at least one department."                 |
| 400    | Inactive department selected | "One or more selected departments are no longer active." |

---

### **8.4 POST /onboarding/location**

**Description:** Step 3 — Save location. IP address captured server-side.

**Request Body:**

| Field     | Type   | Required |
| --------- | ------ | -------- |
| `country` | string | Yes      |
| `city`    | string | Yes      |

**Flow:** Server extracts IP address from request headers and stores it.

**Success Response (200):**

{  
 "message": "Location saved.",  
 "onboarding_step": 4  
}

---

### **8.5 POST /onboarding/company-details**

**Description:** Step 4 — Save company details

**Request Body:**

| Field                | Type    | Required    | Validation                            |
| -------------------- | ------- | ----------- | ------------------------------------- |
| `company_name`       | string  | Yes         | Max 255 chars                         |
| `designation`        | string  | Yes         | Max 150 chars                         |
| `org_email`          | string  | No          | Valid email format if provided        |
| `org_email_verified` | boolean | Conditional | Must be true if org_email is provided |

**Success Response (200):**

{  
 "message": "Company details saved.",  
 "onboarding_step": 5  
}

**Error Responses:**

| Status | Condition                           | Message                                                    |
| ------ | ----------------------------------- | ---------------------------------------------------------- |
| 400    | org_email provided but not verified | "Please verify your organisation email before continuing." |

---

### **8.6 POST /onboarding/company-details/send-otp**

**Description:** Send OTP to organisation email for verification

**Request Body:**

| Field       | Type   | Required |
| ----------- | ------ | -------- |
| `org_email` | string | Yes      |

**Success Response (200):**

{  
 "message": "OTP sent to your organisation email."  
}

**Error Responses:**

| Status | Condition               | Message                                    |
| ------ | ----------------------- | ------------------------------------------ |
| 429    | Resent within 2 minutes | "Please wait before requesting a new OTP." |
| 400    | Invalid email format    | "Please enter a valid email address."      |

---

### **8.7 POST /onboarding/company-details/verify-otp**

**Description:** Verify OTP for organisation email

**Request Body:**

| Field       | Type   | Required |
| ----------- | ------ | -------- |
| `org_email` | string | Yes      |
| `otp`       | string | Yes      |

**Success Response (200):**

{  
 "message": "Organisation email verified.",  
 "org_email_verified": true  
}

**Error Responses:**

| Status | Condition   | Message                                      |
| ------ | ----------- | -------------------------------------------- |
| 400    | Wrong OTP   | "Incorrect OTP. Please try again."           |
| 400    | OTP expired | "OTP has expired. Please request a new one." |

---

### **8.8 POST /onboarding/bank-details**

**Description:** Step 5 — Save bank details. Marks onboarding as complete.

**Request Body:**

| Field            | Type   | Required | Validation                    |
| ---------------- | ------ | -------- | ----------------------------- |
| `account_number` | string | Yes      | Numeric only, 9–18 digits     |
| `ifsc_code`      | string | Yes      | 11 chars, format: AAAA0XXXXXX |
| `bank_name`      | string | Yes      | Max 150 chars                 |
| `pan`            | string | Yes      | 10 chars, format: ABCDE1234F  |

**Flow:** Save bank details → set onboarding_complete \= true in user_profiles

**Success Response (200):**

{  
 "message": "Bank details saved. Onboarding complete\!",  
 "onboarding_complete": true  
}

**Error Responses:**

| Status | Condition                  | Message                                       |
| ------ | -------------------------- | --------------------------------------------- |
| 400    | Invalid PAN format         | "Please enter a valid PAN (e.g. ABCDE1234F)." |
| 400    | Invalid IFSC format        | "Please enter a valid IFSC code."             |
| 400    | Non-numeric account number | "Account number must contain digits only."    |

---

## **9\. Survey Feed & Flow APIs (User App)**

All endpoints require role \= `user` and `onboarding_complete = true`.

---

### **9.1 GET /feed/surveys**

**Description:** Get survey feed for logged-in user based on their departments

**Query Params:**

| Param           | Type   | Default     | Description                         |
| --------------- | ------ | ----------- | ----------------------------------- |
| `page`          | number | 1           |                                     |
| `limit`         | number | 20          |                                     |
| `department_id` | uuid   |             | Filter by specific department       |
| `admin_org`     | string |             | Filter by Admin's org name          |
| `sort_by`       | string | expiry_date | Options: expiry_date / reward_value |
| `sort_order`    | string | asc         | Options: asc / desc                 |

**Flow:**

- Fetch active surveys where department_id IN user's departments
- Exclude expired surveys (expiry_date \< now)
- LEFT JOIN survey_audits for current user to get status per survey
- Include Full badge surveys (current_responses \>= quota)

**Success Response (200):**

{  
 "data": \[  
 {  
 "id": "uuid",  
 "title": "Customer Feedback Survey",  
 "description": "Truncated desc...",  
 "department": {  
 "id": "uuid",  
 "name": "IT Industry"  
 },  
 "admin_org": "Org Ltd",  
 "expiry_date": "2026-06-01T00:00:00Z",  
 "reward_unit": {  
 "name": "Silver Coin",  
 "value_in_rupees": 2.00  
 },  
 "reward_quantity": 10,  
 "total_reward_value": 20.00,  
 "quota": 100,  
 "current_responses": 45,  
 "is_full": false,  
 "user_status": null  
 },  
 {  
 "id": "uuid2",  
 "title": "Product Review",  
 "description": "Truncated...",  
 "department": {  
 "id": "uuid",  
 "name": "IT Industry"  
 },  
 "admin_org": "Another Org",  
 "expiry_date": "2026-05-20T00:00:00Z",  
 "reward_unit": {  
 "name": "Gold Coin",  
 "value_in_rupees": 10.00  
 },  
 "reward_quantity": 5,  
 "total_reward_value": 50.00,  
 "quota": 50,  
 "current_responses": 50,  
 "is_full": true,  
 "user_status": null  
 },  
 {  
 "id": "uuid3",  
 "title": "Market Research",  
 "description": "Truncated...",  
 "department": {  
 "id": "uuid",  
 "name": "Manufacturing"  
 },  
 "admin_org": "Org Ltd",  
 "expiry_date": "2026-05-25T00:00:00Z",  
 "reward_unit": {  
 "name": "Silver Coin",  
 "value_in_rupees": 2.00  
 },  
 "reward_quantity": 15,  
 "total_reward_value": 30.00,  
 "quota": 200,  
 "current_responses": 100,  
 "is_full": false,  
 "user_status": "completed"  
 }  
 \],  
 "total": 45,  
 "page": 1,  
 "limit": 20  
}

**Notes:**

- `user_status` \= null means Available (no record in survey_audits)
- `user_status` \= wip / completed / disqualified / leaved → card disabled
- `is_full` \= true → card disabled with Full badge

---

### **9.2 GET /feed/surveys/:id/check-availability**

**Description:** Real-time check before starting a survey

**Auth:** role \= `user`

**Success Response (200):**

{  
 "available": true  
}

**Unavailable Response (200):**

{  
 "available": false,  
 "reason": "quota_full"  
}

Possible reasons: `quota_full`, `expired`, `already_attempted`, `survey_closed`

---

### **9.3 POST /feed/surveys/:id/start**

**Description:** Start a survey — creates WIP record and returns redirect URL with token

**Auth:** role \= `user`

**Flow:**

1. Verify survey is available (not full, not expired, not already attempted)
2. Generate signed JWT token (user_id \+ survey_id, single-use, 2hr expiry)
3. Create survey_audits record: status \= wip, token stored
4. Return redirect URL

**Success Response (200):**

{  
 "redirect_url": "https://external-platform.com/survey/123?token=eyJhbGci...",  
 "survey_audit_id": "uuid"  
}

**Error Responses:**

| Status | Condition         | Message                                   |
| ------ | ----------------- | ----------------------------------------- |
| 409    | Already attempted | "You have already attempted this survey." |
| 400    | Survey full       | "This survey is no longer available."     |
| 400    | Survey expired    | "This survey has expired."                |
| 400    | Survey closed     | "This survey has been closed."            |

---

### **9.4 GET /feed/survey-history**

**Description:** Get all surveys the logged-in user has attempted

**Auth:** role \= `user`

**Query Params:**

| Param    | Type   | Default |
| -------- | ------ | ------- |
| `page`   | number | 1       |
| `limit`  | number | 20      |
| `status` | string | all     |

**Success Response (200):**

{  
 "data": \[  
 {  
 "survey": {  
 "id": "uuid",  
 "title": "Customer Feedback Survey"  
 },  
 "status": "completed",  
 "reward_earned": 20.00,  
 "attempted_at": "2026-05-01T10:00:00Z"  
 }  
 \],  
 "total": 15,  
 "page": 1,  
 "limit": 20  
}

---

## **10\. External Survey Callback APIs**

These endpoints are called by the external survey platform. They do NOT require user JWT — they require the survey-specific signed token.

---

### **10.1 POST /external/survey/completed**

**Description:** External platform reports survey completion

**Auth:** Survey JWT token (not user JWT)

**Request Body:**

| Field   | Type   | Required |
| ------- | ------ | -------- |
| `token` | string | Yes      |

**Flow:**

1. Validate token signature
2. Check token not expired
3. Check token_used \= false
4. Extract user_id, survey_id
5. Mark token_used \= true
6. Update survey_audits: status \= completed
7. Increment surveys.current_responses
8. If current_responses \>= quota → close survey
9. Credit reward to user_wallet

**Success Response (200):**

{  
 "status": "completed",  
 "reward_credited": 20.00  
}

**Error Responses:**

| Status | Condition          | Message                        |
| ------ | ------------------ | ------------------------------ |
| 400    | Missing token      | "Token is required."           |
| 401    | Invalid token      | "Invalid token."               |
| 401    | Token expired      | "Token has expired."           |
| 401    | Token already used | "Token has already been used." |

---

### **10.2 POST /external/survey/disqualified**

**Description:** External platform reports user disqualification

**Auth:** Survey JWT token

**Request Body:**

| Field   | Type   | Required |
| ------- | ------ | -------- |
| `token` | string | Yes      |

**Flow:** Same token validation → update survey_audits: status \= disqualified. No reward.

**Success Response (200):**

{  
 "status": "disqualified"  
}

---

### **10.3 POST /external/survey/leaved**

**Description:** External platform reports user left the survey

**Auth:** Survey JWT token

**Request Body:**

| Field   | Type   | Required |
| ------- | ------ | -------- |
| `token` | string | Yes      |

**Flow:** Same token validation → update survey_audits: status \= leaved. No reward.

**Success Response (200):**

{  
 "status": "leaved"  
}

---

## **11\. Wallet APIs**

---

### **11.1 GET /wallet**

**Description:** Get logged-in user's wallet summary

**Auth:** role \= `user`

**Success Response (200):**

{  
 "balance": 250.00,  
 "pending_today": 40.00,  
 "total_earned": 1250.00  
}

**Notes:**

- `balance` \= current wallet balance
- `pending_today` \= sum of today's completed survey rewards not yet paid out
- `total_earned` \= all-time total rewards credited

---

### **11.2 GET /wallet/transactions**

**Description:** Get logged-in user's payout transaction history

**Auth:** role \= `user`

**Query Params:**

| Param    | Type   | Default |
| -------- | ------ | ------- |
| `page`   | number | 1       |
| `limit`  | number | 20      |
| `status` | string | all     |

**Success Response (200):**

{  
 "data": \[  
 {  
 "id": "uuid",  
 "survey_name": "Customer Feedback Survey",  
 "admin_org": "Org Ltd",  
 "amount": 20.00,  
 "status": "success",  
 "failure_comment": null,  
 "created_at": "2026-05-01T00:00:00Z"  
 },  
 {  
 "id": "uuid2",  
 "survey_name": "Product Review",  
 "admin_org": "Another Org",  
 "amount": 50.00,  
 "status": "failed",  
 "failure_comment": "Invalid bank account details.",  
 "created_at": "2026-04-30T00:00:00Z"  
 }  
 \],  
 "total": 30,  
 "page": 1,  
 "limit": 20  
}

---

## **12\. Payout & Payment APIs**

---

### **12.1 GET /payment-gateway**

**Description:** Get current Razorpay configuration for logged-in Admin/SA

**Auth:** role \= `super_admin` or `admin`

**Success Response (200):**

{  
 "configured": true,  
 "razorpay_key_id": "rzp_live_abc\*\*\*",  
 "updated_at": "2026-05-01T10:00:00Z"  
}

**Notes:** Key Secret is never returned — only masked Key ID.

---

### **12.2 POST /payment-gateway**

**Description:** Save or update Razorpay credentials

**Auth:** role \= `super_admin` or `admin`

**Request Body:**

| Field                 | Type   | Required |
| --------------------- | ------ | -------- |
| `razorpay_key_id`     | string | Yes      |
| `razorpay_key_secret` | string | Yes      |

**Flow:**

1. Validate credentials against Razorpay API
2. If invalid → return error
3. If valid → encrypt and store

**Success Response (200):**

{  
 "message": "Razorpay credentials saved successfully."  
}

**Error Responses:**

| Status | Condition           | Message                                                     |
| ------ | ------------------- | ----------------------------------------------------------- |
| 400    | Invalid credentials | "Invalid Razorpay credentials. Please check and try again." |

---

### **12.3 GET /payout-settings**

**Description:** Get current payout threshold for logged-in Admin/SA

**Auth:** role \= `super_admin` or `admin`

**Success Response (200):**

{  
 "min_payout_amount": 100.00  
}

---

### **12.4 PATCH /payout-settings**

**Description:** Update minimum payout threshold

**Auth:** role \= `super_admin` or `admin`

**Request Body:**

| Field               | Type   | Required | Validation |
| ------------------- | ------ | -------- | ---------- |
| `min_payout_amount` | number | Yes      | \>= 1      |

**Success Response (200):**

{  
 "message": "Payout settings updated.",  
 "min_payout_amount": 150.00  
}

**Error Responses:**

| Status | Condition   | Message                                      |
| ------ | ----------- | -------------------------------------------- |
| 400    | Amount \< 1 | "Minimum payout amount must be at least ₹1." |

---

### **12.5 GET /payment-logs**

**Description:** Get all payout transaction logs for Admin/SA

**Auth:** role \= `super_admin` or `admin`

**Query Params:**

| Param       | Type   | Default | Description                              |
| ----------- | ------ | ------- | ---------------------------------------- |
| `page`      | number | 1       |                                          |
| `limit`     | number | 50      |                                          |
| `status`    | string | all     | Filter: all / success / failed / pending |
| `date_from` | date   |         | Start date filter                        |
| `date_to`   | date   |         | End date filter                          |
| `search`    | string |         | Search by user name                      |

**Flow:**

- Admin sees only their own transactions
- SA sees all transactions platform-wide

**Success Response (200):**

{  
 "data": \[  
 {  
 "id": "uuid",  
 "user": {  
 "id": "uuid",  
 "name": "User Name"  
 },  
 "survey": {  
 "id": "uuid",  
 "title": "Survey Title"  
 },  
 "amount": 20.00,  
 "status": "success",  
 "failure_comment": null,  
 "retry_count": 0,  
 "razorpay_reference_id": "pay_xyz123",  
 "created_at": "2026-05-01T00:00:00Z"  
 }  
 \],  
 "total": 100,  
 "page": 1,  
 "limit": 50  
}

---

## **13\. Analytics APIs**

---

### **13.1 GET /analytics/kpi**

**Description:** Get KPI summary cards

**Auth:** role \= `super_admin` or `admin`

**Query Params:**

| Param       | Type | Description    |
| ----------- | ---- | -------------- |
| `date_from` | date | Start of range |
| `date_to`   | date | End of range   |

**Success Response — Super Admin (200):**

{  
 "total_users": 1500,  
 "total_admins": 12,  
 "total_surveys": 85,  
 "total_rewards_distributed": 125000.00  
}

**Success Response — Admin (200):**

{  
 "total_surveys": 15,  
 "total_responses": 430,  
 "active_surveys": 8,  
 "total_rewards_paid": 28500.00  
}

---

### **13.2 GET /analytics/users-by-region**

**Description:** Get user distribution by country for GeoChart

**Auth:** role \= `super_admin` or `admin`

**Query Params:** `date_from`, `date_to`

**Flow:**

- SA: all users grouped by country
- Admin: users who responded to their surveys, grouped by country

**Success Response (200):**

{  
 "data": \[  
 { "country": "India", "count": 850 },  
 { "country": "United States", "count": 200 },  
 { "country": "United Kingdom", "count": 95 }  
 \]  
}

---

### **13.3 GET /analytics/users-over-time**

**Description:** User registration trend (Super Admin only)

**Auth:** role \= `super_admin`

**Query Params:** `date_from`, `date_to`, `interval` (daily / weekly)

**Success Response (200):**

{  
 "data": \[  
 { "date": "2026-05-01", "count": 15 },  
 { "date": "2026-05-02", "count": 22 },  
 { "date": "2026-05-03", "count": 18 }  
 \]  
}

---

### **13.4 GET /analytics/surveys-over-time**

**Description:** Survey creation trend

**Auth:** role \= `super_admin` or `admin`

**Query Params:** `date_from`, `date_to`, `interval` (daily / weekly)

**Success Response (200):**

{  
 "data": \[  
 { "date": "2026-05-01", "count": 3 },  
 { "date": "2026-05-02", "count": 5 }  
 \]  
}

---

### **13.5 GET /analytics/users-per-admin**

**Description:** Number of respondents per Admin (Super Admin only)

**Auth:** role \= `super_admin`

**Query Params:** `date_from`, `date_to`

**Success Response (200):**

{  
 "data": \[  
 { "admin_id": "uuid", "admin_name": "Admin A", "org_name": "Org A", "user_count": 250 },  
 { "admin_id": "uuid2", "admin_name": "Admin B", "org_name": "Org B", "user_count": 180 }  
 \]  
}

---

### **13.6 GET /analytics/surveys-per-admin**

**Description:** Number of surveys per Admin (Super Admin only)

**Auth:** role \= `super_admin`

**Query Params:** `date_from`, `date_to`

**Success Response (200):**

{  
 "data": \[  
 { "admin_id": "uuid", "admin_name": "Admin A", "org_name": "Org A", "survey_count": 15 },  
 { "admin_id": "uuid2", "admin_name": "Admin B", "org_name": "Org B", "survey_count": 10 }  
 \]  
}

---

### **13.7 GET /analytics/users-by-department**

**Description:** User breakdown by department

**Auth:** role \= `super_admin` or `admin`

**Query Params:** `date_from`, `date_to`

**Success Response (200):**

{  
 "data": \[  
 { "department_id": "uuid", "department_name": "IT Industry", "count": 420 },  
 { "department_id": "uuid2", "department_name": "Manufacturing", "count": 310 }  
 \]  
}

---

### **13.8 GET /analytics/surveys-by-department**

**Description:** Survey breakdown by department

**Auth:** role \= `super_admin` or `admin`

**Query Params:** `date_from`, `date_to`

**Success Response (200):**

{  
 "data": \[  
 { "department_id": "uuid", "department_name": "IT Industry", "count": 25 },  
 { "department_id": "uuid2", "department_name": "Manufacturing", "count": 18 }  
 \]  
}

---

### **13.9 GET /analytics/survey-completion-breakdown**

**Description:** Per survey: completed vs disqualified vs abandoned

**Auth:** role \= `super_admin` or `admin`

**Query Params:** `date_from`, `date_to`

**Success Response (200):**

{  
 "data": \[  
 {  
 "survey_id": "uuid",  
 "survey_title": "Customer Feedback",  
 "completed": 45,  
 "disqualified": 12,  
 "leaved": 8  
 }  
 \]  
}

---

### **13.10 GET /analytics/top-surveys**

**Description:** Top 5 most completed surveys

**Auth:** role \= `super_admin` or `admin`

**Query Params:** `date_from`, `date_to`

**Success Response (200):**

{  
 "data": \[  
 { "survey_id": "uuid", "survey_title": "Customer Feedback", "completions": 145 },  
 { "survey_id": "uuid2", "survey_title": "Product Review", "completions": 120 }  
 \]  
}

---

### **13.11 GET /analytics/rewards-over-time**

**Description:** Rewards distributed over time (wallet burn rate)

**Auth:** role \= `super_admin` or `admin`

**Query Params:** `date_from`, `date_to`, `interval` (daily / weekly)

**Success Response (200):**

{  
 "data": \[  
 { "date": "2026-05-01", "amount": 5000.00 },  
 { "date": "2026-05-02", "amount": 7500.00 }  
 \]  
}

---

### **13.12 GET /analytics/admin-financial-overview**

**Description:** Per-Admin wallet activity overview (Super Admin only)

**Auth:** role \= `super_admin`

**Query Params:** `date_from`, `date_to`

**Success Response (200):**

{  
 "data": \[  
 {  
 "admin_id": "uuid",  
 "admin_name": "Admin A",  
 "org_name": "Org A",  
 "total_paid_out": 45000.00  
 }  
 \]  
}

---

### **13.13 GET /analytics/leaderboard**

**Description:** Top users by completions on Admin's surveys (Admin only)

**Auth:** role \= `admin`

**Query Params:** `date_from`, `date_to`, `limit` (default 10\)

**Success Response (200):**

{  
 "data": \[  
 {  
 "user_id": "uuid",  
 "user_name": "User A",  
 "department": "IT Industry",  
 "surveys_completed": 28,  
 "total_rewards_earned": 560.00  
 }  
 \]  
}

---

### **13.14 GET /analytics/user-stats**

**Description:** Logged-in user's own analytics (User App)

**Auth:** role \= `user`

**Success Response (200):**

{  
 "total_completed": 28,  
 "total_earned": 1250.00,  
 "total_disqualified": 5,  
 "total_leaved": 3,  
 "completion_rate": 77.78  
}

---

### **13.15 GET /analytics/user-earnings-over-time**

**Description:** Logged-in user's earnings chart (User App)

**Auth:** role \= `user`

**Query Params:** `interval` (weekly / monthly)

**Success Response (200):**

{  
 "data": \[  
 { "period": "2026-W18", "amount": 250.00 },  
 { "period": "2026-W19", "amount": 380.00 }  
 \]  
}

---

## **14\. Support Ticket APIs**

---

### **14.1 POST /tickets**

**Description:** Create a new support ticket

**Auth:** Required (any role — user or admin)

**Request Body:**

| Field      | Type   | Required | Validation                                     |
| ---------- | ------ | -------- | ---------------------------------------------- |
| `category` | string | Yes      | payment / survey / account / technical / other |
| `message`  | string | Yes      | Max 2000 chars, not empty                      |

**Flow:**

- assigned_to \= Super Admin user_id (auto-assigned)

**Success Response (201):**

{  
 "message": "Ticket created successfully.",  
 "ticket": {  
 "id": "uuid",  
 "category": "payment",  
 "status": "open",  
 "created_at": "2026-05-01T10:00:00Z"  
 }  
}

**Error Responses:**

| Status | Condition        | Message                                  |
| ------ | ---------------- | ---------------------------------------- |
| 400    | Empty message    | "Message cannot be empty."               |
| 400    | Message too long | "Message must be under 2000 characters." |

---

### **14.2 GET /tickets**

**Description:** Get all tickets

**Auth:** Required (any role)

**Query Params:**

| Param      | Type   | Default | Description                                          |
| ---------- | ------ | ------- | ---------------------------------------------------- |
| `page`     | number | 1       |                                                      |
| `limit`    | number | 20      |                                                      |
| `status`   | string | all     | Filter: all / open / in_progress / resolved / closed |
| `category` | string | all     | Filter by category                                   |
| `filter`   | string | all     | SA only: all / from_admins / from_users / mine       |

**Flow:**

- User: sees only their own tickets
- Admin: sees their own tickets \+ tickets from their survey respondents
- SA: sees all tickets, can filter by source

**Success Response (200):**

{  
 "data": \[  
 {  
 "id": "uuid",  
 "raised_by": {  
 "id": "uuid",  
 "name": "User Name",  
 "role": "user"  
 },  
 "category": "payment",  
 "status": "open",  
 "last_message_preview": "I haven't received my payout...",  
 "created_at": "2026-05-01T10:00:00Z",  
 "updated_at": "2026-05-01T10:00:00Z"  
 }  
 \],  
 "total": 15,  
 "page": 1,  
 "limit": 20  
}

---

### **14.3 GET /tickets/:id**

**Description:** Get single ticket with full conversation thread

**Auth:** Required (must be ticket raiser or assigned_to)

**Success Response (200):**

{  
 "id": "uuid",  
 "raised_by": {  
 "id": "uuid",  
 "name": "User Name",  
 "role": "user"  
 },  
 "assigned_to": {  
 "id": "uuid",  
 "name": "Super Admin",  
 "role": "super_admin"  
 },  
 "category": "payment",  
 "status": "in_progress",  
 "created_at": "2026-05-01T10:00:00Z",  
 "replies": \[  
 {  
 "id": "uuid",  
 "replied_by": {  
 "id": "uuid",  
 "name": "User Name",  
 "role": "user"  
 },  
 "message": "I haven't received my payout for yesterday's surveys.",  
 "created_at": "2026-05-01T10:00:00Z"  
 },  
 {  
 "id": "uuid2",  
 "replied_by": {  
 "id": "uuid",  
 "name": "Super Admin",  
 "role": "super_admin"  
 },  
 "message": "Let me check your transaction logs.",  
 "created_at": "2026-05-01T11:00:00Z"  
 }  
 \]  
}

---

### **14.4 POST /tickets/:id/reply**

**Description:** Reply to a ticket

**Auth:** Required (must be ticket raiser or assigned_to)

**Request Body:**

| Field     | Type   | Required | Validation                |
| --------- | ------ | -------- | ------------------------- |
| `message` | string | Yes      | Max 2000 chars, not empty |

**Flow:**

- If ticket was Closed and user replies → re-open ticket (status \= open)
- Update ticket.updated_at

**Success Response (201):**

{  
 "message": "Reply sent.",  
 "reply": {  
 "id": "uuid",  
 "message": "Let me check your transaction logs.",  
 "created_at": "2026-05-01T11:00:00Z"  
 }  
}

---

### **14.5 PATCH /tickets/:id/status**

**Description:** Change ticket status (Super Admin only)

**Auth:** role \= `super_admin`

**Request Body:**

| Field    | Type   | Required | Validation                             |
| -------- | ------ | -------- | -------------------------------------- |
| `status` | string | Yes      | open / in_progress / resolved / closed |

**Success Response (200):**

{  
 "message": "Ticket status updated.",  
 "status": "resolved"  
}

---

## **15\. Profile APIs**

---

### **15.1 GET /profile**

**Description:** Get logged-in user's full profile

**Auth:** Required (any role)

**Success Response — User (200):**

{  
 "id": "uuid",  
 "name": "User Name",  
 "email": "user@email.com",  
 "phone": "+91...",  
 "role": "user",  
 "profile": {  
 "dob": "1995-06-15",  
 "gender": "Male",  
 "city": "Pune",  
 "country": "India",  
 "linkedin_url": "https://linkedin.com/..."  
 },  
 "company": {  
 "company_name": "Tech Corp",  
 "designation": "Engineer",  
 "org_email": "user@techcorp.com",  
 "org_email_verified": true  
 },  
 "bank_details": {  
 "account_number": "\*\*\*\*5678",  
 "ifsc_code": "KKBK0001782",  
 "bank_name": "Kotak Bank",  
 "pan": "\*\*\*\*1234F"  
 },  
 "departments": \[  
 { "id": "uuid", "name": "IT Industry" },  
 { "id": "uuid", "name": "Manufacturing" }  
 \]  
}

**Success Response — Admin/SA (200):**

{  
 "id": "uuid",  
 "name": "Admin Name",  
 "email": "admin@org.com",  
 "phone": "+91...",  
 "role": "admin",  
 "org_profile": {  
 "org_name": "Org Ltd",  
 "org_address": "Address",  
 "linkedin_url": "https://linkedin.com/..."  
 }  
}

---

### **15.2 PATCH /profile**

**Description:** Update logged-in user's profile details

**Auth:** Required (any role)

**Request Body — User:**

| Field          | Type   | Required | Notes       |
| -------------- | ------ | -------- | ----------- |
| `name`         | string | No       |             |
| `phone`        | string | No       |             |
| `dob`          | date   | No       | Must be 18+ |
| `gender`       | string | No       |             |
| `city`         | string | No       |             |
| `linkedin_url` | string | No       |             |

**Request Body — Admin/SA:**

| Field          | Type   | Required | Notes |
| -------------- | ------ | -------- | ----- |
| `name`         | string | No       |       |
| `phone`        | string | No       |       |
| `org_name`     | string | No       |       |
| `org_address`  | string | No       |       |
| `linkedin_url` | string | No       |       |

**Note:** `email` is never editable.

**Success Response (200):**

{  
 "message": "Profile updated successfully."  
}

---

### **15.3 PATCH /profile/company**

**Description:** Update user's company details

**Auth:** role \= `user`

**Request Body:**

| Field          | Type   | Required |
| -------------- | ------ | -------- |
| `company_name` | string | No       |
| `designation`  | string | No       |
| `org_email`    | string | No       |

**Note:** If org_email changed → org_email_verified reset to false, new OTP required.

**Success Response (200):**

{  
 "message": "Company details updated.",  
 "org_email_changed": true,  
 "org_email_verified": false  
}

---

### **15.4 PATCH /profile/bank-details**

**Description:** Update user's bank details

**Auth:** role \= `user`

**Request Body:**

| Field            | Type   | Required | Validation             |
| ---------------- | ------ | -------- | ---------------------- |
| `account_number` | string | No       | Numeric, 9–18 digits   |
| `ifsc_code`      | string | No       | 11 chars, valid format |
| `bank_name`      | string | No       |                        |
| `pan`            | string | No       | ABCDE1234F format      |

**Flow:** Update bank_details \+ set bank_details_updated_at \= now

**Success Response (200):**

{  
 "message": "Bank details updated. Changes will take effect from tomorrow's payout."  
}

---

### **15.5 PATCH /profile/departments**

**Description:** Update user's department preferences

**Auth:** role \= `user`

**Request Body:**

| Field            | Type     | Required | Validation                     |
| ---------------- | -------- | -------- | ------------------------------ |
| `department_ids` | uuid\[\] | Yes      | At least 1, all must be active |

**Success Response (200):**

{  
 "message": "Department preferences updated."  
}

**Error Responses:**

| Status | Condition   | Message                                           |
| ------ | ----------- | ------------------------------------------------- |
| 400    | Empty array | "You must have at least one department selected." |

---

## **16\. Utility APIs**

---

### **16.1 GET /health**

**Description:** Server health check

**Auth:** None

**Success Response (200):**

{  
 "status": "ok",  
 "timestamp": "2026-05-01T10:00:00Z"  
}

---

### **16.2 GET /vpn-check**

**Description:** Check if the user is on a VPN (User App calls this before every page render)

**Auth:** None

**Flow:** Server checks request IP against VPN detection service

**Success Response (200):**

{  
 "vpn_detected": false  
}

**VPN Detected Response (200):**

{  
 "vpn_detected": true  
}

**Note:** Always returns 200 — the `vpn_detected` flag tells the frontend what to render.

---

## **17\. API Summary Table**

| \#  | Method                 | Endpoint                               | Auth         | Role        |
| --- | ---------------------- | -------------------------------------- | ------------ | ----------- |
|     | **Auth**               |                                        |              |             |
| 1   | POST                   | /auth/register                         | None         | User        |
| 2   | POST                   | /auth/verify-email                     | None         | User        |
| 3   | POST                   | /auth/resend-verification              | None         | User        |
| 4   | POST                   | /auth/login                            | None         | All         |
| 5   | POST                   | /auth/google                           | None         | User        |
| 6   | POST                   | /auth/forgot-password                  | None         | All         |
| 7   | POST                   | /auth/reset-password                   | None         | All         |
| 8   | POST                   | /auth/change-password                  | JWT          | All         |
|     | **Admin Management**   |                                        |              |             |
| 9   | POST                   | /admins                                | JWT          | SA          |
| 10  | GET                    | /admins                                | JWT          | SA          |
| 11  | GET                    | /admins/:id                            | JWT          | SA          |
| 12  | PATCH                  | /admins/:id/suspend                    | JWT          | SA          |
| 13  | PATCH                  | /admins/:id/reactivate                 | JWT          | SA          |
|     | **Departments**        |                                        |              |             |
| 14  | POST                   | /departments                           | JWT          | SA          |
| 15  | GET                    | /departments                           | JWT          | All         |
| 16  | PATCH                  | /departments/:id                       | JWT          | SA          |
| 17  | PATCH                  | /departments/:id/deactivate            | JWT          | SA          |
| 18  | PATCH                  | /departments/:id/reactivate            | JWT          | SA          |
|     | **Reward Units**       |                                        |              |             |
| 19  | POST                   | /reward-units                          | JWT          | SA          |
| 20  | GET                    | /reward-units                          | JWT          | SA, Admin   |
| 21  | PATCH                  | /reward-units/:id                      | JWT          | SA          |
| 22  | PATCH                  | /reward-units/:id/deactivate           | JWT          | SA          |
| 23  | PATCH                  | /reward-units/:id/reactivate           | JWT          | SA          |
|     | **Surveys**            |                                        |              |             |
| 24  | POST                   | /surveys                               | JWT          | SA, Admin   |
| 25  | GET                    | /surveys                               | JWT          | SA, Admin   |
| 26  | GET                    | /surveys/:id                           | JWT          | SA, Admin   |
| 27  | PATCH                  | /surveys/:id                           | JWT          | SA, Admin   |
| 28  | PATCH                  | /surveys/:id/publish                   | JWT          | SA, Admin   |
| 29  | PATCH                  | /surveys/:id/close                     | JWT          | SA, Admin   |
| 30  | GET                    | /surveys/:id/responses                 | JWT          | SA, Admin   |
| 31  | GET                    | /surveys/:id/export                    | JWT          | SA, Admin   |
|     | **User Management**    |                                        |              |             |
| 32  | GET                    | /users                                 | JWT          | SA          |
| 33  | GET                    | /users/:id                             | JWT          | SA          |
| 34  | GET                    | /users/:id/survey-history              | JWT          | SA          |
| 35  | GET                    | /users/:id/transactions                | JWT          | SA          |
| 36  | PATCH                  | /users/:id/deactivate                  | JWT          | SA          |
| 37  | PATCH                  | /users/:id/reactivate                  | JWT          | SA          |
|     | **Onboarding**         |                                        |              |             |
| 38  | GET                    | /onboarding/status                     | JWT          | User        |
| 39  | POST                   | /onboarding/user-details               | JWT          | User        |
| 40  | POST                   | /onboarding/departments                | JWT          | User        |
| 41  | POST                   | /onboarding/location                   | JWT          | User        |
| 42  | POST                   | /onboarding/company-details            | JWT          | User        |
| 43  | POST                   | /onboarding/company-details/send-otp   | JWT          | User        |
| 44  | POST                   | /onboarding/company-details/verify-otp | JWT          | User        |
| 45  | POST                   | /onboarding/bank-details               | JWT          | User        |
|     | **Survey Feed & Flow** |                                        |              |             |
| 46  | GET                    | /feed/surveys                          | JWT          | User        |
| 47  | GET                    | /feed/surveys/:id/check-availability   | JWT          | User        |
| 48  | POST                   | /feed/surveys/:id/start                | JWT          | User        |
| 49  | GET                    | /feed/survey-history                   | JWT          | User        |
|     | **External Callbacks** |                                        |              |             |
| 50  | POST                   | /external/survey/completed             | Survey Token | External    |
| 51  | POST                   | /external/survey/disqualified          | Survey Token | External    |
| 52  | POST                   | /external/survey/leaved                | Survey Token | External    |
|     | **Wallet**             |                                        |              |             |
| 53  | GET                    | /wallet                                | JWT          | User        |
| 54  | GET                    | /wallet/transactions                   | JWT          | User        |
|     | **Payments & Payouts** |                                        |              |             |
| 55  | GET                    | /payment-gateway                       | JWT          | SA, Admin   |
| 56  | POST                   | /payment-gateway                       | JWT          | SA, Admin   |
| 57  | GET                    | /payout-settings                       | JWT          | SA, Admin   |
| 58  | PATCH                  | /payout-settings                       | JWT          | SA, Admin   |
| 59  | GET                    | /payment-logs                          | JWT          | SA, Admin   |
|     | **Analytics**          |                                        |              |             |
| 60  | GET                    | /analytics/kpi                         | JWT          | SA, Admin   |
| 61  | GET                    | /analytics/users-by-region             | JWT          | SA, Admin   |
| 62  | GET                    | /analytics/users-over-time             | JWT          | SA          |
| 63  | GET                    | /analytics/surveys-over-time           | JWT          | SA, Admin   |
| 64  | GET                    | /analytics/users-per-admin             | JWT          | SA          |
| 65  | GET                    | /analytics/surveys-per-admin           | JWT          | SA          |
| 66  | GET                    | /analytics/users-by-department         | JWT          | SA, Admin   |
| 67  | GET                    | /analytics/surveys-by-department       | JWT          | SA, Admin   |
| 68  | GET                    | /analytics/survey-completion-breakdown | JWT          | SA, Admin   |
| 69  | GET                    | /analytics/top-surveys                 | JWT          | SA, Admin   |
| 70  | GET                    | /analytics/rewards-over-time           | JWT          | SA, Admin   |
| 71  | GET                    | /analytics/admin-financial-overview    | JWT          | SA          |
| 72  | GET                    | /analytics/leaderboard                 | JWT          | Admin       |
| 73  | GET                    | /analytics/user-stats                  | JWT          | User        |
| 74  | GET                    | /analytics/user-earnings-over-time     | JWT          | User        |
|     | **Tickets**            |                                        |              |             |
| 75  | POST                   | /tickets                               | JWT          | User, Admin |
| 76  | GET                    | /tickets                               | JWT          | All         |
| 77  | GET                    | /tickets/:id                           | JWT          | All         |
| 78  | POST                   | /tickets/:id/reply                     | JWT          | All         |
| 79  | PATCH                  | /tickets/:id/status                    | JWT          | SA          |
|     | **Profile**            |                                        |              |             |
| 80  | GET                    | /profile                               | JWT          | All         |
| 81  | PATCH                  | /profile                               | JWT          | All         |
| 82  | PATCH                  | /profile/company                       | JWT          | User        |
| 83  | PATCH                  | /profile/bank-details                  | JWT          | User        |
| 84  | PATCH                  | /profile/departments                   | JWT          | User        |
|     | **Utility**            |                                        |              |             |
| 85  | GET                    | /health                                | None         | —           |
| 86  | GET                    | /vpn-check                             | None         | —           |

**Total: 86 APIs**

---

_API Documentation v1.0 — Prepared by Pronttera for Beacon Martech Private Limited — May 2026_
