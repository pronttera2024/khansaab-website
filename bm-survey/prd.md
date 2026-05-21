Product Requirements Document (PRD)
Survey Panel — Survey-Based Rewards Platform

Field
Details
Document Title
Product Requirements Document
Platform Name
Survey Panel
Prepared by
Pronttera
Contact
info@pronttera.com
Prepared for
Beacon Martech Private Limited
Version
1.0
Date
May 2026
Status
Draft — Pending Sign-off
Total Sprints
6
Sprint Duration
1 Week
Team Size
5 Developers

Table of Contents
Sprint Overview
Sprint 1 — Project Setup & Authentication
Sprint 2 — User Onboarding
Sprint 3 — Departments, Reward Units & Survey Management
Sprint 4 — Survey Feed, Survey Flow & External API
Sprint 5 — Wallet, Payouts & Razorpay
Sprint 6 — Analytics, Support Tickets, Profile & Deployment

1. Sprint Overview
   Sprint
   Focus
   Deliverable
   Sprint 1
   Project setup + Authentication + VPN detection
   All 3 apps bootable. Login, registration, role-based access working end to end
   Sprint 2
   User Onboarding (all 5 steps)
   Full onboarding flow working with progress persistence, OTP, Google Maps
   Sprint 3
   Departments + Reward Units + Survey Management
   SA can manage departments and reward units. Admin/SA can create, draft, and publish surveys
   Sprint 4
   Survey Feed + Survey Flow + External API
   Users can see and attempt surveys. External platform can call our API to report outcomes
   Sprint 5
   Wallet + Payout Cron + Razorpay
   Rewards credited on completion. Nightly payout job running. Payment logs visible
   Sprint 6
   Analytics + Tickets + Profile + Testing + Deployment
   All dashboards live. Tickets working. Full QA pass. Production deployment

2. Sprint 1 — Project Setup & Authentication
   2.1 Project Setup
   Tasks
   Initialise 3 repositories: Admin Portal (React + Vite), User App (React + Vite), Server (NestJS)
   Configure Tailwind CSS and Ant Design in both frontend apps
   Set up PostgreSQL database and run initial migrations
   Configure environment variables structure for all 3 apps
   Set up JWT authentication module in NestJS
   Set up NodeMailer module in NestJS
   Set up Google OAuth 2.0 credentials
   Configure CORS between frontend apps and server

2.2 VPN Detection
Feature Description
VPN detection must run before any screen is rendered — including login and registration. If a user is on a VPN, they see a full-screen error and cannot proceed anywhere.
User Flow
User opens the User App (any URL)
Before rendering any component, app calls VPN detection API
If VPN detected → render full-screen VPN error page
If no VPN → render requested page normally
Business Rules
VPN check applies to User App only — not Admin Portal
VPN check runs on every page load and route change
User cannot bypass the VPN screen by navigating directly to a URL
Edge Cases
Scenario
Handling
VPN detection API is slow
Show a loading screen while check is in progress — do not flash the actual page
VPN detection API fails or times out
Fail safe — block access and show error screen. Do not allow access on API failure
User disables VPN while on error screen
Provide a "Try Again" button that re-runs the VPN check
User is using a corporate proxy (not VPN)
Detection should differentiate — if uncertain, allow access

2.3 Super Admin Authentication
Feature Description
Single Super Admin account seeded at platform setup. Logs in with email and password. No registration flow.
User Flow — Login
SA navigates to Admin Portal login screen
Enters email and password
Server validates credentials, returns JWT
SA is redirected to SA dashboard
User Flow — Forgot Password
SA clicks "Forgot Password" on login screen
Enters registered email
Server generates reset token (time-limited — 30 minutes), sends reset link via NodeMailer
Email includes note: "Please check your spam/junk folder if you don't see this email"
SA clicks link → lands on reset password screen
Enters and confirms new password
Password updated, reset token invalidated
SA redirected to login screen with success message
Business Rules
JWT expiry: 7 days
Reset token expiry: 30 minutes — single use
Password minimum: 8 characters, at least 1 number and 1 special character
After password reset, all existing sessions are invalidated
Edge Cases
Scenario
Handling
Wrong email on login
Generic error: "Invalid email or password" — do not reveal which field is wrong
Wrong password on login
Same generic error — do not reveal which field is wrong
Forgot password with unregistered email
Show same success message as valid email — do not reveal if email exists
Reset link used twice
Show error: "This reset link has already been used. Please request a new one."
Reset link expired
Show error: "This reset link has expired. Please request a new one."
SA tries to access dashboard without valid JWT
Redirect to login screen

