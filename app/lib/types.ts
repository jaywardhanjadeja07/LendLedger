// Core type definitions for LendLedger app

export interface User {
    id: string;
    name: string;
    email: string;
    subscriptionTier: 'free' | 'premium';
    createdAt: Date;
}

export interface Loan {
    id: string;
    userId: string;
    type: 'lent' | 'borrowed';
    contactName: string;
    contactEmail?: string;
    contactPhone?: string;
    amount: number;
    currency: string;
    dueDate: Date;
    createdDate: Date;
    status: 'active' | 'settled' | 'overdue';
    interestRate?: number; // Premium feature
    notes?: string;
    attachments?: string[];
    settledDate?: Date;
}

export interface Reminder {
    id: string;
    loanId: string;
    userId: string;
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
    nextReminderDate: Date;
    enabled: boolean;
    customMessage?: string;
    lastSent?: Date;
}

export interface Payment {
    id: string;
    loanId: string;
    amount: number;
    date: Date;
    notes?: string;
}

export interface Subscription {
    tier: 'free' | 'premium';
    activeLoanLimit: number;
    features: string[];
}

export const SUBSCRIPTION_TIERS: Record<'free' | 'premium', Subscription> = {
    free: {
        tier: 'free',
        activeLoanLimit: 5,
        features: [
            'Up to 5 active loans',
            'Basic reminders',
            'Simple tracking',
            'Email support'
        ]
    },
    premium: {
        tier: 'premium',
        activeLoanLimit: Infinity,
        features: [
            'Unlimited loans',
            'Advanced analytics',
            'Custom reminder schedules',
            'Interest rate tracking',
            'Priority support',
            'Export to CSV',
            'Multi-currency support'
        ]
    }
};

export interface DashboardStats {
    totalLent: number;
    totalBorrowed: number;
    activeLoans: number;
    settledLoans: number;
    upcomingReminders: number;
    overdueLoans: number;
}
