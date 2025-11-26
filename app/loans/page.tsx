'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loan } from '../lib/types';
import { formatDate, getStatusBadgeClass } from '../lib/utils';
import { formatINR } from '../lib/formatCurrency';
import { createClient } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoansPage() {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [filter, setFilter] = useState<'all' | 'lent' | 'borrowed' | 'active' | 'settled'>('all');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        loadLoans();

        const channel = supabase
            .channel('loans-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'loans',
                },
                (payload) => {
                    console.log('Realtime update:', payload);
                    loadLoans(); // Reload to get fresh data and ensure consistency
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const loadLoans = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            const { data, error } = await supabase
                .from('loans')
                .select('*')
                .order('created_date', { ascending: false });

            if (error) {
                console.error('Error fetching loans:', error);
                return;
            }

            if (data) {
                // Map snake_case to camelCase
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
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredLoans = loans.filter(loan => {
        // Apply filter
        if (filter === 'lent' && loan.type !== 'lent') return false;
        if (filter === 'borrowed' && loan.type !== 'borrowed') return false;
        if (filter === 'active' && loan.status === 'settled') return false;
        if (filter === 'settled' && loan.status !== 'settled') return false;

        // Apply search
        if (search && !loan.contactName.toLowerCase().includes(search.toLowerCase())) {
            return false;
        }

        return true;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 bg-black text-white">
            {/* Navigation */}
            <nav className="glass sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
                <div className="container">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/dashboard" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 relative transition-transform group-hover:scale-110">
                                <Image
                                    src="/assets/logo.png"
                                    alt="LendLedger Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-2xl font-bold text-white hidden sm:block group-hover:text-indigo-400 transition-colors">LendLedger</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="btn btn-ghost hover:text-indigo-400">
                                Dashboard
                            </Link>
                            <Link href="/loans/new" className="btn btn-primary shadow-neon">
                                + Add Loan
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="container pt-12">
                <div className="mb-8">
                    <h1 className="heading-lg mb-2 text-white">All Loans</h1>
                    <p className="text-gray-400">
                        Manage and track all your lending and borrowing
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="glass-card p-6 mb-8 bg-gray-900/50">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Search */}
                        <div className="flex-1 w-full md:max-w-sm">
                            <input
                                type="text"
                                placeholder="Search by contact name..."
                                className="input bg-black/50 border-gray-700 focus:border-indigo-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2 flex-wrap">
                            {(['all', 'lent', 'borrowed', 'active', 'settled'] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                        }`}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Loans List */}
                {filteredLoans.length === 0 ? (
                    <div className="glass-card p-12 text-center border-dashed border-2 border-gray-800">
                        <div className="text-6xl mb-4 opacity-50 grayscale">
                            {search ? '🔍' : '📝'}
                        </div>
                        <h3 className="heading-sm mb-2 text-white">
                            {search ? 'No Results Found' : 'No Loans Yet'}
                        </h3>
                        <p className="mb-6 text-gray-400">
                            {search ? 'Try a different search term' : 'Start by adding your first loan'}
                        </p>
                        {!search && (
                            <Link href="/loans/new" className="btn btn-primary">
                                Add Your First Loan
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredLoans.map((loan) => (
                            <div key={loan.id} className="glass-card p-6 hover:border-indigo-500/50 transition-all bg-gray-900/50 group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <h3 className="heading-sm text-white group-hover:text-indigo-400 transition-colors">{loan.contactName}</h3>
                                            <span className={`badge ${loan.type === 'lent' ? 'badge-blue' : 'badge-warning'}`}>
                                                {loan.type === 'lent' ? '💸 Lent' : '💰 Borrowed'}
                                            </span>
                                            <span className={`badge ${getStatusBadgeClass(loan.status)}`}>
                                                {loan.status}
                                            </span>
                                        </div>
                                        {loan.notes && (
                                            <p className="text-sm mb-2 text-gray-400">
                                                {loan.notes}
                                            </p>
                                        )}
                                        <div className="flex gap-4 text-sm text-gray-500">
                                            <span>Due: {formatDate(loan.dueDate)}</span>
                                            <span>Created: {formatDate(loan.createdDate)}</span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className={`text-2xl font-bold mb-2 ${loan.type === 'lent' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {formatINR(loan.amount)}
                                        </div>
                                        <div className="flex gap-2 justify-end">
                                            <Link href={`/loans/${loan.id}`} className="btn btn-ghost text-sm hover:text-indigo-400">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