2.4 Admin Authentication
Feature Description
Admin accounts are created by Super Admin. Admin receives credentials via email. First login takes Admin to dashboard where they can reset password from Profile.
User Flow — First Login
Admin receives email with credentials (email + temporary password)
Admin navigates to Admin Portal login screen
Enters email and temporary password
Server validates credentials, returns JWT
Admin lands on dashboard
Banner shown: "Please reset your password from your Profile settings."
User Flow — Login (subsequent)
Admin enters email and password
Server validates credentials
If account is suspended → return 403 error
If credentials valid → return JWT, redirect to dashboard
User Flow — Password Reset from Profile
Admin navigates to Profile → Security section
Enters current password, new password, confirm new password
Server validates current password
Password updated
All sessions invalidated — Admin immediately logged out
Admin redirected to login screen with message: "Password updated. Please log in again."
User Flow — Forgot Password
Same flow as Super Admin forgot password.
Business Rules
Suspended Admin receives 403 with message: "Your account has been suspended. Please contact the Super Admin."
Password minimum: 8 characters, at least 1 number and 1 special character
After password reset, all existing sessions are invalidated
Email cannot be changed — fixed permanently
Edge Cases
Scenario
Handling
Admin enters wrong current password on reset
Show error: "Current password is incorrect."
New password same as current password
Show error: "New password must be different from current password."
Admin account suspended mid-session
Next API call returns 403 — frontend redirects to suspended error screen
Admin tries to access portal after suspension
Sees suspended error screen immediately on login
JWT expired mid-session
Redirect to login screen with message: "Your session has expired. Please log in again."

2.5 User Registration & Authentication
Feature Description
Users self-register on the User App via email/password or Google OAuth. Email must be verified before proceeding to onboarding.
User Flow — Email Registration
User navigates to User App registration screen
Fills: full name, email, phone, password
Submits form
Server creates user record with status = active, onboarding_complete = false
Server sends verification email via NodeMailer with OTP or verification link
User verifies email
User redirected to onboarding Step 1
User Flow — Google OAuth Registration
User clicks "Continue with Google"
Google OAuth consent screen shown
User approves
Server receives Google profile (name, email, google_oauth_id)
If email already exists → log in existing user
If email does not exist → create new user record
User redirected to onboarding Step 1
User Flow — Login
User enters email and password
VPN check runs first
Server validates credentials
If onboarding_complete = false → redirect to current onboarding step
If onboarding_complete = true → redirect to survey feed
User Flow — Forgot Password
Same flow as Admin forgot password.
Business Rules
google_oauth_id is used as the unique identifier for OAuth users — not just email
OAuth users do not have a password_hash — password reset not available for OAuth users
Users must verify email before proceeding to onboarding
Deactivated users receive 403 on login with message: "Your account has been deactivated. Please contact support."
Edge Cases
Scenario
Handling
User registers with already existing email
Show error: "An account with this email already exists. Please log in."
User tries to log in before verifying email
Show error: "Please verify your email before logging in. Resend verification email?"
Google OAuth email already registered via email/password
Log in existing account — do not create duplicate
OAuth user tries to use forgot password
Show message: "Your account uses Google sign-in. Please log in with Google."
Deactivated user tries to log in
403 error with deactivation message
User refreshes page mid-onboarding
Resume from current onboarding step stored in user_profiles.onboarding_step

3. Sprint 2 — User Onboarding
   3.1 Onboarding Overview
   Feature Description
   A mandatory 5-step onboarding flow. User cannot access the platform until all steps are complete. Progress is saved at each step. User can resume from where they left off at any time.
   Business Rules
   Every step is mandatory
   On every login, if onboarding_complete = false → redirect to current step
   On page refresh → stay on current step
   Progress indicator shown at all times during onboarding
   User cannot navigate to a future step by manipulating the URL

3.2 Step 1 — User Details
User Flow
User sees form: full name, date of birth, gender, city, LinkedIn URL (optional)
User fills required fields and clicks Continue
Server saves data to user_profiles
onboarding_step updated to 2
User proceeds to Step 2
Business Rules
Full name: required, max 150 characters
Date of birth: required, user must be at least 18 years old
Gender: required, options: Male, Female, Non-binary, Prefer not to say
City: required, free text, max 100 characters
LinkedIn URL: optional, must be valid LinkedIn URL format if provided
Edge Cases
Scenario
Handling
User is under 18
Show error: "You must be at least 18 years old to use this platform."
Invalid LinkedIn URL format
Show inline error: "Please enter a valid LinkedIn URL."
User navigates back from Step 2 to Step 1
Pre-fill form with previously saved data
Server error on save
Show error: "Something went wrong. Please try again." — do not advance step

