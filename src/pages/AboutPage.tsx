import React from 'react';
import { Shield, Users, Globe, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

export default function AboutPage() {
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
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              About ReguNova
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're on a mission to simplify compliance management for businesses worldwide
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Customers', value: '1000+' },
              { label: 'Countries', value: '50+' },
              { label: 'Team Members', value: '100+' },
              { label: 'Compliance Rate', value: '99%' }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-lg"
              >
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="mt-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                To empower businesses with intelligent compliance solutions that protect their growth and ensure regulatory adherence.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Values</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: Shield,
                  title: 'Security First',
                  description: 'We prioritize the security and privacy of our customers\' data above everything else.'
                },
                {
                  icon: Users,
                  title: 'Customer Success',
                  description: 'Our customers\' success is our success. We are committed to providing exceptional support.'
                },
                {
                  icon: Globe,
                  title: 'Global Impact',
                  description: 'We are building solutions that help businesses comply with regulations worldwide.'
                }
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-lg"
                >
                  <value.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto" />
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{value.title}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Leadership</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'CEO & Co-founder',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                },
                {
                  name: 'Michael Chen',
                  role: 'CTO',
                  image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                },
                {
                  name: 'Emma Davis',
                  role: 'Head of Compliance',
                  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                }
              ].map((person, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-lg"
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{person.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{person.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              Join Us Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}