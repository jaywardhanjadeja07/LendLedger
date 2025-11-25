'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loan } from '../../lib/types';
import { loansStorage, userStorage } from '../../lib/storage';
import { generateId } from '../../lib/utils';

export default function NewLoanPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        type: 'lent' as 'lent' | 'borrowed',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        amount: '',
        currency: 'USD',
        dueDate: '',
        notes: '',
        interestRate: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const user = userStorage.get();
        if (!user) {
            alert('Please log in to add loans');
            return;
        }

        const newLoan: Loan = {
            id: generateId(),
            userId: user.id,
            type: formData.type,
            contactName: formData.contactName,
            contactEmail: formData.contactEmail || undefined,
            contactPhone: formData.contactPhone || undefined,
            amount: parseFloat(formData.amount),
            currency: formData.currency,
            dueDate: new Date(formData.dueDate),
            createdDate: new Date(),
            status: 'active',
            notes: formData.notes || undefined,
            interestRate: formData.interestRate ? parseFloat(formData.interestRate) : undefined,
        };

        loansStorage.add(newLoan);
        router.push('/dashboard');
    };

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

                        <Link href="/dashboard" className="btn btn-ghost">
                            Cancel
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Form */}
            <div className="container pt-12">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8 animate-fadeIn">
                        <h1 className="heading-lg mb-2">Add New Loan</h1>
                        <p style={{ color: 'var(--gray-400)' }}>
                            Track money you lent or borrowed
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                        {/* Loan Type */}
                        <div>
                            <label className="block mb-3 font-semibold">Loan Type</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'lent' })}
                                    className={`btn ${formData.type === 'lent' ? 'btn-primary' : 'btn-ghost'} p-6 h-auto flex-col gap-2`}
                                >
                                    <span className="text-3xl">💸</span>
                                    <span>I Lent Money</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'borrowed' })}
                                    className={`btn ${formData.type === 'borrowed' ? 'btn-primary' : 'btn-ghost'} p-6 h-auto flex-col gap-2`}
                                >
                                    <span className="text-3xl">💰</span>
                                    <span>I Borrowed Money</span>
                                </button>
                            </div>
                        </div>

                        {/* Contact Name */}
                        <div>
                            <label className="block mb-2 font-semibold">
                                Contact Name <span style={{ color: 'var(--error)' }}>*</span>
                            </label>
                            <input
                                type="text"
                                required
                                className="input"
                                placeholder="John Doe"
                                value={formData.contactName}
                                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                            />
                        </div>

                        {/* Contact Details */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-semibold">Contact Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="john@example.com"
                                    value={formData.contactEmail}
                                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold">Contact Phone</label>
                                <input
                                    type="tel"
                                    className="input"
                                    placeholder="+1 234 567 8900"
                                    value={formData.contactPhone}
                                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Amount and Currency */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <label className="block mb-2 font-semibold">
                                    Amount <span style={{ color: 'var(--error)' }}>*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="input"
                                    placeholder="1000.00"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold">Currency</label>
                                <select
                                    className="input"
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="INR">INR</option>
                                    <option value="JPY">JPY</option>
                                </select>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block mb-2 font-semibold">
                                Due Date <span style={{ color: 'var(--error)' }}>*</span>
                            </label>
                            <input
                                type="date"
                                required
                                className="input"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>

                        {/* Interest Rate (Premium Feature) */}
                        <div>
                            <label className="block mb-2 font-semibold flex items-center gap-2">
                                Interest Rate (%)
                                <span className="badge-gold text-xs">PREMIUM</span>
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                className="input"
                                placeholder="5.5"
                                value={formData.interestRate}
                                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block mb-2 font-semibold">Notes</label>
                            <textarea
                                className="input min-h-24"
                                placeholder="Add any additional details..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4 pt-4">
                            <button type="submit" className="btn btn-primary flex-1">
                                Add Loan
                            </button>
                            <Link href="/dashboard" className="btn btn-ghost flex-1">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