3.3 Step 2 — Departments
User Flow
User sees list of all active departments from the platform
User selects one or more departments
Clicks Continue
Server saves selections to user_departments (one row per selected department)
onboarding_step updated to 3
User proceeds to Step 3
Business Rules
At least one department must be selected
User can select multiple departments
Only active departments are shown
If no active departments exist, show message: "No departments available. Please contact support."
Edge Cases
Scenario
Handling
User selects no department and clicks Continue
Show error: "Please select at least one department."
Department deactivated between page load and submission
On save, skip deactivated department silently — if all selected departments are deactivated, show error
User navigates back from Step 3
Pre-select previously saved departments

3.4 Step 3 — Location & Device
User Flow
User sees country + city selector powered by Google Maps API
User searches for and selects their location
Server captures and stores IP address from request headers
onboarding_step updated to 4
User proceeds to Step 4
Business Rules
Country and city are required
IP address captured server-side from request — user cannot manipulate it
If user is on VPN, they would have been blocked before reaching this step
Edge Cases
Scenario
Handling
Google Maps API fails to load
Show manual text fields for country and city as fallback
User selects country but not city
Show error: "Please select your city."
IP address cannot be determined
Store null — do not block onboarding progress
User navigates back from Step 4
Pre-fill previously saved location

3.5 Step 4 — Company Details
User Flow
User sees form: company name, designation, organisation email (optional)
User fills company name and designation (required)
If user leaves org email blank → Continue button is enabled
If user enters org email → Continue button is immediately disabled, Verify Email button appears
User clicks Verify Email → OTP sent to entered org email via NodeMailer
User enters OTP in app
If OTP correct → org_email_verified = true, Continue button enabled
User clicks Continue
Server saves data to user_company_details
onboarding_step updated to 5
User proceeds to Step 5
Business Rules
Company name: required, max 255 characters
Designation: required, max 150 characters
Organisation email: optional field
If org email entered → verification is mandatory before Continue is enabled
OTP is 6 digits, expires after 10 minutes
User can resend OTP after every 2 minutes
OTP is single-use — invalidated after successful verification
Edge Cases
Scenario
Handling
User enters org email, gets OTP, then clears the email field
Reset org_email_verified to false, hide OTP input, re-enable Continue button
User enters invalid email format in org email
Show inline error: "Please enter a valid email address." — do not send OTP
OTP entered incorrectly
Show error: "Incorrect OTP. Please try again." — allow retry
OTP expired
Show error: "OTP has expired. Please request a new one."
User requests OTP resend before 2 minutes
Resend button is disabled with countdown timer showing remaining seconds
User changes org email after OTP sent
Invalidate previous OTP, require new OTP for new email
User navigates back from Step 5
Pre-fill saved data, show verified badge if org email already verified
NodeMailer fails to send OTP
Show error: "Failed to send OTP. Please try again."

3.6 Step 5 — Bank Details
User Flow
User sees form: account number, IFSC code, bank name, PAN
Warning displayed: "Please make sure your bank details are correct. Incorrect details will result in failed payments and you will not receive your rewards."
User fills all fields
User clicks Complete Onboarding
Server validates PAN format
Server saves data to bank_details
onboarding_complete = true in user_profiles
User redirected to survey feed
Business Rules
All fields are required
PAN format validation: exactly 10 characters, pattern ABCDE1234F (5 uppercase letters, 4 digits, 1 uppercase letter)
IFSC code: exactly 11 characters, first 4 uppercase letters, 5th character is 0, last 6 alphanumeric
Account number: numeric only, 9–18 digits
No third-party PAN verification API — format only
Edge Cases
Scenario
Handling
Invalid PAN format
Show inline error: "Please enter a valid PAN (e.g. ABCDE1234F)."
Invalid IFSC format
Show inline error: "Please enter a valid IFSC code."
Account number contains letters
Show inline error: "Account number must contain digits only."
Server error on save
Show error: "Something went wrong. Please try again." — do not mark onboarding_complete = true
User navigates back from survey feed to onboarding
Redirect to survey feed — onboarding_complete = true, no going back

