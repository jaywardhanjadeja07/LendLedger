'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '../../lib/supabase';
import { formatINR } from '../../lib/formatCurrency';

export default function NewLoanPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reminderTone, setReminderTone] = useState<'friendly' | 'urgent' | 'legal'>('friendly');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        type: 'lent' as 'lent' | 'borrowed',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        amount: '',
        currency: 'INR',
        dueDate: '',
        notes: '',
        interestRate: '',
    });

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

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

            // In a real app, we would upload the photo to Supabase Storage here
            // and get the URL to save in the database.
            // const photoUrl = await uploadPhoto(photoFile);

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
                // photo_url: photoUrl // Add this column to DB if needed
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

    const getReminderPreview = () => {
        const amount = formData.amount ? formatINR(formData.amount) : '[Amount]';
        const name = formData.contactName || '[Name]';

        if (reminderTone === 'friendly') {
            return `Hi ${name} 👋, just a friendly reminder about the ${amount} loan. Hope everything is going well! Let me know when you can settle this.`;
        } else if (reminderTone === 'urgent') {
            return `Hello ${name}, this is a reminder that the payment of ${amount} is due soon. Please arrange for the transfer at your earliest convenience.`;
        } else {
            return `NOTICE: Outstanding payment of ${amount} is pending. Please settle immediately to avoid any further action. Reference: Loan to ${name}.`;
        }
    };

    return (
        <div className="min-h-screen pb-20 bg-black text-white font-sans">
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
                            <span className="text-2xl font-bold text-white hidden sm:block tracking-tight group-hover:text-indigo-400 transition-colors">LendLedger</span>
                        </Link>

                        <Link href="/dashboard" className="btn btn-ghost hover:text-indigo-400">
                            Cancel
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Form */}
            <div className="container pt-12">
                <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="mb-8 animate-fadeIn">
                            <h1 className="heading-lg mb-2 text-white font-bold">Add New Loan</h1>
                            <p className="text-gray-400 text-lg">
                                Track money you lent or borrowed
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 animate-fadeIn flex items-center gap-2">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-8 animate-fadeIn bg-gray-900/40 border-indigo-500/20 shadow-xl" style={{ animationDelay: '100ms' }}>
                            {/* Loan Type */}
                            <div>
                                <label className="block mb-4 font-semibold text-gray-300 text-sm uppercase tracking-wider">Transaction Type</label>
                                <div className="grid grid-cols-2 gap-6">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'lent' })}
                                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${formData.type === 'lent'
                                                ? 'bg-indigo-600/20 border-indigo-500 shadow-neon scale-[1.02]'
                                                : 'bg-gray-800/50 border-gray-700 hover:border-gray-500 hover:bg-gray-800'
                                            }`}
                                    >
                                        <div className={`text-4xl mb-1 ${formData.type === 'lent' ? 'scale-110' : 'grayscale opacity-70'} transition-all`}>💸</div>
                                        <span className={`font-bold ${formData.type === 'lent' ? 'text-white' : 'text-gray-400'}`}>I Lent Money</span>
                                        {formData.type === 'lent' && <div className="absolute top-3 right-3 w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'borrowed' })}
                                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${formData.type === 'borrowed'
                                                ? 'bg-violet-600/20 border-violet-500 shadow-neon scale-[1.02]'
                                                : 'bg-gray-800/50 border-gray-700 hover:border-gray-500 hover:bg-gray-800'
                                            }`}
                                    >
                                        <div className={`text-4xl mb-1 ${formData.type === 'borrowed' ? 'scale-110' : 'grayscale opacity-70'} transition-all`}>💰</div>
                                        <span className={`font-bold ${formData.type === 'borrowed' ? 'text-white' : 'text-gray-400'}`}>I Borrowed Money</span>
                                        {formData.type === 'borrowed' && <div className="absolute top-3 right-3 w-3 h-3 bg-violet-500 rounded-full shadow-lg shadow-violet-500/50"></div>}
                                    </button>
                                </div>
                            </div>

                            <div className="h-px bg-gray-700/50 w-full"></div>

                            {/* Contact Info */}
                            <div>
                                <label className="block mb-4 font-semibold text-gray-300 text-sm uppercase tracking-wider">Contact Details</label>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* Photo Upload */}
                                    <div className="flex-shrink-0">
                                        <div
                                            className="w-24 h-24 rounded-full bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-gray-800/80 transition-all relative overflow-hidden group"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {photoPreview ? (
                                                <Image src={photoPreview} alt="Preview" fill className="object-cover" />
                                            ) : (
                                                <div className="text-center p-2">
                                                    <span className="text-2xl block mb-1">📷</span>
                                                    <span className="text-[10px] text-gray-400 uppercase font-bold">Add Photo</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-xs font-bold text-white">Change</span>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                        />
                                    </div>

                                    <div className="flex-grow space-y-4 w-full">
                                        <div>
                                            <label className="block mb-1.5 text-sm text-gray-400">Name <span className="text-red-400">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                className="input w-full bg-black/50 border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                                placeholder="e.g. John Doe"
                                                value={formData.contactName}
                                                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-1.5 text-sm text-gray-400">Email (Optional)</label>
                                                <input
                                                    type="email"
                                                    className="input w-full bg-black/50 border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                                    placeholder="john@example.com"
                                                    value={formData.contactEmail}
                                                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1.5 text-sm text-gray-400">Phone (Optional)</label>
                                                <input
                                                    type="tel"
                                                    className="input w-full bg-black/50 border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                                    placeholder="+91 98765 43210"
                                                    value={formData.contactPhone}
                                                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-gray-700/50 w-full"></div>

                            {/* Financial Details */}
                            <div>
                                <label className="block mb-4 font-semibold text-gray-300 text-sm uppercase tracking-wider">Financial Details</label>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-1.5 text-sm text-gray-400">Amount <span className="text-red-400">*</span></label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                step="0.01"
                                                className="input w-full pl-10 text-xl font-bold bg-black/50 border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                                placeholder="0.00"
                                                value={formData.amount}
                                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-1.5 text-sm text-gray-400">Due Date <span className="text-red-400">*</span></label>
                                        <input
                                            type="date"
                                            required
                                            className="input w-full bg-black/50 border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                            value={formData.dueDate}
                                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1.5 text-sm text-gray-400 flex items-center gap-2">
                                        Interest Rate (%)
                                        <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">PREMIUM</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="input w-full md:w-1/2 bg-black/50 border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                        placeholder="e.g. 5.5"
                                        value={formData.interestRate}
                                        onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="h-px bg-gray-700/50 w-full"></div>

                            {/* Notes */}
                            <div>
                                <label className="block mb-1.5 text-sm text-gray-400 font-semibold uppercase tracking-wider">Notes</label>
                                <textarea
                                    className="input w-full min-h-24 resize-y bg-black/50 border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    placeholder="Add any additional details about this transaction..."
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full py-4 text-lg font-bold shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                                            Saving Transaction...
                                        </span>
                                    ) : (
                                        'Save Transaction'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar / Preview */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Reminder Preview */}
                        <div className="glass-card p-6 bg-gray-900/40 border-indigo-500/20 animate-fadeIn sticky top-24" style={{ animationDelay: '200ms' }}>
                            <h3 className="heading-sm mb-4 text-white flex items-center gap-2 font-bold">
                                <span>📱</span> Reminder Preview
                            </h3>

                            <div className="mb-4">
                                <label className="text-xs text-gray-400 mb-2 block font-semibold uppercase">Tone</label>
                                <div className="flex gap-2 p-1 bg-black rounded-lg border border-gray-700">
                                    {(['friendly', 'urgent', 'legal'] as const).map(tone => (
                                        <button
                                            key={tone}
                                            onClick={() => setReminderTone(tone)}
                                            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${reminderTone === tone
                                                ? 'bg-indigo-600 text-white shadow-lg'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                }`}
                                        >
                                            {tone.charAt(0).toUpperCase() + tone.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-black p-4 rounded-xl border border-gray-700 relative shadow-inner">
                                <div className="absolute -right-2 top-4 w-4 h-4 bg-black border-l border-b border-gray-700 transform rotate-45"></div>
                                <p className="text-sm text-gray-300 leading-relaxed font-mono">
                                    {getReminderPreview()}
                                </p>
                            </div>

                            <p className="text-xs text-gray-500 mt-4 text-center">
                                You can send this reminder via WhatsApp or Email after creating the loan.
                            </p>
                        </div>

                        {/* Pro Tip */}
                        <div className="glass-card p-6 bg-gradient-to-br from-indigo-900/20 to-violet-900/20 border-indigo-500/10 animate-fadeIn" style={{ animationDelay: '300ms' }}>
                            <h3 className="heading-sm mb-2 text-indigo-400 font-bold flex items-center gap-2">
                                <span>💡</span> Pro Tip
                            </h3>
                            <p className="text-sm text-gray-400">
                                Adding an email or phone number allows you to send automated reminders directly from the app.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
