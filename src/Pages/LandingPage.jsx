import { Link } from 'react-router-dom';
import {
  Briefcase, Sparkles, Bell, BarChart3,
  ArrowRight, CheckCircle, ChevronRight,
  Zap, Shield, TrendingUp,
} from 'lucide-react';

const features = [
  {
    icon:        Briefcase,
    title:       'Track Applications',
    description: 'Keep every application organized in one place. Never lose track of where you applied or what stage you\'re in.',
    color:       'from-blue-500 to-indigo-600',
    bg:          'bg-blue-50',
    iconColor:   'text-blue-600',
  },
  {
    icon:        Sparkles,
    title:       'AI Resume Analysis',
    description: 'Upload your resume and get AI-powered insights. Extract skills, experience, and get actionable suggestions.',
    color:       'from-orange-500 to-red-600',
    bg:          'bg-orange-50',
    iconColor:   'text-orange-600',
  },
  {
    icon:        Bell,
    title:       'Smart Reminders',
    description: 'Set follow-up reminders and never miss a deadline. Stay on top of every opportunity automatically.',
    color:       'from-amber-500 to-orange-600',
    bg:          'bg-amber-50',
    iconColor:   'text-amber-600',
  },
  {
    icon:        BarChart3,
    title:       'Pipeline Dashboard',
    description: 'Visualize your job search with beautiful charts. See your progress at a glance and identify patterns.',
    color:       'from-emerald-500 to-teal-600',
    bg:          'bg-emerald-50',
    iconColor:   'text-emerald-600',
  },
];

const steps = [
  {
    number: '01',
    title:  'Add your jobs',
    text:   'Quickly add job listings from any source. Track company, role, salary, and status in seconds.',
  },
  {
    number: '02',
    title:  'Upload your resume',
    text:   'Let AI analyze your resume to extract skills, experience, and provide smart improvement tips.',
  },
  {
    number: '03',
    title:  'Track & succeed',
    text:   'Monitor your pipeline, set reminders, and watch your progress unfold on a beautiful dashboard.',
  },
];

