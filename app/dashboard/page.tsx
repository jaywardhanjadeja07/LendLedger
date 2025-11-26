'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loan } from '../lib/types';
import { calculateDashboardStats, formatDate, getStatusBadgeClass } from '../lib/utils';
import { formatINR } from '../lib/formatCurrency';
import { createClient } from '../lib/supabase';
import { useRouter } from 'next/navigation';

type FilterType = 'all' | 'lent' | 'borrowed' | 'pending' | 'overdue';

export default function Dashboard() {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);
    const [filter, setFilter] = useState<FilterType>('all');
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
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
                        setFilteredLoans(mappedLoans);
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

    useEffect(() => {
        let result = loans;
        if (filter === 'lent') result = loans.filter(l => l.type === 'lent');
        if (filter === 'borrowed') result = loans.filter(l => l.type === 'borrowed');
        if (filter === 'pending') result = loans.filter(l => l.status === 'active');
        if (filter === 'overdue') result = loans.filter(l => l.status === 'overdue');
        setFilteredLoans(result);
    }, [filter, loans]);

    const handleMarkAsRepaid = async (e: React.MouseEvent, loan: Loan) => {
        e.stopPropagation();
        if (!confirm('Mark this loan as fully repaid?')) return;

        try {
            const { error } = await supabase
                .from('loans')
                .update({ status: 'settled', settled_date: new Date().toISOString() })
                .eq('id', loan.id);

            if (!error) {
                const updatedLoans = loans.map(l =>
                    l.id === loan.id ? { ...l, status: 'settled' as const, settledDate: new Date() } : l
                );
                setLoans(updatedLoans);
            }
        } catch (error) {
            console.error('Error updating loan:', error);
        }
    };

    const getDaysOverdue = (dueDate: Date) => {
        const diff = new Date().getTime() - new Date(dueDate).getTime();
        return Math.floor(diff / (1000 * 3600 * 24));
    };

    const stats = calculateDashboardStats(loans);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <div className="animate-pulse text-blue-400 text-xl font-semibold">Loading Financial Data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 bg-gray-900 text-white">
            {/* Navigation */}
            <nav className="glass sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur-md">
                <div className="container">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 relative">
                                <Image
                                    src="/assets/logo-promo.png"
                                    alt="LendLedger Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-2xl font-bold text-white hidden sm:block">LendLedger</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link href="/loans" className="btn btn-ghost hidden sm:inline-flex hover:text-blue-400">
                                All Loans
                            </Link>
                            <Link href="/loans/new" className="btn btn-primary shadow-blue-lg">
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
                    <div className="glass-card p-6 animate-fadeIn hover:scale-[1.02] transition-transform border-l-4 border-l-blue-500">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 font-medium">Total Lent</span>
                            <span className="text-2xl bg-blue-500/10 p-2 rounded-lg text-blue-500">💸</span>
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {formatINR(stats.totalLent)}
                        </div>
                    </div>

                    <div className="glass-card p-6 animate-fadeIn hover:scale-[1.02] transition-transform border-l-4 border-l-purple-500">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 font-medium">Total Borrowed</span>
                            <span className="text-2xl bg-purple-500/10 p-2 rounded-lg text-purple-500">💰</span>
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {formatINR(stats.totalBorrowed)}
                        </div>
                    </div>

                    <div className="glass-card p-6 animate-fadeIn hover:scale-[1.02] transition-transform border-l-4 border-l-green-500">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 font-medium">Active Loans</span>
                            <span className="text-2xl bg-green-500/10 p-2 rounded-lg text-green-500">📋</span>
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {stats.activeLoans}
                        </div>
                    </div>

                    <div className="glass-card p-6 animate-fadeIn hover:scale-[1.02] transition-transform border-l-4 border-l-red-500">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 font-medium">Overdue</span>
                            <span className="text-2xl bg-red-500/10 p-2 rounded-lg text-red-500">⚠️</span>
                        </div>
                        <div className="text-3xl font-bold text-red-400">
                            {stats.overdueLoans}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-8 mb-12 animate-fadeIn bg-gradient-to-br from-gray-800 to-gray-900">
                    <h2 className="heading-sm mb-6 text-white">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/loans/new" className="btn btn-primary justify-start p-6 h-auto flex-col items-start gap-3 group border border-blue-500/30">
                            <span className="text-3xl group-hover:scale-110 transition-transform">➕</span>
                            <div>
                                <div className="font-bold text-lg">Add New Loan</div>
                                <div className="text-sm opacity-80 font-normal">Track money lent or borrowed</div>
                            </div>
                        </Link>

                        <Link href="/loans" className="btn btn-secondary justify-start p-6 h-auto flex-col items-start gap-3 group border-gray-600 hover:border-blue-400">
                            <span className="text-3xl group-hover:scale-110 transition-transform">📊</span>
                            <div>
                                <div className="font-bold text-lg">View All Loans</div>
                                <div className="text-sm opacity-80 font-normal">See complete history</div>
                            </div>
                        </Link>

                        <button className="btn btn-ghost justify-start p-6 h-auto flex-col items-start gap-3 group border-gray-700 hover:border-blue-400 hover:bg-gray-800">
                            <span className="text-3xl group-hover:scale-110 transition-transform">🔔</span>
                            <div>
                                <div className="font-bold text-lg">Set Reminders</div>
                                <div className="text-sm opacity-80 font-normal">Never miss a payment</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Recent/Active Loans */}
                <div className="animate-fadeIn">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <h2 className="heading-sm text-white">Transactions</h2>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2">
                            {(['all', 'lent', 'borrowed', 'pending', 'overdue'] as FilterType[]).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === f
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                        }`}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredLoans.length === 0 ? (
                        <div className="glass-card p-12 text-center border-dashed border-2 border-gray-700">
                            <div className="text-6xl mb-4 opacity-50 grayscale">📝</div>
                            <h3 className="heading-sm mb-2 text-white">No transactions found</h3>
                            <p className="mb-6 text-gray-400 max-w-md mx-auto">
                                {filter === 'all' ? "Start tracking your loans to see them here." : `No ${filter} transactions found.`}
                            </p>
                            <Link href="/loans/new" className="btn btn-primary">
                                Add Transaction
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredLoans.map((loan) => (
                                <div key={loan.id} className="glass-card p-5 hover:border-blue-500/50 transition-all group cursor-pointer bg-gray-800/50" onClick={() => router.push(`/loans/${loan.id}`)}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                {/* Avatar Initials */}
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${loan.type === 'lent' ? 'bg-blue-900/50 text-blue-400' : 'bg-purple-900/50 text-purple-400'}`}>
                                                    {loan.contactName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                </div>

                                                <div>
                                                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{loan.contactName}</h3>
                                                    <p className="text-xs text-gray-500">{formatDate(loan.createdDate)}</p>
                                                </div>

                                                <span className={`badge ml-2 ${loan.type === 'lent' ? 'badge-blue' : 'badge-warning'}`}>
                                                    {loan.type === 'lent' ? 'Lent' : 'Borrowed'}
                                                </span>

                                                {loan.status === 'overdue' && (
                                                    <span className="badge badge-error animate-pulse">
                                                        {getDaysOverdue(loan.dueDate)} days overdue
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 justify-between md:justify-end">
                                            <div className="text-right">
                                                <div className={`text-xl font-bold ${loan.type === 'lent' ? 'text-green-400' : 'text-red-400'}`}>
                                                    {loan.type === 'lent' ? '+' : '-'} {formatINR(loan.amount)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Due: {formatDate(loan.dueDate)}
                                                </div>
                                            </div>

                                            {loan.status === 'active' || loan.status === 'overdue' ? (
                                                <button
                                                    onClick={(e) => handleMarkAsRepaid(e, loan)}
                                                    className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 text-xs font-bold transition-colors"
                                                >
                                                    Mark Paid
                                                </button>
                                            ) : (
                                                <span className="px-3 py-1.5 rounded-lg bg-gray-700/50 text-gray-400 text-xs font-bold">
                                                    Settled
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Subscription Banner */}
                <div className="glass-card p-8 mt-12 text-center animate-fadeIn relative overflow-hidden group border-blue-500/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <div className="text-4xl mb-4">⭐</div>
                        <h3 className="heading-md mb-2 text-white">Upgrade to Premium</h3>
                        <p className="mb-6 text-gray-400 max-w-lg mx-auto">
                            Get unlimited loans, advanced analytics, and custom reminders. Unlock the full potential of LendLedger.
                        </p>
                        <button className="btn btn-primary">
                            Upgrade Now - ₹79/month
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
