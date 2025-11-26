'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/app/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthPage() {
    const supabase = createClient();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="w-full max-w-md glass-card p-8 md:p-10 relative z-10 animate-fadeIn border-indigo-500/20 shadow-neon">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block mb-6 group">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 transform hover:scale-105 transition-all duration-300 p-3 group-hover:shadow-indigo-500/50">
                            <Image
                                src="/assets/logo.png"
                                alt="LendLedger Logo"
                                width={64}
                                height={64}
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-bold text-gradient mb-2">LendLedger</h1>
                    <p className="text-gray-400 text-lg">Premium Financial Management</p>
                </div>

                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#4F46E5',
                                    brandAccent: '#7C3AED',
                                    brandButtonText: '#ffffff',
                                    defaultButtonBackground: 'rgba(255, 255, 255, 0.05)',
                                    defaultButtonBackgroundHover: 'rgba(255, 255, 255, 0.1)',
                                    inputBackground: 'rgba(10, 10, 10, 0.6)',
                                    inputBorder: 'rgba(79, 70, 229, 0.2)',
                                    inputBorderHover: '#4F46E5',
                                    inputBorderFocus: '#7C3AED',
                                    inputText: '#ffffff',
                                    inputPlaceholder: '#737373',
                                },
                                radii: {
                                    borderRadiusButton: '0.75rem',
                                    inputBorderRadius: '0.5rem',
                                },
                                space: {
                                    inputPadding: '1rem',
                                    buttonPadding: '1rem',
                                },
                                fonts: {
                                    bodyFontFamily: 'var(--font-outfit)',
                                    buttonFontFamily: 'var(--font-outfit)',
                                },
                            },
                        },
                        className: {
                            container: 'gap-4',
                            button: 'font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300',
                            input: 'text-lg backdrop-blur-sm',
                            label: 'text-gray-300 font-medium',
                            anchor: 'text-indigo-400 hover:text-indigo-300 font-medium transition-colors',
                            divider: 'bg-gray-700',
                        },
                    }}
                    theme="dark"
                    providers={['google']}
                    redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
                />

                <div className="mt-8 text-center">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
