'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loan } from '../lib/types';
import { calculateDashboardStats, formatCurrency, formatDate, getStatusBadgeClass } from '../lib/utils';
import { createClient } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    // Middleware handles redirect, but good to have a fallback
                }

                if (user) {
                    const { data, error } = await supabase
                        .from('loans')
                        .select('*')
                        .order('created_date', { ascending: false });

                    if (data) {
                        const mappedLoans: Loan[] = data.map((item: any) => ({
                            id: item.id,
                            userId: item.user_id,
                            type: item.type,
                            contactName: item.contact_name,
                            contactEmail: item.contact_email,
                            contactPhone: item.contact_phone,
                            amount: item.amount,
                            currency: item.currency,
                            dueDate: new Date(item.due_date),
                            createdDate: new Date(item.created_date),
                            status: item.status,
                            interestRate: item.interest_rate,
                            notes: item.notes,
                            settledDate: item.settled_date ? new Date(item.settled_date) : undefined,
                        }));
                        setLoans(mappedLoans);
                    }
                }
            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const stats = calculateDashboardStats(loans);
    const activeLoans = loans.filter(l => l.status === 'active' || l.status === 'overdue').slice(0, 5);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                    <div className="animate-pulse text-gradient text-xl font-semibold">Loading Financial Data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Navigation */}
            <nav className="glass sticky top-0 z-50 border-b border-white/10">
                <div className="container">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
                                <span className="text-2xl font-bold text-black">L</span>
                            </div>
                            <span className="text-2xl font-bold text-gradient hidden sm:block">LendLedger</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link href="/loans" className="btn btn-ghost hidden sm:inline-flex">
                                All Loans
                            </Link>
                            <Link href="/loans/new" className="btn btn-primary">
                                <span className="text-lg">+</span> <span className="hidden sm:inline">Add Loan</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="container pt-12">
                {/* Header */}
                <div className="mb-12 animate-fadeIn">
                    <h1 className="heading-lg mb-2 text-white">Dashboard</h1>
                    <p className="text-gray-400 text-lg">
                        Overview of your financial activity
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="glass-card p-6 animate-fadeIn hover:scale-[1.02] transition-transform" style={{ animationDelay: '0ms' }}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 font-medium">Total Lent</span>
                            <span className="text-2xl bg-white/5 p-2 rounded-lg">💸</span>
                        </div>
                        <div className="text-3xl font-bold text-gradient">
                            {formatCurrency(stats.totalLent)}
                        </div>
                    </div>

                    <div className="glass-card p-6 animate-fadeIn hover:scale-[1.02] transition-transform" style={{ animationDelay: '100ms' }}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 font-medium">Total Borrowed</span>
                            <span className="text-2xl bg-white/5 p-2 rounded-lg">💰</span>
                        </div>
                        <div className="text-3xl font-bold text-gradient">
                            {formatCurrency(stats.totalBorrowed)}
                        </div>
                    </div>

                    <div className="glass-card p-6 animate-fadeIn hover:scale-[1.02] transition-transform" style={{ animationDelay: '200ms' }}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 font-medium">Active Loans</span>
                            <span className="text-2xl bg-white/5 p-2 rounded-lg">📋</span>
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {stats.activeLoans}
                        </div>
                    </div>

                    <div className="glass-card p-6 animate-fadeIn hover:scale-[1.02] transition-transform" style={{ animationDelay: '300ms' }}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 font-medium">Overdue</span>
                            <span className="text-2xl bg-white/5 p-2 rounded-lg">⚠️</span>
                        </div>
                        <div className="text-3xl font-bold text-error">
                            {stats.overdueLoans}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-8 mb-12 animate-fadeIn" style={{ animationDelay: '400ms' }}>
                    <h2 className="heading-sm mb-6 text-white">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/loans/new" className="btn btn-primary justify-start p-6 h-auto flex-col items-start gap-3 group">
                            <span className="text-3xl group-hover:scale-110 transition-transform">➕</span>
                            <div>
                                <div className="font-bold text-lg">Add New Loan</div>
                                <div className="text-sm opacity-80 font-normal">Track money lent or borrowed</div>
                            </div>
                        </Link>

                        <Link href="/loans" className="btn btn-secondary justify-start p-6 h-auto flex-col items-start gap-3 group">
                            <span className="text-3xl group-hover:scale-110 transition-transform">📊</span>
                            <div>
                                <div className="font-bold text-lg">View All Loans</div>
                                <div className="text-sm opacity-80 font-normal">See complete history</div>
                            </div>
                        </Link>

                        <button className="btn btn-ghost justify-start p-6 h-auto flex-col items-start gap-3 group border-white/10 hover:border-white/20">
                            <span className="text-3xl group-hover:scale-110 transition-transform">🔔</span>
                            <div>
                                <div className="font-bold text-lg">Set Reminders</div>
                                <div className="text-sm opacity-80 font-normal">Never miss a payment</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Recent/Active Loans */}
                <div className="animate-fadeIn" style={{ animationDelay: '500ms' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="heading-sm text-white">Active Loans</h2>
                        <Link href="/loans" className="text-gradient hover:opacity-80 transition-opacity font-medium">
                            View All →
                        </Link>
                    </div>

                    {activeLoans.length === 0 ? (
                        <div className="glass-card p-12 text-center border-dashed border-2 border-white/10">
                            <div className="text-6xl mb-4 opacity-50">📝</div>
                            <h3 className="heading-sm mb-2 text-white">No Active Loans</h3>
                            <p className="mb-6 text-gray-400 max-w-md mx-auto">
                                Start tracking your loans to see them here. Your financial dashboard is waiting!
                            </p>
                            <Link href="/loans/new" className="btn btn-primary">
                                Add Your First Loan
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activeLoans.map((loan) => (
                                <div key={loan.id} className="glass-card p-6 hover:border-gold/50 transition-all group cursor-pointer" onClick={() => router.push(`/loans/${loan.id}`)}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <h3 className="heading-sm text-white group-hover:text-gradient transition-colors">{loan.contactName}</h3>
                                                <span className={`badge ${loan.type === 'lent' ? 'badge-success' : 'badge-warning'}`}>
                                                    {loan.type === 'lent' ? '💸 Lent' : '💰 Borrowed'}
                                                </span>
                                                <span className={`badge ${getStatusBadgeClass(loan.status)}`}>
                                                    {loan.status}
                                                </span>
                                            </div>
                                            {loan.notes && (
                                                <p className="text-sm mb-2 text-gray-400 line-clamp-1">
                                                    {loan.notes}
                                                </p>
                                            )}
                                            <div className="text-sm text-gray-500 flex gap-4">
                                                <span>Due: {formatDate(loan.dueDate)}</span>
                                            </div>
                                        </div>

                                        <div className="text-right flex flex-row md:flex-col justify-between items-center md:items-end">
                                            <div className="text-2xl font-bold text-gradient mb-1">
                                                {formatCurrency(loan.amount, loan.currency)}
                                            </div>
                                            <span className="text-sm text-gray-500 group-hover:text-primary-gold transition-colors">
                                                View Details →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Subscription Banner (for free users) */}
                {activeLoans.length >= 3 && (
                    <div className="glass-card p-8 mt-12 text-center animate-fadeIn relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-gold opacity-5 group-hover:opacity-10 transition-opacity"></div>
                        <div className="relative z-10">
                            <div className="text-4xl mb-4">⭐</div>
                            <h3 className="heading-md mb-2 text-white">Upgrade to Premium</h3>
                            <p className="mb-6 text-gray-400 max-w-lg mx-auto">
                                Get unlimited loans, advanced analytics, and custom reminders. Unlock the full potential of LendLedger.
                            </p>
                            <button className="btn btn-primary">
                                Upgrade Now - $9/month
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
