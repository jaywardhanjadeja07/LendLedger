// Utility functions for LendLedger app

import { Loan, DashboardStats } from './types';

/**
 * Format currency amount with proper symbol and decimal places
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(d);
}

/**
 * Calculate days until due date
 */
export function daysUntilDue(dueDate: Date | string): number {
    const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if loan is overdue
 */
export function isOverdue(dueDate: Date | string): boolean {
    return daysUntilDue(dueDate) < 0;
}

/**
 * Get status badge color class
 */
export function getStatusBadgeClass(status: string): string {
    switch (status) {
        case 'active':
            return 'badge-success';
        case 'overdue':
            return 'badge-error';
        case 'settled':
            return 'badge-gold';
        default:
            return 'badge-warning';
    }
}

/**
 * Calculate loan status based on due date
 */
export function calculateLoanStatus(loan: Loan): Loan['status'] {
    if (loan.status === 'settled') return 'settled';
    if (isOverdue(loan.dueDate)) return 'overdue';
    return 'active';
}

/**
 * Calculate dashboard statistics from loans array
 */
export function calculateDashboardStats(loans: Loan[]): DashboardStats {
    const stats: DashboardStats = {
        totalLent: 0,
        totalBorrowed: 0,
        activeLoans: 0,
        settledLoans: 0,
        upcomingReminders: 0,
        overdueLoans: 0,
    };

    loans.forEach(loan => {
        const updatedStatus = calculateLoanStatus(loan);

        if (loan.type === 'lent') {
            stats.totalLent += loan.amount;
        } else {
            stats.totalBorrowed += loan.amount;
        }

        if (updatedStatus === 'active') {
            stats.activeLoans++;
        } else if (updatedStatus === 'overdue') {
            stats.overdueLoans++;
            stats.activeLoans++;
        } else if (updatedStatus === 'settled') {
            stats.settledLoans++;
        }
    });

    return stats;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
}
