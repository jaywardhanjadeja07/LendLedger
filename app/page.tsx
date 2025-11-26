'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks! We'll notify ${email} when the mobile app launches.`);
    setEmail('');
  };

  return (
    <div className="min-h-screen relative bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative">
                <Image
                  src="/assets/logo-polished.png"
                  alt="LendLedger Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">LendLedger</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/auth" className="hidden sm:inline-flex font-semibold text-white/80 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/auth" className="btn btn-secondary px-6 py-2.5 rounded-full border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden lend-hero-bg text-white">
        {/* Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-8 shadow-lg hover:bg-white/20 transition-all cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                App Coming Soon
              </div>

              <h1 className="heading-xl mb-6 font-extrabold leading-tight tracking-tight">
                Smart Money Tracking <br />
                <span className="text-blue-200">Made Simple.</span>
              </h1>

              <p className="text-xl mb-10 text-blue-50 max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-90">
                Track loans, automate reminders, and manage your personal finances with the most reliable app for lending and borrowing.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
                <Link href="/auth" className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 px-8 py-4 text-lg">
                  Try for Free
                </Link>
                <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg bg-black/30 hover:bg-black/50 border border-white/10 transition-all">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.69-.93.95 0 1.95.29 2.58.74-.68.55-2.46 2.77-1.41 6.06.12.38.39.94.98 1.93.29.48.68 1.03 1.05 1.65-.97 1.35-2.2 2.72-2.98 2.78zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                  </button>
                  <button className="p-2 rounded-lg bg-black/30 hover:bg-black/50 border border-white/10 transition-all">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 21,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-blue-100/80">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                  Free Forever Plan
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                  No Credit Card
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                  Secure Data
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex-1 relative animate-slideIn w-full max-w-[350px] mx-auto lg:max-w-full perspective-1000">
              <div className="relative animate-tilt transition-transform duration-500 hover:scale-105">
                <Image
                  src="/assets/iphone-mockup.png"
                  alt="LendLedger App Dashboard"
                  width={400}
                  height={800}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />

                {/* Floating Elements */}
                <div className="absolute -right-12 top-20 bg-white p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '0s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Payment Received</p>
                      <p className="text-sm font-bold text-gray-900">+ ₹5,000</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-8 bottom-32 bg-white p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Reminder Sent</p>
                      <p className="text-sm font-bold text-gray-900">Rahul K.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shadow/Reflection */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 h-20 bg-blue-900/40 blur-3xl rounded-[100%]"></div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block fill-white">
            <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white relative">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="heading-lg mb-4 text-gray-900 font-bold">
              Everything You Need to <span className="text-gradient">Manage Money</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Powerful features designed for complete financial clarity and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-3xl bg-white hover:bg-gray-50 transition-all border border-gray-100 hover:border-blue-100 group shadow-lg hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  {feature.icon}
                </div>
                <h3 className="heading-sm mb-3 text-gray-900 font-bold">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/grid.svg')] opacity-[0.03]"></div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mb-4 uppercase tracking-wider">
              Testimonials
            </div>
            <h2 className="heading-lg mb-4 text-gray-900 font-bold">Trusted by Thousands</h2>
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="font-bold text-gray-900">4.9/5</span>
                <span className="text-gray-500 text-sm">Play Store</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                <span className="text-blue-500 text-xl">👥</span>
                <span className="font-bold text-gray-900">10k+</span>
                <span className="text-gray-500 text-sm">Active Users</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {'★'.repeat(t.stars)}
                </div>
                <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600 text-xl overflow-hidden">
                    {/* Placeholder for real image */}
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-blue-600 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 text-gray-900 font-bold">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-500">Choose the plan that fits your needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-3xl border border-gray-200 bg-white relative">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-500 mb-6">For personal use</p>
              <div className="text-4xl font-bold text-gray-900 mb-8">₹0<span className="text-lg text-gray-500 font-normal">/forever</span></div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-500">✓</span> 10 Active Loans
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-500">✓</span> Basic Reminders
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-500">✓</span> 1 Device Sync
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="text-gray-300">✕</span> WhatsApp Bot
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="text-gray-300">✕</span> PDF Contracts
                </li>
              </ul>

              <Link href="/auth" className="btn btn-ghost text-gray-900 border-gray-300 hover:bg-gray-50 w-full">
                Get Started
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="p-8 rounded-3xl border-2 border-blue-500 bg-blue-50/30 relative shadow-xl transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Premium</h3>
              <p className="text-gray-500 mb-6">For power users & businesses</p>
              <div className="text-4xl font-bold text-gray-900 mb-8">₹79<span className="text-lg text-gray-500 font-normal">/month</span></div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-900 font-medium">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">✓</span> Unlimited Loans
                </li>
                <li className="flex items-center gap-3 text-gray-900 font-medium">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">✓</span> WhatsApp Auto-Bot 🤖
                </li>
                <li className="flex items-center gap-3 text-gray-900 font-medium">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">✓</span> PDF Contracts 📄
                </li>
                <li className="flex items-center gap-3 text-gray-900 font-medium">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">✓</span> Multi-Device Sync ☁️
                </li>
                <li className="flex items-center gap-3 text-gray-900 font-medium">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">✓</span> Borrower Reliability Score
                </li>
              </ul>

              <Link href="/auth" className="btn btn-primary w-full shadow-blue-lg">
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="heading-lg mb-6">Start Tracking for Free</h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of users who are taking control of their personal lending.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth" className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-50 transition-all transform hover:-translate-y-1">
                  Get Started Free
                </Link>
              </div>
              <p className="mt-6 text-sm text-blue-200">No credit card required for free plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400 border-t border-gray-800 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-8">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 relative">
                  <Image
                    src="/assets/logo-polished.png"
                    alt="LendLedger Logo"
                    fill
                    className="object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-xl font-bold text-white">LendLedger</span>
              </div>
              <p className="max-w-xs leading-relaxed">
                The smart way to track loans, manage reminders, and keep your financial relationships healthy.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 LendLedger. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
    title: 'Track in Seconds',
    description: 'Record loans and borrowings instantly. No complicated forms or accounting knowledge needed.'
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>,
    title: 'WhatsApp Reminders',
    description: 'Send professional payment reminders directly via WhatsApp, SMS, or Email with one tap.'
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>,
    title: 'PDF Contracts',
    description: 'Generate legal-grade loan agreements and contracts instantly for added security.'
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
    title: 'UPI Integration',
    description: 'Settle debts quickly with integrated UPI payment links for seamless transactions.'
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>,
    title: 'Multi-Device Sync',
    description: 'Access your data from any device. Your financial records are always up to date.'
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
    title: 'Reliability Score',
    description: 'Know who to trust. Track borrower reliability based on repayment history.'
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Small Business Owner",
    text: "LendLedger changed how I manage my shop credits. The WhatsApp reminders are a game changer!",
    stars: 5
  },
  {
    name: "Priya Patel",
    role: "Freelancer",
    text: "Finally, an app that handles INR correctly and looks professional. Highly recommended.",
    stars: 5
  },
  {
    name: "Amit Verma",
    role: "Student",
    text: "Great for tracking shared expenses with roommates. The free plan is more than enough for me.",
    stars: 5
  }
];