4. Sprint 3 — Departments, Reward Units & Survey Management
   4.1 Department Management (Super Admin)
   Feature Description
   Super Admin creates and manages the platform-wide department list. All Admins and Users pick from this list freely.
   User Flow — Create Department
   SA navigates to Departments section
   Clicks "Add Department"
   Enters department name
   Clicks Save
   Department created with is_active = true
   User Flow — Deactivate Department
   SA finds department in list
   Clicks Deactivate
   Confirmation dialog: "Deactivating this department will prevent new surveys from being created under it. Existing surveys will not be affected. Continue?"
   SA confirms
   Department is_active set to false
   Business Rules
   Department names must be unique across the platform
   Deactivated departments are not shown when creating surveys or during user onboarding
   Departments cannot be deleted — only deactivated
   SA can reactivate a deactivated department at any time
   Edge Cases
   Scenario
   Handling
   Duplicate department name
   Show error: "A department with this name already exists."
   Deactivating department with active surveys
   Allow deactivation — existing surveys continue. Only new survey creation is blocked
   SA reactivates a department
   Department immediately appears in survey creation and user preferences
   No departments exist yet
   Show empty state with prompt to create first department

4.2 Reward Unit Management (Super Admin)
Feature Description
Super Admin manages platform-wide reward units. These are the only reward options available when creating surveys.
User Flow — Create Reward Unit
SA navigates to Reward Units section
Clicks "Add Reward Unit"
Enters: name, value in ₹
Clicks Save
Reward unit created with is_active = true
User Flow — Edit Reward Unit
SA clicks Edit on a reward unit
Updates name or value
Saves
User Flow — Deactivate Reward Unit
SA clicks Deactivate on a reward unit
Confirmation dialog shown
SA confirms
is_active set to false
Business Rules
Reward unit names must be unique
Value in ₹ must be greater than 0
Deactivated reward units do not appear in survey creation
Editing a reward unit value affects only new surveys — existing surveys retain the value at time of creation
Default reward units seeded at platform setup: Silver Coin (₹2), Gold Coin (₹10), Diamond (₹50)
Edge Cases
Scenario
Handling
Duplicate reward unit name
Show error: "A reward unit with this name already exists."
Value set to 0 or negative
Show error: "Value must be greater than ₹0."
Deactivating a unit used in active surveys
Allow — existing surveys are unaffected. Only new survey creation is blocked
All reward units deactivated
SA cannot create surveys until at least one unit is active. Show warning

4.3 Survey Management
Feature Description
Both Super Admin and Admin can create, edit, and manage surveys. Surveys target a single department. Survey forms are hosted externally — only the link is stored.
User Flow — Create Survey (Draft)
Admin/SA navigates to Surveys section
Clicks "Create Survey"
Fills: title, description, external link, department, expiry, quota, reward unit, reward quantity
Total reward calculated automatically and shown: (reward_unit.value × quantity = ₹X)
Clicks "Save as Draft"
Survey created with status = draft
User Flow — Publish Survey
Admin/SA opens a draft survey
Reviews all details
Clicks "Publish"
Confirmation dialog: "Once published, the survey link, reward, quota, expiry, and department cannot be edited. Continue?"
Admin confirms
Survey status set to active
Survey immediately visible in user feed for matching department users
User Flow — Edit Published Survey
Admin/SA opens an active survey
Can only edit: title, description
Can change status to Closed (manual close)
Saves changes
User Flow — View Survey Responses
Admin/SA opens a survey
Clicks "View Responses" tab
Sees list of users who attempted the survey with their status (completed/disqualified/leaved)
Can export as CSV
Business Rules
External link is locked after publish
Reward, quota, expiry, and department are locked after publish
Survey auto-closes when current_responses >= quota
Survey auto-closes when expiry_date is past
Admin can only see their own surveys — not other Admins' surveys
SA can see all surveys platform-wide
Draft surveys are not visible to users
Edge Cases
Scenario
Handling
External link is not a valid URL
Show inline error: "Please enter a valid URL."
Quota set to 0
Show error: "Quota must be at least 1."
Expiry date set in the past
Show error: "Expiry date must be in the future."
Reward quantity set to 0
Show error: "Reward quantity must be at least 1."
Selected department deactivated after draft saved
On publish, show error: "The selected department has been deactivated. Please select an active department."
Selected reward unit deactivated after draft saved
On publish, show error: "The selected reward unit has been deactivated. Please select an active reward unit."
Admin tries to edit external link of published survey
Field is read-only — show tooltip: "Survey link cannot be changed after publishing."
Survey reaches quota while Admin is viewing it
Status auto-updates to closed — Admin sees closed badge on refresh
Admin tries to publish survey with no active reward units
Block publish — show error: "No active reward units available."
Two users complete survey simultaneously pushing responses to exactly quota
Both completions are recorded. Database-level transaction ensures current_responses is accurate. Survey closes after both are processed

