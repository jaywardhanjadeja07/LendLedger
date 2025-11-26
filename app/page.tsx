'use client';

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Store email for early access notifications
    alert(`Thanks for your interest! We'll notify ${email} when the mobile app launches.`);
    setEmail('');
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-2xl font-bold text-black">L</span>
              </div>
              <span className="text-2xl font-bold text-gradient">LendLedger</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/auth" className="btn btn-ghost hidden sm:inline-flex">
                Sign In
              </Link>
              <Link href="/auth" className="btn btn-primary">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex items-center min-h-screen pt-32 pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center animate-fadeIn">
            <div className="badge-gold mb-6 inline-block px-6 py-2 text-sm font-bold">
              🎉 Early Registration Open - Get 3 Months Premium FREE!
            </div>

            <h1 className="heading-xl mb-6 text-white">
              Never Forget Who{' '}
              <span className="text-gradient">Owes You Money</span>
            </h1>

            <p className="text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
              Take control of your personal finances. Track loans, set reminders, and manage who owes you—all in one beautiful, secure app.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href="/auth" className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-gold/30">
                Start Tracking Free →
              </Link>
              <a href="#features" className="btn btn-secondary text-lg px-8 py-4">
                See How It Works
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
              <div className="glass-card p-6 hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-gradient mb-2">$10M+</div>
                <div className="text-gray-400">Money Tracked</div>
              </div>
              <div className="glass-card p-6 hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-gradient mb-2">50K+</div>
                <div className="text-gray-400">Happy Users</div>
              </div>
              <div className="glass-card p-6 hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-gradient mb-2">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Coming Soon Banner */}
      <section className="py-20 bg-gradient-to-br from-yellow-900/20 to-black/40">
        <div className="container">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-gold opacity-5"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="badge-gold mb-4 inline-block px-4 py-2 text-sm">
                  📱 COMING SOON
                </div>
                <h2 className="heading-lg mb-4 text-white">
                  Mobile App<br />
                  <span className="text-gradient">Launching Soon!</span>
                </h2>
                <p className="text-gray-400 text-lg mb-6 max-w-lg">
                  Get ready for the ultimate money tracking experience on iOS and Android.
                  Manage your loans on the go, receive push notifications, and never miss a payment.
                </p>
                <form onSubmit={handleEarlyAccess} className="flex gap-3 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input flex-1"
                  />
                  <button type="submit" className="btn btn-primary whitespace-nowrap">
                    Notify Me
                  </button>
                </form>
                <p className="text-sm text-gray-500 mt-3">
                  🎁 Early subscribers get <span className="text-gradient font-bold">50% OFF</span> Premium for life!
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-64 h-64 rounded-3xl bg-gradient-gold/10 border-2 border-gold/30 flex items-center justify-center shadow-gold">
                  <div className="text-center">
                    <div className="text-7xl mb-4">📱</div>
                    <p className="text-gold font-bold text-xl">Mobile App</p>
                    <p className="text-gray-400">Coming Q2 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early User Offers */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4 text-white">
              🎁 Limited Time <span className="text-gradient">Early User Offers</span>
            </h2>
            <p className="text-xl text-gray-400">
              Join now and unlock exclusive lifetime benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-8 text-center group hover:scale-105 transition-all">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🌟</div>
              <h3 className="heading-sm mb-3 text-white">First 1,000 Users</h3>
              <p className="text-gray-400 mb-4">Get Premium FREE for 6 months</p>
              <div className="bg-gradient-gold/10 border border-gold/20 rounded-lg p-3">
                <p className="text-gold font-bold">847/1000 claimed</p>
              </div>
            </div>

            <div className="glass-card p-8 text-center group hover:scale-105 transition-all border-2 border-gold/50">
              <div className="badge-gold mb-2">BEST VALUE</div>
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💎</div>
              <h3 className="heading-sm mb-3 text-white">Pre-Registration</h3>
              <p className="text-gray-400 mb-4">Lock in $5/month Premium pricing forever</p>
              <div className="bg-gradient-gold/10 border border-gold/20 rounded-lg p-3">
                <p className="text-gold font-bold">Save $48/year</p>
              </div>
            </div>

            <div className="glass-card p-8 text-center group hover:scale-105 transition-all">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="heading-sm mb-3 text-white">Referral Bonus</h3>
              <p className="text-gray-400 mb-4">Invite 3 friends, get 1 year Premium FREE</p>
              <div className="bg-gradient-gold/10 border border-gold/20 rounded-lg p-3">
                <p className="text-gold font-bold">Unlimited referrals</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/auth" className="btn btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-gold/30">
              Claim My Offer Now →
            </Link>
            <p className="text-sm text-gray-500 mt-4">⏰ Offers expire in 48 hours</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 text-white">
              Everything You Need to{' '}
              <span className="text-gradient">Manage Your Money</span>
            </h2>
            <p className="text-xl text-gray-400">
              Powerful features designed for complete financial clarity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-8 animate-fadeIn group hover:scale-105 transition-all" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="heading-sm mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 text-white">
              Simple, <span className="text-gradient">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-gray-400">
              Start free, upgrade when you need more power
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="glass-card p-8 hover:scale-105 transition-all">
              <h3 className="heading-md mb-2 text-white">Free</h3>
              <div className="text-5xl font-bold mb-6">
                <span className="text-gradient">$0</span>
                <span className="text-lg font-normal text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <span className="text-gray-300">Up to 10 active loans</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <span className="text-gray-300">Basic reminders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <span className="text-gray-300">Simple tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <span className="text-gray-300">Email support</span>
                </li>
              </ul>
              <Link href="/auth" className="btn btn-secondary w-full">
                Get Started
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="glass-card p-8 relative overflow-hidden border-2 border-gold/50 hover:scale-105 transition-all">
              <div className="absolute top-4 right-4">
                <span className="badge-gold">POPULAR</span>
              </div>
              <h3 className="heading-md mb-2 text-white">Premium</h3>
              <div className="text-5xl font-bold mb-6">
                <span className="text-gradient">$9</span>
                <span className="text-lg font-normal text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span className="text-white">✨ Unlimited loans</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span className="text-white">📊 Advanced analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span className="text-white">🔔 Custom reminders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span className="text-white">💰 Interest tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span className="text-white">⚡ Priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span className="text-white">📁 Export to CSV</span>
                </li>
              </ul>
              <Link href="/auth" className="btn btn-primary w-full shadow-lg hover:shadow-gold/30">
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="glass-card p-12 text-center max-w-3xl mx-auto border-2 border-gold/30">
            <h2 className="heading-lg mb-4 text-white">
              Ready to Take Control of Your Loans?
            </h2>
            <p className="text-xl mb-8 text-gray-400">
              Join thousands who trust LendLedger to manage their money and never miss a payment again.
            </p>
            <Link href="/auth" className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-gold/30">
              Start For Free Today →
            </Link>
            <p className="text-sm text-gray-500 mt-4">✨ No credit card required • Setup in 2 minutes</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-lg font-bold text-black">L</span>
              </div>
              <span className="text-xl font-bold text-gradient">LendLedger</span>
            </div>
            <p className="text-gray-500 mb-4">
              Premium money tracking & loan management
            </p>
            <p className="text-gray-600 text-sm">
              © 2025 LendLedger. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: '💰',
    title: 'Track Every Loan',
    description: 'Easily manage who you lent to and who you borrowed from, all in one secure place.'
  },
  {
    icon: '🔔',
    title: 'Smart Reminders',
    description: 'Never miss a payment deadline with intelligent automated notifications.'
  },
  {
    icon: '📊',
    title: 'Visual Analytics',
    description: 'See your complete financial picture with beautiful charts and real-time insights.'
  },
  {
    icon: '🔒',
    title: 'Bank-Level Security',
    description: 'Your financial data is encrypted and stored securely with enterprise-grade protection.'
  },
  {
    icon: '📱',
    title: 'Access Anywhere',
    description: 'Use on desktop, tablet, or mobile. Your data syncs instantly across all devices.'
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Add new loans in seconds with our streamlined, user-friendly interface.'
  },
];
