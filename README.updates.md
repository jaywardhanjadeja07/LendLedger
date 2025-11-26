# UI & Feature Updates (Blue Gradient & INR)

This update introduces a major UI overhaul and new features to LendLedger.

## Key Changes

### 1. Visual Style
- **Theme**: Switched from "Black & Gold" to **"Blue Gradient"** (`#1EA7FF` to `#6FC8FF`).
- **Logo**: Updated to use the promotional logo (`/assets/logo-promo.png`).
- **Font**: Maintained Geist Sans/Mono.

### 2. Landing Page (`app/page.tsx`)
- **Hero**: New blue gradient background with large typography.
- **Phone Mockup**: Added a CSS-based phone mockup showing the dashboard.
- **Features**: Expanded list including WhatsApp reminders, UPI, and PDF contracts.
- **Social Proof**: Added testimonials and pricing CTA.

### 3. Currency & Localization
- **INR (₹)**: All currency displays now use Indian Rupee formatting by default.
- **Formatter**: New utility `app/lib/formatCurrency.ts`.

### 4. Dashboard & Loans
- **Filters**: Added filters for Lent, Borrowed, Active, Settled, and Overdue.
- **Badges**: Added overdue badges with day counters.
- **Actions**: Added "Mark as Repaid" button for quick settlement.
- **Reliability Score**: Added logic to calculate borrower reliability based on repayment history.
- **Reminder Preview**: Added a visual preview of reminder messages in the "New Loan" form.

## Files Modified
- `app/globals.css` (Theme variables)
- `app/layout.tsx` (Metadata & Logo)
- `app/page.tsx` (Landing Page)
- `app/dashboard/page.tsx` (Dashboard UI)
- `app/loans/page.tsx` (Loans List)
- `app/loans/[id]/page.tsx` (Loan Details)
- `app/loans/new/page.tsx` (New Loan Form)

## New Files
- `app/lib/formatCurrency.ts`
- `app/lib/reliability.ts`
- `public/assets/logo-promo.png`

## How to Revert
Backups were created for critical files. To revert to the previous "Black & Gold" theme:

1.  **Restore Global Styles**:
    ```bash
    copy app\globals.css.bak app\globals.css
    ```
2.  **Restore Landing Page**:
    ```bash
    copy app\page.tsx.bak app\page.tsx
    ```
3.  **Revert Code Changes**:
    You can use `git checkout .` to discard all changes if you haven't committed yet, or `git revert <commit-hash>` if you have.
