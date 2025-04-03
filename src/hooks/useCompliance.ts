import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ComplianceItem } from '../types';

export function useCompliance() {
  const [items, setItems] = useState<ComplianceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplianceItems();
  }, []);

  async function fetchComplianceItems() {
    try {
      const { data, error } = await supabase
        .from('compliance_items')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching compliance items:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addComplianceItem(item: Omit<ComplianceItem, 'id'>) {
    try {
      const { data, error } = await supabase
        .from('compliance_items')
        .insert(item)
        .select()
        .single();

      if (error) throw error;
      setItems([...items, data]);
      return data;
    } catch (error) {
      console.error('Error adding compliance item:', error);
      throw error;
    }
  }

  async function updateComplianceItem(id: string, updates: Partial<ComplianceItem>) {
    try {
      const { data, error } = await supabase
        .from('compliance_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setItems(items.map(item => item.id === id ? data : item));
      return data;
    } catch (error) {
      console.error('Error updating compliance item:', error);
      throw error;
    }
  }

  return {
    items,
    loading,
    addComplianceItem,
    updateComplianceItem,
    refreshItems: fetchComplianceItems,
  };
}