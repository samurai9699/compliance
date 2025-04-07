import React from 'react';
import { Shield, Zap, Lock, FileText, Globe, Users, Bell, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">ReguNova</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Features that empower your compliance
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Everything you need to manage compliance effectively
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "AI-Powered Automation",
                description: "Leverage advanced AI to automate compliance checks and get real-time insights.",
                features: [
                  "Automated compliance scanning",
                  "Real-time risk assessment",
                  "Smart document analysis",
                  "Predictive compliance alerts"
                ]
              },
              {
                icon: Bell,
                title: "Smart Notifications",
                description: "Stay informed about regulatory changes and compliance deadlines.",
                features: [
                  "Real-time regulatory updates",
                  "Customizable alert rules",
                  "Priority-based notifications",
                  "Compliance deadline reminders"
                ]
              },
              {
                icon: Lock,
                title: "Enterprise Security",
                description: "Bank-grade security measures to protect your sensitive data.",
                features: [
                  "End-to-end encryption",
                  "Role-based access control",
                  "Audit logging",
                  "Multi-factor authentication"
                ]
              },
              {
                icon: FileText,
                title: "Smart Reports",
                description: "Generate comprehensive compliance reports with detailed insights.",
                features: [
                  "Custom report templates",
                  "Automated report generation",
                  "Interactive dashboards",
                  "Export in multiple formats"
                ]
              },
              {
                icon: Globe,
                title: "Multi-Region Support",
                description: "Manage compliance across different jurisdictions seamlessly.",
                features: [
                  "Region-specific requirements",
                  "Multi-language support",
                  "Global compliance tracking",
                  "Local regulation updates"
                ]
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together efficiently with role-based access and real-time updates.",
                features: [
                  "Team workspaces",
                  "Task assignment",
                  "Real-time collaboration",
                  "Activity tracking"
                ]
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-50 rounded-xl transition-opacity" />
                <div className="relative">
                  <feature.icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}