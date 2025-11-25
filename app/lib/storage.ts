// LocalStorage utility for data persistence

import { Loan, Reminder, User } from './types';

const STORAGE_KEYS = {
    USER: 'lendledger_user',
    LOANS: 'lendledger_loans',
    REMINDERS: 'lendledger_reminders',
};

/**
 * Generic storage get function
 */
function getFromStorage<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

/**
 * Generic storage set function
 */
function setToStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error writing to localStorage:', error);
    }
}

// User Storage
export const userStorage = {
    get: (): User | null => getFromStorage<User>(STORAGE_KEYS.USER),
    set: (user: User): void => setToStorage(STORAGE_KEYS.USER, user),
    clear: (): void => localStorage.removeItem(STORAGE_KEYS.USER),
};

// Loans Storage
export const loansStorage = {
    getAll: (): Loan[] => getFromStorage<Loan[]>(STORAGE_KEYS.LOANS) || [],

    getById: (id: string): Loan | undefined => {
        const loans = loansStorage.getAll();
        return loans.find(loan => loan.id === id);
    },

    add: (loan: Loan): void => {
        const loans = loansStorage.getAll();
        loans.push(loan);
        setToStorage(STORAGE_KEYS.LOANS, loans);
    },

    update: (id: string, updates: Partial<Loan>): void => {
        const loans = loansStorage.getAll();
        const index = loans.findIndex(loan => loan.id === id);

        if (index !== -1) {
            loans[index] = { ...loans[index], ...updates };
            setToStorage(STORAGE_KEYS.LOANS, loans);
        }
    },

    delete: (id: string): void => {
        const loans = loansStorage.getAll();
        const filtered = loans.filter(loan => loan.id !== id);
        setToStorage(STORAGE_KEYS.LOANS, filtered);
    },

    clear: (): void => localStorage.removeItem(STORAGE_KEYS.LOANS),
};

// Reminders Storage
export const remindersStorage = {
    getAll: (): Reminder[] => getFromStorage<Reminder[]>(STORAGE_KEYS.REMINDERS) || [],

    getByLoanId: (loanId: string): Reminder[] => {
        const reminders = remindersStorage.getAll();
        return reminders.filter(reminder => reminder.loanId === loanId);
    },

    add: (reminder: Reminder): void => {
        const reminders = remindersStorage.getAll();
        reminders.push(reminder);
        setToStorage(STORAGE_KEYS.REMINDERS, reminders);
    },

    update: (id: string, updates: Partial<Reminder>): void => {
        const reminders = remindersStorage.getAll();
        const index = reminders.findIndex(reminder => reminder.id === id);

        if (index !== -1) {
            reminders[index] = { ...reminders[index], ...updates };
            setToStorage(STORAGE_KEYS.REMINDERS, reminders);
        }
    },

    delete: (id: string): void => {
        const reminders = remindersStorage.getAll();
        const filtered = reminders.filter(reminder => reminder.id !== id);
        setToStorage(STORAGE_KEYS.REMINDERS, filtered);
    },

    clear: (): void => localStorage.removeItem(STORAGE_KEYS.REMINDERS),
};

/**
 * Clear all app data
 */
export function clearAllData(): void {
    userStorage.clear();
    loansStorage.clear();
    remindersStorage.clear();
}

/**
 * Initialize demo data for testing
 */
export function initializeDemoData(): void {
    const demoUser: User = {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@lendledger.com',
        subscriptionTier: 'free',
        createdAt: new Date(),
    };

    const demoLoans: Loan[] = [
        {
            id: 'loan-1',
            userId: 'demo-user',
            type: 'lent',
            contactName: 'John Doe',
            contactEmail: 'john@example.com',
            amount: 1500,
            currency: 'USD',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            createdDate: new Date(),
            status: 'active',
            notes: 'For car repair',
        },
        {
            id: 'loan-2',
            userId: 'demo-user',
            type: 'borrowed',
            contactName: 'Jane Smith',
            amount: 2000,
            currency: 'USD',
            dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (overdue)
            createdDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            status: 'overdue',
            notes: 'Emergency fund',
        },
        {
            id: 'loan-3',
            userId: 'demo-user',
            type: 'lent',
            contactName: 'Bob Johnson',
            amount: 500,
            currency: 'USD',
            dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            createdDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
            status: 'settled',
            settledDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
    ];

    userStorage.set(demoUser);
    setToStorage(STORAGE_KEYS.LOANS, demoLoans);
}
