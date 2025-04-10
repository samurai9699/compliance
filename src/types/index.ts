export interface ComplianceItem {
    id: string;
    title: string;
    description: string;
    status: 'compliant' | 'non-compliant' | 'pending';
    dueDate: string;
    category: 'GDPR' | 'CCPA' | 'ISO' | 'Other';
  }
  
  export interface Alert {
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    date: string;
  }
  
  export interface Report {
    id: string;
    title: string;
    generatedAt: string;
    status: 'generated' | 'pending' | 'failed';
    downloadUrl?: string;
  }