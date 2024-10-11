import { useState, useEffect } from 'react';

export function useFetch<T>(url:string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if(!url) return;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setError(null);
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