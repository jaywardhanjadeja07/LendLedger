'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loan } from '../lib/types';
import { loansStorage, userStorage, initializeDemoData } from '../lib/storage';
import { calculateDashboardStats, formatCurrency, formatDate, getStatusBadgeClass } from '../lib/utils';

export default function Dashboard() {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize demo data if no user exists
        if (!userStorage.get()) {
            initializeDemoData();
        }

        const allLoans = loansStorage.getAll();
        setLoans(allLoans);
        setIsLoading(false);
    }, []);

    const stats = calculateDashboardStats(loans);
    const activeLoans = loans.filter(l => l.status === 'active' || l.status === 'overdue').slice(0, 5);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gradient text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Navigation */}
            <nav className="glass sticky top-0 z-50">
                <div className="container">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                                <span className="text-2xl font-bold" style={{ color: 'var(--primary-black)' }}>L</span>
                            </div>
                            <span className="text-2xl font-bold text-gradient">LendLedger</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link href="/loans" className="btn btn-ghost">
                                All Loans
                            </Link>
                            <Link href="/loans/new" className="btn btn-primary">
                                + Add Loan
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="container pt-12">
                {/* Header */}
                <div className="mb-12 animate-fadeIn">
                    <h1 className="heading-lg mb-2">Dashboard</h1>
                    <p style={{ color: 'var(--gray-400)' }}>
                        Overview of your loans and financial activity
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="glass-card p-6 animate-fadeIn" style={{ animationDelay: '0ms' }}>
                        <div className="flex items-center justify-between mb-4">
                            <span style={{ color: 'var(--gray-400)' }}>Total Lent</span>
                            <span className="text-2xl">💸</span>
                        </div>
                        <div className="text-3xl font-bold text-gradient">
                            {formatCurrency(stats.totalLent)}
                        </div>
                    </div>

                    <div className="glass-card p-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
                        <div className="flex items-center justify-between mb-4">
                            <span style={{ color: 'var(--gray-400)' }}>Total Borrowed</span>
                            <span className="text-2xl">💰</span>
                        </div>
                        <div className="text-3xl font-bold text-gradient">
                            {formatCurrency(stats.totalBorrowed)}
                        </div>
                    </div>

                    <div className="glass-card p-6 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                        <div className="flex items-center justify-between mb-4">
                            <span style={{ color: 'var(--gray-400)' }}>Active Loans</span>
                            <span className="text-2xl">📋</span>
                        </div>
                        <div className="text-3xl font-bold" style={{ color: 'var(--white)' }}>
                            {stats.activeLoans}
                        </div>
                    </div>

                    <div className="glass-card p-6 animate-fadeIn" style={{ animationDelay: '300ms' }}>
                        <div className="flex items-center justify-between mb-4">
                            <span style={{ color: 'var(--gray-400)' }}>Overdue</span>
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <div className="text-3xl font-bold" style={{ color: 'var(--error)' }}>
                            {stats.overdueLoans}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-8 mb-12 animate-fadeIn" style={{ animationDelay: '400ms' }}>
                    <h2 className="heading-sm mb-6">Quick Actions</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Link href="/loans/new" className="btn btn-primary justify-start p-6 h-auto flex-col items-start gap-3">
                            <span className="text-3xl">➕</span>
                            <div>
                                <div className="font-bold">Add New Loan</div>
                                <div className="text-sm opacity-80">Track money lent or borrowed</div>
                            </div>
                        </Link>

                        <Link href="/loans" className="btn btn-secondary justify-start p-6 h-auto flex-col items-start gap-3">
                            <span className="text-3xl">📊</span>
                            <div>
                                <div className="font-bold">View All Loans</div>
                                <div className="text-sm opacity-80">See complete history</div>
                            </div>
                        </Link>

                        <button className="btn btn-ghost justify-start p-6 h-auto flex-col items-start gap-3">
                            <span className="text-3xl">🔔</span>
                            <div>
                                <div className="font-bold">Set Reminders</div>
                                <div className="text-sm opacity-80">Never miss a payment</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Recent/Active Loans */}
                <div className="animate-fadeIn" style={{ animationDelay: '500ms' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="heading-sm">Active Loans</h2>
                        <Link href="/loans" className="text-gradient hover:underline">
                            View All →
                        </Link>
                    </div>

                    {activeLoans.length === 0 ? (
                        <div className="glass-card p-12 text-center">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="heading-sm mb-2">No Active Loans</h3>
                            <p className="mb-6" style={{ color: 'var(--gray-400)' }}>
                                Start tracking your loans to see them here
                            </p>
                            <Link href="/loans/new" className="btn btn-primary">
                                Add Your First Loan
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activeLoans.map((loan) => (
                                <div key={loan.id} className="glass-card p-6 hover:border-gold transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="heading-sm">{loan.contactName}</h3>
                                                <span className={`badge ${loan.type === 'lent' ? 'badge-success' : 'badge-warning'}`}>
                                                    {loan.type === 'lent' ? '💸 Lent' : '💰 Borrowed'}
                                                </span>
                                                <span className={`badge ${getStatusBadgeClass(loan.status)}`}>
                                                    {loan.status}
                                                </span>
                                            </div>
                                            {loan.notes && (
                                                <p className="text-sm mb-2" style={{ color: 'var(--gray-400)' }}>
                                                    {loan.notes}
                                                </p>
                                            )}
                                            <div className="text-sm" style={{ color: 'var(--gray-500)' }}>
                                                Due: {formatDate(loan.dueDate)}
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gradient mb-2">
                                                {formatCurrency(loan.amount, loan.currency)}
                                            </div>
                                            <Link href={`/loans/${loan.id}`} className="text-sm text-gradient hover:underline">
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Subscription Banner (for free users) */}
                {activeLoans.length >= 3 && (
                    <div className="glass-card p-8 mt-12 text-center animate-fadeIn" style={{
                        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(26, 26, 26, 0.8))',
                        borderColor: 'var(--primary-gold)'
                    }}>
                        <div className="text-4xl mb-4">⭐</div>
                        <h3 className="heading-md mb-2">Upgrade to Premium</h3>
                        <p className="mb-6" style={{ color: 'var(--gray-400)' }}>
                            Get unlimited loans, advanced analytics, and custom reminders
                        </p>
                        <button className="btn btn-primary">
                            Upgrade Now - $9/month
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