const stats = [
  { value: '10K+', label: 'Jobs tracked' },
  { value: '95%',  label: 'User satisfaction' },
  { value: '2x',   label: 'Faster follow-ups' },
  { value: '100%', label: 'Free to use' },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden" id="landing-page">

      {/* ────── Navbar ────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100"
           id="landing-nav">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center
                            shadow-md shadow-brand-600/20
                            group-hover:shadow-lg group-hover:shadow-brand-600/30
                            transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                <path d="M4 11L9 16L18 6" stroke="white"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">
              Job Tracker
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/login"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium
                         px-4 py-2 rounded-lg transition-colors duration-200"
              id="nav-sign-in"
            >
              Sign in
            </Link>
            <Link to="/register"
              className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold
                         px-5 py-2.5 rounded-xl transition-all duration-200
                         shadow-md shadow-brand-600/20 hover:shadow-lg hover:shadow-brand-600/30
                         hover:-translate-y-0.5"
              id="nav-get-started"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ────── Hero Section ────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6" id="hero-section">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-32 w-96 h-96 bg-brand-200/40 rounded-full
                          blur-3xl animate-pulse-slow" />
          <div className="absolute top-40 -right-32 w-80 h-80 bg-orange-200/30 rounded-full
                          blur-3xl animate-pulse-slow"
               style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-blue-200/20 rounded-full
                          blur-3xl animate-pulse-slow"
               style={{ animationDelay: '2s' }} />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]"
               style={{
                 backgroundImage: `linear-gradient(#ff5500 1px, transparent 1px),
                                   linear-gradient(90deg, #ff5500 1px, transparent 1px)`,
                 backgroundSize: '48px 48px',
               }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-200
                          rounded-full text-brand-700 text-xs font-semibold mb-8
                          animate-slide-up">
            <Zap size={13} />
            AI-Powered Job Search Companion
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900
                         leading-[1.1] tracking-tight mb-6 animate-slide-up"
              style={{ animationDelay: '0.1s' }}>
            Your job search,{' '}
            <span className="bg-gradient-to-r from-brand-600 via-orange-500 to-brand-600
                             bg-clip-text text-transparent
                             bg-[length:200%_auto] animate-[gradientShift_3s_linear_infinite]">
              organized
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10
                        leading-relaxed animate-slide-up"
             style={{ animationDelay: '0.2s' }}>
            Track applications, analyze resumes with AI, set smart reminders, and
            visualize your pipeline — all in one beautiful workspace.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4
                          animate-slide-up"
               style={{ animationDelay: '0.3s' }}>
            <Link to="/register"
              className="group flex items-center gap-2 bg-brand-600 hover:bg-brand-500
                         text-white font-semibold px-8 py-3.5 rounded-2xl text-base
                         transition-all duration-300 shadow-lg shadow-brand-600/25
                         hover:shadow-xl hover:shadow-brand-600/30
                         hover:-translate-y-0.5"
              id="hero-cta-primary"
            >
              Start Tracking for Free
              <ArrowRight size={18}
                className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link to="/login"
              className="group flex items-center gap-2 bg-white hover:bg-gray-50
                         text-gray-700 font-semibold px-8 py-3.5 rounded-2xl text-base
                         border border-gray-200 hover:border-gray-300
                         transition-all duration-200 shadow-sm
                         hover:-translate-y-0.5"
              id="hero-cta-secondary"
            >
              Sign in
              <ChevronRight size={16}
                className="text-gray-400 transition-transform duration-200
                           group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Social proof stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto
                          animate-slide-up"
               style={{ animationDelay: '0.4s' }}>
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{s.value}</p>
                <p className="text-gray-400 text-xs mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── Features Section ────── */}
      <section className="relative py-20 md:py-28 px-6 bg-gray-50/80" id="features-section">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 border border-brand-200
                            rounded-full text-brand-700 text-xs font-semibold mb-4">
              <Shield size={12} />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to land your dream job
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              From tracking to insights, we've got every step of your job search covered.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, title, description, color, bg, iconColor }) => (
              <div
                key={title}
                className="group relative bg-white border border-gray-200 rounded-2xl p-8
                           hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50
                           hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                {/* Gradient corner accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${color}
                                 opacity-[0.04] rounded-bl-[100px] rounded-tr-2xl
                                 group-hover:opacity-[0.08] transition-opacity duration-300`} />

                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center
                                 mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={22} className={iconColor} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── How It Works ────── */}
      <section className="relative py-20 md:py-28 px-6 bg-white" id="how-it-works-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200
                            rounded-full text-emerald-700 text-xs font-semibold mb-4">
              <TrendingUp size={12} />
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get started in three simple steps
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              Set up your workspace in under a minute and start tracking right away.
            </p>
          </div>

          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
            {steps.map(({ number, title, text }, i) => (
              <div key={number} className="relative text-center md:text-left group">
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px
                                  bg-gradient-to-r from-gray-300 to-transparent" />
                )}

                {/* Number badge */}
                <div className="inline-flex items-center justify-center w-12 h-12
                                bg-brand-600 text-white rounded-2xl font-bold text-sm
                                mb-4 shadow-md shadow-brand-600/20
                                group-hover:scale-110 transition-transform duration-300">
                  {number}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── CTA Banner ────── */}
      <section className="relative py-20 md:py-28 px-6" id="cta-section">
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-gradient-to-br from-brand-600 via-orange-500 to-brand-700
                          rounded-3xl p-10 md:p-16 text-center
                          shadow-2xl shadow-brand-600/20 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full
                            -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full
                            translate-y-1/2 -translate-x-1/4" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to take control of your job search?
              </h2>
              <p className="text-brand-100 text-lg max-w-lg mx-auto mb-8">
                Join thousands of developers who are tracking smarter, not harder.
                It's free, forever.
              </p>
              <Link to="/register"
                className="inline-flex items-center gap-2 bg-white text-brand-700
                           font-semibold px-8 py-3.5 rounded-2xl text-base
                           transition-all duration-300 hover:-translate-y-0.5
                           shadow-lg hover:shadow-xl group"
                id="cta-banner-button"
              >
                Get Started — It's Free
                <ArrowRight size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────── Footer ────── */}
      <footer className="border-t border-gray-100 py-10 px-6" id="landing-footer">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center
                        justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 22 22" fill="none">
                <path d="M4 11L9 16L18 6" stroke="white"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-semibold text-gray-900 text-sm">Job Tracker</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Job Tracker · AI-powered job search · Built for developers
          </p>
          <div className="flex items-center gap-1">
            <CheckCircle size={14} className="text-green-500" />
            <span className="text-gray-500 text-xs">100% free, no credit card</span>
          </div>
        </div>
      </footer>

      {/* ────── Inline keyframes ────── */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
