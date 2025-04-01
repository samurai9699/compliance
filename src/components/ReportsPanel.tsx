import React from 'react';
import { FileText, Download } from 'lucide-react';
import type { Report } from '../types';
import { useReports } from '../hooks/useReports';

export default function ReportsPanel() {
  const { reports, loading } = useReports();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow animate-pulse">
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
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

  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated Reports</h2>
          <div className="text-center py-6">
            <p className="text-gray-500">No reports generated yet.</p>
            <p className="text-gray-500 text-sm mt-1">Complete your compliance tasks to generate reports.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated Reports</h2>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      {report.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Generated: {new Date(report.generatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {report.status === 'generated' && report.downloadUrl && (
                  <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}