
import { useState, useEffect } from 'react';

interface WebsiteSettings {
  bookingEnabled: boolean;
  maintenanceMode: boolean;
  businessHours: Record<string, { closed: boolean; open?: string; close?: string }>;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

export function useSettings() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        } else {
          throw new Error('Failed to fetch settings');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error, refetch: () => setLoading(true) };
}
