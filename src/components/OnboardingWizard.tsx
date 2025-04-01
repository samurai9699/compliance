import React, { useState } from 'react';
import { Shield, Building, Globe, Users, Check, X, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface OnboardingWizardProps {
  stepId: string;
  onComplete: (success: boolean) => void;
}

export default function OnboardingWizard({ stepId, onComplete }: OnboardingWizardProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    region: '',
    size: '',
    complianceNeeds: [] as string[],
    teamMembers: [] as { email: string; role: string }[],
    templates: [] as string[]
  });

  const handleSubmit = async () => {
    if (!user) {
      setError('No authenticated user found');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      switch (stepId) {
        case 'profile':
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              company_name: formData.companyName.trim(),
              industry: formData.industry.trim(),
              region: formData.region.trim(),
              size: formData.size.trim(),
              updated_at: new Date().toISOString()
            });
          if (profileError) throw profileError;
          break;

        case 'assessment':
          const { error: assessmentError } = await supabase
            .from('compliance_items')
            .insert(
              formData.complianceNeeds.map(need => ({
                user_id: user.id,
                title: `${need} Compliance`,
                description: `Initial compliance setup for ${need}`,
                status: 'pending',
                category: need,
                due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
              }))
            );
          if (assessmentError) throw assessmentError;
          break;

        case 'templates':
          const { error: templatesError } = await supabase
            .from('reports')
            .insert(
              formData.templates.map(template => ({
                user_id: user.id,
                title: `${template} Template`,
                status: 'pending',
                created_at: new Date().toISOString()
              }))
            );
          if (templatesError) throw templatesError;
          break;

        case 'team':
          const { error: teamError } = await supabase
            .from('team_members')
            .insert(
              formData.teamMembers.map(member => ({
                user_id: user.id,
                email: member.email.trim(),
                role: member.role,
                created_at: new Date().toISOString()
              }))
            );
          if (teamError) throw teamError;
          break;
      }

      onComplete(true);
    } catch (err: any) {
      console.error('Error saving data:', err);
      setError(err.message || 'Failed to save data. Please try again.');
      onComplete(false);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    switch (stepId) {
      case 'profile':
        return !!(formData.companyName && formData.industry && formData.region && formData.size);
      case 'assessment':
        return formData.complianceNeeds.length > 0;
      case 'templates':
        return formData.templates.length > 0;
      case 'team':
        return formData.teamMembers.length > 0 && 
          formData.teamMembers.every(member => member.email && member.email.includes('@'));
      default:
        return false;
    }
  };

  const renderForm = () => {
    switch (stepId) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="mt-1 block w-full bg-dark-lighter border border-dark-accent rounded-md px-3 py-2 text-white"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Industry</label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="mt-1 block w-full bg-dark-lighter border border-dark-accent rounded-md px-3 py-2 text-white"
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Region</label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="mt-1 block w-full bg-dark-lighter border border-dark-accent rounded-md px-3 py-2 text-white"
              >
                <option value="">Select region</option>
                <option value="north_america">North America</option>
                <option value="europe">Europe</option>
                <option value="asia_pacific">Asia Pacific</option>
                <option value="latin_america">Latin America</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Company Size</label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="mt-1 block w-full bg-dark-lighter border border-dark-accent rounded-md px-3 py-2 text-white"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
          </div>
        );

      case 'assessment':
        return (
          <div className="space-y-4">
            <p className="text-white/70 mb-4">Select the compliance requirements that apply to your business:</p>
            {['GDPR', 'CCPA', 'HIPAA', 'SOX', 'ISO 27001'].map((regulation) => (
              <label key={regulation} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.complianceNeeds.includes(regulation)}
                  onChange={(e) => {
                    const needs = e.target.checked
                      ? [...formData.complianceNeeds, regulation]
                      : formData.complianceNeeds.filter(need => need !== regulation);
                    setFormData({ ...formData, complianceNeeds: needs });
                  }}
                  className="h-4 w-4 rounded border-dark-accent text-accent-teal focus:ring-accent-teal/50"
                />
                <span className="text-white">{regulation}</span>
              </label>
            ))}
          </div>
        );

      case 'templates':
        return (
          <div className="space-y-4">
            <p className="text-white/70 mb-4">Select the document templates you need:</p>
            {[
              'Privacy Policy',
              'Data Processing Agreement',
              'Cookie Policy',
              'Terms of Service',
              'Data Breach Response Plan',
              'Security Policy'
            ].map((template) => (
              <label key={template} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.templates.includes(template)}
                  onChange={(e) => {
                    const templates = e.target.checked
                      ? [...formData.templates, template]
                      : formData.templates.filter(t => t !== template);
                    setFormData({ ...formData, templates });
                  }}
                  className="h-4 w-4 rounded border-dark-accent text-accent-teal focus:ring-accent-teal/50"
                />
                <span className="text-white">{template}</span>
              </label>
            ))}
          </div>
        );

      case 'team':
        return (
          <div className="space-y-4">
            <p className="text-white/70 mb-4">Add team members who will be involved in compliance:</p>
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => {
                    const newMembers = [...formData.teamMembers];
                    newMembers[index].email = e.target.value;
                    setFormData({ ...formData, teamMembers: newMembers });
                  }}
                  placeholder="Email"
                  className="flex-1 bg-dark-lighter border border-dark-accent rounded-md px-3 py-2 text-white"
                />
                <select
                  value={member.role}
                  onChange={(e) => {
                    const newMembers = [...formData.teamMembers];
                    newMembers[index].role = e.target.value;
                    setFormData({ ...formData, teamMembers: newMembers });
                  }}
                  className="bg-dark-lighter border border-dark-accent rounded-md px-3 py-2 text-white"
                >
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                  <option value="viewer">Viewer</option>
                </select>
                <button
                  onClick={() => {
                    const newMembers = formData.teamMembers.filter((_, i) => i !== index);
                    setFormData({ ...formData, teamMembers: newMembers });
                  }}
                  className="text-red-500 hover:text-red-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                setFormData({
                  ...formData,
                  teamMembers: [...formData.teamMembers, { email: '', role: 'member' }]
                });
              }}
              className="text-accent-teal hover:text-accent-teal/80 text-sm font-medium"
            >
              + Add Team Member
            </button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">
          {stepId === 'profile' && 'Company Profile'}
          {stepId === 'assessment' && 'Risk Assessment'}
          {stepId === 'templates' && 'Document Templates'}
          {stepId === 'team' && 'Team Setup'}
        </h2>
        <button
          onClick={() => onComplete(false)}
          className="text-white/50 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {renderForm()}

      <div className="flex justify-between pt-6">
        <button
          onClick={() => onComplete(false)}
          className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white bg-dark-accent rounded-md hover:bg-dark-accent/80"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading || !validateForm()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Complete'}
        </button>
      </div>
    </div>
  );
}