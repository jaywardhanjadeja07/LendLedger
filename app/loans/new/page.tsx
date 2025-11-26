'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '../../lib/supabase';

export default function NewLoanPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            // Basic Validation
            if (!formData.contactName || !formData.amount || !formData.dueDate) {
                setError('Please fill in all required fields.');
                setLoading(false);
                return;
            }

            const { error: insertError } = await supabase.from('loans').insert({
                user_id: user.id,
                type: formData.type,
                contact_name: formData.contactName,
                contact_email: formData.contactEmail || null,
                contact_phone: formData.contactPhone || null,
                amount: parseFloat(formData.amount),
                currency: formData.currency,
                due_date: new Date(formData.dueDate).toISOString(),
                created_date: new Date().toISOString(),
                status: 'active',
                notes: formData.notes || null,
                interest_rate: formData.interestRate ? parseFloat(formData.interestRate) : null,
            });

            if (insertError) {
                console.error('Error creating loan:', insertError);
                setError(insertError.message || 'Failed to create loan. Please try again.');
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-20">
            {/* Navigation */}
            <nav className="glass sticky top-0 z-50 border-b border-white/10">
                <div className="container">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/dashboard" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                                <span className="text-2xl font-bold text-black">L</span>
                            </div>
                            <span className="text-2xl font-bold text-gradient hidden sm:block">LendLedger</span>
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
                        <h1 className="heading-lg mb-2 text-white">Add New Loan</h1>
                        <p className="text-gray-400">
                            Track money you lent or borrowed
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 animate-fadeIn">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
                        {/* Loan Type */}
                        <div>
                            <label className="block mb-3 font-semibold text-gray-300">Loan Type</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'lent' })}
                                    className={`btn ${formData.type === 'lent' ? 'btn-primary' : 'btn-ghost'} p-6 h-auto flex-col gap-2 transition-all`}
                                >
                                    <span className="text-3xl">💸</span>
                                    <span>I Lent Money</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'borrowed' })}
                                    className={`btn ${formData.type === 'borrowed' ? 'btn-primary' : 'btn-ghost'} p-6 h-auto flex-col gap-2 transition-all`}
                                >
                                    <span className="text-3xl">💰</span>
                                    <span>I Borrowed Money</span>
                                </button>
                            </div>
                        </div>

                        {/* Contact Name */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-300">
                                Contact Name <span className="text-error">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                className="input"
                                placeholder="e.g. John Doe"
                                value={formData.contactName}
                                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                            />
                        </div>

                        {/* Contact Details */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-semibold text-gray-300">Contact Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="john@example.com"
                                    value={formData.contactEmail}
                                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold text-gray-300">Contact Phone</label>
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
                                <label className="block mb-2 font-semibold text-gray-300">
                                    Amount <span className="text-error">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="input text-lg font-bold"
                                    placeholder="0.00"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold text-gray-300">Currency</label>
                                <select
                                    className="input"
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                    <option value="INR">INR (₹)</option>
                                    <option value="JPY">JPY (¥)</option>
                                </select>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-300">
                                Due Date <span className="text-error">*</span>
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
                            <label className="block mb-2 font-semibold text-gray-300 flex items-center gap-2">
                                Interest Rate (%)
                                <span className="badge-gold text-xs">PREMIUM</span>
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                className="input"
                                placeholder="e.g. 5.5"
                                value={formData.interestRate}
                                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-300">Notes</label>
                            <textarea
                                className="input min-h-24 resize-y"
                                placeholder="Add any additional details..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary flex-1 py-4 text-lg shadow-lg hover:shadow-gold/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></span>
                                        Saving...
                                    </span>
                                ) : (
                                    'Add Loan'
                                )}
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
