'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loan } from '../lib/types';
import { loansStorage } from '../lib/storage';
import { formatCurrency, formatDate, getStatusBadgeClass } from '../lib/utils';

export default function LoansPage() {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [filter, setFilter] = useState<'all' | 'lent' | 'borrowed' | 'active' | 'settled'>('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadLoans();
    }, []);

    const loadLoans = () => {
        const allLoans = loansStorage.getAll();
        setLoans(allLoans);
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

    return (
        <div className="min-h-screen pb-20">
            {/* Navigation */}
            <nav className="glass sticky top-0 z-50">
                <div className="container">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                                <span className="text-2xl font-bold" style={{ color: 'var(--primary-black)' }}>L</span>
                            </div>
                            <span className="text-2xl font-bold text-gradient">LendLedger</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="btn btn-ghost">
                                Dashboard
                            </Link>
                            <Link href="/loans/new" className="btn btn-primary">
                                + Add Loan
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="container pt-12">
                <div className="mb-8">
                    <h1 className="heading-lg mb-2">All Loans</h1>
                    <p style={{ color: 'var(--gray-400)' }}>
                        Manage and track all your lending and borrowing
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="glass-card p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Search */}
                        <div className="flex-1 w-full md:max-w-sm">
                            <input
                                type="text"
                                placeholder="Search by contact name..."
                                className="input"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setFilter('all')}
                                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('lent')}
                                className={`btn ${filter === 'lent' ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                Lent
                            </button>
                            <button
                                onClick={() => setFilter('borrowed')}
                                className={`btn ${filter === 'borrowed' ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                Borrowed
                            </button>
                            <button
                                onClick={() => setFilter('active')}
                                className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setFilter('settled')}
                                className={`btn ${filter === 'settled' ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                Settled
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loans List */}
                {filteredLoans.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <div className="text-6xl mb-4">
                            {search ? '🔍' : '📝'}
                        </div>
                        <h3 className="heading-sm mb-2">
                            {search ? 'No Results Found' : 'No Loans Yet'}
                        </h3>
                        <p className="mb-6" style={{ color: 'var(--gray-400)' }}>
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
                            <div key={loan.id} className="glass-card p-6 hover:border-gold transition-all">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
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
                                        <div className="flex gap-4 text-sm" style={{ color: 'var(--gray-500)' }}>
                                            <span>Due: {formatDate(loan.dueDate)}</span>
                                            <span>Created: {formatDate(loan.createdDate)}</span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-gradient mb-2">
                                            {formatCurrency(loan.amount, loan.currency)}
                                        </div>
                                        <div className="flex gap-2">
                                            <Link href={`/loans/${loan.id}`} className="btn btn-ghost text-sm">
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
