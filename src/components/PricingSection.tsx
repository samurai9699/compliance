import React from 'react';
import { Shield, Check, Zap, Star, Bell, FileText, CheckCircle, ArrowRight, Lock, Users, Gauge, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';

const pricingTiers = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for individuals and small startups getting started with compliance',
    features: [
      'Basic compliance checks',
      'Monthly regulatory updates',
      'Single user access',
      '5 compliance tasks',
      'Email support'
    ],
    icon: Shield,
    color: 'gray',
    popular: false
  },
  {
    name: 'Pro',
    price: '50',
    description: 'Great for growing businesses with advanced compliance needs',
    features: [
      'Advanced compliance checks',
      'Weekly regulatory updates',
      'Up to 10 team members',
      'Unlimited compliance tasks',
      'Priority email & chat support',
      'Advanced report generation',
      'Custom workflows',
      'API access'
    ],
    icon: Star,
    color: 'blue',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '150',
    description: 'Complete solution for large organizations with complex requirements',
    features: [
      'AI-powered compliance automation',
      'Real-time regulatory alerts',
      'Unlimited team members',
      'Unlimited everything',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced analytics',
      'Multi-region support',
      'Custom training',
      'SLA guarantee'
    ],
    icon: Sparkles,
    color: 'purple'
  }
];

export default function PricingSection() {
  const { user } = useAuth();
  const { startSubscription, loading } = useSubscription();
  const [billingInterval, setBillingInterval] = React.useState<'monthly' | 'annual'>('monthly');

  const handleSubscribe = async (tier: string) => {
    if (!user) {
      window.location.href = `/signup?plan=${tier.toLowerCase()}`;
      return;
    }
    await startSubscription();
  };

  const getAnnualPrice = (monthlyPrice: string) => {
    const price = parseInt(monthlyPrice);
    return Math.floor(price * 12 * 0.8); // 20% discount for annual billing
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your business
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-12 flex justify-center items-center space-x-4">
          <span className={`text-sm ${billingInterval === 'monthly' ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500'}`}>
            Monthly billing
          </span>
          <button
            onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'annual' : 'monthly')}
            className={`relative rounded-full w-14 h-7 transition-colors duration-200 ease-in-out ${
              billingInterval === 'annual' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <div
              className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out transform ${
                billingInterval === 'annual' ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-sm ${billingInterval === 'annual' ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500'}`}>
            Annual billing
            <span className="ml-1.5 text-xs text-green-500 font-medium">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg shadow-xl bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 ${
                tier.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              <div className="p-6">
                {tier.popular && (
                  <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    Most popular
                  </span>
                )}
                <div className="mt-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{tier.name}</h3>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{tier.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                      ${billingInterval === 'monthly' ? tier.price : getAnnualPrice(tier.price)}
                    </span>
                    <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                      /{billingInterval === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </p>
                  <button
                    onClick={() => handleSubscribe(tier.name)}
                    className={`mt-8 block w-full rounded-lg px-6 py-3 text-center font-medium text-white ${
                      tier.popular
                        ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                        : 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600'
                    } transition-colors duration-200`}
                  >
                    {tier.price === '0' ? 'Get started for free' : 'Get started'}
                  </button>
                </div>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}