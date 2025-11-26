'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-300">
              <Image
                src="/assets/logo.png"
                alt="LendLedger Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">LendLedger</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link href="/login" className="btn btn-primary shadow-neon">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fadeIn">
              {/* SEO-Optimized H1 */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                LendLedger – Loan tracking and reminder app for India
              </h1>

              {/* India-Specific Tagline */}
              <p className="text-xl md:text-2xl text-gradient mb-6 font-semibold">
                Track loans, shop credits, and shared expenses in India with smart reminders
              </p>

              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Manage money you've lent or borrowed with <span className="text-white font-medium">WhatsApp reminders, UPI payment links, and legal loan agreements</span>. Built specifically for INR and Indian users.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8">
                <Link href="/login" className="btn btn-primary w-full sm:w-auto text-lg px-10 py-4 shadow-xl hover:shadow-indigo-500/40">
                  Start Free →
                </Link>
                <Link href="/dashboard" className="btn btn-secondary w-full sm:w-auto text-lg px-10 py-4">
                  Open Web App
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Data securely stored</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Built for INR & UPI</span>
                </div>
              </div>
            </div>

            {/* App Mockup */}
            <div className="relative animate-float lg:h-[600px] flex items-center justify-center">
              <div className="relative w-full max-w-md z-10">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <Image
                  src="/assets/app-banner.png"
                  alt="LendLedger App Preview"
                  width={500}
                  height={600}
                  className="relative z-10 drop-shadow-2xl rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg mb-4 text-white">Everything you need to manage loans in India</h2>
            <p className="text-gray-400 text-lg">Track money lent to friends, manage shop credits, and never miss a payment again.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📝',
                title: 'Instant Loan Records',
                desc: 'Record transactions in seconds with date, amount, borrower details, and digital proof. Never lose track of who owes you money.'
              },
              {
                icon: '💬',
                title: 'One-Tap WhatsApp Reminders',
                desc: 'Send friendly payment reminders directly via WhatsApp. Choose between friendly, urgent, or legal tones for maximum effectiveness.'
              },
              {
                icon: '📄',
                title: 'Legal Loan Agreements',
                desc: 'Generate and download legally valid loan agreements in seconds. Protect yourself with proper documentation for every transaction.'
              },
              {
                icon: '💸',
                title: 'UPI Payment Links',
                desc: 'Share instant UPI payment links for easy collection. Your borrowers can pay you directly with a single tap—no account details needed.'
              },
              {
                icon: '⭐',
                title: 'Borrower Reliability Score',
                desc: 'Track payment history and borrower trustworthiness over time. Make informed decisions about future lending based on data.'
              },
              {
                icon: '☁️',
                title: 'Cloud Sync & Security',
                desc: 'Bank-grade encryption with real-time multi-device sync. Your data is safe, encrypted, and accessible from anywhere.'
              },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 group hover:bg-white/5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 text-white">Trusted by thousands across India</h2>
            <p className="text-gray-400">See how LendLedger is helping Indians manage their finances better.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "LendLedger helped me track ₹2.5 lakhs in shop credits effortlessly. WhatsApp reminders ensure timely payments.",
                name: "Rajesh Kumar",
                role: "Small Business Owner",
                avatar: "👨‍💼"
              },
              {
                quote: "As a freelancer, managing multiple clients and payments was chaos. LendLedger brought clarity and professionalism.",
                name: "Priya Sharma",
                role: "Freelance Designer",
                avatar: "👩‍💻"
              },
              {
                quote: "Perfect for tracking money lent to friends. The app is simple, secure, and the reminders actually work!",
                name: "Arjun Patel",
                role: "College Student",
                avatar: "👨‍🎓"
              }
            ].map((testimonial, i) => (
              <div key={i} className="glass-card p-8 hover:border-indigo-500/30 transition-all">
                <div className="mb-6">
                  <div className="text-indigo-400 text-4xl mb-4">"</div>
                  <p className="text-gray-300 text-lg leading-relaxed italic">{testimonial.quote}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-2xl shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 text-white">Why Choose LendLedger?</h2>
            <p className="text-gray-400">See how we compare to traditional methods.</p>
          </div>

          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 text-center border-b border-white/10 pb-6 mb-6">
              <div className="text-gray-500 font-semibold uppercase tracking-wider text-xs md:text-sm">Feature</div>
              <div className="text-gray-500 font-semibold uppercase tracking-wider text-xs md:text-sm">Traditional Apps</div>
              <div className="text-indigo-400 font-bold uppercase tracking-wider text-xs md:text-sm">LendLedger</div>
            </div>

            <div className="space-y-6">
              {[
                { name: 'Data Security', old: 'Local Storage', new: 'Encrypted Cloud' },
                { name: 'Reminders', old: 'Manual', new: 'Automated Smart Alerts' },
                { name: 'Interface', old: 'Cluttered', new: 'Clean & Premium' },
                { name: 'Sync', old: 'None', new: 'Real-time Multi-device' },
                { name: 'Cost', old: 'Hidden Fees', new: 'Transparent / Free Tier' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 md:gap-8 items-center text-center group">
                  <div className="text-left font-medium text-gray-300">{row.name}</div>
                  <div className="text-gray-500 text-sm">{row.old}</div>
                  <div className="text-white font-bold text-lg group-hover:text-indigo-400 transition-colors flex items-center justify-center gap-2">
                    {row.new}
                    <span className="text-green-500 text-xs">✓</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 text-white">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 text-lg">Choose the plan that works for you. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Personal Plan */}
            <div className="glass-card p-10 hover:border-indigo-500/30 transition-all">
              <h3 className="text-2xl font-bold text-white mb-2">Personal</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Free</span>
                <span className="text-gray-400"> forever</span>
              </div>
              <p className="text-gray-400 mb-8">Perfect for individuals tracking personal loans and expenses.</p>

              <ul className="space-y-4 mb-8">
                {[
                  'Up to 50 active loans',
                  'Basic WhatsApp reminders',
                  '5 loan agreements/month',
                  'Basic analytics',
                  'Cloud sync'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="text-green-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/login" className="btn btn-secondary w-full text-lg py-3">
                Choose Personal
              </Link>
            </div>

            {/* Business Plan */}
            <div className="glass-card p-10 border-2 border-indigo-500/50 relative hover:border-indigo-500 transition-all shadow-neon">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                Most Popular
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">₹79</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400 mb-8">For power users, freelancers, and businesses managing multiple loans.</p>

              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited loans',
                  'WhatsApp + Email + SMS reminders',
                  'Unlimited loan agreements',
                  'Advanced analytics & reports',
                  'Multi-user access',
                  'Priority support',
                  'Custom branding'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="text-green-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/login" className="btn btn-primary w-full text-lg py-3 shadow-xl">
                Choose Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container relative z-10">
          <h2 className="heading-lg mb-12 text-center text-white">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: 'How secure is my financial data?',
                a: 'We use bank-grade AES-256 encryption to protect your data. All information is stored securely in the cloud with Supabase, and we never share your data with third parties. Your privacy and security are our top priorities.'
              },
              {
                q: 'Can I track money lent to friends and family?',
                a: 'Absolutely! LendLedger is perfect for tracking money lent to friends, managing shop credits, shared expenses with roommates, or any personal lending. Record transactions instantly and send friendly WhatsApp reminders when payments are due.'
              },
              {
                q: 'Does LendLedger support INR and UPI?',
                a: 'Yes, LendLedger is built specifically for India! We support INR currency with proper Indian numbering (e.g., ₹1,20,000), UPI payment link generation for easy collection, and WhatsApp integration for reminders—all tailored for Indian users.'
              },
              {
                q: 'How do WhatsApp reminders work?',
                a: 'You can send automated payment reminders via WhatsApp with a single tap. Choose between friendly, urgent, or legal tones depending on the situation. The app generates a pre-filled message you can customize before sending.'
              },
              {
                q: 'Is there a free plan?',
                a: 'Yes! Our Personal plan is free forever and includes up to 50 active loans, basic WhatsApp reminders, 5 loan agreements per month, and cloud sync. Perfect for individuals managing personal finances. Upgrade to Business (₹79/month) for unlimited loans and advanced features.'
              },
            ].map((faq, i) => (
              <div key={i} className="glass-card p-8 hover:border-indigo-500/30 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none"></div>
        <div className="container relative z-10">
          <h2 className="heading-xl mb-6 text-white">Ready to take control of your loans?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of users who trust LendLedger for tracking money lent to friends, managing shop credits, and never missing a payment.
          </p>
          <Link href="/login" className="btn btn-primary text-lg px-10 py-5 shadow-neon hover:scale-105 transition-transform">
            Start Free →
          </Link>
          <p className="mt-6 text-sm text-gray-500">No credit card required • Free forever plan available</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 relative">
                <Image src="/assets/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-white">LendLedger</span>
            </div>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} LendLedger. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
