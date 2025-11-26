import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container">
          <div className="flex items-center justify-between" style={{ height: '80px' }}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: 'var(--primary-black)' }}>L</span>
              </div>
              <span className="text-2xl font-bold text-gradient">LendLedger</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="btn btn-ghost">
                Sign In
              </Link>
              <Link href="/dashboard" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex items-center" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center animate-fadeIn" style={{ padding: '0 1.5rem' }}>
            <h1 className="heading-xl mb-6">
              Never Forget Who{' '}
              <span className="text-gradient">Owes You</span>
            </h1>
            <p className="text-xl mb-8" style={{ color: 'var(--gray-400)' }}>
              Track loans, manage reminders, and take control of your money with LendLedger.
              The premium solution for keeping tabs on lending and borrowing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/dashboard" className="btn btn-primary text-lg px-8 py-4">
                Start Tracking Free
              </Link>
              <Link href="#features" className="btn btn-secondary text-lg px-8 py-4">
                See Features
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-2 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-gradient mb-2">$10M+</div>
                <div style={{ color: 'var(--gray-400)' }}>Tracked Globally</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-gradient mb-2">50K+</div>
                <div style={{ color: 'var(--gray-400)' }}>Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <h2 className="heading-lg mb-4">
              Everything You Need to{' '}
              <span className="text-gradient">Track Money</span>
            </h2>
            <p className="text-xl" style={{ color: 'var(--gray-400)' }}>
              Powerful features designed for complete financial clarity
            </p>
          </div>

          <div className="grid grid-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-8 animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="heading-sm mb-3">{feature.title}</h3>
                <p style={{ color: 'var(--gray-400)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">
              Simple, <span className="text-gradient">Transparent Pricing</span>
            </h2>
            <p className="text-xl" style={{ color: 'var(--gray-400)' }}>
              Start free, upgrade when you need more power
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="glass-card p-8">
              <h3 className="heading-md mb-2">Free</h3>
              <div className="text-5xl font-bold mb-6">
                <span className="text-gradient">$0</span>
                <span className="text-lg font-normal" style={{ color: 'var(--gray-400)' }}>/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <span>Up to 5 active loans</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <span>Basic reminders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <span>Simple tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <span>Email support</span>
                </li>
              </ul>
              <Link href="/dashboard" className="btn btn-secondary w-full">
                Get Started
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge-gold">POPULAR</span>
              </div>
              <h3 className="heading-md mb-2">Premium</h3>
              <div className="text-5xl font-bold mb-6">
                <span className="text-gradient">$9</span>
                <span className="text-lg font-normal" style={{ color: 'var(--gray-400)' }}>/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span>Unlimited loans</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span>Custom reminder schedules</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span>Interest rate tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gradient text-xl">✓</span>
                  <span>Export to CSV</span>
                </li>
              </ul>
              <Link href="/dashboard" className="btn btn-primary w-full">
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="glass-card p-12 text-center max-w-3xl mx-auto">
            <h2 className="heading-lg mb-4">
              Ready to Take Control?
            </h2>
            <p className="text-xl mb-8" style={{ color: 'var(--gray-400)' }}>
              Join thousands who trust LendLedger to manage their loans and never miss a payment again.
            </p>
            <Link href="/dashboard" className="btn btn-primary text-lg px-8 py-4">
              Start For Free Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="container">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                <span className="text-lg font-bold" style={{ color: 'var(--primary-black)' }}>L</span>
              </div>
              <span className="text-xl font-bold text-gradient">LendLedger</span>
            </div>
            <p style={{ color: 'var(--gray-500)' }}>
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
    title: 'Track Loans',
    description: 'Easily manage who you lent to and who you borrowed from, all in one place.'
  },
  {
    icon: '🔔',
    title: 'Smart Reminders',
    description: 'Never miss a payment deadline with intelligent reminder notifications.'
  },
  {
    icon: '📊',
    title: 'Visual Analytics',
    description: 'See your complete financial picture with beautiful charts and insights.'
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your financial data is encrypted and stored securely, always.'
  },
  {
    icon: '📱',
    title: 'Works Anywhere',
    description: 'Access your loans from any device - desktop, tablet, or mobile.'
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Add new loans in seconds with our streamlined interface.'
  },
];

