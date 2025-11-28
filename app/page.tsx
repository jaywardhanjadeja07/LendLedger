'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icons from './components/Icons';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] text-white overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--dark-bg)]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="/assets/logo.png"
                alt="LendLedger Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">LendLedger</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Features', 'Pricing', 'About', 'FAQs'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-medium text-white hover:text-indigo-400 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="btn btn-primary px-6 py-2 text-sm">
              Start Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Text Only, Centered, Min-Height */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-[400px] pb-[300px] overflow-hidden">
        <div className="bg-glow top-0 left-1/2 -translate-x-1/2 opacity-40"></div>

        <div className="container-custom relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-16 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-sm font-medium text-indigo-200">New: AI-Powered Credit Scoring</span>
          </div>

          <h1 className="heading-xl mb-24 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            LendLedger
          </h1>

          <p className="heading-md text-gray-300 font-medium mb-24 max-w-3xl leading-tight animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            You maintain your relationships healthy. <br className="hidden lg:block" />
            <span className="text-primary-gradient">We track your transactions to make them healthier.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/signup" className="btn btn-primary px-12 py-5 text-xl shadow-glow">
              Start Free Trial
            </Link>
            <button className="btn btn-ghost px-12 py-5 text-xl flex items-center gap-3 group">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </span>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-[400px] relative bg-[var(--dark-bg)]">
        <div className="container-custom">
          <div className="text-center w-full max-w-5xl mx-auto mb-64">
            <h2 className="heading-lg mb-24">Powerful Features</h2>
            <p className="text-base text-gray-400">Everything you need to manage your lending business efficiently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center">
            {[
              { title: "AI-Powered Lending", desc: "Smart credit scoring and risk assessment.", icon: Icons.Zap },
              { title: "Instant Payments", desc: "Seamless UPI and bank transfers.", icon: Icons.Wallet },
              { title: "Smart Notifications", desc: "Automated WhatsApp reminders.", icon: Icons.Bell },
              { title: "Secure Dashboard", desc: "Bank-grade security for your data.", icon: Icons.Shield }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-12 flex flex-col items-center text-center group hover:bg-white/5 transition-colors w-full">
                <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-12 group-hover:scale-110 transition-transform shadow-glow">
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-12">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section - NEW */}
      <section className="py-[400px] relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center w-full max-w-5xl mx-auto mb-64">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md mb-8">
              <Icons.Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-200">Bank-Grade Security</span>
            </div>
            <h2 className="heading-lg mb-24">Your Data is Safe with Us</h2>
            <p className="text-base text-gray-400">We use state-of-the-art encryption to ensure your financial data remains private and secure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { title: "256-bit Encryption", desc: "Military-grade encryption for all your data transactions.", icon: Icons.Lock },
              { title: "ISO 27001 Certified", desc: "Compliant with international information security standards.", icon: Icons.Shield },
              { title: "Data Privacy", desc: "We never sell your data. Your privacy is our top priority.", icon: Icons.Server }
            ].map((item, i) => (
              <div key={i} className="glass-card p-12 flex flex-col items-center text-center border-green-500/20 hover:border-green-500/40 transition-colors">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-10">
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-12">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-[400px] bg-white/[0.02] relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-64">
            <h2 className="heading-lg mb-24">How It Works</h2>
            <p className="text-base text-gray-400">Get started in 3 simple steps.</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-20">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>

            {[
              { step: "01", title: "Create Account", desc: "Sign up in seconds." },
              { step: "02", title: "Add Borrowers", desc: "Input borrower details." },
              { step: "03", title: "Track Repayments", desc: "Get paid on time." }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center z-10">
                <div className="w-40 h-40 rounded-full bg-[var(--dark-bg)] border-4 border-indigo-500/20 flex items-center justify-center text-3xl font-bold text-indigo-400 mb-12 shadow-glow group hover:border-indigo-500/50 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-12">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Interface Showcase */}
      <section className="py-[400px] relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-64">
            <h2 className="heading-lg mb-24">Experience the App</h2>
            <p className="text-base text-gray-400">Beautiful, intuitive, and powerful.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center justify-center max-w-7xl mx-auto">
            <div className="transform translate-y-16 hover:-translate-y-4 transition-transform duration-500">
              <Image src="/assets/emi.png" alt="EMI Tracker" width={400} height={800} className="w-full h-auto drop-shadow-2xl rounded-3xl border border-white/10" />
            </div>
            <div className="transform z-10 hover:-translate-y-6 transition-transform duration-500 scale-110">
              <Image src="/assets/dashboard.png" alt="Dashboard" width={400} height={800} className="w-full h-auto drop-shadow-2xl rounded-3xl shadow-glow border border-white/10" />
            </div>
            <div className="transform translate-y-16 hover:-translate-y-4 transition-transform duration-500">
              <Image src="/assets/profile.png" alt="Profile" width={400} height={800} className="w-full h-auto drop-shadow-2xl rounded-3xl border border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-[400px]">
        <div className="container-custom">
          <div className="text-center mb-64">
            <h2 className="heading-lg mb-24">Simple Pricing</h2>
            <p className="text-base text-gray-400">Choose the plan that fits your needs.</p>

            {/* Toggle Placeholder */}
            <div className="inline-flex bg-white/5 rounded-full p-1 mt-20 border border-white/10">
              <button className="px-10 py-4 rounded-full bg-indigo-600 text-white text-base font-bold shadow-lg">Monthly</button>
              <button className="px-10 py-4 rounded-full text-gray-400 text-base font-bold hover:text-white transition-colors">Yearly</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto items-start">
            {/* Starter */}
            <div className="glass-card p-12 text-center hover:bg-white/5 transition-colors">
              <h3 className="text-xl font-bold mb-12">Starter</h3>
              <div className="text-4xl font-bold mb-10">Free</div>
              <p className="text-sm text-gray-400 mb-12">Perfect for individuals just starting out.</p>
              <ul className="space-y-6 mb-16 text-left text-gray-300 text-sm">
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-500 w-5 h-5 flex-shrink-0" /> Up to 50 Active Loans</li>
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-500 w-5 h-5 flex-shrink-0" /> Basic Repayment Tracking</li>
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-500 w-5 h-5 flex-shrink-0" /> Email Support</li>
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-500 w-5 h-5 flex-shrink-0" /> Single User</li>
              </ul>
              <button className="btn btn-outline w-full py-5 text-lg">Get Started</button>
            </div>

            {/* Pro */}
            <div className="glass-card p-14 text-center border-indigo-500/50 bg-indigo-900/10 relative transform md:-translate-y-8 z-10">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">Most Popular</div>
              <h3 className="text-2xl font-bold mb-12">Pro</h3>
              <div className="text-5xl font-bold mb-10">₹79<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              <p className="text-sm text-gray-300 mb-12">For growing businesses needing more power.</p>
              <ul className="space-y-6 mb-16 text-left text-gray-200 text-sm">
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-400 w-6 h-6 flex-shrink-0" /> Unlimited Loans</li>
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-400 w-6 h-6 flex-shrink-0" /> Automated WhatsApp Reminders</li>
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-400 w-6 h-6 flex-shrink-0" /> Advanced Analytics & Reports</li>
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-400 w-6 h-6 flex-shrink-0" /> Priority Chat Support</li>
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-400 w-6 h-6 flex-shrink-0" /> Up to 3 Users</li>
              </ul>
              <button className="btn btn-primary w-full py-5 text-xl shadow-glow">Start Free Trial</button>
            </div>

            {/* Enterprise Edition */}
            <div className="glass-card p-12 text-center hover:bg-white/5 transition-colors">
              <h3 className="text-xl font-bold mb-12">Enterprise</h3>
              <div className="text-4xl font-bold mb-10">₹499<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              <p className="text-sm text-gray-400 mb-12">Full control for large scale operations.</p>
              <ul className="space-y-6 mb-16 text-left text-gray-300 text-sm">
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-500 w-5 h-5 flex-shrink-0" /> Everything in Pro</li>
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-500 w-5 h-5 flex-shrink-0" /> Custom API Access</li>
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-500 w-5 h-5 flex-shrink-0" /> Dedicated Account Manager</li>
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-500 w-5 h-5 flex-shrink-0" /> Custom Branding</li>
                <li className="flex gap-4 items-center"><Icons.Check className="text-indigo-500 w-5 h-5 flex-shrink-0" /> Unlimited Users</li>
              </ul>
              <button className="btn btn-outline w-full py-5 text-lg">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-[400px] bg-white/[0.02]">
        <div className="container-custom">
          <div className="text-center mb-64">
            <h2 className="heading-lg mb-24">Trusted by Thousands</h2>
            <p className="text-base text-gray-400">See what our users are saying.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              { name: "Rahul Sharma", role: "Business Owner", quote: "LendLedger transformed how I manage my shop credits. Highly recommended!" },
              { name: "Priya Patel", role: "Freelancer", quote: "The automated reminders are a game changer. I get paid on time now." },
              { name: "Amit Verma", role: "Investor", quote: "Clean, fast, and secure. Exactly what I needed for my personal lending." }
            ].map((t, i) => (
              <div key={i} className="glass-card p-12 flex flex-col hover:-translate-y-2 transition-transform">
                <Icons.Quote className="w-12 h-12 text-indigo-500 mb-12 opacity-50" />
                <p className="text-gray-300 mb-12 italic flex-grow text-lg">"{t.quote}"</p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg flex items-center gap-2">
                      {t.name}
                      <Icons.Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      {t.role} <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-400">Verified User</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-[400px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-purple-900/40"></div>
        <div className="container-custom relative z-10 flex flex-col items-center text-center">
          <h2 className="heading-lg mb-24">Ready to Simplify Lending?</h2>
          <p className="text-xl text-gray-300 mb-20 max-w-3xl mx-auto">
            Join thousands of users who are growing their business with LendLedger.
          </p>
          <Link href="/signup" className="btn btn-primary px-16 py-6 text-xl shadow-glow hover:scale-105 transition-transform">
            Start Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-24 border-t border-white/5">
        <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="relative w-10 h-10">
                <Image src="/assets/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <span className="text-2xl font-bold text-white">LendLedger</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              The smartest way to track loans and manage repayments. Secure, fast, and reliable.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Icons.Shield className="w-4 h-4 text-indigo-500" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Icons.Lock className="w-4 h-4 text-indigo-500" />
                <span>256-bit Encryption</span>
              </div>
            </div>
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "Security", "Updates"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] }
          ].map((col, i) => (
            <div key={i} className="flex flex-col items-center md:items-start">
              <h4 className="font-bold text-white mb-12 text-lg">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-500 hover:text-indigo-400 text-sm transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column - NEW */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white mb-12 text-lg">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-indigo-400"><Icons.Bell className="w-4 h-4" /></span>
                <span>support@lendledger.in</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-indigo-400"><Icons.Zap className="w-4 h-4" /></span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-indigo-400"><Icons.Shield className="w-4 h-4" /></span>
                <span>Fintech Hub, Bangalore</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container-custom mt-24 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} LendLedger. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
