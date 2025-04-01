import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import type { ComplianceItem } from '../types';
import { useCompliance } from '../hooks/useCompliance';

const statusIcons = {
  compliant: <CheckCircle className="w-5 h-5 text-green-500" />,
  'non-compliant': <XCircle className="w-5 h-5 text-red-500" />,
  pending: <Clock className="w-5 h-5 text-yellow-500" />
};

export default function ComplianceChecklist() {
  const { items, loading } = useCompliance();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow animate-pulse">
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Checklist</h2>
          <div className="text-center py-6">
            <p className="text-gray-500">No compliance items yet.</p>
            <p className="text-gray-500 text-sm mt-1">Complete the onboarding to get started.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Checklist</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    {statusIcons[item.status]}
                    <h3 className="ml-2 text-sm font-medium text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                    <span className="ml-2">Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}