4.4 Admin Management (Super Admin)
Feature Description
Super Admin creates and manages Admin accounts through a 2-step onboarding form.
User Flow — Create Admin
SA navigates to Admins section
Clicks "Add Admin"
Step 1: Fills personal info — name, email, phone. Auto-generates password
Step 2: Fills org details — org name, address, LinkedIn URL
Clicks Save
Admin account created
Email sent to Admin with credentials and reset prompt
User Flow — Suspend Admin
SA finds Admin in list
Clicks Suspend
Confirmation dialog: "This Admin will lose access immediately. Their surveys and data will be preserved. Continue?"
SA confirms
Admin status set to suspended
User Flow — Reactivate Admin
SA finds suspended Admin
Clicks Reactivate
Admin status set to active
Admin can log in again
Business Rules
Email must be unique across all users
Auto-generated password: minimum 12 characters, mix of letters, numbers, special characters
SA cannot delete Admin accounts
SA cannot edit Admin's email after creation
All Admin surveys and data are preserved on suspension
Edge Cases
Scenario
Handling
Email already in use
Show error: "An account with this email already exists."
SA suspends Admin who is currently logged in
Admin's current session is invalidated immediately on next API call
SA accidentally suspends wrong Admin
Can reactivate immediately — no data loss
Email delivery fails for Admin invite
Show warning: "Admin created but email delivery failed. Please share credentials manually." — Admin record still saved

5. Sprint 4 — Survey Feed, Survey Flow & External API
   5.1 Survey Feed
   Feature Description
   The home screen of the User App. Shows all active surveys matching the user's selected departments. Infinite scroll. Real-time status per survey card based on survey_audits.
   User Flow
   User opens User App → lands on Survey Feed
   App fetches surveys: active + matching user's departments + not expired
   For each survey, app checks survey_audits for current user to determine card state
   Surveys rendered as cards with correct state
   User scrolls down → next page of surveys loaded (infinite scroll)
   User applies filters → feed refreshed with filtered results
   Business Rules
   Expired surveys (expiry_date < now) are excluded entirely
   Surveys with status = closed (quota full or manually closed) show Full badge
   Survey card state priority: if record exists in survey_audits → show that status. If no record → show Available
   Filters do not reset on page refresh — persisted in URL query params or local state
   Edge Cases
   Scenario
   Handling
   User has no departments selected
   Show message: "Please select departments from your Preferences to see surveys." with link to Preferences
   No surveys match user's departments
   Show empty state: "No surveys available for your departments right now. Check back later."
   Survey expires while user is viewing the feed
   On next scroll/refresh, expired survey disappears from feed
   Survey quota fills while user is viewing the feed
   Card updates to Full badge on next refresh — or immediately if user is looking at that card when they attempt it
   User loses internet mid-scroll
   Show offline error banner — retain already-loaded surveys
   All surveys in feed are completed/disqualified/leaved
   User sees all cards with their statuses — empty state not shown since surveys exist

5.2 Survey Flow
Feature Description
The end-to-end flow from a user clicking a survey card to receiving their result.
User Flow
User clicks an Available survey card
App calls check-availability API
Loader shown: "Checking availability..."
If quota full → card updates to Full, inline message shown, stop
If available:
Create/update survey_audits record: status = wip, generate JWT token
Card updates to WIP badge immediately
User redirected to: external_link?token=<JWT>
User completes survey on external platform
External platform calls our API (completed/disqualified/leaved) with token
Our server: validates token, marks token_used = true, updates survey_audits status
If completed: credit reward to user_wallet
Child window opens in User App showing result screen
Child window auto-closes after 6 seconds
Survey feed card updates to new status
Business Rules
One attempt per user per survey — enforced by unique constraint on (survey_id, user_id) in survey_audits
Token is single-use — invalidated immediately after first use
Token expiry: 2 hours (enough time for user to complete survey)
Reward credited immediately on completion — does not wait for nightly payout
Leaved status set when external platform calls /api/survey/leaved via beforeunload event
Edge Cases
Scenario
Handling
User clicks survey card twice rapidly
Second click blocked if survey_audits record already exists with status = wip
Token expired before external platform calls API
Return 401 — survey status remains wip. Nightly job does not process wip status. Survey stays disabled for that user
Token used twice (replay attack)
Second use returns 401 — token_used = true check prevents replay
External platform never calls our API (silent failure)
Survey stays in WIP state permanently for that user — card stays disabled. Flag for manual review if needed
User opens same survey in two browser tabs
First tab creates wip record — second tab sees wip state and card is disabled
External platform calls completed API but user_id + survey_id already has completed status
Idempotent check — ignore duplicate call, return 200
Reward credit fails after completed API call
Log error, retry credit. Do not mark survey as failed — status remains completed
User's wallet does not exist yet
Create wallet record on first reward credit with initial balance = reward amount
External platform sends invalid token
Return 401 with message: "Invalid token."

