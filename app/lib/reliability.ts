import { Loan } from './types';

export function calculateReliabilityScore(loans: Loan[], contactName: string): number {
    const contactLoans = loans.filter(l => l.contactName.toLowerCase() === contactName.toLowerCase());

    if (contactLoans.length === 0) return 50; // Neutral start

    let score = 50;

    contactLoans.forEach(loan => {
        if (loan.status === 'settled') {
            // Paid on time or early
            if (loan.settledDate && loan.dueDate && new Date(loan.settledDate) <= new Date(loan.dueDate)) {
                score += 10;
            }
            // Paid late
            else {
                score += 5;
            }
        } else if (loan.status === 'overdue') {
            score -= 15;
        } else if (loan.status === 'active') {
            // Slight boost for active loans not yet due
            score += 1;
        }
    });

    return Math.min(Math.max(score, 0), 100);
}

export function getReliabilityColor(score: number): string {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-blue-500';
    if (score >= 30) return 'text-yellow-500';
    return 'text-red-500';
}
