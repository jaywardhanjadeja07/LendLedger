'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Loan } from '../../lib/types';
import { formatCurrency, formatDate, getStatusBadgeClass, daysUntilDue } from '../../lib/utils';
import { createClient } from '../../lib/supabase';

export default function LoanDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const [loan, setLoan] = useState<Loan | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchLoan = async () => {
            const id = params.id as string;
            if (!id) return;

            const { data, error } = await supabase
                .from('loans')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching loan:', error);
            } else if (data) {
                setLoan({
                    id: data.id,
                    userId: data.user_id,
                    type: data.type,
                    contactName: data.contact_name,
                    contactEmail: data.contact_email,
                    contactPhone: data.contact_phone,
                    amount: data.amount,
                    currency: data.currency,
                    dueDate: new Date(data.due_date),
                    createdDate: new Date(data.created_date),
                    status: data.status,
                    interestRate: data.interest_rate,
                    notes: data.notes,
                    settledDate: data.settled_date ? new Date(data.settled_date) : undefined,
                });
            }
            setLoading(false);
        };

        fetchLoan();
    }, [params.id]);

    const handleMarkAsSettled = async () => {
        if (!loan) return;

        const { error } = await supabase
            .from('loans')
            .update({ status: 'settled', settled_date: new Date().toISOString() })
            .eq('id', loan.id);

        if (error) {
            console.error('Error updating loan:', error);
            alert('Failed to update loan');
        } else {
            router.push('/dashboard');
            router.refresh();
        }
    };

    const handleDelete = async () => {
        if (!loan) return;

        if (confirm('Are you sure you want to delete this loan? This action cannot be undone.')) {
            const { error } = await supabase
                .from('loans')
                .delete()
                .eq('id', loan.id);

            if (error) {
                console.error('Error deleting loan:', error);
                alert('Failed to delete loan');
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    if (!loan) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="heading-md mb-4">Loan Not Found</h2>
                    <Link href="/dashboard" className="btn btn-primary">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const daysRemaining = daysUntilDue(loan.dueDate);

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
                        <Link href="/loans" className="btn btn-ghost">
                            All Loans
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Loan Details */}
            <div className="container pt-12">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href="/loans" className="text-gradient hover:underline mb-4 inline-block">
                            ← Back to Loans
                        </Link>
                        <h1 className="heading-lg mb-2">{loan.contactName}</h1>
                        <div className="flex gap-2 flex-wrap">
                            <span className={`badge ${loan.type === 'lent' ? 'badge-success' : 'badge-warning'}`}>
                                {loan.type === 'lent' ? '💸 Lent' : '💰 Borrowed'}
                            </span>
                            <span className={`badge ${getStatusBadgeClass(loan.status)}`}>
                                {loan.status}
                            </span>
                        </div>
                    </div>

                    {/* Main Info Card */}
                    <div className="glass-card p-8 mb-6">
                        <div className="text-center mb-8">
                            <div className="text-5xl font-bold text-gradient mb-2">
                                {formatCurrency(loan.amount, loan.currency)}
                            </div>
                            <div style={{ color: 'var(--gray-400)' }}>Total Amount</div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm mb-1" style={{ color: 'var(--gray-500)' }}>Due Date</div>
                                <div className="font-semibold text-lg">{formatDate(loan.dueDate)}</div>
                                {loan.status !== 'settled' && (
                                    <div className="text-sm mt-1" style={{
                                        color: daysRemaining < 0 ? 'var(--error)' : daysRemaining < 7 ? 'var(--warning)' : 'var(--success)'
                                    }}>
                                        {daysRemaining < 0
                                            ? `${Math.abs(daysRemaining)} days overdue`
                                            : daysRemaining === 0
                                                ? 'Due today!'
                                                : `${daysRemaining} days remaining`}
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="text-sm mb-1" style={{ color: 'var(--gray-500)' }}>Created Date</div>
                                <div className="font-semibold text-lg">{formatDate(loan.createdDate)}</div>
                            </div>

                            {loan.settledDate && (
                                <div>
                                    <div className="text-sm mb-1" style={{ color: 'var(--gray-500)' }}>Settled Date</div>
                                    <div className="font-semibold text-lg">{formatDate(loan.settledDate)}</div>
                                </div>
                            )}

                            {loan.interestRate && (
                                <div>
                                    <div className="text-sm mb-1" style={{ color: 'var(--gray-500)' }}>
                                        Interest Rate <span className="badge-gold text-xs ml-1">PREMIUM</span>
                                    </div>
                                    <div className="font-semibold text-lg">{loan.interestRate}%</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="glass-card p-6 mb-6">
                        <h2 className="heading-sm mb-4">Contact Information</h2>
                        <div className="space-y-3">
                            <div>
                                <div className="text-sm" style={{ color: 'var(--gray-500)' }}>Name</div>
                                <div className="font-semibold">{loan.contactName}</div>
                            </div>
                            {loan.contactEmail && (
                                <div>
                                    <div className="text-sm" style={{ color: 'var(--gray-500)' }}>Email</div>
                                    <a href={`mailto:${loan.contactEmail}`} className="font-semibold text-gradient hover:underline">
                                        {loan.contactEmail}
                                    </a>
                                </div>
                            )}
                            {loan.contactPhone && (
                                <div>
                                    <div className="text-sm" style={{ color: 'var(--gray-500)' }}>Phone</div>
                                    <a href={`tel:${loan.contactPhone}`} className="font-semibold text-gradient hover:underline">
                                        {loan.contactPhone}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    {loan.notes && (
                        <div className="glass-card p-6 mb-6">
                            <h2 className="heading-sm mb-4">Notes</h2>
                            <p style={{ color: 'var(--gray-300)' }}>{loan.notes}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="glass-card p-6">
                        <h2 className="heading-sm mb-4">Actions</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {loan.status !== 'settled' && (
                                <button onClick={handleMarkAsSettled} className="btn btn-primary">
                                    ✓ Mark as Settled
                                </button>
                            )}
                            <button className="btn btn-secondary">
                                🔔 Set Reminder
                            </button>
                            <button className="btn btn-ghost">
                                ✏️ Edit Loan
                            </button>
                            <button onClick={handleDelete} className="btn btn-ghost" style={{ color: 'var(--error)' }}>
                                🗑️ Delete Loan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