5.3 External Survey API
Feature Description
Secure API endpoints exposed to the external survey platform. Called by the external platform to report survey outcomes.
Endpoints
POST /api/survey/completed
Request body:
{ "token": "<JWT>" }

Flow:
Validate token signature
Check token not expired
Check token_used = false
Extract user_id and survey_id from token
Mark token_used = true
Update survey_audits: status = completed
Increment surveys.current_responses
If current_responses >= quota → set surveys.status = closed
Calculate reward: reward_unit.value_in_rupees × reward_quantity
Credit reward to user_wallet.balance
Return 200
POST /api/survey/disqualified
Same token validation flow. Update survey_audits: status = disqualified. No reward credit. Return 200.
POST /api/survey/leaved
Same token validation flow. Update survey_audits: status = leaved. No reward credit. Return 200.
GET /api/survey/check-availability/:survey_id
Flow:
Validate user JWT (user must be logged in)
Check survey exists and status = active
Check expiry_date > now
Check current_responses < quota
Check no existing survey_audits record for this user + survey
Return { available: true } or { available: false, reason: "quota_full" / "expired" / "already_attempted" }
Business Rules
All POST endpoints require valid signed JWT token in body (not user JWT — survey-specific token)
GET check-availability requires user's auth JWT in Authorization header
All endpoints are rate-limited to prevent abuse
API security details (signing key management, IP whitelisting) to be finalised with external platform team
Edge Cases
Scenario
Handling
External platform sends request without token
Return 400: "Token is required."
External platform sends malformed token
Return 401: "Invalid token."
Race condition: two completed calls for same token simultaneously
Database transaction + token_used flag ensures only one succeeds
External platform sends completed after disqualified already set
Ignore — status already terminal. Return 200 idempotently
Survey closed between WIP and completed call
Allow completion — user started before quota was filled. Record completion and credit reward

