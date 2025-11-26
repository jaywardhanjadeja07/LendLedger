'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks! We'll notify ${email} when the mobile app launches.`);
    setEmail('');
  };

  return (
    <div className="min-h-screen relative bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 bg-white/80 backdrop-blur-md">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative">
                <Image
                  src="/assets/logo-promo.png"
                  alt="LendLedger Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900">LendLedger</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/auth" className="hidden sm:inline-flex font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                Sign In
              </Link>
              <Link href="/auth" className="btn btn-primary shadow-blue-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden lend-hero-bg text-white">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left animate-fadeIn">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-semibold mb-6">
                ✨ New: WhatsApp Reminders & UPI Integration
              </div>

              <h1 className="heading-xl mb-6 font-extrabold leading-tight">
                Smart Money Tracking <br />
                <span className="text-blue-100">Made Simple.</span>
              </h1>

              <p className="text-xl mb-8 text-blue-50 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Track loans, automate reminders, and manage your personal finances with the most reliable app for lending and borrowing.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
                <Link href="/auth" className="cta-primary text-lg">
                  Try for Free
                </Link>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2.5 rounded-lg bg-black text-white border border-gray-700 hover:bg-gray-900 transition-all flex items-center gap-2 shadow-lg">
                    <span className="text-2xl"></span>
                    <div className="text-left leading-tight">
                      <div className="text-[10px] font-medium text-gray-400">Download on the</div>
                      <div className="text-sm font-bold">App Store</div>
                    </div>
                  </button>
                  <button className="px-4 py-2.5 rounded-lg bg-black text-white border border-gray-700 hover:bg-gray-900 transition-all flex items-center gap-2 shadow-lg">
                    <span className="text-2xl">▶</span>
                    <div className="text-left leading-tight">
                      <div className="text-[10px] font-medium text-gray-400">GET IT ON</div>
                      <div className="text-sm font-bold">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-blue-100">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Free Forever Plan
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> No Credit Card
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Secure Data
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex-1 relative animate-slideIn w-full max-w-md mx-auto lg:max-w-full">
              <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col">
                <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                  {/* Mockup Screen Content */}
                  <div className="absolute inset-0 bg-gray-50 flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-600 p-6 pt-12 text-white rounded-b-3xl shadow-lg">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className="text-blue-100 text-sm">Total Balance</p>
                          <h2 className="text-3xl font-bold">₹ 45,200</h2>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">👤</div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                          <p className="text-xs text-blue-100">To Receive</p>
                          <p className="font-bold">₹ 52.5K</p>
                        </div>
                        <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                          <p className="text-xs text-blue-100">To Pay</p>
                          <p className="font-bold">₹ 7.3K</p>
                        </div>
                      </div>
                    </div>

                    {/* Transactions */}
                    <div className="p-4 flex-1 overflow-hidden">
                      <h3 className="font-bold text-gray-700 mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                {i % 2 === 0 ? '↓' : '↑'}
                              </div>
                              <div>
                                <p className="font-bold text-gray-800">Rahul Kumar</p>
                                <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                              </div>
                            </div>
                            <span className={`font-bold ${i % 2 === 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {i % 2 === 0 ? '-' : '+'} ₹{i * 500}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                    <div className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-bold mb-4 shadow-lg animate-pulse">
                      COMING SOON
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Mobile App</h3>
                    <p className="text-gray-300 text-sm mb-6">Experience the power of LendLedger on iOS & Android</p>
                    <div className="flex gap-2">
                      <div className="h-10 w-32 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 text-xs">
                        App Store
                      </div>
                      <div className="h-10 w-32 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 text-xs">
                        Google Play
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shadow/Reflection */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/20 blur-xl rounded-[100%]"></div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 text-gray-900">
              Everything You Need to <span className="text-blue-600">Manage Money</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Powerful features designed for complete financial clarity and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="heading-sm mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 text-gray-900">Trusted by Thousands</h2>
            <p className="text-gray-500">See what our community has to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {'★'.repeat(t.stars)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="heading-lg mb-6">Start Tracking for Free</h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of users who are taking control of their personal lending.
                Upgrade to Premium for just <span className="font-bold text-white">₹79/month</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth" className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-50 transition-all transform hover:-translate-y-1">
                  Get Started Free
                </Link>
                <Link href="/auth" className="bg-blue-700 text-white font-bold py-4 px-8 rounded-xl border border-blue-400 hover:bg-blue-800 transition-all">
                  View Premium Features
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
                    src="/assets/logo-promo.png"
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
    icon: '⚡',
    title: 'Track in Seconds',
    description: 'Record loans and borrowings instantly. No complicated forms or accounting knowledge needed.'
  },
  {
    icon: '💬',
    title: 'WhatsApp Reminders',
    description: 'Send professional payment reminders directly via WhatsApp, SMS, or Email with one tap.'
  },
  {
    icon: '📄',
    title: 'PDF Contracts',
    description: 'Generate legal-grade loan agreements and contracts instantly for added security.'
  },
  {
    icon: '💸',
    title: 'UPI Integration',
    description: 'Settle debts quickly with integrated UPI payment links for seamless transactions.'
  },
  {
    icon: '🔄',
    title: 'Multi-Device Sync',
    description: 'Access your data from any device. Your financial records are always up to date.'
  },
  {
    icon: '🏆',
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
