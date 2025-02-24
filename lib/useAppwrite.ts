import { useState, useEffect } from "react";

interface UseAppwriteOptions<T> {
  fn: () => Promise<T>;
}

interface UseAppwriteResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useAppwrite<T>({
  fn,
}: UseAppwriteOptions<T>): UseAppwriteResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    await fetchData();
  };

  return { data, loading, error, refetch };
}
