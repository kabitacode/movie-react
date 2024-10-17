import { useState, useEffect } from 'react';
import { REACT_APP_ACCESS_TOKEN } from '../config';

export function useFetch<T>(url: string, isHeader: boolean) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    async function fetchData() {
      setLoading(true);
      try {
        if (isHeader) {
          const response = await fetch(url, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${REACT_APP_ACCESS_TOKEN}`
            }
          });
          const data = await response.json();
          setData(data);
          setError(null);
        } else {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
          setError(null);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}