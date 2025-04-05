import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Report } from '../types';

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  }

  async function generateReport(title: string) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .insert({
          title,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Simulate report generation
      setTimeout(async () => {
        const { error: updateError } = await supabase
          .from('reports')
          .update({
            status: 'generated',
            content: { /* Report content would go here */ },
            download_url: '#'
          })
          .eq('id', data.id);

        if (updateError) throw updateError;
        fetchReports();
      }, 3000);

      return data;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }

  return {
    reports,
    loading,
    generateReport,
    refreshReports: fetchReports,
  };
}