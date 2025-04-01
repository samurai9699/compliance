import React, { useState, useEffect } from 'react';
import { Bell, Shield, Settings, ChevronRight, X, UserCircle } from 'lucide-react';
import ComplianceChecklist from './ComplianceChecklist';
import AlertsPanel from './AlertsPanel';
import ReportsPanel from './ReportsPanel';
import OnboardingWizard from './OnboardingWizard';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import ThemeToggle from './ThemeToggle';

export default function Dashboard() {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCompletedSteps() {
      if (!user) return;

      try {
        setIsLoading(true);
        
        // Check profile completion
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // Check compliance items (assessment)
        const { data: complianceItems } = await supabase
          .from('compliance_items')
          .select('*')
          .eq('user_id', user.id);

        // Check templates
        const { data: templates } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', user.id);

        // Check team members
        const { data: teamMembers } = await supabase
          .from('team_members')
          .select('*')
          .eq('user_id', user.id);

        const completed = [];
        if (profile?.company_name) completed.push('profile');
        if (complianceItems?.length > 0) completed.push('assessment');
        if (templates?.length > 0) completed.push('templates');
        if (teamMembers?.length > 0) completed.push('team');

        setCompletedSteps(completed);

        // Fetch notifications
        const { data: alerts } = await supabase
          .from('alerts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        setNotifications(alerts || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompletedSteps();
  }, [user]);

  const getStartedSteps = [
    {
      id: 'profile',
      title: 'Complete Business Profile',
      description: 'Set up your company information',
      component: OnboardingWizard
    },
    {
      id: 'assessment',
      title: 'Risk Assessment',
      description: 'Complete initial compliance assessment',
      component: OnboardingWizard
    },
    {
      id: 'templates',
      title: 'Choose Templates',
      description: 'Select relevant compliance templates',
      component: OnboardingWizard
    },
    {
      id: 'team',
      title: 'Invite Team Members',
      description: 'Add your compliance team',
      component: OnboardingWizard
    }
  ];

  const handleStartStep = (stepId: string) => {
    if (completedSteps.includes(stepId)) {
      return;
    }
    setActiveStep(stepId);
  };

  const handleCompleteStep = async (stepId: string, success: boolean) => {
    if (success && !completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }
    setActiveStep(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark bg-dark-pattern">
      {/* Header */}
      <header className="fixed w-full bg-dark/80 backdrop-blur-lg border-b border-dark-accent z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-accent-teal" />
              <h1 className="ml-2 text-2xl font-bold gradient-text">
                ReguNova
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {/* Notifications Button */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-white/70 hover:text-white transition-colors relative"
                >
                  <Bell className="w-6 h-6" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent-gold animate-glow-pulse" />
                  )}
                </button>
                {/* Notifications Panel */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 glass-card rounded-lg shadow-xl">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white">Notifications</h3>
                      <div className="mt-4 space-y-4">
                        {notifications.length === 0 ? (
                          <p className="text-white/70">No new notifications</p>
                        ) : (
                          notifications.map((notification) => (
                            <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                              <div className="flex-1">
                                <p className="text-sm text-white">{notification.title}</p>
                                <p className="text-xs text-white/50">{new Date(notification.created_at).toLocaleDateString()}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Settings Button */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  <Settings className="w-6 h-6" />
                </button>
                {showSettings && (
                  <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-xl">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowSettings(false);
                          setShowProfile(true);
                        }}
                        className="block w-full px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 text-left transition-colors"
                      >
                        Profile Settings
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 text-left transition-colors"
                      >
                        Account Settings
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 text-left transition-colors"
                      >
                        Preferences
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* User Profile */}
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2"
              >
                <div className="h-8 w-8 rounded-full bg-dark-accent flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-white/70" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Onboarding Progress */}
        {showOnboarding && (
          <div className="mb-8 glass-card p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Welcome to ReguNova!</h2>
              <button
                onClick={() => setShowOnboarding(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/70 mb-6">
              Let's get your compliance program up and running. Complete these steps to get started:
            </p>
            <div className="space-y-4">
              {getStartedSteps.map((step) => (
                <div
                  key={step.id}
                  className="feature-card"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        completedSteps.includes(step.id)
                          ? 'bg-accent-teal/20'
                          : 'bg-accent-gold/20'
                      }`}>
                        <ChevronRight className={`w-5 h-5 ${
                          completedSteps.includes(step.id)
                            ? 'text-accent-teal'
                            : 'text-accent-gold'
                        }`} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-white">
                          {step.title}
                        </h3>
                        <p className="text-sm text-white/50">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartStep(step.id)}
                      disabled={completedSteps.includes(step.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        completedSteps.includes(step.id)
                          ? 'bg-accent-teal/20 text-accent-teal cursor-not-allowed'
                          : 'btn-primary'
                      }`}
                    >
                      {completedSteps.includes(step.id) ? 'Completed' : 'Start'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ComplianceChecklist />
          <div className="space-y-8">
            <AlertsPanel />
            <ReportsPanel />
          </div>
        </div>
      </main>

      {/* Active Step Modal */}
      {activeStep && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {getStartedSteps.find(step => step.id === activeStep)?.component && (
              <div className="p-6">
                <OnboardingWizard
                  stepId={activeStep}
                  onComplete={(success) => handleCompleteStep(activeStep, success)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/70">Email</label>
                  <p className="mt-1 text-sm text-white/50">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}