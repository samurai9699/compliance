import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Bell, FileText, ArrowRight, Lock, Zap, Globe, Users, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">ReguNova</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Features</Link>
              <Link to="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Pricing</Link>
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</Link>
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Dashboard
                </Link>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Login</Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link to="/features" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Features</Link>
              <Link to="/pricing" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Pricing</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</Link>
              {user ? (
                <Link to="/dashboard" className="block px-3 py-2 text-blue-600 dark:text-blue-400 font-medium">Dashboard</Link>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Login</Link>
                  <Link to="/signup" className="block px-3 py-2 text-blue-600 dark:text-blue-400 font-medium">Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 animate-gradient"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text leading-tight animate-fade-in">
              Simplify Compliance.<br />Secure Your Business.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up">
              Automate your compliance processes, stay up-to-date with regulations, and protect your business with our AI-powered platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <Link
                to="/signup"
                className="group w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-base sm:text-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center animate-fade-in-up"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/demo"
                className="w-full sm:w-auto text-base sm:text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center group animate-fade-in-up"
              >
                Watch Demo
                <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: 'Active Users', value: '10,000+' },
              { label: 'Compliance Score', value: '98%' },
              { label: 'Time Saved', value: '60%' },
              { label: 'Data Protected', value: '1B+' }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 animate-fade-in-up text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Everything you need to stay compliant
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Powerful features to help you manage compliance with confidence
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "AI-Powered Automation",
                description: "Automate compliance checks and get real-time insights powered by advanced AI."
              },
              {
                icon: Bell,
                title: "Smart Alerts",
                description: "Stay informed with intelligent notifications about regulatory changes and deadlines."
              },
              {
                icon: Lock,
                title: "Enterprise Security",
                description: "Bank-grade encryption and security measures to protect your sensitive data."
              },
              {
                icon: FileText,
                title: "Smart Reports",
                description: "Generate comprehensive compliance reports with detailed insights and recommendations."
              },
              {
                icon: Globe,
                title: "Multi-Region Support",
                description: "Manage compliance across different jurisdictions with region-specific requirements."
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together seamlessly with role-based access and real-time updates."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-50 transition-opacity rounded-xl"></div>
                <div className="relative">
                  <feature.icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 sm:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:py-20 xl:py-24">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Ready to simplify your compliance?
                </h2>
                <p className="mt-4 text-lg text-blue-100">
                  Join thousands of businesses that trust ReguNova for their compliance needs.
                </p>
                <div className="mt-8 flex justify-center">
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-200"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}