6. Sprint 5 — Wallet, Payouts & Razorpay
   6.1 User Wallet
   Feature Description
   Every user has a wallet. Rewards are credited immediately on survey completion. Wallet shows current balance, pending rewards, and transaction history.
   User Flow — View Wallet
   User navigates to Wallet screen
   Sees: current balance (₹), pending rewards (today's completions not yet paid out), total earned all time
   Scrolls down to see transaction history
   Each transaction shows: date, survey name, amount, status, error comment (if failed)
   Business Rules
   Wallet is created automatically on first reward credit
   Balance can never go below 0
   Pending rewards = sum of today's completed surveys' reward values (not yet paid out by cron)
   Failed transactions remain in history with failed status and error comment
   Retried transactions create a new log entry — old failed entry is not updated
   Edge Cases
   Scenario
   Handling
   User has never completed a survey
   Show wallet with ₹0 balance and empty transaction history
   Wallet record does not exist yet
   Create on first reward credit — show ₹0 until then
   Balance calculation mismatch
   Log discrepancy — do not show negative balance to user

6.2 Razorpay Configuration (Admin & Super Admin)
Feature Description
Each Admin and SA connects their own Razorpay account. Credentials are validated on save and stored encrypted.
User Flow
Admin/SA navigates to Settings → Payment Gateway
Enters Razorpay Key ID and Key Secret
Warning shown: "Incorrect credentials will affect your users' payouts. Please double-check before saving."
Clicks Save
Server validates credentials against Razorpay API
If invalid → return error: "Invalid Razorpay credentials. Please check and try again."
If valid → encrypt and store credentials
Success message shown
Business Rules
Credentials encrypted at application level before storing in database
Validation hits Razorpay API test endpoint to verify credentials
Admin cannot view their stored Key Secret after saving — only Key ID shown (masked)
Admin can update credentials at any time — new credentials validated before old ones are replaced
Edge Cases
Scenario
Handling
Razorpay validation API is down
Show warning: "Could not verify credentials right now. Save anyway?" — allow save with explicit confirmation
Admin saves wrong credentials and payouts fail
Payout cron logs failure with comment. Admin sees failed status in Payment Logs and must update credentials
Admin updates credentials mid-day before nightly payout
New credentials used for that night's payout

6.3 Payout Settings
Feature Description
Each Admin and SA sets their own minimum payout threshold. Default is ₹100.
User Flow
Admin/SA navigates to Settings → Payout Settings
Sees current minimum payout threshold (default ₹100)
Updates value
Clicks Save
New threshold applied from next nightly payout run
Business Rules
Minimum threshold must be ≥ ₹1
Maximum threshold: no limit
Change takes effect from the next nightly cron run
Each Admin's threshold applies only to their own users' payouts
Edge Cases
Scenario
Handling
Threshold set to 0
Show error: "Minimum payout amount must be at least ₹1."
Threshold set to very high amount (e.g. ₹10,000)
Allow — Admin's choice. Users will accumulate balance until threshold is reached

6.4 Nightly Payout Cron Job
Feature Description
Automated job runs every night at 12:00 AM IST. Processes all qualifying payouts for the day.
Flow
Fetch all survey_audits where status = completed AND DATE(updated_at) = today
Group by user_id + admin_id (survey creator)
For each group: a. Sum total reward amount (reward_unit.value_in_rupees × reward_quantity) b. Fetch user's wallet balance c. Add today's group sum to wallet balance (total available) d. Fetch Admin's payout_settings.min_payout_amount e. If total available < min_payout_amount → skip, log as pending f. If total available >= min_payout_amount:
Fetch user's bank_details
Check bank_details_updated_at — if updated today → use previous day's bank details
Fetch Admin's Razorpay credentials (decrypt)
Trigger Razorpay payout
On success: deduct amount from user_wallet.balance, log with status = success, store razorpay_reference_id
On failure: log with status = failed, failure_comment = error reason, increment retry_count
Failed transactions from previous nights with retry_count > 0 are also retried in same run
Business Rules
Cron runs at exactly 12:00 AM IST — NestJS Schedule with timezone config
Each Admin's Razorpay account pays their own survey rewards only
Failed payouts retry indefinitely until success or manual intervention
Bank detail changes made today take effect tomorrow — today's payout uses yesterday's bank details
If user has no bank details → skip payout, log failure comment: "No bank details found."
If Admin has no Razorpay credentials → skip all that Admin's payouts, log failure: "No payment gateway credentials found."
Edge Cases
Scenario
Handling
Cron job fails to start
Alert logging — retry mechanism or manual trigger available
Razorpay API is down at midnight
Log all as failed with comment: "Razorpay API unavailable." Retry next night
User bank details deleted between completion and payout
Log failure: "Bank details not found."
User wallet balance becomes negative due to race condition
Floor at 0 — log discrepancy
Admin Razorpay account has insufficient funds
Razorpay returns error — log as failed with Razorpay error message
Cron runs twice due to server restart
Idempotency check — if transaction log entry already exists for user + admin + date with status = success, skip
Daylight saving time edge case
Always use IST (UTC+5:30) — no DST in India

6.5 Payment Logs Screen
Feature Description
Both Admin and SA can view all payout transaction logs filtered by status.
User Flow
Admin/SA navigates to Payment Logs
Sees list of all transactions (most recent first)
Can filter by: status (all / success / failed / pending), date range, user name
Each row shows: date, user name, survey name, amount, status, error comment (if failed)
Business Rules
Admin sees only their own transactions
SA sees all transactions platform-wide
Logs are read-only — cannot be edited or deleted
Edge Cases
Scenario
Handling
No transactions yet
Show empty state: "No payment transactions yet."
Very large number of transactions
Paginate — 50 rows per page

7. Sprint 6 — Analytics, Support Tickets, Profile & Deployment
   7.1 Analytics Dashboard
   Feature Description
   Real-time analytics dashboard for Super Admin (platform-wide) and Admin (own data). Date range filter on all charts.
   User Flow
   Admin/SA navigates to Analytics
   Default view: Last 30 days
   Can change date range: 7 days / 30 days / 3 months / custom
   All charts update based on selected range
   GeoChart shows world map with user density
   Business Rules
   Super Admin sees platform-wide data across all Admins
   Admin sees only data from their own surveys and respondents
   GeoChart uses Google Charts library — sourced from users' country field in user_profiles
   All charts are read-only
   Data refreshes on page load — not live streaming
   Edge Cases
   Scenario
   Handling
   No data for selected date range
   Show empty state per chart: "No data for this period."
   Google Charts fails to load
   Show error placeholder: "Chart unavailable. Please refresh."
   Admin has no surveys yet
   Show empty state dashboard with prompt to create first survey
   Custom date range: end date before start date
   Show error: "End date must be after start date."

7.2 Support Tickets
Feature Description
Users and Admins can raise tickets. Super Admin manages all tickets. Full conversation thread per ticket.
User Flow — Raise Ticket (User or Admin)
User/Admin navigates to Tickets → New Ticket
Selects category
Writes message
Submits
Ticket created with status = open, assigned_to = Super Admin
User Flow — Reply to Ticket
User/Admin opens a ticket
Sees full conversation thread
Types reply
Submits
Reply saved to ticket_replies
ticket.updated_at updated
User Flow — Super Admin Manages Tickets
SA navigates to Tickets
Sees all tickets — can filter by: All, From Admins, From Users, Mine
Can change ticket status: Open → In Progress → Resolved → Closed
Can reply to any ticket
Business Rules
Text only — no file attachments
Auto-close: ticket automatically set to Closed if no activity for 7 days after status = Resolved
No notifications — users check Tickets screen for updates
User can see full history of all their tickets
Admin can see tickets from their survey respondents only — cannot see general user tickets
Edge Cases
Scenario
Handling
User submits empty message
Show error: "Message cannot be empty."
User submits extremely long message
Limit to 2000 characters — show character counter
Ticket auto-closed while user is drafting reply
Allow reply — re-open ticket automatically when reply submitted
SA closes ticket, user wants to follow up
User can reply to closed ticket — ticket re-opens automatically
Duplicate ticket submissions (double click)
Debounce submit button — prevent duplicate creation

7.3 Profile & Settings
Feature Description
All users can manage their profile details. Email is fixed. Password reset logs user out.
Business Rules
Email cannot be changed for any role
Password reset immediately invalidates all sessions
Bank detail updates for users take effect from next night's payout
Razorpay credential updates for Admin/SA validated on save
Department preference changes take effect immediately on survey feed
Edge Cases
Scenario
Handling
User updates bank details 1 minute before midnight cron
Tonight's payout uses old details — new details from tomorrow
Admin updates Razorpay credentials during cron run
Cron uses credentials fetched at job start — new credentials apply next night
User changes department preferences — surveys currently in WIP status
WIP surveys remain WIP — new feed filtered by updated departments
User removes all departments from preferences
Show warning: "You must have at least one department selected to see surveys." — block save if all removed

7.4 Testing & QA
Testing Checklist
Authentication
[ ] Super Admin login/logout works
[ ] Admin login/logout works
[ ] User registration (email + OAuth) works
[ ] VPN detection blocks access correctly (User App only)
[ ] Forgot password flow works for all roles
[ ] Suspended Admin cannot log in
[ ] Deactivated User cannot log in
[ ] JWT expiry handled correctly
Onboarding
[ ] All 5 steps save progress correctly
[ ] Page refresh resumes correct step
[ ] OTP flow works end to end
[ ] PAN and IFSC validation works
[ ] User cannot access platform with onboarding_complete = false
Survey Management
[ ] Draft survey not visible to users
[ ] Published survey visible to correct department users
[ ] Survey auto-closes on quota reached
[ ] Survey auto-closes on expiry
[ ] Locked fields cannot be edited after publish
[ ] CSV export works
Survey Flow
[ ] Check availability blocks full surveys
[ ] Token generated correctly
[ ] External API calls update status correctly
[ ] One attempt rule enforced
[ ] Reward credited on completion
[ ] Result screen shows correctly
Wallet & Payouts
[ ] Wallet balance updates on reward credit
[ ] Nightly cron runs at correct time
[ ] Payout threshold respected
[ ] Failed payout logged with comment
[ ] Retry works next night
[ ] Bank detail update takes effect next night
Analytics
[ ] All charts render correctly
[ ] Date range filter works
[ ] SA sees platform-wide data
[ ] Admin sees own data only
[ ] GeoChart renders correctly
Tickets
[ ] Ticket creation works
[ ] Reply thread works
[ ] Status changes work
[ ] Auto-close after 7 days works
[ ] SA sees all tickets, Admin sees own only

7.5 Deployment
Checklist
[ ] Environment variables configured for production
[ ] Database migrations run on production PostgreSQL
[ ] Default Super Admin account seeded
[ ] Default reward units seeded
[ ] SSL certificates configured
[ ] CORS configured for production domains
[ ] Cron job timezone set to IST (UTC+5:30)
[ ] NodeMailer configured with production SMTP
[ ] Razorpay credentials configured (SA's own account)
[ ] Google OAuth redirect URIs updated for production domain
[ ] Google Maps API key restricted to production domain
[ ] Error logging and monitoring set up
[ ] Admin Portal and User App deployed to production
[ ] Server Application deployed to production
[ ] Smoke test all critical flows on production

Survey Panel PRD v1.0 — Prepared by Pronttera for Beacon Martech Private Limited — May 2026
