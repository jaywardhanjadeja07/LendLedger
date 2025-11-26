'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/app/lib/supabase';

export default function AuthPage() {
    const supabase = createClient();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements are handled in globals.css on body, but we can add local flair if needed */}

            <div className="w-full max-w-md glass-card p-8 md:p-10 relative z-10 animate-fadeIn">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold transform hover:scale-105 transition-transform duration-300">
                        <span className="text-5xl font-bold text-black">L</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gradient mb-2">LendLedger</h1>
                    <p className="text-gray-400 text-lg">Premium Money Tracking</p>
                </div>

                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#ffd700',
                                    brandAccent: '#f4c430',
                                    brandButtonText: '#0a0a0a',
                                    defaultButtonBackground: 'rgba(255, 255, 255, 0.05)',
                                    defaultButtonBackgroundHover: 'rgba(255, 255, 255, 0.1)',
                                    inputBackground: 'rgba(10, 10, 10, 0.6)',
                                    inputBorder: 'rgba(255, 215, 0, 0.2)',
                                    inputBorderHover: '#ffd700',
                                    inputBorderFocus: '#ffd700',
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
                                    bodyFontFamily: 'var(--font-geist-sans)',
                                    buttonFontFamily: 'var(--font-geist-sans)',
                                },
                            },
                        },
                        className: {
                            container: 'gap-4',
                            button: 'font-bold text-lg shadow-lg hover:shadow-gold/20 transition-all duration-300',
                            input: 'text-lg backdrop-blur-sm',
                            label: 'text-gray-300 font-medium',
                            anchor: 'text-yellow-500 hover:text-yellow-400 font-medium transition-colors',
                            divider: 'bg-gray-700',
                        },
                    }}
                    theme="dark"
                    providers={['google']}
                    redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
                />
            </div>
        </div>
    );
}
